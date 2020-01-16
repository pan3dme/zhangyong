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
    var TabPage = /** @class */ (function (_super) {
        __extends(TabPage, _super);
        function TabPage() {
            var _this = _super.call(this) || this;
            _this.btn_buy.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.uiScene = new Base2dSceneLayer();
            _this.addChild(_this.uiScene);
            return _this;
        }
        TabPage.prototype.onClick = function () {
            var _this = this;
            if (this.btn_buy.gray) {
                showToast(this.btn_buy.label);
                return;
            }
            if (this.dataSource.isbuy()) {
                //领取
            }
            else {
                //购买
                var payid = this.dataSource.tab.charge_id;
                var pid = Number(window.platform.pid);
                if (game.ChongzhiModel.isRealPay(pid)) {
                    var rechargeitem = tb.TB_recharge.get_TB_rechargeById(payid);
                    game.ChongzhiModel.pay(rechargeitem);
                }
                else {
                    UIUtil.payDebug(payid, { text: LanMgr.getLan("", 12638), yes: LanMgr.getLan("", 12639) }, function () {
                        game.OpenserverModel.getInstance().addpay(_this.dataSource.id);
                        _this.updateBtn(_this.dataSource);
                    });
                }
            }
        };
        Object.defineProperty(TabPage.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.showmodel = function (model, model_multiple) {
            this.uiScene.onShow();
            //因模型和特效的关系，切换模型时，必须重新new 一个scenechar
            if (this._lastmodel == model) {
                return;
            }
            this.uiScene.clearSceneChar();
            this.uiScene.addModelChar(String(model), 200, 700, 180, model_multiple);
            this._lastmodel = model;
        };
        TabPage.prototype.closePanel = function () {
            if (this.uiScene) {
                this.uiScene.onExit();
            }
            this._lastmodel = -1;
        };
        TabPage.prototype.refreshData = function (item) {
            if (item) {
                this.list_reward.dataSource = ary2prop(item.tab.reward);
                listAtCenter(this.list_reward, 15, 5, this.list_reward.dataSource.length);
                this.callLater(this.showmodel, [item.tab.model_show, item.tab.model_multiple]);
                this.updateBtn(item);
            }
            else {
                this.list_reward.dataSource = null;
            }
        };
        TabPage.prototype.updateBtn = function (item) {
            var isreceive = item.isReceive();
            var isbuy = item.isbuy();
            var canbuy = item.canBuy();
            this.redpoint.visible = isbuy && !isreceive;
            var haspay = game.OpenserverModel.getInstance().hasPay(item.id);
            this.btn_buy.gray = false;
            if (isreceive) {
                this.btn_buy.label = LanMgr.getLan("", 10036);
                this.btn_buy.gray = true;
            }
            else if (isbuy) {
                this.btn_buy.label = LanMgr.getLan("", 10036);
                this.btn_buy.gray = true;
            }
            else if (haspay) {
                this.btn_buy.label = LanMgr.getLan("", 10473);
                this.btn_buy.gray = true;
            }
            else if (!canbuy) {
                this.btn_buy.label = LanMgr.getLan("", 10474);
                this.btn_buy.gray = true;
            }
            else {
                this.btn_buy.label = LanMgr.getLan("", 10475) + item.tab.recharge_num;
            }
        };
        return TabPage;
    }(ui.activity.openserver.tabPageUI));
    game.TabPage = TabPage;
})(game || (game = {}));
