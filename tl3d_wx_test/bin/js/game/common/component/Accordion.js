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
    /**
     * 可折叠列表
    */
    var Accordion = /** @class */ (function (_super) {
        __extends(Accordion, _super);
        function Accordion(width, height) {
            var _this = _super.call(this, width, height, null) || this;
            _this.useInitBuff = false;
            return _this;
        }
        Accordion.prototype.onCreate = function () {
            this.isAutoScroll = false;
            _super.prototype.onCreate.call(this);
            tl3d.ModuleEventManager.addEvent(TreeEvent.SELECT_TAB, this.onSelect, this);
        };
        /** 选中标签展开内容
         * 点击对象的name需要设置为clickTarget，并且事件类型为Click点击
         * 选中的这一项，如果是已展开的，则隐藏，否则展开内容
         * 未选中的执行onHide方法
        */
        Accordion.prototype.onSelect = function (event) {
            var itemRender = event.data;
            for (var i = 0, len = this._items.length; i < len; i++) {
                var box = this._items[i];
                if (box == itemRender) {
                    if (box['isShow'] && box['isShow']()) {
                        if (box['onHide']) {
                            box['onHide']();
                        }
                        break;
                    }
                    if (box['onShow']) {
                        box['onShow'](event.data);
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
        Accordion.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            tl3d.ModuleEventManager.removeEvent(TreeEvent.SELECT_TAB, this.onSelect, this);
        };
        return Accordion;
    }(common.BuffRenderList));
    common.Accordion = Accordion;
    var TreeEvent = /** @class */ (function (_super) {
        __extends(TreeEvent, _super);
        function TreeEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        TreeEvent.SELECT_TAB = 'TREE_SELECT_TAB';
        return TreeEvent;
    }(tl3d.BaseEvent));
    common.TreeEvent = TreeEvent;
})(common || (common = {}));
