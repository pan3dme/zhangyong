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
     *缓冲渲染列表
     * （1）.用于单帧渲染大量项
     * （2）.用于大量数据列表第一次渲染时间较长
     * @author xy015
     *
     */
    var BuffRenderList = /** @class */ (function (_super) {
        __extends(BuffRenderList, _super);
        /**
         * 缓冲渲染列表
         * @param width  宽度
         * @param height 高度
         * @param scrollBar 滚动条
         * @param max 最大渲染数量
         * @param buffRenderSpeed  渲染速度(单帧) 不宜设置过大
         */
        function BuffRenderList(width, height, scrollBar, max, buffRenderSpeed, useInitBuff) {
            if (max === void 0) { max = 0; }
            if (buffRenderSpeed === void 0) { buffRenderSpeed = 2; }
            if (useInitBuff === void 0) { useInitBuff = true; }
            var _this = _super.call(this) || this;
            _this._itemRenderWidth = 0;
            //
            _this._isAutoScroll = false; //是否自动调转到最底部
            _this._scrollSize = 8;
            _this._offset = 0;
            /** 初始化时 是否缓存(分帧添加列表项) */
            _this._useInitBuff = true;
            /*************************** 缓冲渲染优化 ******************************/
            /**
             * 缓冲渲染列表
             */
            _this._buffList = new Array();
            /**
             *缓冲渲染列表状态
             */
            _this._buffing = false;
            /**
             * 缓冲渲染速度(单位：项/每帧)
             */
            _this._buffRenderSpeed = 2;
            _this._scrollWidth = width;
            _this._scrollHeight = height;
            // this._scrollBar = scrollBar;
            _this._max = max;
            _this._buffRenderSpeed = buffRenderSpeed;
            _this._useInitBuff = useInitBuff;
            _this.onCreate();
            return _this;
        }
        BuffRenderList.prototype.onCreate = function () {
            this._itemsParent = new Laya.Panel();
            this.addChildAt(this._itemsParent, 0);
            this._itemsParent.size(this._scrollWidth, this._scrollHeight);
            this._buffRenderList = [];
            this._items = new Array();
            this._itemsParent.vScrollBarSkin = "";
            this._scrollBar = this._itemsParent.vScrollBar;
            this._scrollBar.scrollSize = this._scrollSize;
            this._scrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange);
            this.on(Laya.Event.MOUSE_WHEEL, this, this.onMouseWheel);
        };
        BuffRenderList.prototype.stopScroll = function () {
            this._scrollBar.stopScroll();
        };
        BuffRenderList.prototype.onRemove = function () {
            this._buffRenderList.length = 0;
            this._array.length = 0;
            this.removeAll();
            // this._scrollBar.off(Laya.Event.CHANGE,this, this.onScrollBarChange);
            // this.off(Laya.Event.MOUSE_WHEEL,this, this.onMouseWheel);
        };
        /**
         *重新布局列表项的位置
         * @param item
         * @param index
         *
         */
        BuffRenderList.prototype.layoutItem = function (item, index) {
            item.y = this.sumHeight;
            item.x = 0;
            this.sumHeight += (item.height + this._spaceY);
        };
        /**
         * 重新布局所有列表项的位置
         *
         */
        BuffRenderList.prototype.layoutAllItem = function () {
            this.sumHeight = 0;
            for (var i = 0; i < this._itemCount; i++) {
                this.layoutItem(this._items[i], i);
            }
            this.onScrollBarChange();
            this.updateScrollMax();
        };
        /**
         * 更新滚动条的最大值
         *
         */
        BuffRenderList.prototype.updateScrollMax = function () {
            this.callLater(this.scrollToMax);
        };
        /**
         *更新滚动条的最大值
         */
        BuffRenderList.prototype.scrollToMax = function () {
            var maxValue = (this.sumHeight > this._scrollHeight) ? this.sumHeight - (this._spaceY + this._scrollHeight) : 0;
            var isScroll = true;
            if (this._scrollBar.value < this._scrollBar.max) {
                isScroll = false;
            }
            if (this._offset > maxValue) {
                this.offset = maxValue;
            }
            var $max = this._scrollBar.max;
            this._scrollBar.max = maxValue;
            if (this._isAutoScroll && isScroll) {
                this.setScrollBarValue(maxValue);
            }
        };
        BuffRenderList.prototype.updateScrollMaxForce = function () {
            Laya.timer.frameOnce(4, this, this.scrollToMaxForce);
        };
        /**
         *强制更新滚动条的最大值
         */
        BuffRenderList.prototype.scrollToMaxForce = function () {
            var maxValue = (this.sumHeight > this._scrollHeight) ? this.sumHeight - (this._spaceY + this._scrollHeight) : 0;
            if (this._offset > maxValue) {
                this.offset = maxValue;
            }
            this._scrollBar.max = maxValue;
            if (this._isAutoScroll) {
                this.setScrollBarValue(maxValue);
            }
        };
        Object.defineProperty(BuffRenderList.prototype, "isAutoScroll", {
            get: function () {
                return this._isAutoScroll;
            },
            /**在设置数据源时是否自动显示列表的最后一项*/
            set: function (value) {
                this._isAutoScroll = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "scrollSize", {
            /**滚动条 一次滚动的量  这里是像素值*/
            set: function (value) {
                this._scrollSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "spaceY", {
            /**Y方向项间隔*/
            get: function () {
                return this._spaceY;
            },
            set: function (value) {
                this._spaceY = value;
                this.callLater(this.layoutAllItem);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "scrollBar", {
            get: function () {
                return this._scrollBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "offset", {
            /**偏移量 坐标偏移*/
            set: function (value) {
                if (this._offset == value)
                    return;
                this._offset = value;
                this.refreshRender();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 刷新滚动的区域位置
         *
         */
        BuffRenderList.prototype.refreshRender = function () {
            this.setScrollBarValue(this._offset);
        };
        Object.defineProperty(BuffRenderList.prototype, "itemRender", {
            get: function () {
                return this._itemRender;
            },
            /** value:Class */
            set: function (value) {
                this._itemRender = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "itemRenderWidth", {
            set: function (value) {
                this._itemRenderWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BuffRenderList.prototype, "useInitBuff", {
            get: function () {
                return this._useInitBuff;
            },
            set: function (value) {
                this._useInitBuff = value;
            },
            enumerable: true,
            configurable: true
        });
        BuffRenderList.prototype.setScrollChangeHandler = function (handler, context) {
            this._scrollChangeHandler = handler;
            this._scrollChangeHandlerContext = context;
        };
        BuffRenderList.prototype.onScrollBarChange = function () {
            var value = Math.round(this._scrollBar.value);
            for (var i = 0; i < this._items.length; i++) {
                var element = this._items[i];
                this.setItemVisiable(element);
            }
            if (value != this._offset) {
                this.offset = value;
            }
        };
        /**
         * 渲染优化，如果不在可视区域内，则隐藏
         * @param item
         */
        BuffRenderList.prototype.setItemVisiable = function (item) {
            var value = Math.round(this._scrollBar.value);
            var maxvalue = this._scrollHeight + value;
            if (item.y >= value && item.y <= maxvalue) {
                if (!item.visible) {
                    item.visible = true;
                }
            }
            else {
                if (item.y > value) {
                    if (item.visible) {
                        item.visible = false;
                    }
                }
                else {
                    var posy = value - item.y;
                    if (posy < item.height) {
                        if (!item.visible) {
                            item.visible = true;
                        }
                    }
                    else {
                        if (item.visible) {
                            item.visible = false;
                        }
                    }
                }
            }
        };
        BuffRenderList.prototype.onMouseWheel = function (e) {
            var value = this._scrollBar.value - (e.delta / Math.abs(e.delta)) * this._scrollSize;
            this.setScrollBarValue(value);
        };
        BuffRenderList.prototype.setScrollBarValue = function (value) {
            if (this._scrollChangeHandler) {
                this._scrollChangeHandler.apply(this._scrollChangeHandlerContext, [value, (value >= this._scrollBar.value ? true : false)]);
            }
            this._scrollBar.value = value;
        };
        BuffRenderList.prototype.scrollBarTo = function (value) {
            Laya.timer.frameOnce(2, this, this.setScrollBarValue, [value]);
        };
        Object.defineProperty(BuffRenderList.prototype, "dataSource", {
            get: function () {
                return this._array;
            },
            /**
             *设置渲染数据源
             * @param value
             */
            set: function (value) {
                this.removeAll();
                this._array = value || [];
                this.callLater(this.initItems);
            },
            enumerable: true,
            configurable: true
        });
        /**
         *初始化项
         *
         */
        BuffRenderList.prototype.initItems = function () {
            this.sumHeight = 0;
            var len = this._array.length;
            for (var i = 0; i < len; i++) {
                if (this._useInitBuff) { //缓冲初始
                    this.addItem(this._array[i]);
                }
                else {
                    this.addItemAt(this._array[i], i);
                }
            }
        };
        /*************************** 自动匹配内容差异优化 ******************************/
        BuffRenderList.prototype.compearArry = function (list) {
            var len = list.length;
            for (var i = len - 1; i >= 0; i--) {
                if (this._array.indexOf(list[i]) == -1)
                    continue;
                else
                    return i;
            }
            return len;
        };
        /**
         * @param list
         */
        BuffRenderList.prototype.inster = function (list) {
            var len = list.length;
            var tempIndex = this._itemCount;
            if (len == this._max)
                tempIndex = Math.min(this.compearArry(list), this._itemCount);
            for (var i = this._itemCount; i != len; i++) {
                this.addItemAt(list[i], i);
            }
        };
        /**
         *开始渲染缓冲列表
         *
         */
        BuffRenderList.prototype.beginBuffRender = function () {
            if (!this._buffing && this._buffList.length > 0) {
                this._buffing = true;
                Laya.timer.frameLoop(2, this, this.exeBuffRender);
            }
        };
        /**
         *渲染缓冲列表
         *
         */
        BuffRenderList.prototype.exeBuffRender = function () {
            if (!this._buffing)
                return;
            var speed = this._buffRenderSpeed;
            while (speed > 0) {
                speed--;
                this.addItemAt(this._buffList.shift(), this._itemCount);
                if (this._buffList.length <= 0) {
                    this.stopBuffRender();
                    return;
                }
            }
        };
        /**
         *停止缓冲渲染列表
         *
         */
        BuffRenderList.prototype.stopBuffRender = function () {
            this._buffing = false;
            Laya.timer.clear(this, this.exeBuffRender);
        };
        /**
         *清除缓冲渲染列表
         *
         */
        BuffRenderList.prototype.clearBuffRender = function () {
            this.stopBuffRender();
            this._buffList.splice(0, this._buffList.length);
        };
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        /**
         * 创建一个列表项 如果缓存列表里还有就从缓存列表里取 如果没有就重新创建一个
         * @return
         *
         */
        BuffRenderList.prototype.createItem = function () {
            var item;
            if (this._buffRenderList.length) {
                item = this._buffRenderList.pop();
            }
            else if (this._itemRender) {
                item = new this._itemRender();
            }
            if (item) {
                this._itemsParent.addChild(item);
                if (this._itemRenderWidth > 0) {
                    item.width = this._itemRenderWidth;
                }
            }
            item.y = this.sumHeight;
            item.x = 0;
            return item;
        };
        /**
         *移除所有项
         */
        BuffRenderList.prototype.removeAll = function () {
            while (this._itemCount > 0) {
                this.removeItemAt(0);
            }
            this.clearBuffRender();
            this.scrollBar.value = 0;
            this.scrollBar.max = 0;
            this.sumHeight = 0;
        };
        /**
         *
         * @param itemData
         *
         */
        BuffRenderList.prototype.removeItem = function (itemData) {
            var index = this._array.indexOf(itemData);
            if (index != -1)
                this.removeItemAt(index);
            else //查找是否在缓冲列表
                this._buffRenderList.splice(this._buffRenderList.indexOf(itemData), 1);
        };
        /**
         *删除列表项  并放入缓存列表里
         * @param index
         *
         */
        BuffRenderList.prototype.removeItemAt = function (index) {
            var item = this._items[index];
            if (item) {
                this._items.splice(index, 1);
                item.removeSelf();
                item.dataSource = null;
                this._buffRenderList.push(item);
                this._itemCount = this._items.length;
            }
        };
        /**
         * 添加项
         * @param itemData
         */
        BuffRenderList.prototype.addItem = function (itemData) {
            this._buffList.push(itemData);
            this.beginBuffRender();
        };
        /**
         *添加项到指定位置
         */
        BuffRenderList.prototype.addItemAt = function (itemData, index) {
            var layout = false;
            //如果列表已经达到最大值
            if (this._max > 0 && this._itemCount >= this._max) {
                this.removeItemAt(0);
                layout = true;
            }
            var value = Math.round(this._scrollBar.value);
            var item = this.createItem();
            item.dataSource = itemData;
            this.sumHeight += (item.height + this._spaceY);
            this.setItemVisiable(item);
            this._items.splice(index, 0, item);
            this._itemCount = this._items.length;
            if (layout) {
                this.callLater(this.layoutAllItem);
            }
            else {
                this.updateScrollMax();
            }
        };
        Object.defineProperty(BuffRenderList.prototype, "cells", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        BuffRenderList.prototype.getCell = function ($index) {
            return this._items[$index];
        };
        return BuffRenderList;
    }(Laya.Component));
    common.BuffRenderList = BuffRenderList;
})(common || (common = {}));
