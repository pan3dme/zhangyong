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
    var TotalsignIR = /** @class */ (function (_super) {
        __extends(TotalsignIR, _super);
        function TotalsignIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TotalsignIR.prototype, "dataSource", {
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
        TotalsignIR.prototype.refreshData = function () {
            var _this = this;
            var $data = this._dataSource;
            if ($data) {
                var signDays = game.HuodongModel.getTotalSignNum();
                var itemData = new ItemVo($data.reward[0], $data.reward[1]);
                if ($data.total_day <= signDays && $data.ID in App.hero.welfare.totalSignIn || $data.total_day > signDays) {
                    this.off(Laya.Event.CLICK, this, this.getGift);
                    this.imgBg.visible = false;
                    Laya.timer.clearAll(this);
                    itemData.show = true;
                }
                else {
                    itemData.show = false;
                    Laya.timer.clearAll(this);
                    this.imgBg.visible = true;
                    this.on(Laya.Event.CLICK, this, this.getGift);
                    Laya.timer.frameLoop(5, this, function () { _this.imgBg.rotation++; });
                }
                this.itemBox.dataSource = itemData;
                this.img_already.visible = $data.ID in App.hero.welfare.totalSignIn;
                this.lab_days.text = $data.total_day + LanMgr.getLan("天", -1);
            }
            else {
                Laya.timer.clearAll(this);
            }
        };
        TotalsignIR.prototype.showTip = function (itemData) {
            UIUtil.showItemTip(itemData);
        };
        /**累计签到 */
        TotalsignIR.prototype.getGift = function () {
            var _this = this;
            var args = {};
            args[Protocol.game_welfare_totalSignIn.args.id] = this._dataSource.ID;
            PLC.request(Protocol.game_welfare_totalSignIn, args, function ($data, msg) {
                logdebug($data);
                if (!$data)
                    return;
                _this.refreshData();
                if (!$data.commonData.addGods)
                    UIUtil.showRewardView($data.commonData);
            });
        };
        return TotalsignIR;
    }(ui.activity.huodong.welfare.render.TotalsignRenderUI));
    game.TotalsignIR = TotalsignIR;
})(game || (game = {}));
