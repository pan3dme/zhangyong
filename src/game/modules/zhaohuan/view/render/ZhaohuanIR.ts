module game {
    export class ZhaohuanIR extends ui.zhaohuan.render.ZhaohuanIRUI {
        constructor() {
            super();
            this.btn_one.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_ten.on(Laya.Event.CLICK, this, this.onClick);
            this.lab_time.visible = false;
        }

        private onClick(e: Laya.Event) {
            let ui: Laya.Button = e.target as Laya.Button
            let obj = ZhaohuanModel.getInstance().curObj;
            obj.type = this.dataSource.type;
            obj.isOne = ui.name == "one";
            if (obj.type == ZHAOHUAN.LEGEND){
                obj.isOne = true;
            }
            let newGodNum = obj.isOne ? 1 : 10;
            if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) < GodUtils.getGodsNum() + newGodNum) {
                let alertStr = LanMgr.getLan("", 10226);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: () => {
                        dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
                    }
                });
                return;
            }
            dispatchEvt(new SummonEvent(SummonEvent.SEND_ZHAOHUAN), { isOne: ui.name == "one", type: this.dataSource.type });
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData() {
            if(!this.dataSource) return;
            this.red_one.onDispose();
            this.red_ten.onDispose();
            let type = this.dataSource.type;
            this.imgBg.skin = SkinUtil.getZhaohuanIcon(type);
            this.boxTip.visible = type == ZHAOHUAN.DIAMOND;
            this.lbChuansuo.visible = false;
            this.box_ten.x = 249;
            switch (type) {
                case ZHAOHUAN.GENERAL:
                    this.drawGeneral();
                    break;
                case ZHAOHUAN.FRIENDSHIP:
                    this.drawFriendship();
                    break;
                case ZHAOHUAN.DIAMOND:
                    this.drawDiamong();
                    break;
                case ZHAOHUAN.LEGEND:
                    this.drawLegend();
                    break;

                default:
                    break;
            }
        }

        setTime(str:string){
            this.lab_time.visible = str.length > 0;
            this.lab_time.text = str;
        }

        private drawGeneral() {
            this.boxOne.x = 280;
            this.box_ten.x = 480;
            let freeNum: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum);
            let freeflag: boolean = freeNum == 0;
            this.lab_upone.visible = !freeflag;
            this.img_upone.visible = !freeflag;
            this.txt_num.text = "" + Snums(App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu))
            this.lbl_one.text = LanMgr.getLan("",10511);
            this.lbl_one.color = "#00c828";
            this.lbl_one.x = 66;
            if (!freeflag) {
                this.img_upone.skin = SkinUtil.putong;
                this.lab_upone.text = "X1";
                this.lbl_one.text = "1" + LanMgr.getLan("",12108);
                this.lbl_one.color = "#ffedbb";
                this.lbl_one.x = 85;
            }
            this.lbten.text = "10" + LanMgr.getLan("",12108);
            this.img_upten.skin = SkinUtil.putong;
            this.lab_upten.text = "X10";
            this.red_one.setRedPointName("summon_weizhi1");
            this.red_ten.setRedPointName("summon_weizhi10");
        }

        private drawFriendship() {
            this.txt_num.text = "" + Snums(App.hero.friend);
            this.boxOne.x = 280;
            this.lbl_one.text = "1" + LanMgr.getLan("",12108);
            this.lbl_one.color = "#ffedbb";
            this.lbl_one.x = 85;
            let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            this.img_upone.skin = this.img_upten.skin = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.friend);
            this.lab_upone.text = "X" + tab.friend_cost;
            this.lbten.text = "10" + LanMgr.getLan("",12108);;
            this.box_ten.x = 480;
            this.lab_upten.text = "X" + (tab.friend_cost * 10)
            this.red_ten.setRedPointName("summon_friend10");
        }

        private drawDiamong() {
            this.boxOne.x = 280;
            this.box_ten.x = 480;
            this.txt_num.text = "" + Snums(App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu));
            let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            let middlebooknum: number = App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu);
            let oneimgurl: string = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond);
            let tenimgurl: string = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond);
            let tennum: number = tab.zuanshi_ten;
            let onenum: number = tab.zuanshi_once;
            if (middlebooknum >= tab.zuanshi_once_priority[1]) {
                onenum = tab.zuanshi_once_priority[1];
                oneimgurl = SkinUtil.danchou;
            }
            if (middlebooknum >= tab.zuanshi_ten_priority[1]) {
                tennum = tab.zuanshi_ten_priority[1];
                tenimgurl = SkinUtil.danchou;
            }

            let freeNum: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum);
            let freeflag: boolean = freeNum == 0;
            this.lab_upone.visible = !freeflag;
            this.img_upone.visible = !freeflag;
            this.lbl_one.text = LanMgr.getLan("",10511);
            this.lbl_one.color = "#00c828";
            this.lbl_one.x = 66;
            if (!freeflag) {
                this.img_upone.skin = oneimgurl;
                this.lab_upone.text = "X" + onenum;
                this.lbl_one.text = "1" + LanMgr.getLan("",12108);;
                this.lbl_one.color = "#ffedbb";
                this.lbl_one.x = 85;
            }
            this.lbten.text = "10" + LanMgr.getLan("",12108);;
            this.img_upten.skin = tenimgurl;
            this.lab_upten.text = "X" + tennum;
            this.red_one.setRedPointName("summon_shenmi1");
            this.red_ten.setRedPointName("summon_shenmi10");

            this.lab_talk0.text = App.hero.getFirstUse(iface.tb_prop.firstTypeKey.godEmploy)? LanMgr.getLan("",12109) : LanMgr.getLan("",12110);
            this.lab_talk1.text = App.hero.getFirstUse(iface.tb_prop.firstTypeKey.godEmploy)? LanMgr.getLan("",12111): LanMgr.getLan("",12112);

        }

        private drawLegend() {
            this.btn_one.visible = false;
            this.lbl_one.visible = false;
            this.lab_upone.visible = false;
            this.img_upone.visible = false;
            this.lbten.text = "1" + LanMgr.getLan("",12108);;
            this.box_ten.x = 480;
            this.txt_num.text = "" + Snums(App.hero.legendChip);
            let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            this.img_upten.skin = SkinUtil.chuanshuo;
            this.lab_upten.text = "X" + tab.special_employ[1];
            this.red_ten.setRedPointName("summon_legend");
            this.lbten.visible = App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
            this.lbChuansuo.visible = !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
        }
    }
}