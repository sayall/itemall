import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {getConnectionOptions} from "typeorm";
import {BannerModule} from "./module/BannerModule";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), {autoLoadEntities: true})
    }),
    BannerModule
  ]
})
export class AppModule {}
