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
    /** 对战选手信息 */
    var GloryGroupView = /** @class */ (function (_super) {
        __extends(GloryGroupView, _super);
        function GloryGroupView() {
            return _super.call(this) || this;
        }
        GloryGroupView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton: true, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12400) };
        };
        GloryGroupView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GloryGroupView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.fightui.dataSource = null;
        };
        GloryGroupView.prototype.initView = function () {
            var info = this.dataSource;
            this.fightui.dataSource = info;
        };
        return GloryGroupView;
    }(ui.glory.GloryGroupUI));
    game.GloryGroupView = GloryGroupView;
})(game || (game = {}));
