import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoryController} from '../controller/CategoryController';
import {CategoryService} from '../service/CategoryService';
import {Category} from '../entity/Category';
import {Subcategory} from '../entity/Subcategory';

/**
 * 分类模块
 */
@Module({
    imports: [TypeOrmModule.forFeature([Category, Subcategory])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {
}
