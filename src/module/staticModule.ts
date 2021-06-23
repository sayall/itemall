import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {staticController} from '../controller/staticController';


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', 'static'),
            exclude: ['/api*']
        }),
    ],
    controllers: [staticController],
})
export class staticModule {}