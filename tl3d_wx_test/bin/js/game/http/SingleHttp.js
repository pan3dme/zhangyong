/**
* name
*/
var http;
(function (http) {
    var SingleHttp = /** @class */ (function () {
        function SingleHttp() {
            this._tryTime = 2;
            this.lastTime = 0;
            this._isDone = false;
            this._http = new Laya.HttpRequest();
            this._http.on(Laya.Event.COMPLETE, this, this.requestComplete);
            this._http.on(Laya.Event.ERROR, this, this.requestError);
        }
        //请求登录
        SingleHttp.prototype.send = function (url, data, httptype, contenttype) {
            this._tryTime--;
            if (this._tryTime >= 0) {
                if (this._http) {
                    var ctype = contenttype ? contenttype : "application/x-www-form-urlencoded;charset=UTF-8";
                    var headers = ["Content-Type", ctype];
                    var parmStr = "";
                    if (data instanceof Object) {
                        parmStr = this.parseParms(data);
                    }
                    else {
                        parmStr = data;
                    }
                    if (httptype == "get") {
                        url += "/?" + parmStr;
                    }
                    this._http.send(url, (httptype == "get") ? "" : parmStr, httptype, "text", headers);
                }
            }
        };
        SingleHttp.prototype.tryAgain = function () {
        };
        SingleHttp.prototype.parseParms = function (object) {
            var parms = "";
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    parms += key + "=" + object[key] + "&";
                }
            }
            return parms;
        };
        /**
         * 添加请求回调
         */
        SingleHttp.prototype.addCallback = function (requestSuccess, requestFail) {
            if (requestSuccess === void 0) { requestSuccess = null; }
            if (requestFail === void 0) { requestFail = null; }
            this._requestSuccess = requestSuccess;
            this._requestFail = requestFail;
        };
        /**
         * 请求成功
         */
        SingleHttp.prototype.showRequestSuccess = function (data) {
            if (this._requestSuccess) {
                if (this._backArgs) {
                    this._backArgs.unshift(data);
                    this._requestSuccess.apply(this, this._backArgs);
                }
                else {
                    this._requestSuccess(data);
                }
            }
        };
        SingleHttp.prototype.isDone = function () {
            return this._isDone;
        };
        /**
         * 请求成功
         * @param event
         */
        SingleHttp.prototype.requestComplete = function (event) {
            var response = this._http.data;
            if (response) {
                this.showRequestSuccess(response);
            }
            else {
            }
            this.requestClear();
        };
        /**
         * 请求出错
         * @param event
         */
        SingleHttp.prototype.requestError = function (event) {
            this.requestClear();
            common.AlertBox.showAlertYes({
                text: LanMgr.getLan("", 10492), confirmCb: function () {
                    BingoSDK.gameRefresh();
                }
            });
        };
        /**
         * 清除监听
         */
        SingleHttp.prototype.requestClear = function () {
            this._isDone = true;
            this._tryTime = 0;
            this._reqUrl = null;
            this._parmData = null;
            if (this._requestSuccess) {
                this._requestSuccess = null;
            }
            if (this._requestFail) {
                this._requestFail = null;
            }
            this.clearHttp();
        };
        SingleHttp.prototype.clearHttp = function () {
            if (this._http) {
                this._http = null;
            }
        };
        return SingleHttp;
    }());
    http.SingleHttp = SingleHttp;
})(http || (http = {}));
