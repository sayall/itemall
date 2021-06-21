import {Body, Controller, ForbiddenException, Get, Post} from "@nestjs/common";
import {UserService} from "../service/UserService";
import { User } from '../entity/User';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    //用户注册
    @Post('register')
     async register ( @Body() user: User):Promise<string>{
        return this.service.register(user);
        }

    @Post('findUser')
    async findUser(@Body() phone: string){
        return this.service.findUser(phone)
    }

}