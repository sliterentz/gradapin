import { Ratelimit, type RatelimitConfig } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
// import { redisConfig, RedisConfig } from './keys';
import { ConfigService } from '@nestjs/config';
// import { RateLimitConfig } from './interfaces/ratelimit.interface';

export interface RateLimitConfig {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  RATE_LIMIT_WINDOW: number;
  RATE_LIMIT_MAX_REQUESTS: number;
}

export const createRedisClient = (config: ConfigService) => {
  return new Redis({
    url: config.get<string>('UPSTASH_REDIS_REST_URL'),
    token: config.get<string>('UPSTASH_REDIS_REST_TOKEN'),
  });
};

export const createRateLimiter = (
  config: ConfigService,
  props?: Partial<RatelimitConfig>
) => {
  const redis = createRedisClient(config);
  const window = config.get<number>('RATE_LIMIT_WINDOW') || 10;
  const maxRequests = config.get<number>('RATE_LIMIT_MAX_REQUESTS') || 10;

  return new Ratelimit({
    redis,
    limiter: props?.limiter ?? Ratelimit.slidingWindow(maxRequests, `${window} s`),
    prefix: props?.prefix ?? 'api-rate-limit',
    ...props,
  });
};

// export const createRateLimiter = (props: Omit<RatelimitConfig, 'redis'>) => {
//   const config = redisConfig();
//   const redis = createRedisClient(config);
//   return new Ratelimit({
//     redis,
//     limiter: props.limiter ?? Ratelimit.slidingWindow(10, '10 s'),
//     prefix: props.prefix ?? 'next-forge',
//   });
// };

export const { slidingWindow } = Ratelimit;
