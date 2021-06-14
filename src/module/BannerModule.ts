import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm';
import {Banner} from "../entity/Banner";
import {BannerService} from "../service/BannerService";

@Module({
    imports: [
        TypeOrmModule.forFeature([Banner])
    ],
    providers: [BannerService]
})
export class BannerModule {
}