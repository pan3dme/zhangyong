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
    var StarList = /** @class */ (function (_super) {
        __extends(StarList, _super);
        function StarList() {
            var _this = _super.call(this) || this;
            _this._num = 0;
            _this._starList = [];
            for (var i = 0; i < 5; i++) {
                _this._starList[i] = _this["img_" + i];
            }
            _this.setStarNum(0, true);
            return _this;
        }
        StarList.prototype.setStarNum = function (num, force, spacex) {
            if (force === void 0) { force = false; }
            if (spacex === void 0) { spacex = 0; }
            if (num < 0)
                num = 0;
            if (this._num == num && !force)
                return;
            this._num = num;
            if (this._num == 0) {
                this.visible = false;
            }
            else {
                this.visible = true;
                if (this._starList) {
                    var len = this._starList.length;
                    var shownum = this._num % len;
                    if (shownum == 0)
                        shownum = len;
                    for (var i = 0; i < len; i++) {
                        var img = this._starList[i];
                        if (i < shownum) {
                            img.visible = true;
                            img.skin = num > len ? "comp/image/juexing_xingji.png" : "comp/image/xinxi_xingji.png";
                        }
                        else {
                            img.visible = false;
                        }
                    }
                    //布局
                    var totalW = StarList.STAR_WIDTH * shownum + (shownum - 1) * spacex;
                    var posx = (this.width - totalW + StarList.STAR_WIDTH) / 2;
                    for (var i = 0; i < shownum; i++) {
                        var img = this._starList[i];
                        img.x = posx;
                        posx += StarList.STAR_WIDTH + spacex;
                    }
                }
            }
        };
        StarList.STAR_WIDTH = 28;
        return StarList;
    }(ui.component.StarListUI));
    common.StarList = StarList;
})(common || (common = {}));
