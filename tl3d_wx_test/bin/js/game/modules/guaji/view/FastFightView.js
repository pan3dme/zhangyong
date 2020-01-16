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
    var FastFightView = /** @class */ (function (_super) {
        __extends(FastFightView, _super);
        function FastFightView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Guaji_FastView, closeOnSide: _this.isModelClose, title: "快速战斗" };
            return _this;
        }
        FastFightView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        FastFightView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        FastFightView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.setFreeNum, this);
            tl3d.ModuleEventManager.addEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.setFreeNum, this);
        };
        /** 界面移除 */
        FastFightView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnFast.off(Laya.Event.CLICK, this, this.onFast);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.setFreeNum, this);
            tl3d.ModuleEventManager.removeEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.setFreeNum, this);
        };
        FastFightView.prototype.initView = function () {
            this.btnFast.on(Laya.Event.CLICK, this, this.onFast);
            var set = tb.TB_copy_set.getCopySet();
            var cnt = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.quickMainNum);
            //this.btnFast.label = `X${set.fighting_cost[cnt]}${LanMgr.getLan('',10006)}`;
            var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum);
            this.lbCount.text = LanMgr.getLan('', 10007, total - cnt, total);
            //收益
            var maxlv = game.GuajiModel.getInstance().getMaxLev();
            var tab_copyinfo = tb.TB_copy_info.get_TB_copy_infoById(maxlv);
            var arr = [];
            if (tab_copyinfo) {
                var goldVo = new ItemVo(iface.tb_prop.resTypeKey.gold, tab_copyinfo.gold_speed * 120);
                var expVo = new ItemVo(iface.tb_prop.resTypeKey.godExp, tab_copyinfo.exp_speed * 120);
                var roleExpVo = new ItemVo(CostTypeKey.exp, tab_copyinfo.role_exp_speed * 120);
                arr.push(goldVo);
                arr.push(expVo);
                arr.push(roleExpVo);
            }
            this.list_items.array = arr;
            if (arr && arr.length < 3) {
                this.list_items.x = 235 + (310 - (arr.length * 110 - 20)) / 2;
            }
            else {
                this.list_items.x = 235;
            }
            this.setFreeNum();
        };
        FastFightView.prototype.setFreeNum = function () {
            var freenum = App.hero.totalFreeCount(iface.tb_prop.limitTypeKey.fastFrightFreeNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.fastFrightFreeNum);
            this.img_zuanshi.visible = freenum <= 0;
            if (freenum > 0) {
                this.lb_cost.text = "\u6BCF\u65E5\u514D\u8D39" + freenum + "\u6B21";
                this.lb_cost.x = 321;
            }
            else {
                this.lb_cost.x = 392;
                var set = tb.TB_copy_set.getCopySet();
                var cnt = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.quickMainNum);
                this.lb_cost.text = 'X' + (cnt >= set.fighting_cost.length ? set.fighting_cost[set.fighting_cost.length - 1] : set.fighting_cost[cnt]);
            }
        };
        FastFightView.prototype.onFast = function () {
            var _this = this;
            var set = tb.TB_copy_set.getCopySet();
            var cnt = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.quickMainNum);
            if (cnt >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum)) {
                if (App.hero.vip < App.getMaxVipLv()) {
                    showToast(LanMgr.getLan("", 10388));
                }
                else {
                    showToast(LanMgr.getLan('', 10011));
                }
                return;
            }
            var freenum = App.hero.totalFreeCount(iface.tb_prop.limitTypeKey.fastFrightFreeNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.fastFrightFreeNum);
            var diamond = parseInt(set.fighting_cost[cnt]);
            if (freenum <= 0 && App.hero.diamond < diamond) {
                showToast(LanMgr.getLan('', 10005));
                return;
            }
            PLC.request(Protocol.game_copy_quickMainBattle, {}, function (res) {
                if (!res)
                    return;
                _this.initView();
                UIUtil.showRewardView(res.commonData);
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.FAST_BATTLE_SUCCESS));
            });
        };
        return FastFightView;
    }(ui.guaji.FastFightUI));
    game.FastFightView = FastFightView;
})(game || (game = {}));
