import {
    Body,
    Controller,
    Post, Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {UserService} from "../service/UserService";
import { User } from '../entity/User';
import {FileInterceptor} from "@nestjs/platform-express";
import {EncryptPipe} from "../common/pipe/EncryptPipe";
import {AuthGuard} from "../common/guard/AuthGuard";


@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    //用户注册
    @Post('register')
    @UsePipes(EncryptPipe)
     async register ( @Body() user: User):Promise<string>{
        return this.service.register(user);
        }

    //用户查询
    @Post('findUser')
    @UseGuards(AuthGuard)
    async findUser(@Body() phone: string, @Req() req):Promise<object>{
        return this.service.findUser(phone,req.auth_user)
    }
    //用户登录
    @Post('login')
    @UsePipes(EncryptPipe)
    async userLogin(@Body() user: User):Promise<object>{
        return this.service.userLogin(user)
    }
    //用户图片上传
    @UseInterceptors(FileInterceptor('avatar'))
    @Post('avatarUpload')
    async avatarUpload(@UploadedFile() avatar){
        return this.service.avatarUpload(avatar)
    }

}