import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JWTConstant} from "../constant";
import {OrderController} from "../controller/OrderController";
import {OrderService} from "../service/OrderService";
import {Order} from "../entity/Order";
import {Goods} from "../entity/Goods";
import {OrderDesc} from "../entity/OrderDesc";


@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDesc, Goods]),
        JwtModule.register({
            secret: JWTConstant.secret,
            signOptions: { expiresIn: JWTConstant.expiresIn },
        }),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})


export class OrderModule {}