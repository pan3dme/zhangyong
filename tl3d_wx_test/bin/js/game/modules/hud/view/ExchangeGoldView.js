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
    var ExchangeGoldView = /** @class */ (function (_super) {
        __extends(ExchangeGoldView, _super);
        function ExchangeGoldView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.uiScene = new Base2dSceneLayer();
            _this.addChild(_this.uiScene);
            return _this;
        }
        /** 打开交换金币界面 */
        ExchangeGoldView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 打开交换金币界面 */
        ExchangeGoldView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
            this.isModelClose = true;
        };
        ExchangeGoldView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.timer.clearAll(this);
            this.removeEff();
        };
        /** 关闭交换金币界面 */
        ExchangeGoldView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.ani1.stop();
            this.btn_Duihuan.off(Laya.Event.CLICK, this, this.onExchangeGold);
        };
        /** 初始化界面 */
        ExchangeGoldView.prototype.initView = function () {
            this.btn_Duihuan.on(Laya.Event.CLICK, this, this.onExchangeGold);
            //更新数据
            this.updateData();
            this.playEff();
            this.img_bx.skin = "jinbiduihuan/jinbiduihuan02.png";
            this.ani1.play(1, true);
        };
        /** 更新数据 */
        ExchangeGoldView.prototype.updateData = function () {
            // 获取玩家已买次数 
            var count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyNum);
            // 获取玩家已买免费次数 
            var freecount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyFreeNum);
            // 可用次数 用总次数减去已买次数
            this.lbCiShu.text = LanMgr.getLan("", 12215) + '  :  ' + (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum) - count - freecount);
            // 获取到第n + 1次的数据(diamond,gold)
            var tbExchangeData = tb.TB_gold_exchange.getDataById(count + 1);
            if (tbExchangeData) {
                this.lbGold.text = LanMgr.getLan("", 12214) + "  :  " + tbExchangeData.gold;
                if (freecount >= tb.TB_exchange_set.getSet().daily_free) {
                    this.lab_consume.text = "X" + tbExchangeData.diamond;
                    this.box_consume.centerX = 0;
                    this.box_consume.visible = true;
                    this.btn_Duihuan.disabled = false;
                    this.btn_Duihuan.label = LanMgr.getLan("", 12212);
                }
                else {
                    //免费
                    this.box_consume.visible = false;
                    this.btn_Duihuan.disabled = false;
                    this.btn_Duihuan.label = LanMgr.getLan("", 10511);
                }
            }
            else {
                this.lbGold.text = LanMgr.getLan("", 12214) + "  :   0";
                this.box_consume.visible = false;
                this.btn_Duihuan.disabled = true;
                this.btn_Duihuan.label = LanMgr.getLan("", 12212);
            }
        };
        ExchangeGoldView.prototype.playEff = function () {
            var _this = this;
            if (this._particle)
                return;
            this.uiScene.addEffect(this, 1000008, new tl3d.Vector3D(185, 0, -480), 4, 30, function ($particle) {
                _this._particle = $particle;
            });
        };
        ExchangeGoldView.prototype.removeEff = function () {
            if (this._particle) {
                this.uiScene.removeEffect(this._particle);
                this._particle = null;
            }
        };
        /** 按下交换金币按键 */
        ExchangeGoldView.prototype.onExchangeGold = function () {
            var _this = this;
            //总次数
            var totalCount = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum);
            //玩家已交换次数
            var curCount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyNum);
            //玩家已交换次数
            var freecount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyFreeNum);
            //次数不足
            if (totalCount - curCount - freecount <= 0) {
                showToast(LanMgr.getLan('', 10082));
                return;
            }
            if (freecount >= tb.TB_exchange_set.getSet().daily_free) {
                //没有免费次数
                // 获取第n + 1次的数据
                var tbExchangeData = tb.TB_gold_exchange.getDataById(curCount + 1);
                //钻石不足
                if (App.hero.diamond < tbExchangeData.diamond) {
                    showToast(LanMgr.getLan('', 10005));
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                    return;
                }
            }
            this.btn_Duihuan.disabled = true;
            this.btn_Duihuan.label = LanMgr.getLan("", 12213);
            this.isModelClose = false;
            //资源充足请求
            //请求
            PLC.request(Protocol.game_shop_goldBuy, {}, function ($data) {
                if (!$data)
                    return;
                _this.img_bx.skin = "jinbiduihuan/jinbiduihuan03.png";
                _this.ani1.stop();
                Laya.timer.once(500, _this, _this.showReward, [$data]);
                //  this.updateData();
                dispatchEvt(new game.HudEvent(game.HudEvent.EXCHANGE_GOLD_CHANGE));
            });
        };
        ExchangeGoldView.prototype.showReward = function ($data) {
            var self = this;
            this.updateData();
            this.isModelClose = true;
            UIUtil.showRewardView($data.commonData, function () {
                self.img_bx.skin = "jinbiduihuan/jinbiduihuan02.png";
                self.ani1.play(self.ani1.index, true);
            }, false, UI_DEPATH.TOP);
        };
        return ExchangeGoldView;
    }(ui.hud.view.ExchangeGoldUI));
    game.ExchangeGoldView = ExchangeGoldView;
})(game || (game = {}));
