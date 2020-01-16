
module game{
	/** 荣誉殿堂 */
	export class HonorHallView extends ui.guild.fight.HonorHallUI{

		private _curSeason : number;
		private _itemList : HonorGuildIRender[];
		constructor(){
			super();
			this.group = UIConst.hud_group;
		}

		createChildren():void {
			super.createChildren();
			this._itemList = [];
			for(let i = 0 ; i < 3 ; i++){
				this._itemList.push(this[`item${i}`]);
			}
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GLORY_FIGHT);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();		
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();		
		}

        public onClosed():void{
			super.onClosed();
			for(let item of this._itemList){
				item.dataSource = null;
			}
			this._requestFlag = false;
			this.btnPrev.off(Laya.Event.CLICK,this,this.onPrev);
			this.btnNext.off(Laya.Event.CLICK,this,this.onNext);
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		private initView():void{
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,redpointName:"guild_war_award",callback:this.onBaoxiang.bind(this)},
					{btnSkin:SkinUtil.btn_saiji,callback:this.onSaiji.bind(this)},
					{btnSkin:SkinUtil.btn_huiyuan,callback:this.onHuiyuan.bind(this)},
					{btnSkin:SkinUtil.btn_glory_hall,callback:this.onHall.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.guildDonate];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onReturn.bind(this)});
			let model = GuildFightModel.getInstance();
			this._curSeason = model.season - 1;
			this._curSeason = this._curSeason <= 0 ? 1 : this._curSeason;
			for(let i = 0 ; i < 3 ; i++){
				let item = this._itemList[i];
				let obj : any = {guildRank:(i+1)};
				item.dataSource = obj;
			}
			this.btnPrev.on(Laya.Event.CLICK,this,this.onPrev);
			this.btnNext.on(Laya.Event.CLICK,this,this.onNext);
			this.updateBtn();
			if(this._curSeason != model.season){
				this.requestList();
			}
		}
		/** 是否请求中 */
		private _requestFlag : boolean = false;
		private requestList():void {
			this._requestFlag = true;
			if(GuildFightModel.getInstance().season > this._curSeason){
				let args = {};
				args[Protocol.guild_guildWar_getSessionRankList.args.session] = this._curSeason;
				PLC.request(Protocol.guild_guildWar_getSessionRankList,args,($data:any)=>{
					if(!$data){
						this.renderList(null);
						return;
					} 
					this._requestFlag = false;
					let ary : IHonorGuildSvo[] = $data.sessionRankList;
					ary.sort((a,b)=>{
						return a.guildRank - b.guildRank;
					});
					this.renderList(ary);
				});
			}else{
				this.renderList(null);
			}
		}
		private  renderList(list:any[]):void {
			for(let i = 0 ; i < 3 ; i++){
				let item = this._itemList[i];
				item.dataSource = list && list.length > i ? list[i] : {guildRank:(i+1)};
			}
			this._requestFlag = false;
		}

		private onPrev():void {
			if(this._requestFlag)return;
			this._curSeason --;
			this.updateBtn();
			this.requestList();
		}
		
		private onNext():void {
			if(this._requestFlag)return;
			this._curSeason ++;
			this.updateBtn();
			this.requestList();
		}

		/** 更新按钮状态 */
		private updateBtn():void {
			this.lbName.text = LanMgr.getLan('S{0}赛季',-1,this._curSeason);
			this.btnNext.disabled = this._curSeason >= GuildFightModel.getInstance().season;
			this.btnPrev.disabled = this._curSeason <= 1;
		}

		private onReturn():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_BATTLE_VIEW));
		}

		private onBaoxiang():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_GRADE_CHEST_VIEW));
		}
		private onHall():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_HONOR_HALL_VIEW));
		}
		private onSaiji():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_SEASON_AWARD_VIEW));
		}
		private onRule():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_FIGHT_RULE_VIEW));
		}
		private onHuiyuan():void {
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_PERSON_RANK_VIEW));
		}
	}

	
}