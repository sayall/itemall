import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResultInterceptor } from './common/interceptor/ResultInterceptor';
import { AllExceptionsFilter } from './common/filter/ExceptionFilter';


const linstenPort = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('项目启动')
  // 全局拦截器 => 处理成功操作
  app.useGlobalInterceptors(new ResultInterceptor());
  // 全局异常过滤器 => 失败操作，或者异常问题
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(linstenPort);
}
bootstrap();
