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
    var SevendaysIR = /** @class */ (function (_super) {
        __extends(SevendaysIR, _super);
        function SevendaysIR() {
            var _this = _super.call(this) || this;
            _this.btn_buy.on(Laya.Event.CLICK, _this, _this.linqu, ['buy']);
            _this.btn_lingqu.on(Laya.Event.CLICK, _this, _this.linqu, ['linqu']);
            return _this;
        }
        Object.defineProperty(SevendaysIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refreshData(value);
            },
            enumerable: true,
            configurable: true
        });
        SevendaysIR.prototype.refreshData = function (data) {
            if (data) {
                var tbReward = data.tbReward;
                var canTime = new Date(App.serverTimeSecond).getTime() >= game.SevendaysModel.getInstance().getLoginDaysTime(tbReward.day - 1);
                var arrReward = [];
                for (var i in tbReward.reward) {
                    arrReward.push(new ItemVo(tbReward.reward[i][0], tbReward.reward[i][1]));
                }
                this.lab_level.text = data.getDesc();
                this.img_labbg.width = Math.max(this.lab_level.width + 100, 237);
                this.list_item.dataSource = arrReward;
                this.img_already.visible = data.isReward();
                // this.lab_level.stroke = data.isFinish() ? 2 : 0;
                this.btn_buy.label = tbReward.value.toString();
                this.box_yuanjia.visible = data.isBuy() && !data.isReward();
                this.btn_lingqu.visible = !data.isReward() && !data.isBuy();
                this.lab_zuanshi.text = tbReward.defined[0] && tbReward.defined[0][0] ? (tbReward.defined[0][0] + "") : "";
                // this.lab_level.color = data.isFinish() ? "#2aff00" : ColorConst.normalFont;
                // this.lab_level.strokeColor = data.isFinish() ? ColorConst.normalFont : ColorConst.WHITE;
                this.btn_lingqu.selected = this.btn_lingqu.gray = !data.isFinish() || !canTime;
                this.box_yuanjia.gray = this.btn_buy.gray = this.btn_buy.selected = data.isReward() || !canTime;
                this.btn_lingqu.label = !canTime ? LanMgr.getLan("", 10143) : data.isFinish() ? LanMgr.getLan("", 10476) : LanMgr.getLan("", 10045);
                this.btn_lingqu.skin = SkinUtil.buttonGreen;
                this.btn_lingqu.labelStrokeColor = ColorConst.GREEN_FILTER;
                if (tbReward.way_link && tbReward.way_link.length > 0 && this.btn_lingqu.label == LanMgr.getLan("", 10045)) {
                    //有跳转
                    this.btn_lingqu.selected = this.btn_lingqu.gray = false;
                    this.btn_lingqu.label = LanMgr.getLan("", 12604);
                    this.btn_lingqu.skin = SkinUtil.buttonNormal;
                    this.btn_lingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                }
            }
        };
        SevendaysIR.prototype.linqu = function (type) {
            var _this = this;
            if (type == 'buy') {
                if (this.btn_buy.gray) {
                    showToast(LanMgr.getLan("", 10229));
                    return;
                }
                var data = this.dataSource;
                if (App.hero.diamond < data.tbReward.value) {
                    showToast(LanMgr.getLan('', 10005));
                    return;
                }
                else if (App.hero.vip < data.tbReward.defined[0][1]) {
                    showToast(LanMgr.getLan('', 10156));
                    return;
                }
            }
            else {
                //领取
                if (this.btn_lingqu.gray) {
                    var strTip = LanMgr.getLan("", 10229);
                    if (this.btn_lingqu.label == LanMgr.getLan("", 10045)) {
                        strTip = LanMgr.getLan("", 10230);
                    }
                    showToast(strTip);
                    return;
                }
                if (this.btn_lingqu.label == LanMgr.getLan("", 12604)) {
                    var data = this.dataSource;
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, data.tbReward.way_link));
                    return;
                }
            }
            var args = {};
            args[Protocol.game_activity_getSevenDayReward.args.num] = 1;
            args[Protocol.game_activity_getSevenDayReward.args.id] = this.dataSource.tbReward.ID;
            PLC.request(Protocol.game_activity_getSevenDayReward, args, function ($data, msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT), _this.dataSource.tbReward);
                dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.UPDATE_SEVENDAYS_PANEL));
            });
        };
        return SevendaysIR;
    }(ui.activity.sevendays.render.SevendaysRenderUI));
    game.SevendaysIR = SevendaysIR;
    var tabIR = /** @class */ (function (_super) {
        __extends(tabIR, _super);
        function tabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(tabIR.prototype, "dataSource", {
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
        tabIR.prototype.refreshData = function (item) {
            if (item) {
                this.btn_tab.label = item[0];
                if (item[1] != "") {
                    this.redpoint.setRedPointName(item[1]);
                }
                else {
                    this.redpoint.onDispose();
                }
            }
            else {
                this.redpoint.onDispose();
            }
        };
        return tabIR;
    }(ui.activity.sevendays.render.tabItemRenderUI));
    game.tabIR = tabIR;
})(game || (game = {}));
