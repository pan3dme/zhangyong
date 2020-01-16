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
    var ChongzhiIR = /** @class */ (function (_super) {
        __extends(ChongzhiIR, _super);
        function ChongzhiIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChongzhiIR.prototype, "dataSource", {
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
        ChongzhiIR.prototype.refreshData = function (item) {
            if (item) {
                this.location(item.ID);
                this.lab_money.text = "￥" + item.recharge_count;
                var str = void 0;
                var monthcard = void 0;
                this.img_bg.skin = "chongzhitequan/xiaokuang.png";
                this.img_type.skin = SkinUtil.getZuanshiUrl(item.recharge_count);
                this.panduan(item.ID);
                this.lab_extra.color = "#f66217";
            }
            else {
                logdebug("置空");
            }
        };
        ChongzhiIR.prototype.panduan = function (id) {
            var str = "获得" + (this._dataSource.recharge_count * 10) + "钻石\n";
            this.lab_extra.text = LanMgr.getLan(str, -1);
            if (App.hero.welfare.goodsRechargeCount[id] > 0) {
                this.img_info.visible = id == 3 ? false : true;
                this.img_info.skin = SkinUtil.getChongzhiUrl("chaozhi");
                this.lab_extra_1.text = this._dataSource.extra_reward > 0 ? LanMgr.getLan("额外送" + this._dataSource.extra_reward + "钻石", -1) : "";
            }
            else {
                this.img_info.skin = SkinUtil.getChongzhiUrl("shuangbei");
                this.lab_extra_1.text = LanMgr.getLan("首充送" + (this._dataSource.recharge_count * 10) + "钻石", -1);
            }
        };
        ChongzhiIR.prototype.location = function (id) {
            switch (id) {
                case 3:
                    this.img_type.x = 98;
                    this.img_type.y = 32;
                    break;
                case 4:
                    this.img_type.x = 89;
                    this.img_type.y = 32;
                    break;
                case 5:
                    this.img_type.x = 68;
                    this.img_type.y = 25;
                    break;
                case 6:
                    this.img_type.x = 91;
                    this.img_type.y = 14;
                    break;
                case 7:
                    this.img_type.x = 84;
                    this.img_type.y = 13;
                    break;
                default:
                    this.img_type.x = 69;
                    this.img_type.y = 13;
                    break;
            }
        };
        return ChongzhiIR;
    }(ui.activity.chongzhi.ChongzhiIRUI));
    game.ChongzhiIR = ChongzhiIR;
})(game || (game = {}));
