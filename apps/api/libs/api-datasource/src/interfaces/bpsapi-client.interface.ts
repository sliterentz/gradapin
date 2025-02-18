import { ApiClient } from "./api-client.interface";

export interface BPSApiClient extends ApiClient {
    getData(isList: boolean, variableCode: string, apiKey: string): Promise<any>;
}