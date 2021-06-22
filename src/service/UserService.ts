import {BadRequestException, ForbiddenException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm";
//JWT验证
import {JwtService} from "@nestjs/jwt";
//用户实体类
import {User} from "../entity/User";
import {PROPHOTO, ROOTURL, updir} from "../constant";
import {isUser, upload} from "../util/upload";
import * as fs from 'fs';
import {join} from "path";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwt: JwtService
    ) {}
//用户注册
    async register(user: User): Promise<string> {
        //用户手机号是否存在
        const isExist = await this.userRepository.findOne({ phone: user.phone });
        if (isExist) throw new BadRequestException('手机号已经注册');
        //如果提交了图片，则判断图片是否存在
        if(user.avatar){
            const avatarPath = join(__dirname, '../../', 'static'+updir,user.avatar)
            try {
                // 判断文件是否存在 不存在会抛出异常，捕获异常
                fs.statSync(avatarPath);
            } catch (err) {
              throw new ForbiddenException('头像不存在');
            }
        }
        await this.userRepository.save(user);
        if (user.id) return '添加成功';
        throw new ForbiddenException('添加失败');
    }
//用户个人信息查看
    async findUser(phone: string,uid): Promise<User> {
        const userInfo = await this.userRepository.findOne(phone);
        if (!userInfo) throw new BadRequestException('用户不存在');
        //判断是否存在
        isUser(uid ,userInfo.id);
        //处理头像
        if(!userInfo.avatar)
        {
            userInfo.avatar= ROOTURL+PROPHOTO
        }else{
            userInfo.avatar=ROOTURL+updir+'/'+userInfo.avatar
        }
        // 删除密码
        delete userInfo.password;
        return userInfo;
    }
 //用户头像上传
    async avatarUpload (file): Promise<string>{
        return upload(file);
    }
 //用户登录
    async userLogin(user: User): Promise<Object>{

        const loginUser = await this.userRepository.findOne({phone:user.phone})
        if (!loginUser) throw new BadRequestException('手机号不存在');
        if (loginUser.password !== user.password)
            throw new BadRequestException('密码错误');
        const token = this.jwt.sign({ id: loginUser.id, phone: loginUser.phone });
        //处理头像
        if(!loginUser.avatar)
        {
            loginUser.avatar= ROOTURL+PROPHOTO
        }else{
            loginUser.avatar=ROOTURL+updir+'/'+loginUser.avatar
        }
        // 删除密码
        delete loginUser.password;


        return { user: loginUser, token };

    }

}