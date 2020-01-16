

module game {
    /** 支援好友 */
    export class YZHelpFriendIR extends ui.yuanzheng.HelpFriendIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():GodItemVo {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
            if(info) {
                this.headBox.dataSource = info;
                this.lbName.text = `${info.tab_god.name}   ${LanMgr.godTypeName[info.tab_god.type]}`;
                this.lbForce.text = LanMgr.getLan("",10117,info.svrForce > 0 ? info.svrForce : info.getShenli());;
                let isPaiq : boolean = !info.uuid || YuanzhengModel.getInstance().isDispatch(info.uuid);
                this.btnSelect.visible = !isPaiq;
                this.lbYipaiqian.visible = isPaiq;
                this.btnSelect.on(Laya.Event.CLICK,this,this.onClick);
            }else {
                this.btnSelect.off(Laya.Event.CLICK,this,this.onClick);
            }
        }

        private onClick():void {
            let info = this.dataSource;
            if(!info) return;
            if(YuanzhengModel.getInstance().getDispatchNum() > 0) {
                showToast(LanMgr.getLan("", 10277));
                return;
            }
            let args = {};
            args[Protocol.friend_friendHelp_createFriendHelp.args.godId] = info.uuid;
            PLC.request(Protocol.friend_friendHelp_createFriendHelp, args, (sdata: any, msg: any) => {
                if (!sdata) {
                    return;
                }
                showToast(LanMgr.getLan("", 10278));
                let vo = YuanzhengModel.getInstance().addDispatchInfo(sdata['addHelpGodId'],sdata['addFriendHelp']);
                this.dataSource = vo.godVo;
                this.refreshView();
                if(UIMgr.hasStage(UIConst.Yuanzheng_HelpView)){
                    let view = UIMgr.getUIByName(UIConst.Yuanzheng_HelpView) as YZHelpView;
                    view.godList = null;
                }
            });
        }
    }
}