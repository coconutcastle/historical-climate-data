import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // const port = this.configService.get('NEST_APP_PORT');

  // await app.listen(port);
  await app.listen(9999);
}
bootstrap();
