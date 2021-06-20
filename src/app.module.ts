import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {getConnectionOptions} from "typeorm";
import {HomeModule} from "./module/HomeModule";
import {CategoryModule} from "./module/CategoryModules";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), {autoLoadEntities: true})
    }),
    HomeModule,
    CategoryModule
  ]
})
export class AppModule {}
