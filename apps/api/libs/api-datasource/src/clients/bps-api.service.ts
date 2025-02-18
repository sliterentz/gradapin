import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { BPSApiClient } from '../interfaces/bpsapi-client.interface';

@Injectable()
export class BpsApiService implements BPSApiClient {
    private readonly baseUrl = 'https://webapi.bps.go.id/v1/api';
    private readonly listEndpoint = '/list/model/data/lang/ind/domain/0000/var';
    private readonly viewEndpoint = '/view/domain/0000/model/statictable/lang/ind/id';

    constructor(private httpService: HttpService) {}
    
    async getData(isList: boolean, variableCode: string, apiKey: string): Promise<any> {
        const endpoint = isList ? this.listEndpoint : this.viewEndpoint;
        const url = `${this.baseUrl}}/${endpoint}/${variableCode}/key/${apiKey}`;
        const response = this.httpService.get(url).pipe(
                    map(response => response.data)
                );
        return response;
    }
}