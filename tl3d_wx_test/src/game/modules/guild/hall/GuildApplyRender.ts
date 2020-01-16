/**
* name 
*/
module game{
	export class GuildApplyRender extends ui.guild.hall.GuildApplyRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: IGuildApplyData) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IGuildApplyData {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
				this.lab_name.text = data.name;
				this.lab_level.text = data.level + LanMgr.getLan("级",-1);	
				this.lab_power.text = String(Math.round(data.force));	
				this.btn_yes.on(Laya.Event.CLICK,this,this.apply,[0]);
				this.btn_no.on(Laya.Event.CLICK,this,this.apply,[1]);	
			} else{
				this.lab_name.text ="";
				this.lab_level.text = "";
				this.btn_yes.off(Laya.Event.CLICK,this,this.apply);
				this.btn_no.off(Laya.Event.CLICK,this,this.apply);
			}
		}

		/**公会申请操作 */
		private apply(type:number):void{
			let data = this.dataSource;
			let arg ={};
			arg[Protocol.guild_guild_apply_opt.args.type] = type;
			arg[Protocol.guild_guild_apply_opt.args.playerId] = data.playerId;
			PLC.request(Protocol.guild_guild_apply_opt, arg, ($data: any, msg: any) => {
				if (!$data) return;
				if($data.addMember){
					guildMemberChatSend("欢迎" +  data.name + "加入了大家庭，一同求道！");		
					dispatchEvt(new GuildEvent(GuildEvent.UPDATE_MEMBER_LIST));
				}		
				// sendDispatchEvent(new GuildEvent(GuildEvent.UPDATE_APPLY_LIST));
				if ($data.delApply){
					let model = GuildModel.getInstance();
					let arr:IGuildApplyData[] = model.getApplyList();
					model.setApplyList(arr.filter((item)=>{
						return item.playerId != $data.delApply;
					}));
					let guildApplyListView:GuildApplyListView  = UIMgr.getUIByName(UIConst.GuildApplyListView);
					if(guildApplyListView){
						guildApplyListView.updateApplyList();
					}	
				}
				
			});
		}

	}
}