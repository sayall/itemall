import {Controller, Get} from "@nestjs/common";
import {HomeService} from '../service/HomeService'

@Controller()
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
}