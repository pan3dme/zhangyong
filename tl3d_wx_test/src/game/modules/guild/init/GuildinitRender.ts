/**
* name 
*/
module game{
	export class GuildinitRender extends ui.guild.init.GuildinitRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: IGuildData) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IGuildData {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
				this.lab_name.text = data.name;		
				this.btn_apply.visible = data.isApplay == 0;
				this.btn_cancel.visible = data.isApplay != 0;		
				this.lab_level.text = data.level + LanMgr.getLan("级",-1);		
				this.lab_limit.text = data.limitLevel + LanMgr.getLan("级",-1);				
				this.lab_people.text = data.num + "/" + tb.TB_guild.get_TB_guildById(data.level).limit_num;
				this.btn_apply.label = data.autoJoin == iface.tb_prop.guildAutoJoinTypeKey.yes ? LanMgr.getLan("加入",-1):LanMgr.getLan("申请",-1);
				this.btn_apply.on(Laya.Event.CLICK,this,this.applyJoin);
				this.btn_cancel.on(Laya.Event.CLICK,this,this.applyJoin);
			} else{
				this.lab_name.text ="";
				this.lab_level.text = "";
				this.lab_people.text = "";
				this.btn_apply.off(Laya.Event.CLICK,this,this.applyJoin);
				this.btn_cancel.off(Laya.Event.CLICK,this,this.applyJoin);
			}
		} 

		/**申请/取消申请 */
		private applyJoin():void{
			let data = this.dataSource;
			if(App.hero.level < data.limitLevel){
				showToast(LanMgr.getLan("",10159));
				return;
			}
			let args = {};
			args[Protocol.guild_guild_apply.args.guildId] = data.guildId;
			PLC.request((this.btn_apply.visible) ? Protocol.guild_guild_apply :Protocol.guild_guild_apply_cancel, args, ($data: any, msg: any) => {
				if (!$data) {
					//为空说明数据有问题，重新请求下最新数据
					let initView:GuildinitView = UIMgr.getUIByName(UIConst.GuildinitView);
					if (initView) initView.requestGuildList();
					return;
				}
				if($data.addMember){
					UIMgr.hideUIByName(UIConst.GuildinitView);
					dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));					
					return;
				}
				this.btn_apply.visible = !this.btn_apply.visible;
				this.btn_cancel.visible = !this.btn_apply.visible;
				this.btn_apply.selected = this.btn_cancel.selected = false;
			});
		}
	}
}