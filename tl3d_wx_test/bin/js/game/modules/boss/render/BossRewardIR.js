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
    var BossRewardIR = /** @class */ (function (_super) {
        __extends(BossRewardIR, _super);
        function BossRewardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BossRewardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        BossRewardIR.prototype.initView = function () {
            var data = this.dataSource;
            if (data) {
                this.ui_item.dataSource = data.itemData;
                this.lab_info.text = data.type == 1 ? LanMgr.getLan("", 12506) : LanMgr.getLan("", 12507);
                this.img_infobg.skin = data.type == 1 ? SkinUtil.redBg : SkinUtil.greenBg;
            }
            else {
                this.ui_item.dataSource = null;
                this.lab_info.text = "";
                this.img_infobg.skin = null;
            }
        };
        return BossRewardIR;
    }(ui.boss.BossRewardIRUI));
    game.BossRewardIR = BossRewardIR;
})(game || (game = {}));
