import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//引入实体类
import { Category } from '../entity/Category';
import { Subcategory } from '../entity/Subcategory';

//分类数据
@Injectable()
export class CategoryService {
    //引入实体类
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Subcategory)
        private readonly subcategoryRepository: Repository<Subcategory>,
    ) {}
    //查询商品分类
    async  queryCategory():Promise<Category[]>{
        return await this.categoryRepository.find();
    }
    //查询详细分类
    async  querySubCategory(maitKey:string = '3627'):Promise<Subcategory[]>{
        return await this.subcategoryRepository.find({
            where:maitKey,
            order: {id:'ASC'}
        });
    }
}