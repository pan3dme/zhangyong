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
    var FundIR = /** @class */ (function (_super) {
        __extends(FundIR, _super);
        function FundIR() {
            var _this = _super.call(this) || this;
            _this.btn_lingqu.on(Laya.Event.CLICK, _this, _this.gift);
            return _this;
        }
        Object.defineProperty(FundIR.prototype, "dataSource", {
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
        FundIR.prototype.refreshData = function () {
            var data = this._dataSource;
            if (data) {
                var arrReaward = [];
                for (var i in data.reward) {
                    arrReaward.push(new ItemVo(data.reward[i][0], data.reward[i][1]));
                }
                this.list_item.dataSource = arrReaward;
                var canCondition = App.hero.level >= data.level && App.hero.welfare.buyLevelFund > 0; //满足条件（有购买并且等级达到）
                var hasReceive = App.hero.welfare.levelFundAward[data.ID] && App.hero.welfare.levelFundAward[data.ID] > 0; //是否领取了
                this.lab_level.text = LanMgr.getLan("\u8FBE\u5230" + data.level + "\u7EA7  (" + App.hero.level + "/" + data.level + ")", -1);
                if (hasReceive) {
                    this.img_already.visible = true;
                    this.btn_lingqu.visible = false;
                }
                else if (canCondition) {
                    this.img_already.visible = false;
                    this.btn_lingqu.visible = true;
                    this.btn_lingqu.disabled = false;
                    this.btn_lingqu.label = LanMgr.getLan("领取", -1);
                }
                else {
                    this.img_already.visible = false;
                    this.btn_lingqu.visible = true;
                    this.btn_lingqu.disabled = true;
                    this.btn_lingqu.label = LanMgr.getLan("未达到", -1);
                }
                this.btn_lingqu.skin = "comp/button/btn_qianwang.png";
                this.btn_lingqu.labelStrokeColor = "#538901";
            }
            else {
                this.list_item.dataSource = null;
            }
        };
        FundIR.prototype.gift = function () {
            dispatchEvt(new game.HuodongEvent(game.HuodongEvent.GET_LEVELFUND_REWARD), this._dataSource.ID);
        };
        return FundIR;
    }(ui.activity.huodong.welfare.render.RatingfundRenderUI));
    game.FundIR = FundIR;
})(game || (game = {}));
