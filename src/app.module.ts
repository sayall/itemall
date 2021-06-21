import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {getConnectionOptions} from "typeorm";
import {HomeModule} from "./module/HomeModule";
import {CategoryModule} from "./module/CategoryModules";
import {UserModule} from "./module/UserModule";
import {staticModuleModule} from "./module/staticModule";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => Object.assign(await getConnectionOptions(), {autoLoadEntities: true})
        }),
        HomeModule,
        CategoryModule,
        UserModule,
        //暴露静态资源
        staticModuleModule
    ]
})
export class AppModule {
}
