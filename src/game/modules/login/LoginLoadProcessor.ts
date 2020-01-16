/**
* name 
*/
module game {
	export class LoginLoadProcessor extends tl3d.Processor {

		private _uiMgr: UIMgr;
		constructor() {
			super();
			this._uiMgr = UIMgr.getInstance();
		}

		public getName(): string {
			return "LoginLoadProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new LoginLoadEvent(LoginLoadEvent.LOADBASE_EVENT),
				new LoginLoadEvent(LoginLoadEvent.LOADJUQING_EVENT),
				new LoginLoadEvent(LoginLoadEvent.LOADHUD_EVENT),
				new LoginLoadEvent(LoginLoadEvent.ENTERHUD_EVENT),
			];
		}

		//处理事件
		protected receivedModuleEvent(event: tl3d.BaseEvent): void {
			if (event instanceof LoginLoadEvent) {
				switch (event.type) {
					case LoginLoadEvent.LOADBASE_EVENT:
						this.preloadBase();
						break;
					case LoginLoadEvent.LOADJUQING_EVENT:
						this._uiMgr.showLoading(LanMgr.getLan(``,10539));
						this.preloadJuqing();
						UIMgr.hideUIByName(UIConst.SelectListView);
						break;
					case LoginLoadEvent.LOADHUD_EVENT:
						if (this._hudloading || this._hudloaded) { //已经在加载或者加载完了
							return;
						}
						if (!event.data) { //偷偷加载就不要显示进度条胃
							this._uiMgr.showLoading(LanMgr.getLan(``,10540));
						}
						this._hudloading = true;
						this.preloadHud();
						break;
					case LoginLoadEvent.ENTERHUD_EVENT:
						this.enterHud(event.data);
						break;
				}
			}
		}

		/**=================================================================================
         * 加载UI基础资源
         */
		private _total0: number = 7;
		private _preloads0 = ["comp/bg.atlas", "comp/button.atlas",
			"comp/image.atlas", "comp/progressbar.atlas", "comp/shuzi.atlas", "effects/ring.atlas"];

		/**
		 * 预加载基础资源
		 */
		private preloadBase(): void {
			this._uiMgr.loadingProcess(((this._total0 - this._preloads0.length) / this._total0) * 0.4 + 0.6);
			if (this._preloads0.length > 0) {
				Laya.loader.load(this._preloads0.pop(), Handler.create(this, this.preloadBase));
			}
			else {
				dispatchEvt(new LoginEvent(LoginEvent.LOGININIT_EVENT)); //开始登录
			}
		}

		/**=================================================================================
		 * 加载剧情必需资源
		*/
		private _preloads1: Array<String> = ["kaichang/kaichang1.jpg", "kaichang/kaichang2.jpg", "kaichang/kaichang3.jpg"];

		/**
		 * 新手剧情预加载资源
		 */
		private preloadJuqing(init: boolean = false): void {
			Laya.loader.load(this._preloads1, Handler.create(null, (result) => { //加载完
				// logyhj("加载结果：", result);
				if (result === false) {
					//资源加载出错，就不打开界面
					//1秒后重新加载
					Laya.timer.once(1000, this, this.preloadJuqing);
					return;
				}
				this._uiMgr.hideLoading();
				UIMgr.showUI(UIConst.FirstGuide, null, false);
			}), Handler.create(null, (value) => { //加载过程
				this._uiMgr.loadingProcess(value);
			}));
		}

		/**=================================================================================
		 * HUD预加载资源
		 */
		private _total2: number = 2;
		private _preloads2: Array<String> = ["hud.atlas"];
		private _hudloaded: boolean; //hud是否已加载完
		private _hudloading: boolean; //hud是否加载中
		private _state: number = -1;
		private _hudScene: string = 'scene022';
		private _enter: boolean;

		/**
		 * 预加载hud资源
		 * 加载完是否直接进入
		 */
		private preloadHud(): void {
			this._uiMgr.loadingProcess(((this._total2 - this._preloads2.length) / this._total2));
			if (this._preloads2.length > 0) {
				Laya.loader.load(this._preloads2.pop(), Handler.create(this, this.preloadHud));
			}
			else {
				// Pan3d.SceneResManager.getInstance().loadSceneRes(this._hudScene, () => { //预加载hud场景
				this._hudloaded = true;
				if (this._enter) {
					this.showHud();
				}
				// }, () => { }, ($str: any) => { });
			}
		}

		//进入hud
		private enterHud(guideStep: number): void {
			if (guideStep) {
				this._state = guideStep;
			}
			this._enter = true;
			if (this._hudloaded) { //如果已经加载完了就直接进入
				this.showHud();
			}
			else {  //如果还没加载就先加载
				dispatchEvt(new LoginLoadEvent(LoginLoadEvent.LOADHUD_EVENT));
			}
		}

		//显示hud
		private showHud(): void {
			this._uiMgr.hideLoading();
			dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.MAIN]);
			if (this._state == -1) { //旧号
				GuideManager.startInit();
			} else { //剧情结束
				dispatchEvt(new FirstGuideEvent(FirstGuideEvent.GUIDE_START), this._state);
			}
			if (App.hero.level >= 3) {
				Laya.timer.once(1000, this, () => {
					if (App.isOpenSvrDay(2)) {
						//开服大于2天,会显示公告
						let key: string = `AppUpdate_Notice_${game.GameNoticeView.noticeVersion}_${App.hero.playerId}`;
						if (Laya.LocalStorage.getItem(key)) {
							HuodongModel.getInstance().autoOpenLoginGift();
						} else {
							UIMgr.showUI(UIConst.GameNoticeView,{openFlag:true});
							Laya.LocalStorage.setItem(key, game.GameNoticeView.noticeVersion);
						}
					} else {
						HuodongModel.getInstance().autoOpenLoginGift();
					}

				})
			}
		}
	}
}