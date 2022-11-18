declare interface ISong {
    name: string,
    url: string,
    mNodeType1: number[],
    mNodeType2: {start: number, end: number}[];
}

declare interface IXHRReq {
    url: string,
    method: string,
    responseType: XMLHttpRequestResponseType,
    success?: (data: any) => void;
    fail?: (msg?: string) => void;
}

declare interface ILevelPlaza {
    index: number,
    cover: string,
    music: string
}
declare type Level = {[key: string]: ILevelPlaza[]};