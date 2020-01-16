/** http队列 */
var HttpQueueMgr = /** @class */ (function () {
    function HttpQueueMgr() {
    }
    /** 添加进队列 */
    HttpQueueMgr.push = function (cmd) {
        this._httpWaitList.push(cmd);
        // window["pushCnt"] = window["pushCnt"] || 0;
        // loghgy("添加进队列",window["pushCnt"]++);
        this.update();
    };
    /** 刷新队列 */
    HttpQueueMgr.update = function () {
        var len = this._curHttpList.length;
        // 清除已完成的HTTP请求
        if (len >= 0) {
            for (var i = len - 1; i >= 0; i--) {
                var http_1 = this._curHttpList[i];
                if (http_1.isDone()) {
                    this._curHttpList.splice(i, 1);
                    // window["spliceCnt"] = window["spliceCnt"] || 0;
                    // loghgy("清除已完成的清除",window["spliceCnt"]++);
                }
            }
        }
        len = this._curHttpList.length;
        // 网络请求不得多于3个
        if (len < HttpQueueMgr.MAX_HTTP_COUNT && this._httpWaitList.length > 0) {
            var http_2 = this._httpWaitList.shift();
            if (http_2) {
                this._curHttpList.push(http_2);
                http_2.nativesend();
                // window["sendCnt"] = window["sendCnt"] || 0;
                // loghgy("执行请求",window["sendCnt"]++);
            }
        }
    };
    /** 清除队列 */
    HttpQueueMgr.clear = function () {
        this._httpWaitList.length = 0;
        this._curHttpList.length = 0;
    };
    HttpQueueMgr.MAX_HTTP_COUNT = 3;
    /** http等待队列 */
    HttpQueueMgr._httpWaitList = [];
    /** http当前执行队列 */
    HttpQueueMgr._curHttpList = [];
    return HttpQueueMgr;
}());
