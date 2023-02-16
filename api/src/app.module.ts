import * as dotenv from "dotenv";
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/logger.middleware';
import { GHCNMController } from './modules/ghcnmv2/ghcnm.controller';
import { GHCNModule } from './modules/ghcnmv2/ghcnm.module';
import { GHCNMStationMetadata, GHCNMAnomalyData, GHCNMPrecipitationData, GHCNMAnnualCycleData, GHCNMCountryCode } from "./modules/ghcnmv2/ghcnm.entity";

dotenv.config({ path: `${process.cwd()}\\.env.dev` });
// dotenv.config({ path: `${process.cwd()}\\.env.prod` });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}\\.env.${process.env.NODE_ENV}`,
      // envFilePath: `${process.cwd()}\\.env.dev`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [GHCNMStationMetadata, GHCNMAnomalyData, GHCNMPrecipitationData, GHCNMAnnualCycleData, GHCNMCountryCode],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true'
    }),
    GHCNModule,
  ]
})

export class AppModule implements NestModule {

  constructor(private readonly configService: ConfigService) {
    // basic configuration validation
    const port = this.configService.get<number>('NEST_APP_PORT');

    if (!port) {
      throw new Error(`App port is undefined.`);
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(GHCNMController)
  }
}
