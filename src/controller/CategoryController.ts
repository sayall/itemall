import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from '../service/CategoryService';
import {Category} from "../entity/Category";
import {Subcategory} from "../entity/Subcategory";

@Controller('category')
export  class CategoryController {
    constructor(private readonly service: CategoryService) {}

    //查询商品分类
    @Get()
    async queryC():Promise<Category[]>{
        return this.service.queryCategory();
    }
    @Get('sub')
    async querySubcategory(@Query() maitKey:string): Promise<Subcategory[]> {
        return this.service.querySubCategory(maitKey);
    }
}