var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var ZhaohuanIR = /** @class */ (function (_super) {
        __extends(ZhaohuanIR, _super);
        function ZhaohuanIR() {
            var _this = _super.call(this) || this;
            _this.btn_one.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_ten.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.lab_time.visible = false;
            return _this;
        }
        ZhaohuanIR.prototype.onClick = function (e) {
            var ui = e.target;
            var obj = game.ZhaohuanModel.getInstance().curObj;
            obj.type = this.dataSource.type;
            obj.isOne = ui.name == "one";
            if (obj.type == game.ZHAOHUAN.LEGEND) {
                obj.isOne = true;
            }
            var newGodNum = obj.isOne ? 1 : 10;
            if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) < game.GodUtils.getGodsNum() + newGodNum) {
                var alertStr = LanMgr.getLan("", 10226);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: function () {
                        dispatchEvt(new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW));
                    }
                });
                return;
            }
            dispatchEvt(new game.SummonEvent(game.SummonEvent.SEND_ZHAOHUAN), { isOne: ui.name == "one", type: this.dataSource.type });
        };
        Object.defineProperty(ZhaohuanIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        ZhaohuanIR.prototype.refreshData = function () {
            if (!this.dataSource)
                return;
            this.red_one.onDispose();
            this.red_ten.onDispose();
            var type = this.dataSource.type;
            this.imgBg.skin = SkinUtil.getZhaohuanIcon(type);
            this.boxTip.visible = type == game.ZHAOHUAN.DIAMOND;
            this.lbChuansuo.visible = false;
            this.box_ten.x = 249;
            switch (type) {
                case game.ZHAOHUAN.GENERAL:
                    this.drawGeneral();
                    break;
                case game.ZHAOHUAN.FRIENDSHIP:
                    this.drawFriendship();
                    break;
                case game.ZHAOHUAN.DIAMOND:
                    this.drawDiamong();
                    break;
                case game.ZHAOHUAN.LEGEND:
                    this.drawLegend();
                    break;
                default:
                    break;
            }
        };
        ZhaohuanIR.prototype.setTime = function (str) {
            this.lab_time.visible = str.length > 0;
            this.lab_time.text = str;
        };
        ZhaohuanIR.prototype.drawGeneral = function () {
            this.boxOne.x = 280;
            this.box_ten.x = 480;
            var freeNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum);
            var freeflag = freeNum == 0;
            this.lab_upone.visible = !freeflag;
            this.img_upone.visible = !freeflag;
            this.txt_num.text = "" + Snums(App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu));
            this.lbl_one.text = LanMgr.getLan("", 10511);
            this.lbl_one.color = "#00c828";
            this.lbl_one.x = 66;
            if (!freeflag) {
                this.img_upone.skin = SkinUtil.putong;
                this.lab_upone.text = "X1";
                this.lbl_one.text = "1" + LanMgr.getLan("", 12108);
                this.lbl_one.color = "#ffedbb";
                this.lbl_one.x = 85;
            }
            this.lbten.text = "10" + LanMgr.getLan("", 12108);
            this.img_upten.skin = SkinUtil.putong;
            this.lab_upten.text = "X10";
            this.red_one.setRedPointName("summon_weizhi1");
            this.red_ten.setRedPointName("summon_weizhi10");
        };
        ZhaohuanIR.prototype.drawFriendship = function () {
            this.txt_num.text = "" + Snums(App.hero.friend);
            this.boxOne.x = 280;
            this.lbl_one.text = "1" + LanMgr.getLan("", 12108);
            this.lbl_one.color = "#ffedbb";
            this.lbl_one.x = 85;
            var tab = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            this.img_upone.skin = this.img_upten.skin = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.friend);
            this.lab_upone.text = "X" + tab.friend_cost;
            this.lbten.text = "10" + LanMgr.getLan("", 12108);
            ;
            this.box_ten.x = 480;
            this.lab_upten.text = "X" + (tab.friend_cost * 10);
            this.red_ten.setRedPointName("summon_friend10");
        };
        ZhaohuanIR.prototype.drawDiamong = function () {
            this.boxOne.x = 280;
            this.box_ten.x = 480;
            this.txt_num.text = "" + Snums(App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu));
            var tab = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            var middlebooknum = App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu);
            var oneimgurl = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond);
            var tenimgurl = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond);
            var tennum = tab.zuanshi_ten;
            var onenum = tab.zuanshi_once;
            if (middlebooknum >= tab.zuanshi_once_priority[1]) {
                onenum = tab.zuanshi_once_priority[1];
                oneimgurl = SkinUtil.danchou;
            }
            if (middlebooknum >= tab.zuanshi_ten_priority[1]) {
                tennum = tab.zuanshi_ten_priority[1];
                tenimgurl = SkinUtil.danchou;
            }
            var freeNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum);
            var freeflag = freeNum == 0;
            this.lab_upone.visible = !freeflag;
            this.img_upone.visible = !freeflag;
            this.lbl_one.text = LanMgr.getLan("", 10511);
            this.lbl_one.color = "#00c828";
            this.lbl_one.x = 66;
            if (!freeflag) {
                this.img_upone.skin = oneimgurl;
                this.lab_upone.text = "X" + onenum;
                this.lbl_one.text = "1" + LanMgr.getLan("", 12108);
                ;
                this.lbl_one.color = "#ffedbb";
                this.lbl_one.x = 85;
            }
            this.lbten.text = "10" + LanMgr.getLan("", 12108);
            ;
            this.img_upten.skin = tenimgurl;
            this.lab_upten.text = "X" + tennum;
            this.red_one.setRedPointName("summon_shenmi1");
            this.red_ten.setRedPointName("summon_shenmi10");
            this.lab_talk0.text = App.hero.getFirstUse(iface.tb_prop.firstTypeKey.godEmploy) ? LanMgr.getLan("", 12109) : LanMgr.getLan("", 12110);
            this.lab_talk1.text = App.hero.getFirstUse(iface.tb_prop.firstTypeKey.godEmploy) ? LanMgr.getLan("", 12111) : LanMgr.getLan("", 12112);
        };
        ZhaohuanIR.prototype.drawLegend = function () {
            this.btn_one.visible = false;
            this.lbl_one.visible = false;
            this.lab_upone.visible = false;
            this.img_upone.visible = false;
            this.lbten.text = "1" + LanMgr.getLan("", 12108);
            ;
            this.box_ten.x = 480;
            this.txt_num.text = "" + Snums(App.hero.legendChip);
            var tab = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            this.img_upten.skin = SkinUtil.chuanshuo;
            this.lab_upten.text = "X" + tab.special_employ[1];
            this.red_ten.setRedPointName("summon_legend");
            this.lbten.visible = App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
            this.lbChuansuo.visible = !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
        };
        return ZhaohuanIR;
    }(ui.zhaohuan.render.ZhaohuanIRUI));
    game.ZhaohuanIR = ZhaohuanIR;
})(game || (game = {}));
