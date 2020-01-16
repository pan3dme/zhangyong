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
    var TreasureTujianView = /** @class */ (function (_super) {
        __extends(TreasureTujianView, _super);
        function TreasureTujianView() {
            return _super.call(this) || this;
        }
        TreasureTujianView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12372) };
            this.itemList.array = null;
        };
        TreasureTujianView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TreasureTujianView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
        };
        TreasureTujianView.prototype.initView = function () {
            this.itemList.array = game.TreasureModel.getInstance().getTujianViewList();
        };
        return TreasureTujianView;
    }(ui.god.treasure.TreasureTujianUI));
    game.TreasureTujianView = TreasureTujianView;
})(game || (game = {}));
