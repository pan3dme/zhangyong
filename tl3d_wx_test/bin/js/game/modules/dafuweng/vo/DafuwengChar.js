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
    var DafuwengChar = /** @class */ (function (_super) {
        __extends(DafuwengChar, _super);
        function DafuwengChar() {
            var _this = _super.call(this) || this;
            _this.posAry = [];
            return _this;
        }
        DafuwengChar.prototype.moveTomorepos = function (vs) {
            this.posAry = vs;
            this.goto();
        };
        DafuwengChar.prototype.set2dPos = function ($x, $y) {
            _super.prototype.set2dPos.call(this, $x, $y);
            //记录当前位置
            this.pixelPos = new tl3d.Vector2D($x, $y);
        };
        DafuwengChar.prototype.updateFrame = function (t) {
            if (this.moveToCurV2d) {
                var $dis = tl3d.Vector2D.distance(this.pixelPos, this.moveToCurV2d);
                if ($dis > 10) {
                    var $nmr = this.pixelPos.sub(this.moveToCurV2d);
                    $nmr.normalize();
                    $nmr.scaleBy(this.runspeed);
                    this.pixelPos.x += $nmr.x;
                    this.pixelPos.y += $nmr.y;
                    _super.prototype.set2dPos.call(this, this.pixelPos.x, this.pixelPos.y);
                    this.play(tl3d.CharAction.WALK);
                }
                else {
                    _super.prototype.set2dPos.call(this, this.moveToCurV2d.x, this.moveToCurV2d.y);
                    //取下一个
                    this.goto();
                }
                if (this.moveingFun) {
                    this.moveingFun(this.pixelPos);
                }
            }
            _super.prototype.updateFrame.call(this, t);
            if (!this._partDic)
                return;
            var dicAry = this._partDic["mesh"];
            for (var i = 0; dicAry && i < dicAry.length; i++) {
                if (dicAry[i].scaleX != this.scale) {
                    dicAry[i].scaleX = this.scale;
                    dicAry[i].scaleY = this.scale;
                    dicAry[i].scaleZ = this.scale;
                }
            }
        };
        DafuwengChar.prototype.goto = function () {
            this.moveToCurV2d = (this.posAry && this.posAry.length > 0) ? this.posAry.shift() : null;
            if (this.moveToCurV2d) {
                var $nmr = this.pixelPos.sub(this.moveToCurV2d);
                this.pRotationY = 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
            }
            else {
                this.play(tl3d.CharAction.STANAD);
                //移动回调
                if (this.movetocb)
                    this.movetocb();
            }
        };
        return DafuwengChar;
    }(GameUIChar));
    game.DafuwengChar = DafuwengChar;
})(game || (game = {}));
