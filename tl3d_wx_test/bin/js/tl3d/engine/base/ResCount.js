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
var tl3d;
(function (tl3d) {
    var ResCount = /** @class */ (function (_super) {
        __extends(ResCount, _super);
        function ResCount() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._useNum = 0;
            _this.idleTime = 0;
            return _this;
        }
        Object.defineProperty(ResCount.prototype, "useNum", {
            get: function () {
                return this._useNum;
            },
            set: function (n) {
                this._useNum = n;
                // console.log("*设置引用计数：",this._useNum);
                if (this._useNum == 0) {
                    this.idleTime = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        ResCount.prototype.clearUseNum = function () {
            this._useNum--;
            // console.log("-减少引用计数：",this._useNum);
            if (this._useNum <= 0) {
                this.idleTime = ResCount.GCTime;
                // console.log("清空引用计数等待释放：",this.idleTime);
            }
        };
        //gc四次之后才被释放
        ResCount.GCTime = 4;
        return ResCount;
    }(tl3d.GC));
    tl3d.ResCount = ResCount;
})(tl3d || (tl3d = {}));
