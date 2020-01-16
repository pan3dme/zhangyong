/**
* name 
*/
module game {
	export class ArenaView extends ui.arena.arena.ArenaUI {
		private uiScene: Base2dSceneLayer;
		private _failCD: number = 0;
		constructor() {
			super()
			this.group = UIConst.hud_group;
		}

		createChildren():void {
			super.createChildren();
			this.uiScene = new Base2dSceneLayer();
			this.panel.addChild(this.uiScene);
			this.btnbuynum.on(Laya.Event.CLICK,this,this.onClick);
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.JINGJI);
			this.rankList.array = null;
            this.rankList.selectedIndex = -1;
            this.rankList.selectEnable = true;
			this.rankList.renderHandler = new Handler(this, this.onRender);
            if (this.rankList.scrollBar) {
                this.rankList.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange);
            }
		}

		popup(): void {
			super.popup(false, false);
			this.initView();
		}
		show(): void {
			super.show(false, false);
			this.initView();
		}

		set dataSource(value) {
			this._dataSource = value;
		}

		get dataSource(): ArenaInfo {
			return this._dataSource;
		}

		private initView(): void {
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_shop,callback:this.onShop.bind(this)},
					{btnSkin:SkinUtil.btn_rank,callback:this.onRank.bind(this)},
					{btnSkin:SkinUtil.btn_record,callback:this.onRecord.bind(this)},
					{btnSkin:SkinUtil.btn_refresh,callback:this.onRefresh.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.arena];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.toClose.bind(this)});
			this.setArenaInfo();
			this.setChallengeNum();
			tl3d.ModuleEventManager.addEvent(ArenaEvent.UPDATE_MYSELF_FORCE,this.updateMyselfForce,this);
			tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.setChallengeNum,this);
		}

		/**服务端更新数据 */
		setArenaInfo(): void {
			let data = this.dataSource;
			this.lbmyrank.changeText(`${LanMgr.getLan("",12265)}${data.rank}`);
			this.lbrankmax.changeText(`${LanMgr.getLan("",12550)}${data.topRank}`);
			let list = data.clgInfoList || [];
			this.rankList.array = list;
			let idx = this.rankList.array.findIndex((vo: ArenaInfoVo) => vo.isMySelf());
			if (idx != -1) this.rankList.scrollTo(idx);
			
			ArenaModel.getInstance().loads(this.uiScene, list);
		}

		/**更新自己的神力 */
		updateMyselfForce(): void {
			dispatchEvt(new ArenaEvent(ArenaEvent.UPDATE_ARENA_RANK));
		}

		/**是否在战斗冷却中 */
		getChallengeFailCD(): number {
			return App.hero.arenaFailTime + tb.TB_arena_new_set.getArenaNewSet().fail_cd - App.serverTimeSecond;
		}

		/**剩余挑战次数 */
		setChallengeNum(): void {
			this.lbhasnum.changeText(`奖励次数：${App.hero.arenaNum}`);
		}

		/**list渲染位置改变下 */
		private onRender(cell: ui.arena.arena.render.ArenaIRUI, index: number): void {
			cell.x = !(index % 2 != 0 && index != 0) ? 0 : 400;
		}

		/**界面按钮点击事件 */
		private _clickRefreshTime:number = 0;
		private onClick(e: Laya.Event) {
			if (e.target === this.btnbuynum) {//购买次数
				dispatchEvt(new ArenaEvent(ArenaEvent.BUY_ARENA_CHALLENGE));
			}
		}

		private toClose():void {
			this.close();
			dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_JINGJI));
		}
		//勋章商店
		private onShop():void {
			dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.jingjichang);
		}
		//排行榜
		private onRank():void {
			dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_ARENARANK_PANEL));
		}
		//防守记录 
		private onRecord():void {
			dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_RECORD_PANLE));
		}
		//刷新列表
		private onRefresh():void {
			if (this._clickRefreshTime + 3 >= App.getServerTime()){
					showToast(LanMgr.getLan(``,11012));
					return;
				}
				this._clickRefreshTime = App.getServerTime();
				dispatchEvt(new ArenaEvent(ArenaEvent.UPDATE_ARENA_RANK));
		}

		/**
		 * 用一个3D场景把模型全部挂上去
		 * 因为list渲染只会渲染视图内的项
		 * 并且模型不会随着itemRende的位置改变而改变
		 * */
		private addChildModel(): void {
			this.uiScene.onExit();
			this.rankList.array.forEach((data: ArenaInfoVo, index: number) => {
				let x = !(index % 2 != 0 && index != 0) ? 0 : 400;
				this.addModelChar(data.maxForceGodId + ``, x, index * (311 + this.rankList.spaceY));
			})
		}

		private onScrollChange(): void {
            if (this.rankList.scrollBar) {
                this.uiScene.y = 255 -this.rankList.scrollBar.value - Launch.offsetY;
            }
        }

		/** 添加ui角色 */
		private addModelChar(mid: string, postionx: number, postiony: number, rotate: number = 180, scale: number = 1.4) {
			let sceneChar: GameUIChar = new GameUIChar();
			this.uiScene.scene.addMovieDisplay(sceneChar);
			sceneChar.setRoleUrl(getRoleUrl(mid));
			sceneChar.play(tl3d.CharAction.STANAD);
			sceneChar.forceRotationY = rotate;
			sceneChar.set2dPos(postionx, postiony);  //坐标
			sceneChar.scale = scale;
		}

		onClosed(): void {
			super.onClosed();
			ArenaModel.getInstance().clearAllChar();
			this.uiScene.onExit();
			this.rankList.array = null;
			tl3d.ModuleEventManager.removeEvent(ArenaEvent.UPDATE_MYSELF_FORCE,this.updateMyselfForce,this);
			tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.setChallengeNum,this);
			UIMgr.hideUIByName(UIConst.SysTopView);
		}
	}
}