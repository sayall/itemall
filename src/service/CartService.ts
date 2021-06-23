import {ForbiddenException, Injectable} from "@nestjs/common";
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
    async queryOne(where:Cart): Promise<Cart | undefined> {
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
        if (!gid){
            throw new ForbiddenException('购物车为空');
        }
        let TotalNum:number = 0;
        for (const item of gid) {
            const goods = await this.goodsRepository.findOne(item.gid);
            TotalNum= TotalNum+item.num;
            goodList.push({ goods, num: item.num });
        }
        return {TotalNum,goodList};
    }
}