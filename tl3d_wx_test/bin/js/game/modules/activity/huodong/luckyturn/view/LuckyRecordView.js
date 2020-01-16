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
    var LuckyRecordView = /** @class */ (function (_super) {
        __extends(LuckyRecordView, _super);
        function LuckyRecordView() {
            return _super.call(this) || this;
        }
        LuckyRecordView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton: true, closeOnSide: this.isModelClose, title: "记录" };
            this.bgPanel.addChildAt(this.img_bg, 3);
            this._model = game.HuodongModel.getInstance();
        };
        LuckyRecordView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        LuckyRecordView.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.recordList.renderHandler) {
                this.recordList.renderHandler.recover();
                this.recordList.renderHandler = null;
            }
            this.recordList.array = null;
            var model = this._model;
            model.godRecord = null;
            model.equipRecord = null;
            model.treasureRecord = null;
        };
        LuckyRecordView.prototype.initView = function () {
            this.recordList.renderHandler = Handler.create(this, this.recordListIR, null, false);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_RECORD_CHANGE, this.updateRecordList, this);
            this.updateRecordList();
        };
        LuckyRecordView.prototype.updateRecordList = function () {
            this.recordList.array = this._model.getRecordByType(this.dataSource);
        };
        LuckyRecordView.prototype.recordListIR = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell._childs[0].text = data[0];
                cell._childs[0].event(Laya.Event.RESIZE);
                var item = tb.TB_item.get_TB_itemById(data[1]);
                cell._childs[2].text = item.name + "X" + Snums(data[2]);
                cell.event(Laya.Event.RESIZE);
            }
            else {
            }
        };
        return LuckyRecordView;
    }(ui.activity.huodong.luckyturn.luckyRecordUI));
    game.LuckyRecordView = LuckyRecordView;
})(game || (game = {}));
