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
    var LbTabIR = /** @class */ (function (_super) {
        __extends(LbTabIR, _super);
        function LbTabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(LbTabIR.prototype, "dataSource", {
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
        LbTabIR.prototype.refreshData = function () {
            var type = this._dataSource;
            if (type) {
                var model = game.LimiteBuyModel.getInstance();
                if (type == game.LimiteBuyType.summon) {
                    this.btn_tab.skin = SkinUtil.lim_summon;
                    //红点
                    if (model.Lim_Summon_Rp || model.haveBoxReward() || model.haveFreeTimes()) {
                        this.redpoint.visible = true;
                    }
                    else {
                        this.redpoint.visible = false;
                    }
                }
                else if (type == game.LimiteBuyType.group) {
                    this.btn_tab.skin = SkinUtil.lim_group;
                    //红点
                    if (model.Lim_Group_Rp) {
                        this.redpoint.visible = true;
                    }
                    else {
                        this.redpoint.visible = false;
                    }
                }
            }
            else {
                return;
            }
        };
        return LbTabIR;
    }(ui.box.TabIR2UI));
    game.LbTabIR = LbTabIR;
})(game || (game = {}));
