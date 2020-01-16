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
    var TreasureStarAttrPreviewIR = /** @class */ (function (_super) {
        __extends(TreasureStarAttrPreviewIR, _super);
        function TreasureStarAttrPreviewIR() {
            var _this = _super.call(this) || this;
            _this.starList.renderHandler = new Handler(_this, _this.onXingjiRender);
            return _this;
        }
        Object.defineProperty(TreasureStarAttrPreviewIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        TreasureStarAttrPreviewIR.prototype.refreshData = function () {
            var info = this.dataSource ? this.dataSource[0] : null;
            var curLv = this.dataSource ? this.dataSource[1] : 0;
            if (info) {
                var starLv = info.getStarlv();
                this.lbName.text = game.TreasureUtil.getStarName(starLv);
                var num = starLv > 5 ? starLv - 5 : starLv;
                var tempStararry = new Array;
                for (var i = 0; i < num; i++) {
                    tempStararry[i] = starLv >= 6 ? true : false;
                }
                this.starList.repeatX = num;
                this.starList.array = tempStararry;
                this.lbActivity.text = curLv >= starLv ? LanMgr.getLan("", 12385) : LanMgr.getLan("", 12386);
                this.lbActivity.color = curLv >= starLv ? ColorConst.TASK_GREEN : ColorConst.normalFont;
                this.attrList.array = game.TreasureUtil.getTbAttrStrAry(info);
                this.attrList.height = this.attrList.array.length * 24 + (this.attrList.array.length - 1) * this.attrList.spaceY;
                this.height = this.attrList.y + this.attrList.height + 10;
            }
            else {
                this.starList.array = null;
                this.attrList.array = null;
            }
        };
        /**
         * 渲染星星
         */
        TreasureStarAttrPreviewIR.prototype.onXingjiRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.width = 29;
                cell.height = 31;
                cell.skin = SkinUtil.superXing;
            }
            else {
                cell.width = 26;
                cell.height = 31;
                cell.skin = SkinUtil.xingxing;
            }
        };
        return TreasureStarAttrPreviewIR;
    }(ui.god.treasure.render.StarAttrPreviewIRUI));
    game.TreasureStarAttrPreviewIR = TreasureStarAttrPreviewIR;
})(game || (game = {}));
