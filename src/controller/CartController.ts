import {Body, Controller, Delete, Post, Req, UseGuards} from "@nestjs/common";
import {CartService} from "../service/CartService";
import {AuthGuard} from "../common/guard/AuthGuard";

@Controller('cart')
@UseGuards(AuthGuard)
export  class CartController {
    constructor(private readonly service: CartService) {}

//查询购物车，通过token获取uid，无需用户传输
    @Post('search')
    async queryCart(
        @Req() req
    ): Promise<object> {
        return this.service.queryCart({uid:req.auth_user});
    }
//增加购物车商品
    @Post('saveCart')
    async savaCart(@Body() body, @Req() req): Promise<string> {
        return this.service.savaCart(body,req.auth_user);
    }

    @Delete('delCart')
    async delCart(@Body('id') id, @Req() req): Promise<string> {
        return this.service.delCart(id, req.auth_user);
    }

}