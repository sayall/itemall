import { extname, join } from 'path';
import * as fs from 'fs';
import { nanoid } from 'nanoid';
import {updir} from "../constant";
import {UnauthorizedException} from "@nestjs/common";

export const upload = (file): string =>{
    const dir = join(__dirname, '../../', 'static'+updir);
    try {
        // 判断文件是否存在 不存在文件夹会抛出异常，捕获异常
        fs.statSync(dir);
    } catch (err) {
        // 创建文件夹
        fs.mkdir(dir, () => console.log('文件夹创建成功'));
    }
    //文件名
    const fileName =  nanoid() + extname(file.originalname);
    // 存储路径
    const path = join( dir,'./',fileName);
    // 创建文件输出流
    const writeStream = fs.createWriteStream(path);
    // 写入文件
    writeStream.write(file.buffer);
    // 关闭流
    writeStream.close();
    return fileName;
}


export const isUser=(u1,u2) :void =>{
      if (u1 !== u2) throw new UnauthorizedException("非法操作");
}