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
    var GuildMyHelpIR = /** @class */ (function (_super) {
        __extends(GuildMyHelpIR, _super);
        function GuildMyHelpIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildMyHelpIR.prototype, "dataSource", {
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
        GuildMyHelpIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var isExist = info.isExist();
                var isFinish = info.isRewardFinish();
                var isCanReward = info.isCanReward();
                this.lbQiuyuan.visible = this.btnAdd.visible = !isExist;
                this.itemBox.visible = this.lbTitle.visible = this.lbNum.visible = this.lbDesc.visible = this.lbNum.visible = this.lbPbNum.visible = this.pb.visible = isExist;
                this.imgFinish.visible = this.btnLingqu.visible = this.imgRedpoint.visible = this.lbState.visible = isExist;
                if (isExist) {
                    this.imgFinish.visible = isFinish;
                    this.btnLingqu.visible = this.lbState.visible = !isFinish;
                    this.btnLingqu.gray = !isCanReward;
                    this.imgRedpoint.visible = isCanReward;
                    this.lbState.text = isCanReward ? "\u53EF\u9886\u53D6\uFF1A" + info.getCanRewardNum() : "\u6C42\u63F4\u4E2D";
                    this.itemBox.dataSource = info.getItemVo();
                    var cur = info.svo.helpNum;
                    var total = info.tbHelp.help_num;
                    this.lbPbNum.text = this.lbNum.text = cur + "/" + total;
                    this.pb.value = cur / total;
                    this.lbTitle.text = info.tbHelp.desc;
                }
                else {
                    this.itemBox.dataSource = null;
                }
                this.on(Laya.Event.CLICK, this, this.onAdd);
                this.btnLingqu.on(Laya.Event.CLICK, this, this.onLingqu);
            }
            else {
                this.itemBox.dataSource = null;
                this.off(Laya.Event.CLICK, this, this.onAdd);
                this.btnLingqu.off(Laya.Event.CLICK, this, this.onLingqu);
            }
        };
        /** 求援 */
        GuildMyHelpIR.prototype.onAdd = function () {
            var info = this.dataSource;
            if (info && !info.isExist()) {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_ASK_HELP_VIEW, info));
            }
        };
        /** 领取 */
        GuildMyHelpIR.prototype.onLingqu = function () {
            var info = this.dataSource;
            if (info) {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.REWARD_HELPED_ITEM, info));
            }
        };
        return GuildMyHelpIR;
    }(ui.guild.help.MyHelpIRUI));
    game.GuildMyHelpIR = GuildMyHelpIR;
})(game || (game = {}));
