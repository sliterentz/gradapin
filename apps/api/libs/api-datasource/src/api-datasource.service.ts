import { Injectable } from '@nestjs/common';
import { ApiClient } from "./interfaces/api-client.interface";
// import { WBApiClient } from './interfaces/wbapi-client.interface';
import { WorldBankApiService } from './clients/word-bank-api.service'
// import { BPSApiClient } from './interfaces/bpsapi-client.interface';
import { BpsApiService } from './clients/bps-api.service';

export enum ApiSource {
    WORLD_BANK = 'WORLD_BANK',
    BPS = 'BPS',
}

@Injectable()
export class ApiDatasourceService {
    private currentSource: ApiSource = ApiSource.WORLD_BANK;
    private clients: Record<ApiSource, ApiClient>;
    
    constructor(
        private readonly worldBankApiClient: WorldBankApiService,
        private readonly bpsApiClient: BpsApiService,
    ) {
        this.clients = {
            [ApiSource.WORLD_BANK]: this.worldBankApiClient,
            [ApiSource.BPS]: this.bpsApiClient,
        };
    }

    setSource(source: ApiSource): void {
        this.currentSource = source;
    }
        
    getCurrentClient(): ApiClient {
        return this.clients[this.currentSource];
    }

    async getData(...args: any[]): Promise<any> {
        const client = this.getCurrentClient();
        return client.getData(...args);
    }
}
