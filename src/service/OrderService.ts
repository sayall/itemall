import {BadRequestException, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
//实体类
import {Order} from "../entity/Order";
import {Goods} from "../entity/Goods";
import {OrderDesc} from "../entity/OrderDesc";
import {isUser} from "../util/upload";
import {ORDER_STATUS} from "../constant";

@Injectable()
export class OrderService {
    //实体类注册
    constructor(
        @InjectRepository(Goods)
        private readonly goodsRepository: Repository<Goods>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDesc)
        private readonly orderDescRepository: Repository<OrderDesc>,
    ) {
    }

    //订单提交
    async subOrder(body, uid): Promise<object> {
        const {address, goods} = body;
        const order = new Order();
        //根据随机数+时间戳生成id
        order.id = Date.now().toString() + Math.floor(Math.random() * 10000000);
        order.uid = uid;
        order.address = address;
        await this.orderRepository.save(order);
        let totalPrice = 0;
        //更新子表
        for (const item of goods) {
            const orderDesc = new OrderDesc();
            const goods = await this.goodsRepository.findOne(item.gid);
            orderDesc.title = goods.title;
            orderDesc.price = goods.price;
            const {img} = JSON.parse(goods.show);
            orderDesc.img = img;
            orderDesc.num = item.num;
            orderDesc.oid = order.id;
            await this.orderDescRepository.save(orderDesc);
            totalPrice += orderDesc.price * orderDesc.num;
        }
        // 更新订单表中的价格
        await this.orderRepository.save({id: order.id, totalPrice});
        return {msg: '更新成功', id: order.id};
    }

    //订单查询
    async searchOrder(body, uid): Promise<Order[]> {
        //将uid插入查询条件内
        body.uid = uid;
        // 创建QueryBuilder
        const db = this.orderRepository.createQueryBuilder('order');
        //是否只传了1个时间
        if (body.startTime && !body.endTime) {
            body.endTime = '9999-12-31'
        }
        if (!body.startTime && body.endTime) {
            body.startTime = '0000-1-1'
        }
        // 判断body中是否有开始时间和结束时间
        if (body.startTime && body.endTime) {
            const {startTime, endTime} = body;
            delete body.startTime;
            delete body.endTime;
            db.where(body);
            db.andWhere('createDatetime BETWEEN :startTime AND :endTime', {
                startTime,
                endTime,
            });
        } else {
            db.where(body);
        }
        // 执行查询
        const orders = await db.execute();
        for (const order of orders) {
            order.orderDesc = await this.orderDescRepository.find({
                oid: order.order_id,
            });
        }
        return orders;
    }

    //修改订单状态
    async modifyOrderStatus(body, uid,beforeState:[ORDER_STATUS],afterStatus:ORDER_STATUS): Promise<string> {
        const {id} = body;
        //获取订单信息
        const order = await this.orderRepository.findOne(id)
        //判断订单是否存在
        if(!order)  throw new BadRequestException('订单不存在')
        //用户权限判断
        isUser(order.uid, uid)
        //订单状态修改，判断订单是否包含初始状态
        if (beforeState.indexOf(order.status) != -1) {
            const {affected} = await this.orderRepository.update(id, {
                status: afterStatus,
            });
           return affected ? '订单操作成功' : '订单操作失败';
        } else throw new BadRequestException('当前订单状态不可操作');
    }
    //删除订单
    async delOrder(body, uid): Promise<string> {
        const {id} = body;
        //获取订单信息
        const order = await this.orderRepository.findOne(id)
        //判断订单是否存在
        if(!order)  throw new BadRequestException('订单不存在')
        //用户权限判断
        isUser(order.uid, uid)
        //订单软删除，不做权限判断
        const oder = await this.orderRepository.softRemove({ id: body.id });
            return oder.id ? oder.id+' 订单删除成功' : '订单删除失败';
    }

}