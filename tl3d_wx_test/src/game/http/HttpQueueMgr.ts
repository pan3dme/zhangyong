
/** http队列 */
class HttpQueueMgr {
    public static MAX_HTTP_COUNT : number = 3;
    /** http等待队列 */
    public static _httpWaitList : http.NativeHttp[] = [];
    /** http当前执行队列 */
    private static _curHttpList :  http.NativeHttp[] = [];

    /** 添加进队列 */
    public static push(cmd: http.NativeHttp): void {
        this._httpWaitList.push(cmd);
        // window["pushCnt"] = window["pushCnt"] || 0;
        // loghgy("添加进队列",window["pushCnt"]++);
        this.update();
    }

    /** 刷新队列 */
    public static update(): void {
        let len = this._curHttpList.length;
        // 清除已完成的HTTP请求
        if(len >= 0){
            for(let i = len - 1 ; i >= 0 ; i-- ){
                let http : http.NativeHttp = this._curHttpList[i];
                if(http.isDone()){
                    this._curHttpList.splice(i,1);
                    // window["spliceCnt"] = window["spliceCnt"] || 0;
                    // loghgy("清除已完成的清除",window["spliceCnt"]++);
                }
            }
        }
        len = this._curHttpList.length;
        // 网络请求不得多于3个
        if(len < HttpQueueMgr.MAX_HTTP_COUNT && this._httpWaitList.length > 0){
            let http : http.NativeHttp = this._httpWaitList.shift();
            if(http) {
                this._curHttpList.push(http);
                http.nativesend();
                // window["sendCnt"] = window["sendCnt"] || 0;
                // loghgy("执行请求",window["sendCnt"]++);
            }
        }
    }

    /** 清除队列 */
    public static clear(): void {
        this._httpWaitList.length = 0;
        this._curHttpList.length = 0;
    }
}