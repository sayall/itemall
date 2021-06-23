import {Controller, Post, Req, UseGuards} from "@nestjs/common";
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
}