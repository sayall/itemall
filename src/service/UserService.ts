import {BadRequestException,ForbiddenException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm";
//JWT验证
import {JwtService} from "@nestjs/jwt";
//用户实体类
import {User} from "../entity/User";
import {PROPHOTO, ROOTURL} from "../constant";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwt: JwtService
    ) {}
//用户注册
    async register(user: User): Promise<string> {
        await this.userRepository.save(user);
        if (user.id) return '添加成功';
        throw new ForbiddenException('添加失败');
    }
//用户个人信息查看
    async findUser(phone: string): Promise<User> {
        const userInfo = await this.userRepository.findOne(phone);
        if (!userInfo) throw new BadRequestException('用户不存在');
        if(!userInfo.avatar) userInfo.avatar= ROOTURL+PROPHOTO
        return userInfo;
    }

}