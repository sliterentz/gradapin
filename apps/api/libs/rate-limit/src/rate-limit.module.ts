import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { RateLimitService } from './rate-limit.service';
import { RateLimitGuard } from './guards/rate-limit.guard';

@Module({})
export class RateLimitModule {
  static register(): DynamicModule {
    return {
      module: RateLimitModule,
      imports: [
        ConfigModule,
        ThrottlerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
            throttlers: [
              {
                ttl: config.get<number>('RATE_LIMIT_TTL', 60),
                limit: config.get<number>('RATE_LIMIT_MAX_REQUESTS', 10),
              },
            ],
          }),
        }),
      ],
      providers: [
        RateLimitService,
        RateLimitGuard,
      ],
      exports: [RateLimitService, RateLimitGuard],
    };
  }
}