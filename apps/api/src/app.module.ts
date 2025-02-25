import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import appConfig from './config/app.config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PopulationModule } from './population/population.module';
import { CountryModule } from './country/country.module';
import { ApiDatasourceModule } from '@libs/api-datasource';
import { RateLimitModule, RateLimitService } from '@libs/rate-limit';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    // ThrottlerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
    //     throttlers: [
    //       {
    //         ttl: config.get<number>('RATE_LIMIT_TTL', 60),
    //         limit: config.get<number>('RATE_LIMIT_MAX_REQUESTS', 10),
    //       },
    //     ],
    //   }),
    // }),
    RateLimitModule.register(),
    HttpModule,
    PopulationModule,
    CountryModule,
    ApiDatasourceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}