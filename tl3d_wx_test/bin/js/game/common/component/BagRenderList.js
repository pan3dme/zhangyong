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
var common;
(function (common) {
    var BagRenderList = /** @class */ (function (_super) {
        __extends(BagRenderList, _super);
        function BagRenderList(width, height) {
            var _this = _super.call(this, width, height) || this;
            _this.useInitBuff = true;
            return _this;
        }
        /** 选中标签展开内容
         * 点击对象的name需要设置为clickTarget，并且事件类型为Click点击
         * 如果选中了同一个则关闭，如果选择了同一行且不是同一个，则切换数据源，如果选择其他行，则先关闭再打开其他行
        */
        BagRenderList.prototype.onSelect = function (event) {
            //该次点击的选中项
            var selectVo = event.data;
            if (!selectVo)
                return;
            //新选中id -1为不选中任何
            var nselect = selectVo.selectid == selectVo.indexid ? -1 : selectVo.indexid;
            for (var i = 0, len = this._items.length; i < len; i++) {
                var box = this._items[i];
                //给一行数据源修改选中标识
                for (var k = 0; k < box.dataSource.length; k++) {
                    box.dataSource[k].selectid = nselect;
                }
                //刷新列表
                if (box instanceof game.BagIR)
                    box.list_lineitem.refresh();
                //执行弹出或者关闭逻辑。如果只是切换数据源，也是重新执行该方法。
                if (nselect != -1) {
                    var line = Math.floor(nselect / game.BagModel.line_num);
                    if (line == i) {
                        if (box['onShow']) {
                            box['onShow'](selectVo);
                        }
                    }
                    else {
                        if (box['isShow'] && box['isShow']()) {
                            if (box['onHide']) {
                                box['onHide']();
                            }
                        }
                    }
                }
                else {
                    if (box['onHide']) {
                        box['onHide']();
                    }
                }
            }
            this.layoutAllItem();
        };
        return BagRenderList;
    }(common.Accordion));
    common.BagRenderList = BagRenderList;
})(common || (common = {}));
