import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import * as md5 from 'md5-node';

//密码加密
@Injectable()
export class EncryptPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value.password = md5(value.password);
        return value;
    }
}