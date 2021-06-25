import {Body, Controller, Post, Req, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../common/guard/AuthGuard";
import {OrderService} from "../service/OrderService";
import {Order} from "../entity/Order";
import {ORDER_STATUS} from "../constant";

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
    constructor(private readonly service: OrderService) {}
    //提交订单
    @Post('subOrder')
    async subOrder(@Body() body, @Req() req): Promise<object> {
        return this.service.subOrder(body, req.auth_user);
    }
    //查询订单
    @Post('searchOrder')
    async searchOrder(@Body() body, @Req() req): Promise<Order[]>{
        return this.service.searchOrder(body, req.auth_user);
    }
    //取消订单
    @Post('cancelOrder')
    async cancelOrder(@Body() body, @Req() req): Promise<string> {
        return this.service.modifyOrderStatus(body, req.auth_user,[ORDER_STATUS.INIT],ORDER_STATUS.CANCEL);
    }
    //支付订单
    @Post('payOrder')
    async payOrder(@Body() body, @Req() req): Promise<string> {
        return this.service.modifyOrderStatus(body, req.auth_user,[ORDER_STATUS.INIT],ORDER_STATUS.FINISH);
    }
    //删除订单
    @Post('delOrder')
    async delOrder(@Body() body, @Req() req): Promise<string> {
        return this.service.delOrder(body, req.auth_user);
    }
}