/**
* name 
*/
module game {
	export class FriendsView extends ui.friend.FriendListUI {

		private _model : FriendModel;
		constructor() {
			super();
			this.list_friend.array = null;
			this.btnPrivateChat.on(Laya.Event.CLICK, this, this.showPrivateChat);
			this.btn_allgift.on(Laya.Event.CLICK, this, this.onOneKey, [null]);
			this._model = FriendModel.getInstance();
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

		public onClosed():void{
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			FriendModel.getInstance().queryList(Protocol.friend_friend_list,this.initView.bind(this));
		}

		/**初始化列表 */
		public initView(): void {
			let list: IFriendInfoVo[] = FriendModel.getInstance().getFriendList(true);
			if (list && list.length != 0) {
				this.list_friend.visible = true;
				this.lab_notfriend.visible = false;
			} else {
				this.list_friend.visible = false;
				this.lab_notfriend.visible = true;
			}
			let date = new Date(App.serverTimeSecond * 1000);
			date.setHours(0, 0, 0, 0);
			this._model.dateTime = date.getTime() / 1000;
	
			this.list_friend.array = list;
			this.lab_friendship.text = "X" + App.hero.friend.toString();
			this.lab_friendsNum.text = list.length.toString() + "/" + tb.TB_game_set.getMaxfriendNum();
			this.lab_gain.text = "X" + (tb.TB_game_set.getMaxFriendPonit() - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.friendPoint)).toString();

			if (list.length > 4) this.img_side.visible = true;
			else this.img_side.visible = false;
		}

		/** 一键领取并赠送 */
		private onOneKey():void{
			let arrdata: Array<any> = new Array();
			if (this.list_friend.array.length > 0) {
				arrdata = this.list_friend.array;
			} else {
				showToast(LanMgr.getLan("", 10329));
				return;
			}

			let allfriendgift = true;
			let allfriendreceive = true;
			for (let i in arrdata) {
				if (arrdata[i].giveTime < this._model.dateTime) {
					allfriendgift = false
				}
				if (arrdata[i].pointNum > 0){
					allfriendreceive = false;
				}
			}
			if (allfriendgift && allfriendreceive){
				//所有都赠送和领取了
				showToast(LanMgr.getLan("", 10330));
				return;
			}
			if (!allfriendgift) {
				PLC.request(Protocol.friend_friend_give, null, ($data: any, msg: any) => {
					if (!$data) return;
					FriendModel.getInstance().setGiveTime($data['giveId'],$data['giveTime']);
					showToast(LanMgr.getLan("", 10331));
					this.initView();
				})
			}
			if (!allfriendreceive) {
				PLC.request(Protocol.friend_friend_pointGet, null, ($data: any, msg: any) => {
					if (!$data) return;
					FriendModel.getInstance().delPoint($data['delPoint']);
					showToast(LanMgr.getLan("", 10332));
					this.initView();
				})
			}
		}

		
		/** 展示私聊列表 */
		private showPrivateChat(): void {
			dispatchEvt(new ChatEvent(ChatEvent.SHOW_PRIVATE_CHAT_VIEW));
		}

	}
}