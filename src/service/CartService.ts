import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

//实体类
import {Goods} from "../entity/Goods";
import {Cart} from "../entity/Cart";


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Goods) private readonly goodsRepository: Repository<Goods>,
    ) {}
    //根据指定条件查询指定商品是否存在
    async queryOne(where): Promise<object | undefined> {
        return await this.cartRepository.findOne({ where: where, select: ['id'] });
    }
    //查询购物车
    async queryCart(uid:object): Promise<object> {
        let goodList = [];
        // 查询当前用户的购物车记录中的商品gid
        const gid = await this.cartRepository.find({
            where: uid,
            select: ['gid', 'num'],
            order: {updateDateTime: "DESC"},
        });
        let TotalNum:number = 0;
        for (const item of gid) {
            const goods = await this.goodsRepository.findOne(item.gid);
            TotalNum= TotalNum+item.num;
            goodList.push({ goods, num: item.num });
        }
        return {TotalNum,goodList};
    }

    //新增、修改购物车商品
    async savaCart(cart, uid): Promise<string> {
        // 查询对应用户添加的商品是否在购物车中存在 查到做修改操作  查不到做添加操作
        const id= await this.queryOne({ uid, gid: cart.gid });
        if (id) {
            const { affected } = await this.cartRepository.update(id, {
                num: cart.num,
            });
            return affected === 0 ? '修改失败' : '修改成功';
        }
        //将token中的uid增加到body内
        cart.uid= uid;
        await this.cartRepository.save(cart);
        return cart.id ? '新增成功' : '新增失败';
    }
    //删除购物车商品
    async delCart(id, uid): Promise<string> {
        id = await this.queryOne({ uid, id });
        if (!id) throw new UnauthorizedException('非法操作');
        const { affected } = await this.cartRepository.delete(id);
        return affected === 0 ? '删除失败' : '删除成功';
    }

}