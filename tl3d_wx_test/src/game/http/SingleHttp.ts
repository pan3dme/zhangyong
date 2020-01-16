/**
* name 
*/
module http {
    export class SingleHttp {
        private _requestSuccess: Function;
        private _requestFail: Function;
        private _backArgs: any[];
        private _parmData: Object;
        private _reqUrl: string;
        private _tryTime: number = 2;
        private _http: Laya.HttpRequest;
        private lastTime: number = 0;
        private _isDone = false;

        constructor() {
            this._http = new Laya.HttpRequest();
            this._http.on(Laya.Event.COMPLETE, this, this.requestComplete);
            this._http.on(Laya.Event.ERROR, this, this.requestError);
        }

        //请求登录
        send(url: string, data: any, httptype: string, contenttype?): void {
            this._tryTime--;
            if (this._tryTime >= 0) {
                if (this._http) {
                    let ctype = contenttype ? contenttype : "application/x-www-form-urlencoded;charset=UTF-8";
                    let headers = ["Content-Type", ctype];
                    let parmStr = "";
                    if (data instanceof Object) {
                        parmStr = this.parseParms(data)
                    } else {
                        parmStr = data;
                    }
                    if (httptype == "get") {
                        url += "/?" + parmStr;
                    }
                    this._http.send(url, (httptype == "get") ? "" : parmStr, httptype, "text", headers);
                }
            }
        }


        private tryAgain(): void {

        }

        private parseParms(object): string {
            let parms: string = "";
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    parms += key + "=" + object[key] + "&";
                }
            }
            return parms;
        }

        /**
         * 添加请求回调
         */
        addCallback(requestSuccess: Function = null, requestFail: Function = null) {
            this._requestSuccess = requestSuccess;
            this._requestFail = requestFail;
        }
        /**
         * 请求成功
         */
        showRequestSuccess(data: Object): void {
            if (this._requestSuccess) {
                if (this._backArgs) {
                    this._backArgs.unshift(data);
                    this._requestSuccess.apply(this, this._backArgs);
                } else {
                    this._requestSuccess(data);
                }
            }
        }


        public isDone(): boolean {
            return this._isDone;
        }

        /**
         * 请求成功
         * @param event 
         */
        private requestComplete(event: Laya.Event): void {
            var response = this._http.data;
            if (response) {
                this.showRequestSuccess(response);
            }
            else {

            }
            this.requestClear();
        }
        /**
         * 请求出错
         * @param event 
         */
        private requestError(event: Laya.Event): void {
            this.requestClear();
            common.AlertBox.showAlertYes({
                text: LanMgr.getLan("", 10492), confirmCb: () => {
                    BingoSDK.gameRefresh();
                }
            });
        }


        /**
         * 清除监听
         */
        private requestClear(): void {
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
        }

        private clearHttp(): void {
            if (this._http) {
                this._http = null;
            }
        }
    }
}