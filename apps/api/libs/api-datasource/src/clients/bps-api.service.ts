import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, TimeoutError } from 'rxjs';
import { AxiosError } from 'axios';
import { BPSApiClient } from '../interfaces/bpsapi-client.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BpsApiService implements BPSApiClient {
    private readonly baseUrl = 'https://webapi.bps.go.id/v1/api';
    private readonly listEndpoint = 'list/model/data/lang/ind/domain/0000/var';
    private readonly viewEndpoint = 'view/domain/0000/model/statictable/lang/ind/id';
    private readonly logger = new Logger(BpsApiService.name);

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {}
    
    async getData(variableCode: string, isList: boolean): Promise<any> {
        const endpoint = isList ? this.listEndpoint : this.viewEndpoint;
        const url = this.baseUrl+`/${endpoint}/${variableCode}/key/${this.configService.get('BPS_KEY')}`;
        this.logger.log(`Fetching BPS data with url: ${url}`);

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    timeout: 5000, // 5 seconds timeout
                    maxRedirects: 2,
                }));
            return response.data;
        } catch (error) {
            this.handleError(error, url);
            throw error;
        }
    }

    private handleError(error: unknown, url: string): void {
        if (error instanceof TimeoutError) {
            this.logger.error(`Request timed out for URL: ${url}`);
        } else if (error instanceof AxiosError) {
            this.logger.error(`HTTP error: ${error.message}`, error.stack);
            if (error.response) {
                this.logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
                this.logger.error(`Response status: ${error.response.status}`);
            }
            if (error.code === 'ECONNABORTED') {
                this.logger.error(`Connection aborted (possible socket hangup) for URL: ${url}`);
            }
        } else {
            this.logger.error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
        }
    }
}