import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerException } from '@nestjs/throttler';
import { RateLimitService } from '@libs/rate-limit';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private rateLimitService: RateLimitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Ignore rate limiting for logged-in users (assuming you have a user object in the request)
    if (request.user) {
      return true;
    }

    const ttl = this.configService.get<number>('RATE_LIMIT_TTL', 60);
    const limit = this.configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 10);

    const ip = this.getTrackingKey(request);
    const key = `${request.method}-${ip}`;

    const { success, remaining, reset } = await this.rateLimitService.limit(key);

    if (!success) {
      response.header('Retry-After', Math.ceil(reset / 1000));
      throw new ThrottlerException(`Too Many Requests. Retry after ${Math.ceil(reset / 1000)} seconds.`);
    }

    response.header('X-RateLimit-Limit', limit.toString());
    response.header('X-RateLimit-Remaining', remaining.toString());
    response.header('X-RateLimit-Reset', Math.ceil(reset / 1000).toString());

    return true;
  }

  protected getTrackingKey(request: any): string {
    return request.ips.length ? request.ips[0] : request.ip;
  }

  // Override the errorMessage method to customize the error response
  protected rateLimitErrorMessage(availableIn: number): HttpException {
    return new HttpException(
      `Too Many Requests. Retry after ${Math.ceil(availableIn / 1000)} seconds.`,
      HttpStatus.TOO_MANY_REQUESTS
    );
  }
}