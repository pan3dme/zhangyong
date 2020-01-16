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
    var ArtifactListView = /** @class */ (function (_super) {
        __extends(ArtifactListView, _super);
        function ArtifactListView() {
            return _super.call(this) || this;
        }
        ArtifactListView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12521) };
            this.addChild(this.bgPanel.btnClose);
        };
        ArtifactListView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            // 原因：布阵界面之上
            this.zOrder = UI_DEPATH_VALUE.TOP + 3;
            this.initView();
        };
        ArtifactListView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            // 原因：布阵界面之上
            this.zOrder = UI_DEPATH_VALUE.TOP + 3;
            this.initView();
        };
        ArtifactListView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listShenqi.array = null;
        };
        ArtifactListView.prototype.initView = function () {
            this.listShenqi.array = tb.TB_artifact.get_TB_artifact();
        };
        return ArtifactListView;
    }(ui.artifact.ArtifactListUI));
    game.ArtifactListView = ArtifactListView;
})(game || (game = {}));
