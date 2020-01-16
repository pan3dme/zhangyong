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
    var BagIR = /** @class */ (function (_super) {
        __extends(BagIR, _super);
        function BagIR() {
            var _this = _super.call(this) || this;
            _this.list_lineitem.mouseHandler = new Handler(_this, _this.clickAchi);
            return _this;
        }
        Object.defineProperty(BagIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        BagIR.prototype.refreshData = function () {
            if (this._dataSource) {
                var i = this._dataSource[0].bag ? 6 : 7;
                var ary = this._dataSource;
                var curline = Math.floor(ary[0].indexid / i); //当前行
                var selectline = ary[0].selectid == -1 ? -1 : Math.floor(ary[0].selectid / i); //选中行
                if (curline == selectline) {
                    var selectvo = void 0;
                    for (var j = 0; j < ary.length; j++) {
                        if (ary[j].indexid == ary[j].selectid)
                            selectvo = ary[j];
                    }
                    logdebug(selectvo);
                    this.onShow(selectvo);
                }
                else {
                    this.onHide();
                }
                this.list_lineitem.array = ary;
            }
            else {
                this.onHide();
                this.list_lineitem.array = null;
            }
        };
        BagIR.prototype.updataItem = function ($idx) {
            var sitem = this.list_lineitem.array[$idx];
            this.list_lineitem.setItem($idx, sitem);
            if (this.isShow()) {
                var vo = this.ui_detail.dataSource;
                if (vo.id == sitem.id) {
                    this.ui_detail.dataSource = sitem;
                }
            }
        };
        /** 点击打开详细成就介绍 */
        BagIR.prototype.clickAchi = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                this.showDetail(this.list_lineitem.array[index]);
            }
        };
        BagIR.prototype.showDetail = function (itemVo) {
            dispatchEvt(new common.TreeEvent(common.TreeEvent.SELECT_TAB, itemVo));
        };
        /** 展开子任务 */
        BagIR.prototype.onShow = function ($data) {
            this.ui_detail.visible = true;
            this.ui_detail.dataSource = $data;
            this.height = 360;
            // this.ui_detail.btn_buttons.x = $data.bag? 375:430;
            this.ui_detail.img_di.width = $data.bag ? 590 : 620;
        };
        /** 隐藏子任务 */
        BagIR.prototype.onHide = function () {
            this.ui_detail.visible = false;
            this.ui_detail.dataSource = null;
            this.height = 115;
        };
        /** 是否是展开的 */
        BagIR.prototype.isShow = function () {
            return this.ui_detail.visible;
        };
        return BagIR;
    }(ui.bag.ItemRenderUI));
    game.BagIR = BagIR;
})(game || (game = {}));
