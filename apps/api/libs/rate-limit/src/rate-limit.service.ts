import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

@Injectable()
export class RateLimitService {
  private rateLimiter: Ratelimit;

  constructor(private configService: ConfigService) {
    const redis = new Redis({
      url: this.configService.get<string>('UPSTASH_REDIS_REST_URL'),
      token: this.configService.get<string>('UPSTASH_REDIS_REST_TOKEN'),
    });

    this.rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(
        this.configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 10),
        `${this.configService.get<number>('RATE_LIMIT_WINDOW', 60)} s`
      ),
      analytics: true,
      prefix: 'api_ratelimit',
    });
  }

  async limit(identifier: string) {
    return this.rateLimiter.limit(identifier);
  }
}