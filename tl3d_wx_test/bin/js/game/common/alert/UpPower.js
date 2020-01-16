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
    var UpPower = /** @class */ (function (_super) {
        __extends(UpPower, _super);
        function UpPower() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = false;
            _this.mouseThrough = true;
            _this.isIgnore = true;
            return _this;
        }
        UpPower.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.updateEff();
        };
        UpPower.prototype.updateEff = function () {
            if (!this.dataSource) {
                this.close();
                return;
            }
            this.resetAll();
            this.box_changNum.visible = false;
            this._start = this.dataSource.start;
            this._end = this.dataSource.end;
            this._start = Math.round(this._start);
            this._end = Math.round(this._end);
            this.clip_power.value = String(this._start);
            var len = this.getLen();
            var nwidth = len + 68;
            this.img_bg.width = nwidth;
            this.box_changNum.x = 35 + len;
            var center = (Laya.stage.width >> 1) - (nwidth >> 1) - 32;
            this.x = center;
            this.y = (Laya.stage.height >> 1) - this.dataSource.posy;
            this.moveOk();
        };
        UpPower.prototype.getLen = function () {
            var endlen = String(this._end).length;
            var startlen = String(this._start).length;
            var len = Math.max(endlen, startlen);
            if (len == 0)
                return;
            return (29 * len) + this.clip_power.spaceX * (len - 1);
        };
        UpPower.prototype.moveOk = function () {
            var cha = 0;
            if (this._end > this._start) {
                cha = this._end - this._start;
            }
            else {
                cha = this._start - this._end;
            }
            this._num = cha / 700 * 20;
            this._num = Math.max(1, this._num);
            this.clip_power.timerLoop(20, this, this.loopFun);
        };
        UpPower.prototype.loopFun = function () {
            var curval = Number(this.clip_power.value);
            if (this._end > this._start) {
                if (this._end <= curval) {
                    this.clip_power.clearTimer(this, this.loopFun);
                    this.clip_power.value = String(this._end);
                    this.onclose();
                }
                else {
                    var cur = Math.ceil(curval + this._num);
                    this.clip_power.value = String(cur);
                }
            }
            else {
                if (this._end >= curval) {
                    this.clip_power.clearTimer(this, this.loopFun);
                    this.clip_power.value = String(this._end);
                    this.onclose();
                }
                else {
                    var cur = Math.ceil(curval - this._num);
                    this.clip_power.value = String(cur);
                }
            }
        };
        UpPower.prototype.onclose = function () {
            var _this = this;
            this.box_changNum.visible = true;
            this.box_changNum.y = 20;
            var isUp = this._end >= this._start;
            this.clip_changNum.skin = SkinUtil.getclipNum(isUp);
            this.img_changNum.skin = SkinUtil.getAddOrDec(isUp);
            var EndNum = isUp ? (this._end - this._start) : (this._start - this._end);
            EndNum = Math.round(EndNum);
            this.clip_changNum.value = String(EndNum);
            if (isUp) {
                Laya.Tween.to(this.box_changNum, { y: -14 }, 300);
                this._ticknum = setTimeout(function () {
                    _this.close();
                }, 600);
            }
            else {
                Laya.Tween.to(this.box_changNum, { y: 75 }, 300);
                this._ticknum = setTimeout(function () {
                    _this.close();
                }, 600);
            }
        };
        UpPower.prototype.resetAll = function () {
            // Laya.Tween.clearAll(this);
            this.clip_power.clearTimer(this, this.loopFun);
            clearTimeout(this._ticknum);
            Laya.Tween.clearAll(this.box_changNum);
        };
        UpPower.prototype.close = function () {
            _super.prototype.close.call(this);
            this.resetAll();
        };
        return UpPower;
    }(ui.prompt.upPowerUI));
    common.UpPower = UpPower;
})(common || (common = {}));
