import {Controller, Get, Query} from "@nestjs/common";
import {HomeService} from '../service/HomeService'
import {LIMIT} from "../constant";

@Controller('home')
export class HomeController {
    //引入HomeService在后面调用
    constructor(private readonly service: HomeService) {
    }
    //查询首页banner
    @Get('banner')
    async banner():Promise<object>{
        return this.service.queryBanner();
    }
    //查询首页推荐
    @Get('recommend')
    async recommend():Promise<object>{
        return this.service.queryRecommend();
    }
    //查询分页 参数 请求页码，总页数，排序方式，升降序，类型
    @Get('pages')
    async Goods(@Query() query):Promise<object>{
        return this.service.queryGoods(query.page, query.pageSize, query.ordersby,query.sort, query.type);
    }

}