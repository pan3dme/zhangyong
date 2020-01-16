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
var MainChar = /** @class */ (function (_super) {
    __extends(MainChar, _super);
    function MainChar() {
        var _this = _super.call(this) || this;
        // 是否显示星级
        _this._roleStartEnable = false;
        return _this;
    }
    MainChar.prototype.getCharHeight = function () {
        return (this.py + this.tittleHeight) * this.scale;
    };
    MainChar.prototype.setNamePos = function (x, y, z) {
        if (this._charNameVo) {
            this._charNameVo.pos.x = x;
            this._charNameVo.pos.y = y;
            this._charNameVo.pos.z = z;
        }
    };
    MainChar.prototype.setroleStart = function (v, type) {
        this._roleStartVo && (this._roleStartVo.num = v);
        this._roleStartVo && (this._roleStartVo.type = type);
        // this._roleStartVo && (this._roleStartVo.offsetY = -2);
    };
    Object.defineProperty(MainChar.prototype, "roleStartEnable", {
        set: function (v) {
            this._roleStartEnable = v;
            if (!this._roleStartVo) {
                this._roleStartVo = (this._scene).bloodMgr.getStartMeshVo();
            }
        },
        enumerable: true,
        configurable: true
    });
    MainChar.prototype.removeStage = function () {
        if (this._roleStartVo) {
            this._roleStartVo.visible = false;
        }
        _super.prototype.removeStage.call(this);
    };
    MainChar.prototype.delUIConatiner = function () {
        _super.prototype.delUIConatiner.call(this);
        if (this._roleStartVo) {
            (this._scene).bloodMgr.clearStartMeshVo(this._roleStartVo);
            this._roleStartVo.destory();
            this._roleStartVo = null;
        }
    };
    MainChar.prototype.refreshPos = function () {
        // super.refreshPos();
        var posY = this.getCharHeight();
        if (this._charNameVo) {
            this._charNameVo.pos.x = this.px;
            this._charNameVo.pos.y = posY;
            this._charNameVo.pos.z = this.pz;
            this._charNameVo.visible = this.resultVisible;
            posY += 4;
        }
        if (this._roleStartVo) {
            this._roleStartVo.pos.x = this.px;
            this._roleStartVo.pos.y = posY;
            this._roleStartVo.pos.z = this.pz;
            // this._roleStartVo.visible = this.resultVisible;
        }
    };
    return MainChar;
}(FightChar));
