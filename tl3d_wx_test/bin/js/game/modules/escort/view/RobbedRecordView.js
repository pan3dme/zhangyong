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
    var RobbedRecordView = /** @class */ (function (_super) {
        __extends(RobbedRecordView, _super);
        function RobbedRecordView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.addChildAt(_this.itemBox, 3);
            return _this;
        }
        RobbedRecordView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._buffList = new common.BuffRenderList(this.itemBox.width, this.itemBox.height, null, 500, 2, false);
            this._buffList.isAutoScroll = false;
            this._buffList.spaceY = 10;
            this._buffList.itemRender = game.RobRecordIR;
            this.itemBox.addChild(this._buffList);
        };
        RobbedRecordView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        RobbedRecordView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        RobbedRecordView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._buffList.removeAll();
            this.bgPanel.dataSource = null;
        };
        RobbedRecordView.prototype.initView = function () {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12430) };
            this._buffList.dataSource = this.dataSource;
        };
        return RobbedRecordView;
    }(ui.escort.RobbedRecordUI));
    game.RobbedRecordView = RobbedRecordView;
})(game || (game = {}));
