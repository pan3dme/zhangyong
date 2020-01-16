
module common {

    /** 玩家信息界面 */
    export class PlayerInfoView extends ui.component.PlayerInfoUI {

        private _fdmodel : game.FriendModel;
        constructor() {
            super();
            this.isModelClose = true;
            this._fdmodel = game.FriendModel.getInstance();
        }

        createChildren():void {
			super.createChildren();
            this.btnAdd.on(Laya.Event.CLICK, this, this.onClick);
            this.btnChat.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_del.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_qxlh.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_lh.on(Laya.Event.CLICK, this, this.onClick);
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
		}
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed(): void {
            super.onClosed();
            this.btn_del.visible = this.btn_lh.visible = this.btn_qxlh.visible = this.btnAdd.visible = this.btnChat.visible = true;
            this.lineupUI.dataSource = null;
        }

        private initView(): void {
            this.lab_title.text = "好友详情";
            let info: PlayerInfoVo = this.dataSource;
            let clientVo = info.clientVo;
            this.lbName.text = clientVo && clientVo.name ? clientVo.name : info.svo.name;
            let guildName = clientVo && clientVo.guildName ? clientVo.guildName : info.svo.guildName;
            this.lbGuild.text = guildName ? LanMgr.getLan(``,12560,guildName) : LanMgr.getLan(``,12561);
            this.headBox.dataSource = new UserHeadVo(info.svo.head, info.svo.level,info.svo.headFrame);
            let isFirend:boolean = this._fdmodel.isMyFriend(info.svo.playerId);
            this.btnAdd.visible = !isFirend;
            this.btn_del.visible = isFirend;
            this.updateBlockBtn();
            this.lineupUI.dataSource = {lineupGods:info.getLineupGods(),shenqiAry:info.getShenqiAry(),showShenli:true,force:info.svo.force,userLevel:info.svo.level,title:""};
            // 隐藏所有按钮
            if(info.hideAllBtn) {
                this.btn_del.visible = this.btn_lh.visible = this.btn_qxlh.visible = this.btnAdd.visible = this.btnChat.visible = false;
            }
        }

        private updateBlockBtn():void{
            let info: PlayerInfoVo = this.dataSource;
            let isBlock:boolean = App.hero.isInBlockList(info.svo.playerId);
			this.btn_lh.visible = !isBlock;
            this.btn_qxlh.visible = isBlock;
        }

        private onClick(event: Laya.Event): void {
            let info: PlayerInfoVo = this.dataSource;
            let btn = event.target;
            if (btn == this.btnAdd) {
                dispatchEvt(new game.FriendEvent(game.FriendEvent.FRIEND_PANAEL_ADDFRIEND), info.svo.playerId);
            } else if (btn == this.btnChat) {
                dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_PRIVATE_CHAT_VIEW), info.svo.playerId);
                this.close();
            } else if (btn == this.btn_del) {
                common.AlertBox.showAlert({
					text: LanMgr.getLan("", 10485), confirmCb: ($data) => {
						let args = {};
						args[Protocol.friend_friend_delete.args.playerId] = $data.svo.playerId;
						PLC.request(Protocol.friend_friend_delete, args, ($$data: any, msg: any) => {
							if (!$$data) return;
							this._fdmodel.delFriend($$data.delfriend);
                            let friendsMainView :any = UIMgr.getUIByName(UIConst.Friend_MainView);
                            if (friendsMainView) friendsMainView.initFriendListView();
                            this.close();
						})
					}, parm: info
				});
            } else if (btn == this.btn_lh){
                common.AlertBox.showAlert({
					text: LanMgr.getLan("", 10486), confirmCb: ($data) => {
						let args = {};
						args[Protocol.friend_friend_pullBlack.args.playerId] = $data.svo.playerId;
						PLC.request(Protocol.friend_friend_pullBlack, args, ($$data: any, msg: any) => {
							if (!$$data) return;
                            App.hero.addBlockList($$data.addBlack);
                            // this.updateBlockBtn();
                            this._fdmodel.delFriend($$data.delfriend);
                            let friendsMainView :any = UIMgr.getUIByName(UIConst.Friend_MainView);
                            if (friendsMainView) friendsMainView.initFriendListView();
                            this.close();
						})
					}, parm: info
				});
            }else if (btn == this.btn_qxlh){
                common.AlertBox.showAlert({
					text: LanMgr.getLan("", 10487), confirmCb: ($data) => {
						let args = {};
						args[Protocol.friend_friend_pullWhite.args.playerId] = $data.svo.playerId;
						PLC.request(Protocol.friend_friend_pullWhite, args, ($$data: any, msg: any) => {
							if (!$$data) return;
                            App.hero.removeBlockListById($$data.delBlack);
							this.updateBlockBtn();
						})
					}, parm: info
				});
            }
        }
    }

    /** 用户信息 */
    export class PlayerInfoVo extends BaseFightVo {
        svo: IPlayerInfoVo;
        clientVo : {name,head,headFrame,guildName};

        hideAllBtn : boolean = false;   // 隐藏所有按钮
        isCrossSvr : boolean = false;   // 是否跨服玩家
        constructor() {
            super();
        }

        setData(svo: IPlayerInfoVo, userid: string,event:tl3d.BaseEvent=null,eventdata:any=null,hideAllBtn:boolean=false,isCrossSvr:boolean=false): void {
            this.hideAllBtn = hideAllBtn;
            this.isCrossSvr = isCrossSvr;
            this.svo = svo;
            svo.playerId = userid;
            this.svo.event = event;
            this.svo.eventdata = eventdata;
            this.setLineupInfo(svo.lineupInfo);
            this.setDataType(1);
        }
    }

    export interface IPlayerInfoVo {
        playerId: string;
        name: string;
        force: number;
        sex: number;
        head:any;
        headFrame:number;
        level: number;
        guildName: string;
        lineupInfo: any;

        event ?: tl3d.BaseEvent;
        eventdata ?: any;
    }
}