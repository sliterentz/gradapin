import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRateLimiter } from '@repo/rate-limit/index';
import { Ratelimit } from '@upstash/ratelimit';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private rateLimiter: Ratelimit;

  constructor(private configService: ConfigService) {
    this.rateLimiter = createRateLimiter(this.configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;

    const { success } = await this.rateLimiter.limit(ip);

    if (!success) {
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    return true;
  }
}