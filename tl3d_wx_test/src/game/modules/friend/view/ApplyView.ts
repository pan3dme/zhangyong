/**
* name 
*/
module game {
	export class ApplyView extends ui.friend.ApplyfriendUI {

		private _model : FriendModel;
		constructor() {
			super();
			this._model = FriendModel.getInstance();
			this.list_friend.array = null;
			this.list_friend.renderHandler = new Handler(this, this.onRender);
			this.btn_update.on(Laya.Event.CLICK, this, this.update);
			this.btnOneKeyAgree.on(Laya.Event.CLICK,this,this.onOnekeyAgree);
			this.btnOneKeyRefuse.on(Laya.Event.CLICK,this,this.onOnekeyRefuse);
		}

		public set dataSource(show:any) {
            this._dataSource = show;
			if (show){
				this.show();
			}else{
				this.exit();
			}
        }

        public get dataSource():any {
            return this._dataSource;
        }
		/**退出 */
		private exit(): void {
			this.list_friend.array = null;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void{
			this._model.queryList(Protocol.friend_friend_apply_list,this.initFriendsList.bind(this));
		}

		/**初始化列表 */
		public initFriendsList(applyList: any): void {
			this.list_friend.array = applyList;
			this.updateState();
		}
		private updateState():void {
			let num = this.list_friend.array.length;
			this._model.updateFriendApply(num > 0);
			this.img_side.visible = num > 5;
			this.lab_notfriend.visible = num == 0;
			this.lab_friendsNum.text = LanMgr.getLan("", -12411, num);
		}

		/**list 渲染 */
		private onRender(itemRender: ApplyFriendIR, index: number) {
			let info : IFriendApplySvo = itemRender.dataSource;
			if (info) {
				let Vo = new UserHeadVo(info.head,info.level,info.headFrame);
				itemRender.headbox.dataSource = Vo;
				itemRender.lab_name.text = info.name;
				itemRender.lab_force.text = LanMgr.getLan("", 10117, info.force);
				itemRender.lab_online.text = info.online == 1 ? LanMgr.getLan("",12248) : GameUtil.getOfflineTimeStr(info.outlineTime, App.serverTime/1000);
				itemRender.lab_online.color = info.online == 1 ? "#17d745" : "#535353";
				itemRender.btn_agree.on(Laya.Event.CLICK, this, this.onFriendApply, [itemRender, 0]);
				itemRender.btn_refuse.on(Laya.Event.CLICK, this, this.onFriendApply, [itemRender, 1]);
				itemRender.headbox.on(Laya.Event.CLICK, this, this.onClickFriend, [info]);
			} else {
				itemRender.btn_agree.off(Laya.Event.CLICK, this, this.onFriendApply);
				itemRender.btn_refuse.off(Laya.Event.CLICK, this, this.onFriendApply);
				itemRender.headbox.off(Laya.Event.CLICK, this, this.onClickFriend);
			}
		}

		/** 好友申请操作*/
		private onFriendApply(itemRender: ApplyFriendIR, opt_type: number): void {
			if(itemRender.dataSource){
				this.onApplyOperation(itemRender.dataSource,opt_type);
			}
		}
		
		/** 一键同意 */
		private onOnekeyAgree():void {
			this.onApplyOperation(null,0);
		}
		/** 一键拒绝 */
		private onOnekeyRefuse():void {
			this.onApplyOperation(null,1);
		}
		/** 同意或者拒绝 */
		private onApplyOperation(info: IFriendApplySvo,opt_type:number):void {
			let isOneKey : boolean = info ? false : true;
			let len = this.list_friend.array.length;
			let isAgree : boolean = opt_type == 0;
			// 一键操作时，判断是否有好友申请
			if(isOneKey && len <= 0){
				showToast(LanMgr.getLan('', 10324));
				return;
			}
			// 同意操作时,需要判断好友是否满了
			if(isAgree && this._model.getFriendList().length >= tb.TB_game_set.getMaxfriendNum()){
				showToast(LanMgr.getLan("",10325));
				return;
			}
			let args = {};
			args[Protocol.friend_friend_apply_opt.args.playerId] = info ? info.playerId : null;
			args[Protocol.friend_friend_apply_opt.args.opt_type] = opt_type;
			PLC.request(Protocol.friend_friend_apply_opt, args, ($data: any, msg: any) => {
				if (!$data) return;
				// 取消拉黑
				App.hero.removeBlockListById($data.delBlack);
				App.hero.removeBlackList($data.delBlackList);
				if(isOneKey){
					if(isAgree){
						// 一键同意成功有返回addfriendList列表
						let len = Array.isArray($data.addfriendList) ? $data.addfriendList.length : 0;
						len > 0 && showToast(LanMgr.getLan('', 10326,len));
					}else{
						// 一键拒绝
						this.list_friend.array = null;
					}
				}else{
					// 单个同意成功有返回addfriend数据,失败表示对方好友满了等.
					let isSucc : boolean = $data.addfriend ? true : false;
					isAgree && isSucc && showToast(LanMgr.getLan('', 10327,info?info.name:""));
					// 拒绝
					!isAgree && showToast(LanMgr.getLan('', 10328,info?info.name:""));
				}
				// 删除同意或者对方好友满了 列表
				if($data.delrequest){
					this.delApplyItem([$data.delrequest])
				}
				if($data.delrequestList){
					this.delApplyItem($data.delrequestList);
				}
				this.updateState();
			});
		}

		/** 删除项 */
		private delApplyItem(ids:string[]):void {
			for(let id of ids) {
				let index = this.list_friend.array.findIndex((info:IFriendApplySvo,index)=>{
					return info ? info.playerId == id : false;
				});
				if(index != -1) {
					this.list_friend.deleteItem(index);
				}
			}
		}

		/** 查看玩家详情 */
		private onClickFriend(info: IFriendApplySvo): void {
			if(!info) return;
			let event = new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL);
			dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_INFO_VIEW),{playerId:info.playerId,event});
		}

		/**刷新数据 */
		private update(): void {
			this._model.queryList(Protocol.friend_friend_apply_list,this.initFriendsList.bind(this));
		}

	}
}