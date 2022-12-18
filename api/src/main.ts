import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  await app.listen(parseInt(process.env.NEST_APP_PORT ?? '9999'), '0.0.0.0', 
    async function() { console.log(`Listening on ${await app.getUrl()}`) });
}
bootstrap();
