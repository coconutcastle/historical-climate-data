import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  // await app.listen(parseInt(process.env.NEST_APP_PORT ?? '9999'), process.env.NEST_APP_HOST ?? 'localhost', 
  //   async function() { console.log(`Listening on ${await app.getUrl()}`) });

  await app.listen(parseInt(process.env.NEST_APP_PORT ?? '9999'), process.env.NEST_APP_HOST ?? 'localhost');
  console.log(`Listening on ${await app.getUrl()}, should be on ${process.env.NEST_APP_HOST}:${process.env.NEST_APP_PORT}`);

}
bootstrap();
