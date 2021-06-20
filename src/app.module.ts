import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {getConnectionOptions} from "typeorm";
import {HomeModule} from "./module/HomeModule";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), {autoLoadEntities: true})
    }),
    HomeModule
  ]
})
export class AppModule {}
