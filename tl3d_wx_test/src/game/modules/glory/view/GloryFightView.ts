module game{
    /** 匹配界面 */
	export class GloryFightView extends ui.glory.GloryFightUI{
		
		private _tabBar : common.CustomTabBar;
		private _listVo : MatchGroupListVo;
		private _model : GloryModel;
		constructor(){
			super();
            this.group = UIConst.hud_group;
		}

		createChildren():void {
			super.createChildren();
			this._model = GloryModel.getInstance();
            this._tabBar = new common.CustomTabBar();
			this._tabBar.buttons = [this.btnBenfu,this.btnKuafu];
			this._tabBar.selectHandler = new Handler(this,this.selectTab);
			this._tabBar.selectedIndex = -1;
			this.btnLast.on(Laya.Event.CLICK,this,this.onShangjie);
		}
		
		close():void {
			super.close();
			this._tabBar.selectedIndex = -1;
            this.listView.dataSource = null;
			Laya.timer.clearAll(this);
		}
		onClosed():void {
			super.onClosed();
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther,showEffect);
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_shop,callback:this.onShop.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,callback:this.onAward.bind(this)},
					{btnSkin:SkinUtil.btn_record,callback:this.onRecord.bind(this)},
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.honour];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onFanHui.bind(this)});
			let model = this._model;
			this.lbTime.visible = this.lbNotice.visible = false;
			let curPhase = model.updateCurGroup();
			let index = GloryUtil.isInKuafu(curPhase) ? 1 : 0;
			let ary = this.dataSource;
			if(Array.isArray(ary) && ary.length > 0){
				index = ary[0];
			}
			this._tabBar.selectedIndex = index;
			this.btnLast.visible = model.season > 1;
			if(!model.isHasShow) {
				model.isHasShow = true;
				dispatchEvt(new GloryEvent(GloryEvent.SHOW_REDPOINT));
			}
		}

		/** 选择 */
		private selectTab(index:number):void{
			if(index == -1) return;
			let model = this._model;
			let groupVo : MatchGroupListVo;
			// 当前阶段
			let curPhase = model.updateCurGroup();
			let isInKuafu = GloryUtil.isInKuafu(curPhase);
			// 选择本服时，如果当前为跨服或者跨服海选时 获取本服决赛数据
			if(index == 0){
				curPhase = isInKuafu || curPhase == GloryId.kuafu_haixuan ? GloryId.benfu_juesai : curPhase;
                groupVo = model.getGroupListVoByGroup(curPhase);
            }else{
				if(!isInKuafu) {
					showToast(LanMgr.getLan("", 10341));
                    this._tabBar.selectedIndex = 0;
                    return;
				}
				groupVo = model.getGroupListVoByGroup(curPhase);
            }
			if(groupVo.isNeedRequest(curPhase)){
				GloryThread.requestMatchInfo(curPhase).then((isSuccess:boolean)=>{
					if(isSuccess) {
						this.updateView(groupVo);
					}else{
						// 切换回去
						this._tabBar.selectedIndex = this._tabBar.selectedIndex == 0 ? 1 : 0;
					}
				});
			}else{
				this.updateView(groupVo);
			}
		}

		/** 更新界面 */
		public updateView(listVo:MatchGroupListVo):void {
			this._listVo = listVo;
			this.listView.show(listVo);
			this.updateLoop();
		}

		private _endTime : number;	//阶段结束时间
		private _endBetTime : number;	// 结束投注时间
		private updateLoop():void {
			let listVo = this._listVo;
			if(!listVo) return;
			let index = this._tabBar.selectedIndex;
			let model = this._model;
			this.lbTime.visible = this.lbNotice.visible = false;
			
			Laya.timer.clearAll(this);
			let curGroup = model.updateCurGroup();
			let isInKuafu = GloryUtil.isInKuafu(curGroup);
			// 查看本服对决列表时
			if(index == 0 && !isInKuafu){
				this._endTime =  GloryUtil.getGroupEndTime(curGroup);
				this._endBetTime = this._endTime - tb.TB_honour_set.getSet().bet_endtime;
				this._endBetTime = App.serverTimeSecond >= this._endBetTime ? 0 : this._endBetTime;
				// 本服对决已结束
				if(curGroup == GloryId.kuafu_haixuan) {
					this.lbTime.visible = this.lbNotice.visible = true;
					this.lbNotice.text = LanMgr.getLan("",12393);
					Laya.timer.loop(1000,this,this.updateShowTime);
					this.updateShowTime();
				}else{
					this.lbTime.visible = this.lbNotice.visible = true;
					this.lbNotice.text = model.getBetNotice();
					Laya.timer.loop(1000,this,this.updateEndTime);
					this.updateEndTime();
				}
			}else if(index == 1){
				// 跨服决赛阶段已结束
				if(curGroup == GloryId.kuafu_juesai && App.serverTimeSecond >= GloryUtil.getGroupEndTime(curGroup) ){
					this._endTime =  GloryUtil.getFormatTime(7,23,59,59) + 1;
					this.lbTime.visible = this.lbNotice.visible = true;
					this.lbNotice.text = LanMgr.getLan("",12394);
					Laya.timer.loop(1000,this,this.updateShowTime);
					this.updateShowTime();
				}else{
					this.lbTime.visible = this.lbNotice.visible = true;
					this.lbNotice.text = model.getBetNotice();
					this._endTime =  GloryUtil.getGroupEndTime(curGroup);
					this._endBetTime = this._endTime - tb.TB_honour_set.getSet().bet_endtime;
					this._endBetTime = App.serverTimeSecond >= this._endBetTime ? 0 : this._endBetTime;
					Laya.timer.loop(1000,this,this.updateEndTime);
					this.updateEndTime();
				}
			}
		}
		
		/** 更新结束倒计时 */
		private updateEndTime():void {
			if(!this._listVo) return;
			let group = this._listVo.curGroup;
			let time = this._endTime - App.serverTimeSecond;
			if(time > 0){
				this.lbTime.text = `${LanMgr.getLan("",12395)}${GameUtil.toCountdown(time,"hh:mm:ss")}`;
				if(this._endBetTime > 0 && App.serverTimeSecond >= this._endBetTime){
					this._endBetTime = 0;
					this.listView.renderBtnState();
				}
			}else{
				Laya.timer.clearAll(this);
				this.lbTime.text = "";
				// 本服决赛或者跨服决赛时，请求时当前阶段的对决结果，否则请求的是下一个阶段的数据
				let nextGroup = group == GloryId.benfu_juesai ||  group == GloryId.kuafu_juesai ? group : group +1;
				//时间到更新胜负情况
				GloryThread.requestMatchInfo(nextGroup,true).then((isSuccess:boolean)=>{
					if(isSuccess) {
						this.updateView(this._model.getGroupListVoByGroup(nextGroup));
					}
				});
			}
		}
		/** 更新显示倒计时 跨服海选赛及跨服决赛结束时显示 */
		private updateShowTime():void {
			let listVo = this._listVo;
			if(!listVo) return;
			let model = this._model;
			let group = model.curPhase;
			let time = this._endTime - App.serverTimeSecond;
			if(time > 0){
				this.lbTime.text = (group == GloryId.kuafu_haixuan ? LanMgr.getLan("",12396) : LanMgr.getLan("",12391)) + GameUtil.toCountdown(time,"hh:mm:ss");
			}else{
				Laya.timer.clearAll(this);
				this.lbTime.text = "";
				if(group == GloryId.kuafu_haixuan){
					GloryThread.requestMatchInfo(GloryId.kuafu_16t8,true).then((isSuccess:boolean)=>{
						if(isSuccess) {
							this._tabBar.selectedIndex = 1;
						}
					});
				}else{
					// 跨服决赛下轮倒计时完 转到到报名界面
					model.weekRest();
					dispatchEvt(new GloryEvent(GloryEvent.SHOW_MAIN_VIEW));
				}
			}
		}

		/** 更新列表 */
		private updateList():void {
			if(!this._listVo) return;
			this.listView.show(this._listVo);
		}

		/** 上届回顾 */
		private onShangjie():void {
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_LAST_REVIEW));
		}

		private onFanHui():void{
			dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_KUAFU));
		}
		
		/** 奖励 */
		private onAward():void {
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_AWARD_VIEW));
		}
		/** 规则 */
		private onRule():void {
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_RULE_VIEW));
		}
		/** 商店 */
		private onShop():void {
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_SHOP_VIEW));
		}
		private onRecord():void{
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_RECORD_VIEW));
		}
    }
}