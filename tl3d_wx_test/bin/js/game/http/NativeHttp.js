/**
* name
*/
var http;
(function (http_1) {
    var NativeHttp = /** @class */ (function () {
        function NativeHttp() {
            this._tryTime = 2;
            this._idDone = false; // 是否结束
            this._http = new XMLHttpRequest();
            this._http.ontimeout = this._onTimeout.bind(this);
            this._http.timeout = 5000;
            this._http.responseType = "arraybuffer";
            this._http.onerror = this._onError.bind(this);
            this._http.onload = this._onloaded.bind(this);
        }
        /**
         * 获取http
         */
        NativeHttp.getHttp = function () {
            //logdebug("NativeHttp Count:", NativeHttp._httpPools.length)
            if (NativeHttp._httpPools.length > 0) {
                return NativeHttp._httpPools.shift();
            }
            return new NativeHttp();
        };
        /**
         * 回收对象
         * @param http
         */
        NativeHttp.recyle = function (http) {
            http.clear();
            NativeHttp._httpPools.push(http);
        };
        /** 设置请求数据 */
        NativeHttp.prototype.setData = function (url, data, loadFlag) {
            this._url = url;
            this._data = data;
            this._loadFlag = loadFlag;
        };
        /**
         * 原生http请求
         * @param url
         * @param data
         */
        NativeHttp.prototype.nativesend = function () {
            var _this = this;
            if (!Launch.online) {
                // logyhj("网络已断开就不发送请求");
                this.stopRequest();
                return;
            }
            this._tryTime--;
            if (this._loadFlag) {
                this._timeout = setTimeout(function () {
                    UIMgr.getInstance().showWaiting();
                    _this._hasWaiting = true;
                }, 1000);
            }
            this._http.open('post', this._url, true);
            if (!this._initHead) {
                this._initHead = true;
                this._http.setRequestHeader("Content-Type", "application/octet-stream");
            }
            this._http.send(this._data);
        };
        NativeHttp.prototype._onloaded = function (response) {
            var status = this._http.status !== undefined ? this._http.status : 200;
            if ((this._http.status >= 200 && this._http.status < 300) || this._http.status == 304) {
                var bytes = new Laya.Byte(this._http.response || response);
                PLC.getInstance().processPackage(bytes);
                this.stopRequest();
            }
            else {
                logerror("[" + this._http.status + "]" + this._http.statusText + ":" + this._http.responseURL);
                this.tryAgain();
            }
        };
        NativeHttp.prototype._onTimeout = function (e) {
            this.tryAgain();
        };
        NativeHttp.prototype._onError = function (e) {
            logerror("onerror:", e);
            this.tryAgain();
        };
        /**
         * 重试
         */
        NativeHttp.prototype.tryAgain = function () {
            var _this = this;
            if (this._tryTime >= 0) {
                setTimeout(function () {
                    _this.nativesend();
                }, 2000);
            }
            else {
                showToast(LanMgr.getLan('', 10213));
                this.stopRequest();
            }
        };
        NativeHttp.prototype.stopRequest = function () {
            NativeHttp.recyle(this);
        };
        /** 是否结束 */
        NativeHttp.prototype.isDone = function () {
            return this._idDone;
        };
        /**
         * 清理
         */
        NativeHttp.prototype.clear = function () {
            this._idDone = true;
            if (this._loadFlag) {
                clearTimeout(this._timeout);
                this._loadFlag = false;
            }
            if (this._hasWaiting) {
                UIMgr.getInstance().hideWaiting();
                this._hasWaiting = false;
            }
            this._tryTime = 2;
            this._url = null;
            this._data = null;
            this._timeout = 0;
            HttpQueueMgr.update();
        };
        NativeHttp._httpPools = new Array();
        return NativeHttp;
    }());
    http_1.NativeHttp = NativeHttp;
})(http || (http = {}));
