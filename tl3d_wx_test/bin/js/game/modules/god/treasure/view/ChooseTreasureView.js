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
    /** 打开选择圣物的界面类型 */
    var ChooseTreasureOpenType;
    (function (ChooseTreasureOpenType) {
        ChooseTreasureOpenType[ChooseTreasureOpenType["wear"] = 1] = "wear";
        ChooseTreasureOpenType[ChooseTreasureOpenType["change"] = 2] = "change";
        ChooseTreasureOpenType[ChooseTreasureOpenType["rebirth"] = 3] = "rebirth";
    })(ChooseTreasureOpenType = game.ChooseTreasureOpenType || (game.ChooseTreasureOpenType = {}));
    /** 选择圣物界面 */
    var ChooseTreasureView = /** @class */ (function (_super) {
        __extends(ChooseTreasureView, _super);
        function ChooseTreasureView() {
            return _super.call(this) || this;
        }
        ChooseTreasureView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true };
            this.itemList.selectedIndex = -1;
            this.itemList.selectEnable = false;
            this.itemList.mouseHandler = new Handler(this, this.onSelect);
        };
        ChooseTreasureView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        ChooseTreasureView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this.itemList.selectedIndex = -1;
            Laya.timer.clearAll(this);
            this._openType = 0;
            this._treasureVo = null;
            this._godVo;
        };
        ChooseTreasureView.prototype.initView = function () {
            var args = this.dataSource;
            this._openType = args[0];
            this._treasureVo = args[1];
            this._godVo = args[2];
            var model = game.TreasureModel.getInstance();
            if (this._openType == ChooseTreasureOpenType.rebirth) {
                this.itemList.array = model.getRebirthTreasureList();
            }
            else {
                this.itemList.array = model.getTreasureChooseList(true);
            }
        };
        ChooseTreasureView.prototype.onSelect = function (evt, index) {
            if (index == -1)
                return;
            if (evt.type == Laya.Event.CLICK) {
                var treasureVo = this.itemList.array[index];
                if (!treasureVo)
                    return;
                if (this._openType == ChooseTreasureOpenType.wear || this._openType == ChooseTreasureOpenType.change) {
                    game.TreasureTipsView.popupTip(treasureVo, this._godVo, true);
                }
                else if (this._openType == ChooseTreasureOpenType.rebirth) {
                    game.TreasureTipsView.popupTip(treasureVo, this._godVo, false, { "chooseFlag": true });
                }
            }
        };
        return ChooseTreasureView;
    }(ui.god.treasure.ChooseTreasureUI));
    game.ChooseTreasureView = ChooseTreasureView;
})(game || (game = {}));
