import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { WBApiClient } from '../interfaces/wbapi-client.interface';

@Injectable()
export class WorldBankApiService implements WBApiClient {
    private readonly baseUrl = 'https://api.worldbank.org/v2';

    constructor(private httpService: HttpService) {}
    
    async getData(endpoint: string, countryCode: string, indicator: string, from: string, to: string): Promise<any> {
        const url = `${this.baseUrl}/${endpoint}/${countryCode}/indicator/${indicator}`;
        const params = {
            date: `${from}:${to}`,
            format: 'json'
        };
        const response = this.httpService.get(url, { params }).pipe(
                    map(response => response.data)
                );
        return response;
    }
}