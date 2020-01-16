/**
* name 
*/
module game {
	export class PlayerDetailsView extends ui.hud.player.PlayerDetailsUI {
		static gmLock: boolean = true;
		static debugLock: boolean = true;

		private _tabPlayerView : TabPlayerInfoView;
		private _tabSysView : TabSysSettingView;
		private _tabKefuView : TabCustomerServiceView;
		private _curIndex : number = -1;
		constructor() {
			super();
		}

		createChildren():void {
            super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.PlayerDetailsView, closeOnSide: this.isModelClose, title: "玩家信息" };
			this._curIndex = -1;
			this.tabBar.selectedIndex = -1;
			this.tabBar.selectHandler = new Handler(this,this.onSelect);
			this.btn_gm.on(Laya.Event.CLICK, this, this.onGm);
			this.btn_vconsole.on(Laya.Event.CLICK, this, this.onConsole);
			this.btn_stats.on(Laya.Event.CLICK, this, this.onStats);
			this.btn_debug.on(Laya.Event.CLICK, this, this.onDebugPanel);
			this.btn_loglevel.on(Laya.Event.CLICK, this, this.onLogLve);
			if(!Laya.Browser.onMiniGame){
				this.btn_vconsole.visible = true;
			}
		}

		public onClosed(): void {
			super.onClosed();
			let view = this.getView(this._curIndex);
			if(view){
				view.close();
				view.visible = false;
			}
			this._curIndex = -1;
			this.tabBar.selectedIndex = -1;
		}
		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}
		private initView():void {
			this.setLogBtn();
			let isShowbtn : boolean = false;
			if (!ExtConfig.RELEASE || BingoSDK.platparam.pid == "1") {
				this.btn_gm.visible = true;
				isShowbtn = true;
			}
			if (ExtConfig.RELEASE) { //发布环境调试和gm要单独开启
				if (!PlayerDetailsView.debugLock) {
					this.btn_stats.visible = true;
					this.btn_debug.visible = true;
					this.btn_loglevel.visible = true;
					isShowbtn = true;
				}
			}
			else {
				this.btn_gm.visible = true;
				this.btn_stats.visible = true;
				this.btn_debug.visible = true;
				this.btn_loglevel.visible = true;
				isShowbtn = true;
			}
			this.height = isShowbtn ? 640 :  580;
			this.tabBar.selectedIndex = 0;
		}

		private onSelect(index:number):void {
			if(index == -1)return;
			let oldView = this.getView(this._curIndex);
			if(oldView){
				oldView.close();
				oldView.visible = false;
			}
			this._curIndex = index;
			let newView = this.getView(this._curIndex);
			if(newView){
				newView.show();
				newView.visible = true;
			}
		}
		// 获取界面
		private getView(index:number):common.DialogExt {
			let view ;
			switch(index){
				case 0:
					if(!this._tabPlayerView){
						this._tabPlayerView = new TabPlayerInfoView();
						this._tabPlayerView.centerX = 0;
						this.boxContent.addChild(this._tabPlayerView);
					}
					view = this._tabPlayerView;
					break;
				case 1:
					if(!this._tabSysView){
						this._tabSysView = new TabSysSettingView();
						this._tabSysView.centerX = 0;
						this.boxContent.addChild(this._tabSysView);
					}
					view = this._tabSysView;
					break;
				case 2:
					if(!this._tabKefuView){
						this._tabKefuView = new TabCustomerServiceView();
						this._tabKefuView.centerX = 0;
						this.boxContent.addChild(this._tabKefuView);
					}
					view = this._tabKefuView;
					break;
			}
			return view;
		}		

		private onGm(e): void {
			dispatchEvt(new HudEvent(HudEvent.SHOW_GM_PANEL));
		}

		/**
		 * 日志等级 
		 */
		private onLogLve(e): void {
			let idx = this.KeyLog.indexOf(ExtConfig.LOG_LEVEL);
			ExtConfig.LOG_LEVEL = this.KeyLog[++idx % this.KeyLog.length];
			this.setLogBtn();
		}

		private KeyLog = [1, 2, 3, 5, 6, 123, 998, 999];
		/**
		 * 日志等级 
		 */
		private setLogBtn(): void {
			this.btn_loglevel.label = "loglev(" + ExtConfig.LOG_LEVEL + ")";
		}

		private _stats: boolean;
		private _cstats: boolean;
		private _console: VConsole;

		/**
		 * laya调试信息 
		 */
		private onDebugPanel(): void {
			laya.debug.DebugTool.init();
		}

		/**
		 * 插件调试信息 
		 */
		private onConsole(): void {
			if (!this._cstats) {
				if (!this._console) {
					this._console = new VConsole();
				}
				this._console.showSwitch();
				logdebug('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio)
				logdebug('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio)
				logdebug('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.pixelDepth);//screen.deviceXDPI, screen.deviceYDPI,
				logdebug('real scene_height', Browser.clientHeight * Browser.pixelRatio)
			}
			else {
				this._console.hideSwitch()
			}
			this._cstats = !this._cstats;
		}
		/**
		 * 帧率信息
		 */
		private onStats(): void {
			if (!this._stats) {
				Laya.Stat.show(0, 0);
			}
			else {
				Laya.Stat.hide();
			}
			this._stats = !this._stats;
		}
	}
}