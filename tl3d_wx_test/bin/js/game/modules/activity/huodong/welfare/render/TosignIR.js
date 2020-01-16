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
    var TosignIR = /** @class */ (function (_super) {
        __extends(TosignIR, _super);
        function TosignIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TosignIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        TosignIR.prototype.refresh = function () {
            if (this.dataSource) {
                this.itemList.array = this.dataSource;
                var index = this.parent.getChildIndex(this);
                var vo = game.HuodongModel.getInstance().getSignTb();
                this.lbLv.text = game.HuodongModel.getRewardsInfo(index, vo.tb.vip_level);
                if (vo.canReward(index)) {
                    this.btnSure.label = "\u9886\u53D6";
                    this.btnSure.labelStrokeColor = ColorConst.GREEN_FILTER;
                    this.btnSure.skin = SkinUtil.buttonGreen;
                    this.img_receive.visible = false;
                    this.btnSure.visible = true;
                }
                else if (vo.isReward(index)) {
                    this.img_receive.visible = true;
                    this.btnSure.visible = false;
                }
                else {
                    this.img_receive.visible = false;
                    this.btnSure.visible = true;
                    this.btnSure.skin = SkinUtil.buttonNormal;
                    this.btnSure.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    this.btnSure.label = "\u672A\u8FBE\u6210";
                }
                this.btnSure.gray = this.btnSure.selected = !vo.canReward(index);
                this.btnSure.on(Laya.Event.CLICK, this, this.sure, [index + 1]);
            }
            else {
                this.btnSure.off(Laya.Event.CLICK, this, this.sure);
                this.lbLv.text = "";
                this.itemList.array = null;
            }
        };
        TosignIR.prototype.sure = function (type) {
            var _this = this;
            var vo = game.HuodongModel.getInstance().getSignTb();
            if (!vo.canReward(type - 1)) {
                showToast(vo.isReward(type - 1) ? LanMgr.getLan('', 10220) : game.HuodongModel.getRewardsInfo(type - 1, vo.tb.vip_level));
                return;
            }
            var args = {};
            args[Protocol.game_welfare_everyDaySignIn.args.id] = vo.tb.ID;
            args[Protocol.game_welfare_everyDaySignIn.args.type] = type;
            PLC.request(Protocol.game_welfare_everyDaySignIn, args, function ($data, msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                _this.img_receive.visible = true;
                _this.btnSure.visible = false;
                var uipanel = UIMgr.getUIByName(UIConst.WelfareView);
                if (uipanel)
                    uipanel.list_btn.refresh();
            });
        };
        return TosignIR;
    }(ui.activity.huodong.welfare.render.toSignIRUI));
    game.TosignIR = TosignIR;
})(game || (game = {}));
