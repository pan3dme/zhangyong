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
    var JishaJiangliItemRender = /** @class */ (function (_super) {
        __extends(JishaJiangliItemRender, _super);
        function JishaJiangliItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(JishaJiangliItemRender.prototype, "dataSource", {
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
        JishaJiangliItemRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                if (data.rank > 3) {
                    this.imgRank.visible = false;
                    this.lbRank.visible = true;
                    this.lbRank.text = data.rankStr.toString();
                }
                else {
                    this.imgRank.visible = true;
                    this.lbRank.visible = false;
                    this.imgRank.skin = SkinUtil.getRankSkin(data.rank);
                }
                this.rewardList.array = data.rewardList;
            }
            else {
                this.rewardList.array = null;
            }
        };
        return JishaJiangliItemRender;
    }(ui.guild.copy.JishaJiangliItemRenderUI));
    game.JishaJiangliItemRender = JishaJiangliItemRender;
})(game || (game = {}));
