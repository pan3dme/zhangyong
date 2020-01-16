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
    /** 挑战信息界面 */
    var ChallengeDetailView = /** @class */ (function (_super) {
        __extends(ChallengeDetailView, _super);
        function ChallengeDetailView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        ChallengeDetailView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.taskList.array = null;
        };
        ChallengeDetailView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        ChallengeDetailView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        ChallengeDetailView.prototype.initView = function () {
            var info = this.dataSource;
            this.taskList.array = info.getList();
            this.bgPanel.dataSource = { uiName: UIConst.ChallengeDetailView, closeOnSide: this.isModelClose, title: info.tbTitle.desc };
        };
        return ChallengeDetailView;
    }(ui.task.bianqiang.ChallengeDetailUI));
    game.ChallengeDetailView = ChallengeDetailView;
})(game || (game = {}));
