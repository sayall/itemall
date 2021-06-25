import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {getConnectionOptions} from "typeorm";
import {HomeModule} from "./module/HomeModule";
import {CategoryModule} from "./module/CategoryModules";
import {UserModule} from "./module/UserModule";
import {staticModule} from "./module/staticModule";
import {CartModule} from "./module/CartModule";
import {OrderModule} from "./module/OrderModule";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => Object.assign(await getConnectionOptions(), {autoLoadEntities: true})
        }),
        HomeModule,
        CategoryModule,
        UserModule,
       CartModule,
        OrderModule,
        //暴露静态资源
        staticModule
    ]
})
export class AppModule {
}
