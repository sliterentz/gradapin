export type AppConfig = {
    nodeEnv: string;
    name: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
    fallbackLanguage: string;
    headerLanguage: string;
    bpsKey?: string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
    RATE_LIMIT_WINDOW: number;
    RATE_LIMIT_MAX_REQUESTS: number;
};
