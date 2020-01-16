/**
* name 
*/
module http {
	export class NativeHttp {
		private _tryTime: number = 2;
		private _http: XMLHttpRequest;
		private _url: string;
		private _data: any;
		private _timeout: number;
		private _loadFlag: boolean;
		private _hasWaiting: boolean;
		private _initHead: boolean;
		private _idDone: boolean = false;	// 是否结束

		static _httpPools: Array<NativeHttp> = new Array<NativeHttp>();

		/**
		 * 获取http
		 */
		static getHttp(): NativeHttp {
			//logdebug("NativeHttp Count:", NativeHttp._httpPools.length)
			if (NativeHttp._httpPools.length > 0) {
				return NativeHttp._httpPools.shift();
			}
			return new NativeHttp();
		}

		/**
		 * 回收对象
		 * @param http 
		 */
		static recyle(http: NativeHttp): void {
			http.clear();
			NativeHttp._httpPools.push(http);
		}

		constructor() {
			this._http = new XMLHttpRequest();
			this._http.ontimeout = this._onTimeout.bind(this);
			this._http.timeout = 5000;
			this._http.responseType = "arraybuffer";
			this._http.onerror = this._onError.bind(this);
			this._http.onload = this._onloaded.bind(this);
		}
		/** 设置请求数据 */
		setData(url: string, data: any, loadFlag: boolean): void {
			this._url = url;
			this._data = data;
			this._loadFlag = loadFlag;
		}
		/**
		 * 原生http请求
		 * @param url 
		 * @param data 
		 */
		nativesend(): void {
			if(!Launch.online){
				// logyhj("网络已断开就不发送请求");
				this.stopRequest();
				return;
			}
			this._tryTime--;
			if (this._loadFlag) {
				this._timeout = setTimeout(() => {
					UIMgr.getInstance().showWaiting();
					this._hasWaiting = true;
				}, 1000);
			}
			this._http.open('post', this._url, true);
			if (!this._initHead) {
				this._initHead = true;
				this._http.setRequestHeader("Content-Type", "application/octet-stream");
			}
			this._http.send(this._data);
		}

		private _onloaded(response): void {
			var status = this._http.status !== undefined ? this._http.status : 200;
			if ((this._http.status >= 200 && this._http.status < 300) || this._http.status == 304) {
				var bytes = new Laya.Byte(this._http.response || response);
				PLC.getInstance().processPackage(bytes);
				this.stopRequest();
			} else {
				logerror("[" + this._http.status + "]" + this._http.statusText + ":" + this._http.responseURL);
				this.tryAgain();
			}

		}

		private _onTimeout(e): void {
			this.tryAgain();
		}

		private _onError(e): void {
			logerror("onerror:", e);
			this.tryAgain();
		}

		/**
		 * 重试
		 */
		private tryAgain(): void  {
			if (this._tryTime >= 0) {
				setTimeout(() => { //一秒后再重试
					this.nativesend();
				}, 2000);
			}
			else {
				showToast(LanMgr.getLan('', 10213));
				this.stopRequest();
			}
		}

		private stopRequest(): void {
			NativeHttp.recyle(this);
		}
		/** 是否结束 */
		public isDone(): boolean {
			return this._idDone;
		}

		/**
		 * 清理
		 */
		public clear(): void {
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
		}
	}
}