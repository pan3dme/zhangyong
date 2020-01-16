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
    var RankIR = /** @class */ (function (_super) {
        __extends(RankIR, _super);
        function RankIR() {
            var _this = _super.call(this) || this;
            _this.lbMidDesc.autoSize = _this.lbBottomDesc.autoSize = true;
            return _this;
        }
        Object.defineProperty(RankIR.prototype, "dataSource", {
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
        RankIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info.name;
                this.lbMidDesc.text = info.getMidDesc();
                this.lbMid.text = info.getMid();
                this.boxMid.visible = info.isShowMid();
                this.lbMidDesc.event(Laya.Event.RESIZE);
                this.lbBottomDesc.text = info.getBottomDesc();
                this.lbBottom.text = info.getBottom();
                this.boxBottom.visible = info.isShowBottom();
                this.lbBottomDesc.event(Laya.Event.RESIZE);
                this.lbValue.text = info.getValue();
                this.lbValueDesc.text = info.getValueDesc();
                this.headBox.dataSource = info.getHeadVo();
                this.ui_view.dataSource = { rank: info.rank };
                this.headBox.on(Laya.Event.CLICK, this, this.onShowInfo);
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        };
        RankIR.prototype.onShowInfo = function () {
            var info = this.dataSource;
            if (!info || !info.playerId)
                return;
            if (info.rankSvrType == common.RankSvrType.matchCrossSvr) {
                UIUtil.showMatchLineupInfo(info);
            }
            else {
                UIUtil.showPlayerLineupInfo(info.playerId);
            }
        };
        return RankIR;
    }(ui.box.RankIRUI));
    common.RankIR = RankIR;
})(common || (common = {}));
