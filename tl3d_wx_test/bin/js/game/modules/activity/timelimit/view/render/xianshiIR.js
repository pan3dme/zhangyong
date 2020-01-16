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
    var xianshiIR = /** @class */ (function (_super) {
        __extends(xianshiIR, _super);
        function xianshiIR() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        xianshiIR.prototype.init = function () {
            //限时获得消耗物品
            var activityArr = tb.TB_operate_activity.get_TB_operate_activity("time_index", game.TimelimitModel.getInstance().xianshiTimeIdx + "");
            if (activityArr && activityArr.length > 0) {
                this._xianshiItem = new ItemVo(activityArr[0].defined[0][0], 0);
                this.lab_xianshi.text = LanMgr.getLan("活动期间，领取挂机\n奖励有概率额外获得{0}。", -1, this._xianshiItem.getName());
                this.item_xianshi.dataSource = this._xianshiItem;
                // this.img_xianshi.skin = SkinUtil.getExchangeConsume(this._xianshiItem.id);
            }
        };
        xianshiIR.prototype.onAdd = function (timestr) {
            // if (this._xianshiItem) {
            //     this.lab_has.text = App.hero.getBagItemNum(this._xianshiItem.id) + "";
            // } else {
            //     this.lab_has.text = "";
            // }
            this.setTime(timestr);
        };
        xianshiIR.prototype.onExit = function () {
            this.close();
        };
        xianshiIR.prototype.setTime = function (timestr) {
            this.lab_time1.text = timestr;
        };
        return xianshiIR;
    }(ui.activity.timelimitactivity.xianshiViewUI));
    game.xianshiIR = xianshiIR;
})(game || (game = {}));
