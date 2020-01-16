/**
* name 
*/
module game {
	export class GuildApplyListView extends ui.guild.hall.GuildApplyListUI {

		private _model : GuildModel;
		constructor() {
			super();
			this.isModelClose = true;
			this._model = GuildModel.getInstance();
		}

		public onClosed(): void {
			super.onClosed();
			this.list_apply.array = null;
			this.bgPanel.dataSource = null;
			this.btn_allyes.off(Laya.Event.CLICK, this, this.oneKey);
			this.btn_allno.off(Laya.Event.CLICK, this, this.oneKey);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		private initView(): void {
			this.list_apply.array = null;
			this.btn_allyes.on(Laya.Event.CLICK, this, this.oneKey, [0]);
			this.btn_allno.on(Laya.Event.CLICK, this, this.oneKey, [1]);
			this.updateApplyList();
			this.bgPanel.dataSource = { uiName: UIConst.GuildApplyListView, closeOnSide: this.isModelClose, title:"申请列表" };
		}

		public updateApplyList(): void {
			let ary = this._model.getApplyList();
			ary.sort((a, b)=>{
				return b.applyTime-a.applyTime;
			})
			this.list_apply.array = ary
			this.img_side.visible = ary.length >= 6;
		}

		/**一键同意/拒绝 */
		private oneKey(type: number): void {
			let model = this._model;
			if (model.getApplyList().length == 0){
				return;
			}
			let arg = {};
			arg[Protocol.guild_guild_apply_opt.args.type] = type;
			arg[Protocol.guild_guild_apply_opt.args.playerId] = null;
			PLC.request(Protocol.guild_guild_apply_opt, arg, ($data: any, msg: any) => {
				if (!$data) return;
				if ($data.delApplyList || type == 1){
					if (type == 1){
						model.setApplyList([]);
					}else{
						let arr:IGuildApplyData[] = model.getApplyList();
						if($data.addMemberList && $data.addMemberList.length > 0){
							for (let i:number = 0; i < $data.addMemberList.length; i++){
								guildMemberChatSend("欢迎" +  $data.addMemberList[i].name + "加入了大家庭，一同求道！");	
							}	
							dispatchEvt(new GuildEvent(GuildEvent.UPDATE_MEMBER_LIST));
						}	
						//先弹提示
						let strTip:string = ""
						for (let i:number = 0; i < $data.delApplyList.length; i++){
							let isAdd:boolean = $data.addMemberList && $data.addMemberList.some(item=>item.playerId == $data.delApplyList[i])
							if (!isAdd){
								let player:IGuildApplyData = arr.find(item=>item.playerId == $data.delApplyList[i]);
								if (player)strTip += player.name + ",";
							}
						}
						if (strTip != ""){
							strTip = strTip.substr(0, strTip.length-1);
							showToast(strTip + LanMgr.getLan('',10405));
						}
						//过滤掉删除的申请
						for (let i:number = 0; i < $data.delApplyList.length; i++){
							arr = arr.filter((item)=>{item.playerId != $data.delApplyList[i]});
						}
						model.setApplyList(arr);
					}
					let guildApplyListView:GuildApplyListView  = UIMgr.getUIByName(UIConst.GuildApplyListView);
					if(guildApplyListView){
						guildApplyListView.updateApplyList();
					}	
				}
			})
		}


	}
}