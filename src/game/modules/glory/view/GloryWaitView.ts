module game{
    /** 报名界面 */
	export class GloryWaitView extends ui.glory.GloryWaitUI{

		private _itemList : gloryLastRankPropIR[];
		private _model : GloryModel;
		constructor(){
			super();
			this.group = UIConst.hud_group;
		}

		createChildren():void {
			super.createChildren();
			this._model = GloryModel.getInstance();
			this._itemList = [];
			for(let i = 1 ; i <= 3 ; i++){
				let rankIR = new gloryLastRankPropIR(this[`boxRank${i}`]);
				this._itemList.push(rankIR);
			}
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GLORY_FIGHT,0);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther,showEffect);
            this.initView();		
		}

		close():void {
			super.close();
			Laya.timer.clear(this,this.updateTime);
			for(let item of this._itemList){
				item.dataSource = null;
			}
		}
		onClosed():void {
			super.onClosed();
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		private initView():void{
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_shop,callback:this.onShop.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,callback:this.onAward.bind(this)},
					{btnSkin:SkinUtil.btn_record,callback:this.onRecord.bind(this)},
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.honour];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,funList,resAry,closeCallback:this.onFanHui.bind(this)});
			let model = this._model;
			// let isJoin = model.isJoin();
			if(model.isInGameTime()){
				this.lbTime.text = "";
			}else{
				this.updateTime();
				Laya.timer.clear(this,this.updateTime);
				Laya.timer.loop(1000,this,this.updateTime);
			}
			this.updateBtn();
			this.btnJoin.on(Laya.Event.CLICK,this,this.onJoin);
			this.btnLast.on(Laya.Event.CLICK,this,this.onLast);
			// 设置上届排行信息
			let rankList = model.getLastRankList();
			for(let i = 0 ; i < this._itemList.length ; i++){
				this._itemList[i].dataSource = rankList[i];
			}
			this.btnLast.visible = model.season > 1;
			this.btnJoin.centerX = this.btnLast.visible ? 100 : 0;
			if(!model.isHasShow) {
				model.isHasShow = true;
				dispatchEvt(new GloryEvent(GloryEvent.SHOW_REDPOINT));
			}
        }

		/** 更新时间 */
		private updateTime():void {
			let model = this._model;
			let endJoinTime = model.endJoinTime;
			let startTime = model.startGameTime;
			let curTime = App.serverTimeSecond;
			// && !model.isJoin()
			if(curTime < endJoinTime){
				this.lbTime.text = LanMgr.getLan("",12391) +  GameUtil.getTimeStr(endJoinTime - curTime);;
			}else if(curTime < startTime){
				this.lbTime.text = LanMgr.getLan("",12392) + GameUtil.getTimeStr((startTime-curTime));
			}else{
				this.lbTime.text = "";
				Laya.timer.clear(this,this.updateTime);
				dispatchEvt(new GloryEvent(GloryEvent.SHOW_MAIN_VIEW));
			}
		}

		/** 更新按钮状态 */
		private updateBtn():void {
			let model = this._model;
			let isJoin = model.isJoin();
			let canotJoin = !model.isInJoinTime();
			this.btnJoin.disabled = isJoin || canotJoin;
			this.btnJoin.label = isJoin ? LanMgr.getLan("",12281) : (canotJoin ? LanMgr.getLan("",12390) : LanMgr.getLan("",12284));
		}

		/** 报名 */
		private onJoin():void {
			let model = this._model;
			if(!model.isInJoinTime()){
				showToast(LanMgr.getLan("",10342));
				return;
			}
			if(model.isJoin()){
				showToast(LanMgr.getLan("",10343));
				return;
			}
			PLC.request(Protocol.game_honour_reg,null,($data)=>{
				if(!$data) return;
				App.hero.copyInfo.honourWarRegTime = $data['regTime'];
				this.updateBtn();
				dispatchEvt(new GloryEvent(GloryEvent.JOIN_SUCCESS));
			});
		}

		/** 上届回顾 */
		private onLast():void {
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