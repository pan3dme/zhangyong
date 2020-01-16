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
var common;
(function (common) {
    var GodStarInfo = /** @class */ (function (_super) {
        __extends(GodStarInfo, _super);
        function GodStarInfo() {
            var _this = _super.call(this) || this;
            _this._starNum = 0;
            _this._starWidth = 0;
            _this._showNum = 0;
            _this._starLv = 0;
            _this._starAlign = 0;
            _this._allStar = [];
            for (var i = 0; i < 10; i++) {
                var img = _this.getChildByName("img_star_" + i);
                if (!img) {
                    break;
                }
                img.visible = false;
                _this._allStar[i] = img;
            }
            _this._starNum = _this._allStar.length;
            _this._starWidth = _this.width / _this._starNum;
            _this.starAlign = GodStarInfo.STAR_ALIGN_CENTER;
            return _this;
        }
        Object.defineProperty(GodStarInfo.prototype, "starLevel", {
            get: function () {
                return this._starLv;
            },
            set: function (val) {
                if (val < 0)
                    val = 0;
                if (this._starLv == val)
                    return;
                this._starLv = val;
                var skin = val > this._starNum ? "comp/image/juexing_xingji.png" : "comp/image/xinxi_xingji.png";
                this._showNum = (val - 1) % this._starNum + 1;
                for (var i = 0; i < this._starNum; i++) {
                    if (i < this._showNum) {
                        //显示
                        this._allStar[i].visible = true;
                        this._allStar[i].skin = skin;
                    }
                    else {
                        this._allStar[i].visible = false;
                    }
                }
                this.layoutStar();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodStarInfo.prototype, "starAlign", {
            get: function () {
                return this._starAlign;
            },
            set: function (val) {
                if (this._starAlign == val)
                    return;
                this._starAlign = val;
                this.layoutStar();
            },
            enumerable: true,
            configurable: true
        });
        GodStarInfo.prototype.layoutStar = function () {
            if (this._showNum <= 0)
                return;
            var showWidth = this._starWidth * this._showNum;
            var startPosx = 0;
            switch (this._starAlign) {
                case GodStarInfo.STAR_ALIGN_CENTER:
                    startPosx = (this.width - showWidth) / 2;
                    break;
                case GodStarInfo.STAR_ALIGN_RIGHT:
                    startPosx = this.width - showWidth;
                    break;
            }
            for (var i = 0; i < this._showNum; i++) {
                var starImg = this._allStar[i];
                starImg.x = startPosx + i * this._starWidth;
            }
        };
        //获取显示的星星总宽度
        GodStarInfo.prototype.getTotalStarWidth = function () {
            return this._showNum * this._starWidth;
        };
        //布局
        GodStarInfo.STAR_ALIGN_LEFT = 0;
        GodStarInfo.STAR_ALIGN_CENTER = 1;
        GodStarInfo.STAR_ALIGN_RIGHT = 2;
        return GodStarInfo;
    }(ui.component.GodStarInfoUI));
    common.GodStarInfo = GodStarInfo;
})(common || (common = {}));
