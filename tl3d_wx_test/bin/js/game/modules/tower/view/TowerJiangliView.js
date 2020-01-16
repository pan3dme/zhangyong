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
    var TowerJiangliView = /** @class */ (function (_super) {
        __extends(TowerJiangliView, _super);
        function TowerJiangliView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12126) };
            return _this;
        }
        TowerJiangliView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.liet_item.array = null;
        };
        TowerJiangliView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerJiangliView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerJiangliView.prototype.initView = function () {
            var arr = game.TowerModel.getInstance().putongModel.getJiangliList().concat(game.TowerModel.getInstance().kunnanModel.getJiangliList());
            var sorta;
            var sortb;
            arr.sort(function (a, b) {
                if (a.isReward()) {
                    sorta = a.tbTrial.ID * a.tbTrial.type * 1000;
                }
                else {
                    sorta = a.tbTrial.ID * a.tbTrial.type;
                }
                if (b.isReward()) {
                    sortb = b.tbTrial.ID * b.tbTrial.type * 1000;
                }
                else {
                    sortb = b.tbTrial.ID * b.tbTrial.type;
                }
                return sorta - sortb;
            });
            this.liet_item.array = arr;
        };
        return TowerJiangliView;
    }(ui.tower.JiangliViewUI));
    game.TowerJiangliView = TowerJiangliView;
})(game || (game = {}));
