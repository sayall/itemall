// 共有数据配置
export enum SMSConstant {
    secretId = 'AKIDNWR8ZkG88tOkslDqUyFH6HEpH6j9kWu5',
    secretKey = '66cljT0pQ3Q2A5jChYBXfYszviNoyvc6',
    TemplateID = '894268',
    SmsSdkAppid = '1400495284',
}

export enum JWTConstant {
    secret = 'itemall',
    expiresIn = '7d',
}

export enum LIMIT {
    PAGE_SIZE = 30,
}
//端口
export  const linstenPort = 3000;
//根路径
export const ROOTURL = 'http://localhost:'+linstenPort;
//默认头像
export const PROPHOTO = '/Profilephoto.jpg';
//上传文件夹
export  const updir = '/upload';

/**
 * 订单状态
 */
export enum ORDER_STATUS {
    INIT = 0,
    FINISH = 1,
    CANCEL = 2,
}

