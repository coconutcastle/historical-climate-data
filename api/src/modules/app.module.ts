import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/logger.middleware';
import { GHCNMController } from './ghcnmv2/ghcnm.controller';
import { GHCNModule } from './ghcnmv2/ghcnm.module';

// @Module({
//   imports: [ConfigModule.forRoot({
//     envFilePath: ['.env.dev'],
//     isGlobal: true
//   })],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true
    })
  ]
})

export class AppModule implements NestModule {

  constructor(private configService: ConfigService) {}

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(GHCNMController)
  }
}
