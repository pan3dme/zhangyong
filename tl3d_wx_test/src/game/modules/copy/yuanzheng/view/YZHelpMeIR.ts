

module game {

    export class YZHelpMeIR extends ui.yuanzheng.HelpMeIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():YZHelpInfoVo {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
            if(info) {
                this.headBox.dataSource = info.godVo;
                let tbGod = info.godVo.tab_god;
                this.lbName.text = `${tbGod.name}   ${LanMgr.godTypeName[tbGod.type]}`
                this.lbForce.text = LanMgr.getLan("",10117,info.force);
                this.lbFried.text = LanMgr.getLan("",12474) + info.svo.name;
                this.lbYiguyong.visible = info.isHire();
                let isOver = info.isOverForce();
                this.lbLimit.visible = !info.isHire() && isOver;
                this.btnGuyong.visible = !info.isHire() && !isOver;
                this.btnGuyong.on(Laya.Event.CLICK,this,this.onClick);
            }else {
                this.btnGuyong.off(Laya.Event.CLICK,this,this.onClick);
            }
        }

        private onClick():void {
            let info = this.dataSource;
            if(!info) return;
            let model = YuanzhengModel.getInstance();
            let maxCount = tb.TB_copy_set.getCopySet().hire_num;
            if(model.getHireCount() >= maxCount) {
                showToast(LanMgr.getLan("", 10279,maxCount));
                return;
            }
            let args = {};
            args[Protocol.friend_friendHelp_hireFriendHelp.args.helpId] = info.svo.helpId;
            PLC.request(Protocol.friend_friendHelp_hireFriendHelp, args, (sdata: any, msg: any) => {
                if (!sdata) {
                    return;
                }
                showToast(LanMgr.getLan("", 10280));
                info.svo.isHire = true;
                model.addHireInfo(sdata['addFriendHelpList']);
                this.refreshView();
                if(UIMgr.hasStage(UIConst.Yuanzheng_HelpView)){
                    let view = UIMgr.getUIByName(UIConst.Yuanzheng_HelpView) as YZHelpView;
                    view.renderHelpMe();
                }
            });
        }
    }
}