/**
* name 
*/
module game {

    export class GuildMemberSetView extends ui.guild.hall.MemberSetupUI {

        private _model: GuildModel;
        constructor() {
            super();
        }

        public createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this._model = GuildModel.getInstance();
            this.btnOpt1.on(Laya.Event.CLICK, this, this.onOpt);
            this.btnOpt2.on(Laya.Event.CLICK, this, this.onOpt);
            this.btnOpt3.on(Laya.Event.CLICK, this, this.onOpt);
            this.bgPanel.dataSource = { uiName: UIConst.GuildMemberSetView, closeOnSide: this.isModelClose, title: "xx" };
        }
        public onClosed(): void {
            super.onClosed();
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
            let mInfo: IGuildMemberData = this.dataSource;
            let guildInfo = this._model.guildInfo;
            let isCaptain = guildInfo.job == iface.tb_prop.guildJobTypeKey.president;
            let isViceCaptain = guildInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident;
            this.btnOpt1.visible = this.btnOpt2.visible = this.btnOpt3.visible = true;
            if (isCaptain) {
                this.btnOpt1.label = LanMgr.getLan(``,10522);
                this.btnOpt1.dataSource = { type: GuildMemberOptType.zhuanrang_hz };
                this.btnOpt2.label = mInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident ? LanMgr.getLan(``,10523) : LanMgr.getLan(``,10524);
                this.btnOpt2.dataSource = { type: mInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident ? GuildMemberOptType.bamian_fhz : GuildMemberOptType.renming_fhz };
                this.btnOpt3.label = LanMgr.getLan(``,10525);
                this.btnOpt3.dataSource = { type: GuildMemberOptType.zhuchu_gh };
            } else if (isViceCaptain) {
                this.btnOpt1.visible = this.btnOpt2.visible = false;
                this.btnOpt3.label = mInfo.job == iface.tb_prop.guildJobTypeKey.president ? LanMgr.getLan(``,10526) : LanMgr.getLan(``,10525);
                this.btnOpt3.dataSource = { type: mInfo.job == iface.tb_prop.guildJobTypeKey.president ? GuildMemberOptType.cuanwei : GuildMemberOptType.zhuchu_gh };
            } else {
                this.btnOpt1.visible = this.btnOpt2.visible = false;
                this.btnOpt3.label = LanMgr.getLan(``,10526);
                this.btnOpt3.dataSource = { type: GuildMemberOptType.cuanwei };
            }
            this.lbContent.text = LanMgr.getLan(``,10527,mInfo.name);
            this.bgPanel.updateTitle(mInfo.name);
        }

        private onOpt(event: Laya.Event): void {
            let info: IGuildMemberData = this.dataSource;
            let btn = event.currentTarget as Laya.Button;
            let dataSource = btn.dataSource;
            let type = dataSource ? dataSource['type'] : 0;
            if (!info || type == 0) return;
            switch (type) {
                case GuildMemberOptType.zhuanrang_hz:
                case GuildMemberOptType.bamian_fhz:
                case GuildMemberOptType.renming_fhz:
                case GuildMemberOptType.zhuchu_gh:
                    let text = "";
                    if (type == GuildMemberOptType.zhuanrang_hz) {
                        text = LanMgr.getLan(``, 10517, info.name);
                    } else if (type == GuildMemberOptType.bamian_fhz) {
                        text = LanMgr.getLan(``, 10518, info.name);
                    } else if (type == GuildMemberOptType.renming_fhz) {
                        text = LanMgr.getLan(``, 10519, info.name);
                    } else if (type == GuildMemberOptType.zhuchu_gh) {
                        text = info.job == iface.tb_prop.guildJobTypeKey.vicePresident ?LanMgr.getLan(``, 10520, info.name) :LanMgr.getLan(``, 10521);
                    }
                    let uidata: common.IConfirmData = {
                        text: text, confirmCb: () => {
                            dispatchEvt(new GuildEvent(GuildEvent.MEMBER_SETUP_OPERATE), [type, info]);
                        }, confirmNotClose: true
                    };
                    common.AlertBox.showAlert(uidata)
                    break;
                case GuildMemberOptType.cuanwei:
                    dispatchEvt(new GuildEvent(GuildEvent.MEMBER_SETUP_OPERATE), [type, info]);
                    break;
            }
        }



    }
}