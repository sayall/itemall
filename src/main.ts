import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const linstenPort = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('项目启动')
  await app.listen(linstenPort);
}
bootstrap();
