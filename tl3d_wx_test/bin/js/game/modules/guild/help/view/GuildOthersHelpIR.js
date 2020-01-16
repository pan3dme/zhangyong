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
    var GuildOthersHelpIR = /** @class */ (function (_super) {
        __extends(GuildOthersHelpIR, _super);
        function GuildOthersHelpIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildOthersHelpIR.prototype, "dataSource", {
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
        GuildOthersHelpIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.itemBox.dataSource = info.getItemVo();
                this.lbName.text = info.svo.name;
                this.lbTitle.text = info.tbHelp.desc;
                this.lbNum.text = info.svo.helpNum + "/" + info.tbHelp.help_num;
                this.pbNum.value = info.svo.helpNum / info.tbHelp.help_num;
                var isFree = game.GuildHelpModel.getInstance().isFreeHelp();
                this.imgCost.visible = this.lbCost.visible = !isFree;
                if (isFree) {
                    this.btnHelp.label = "免费援助";
                }
                else {
                    this.btnHelp.label = "        援助";
                    var costAry = info.getCost();
                    this.imgCost.skin = SkinUtil.getCostSkin(costAry[0]);
                    this.lbCost.text = costAry[1] + "";
                }
                this.btnHelp.on(Laya.Event.CLICK, this, this.onHelp);
            }
            else {
                this.btnHelp.off(Laya.Event.CLICK, this, this.onHelp);
            }
        };
        GuildOthersHelpIR.prototype.onHelp = function () {
            var info = this.dataSource;
            if (info) {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.HELP_OTHERS, info));
            }
        };
        return GuildOthersHelpIR;
    }(ui.guild.help.OthersHelpIRUI));
    game.GuildOthersHelpIR = GuildOthersHelpIR;
})(game || (game = {}));
