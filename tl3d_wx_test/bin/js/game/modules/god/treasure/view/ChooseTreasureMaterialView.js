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
    var ChooseTreasureMaterialView = /** @class */ (function (_super) {
        __extends(ChooseTreasureMaterialView, _super);
        function ChooseTreasureMaterialView() {
            return _super.call(this) || this;
        }
        ChooseTreasureMaterialView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "" };
            this.itemList.mouseHandler = new Handler(this, this.onListHandler);
            this.itemList.selectEnable = false;
            this.btnComfirm.on(Laya.Event.CLICK, this, this.onConfirm);
        };
        ChooseTreasureMaterialView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        ChooseTreasureMaterialView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            Laya.timer.clearAll(this);
        };
        ChooseTreasureMaterialView.prototype.initView = function () {
            var data = this.dataSource;
            this.itemList.array = data.allList;
            Laya.timer.callLater(this, this.initSelected);
        };
        /** 初始化选中 */
        ChooseTreasureMaterialView.prototype.initSelected = function () {
            var data = this.dataSource;
            if (!data || !data.curMaterail)
                return;
            var choose = data.curMaterail.choose;
            var cells = this.itemList.cells;
            var _loop_1 = function (key) {
                var item = cells[key];
                var info = item.dataSource;
                if (!info)
                    return "continue";
                var exist = choose.some(function (vo) {
                    return vo.id == info.uuid;
                });
                item.imgGouxuan.visible = exist;
            };
            for (var key in cells) {
                _loop_1(key);
            }
        };
        ChooseTreasureMaterialView.prototype.onListHandler = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var item = this.itemList.getCell(index);
                var info = item.dataSource;
                var chooseVo = this.dataSource;
                if (!info || !chooseVo)
                    return;
                var curMaterail = chooseVo.curMaterail;
                if (!item.imgGouxuan.visible) {
                    var curNum = this.getCurSelectedCount();
                    if (curNum >= curMaterail.tbVo.count) {
                        showToast(LanMgr.getLan("", 10366, curMaterail.tbVo.count));
                        return;
                    }
                }
                item.imgGouxuan.visible = !item.imgGouxuan.visible;
            }
        };
        /** 确定 */
        ChooseTreasureMaterialView.prototype.onConfirm = function () {
            var data = this.dataSource;
            if (!data)
                return;
            data.curMaterail.choose = [];
            var cells = this.itemList.cells;
            for (var key in cells) {
                var item = cells[key];
                var info = item.dataSource;
                if (info && item.imgGouxuan.visible) {
                    data.curMaterail.choose.push({ id: info.uuid, index: Number(key) });
                }
            }
            if (UIMgr.hasStage(UIConst.TreasureStarupView)) {
                var view = UIMgr.getUIByName(UIConst.TreasureStarupView);
                view.refreshChooseList();
            }
            this.close();
        };
        /** 获取当前选中的物品数量 */
        ChooseTreasureMaterialView.prototype.getCurSelectedCount = function () {
            var num = 0;
            var cells = this.itemList.cells;
            for (var key in cells) {
                var item = cells[key];
                if (item.dataSource && item.imgGouxuan.visible) {
                    num += item.dataSource.num;
                }
            }
            return num;
        };
        return ChooseTreasureMaterialView;
    }(ui.god.treasure.ChooseMaterialUI));
    game.ChooseTreasureMaterialView = ChooseTreasureMaterialView;
})(game || (game = {}));
