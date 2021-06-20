import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
//引入配置项
import {LIMIT} from '../constant';
//引入实体类
import {Banner} from "../entity/Banner";
import {Recommend} from "../entity/Recommend";
import {Goods} from "../entity/Goods";
import {Detail} from "../entity/Detail";


// 首页数据

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Banner)
        private readonly bannerRepository: Repository<Banner>,
        @InjectRepository(Recommend)
        private readonly recommendRepository: Repository<Recommend>,
        @InjectRepository(Goods)
        private readonly goodsRepository: Repository<Goods>,
        @InjectRepository(Detail)
        private readonly detailRepository: Repository<Detail>,
    ) {
    }

    // 查询轮播数据
    async queryBanner(): Promise<object> {
        return await this.bannerRepository.find();
    }

    // 查询recommend数据
    async queryRecommend(): Promise<object> {
        return await this.recommendRepository.find();
    }

    //根据商品id查询商品详情
    async queryGoodsDetail(gid: string): Promise<object> {
        return await this.detailRepository.findOne({iid: gid});
    }

    //分页查询商品列表
    async queryGoods(page: number = 1, pageSize: number = LIMIT.PAGE_SIZE, ordersby: string = 'id', sort: string = 'DESC', type: string = 'new'): Promise<object>
    {
        const skip = (page - 1) * pageSize;
        const goodsCount = await this.goodsRepository.findAndCount({where: {type}})
        const pagesCount = Math.ceil(goodsCount[1] / pageSize);
        if(pagesCount<page)
            throw new HttpException('请求页码超过最大页码', HttpStatus.BAD_REQUEST)
        const goods = await this.goodsRepository.find({
            where: {type},
            order: {[ordersby]:sort},
            skip,
            take: pageSize
        })
        return{pagesCount,goods}
    }
}
