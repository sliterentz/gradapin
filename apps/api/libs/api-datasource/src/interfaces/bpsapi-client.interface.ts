import { ApiClient } from "./api-client.interface";

export interface BPSApiClient extends ApiClient {
    getData(variableCode: string, isList: boolean): Promise<any>;
}