import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerStorage, getStorageToken } from '@nestjs/throttler';

@Injectable()
export class RateLimitService {
  constructor(
    private configService: ConfigService,
    @Inject(getStorageToken())
    private storage: ThrottlerStorage,
  ) {}

  async limit(identifier: string) {
    const ttl = this.configService.get<number>('RATE_LIMIT_TTL', 60);
    const limit = this.configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 10);
    const blockDuration = this.configService.get<number>('RATE_LIMIT_BLOCK_DURATION', 0);

    const record = await this.storage.increment(
      identifier,
      ttl,
      limit,
      blockDuration,
      'api_ratelimit',
    );

    const success = !record.isBlocked && record.totalHits <= limit;
    const remaining = Math.max(limit - record.totalHits, 0);
    const reset = record.isBlocked ? record.timeToBlockExpire : record.timeToExpire;

    return { success, remaining, reset };
  }
}
