export interface ApiClient {
    getData(...args: any[]): Promise<any>;
}
