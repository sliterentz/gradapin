import { ApiClient } from "./api-client.interface";

export interface WBApiClient extends ApiClient {
    getData(endpoint: string, countryCode: string, indicator: string, from: string, to: string): Promise<any>;
}