/**
* name 
*/
module game {
	export class AddView extends ui.friend.AddFriendUI {
		/**已申请playerId */
		private _playerIds: Object = {};
		constructor() {
			super();
			this.list_friend.array = null;
			this.list_friend.renderHandler = new Handler(this, this.onRender);
			this.btn_update.on(Laya.Event.CLICK, this, this.update);
			this.btn_lookup.on(Laya.Event.CLICK, this, this.lookup);
			this.btnOneKeyApply.on(Laya.Event.CLICK,this,this.onOneKeyAdd);
		}

		public set dataSource(show:any) {
            this._dataSource = show;
			if (show){
				this.show();
			}else{
				this.onClosed();
			}
        }

        public get dataSource():any {
            return this._dataSource;
        }
		/**退出 */
		public onClosed(): void {
			this._playerIds = {};
			this.list_friend.array = null;
			this.lab_notfriend.visible = false;
		}
		public show(closeOther?: boolean, showEffect?: boolean): void {
			FriendModel.getInstance().queryList(Protocol.friend_friend_recommend, this.initFriendsList.bind(this));
		}

		/**初始化列表 */
		public initFriendsList(list: Array<any>): void {
			this.list_friend.array = list;
			this.updateState();
		}
		private updateState():void {
			let len = this.list_friend.array.length;
			this.are_putin.text = "";
			this.img_side.visible = len > 4;
			this.lab_notfriend.visible = len == 0;
		}

		/**list 渲染 */
		private onRender(itemRender: AddFriendIR, index: number) {
			let data : IFriendRecommendSvo = itemRender.dataSource;
			if (data) {
				let Vo = new UserHeadVo(data.head, data.level,data.headFrame);
				itemRender.headbox.dataSource = Vo;
				itemRender.lab_name.text = data.name;
				itemRender.lab_jifen.text = "" + data.force;
				itemRender.lab_type.text = LanMgr.getLan("",12248);
				itemRender.lab_type.color = ColorConst.TASK_GREEN;

				itemRender.btn_add.visible = !this.isapplyfriend(data.playerId);
				itemRender.lab_isapply.visible = !itemRender.btn_add.visible;
				itemRender.btn_add.on(Laya.Event.CLICK, this, this.addfriend, [data.playerId]);
				itemRender.headbox.on(Laya.Event.CLICK, this, this.onClickFriend, [data]);
			} else {
				itemRender.btn_add.off(Laya.Event.CLICK, this, this.addfriend);
				itemRender.headbox.off(Laya.Event.CLICK, this, this.onClickFriend);
			}
		}

		/**查找好友 */
		private lookup(): void {
			if (this.are_putin.text.length === 0) {
				showToast(LanMgr.getLan("", 10321));
				return;
			}
			let args = {};
			args[Protocol.friend_friend_find.args.name] = this.are_putin.text;
			PLC.request(Protocol.friend_friend_find, args, ($data: any, msg: any) => {
				if (!$data) {
					this.initFriendsList(new Array());
					return;
				}
				let array: Array<any> = new Array();
				array.push($data.targetData);
				this.initFriendsList(array);
			})
		}

		/**刷新推荐还好友列表 */
		private update(): void {
			/**推荐好友 */
			PLC.request(Protocol.friend_friend_recommend, null, ($data: any, msg: any) => {
				if (!$data) return;
				let list:any[] = [];
				if ($data.recommondList){
					while($data.recommondList.length > 0){
						let index:number = Math.floor(Math.random() * $data.recommondList.length);
						list.push($data.recommondList[index]);
						$data.recommondList.splice(index, 1);
					}
				}
				this.initFriendsList(list);
			})
		}

		/** 添加好友 */
		private addfriend(playerId: string): void {
			if(FriendModel.getInstance().getFriendList().length >= tb.TB_game_set.getMaxfriendNum()){
				showToast(LanMgr.getLan('', 10322));
				return;
			}
			if(FriendModel.getInstance().isMyFriend(playerId)){
				showToast(LanMgr.getLan('',10133));
				return;
			}
			if(App.hero.playerId == playerId){
				showToast(LanMgr.getLan('',10320));
				return;
			}
			/**申请好友 */
			let args = {};
			args[Protocol.friend_friend_apply.args.playerId] = playerId;
			PLC.request(Protocol.friend_friend_apply, args, ($data: any, msg: any,msgid:number) => {
				// 申请成功列表 -- 单独申请之后,没有成功时不会下发$data
				let applyList : any[] = $data ? ($data['applyList']) || [] : [];
				for(let id of applyList) {
					this._playerIds[id] = 1;
				}
				// 单独申请之后,没有成功列表时移除该项
				if(applyList.length <= 0){
					let index = this.list_friend.array.findIndex((info:IFriendApplySvo,index)=>{
						return info && playerId == info.playerId;
					});
					if(index != -1) {
						this.list_friend.deleteItem(index);
					}
				}
				this.list_friend.refresh();
				this.updateState();
			});
		}
		/** 一键申请 */
		private onOneKeyAdd():void {
			let ids = [];
			this.list_friend.array.forEach((vo:IFriendApplySvo)=>{
				if(vo && vo.playerId){
					ids.push(vo.playerId);
				}
			})
			if(ids.length <= 0){
				showToast(LanMgr.getLan('', 10323));
				return;
			}
			if(FriendModel.getInstance().getFriendList().length >= tb.TB_game_set.getMaxfriendNum()){
				showToast(LanMgr.getLan('', 10322));
				return;
			}
			/**申请好友 */
			let args = {};
			args[Protocol.friend_friend_oneKeyApply.args.playerIds] = ids;
			PLC.request(Protocol.friend_friend_oneKeyApply, args, ($data: any, msg: any,msgid:number) => {
				// 申请成功列表
				let applyList : any[] = $data ? ($data['applyList']) || [] : [];
				for(let id of applyList) {
					this._playerIds[id] = 1;
				}
				// 一键申请之后，成功的列表显示已申请状态，不成功(对方好友满了)的移除
				for(let id of applyList) {
					let index = this.list_friend.array.findIndex((info:IFriendApplySvo,index)=>{
						if(!info) return true;
						return info ? applyList.indexOf(info.playerId) == -1 : true;
					});
					if(index != -1) {
						this.list_friend.deleteItem(index);
					}
				}
				this.list_friend.refresh();
				this.updateState();
			});
		}

		/**该Id是否已申请 */
		private isapplyfriend(playerId: string): boolean {
			return this._playerIds.hasOwnProperty(playerId);
		}

		private onClickFriend(info: IFriendInfoVo): void {
			let event = new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL);
			dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_INFO_VIEW),{playerId:info.playerId,event});
		}

	}
}