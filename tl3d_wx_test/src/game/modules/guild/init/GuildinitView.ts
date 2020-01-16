/**
* name 
*/
module game{
	export class GuildinitView extends ui.guild.init.GuildinitUI{

		private _model : GuildModel;
		constructor(){
			super();
			this.isModelClose = true;		
			this.bgPanel.dataSource = { uiName: UIConst.GuildinitView, closeOnSide: this.isModelClose, title:"创建公会" };	
			this._model = GuildModel.getInstance();
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
			this.btn_lookup.on(Laya.Event.CLICK,this,this.lookUp);			
			this.btn_create.on(Laya.Event.CLICK,this,this.createGuild);
			this.btn_update.on(Laya.Event.CLICK,this,this.onRefresh);
			this.list_guild.array = this._model.getGuildList();
			this.requestGuildList();
		}

		public requestGuildList():void{
			this._model.requestGuildList().then(()=>{
				this.refreshList();
			});
		}

		refreshList():void {
			let glist = this._model.getGuildList();
			this.list_guild.array = glist;
			this.img_side.visible = glist.length >= 7;
		}

		private onRefresh():void {
			this._model.requestGuildList().then(()=>{
				this.refreshList();
			});
		}

		/**搜索公会 */
		private lookUp():void{
			if(this.are_putin.text == ""){
				showToast(LanMgr.getLan('',10160));
				return;
			}
			let arg = {};
			arg[Protocol.guild_guild_find.args.name] = this.are_putin.text;
			PLC.request(Protocol.guild_guild_find, arg, ($data: any, msg: any) => {
                if (!$data) return;
				this.list_guild.array = $data.findList;
            })
		}

		/**创建公会 */
		private createGuild():void{
			UIMgr.showUI(UIConst.CreateGuildView);
		}

		/**退出 */
		public close():void{
			super.close();
			this.list_guild.array = null;
			this.btn_lookup.off(Laya.Event.CLICK,this,this.lookUp);			
			this.btn_create.off(Laya.Event.CLICK,this,this.createGuild);
			this.btn_update.off(Laya.Event.CLICK,this,this.onRefresh);
		}
	}
}