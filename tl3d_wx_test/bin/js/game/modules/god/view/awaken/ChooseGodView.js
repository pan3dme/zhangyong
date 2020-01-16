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
    var ChooseGodView = /** @class */ (function (_super) {
        __extends(ChooseGodView, _super);
        function ChooseGodView() {
            return _super.call(this) || this;
        }
        ChooseGodView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12371) };
            this.list_gods.itemRender = game.ChooseGodIR;
            this.list_gods.mouseHandler = new Handler(this, this.onListHandler);
            this.btn_queding.on(Laya.Event.CLICK, this, this.onConfirm);
        };
        ChooseGodView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        ChooseGodView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list_gods.array = null;
            Laya.timer.clearAll(this);
        };
        ChooseGodView.prototype.initView = function () {
            var data = this.dataSource;
            this.list_gods.array = data.allList;
            Laya.timer.callLater(this, this.initSelected);
        };
        /** 初始化选中 */
        ChooseGodView.prototype.initSelected = function () {
            var data = this.dataSource;
            if (!data || !data.curMaterail)
                return;
            var choose = data.curMaterail.choose;
            var cells = this.list_gods.cells;
            var _loop_1 = function (key) {
                var item = cells[key];
                var info = item.dataSource;
                if (!info)
                    return "continue";
                if (info instanceof GodItemVo) {
                    var exist = choose.some(function (vo) {
                        return vo.type == game.MaterialType.god && vo.id == info.uuid;
                    });
                    item.img_gouxuan.visible = exist;
                }
                else if (info instanceof ItemVo) {
                    var exist = choose.some(function (vo) {
                        return vo.type == game.MaterialType.card && vo.id == info.id && vo.index == Number(key);
                    });
                    item.img_gouxuan.visible = exist;
                }
            };
            for (var key in cells) {
                _loop_1(key);
            }
        };
        ChooseGodView.prototype.onListHandler = function (event, index) {
            var _this = this;
            if (event.type == Laya.Event.CLICK) {
                var item = this.list_gods.getCell(index);
                var info_1 = item.dataSource;
                var chooseVo = this.dataSource;
                if (!info_1 || !chooseVo)
                    return;
                if (info_1 instanceof GodItemVo) {
                    if (info_1.isInLinuep(iface.tb_prop.lineupTypeKey.attack)) {
                        common.AlertBox.showAlert({
                            text: LanMgr.getLan("", 10501), confirmCb: function () {
                                game.GodUtils.downGods(info_1).then(function () {
                                    _this.refreshData();
                                });
                            }
                        });
                        return;
                    }
                }
                var curMaterail = chooseVo.curMaterail;
                if (!item.img_gouxuan.visible) {
                    var curNum = this.getCurSelectedCount();
                    if (chooseVo.openType == ChooseOpenType.awaken || chooseVo.openType == ChooseOpenType.starUp) {
                        if (curNum >= curMaterail.tbVo.count) {
                            showToast(LanMgr.getLan("", 10366, curMaterail.tbVo.count));
                            return;
                        }
                    }
                }
                item.img_gouxuan.visible = !item.img_gouxuan.visible;
            }
        };
        /** 刷新数据 */
        ChooseGodView.prototype.refreshData = function () {
            var cells = this.list_gods.cells;
            for (var key in cells) {
                var item = cells[key];
                if (item.dataSource) {
                    item.refreshData();
                }
            }
        };
        /** 确定 */
        ChooseGodView.prototype.onConfirm = function () {
            var data = this.dataSource;
            if (!data)
                return;
            data.curMaterail.choose = [];
            var cells = this.list_gods.cells;
            for (var key in cells) {
                var item = cells[key];
                var info = item.dataSource;
                if (info && item.img_gouxuan.visible) {
                    var type = -1;
                    var id = void 0;
                    if (info instanceof GodItemVo) {
                        type = game.MaterialType.god;
                        id = info.uuid;
                    }
                    else if (info instanceof ItemVo) {
                        type = game.MaterialType.card;
                        id = info.id;
                    }
                    if (type != -1) {
                        data.curMaterail.choose.push({ type: type, id: id, index: Number(key) });
                    }
                }
            }
            if (data.openType == ChooseOpenType.awaken) {
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    var view = UIMgr.getUIByName(UIConst.God_MainView);
                    if (view.viewJuexing) {
                        view.viewJuexing.refreshGodList();
                    }
                }
                if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                    var view = UIMgr.getUIByName(UIConst.God_GodCultureView).viewJuexing;
                    if (view) {
                        view.refreshGodList();
                    }
                }
            }
            else if (data.openType == ChooseOpenType.starUp) {
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    var view = UIMgr.getUIByName(UIConst.God_MainView);
                    if (view.viewStarup) {
                        view.viewStarup.refreshChooseList();
                    }
                }
                if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                    var view = UIMgr.getUIByName(UIConst.God_GodCultureView).viewStarup;
                    if (view) {
                        view.refreshChooseList();
                    }
                }
            }
            this.close();
        };
        /** 获取当前选中的物品数量 */
        ChooseGodView.prototype.getCurSelectedCount = function () {
            var num = 0;
            var cells = this.list_gods.cells;
            for (var key in cells) {
                var item = cells[key];
                if (item.dataSource && item.img_gouxuan.visible) {
                    num++;
                }
            }
            return num;
        };
        return ChooseGodView;
    }(ui.god.ChooseGodUI));
    game.ChooseGodView = ChooseGodView;
})(game || (game = {}));
