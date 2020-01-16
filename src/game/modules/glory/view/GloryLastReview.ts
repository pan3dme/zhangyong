module game{
   /** 上届回顾 */
	export class GloryLastReview extends ui.glory.LastReviewUI{

        private _tabBar : common.CustomTabBar;
		constructor(){
			super();
			this.group = UIConst.hud_group;
		}

		createChildren():void {
			super.createChildren();
            this._tabBar = new common.CustomTabBar();
			this._tabBar.buttons = [this.btnBenfu,this.btnKuafu];
			this._tabBar.selectHandler = new Handler(this,this.selectTab);
			this._tabBar.selectedIndex = -1;
			this.btnBenjie.on(Laya.Event.CLICK,this,this.onBenjie);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther,showEffect);
            this.initView();		
		}
		close():void {
			super.close();
			this._tabBar.selectedIndex = -1;
            this.listView.dataSource = null;
		}
		onClosed():void {
			super.onClosed();
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		private initView():void {
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_shop,callback:this.onShop.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,callback:this.onAward.bind(this)},
					{btnSkin:SkinUtil.btn_record,callback:this.onRecord.bind(this)},
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.honour];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onFanHui.bind(this)});
			let ary = this.dataSource;
			let index = 1;
			if(Array.isArray(ary) && ary.length > 0){
				index = ary[0];
			}
            this._tabBar.selectedIndex = index;
        }

        /** 选择 */
		private selectTab(index:number):void{
			if(index == -1) return;
			let model = GloryModel.getInstance();
			if(index == 0){
				GloryThread.requestLastList(GloryId.benfu_juesai).then(()=>{
					let groupVo = model.getLastListVo(GroupType.benfu);
					if(groupVo.getMatchList().length <= 0){
						showToast(LanMgr.getLan("", 10333));
						this._tabBar.selectedIndex = 1;
						return;
					}
					this.listView.show(groupVo);
				})
            }else{
                let groupVo = model.getLastListVo(GroupType.kuafu);
                this.listView.show(groupVo);
            }
		}

		private onBenjie():void {
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_MAIN_VIEW));
		}

		private onFanHui():void{
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_MAIN_VIEW));
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