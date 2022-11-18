import { mXhr } from "./Manager/XHRManager";

export class ConfigLoader {
    private static uri: string = 'http://172.16.11.229:7894/level/';
    static load<T>(name: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const req: IXHRReq = {
                url: `${this.uri}${name}.json`,
                method: "get",
                responseType: "json",
                success: (data) => {
                    resolve(JSON.parse(data))
                },
                fail: () => {
                    reject();
                }
            }
            mXhr.send(req);    
        })
    }
}