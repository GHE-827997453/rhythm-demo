class XHRManager {

    public send(req: IXHRReq): void {
        const xhr = new XMLHttpRequest();
        xhr.open(req.method, req.url);
        xhr.responseType = req.responseType;
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                req.success && req.success(xhr.response);
            } else {
                req.fail && req.fail();
            }
        }
        xhr.onerror = ()=>{
            console.error(`url: ${req.url}, 请求出错`);
            req.fail && req.fail();
        }
        xhr.ontimeout = () => {
            console.warn(`url: ${req.url}, 请求超时`);
            req.fail && req.fail();
        }
        xhr.send();
    }
}
export const mXhr = new XHRManager();