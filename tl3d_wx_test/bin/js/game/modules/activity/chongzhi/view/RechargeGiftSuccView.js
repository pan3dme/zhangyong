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
/*
* name;
*/
var game;
(function (game) {
    var RechargeGiftSuccView = /** @class */ (function (_super) {
        __extends(RechargeGiftSuccView, _super);
        function RechargeGiftSuccView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.list.visible = false;
            _this.listVo = new ListVo(_this.list);
            _this.btnComfirnm.on(Laya.Event.CLICK, _this, _this.close);
            return _this;
        }
        RechargeGiftSuccView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        RechargeGiftSuccView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        RechargeGiftSuccView.prototype.initView = function () {
            this.eff_guang.play();
            var id = this.dataSource;
            var rechargeTemp = tb.TB_recharge.get_TB_rechargeById(id);
            this.lab_score.text = Snums(rechargeTemp.recharge_count * 10);
            var allItem = [];
            if (RechargeGiftSuccView.OPENSERVER_GIFT_ID.indexOf(id) != -1) {
                var osGiftTemp = game.OpenserverModel.getInstance().getOsGiftByRechargeid(id);
                if (osGiftTemp) {
                    allItem = ary2prop(osGiftTemp.reward);
                }
            }
            else if (RechargeGiftSuccView.OPENSERVER_HAOLI_GIFT_ID.indexOf(id) != -1) {
                var oshlGiftTemp = tb.TB_openservice.getTB_openserviceByChargeid(id);
                if (oshlGiftTemp) {
                    allItem = ary2prop(oshlGiftTemp.reward);
                }
            }
            else if (RechargeGiftSuccView.CHAOZHI_GIFT_ID.indexOf(id) != -1) {
                var czGiftTemp = tb.TB_operate_activity.get_TB_operate_activity("index", id + "");
                if (czGiftTemp[0]) {
                    allItem = ary2prop(czGiftTemp[0].reward);
                }
            }
            else if (tb.TB_daily_recharge.getAllRecharges().indexOf(id) != -1) {
                var tbData = tb.TB_daily_recharge.getTBByRechargeId(id);
                if (tbData) {
                    allItem = ary2prop(tbData.reward);
                }
            }
            else if (tb.TB_week_recharge.getAllRecharges().indexOf(id) != -1) {
                var tbData = tb.TB_week_recharge.getTBByRechargeId(id);
                if (tbData) {
                    allItem = ary2prop(tbData.reward);
                }
            }
            else if (tb.TB_month_recharge.getAllRecharges().indexOf(id) != -1) {
                var tbData = tb.TB_month_recharge.getTBByRechargeId(id);
                if (tbData) {
                    allItem = ary2prop(tbData.reward);
                }
            }
            else if (RechargeGiftSuccView.FUND_GIFT_ID.indexOf(id) != -1) {
                //周基金
                this.lab_tq.text = LanMgr.getLan("激活{0}基金", -1, rechargeTemp.recharge_count);
                this.height = 300;
                return;
            }
            else if (RechargeGiftSuccView.LEVEL_FUND_GIFT_ID.indexOf(id) != -1) {
                //等级基金
                this.lab_tq.text = LanMgr.getLan("激活等级基金特权", -1);
                this.height = 300;
                return;
            }
            else if (tb.TB_warrior_cycle.getAllRecharges().indexOf(id) != -1) {
                //勇者之证
                this.lab_tq.text = LanMgr.getLan("解锁勇者之证进阶奖励", -1);
                var tbData = game.WarriorProveModel.getInstance().curTabCycle;
                if (tbData) {
                    allItem = ary2prop(tbData.activate_reward);
                }
            }
            this.lab_tq.text = "";
            for (var key in allItem) {
                allItem[key].show = true;
                allItem[key].startAction = true;
            }
            this.list.repeatX = allItem.length > 4 ? 4 : allItem.length;
            this.list.width = this.list.repeatX * 100;
            this.list.height = 100;
            this.list.y = this.y - 20;
            this.list.x = ((Laya.stage.width / 2) - 45) - ((this.list.repeatX - 1) * ((90 + this.list.spaceX) / 2));
            this.listVo.initData(this.list);
            this.listVo._dataSource = allItem;
            this.listVo.setZorder(this.zOrder);
            this.listVo.setWidth(this.list.width);
            this.listVo.setHeight(this.list.height);
            this.listVo.setPosition(this.list.x, this.list.y);
            this._efflist = common.EffectList.showEffectList(this.listVo);
            this.height = 350;
        };
        RechargeGiftSuccView.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.dataSource && this.dataSource.callback) {
                this.dataSource.callback.call(null);
            }
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.eff_guang.stop();
            AudioMgr.playSound("sound/getreward.mp3");
        };
        RechargeGiftSuccView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list.array = null;
            game.ChongzhiModel.getInstance().showVipupPanel();
        };
        RechargeGiftSuccView.OPENSERVER_GIFT_ID = [26, 27, 28, 29, 30, 31, 32]; //开服礼包充值id
        RechargeGiftSuccView.FUND_GIFT_ID = [24, 25]; //成长基金礼包充值id
        RechargeGiftSuccView.OPENSERVER_HAOLI_GIFT_ID = [17, 18, 19, 20, 21, 22, 23]; //开服好礼礼包充值id
        RechargeGiftSuccView.LEVEL_FUND_GIFT_ID = [16]; //等级基金礼包充值id
        RechargeGiftSuccView.CHAOZHI_GIFT_ID = [10, 11, 12, 13, 14, 15]; //超值礼包
        return RechargeGiftSuccView;
    }(ui.activity.chongzhi.RechargeGiftSuccUI));
    game.RechargeGiftSuccView = RechargeGiftSuccView;
})(game || (game = {}));
