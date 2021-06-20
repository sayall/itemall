import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm';
import {Banner} from "../entity/Banner";
import {HomeService} from "../service/HomeService";
import {HomeController} from "../controller/HomeController";
import {Recommend} from "../entity/Recommend";
import {Goods} from "../entity/Goods";
import {Detail} from "../entity/Detail";

@Module({
    imports: [
        TypeOrmModule.forFeature([Banner,Recommend,Goods,Detail])
    ],
    providers: [HomeService],
    controllers:[HomeController]
})
export class HomeModule {
}