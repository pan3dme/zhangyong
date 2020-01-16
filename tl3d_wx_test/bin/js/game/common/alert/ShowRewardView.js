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
var common;
(function (common) {
    var ShowRewardView = /** @class */ (function (_super) {
        __extends(ShowRewardView, _super);
        function ShowRewardView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list.visible = false;
            _this.listVo = new ListVo(_this.list);
            return _this;
        }
        ShowRewardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        ShowRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        ShowRewardView.prototype.initView = function () {
            this._rewardOpt = this.dataSource;
            var dataList = this._rewardOpt.rewardList;
            for (var key in dataList) {
                dataList[key].show = true;
                dataList[key].startAction = true;
            }
            // this.list.x = dataList.length > 6 ? 162 : 315;            
            this.imgBg.height = dataList.length > 4 ? 360 : 290;
            this.closeByBlank.y = dataList.length > 4 ? 359 : 289;
            this.list.repeatX = dataList.length > 4 ? 4 : dataList.length;
            this.list.width = this.list.repeatX * 100;
            this.list.height = dataList.length > 4 ? 220 : 100;
            this.list.y = dataList.length > 4 ? this.y - 48 : this.y - 35;
            this.list.x = ((Laya.stage.width / 2) - 45) - ((this.list.repeatX - 1) * ((90 + this.list.spaceX) / 2));
            this.listVo.initData(this.list);
            this.listVo._dataSource = dataList;
            this.listVo.setZorder(this.zOrder);
            this.listVo.setWidth(this.list.width);
            this.listVo.setHeight(this.list._height);
            this.listVo.setPosition(this.list.x, this.list.y);
            this._efflist = common.EffectList.showEffectList(this.listVo);
        };
        ShowRewardView.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.dataSource && this.dataSource.callback) {
                this.dataSource.callback.call(null);
            }
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            AudioMgr.playSound("sound/getreward.mp3");
        };
        ShowRewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list.array = null;
            if (this._rewardOpt) {
                if (this._rewardOpt.handler) {
                    this._rewardOpt.handler.runWith([this._rewardOpt.type, this._rewardOpt.rewardList]);
                }
                Laya.Pool.recover("RewardInfoVo", this._rewardOpt);
            }
            this._rewardOpt = null;
            ShowRewardUtil.CheckRewardList();
        };
        return ShowRewardView;
    }(ui.component.CommonRewardBoxUI));
    common.ShowRewardView = ShowRewardView;
})(common || (common = {}));
