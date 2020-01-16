/**
* name 
*/
module game {
	export class FriendIR extends ui.friend.FriendIRUI {
		constructor() {
			super();
			this.btn_gift.on(Laya.Event.CLICK, this, this.allgift);
			this.headbox.on(Laya.Event.CLICK, this, this.onClickFriend);
			this.btn_receive.on(Laya.Event.CLICK, this, this.onReceive);
			this.btnFight.on(Laya.Event.CLICK, this, this.onQieCuo);
		}

		public set dataSource($value:IFriendInfoVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():IFriendInfoVo {
            return this._dataSource;
        }

        private refreshData() {
			let info = this.dataSource;
            if (info) {
                let Vo = new UserHeadVo(info.head, info.level,info.headFrame);
				this.headbox.dataSource = Vo;
				this.lab_name.text = info.name;
				this.lab_shenli.text = LanMgr.getLan("", 10117, info.force);
				this.lab_type.text = info.logoutTime == 0 ? LanMgr.getLan("",12248) : GameUtil.getTimePrev(info.logoutTime);
				this.lab_type.color = info.logoutTime == 0 ? ColorConst.TASK_GREEN : ColorConst.GRAY;

				this.btn_gift.visible = false;
				this.btn_hasgift.visible = false;
				this.btn_receive.visible = false;
				if (info.pointNum > 0){
					//有友情值可以领
					this.btn_receive.visible = true;
				}else if (info.giveTime < FriendModel.getInstance().dateTime){
					//今日未赠送
					this.btn_gift.visible = true;
				}else{
					this.btn_hasgift.visible = true;
				}
            }
        }

		/** 领取 */
		private onReceive():void{
			let info: IFriendInfoVo = this.dataSource;
			if (info && info.pointNum > 0){
				let args = {};
				args[Protocol.friend_friend_pointGet.args.playerId] = info.playerId;
				PLC.request(Protocol.friend_friend_pointGet, args, ($data: any, msg: any) => {
					if (!$data) return;
					FriendModel.getInstance().delPoint($data['delPoint']);
					this.refreshData();
				});
			}
		}

		private onClickFriend(): void {
			let info = this.dataSource;
			if(info){
				let event = new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL);
				dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_INFO_VIEW),{playerId:info.playerId,event});
			}
		}

		/** 切磋 */
		private onQieCuo():void{
			let info = this.dataSource;
			if(info){
				let event = new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL);
				dispatchEvt(new FriendEvent(FriendEvent.FRIEND_QIECUO),{playerId:info.playerId,event});
			}
		}

		/** 赠送 */
		public allgift(): void {
			let info: IFriendInfoVo = this.dataSource;
			if (info) {
				let args = {};
				args[Protocol.friend_friend_give.args.playerId] = info.playerId;
				PLC.request(Protocol.friend_friend_give, args, ($data: any, msg: any) => {
					if (!$data) return;
					FriendModel.getInstance().setGiveTime($data['giveId'],$data['giveTime']);
					this.refreshData();
				});
			}
		}


	}

}