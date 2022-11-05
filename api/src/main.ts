import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = this.configService.get('NEST_APP_PORT');
  
  await app.listen(port);
}
bootstrap();
