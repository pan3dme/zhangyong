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
    var GodDoorJiangliView = /** @class */ (function (_super) {
        __extends(GodDoorJiangliView, _super);
        function GodDoorJiangliView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.initUi();
            return _this;
        }
        GodDoorJiangliView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.refreshData();
            this.bgPanel.dataSource = { uiName: UIConst.GodDoor_JiangliView, closeOnSide: this.isModelClose };
        };
        GodDoorJiangliView.prototype.initUi = function () {
            this.JiangliItemList = new common.BagRenderList(530, 570);
            this.JiangliItemList.itemRender = game.GodDoorJiangliIR;
            this.JiangliItemList.spaceY = 3;
            this.JiangliItemList.x = 45;
            this.JiangliItemList.y = 70;
            this.JiangliItemList.max = 100;
            this.addChild(this.JiangliItemList);
        };
        /**
         * 获取列表数据
         */
        GodDoorJiangliView.prototype.refreshData = function () {
            var itemtab = tb.TB_divinity_door.get_TB_divinity_doorById(this.dataSource);
            var tempMiaoshu = new Array;
            tempMiaoshu.push(itemtab.show_god4);
            tempMiaoshu.push(itemtab.show_god5);
            var ary = new Array;
            //初始化序号和选择项
            // for (var j = 0; j < tempMiaoshu.length; j++) {
            // 	var element: any = tempMiaoshu[j];
            // 	element.selectid = -1;
            // 	element.indexid = j;
            // 	element.bag = false;
            // }
            // //一维数组转二维数组的方法
            // let len = tempMiaoshu.length;
            // let n = 1; //假设每行显示6个
            // let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
            for (var i = 0; i < tempMiaoshu.length; i++) {
                // let obj = {};
                // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                ary.push({ id: i, list: tempMiaoshu[i], rato: itemtab.god_percent.slice(i * 2, (i * 2) + 2) });
            }
            this.JiangliItemList.dataSource = ary;
            // if(this.dataSource[2])
            // 	this.findSelected(this.dataSource[2].uuid);
        };
        GodDoorJiangliView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
            this.JiangliItemList.dataSource = null;
        };
        return GodDoorJiangliView;
    }(ui.goddoor.JiangliUI));
    game.GodDoorJiangliView = GodDoorJiangliView;
})(game || (game = {}));
