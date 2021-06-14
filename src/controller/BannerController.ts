import {Controller, Get} from "@nestjs/common";


@Controller()
export class BannerController {
    @Get('banner')
    selectBanner() {
        return '111'
    }
}