import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Banner} from "../entity/Banner";
import {Recommend} from "../entity/Recommend";


// 首页数据

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Banner)
        private readonly bannerRepository: Repository<Banner>,
        @InjectRepository(Recommend)
        private readonly recommendRepository: Repository<Recommend>,
    ) {}

    // 查询轮播数据
    async queryBanner():Promise<object>{
        return await this.bannerRepository.find();
    }
    // 查询recommend数据
    async queryRecommend():Promise<object>{
        return await this.recommendRepository.find();
    }
}

