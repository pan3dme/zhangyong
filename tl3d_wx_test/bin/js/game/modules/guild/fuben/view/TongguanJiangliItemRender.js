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
    var TongguanJiangliItemRender = /** @class */ (function (_super) {
        __extends(TongguanJiangliItemRender, _super);
        function TongguanJiangliItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TongguanJiangliItemRender.prototype, "dataSource", {
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
        TongguanJiangliItemRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.lbTitle.text = data.getName();
                this.lbNum.text = data.getResetNumStr();
                this.lbNum.visible = data.isPass();
                this.rewardList.array = data.getRewardList();
                this.imgReward.visible = data.isReceive();
                this.btnReward.visible = !data.isReceive();
                this.btnReward.label = data.isPass() ? LanMgr.getLan('', 10041) : LanMgr.getLan('', 10090);
                this.btnReward.gray = !data.isCanReward();
                this.btnReward.on(Laya.Event.CLICK, this, this.onReward);
            }
            else {
                this.btnReward.off(Laya.Event.CLICK, this, this.onReward);
                this.rewardList.array = null;
            }
        };
        TongguanJiangliItemRender.prototype.onReward = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.RECEIVE_TONGGUAN_JIANGLI, this.dataSource));
        };
        return TongguanJiangliItemRender;
    }(ui.guild.copy.TongguanJiangliItemRenderUI));
    game.TongguanJiangliItemRender = TongguanJiangliItemRender;
})(game || (game = {}));
