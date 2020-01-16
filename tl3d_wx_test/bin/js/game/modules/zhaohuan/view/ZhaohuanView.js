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
/**
* name
*/
var game;
(function (game) {
    var ZHAOHUAN;
    (function (ZHAOHUAN) {
        ZHAOHUAN[ZHAOHUAN["GENERAL"] = 0] = "GENERAL";
        ZHAOHUAN[ZHAOHUAN["FRIENDSHIP"] = 1] = "FRIENDSHIP";
        ZHAOHUAN[ZHAOHUAN["DIAMOND"] = 2] = "DIAMOND";
        ZHAOHUAN[ZHAOHUAN["LEGEND"] = 3] = "LEGEND";
    })(ZHAOHUAN = game.ZHAOHUAN || (game.ZHAOHUAN = {}));
    var ZhaohuanView = /** @class */ (function (_super) {
        __extends(ZhaohuanView, _super);
        function ZhaohuanView() {
            var _this = _super.call(this) || this;
            _this._ui = UIMgr.getInstance();
            _this.listdata = [
                { type: ZHAOHUAN.GENERAL },
                { type: ZHAOHUAN.FRIENDSHIP },
                { type: ZHAOHUAN.DIAMOND },
                { type: ZHAOHUAN.LEGEND }
            ];
            _this.group = UIConst.hud_group;
            _this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SUMMON, 0);
            return _this;
        }
        ZhaohuanView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            game.ZhaohuanModel.getInstance().curObj.type = -1;
            UIMgr.hideUIByName(UIConst.SysTopView);
            Laya.timer.clearAll(this);
        };
        ZhaohuanView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onShuoming.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            this.img_tips.visible = false;
            this.list_zhaohuan.dataSource = this.listdata;
            this.addTick();
            UIUtil.listTween(this.list_zhaohuan);
        };
        ZhaohuanView.prototype.addTick = function () {
            var propFreeNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum);
            var diamondFreeNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum);
            var nofreeflag = propFreeNum != 0 || diamondFreeNum != 0;
            if (nofreeflag) {
                Laya.timer.loop(1000, this, this.onTick);
                this.onTick();
            }
            else {
                Laya.timer.clear(this, this.onTick);
                this.onTick();
            }
        };
        ZhaohuanView.prototype.onTick = function () {
            var str = '';
            var date = new Date(App.serverTime);
            date.setHours(0, 0, 0, 0);
            var time = (date.getTime() + TimeConst.ONE_DAY_MILSEC) / 1000; //秒
            var propFreeNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum);
            str = propFreeNum != 0 ? GameUtil.toCountdown((time - App.getServerTime()), "hh:mm:ss") + LanMgr.getLan("", 12105) : '';
            var item0 = this.list_zhaohuan.getCell(0);
            item0.setTime(str);
            var diamondFreeNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum);
            str = diamondFreeNum != 0 ? GameUtil.toCountdown((time - App.getServerTime()), "hh:mm:ss") + LanMgr.getLan("", 12105) : '';
            var item2 = this.list_zhaohuan.getCell(2);
            item2.setTime(str);
            //同步计时器状态
            var nofreeflag = propFreeNum != 0 || diamondFreeNum != 0;
            if (!nofreeflag) {
                Laya.timer.clear(this, this.onTick);
            }
        };
        ZhaohuanView.prototype.refreshList = function () {
            this.list_zhaohuan.refresh();
            this.addTick();
        };
        ZhaohuanView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.RETURN_LASTVIEW, UIConst.Main3DView));
        };
        ZhaohuanView.prototype.onShuoming = function (e) {
            if (!this.img_tips.skin) {
                this.img_tips.skin = "zhaohuan/summonTips.png";
            }
            this.img_tips.visible = !this.img_tips.visible;
        };
        return ZhaohuanView;
    }(ui.zhaohuan.ZhaohuanUI));
    game.ZhaohuanView = ZhaohuanView;
})(game || (game = {}));
