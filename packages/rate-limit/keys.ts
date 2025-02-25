import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export const redisConfigValidationSchema = z.object({
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

export const redisConfig = registerAs('redis', () => {
  const config = {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  };

  const result = redisConfigValidationSchema.safeParse(config);

  if (!result.success) {
    const missingFields = result.error.issues.map(issue => issue.path.join('.'));
    throw new Error(`Missing or invalid Redis configuration: ${missingFields.join(', ')}`);
  }

  if (!result.data.UPSTASH_REDIS_REST_URL || !result.data.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required');
  }

  return result.data;
});

export type RedisConfig = z.infer<typeof redisConfigValidationSchema>;