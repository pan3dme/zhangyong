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
    var EquipChangeView = /** @class */ (function (_super) {
        __extends(EquipChangeView, _super);
        function EquipChangeView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.initUi();
            return _this;
        }
        EquipChangeView.prototype.initUi = function () {
            this.shipinList = new common.BagRenderList(625, 680);
            this.shipinList.itemRender = game.BagIR;
            this.shipinList.spaceY = 5;
            this.shipinList.x = 45;
            this.shipinList.y = 87;
            this.addChild(this.shipinList);
        };
        EquipChangeView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.refreshData();
            this.bgPanel.dataSource = { uiName: UIConst.EquipChangeView, closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12599) };
        };
        /**
         * 获取列表数据
         */
        EquipChangeView.prototype.refreshData = function () {
            var tempdata;
            if (this.dataSource[1] == 0) {
                // let pos: number = this.dataSource[0] - 4;
            }
            else {
                tempdata = App.hero.getEquips(this.dataSource[0], true);
            }
            var ary = new Array;
            //初始化序号和选择项
            for (var j = 0; j < tempdata.length; j++) {
                var element = tempdata[j];
                element.selectid = -1;
                element.indexid = j;
                element.bag = false;
            }
            //一维数组转二维数组的方法
            var len = tempdata.length;
            var n = game.BagModel.line_num; //假设每行显示6个
            var lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
            for (var i = 0; i < lineNum; i++) {
                // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                var temp = tempdata.slice(i * n, i * n + n);
                ary.push(temp);
            }
            this.shipinList.dataSource = ary;
            if (this.dataSource[2])
                this.findSelected(this.dataSource[2].uuid);
        };
        /**
         * 强化后找到item位置
         */
        EquipChangeView.prototype.findSelected = function (uuid) {
            if (uuid === void 0) { uuid = this.changeUuid; }
            var data = this.shipinList.dataSource;
            for (var v = 0; v < data.length; v++) {
                for (var l = 0; l < data[v].length; l++) {
                    var element = data[v][l];
                    if (element.uuid == uuid) {
                        //如果找到当前变化的符文
                        var line = Math.floor(element.indexid / game.BagModel.line_num);
                        element.selectid = element.indexid;
                        this.shipinList.dataSource[line][0].selectid = element.indexid;
                        this.shipinList.scrollBarTo(100 * line);
                    }
                }
            }
        };
        // private selected;
        // private idx;
        EquipChangeView.prototype.updateItem = function (ndata) {
            this.changeUuid = ndata.uuid;
            var slist = this.shipinList.dataSource;
            for (var v = 0; v < slist.length; v++) {
                for (var l = 0; l < slist[v].length; l++) {
                    var element = slist[v][l];
                    if (ndata.uuid == element.uuid) {
                        //如果找到当前变化的符文
                        ndata.selectid = element.selectid;
                        // this.selected = element.selectid;
                        ndata.indexid = element.indexid;
                        // this.idx = element.indexid;
                        slist[v].splice(l, 1, ndata);
                        var line = Math.floor(element.indexid / game.BagModel.line_num);
                        var item = this.shipinList.getCell(line);
                        item.updataItem(l);
                    }
                }
            }
        };
        EquipChangeView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
            this.shipinList.dataSource = [];
        };
        return EquipChangeView;
    }(ui.equip.EquipChangeUI));
    game.EquipChangeView = EquipChangeView;
})(game || (game = {}));
