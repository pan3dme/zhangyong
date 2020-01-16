/**
* name 
*/
module game {
	export class LoginModel {
		private static _instance: LoginModel;
		public areas: Array<ServerAreaInfo>;
		private _isInit: boolean = false;
		static getInstance(): LoginModel {
			if (!LoginModel._instance) {
				LoginModel._instance = new LoginModel();
			}
			return LoginModel._instance;
		}

		public constructor() {
			this.areas = new Array<ServerAreaInfo>();
			this._grops = {};
		}

		public initAreas(): void {
			if (this._isInit) return;
			this._isInit = true;
			let slistobj = window.platform.serverList || {};
			let recentobj = window.platform.serverRecentList;
			if (!recentobj) recentobj = {};
			let recentlist = convertMapValueToArr(recentobj);
			if (recentlist && recentlist.length > 0) {
				recentlist.sort( //区服排序
					(a: any, b: any) => {
						return b.login_time - a.login_time;
					});

				let recent_ary = [];
				for (let i = 0; i < recentlist.length; i++) {
					let recent = recentlist[i];
					if (slistobj.hasOwnProperty(recent.srv_id)) {
						recent_ary.push(slistobj[recent.srv_id]);
					}
				}
				this.addServerInfo(LanMgr.getLan("",12192), recent_ary); //其他
				this.lastServer = recent_ary[0];
			}

			let svrTypeValObj = {};
			for (var key in slistobj) {
				let svritem = slistobj[key];
				if (svritem.hasOwnProperty("srv_type")) {
					let svrtype = svritem.srv_type;
					if (!svrTypeValObj.hasOwnProperty(svrtype)) {
						svrTypeValObj[svrtype] = {};
					}
					svrTypeValObj[svrtype][key] = svritem;
				}
			}

			let slisttypelist = window.platform.serverGroupList || [];
			//容错，防止平台给的数据不是数组
			if(!isArrayFn(slisttypelist)){
				slisttypelist = [slisttypelist];
			}
			for (var key in svrTypeValObj) {
				let slist = convertMapValueToArr(svrTypeValObj[key]);
				let typeitem = slisttypelist.find(item => String(item.srv_type) == String(key));
				let srvinfo = this.createServerInfo(slist, typeitem ? typeitem.type_name : LanMgr.getLan("",12193));
				if (!this.newServer || Number(this.newServer.open_time) < Number(srvinfo.open_time)) {
					this.newServer = srvinfo;
				}
			}

			if (ExtConfig.isLocal) {
				//如果是本地 ，默认取上次登录的区服
				let lastid = Laya.LocalStorage.getItem(App.hero.uid + "selectLineId");
				for (var key in slistobj) {
					let svritem = slistobj[key];
					if (svritem.srv_id == lastid) {
						this.lastServer = svritem;
						break;
					}
				}
			}
		}

		private createServerInfo(slist, typename) {
			if (slist && slist.length > 0) {
				slist.sort( //区服排序
					(a: any, b: any) => {
						return b.open_time - a.open_time;
					});
			}

			this.addServerInfo(typename, slist); //其他

			return slist[0];//返回最近的那个
		}
		lastServer: any;
		newServer: any;

		//当前可以进的服务器
		public get curServer(): any {
			return this.lastServer || this.newServer;
		}

		//分组缓存
		private _grops: any;
		/**
		 * 添加服务器信息
		 * @param group 分组
		 * @param serverInfo 服务器信息 
		 */
		public addServerInfo(group: string, serverInfo: any): void {
			var sinfo: ServerAreaInfo = this._grops[group];
			if (!sinfo) {
				sinfo = new ServerAreaInfo();
				this._grops[group] = sinfo;
				this.areas.push(sinfo);
			}
			sinfo.areaName = group;
			if (serverInfo instanceof Array) {
				sinfo.servers = sinfo.servers.concat(serverInfo);
			}
			else {
				sinfo.servers.push(serverInfo);
			}

		}
	}
}