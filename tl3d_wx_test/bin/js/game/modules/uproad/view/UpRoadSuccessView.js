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
    var UpRoadSuccessView = /** @class */ (function (_super) {
        __extends(UpRoadSuccessView, _super);
        function UpRoadSuccessView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        UpRoadSuccessView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        UpRoadSuccessView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        UpRoadSuccessView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        UpRoadSuccessView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            this.ShowReward();
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
        };
        UpRoadSuccessView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this);
        };
        //弹奖励
        UpRoadSuccessView.prototype.ShowReward = function () {
            if (this.dataSource && this.dataSource.length > 1) {
                var commondata = this.dataSource[1];
                var rewardList = UIUtil.getRewardItemList(commondata);
                ShowRewardUtil.showRewardView(rewardList, 0, 0);
            }
        };
        UpRoadSuccessView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.TujianView, closeOnSide: false, title: "comp/title/gongxijihuo.png" };
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            var advanceLv = this.dataSource[0];
            this._curAdvanceRoadT = tb.TB_advance_road.getSet(advanceLv);
            this.img_icon.skin = LanMgr.getLan("zhaohuanshi/{0}.png", -1, advanceLv);
            if (this._curAdvanceRoadT) {
                this.lab_desc.text = this._curAdvanceRoadT.desc;
            }
        };
        return UpRoadSuccessView;
    }(ui.uproad.UpRoadSuccesssViewUI));
    game.UpRoadSuccessView = UpRoadSuccessView;
})(game || (game = {}));
