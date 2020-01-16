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
    /** 记录 */
    var GloryRecordView = /** @class */ (function (_super) {
        __extends(GloryRecordView, _super);
        function GloryRecordView() {
            return _super.call(this) || this;
        }
        GloryRecordView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton: true, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12399) };
            this.bgPanel.addChildAt(this.img_bg, 3);
        };
        GloryRecordView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GloryRecordView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.recordList.array = null;
        };
        GloryRecordView.prototype.initView = function () {
            this.recordList.array = game.GloryModel.getInstance().getMyMatchList();
        };
        return GloryRecordView;
    }(ui.glory.RecordUI));
    game.GloryRecordView = GloryRecordView;
})(game || (game = {}));
