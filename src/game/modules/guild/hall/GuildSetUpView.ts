/**
* name 
*/
module game {
	export class GuildSetUpView extends ui.guild.hall.GuildSetUpUI {

		private _counterBar : common.CounterBar;
		private _curLv: number = 1;
		private _maxLv: number = 0;

		private _needYZ : boolean = false;	// 需要验证
		constructor() {
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.GuildSetUpView, closeOnSide: this.isModelClose,title:"设置" };
			this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btnAddOne,this.btnAddTen,this.btnRedOne,this.btnRedTen,this.inputLv);
			this.btn_sure.on(Laya.Event.CLICK, this, this.sure);
			this.btn_zhaomu.on(Laya.Event.CLICK, this, this.zhaomu);
			this.btnLeft.on(Laya.Event.CLICK, this, this.onLeft);
			this.btnRight.on(Laya.Event.CLICK, this, this.onRight);
		}

		public onClosed(): void {
			super.onClosed();
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		private initView():void{
			let guildInfo = GuildModel.getInstance().guildInfo;
			this._curLv = guildInfo.limitLevel;
			this._maxLv = 100;
            this._counterBar.setInitData(this._curLv,this._maxLv,this.setLv.bind(this));
			this.setLv();
			this._needYZ = guildInfo.autoJoin == iface.tb_prop.guildAutoJoinTypeKey.no;
			this.updateBtn();
		}

		private setLv(): void {
            this._curLv = this._counterBar.getCurNum();
			this.inputLv.text = this._curLv.toString();
		}

		private updateBtn():void {
			this.lbYanzheng.text = this._needYZ ? "需要验证" : "直接加入";
			this.btnLeft.gray = this._needYZ;
			this.btnRight.gray = !this._needYZ;
		}

		private sure(): void {
			let auto = this._needYZ ? iface.tb_prop.guildAutoJoinTypeKey.no : iface.tb_prop.guildAutoJoinTypeKey.yes;
			dispatchEvt(new GuildEvent(GuildEvent.CHANGE_GUILD_SETTING,[Number(this.inputLv.text),auto]));
		}


		/** 招募 */
		private zhaomu(): void {
			let auto = this._needYZ ? iface.tb_prop.guildAutoJoinTypeKey.no : iface.tb_prop.guildAutoJoinTypeKey.yes;
			dispatchEvt(new GuildEvent(GuildEvent.GUILD_ZHAOMU,[Number(this.inputLv.text),auto]));
		}

		private onLeft():void {
			if(!this.btnLeft.gray){
				this._needYZ = !this._needYZ;
				this.updateBtn();
			}
		}
		private onRight():void {
			if(!this.btnRight.gray){
				this._needYZ = !this._needYZ;
				this.updateBtn();
			}
		}
		
	}
}