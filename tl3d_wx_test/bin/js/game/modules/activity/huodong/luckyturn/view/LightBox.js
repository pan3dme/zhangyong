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
var game;
(function (game) {
    var LightBox = /** @class */ (function (_super) {
        __extends(LightBox, _super);
        function LightBox(arrpos) {
            var _this = _super.call(this) || this;
            _this._cir = 0;
            _this.offposX = -5;
            _this.offposY = -6;
            _this._endIdx = 0;
            _this._posIdx = 0;
            _this._randIdx = 0;
            _this._speed = 300;
            _this._startIdx = 0;
            _this._endCir = false;
            _this.visible = false;
            _this._arrpos = arrpos;
            _this.sizeGrid = "20,20,20,20";
            _this.skin = SkinUtil.box_xuanzhong;
            _this._originalSize = { width: 105, height: 105 };
            return _this;
        }
        Object.defineProperty(LightBox.prototype, "arrpos", {
            set: function (value) { this._arrpos = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBox.prototype, "bigSize", {
            set: function (value) { this._isSize = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBox.prototype, "smallSize", {
            set: function (value) { this._originalSize = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBox.prototype, "endIndex", {
            set: function (value) {
                this._endIdx = value;
                this._randIdx = value + 2;
                if (this._randIdx > this._arrpos.length - 1) {
                    this._randIdx = this._randIdx + 1 - this._arrpos.length;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBox.prototype, "posindex", {
            get: function () { return this._posIdx; },
            set: function (value) {
                this._posIdx = value;
                if (this._posIdx > this._arrpos.length - 1)
                    this._posIdx = 0;
                if (this._posIdx === this._startIdx)
                    this._cir++;
                if (this._cir >= 3 && this._posIdx == this._randIdx) {
                    this._endCir = true;
                }
                this.setSize();
                this.setSpeed();
                this.setPosition();
            },
            enumerable: true,
            configurable: true
        });
        LightBox.prototype.setPosition = function () {
            this.pos(this._arrpos[this._posIdx][0] + this.offposX, this._arrpos[this._posIdx][1] + this.offposY);
        };
        LightBox.prototype.setSize = function () {
            var size = this._isSize && this._posIdx % 3 == 0 ? this._isSize : this._originalSize;
            this.size(size.width, size.height);
        };
        LightBox.prototype.setSpeed = function () {
            if (!this._endCir)
                this._speed = this._speed < 60 ? 60 : this._speed -= 80;
            else
                this._speed = this._speed += 50;
        };
        LightBox.prototype.isEnd = function () {
            if (this._endCir && this._cir >= 3 && this._posIdx == this._endIdx) {
                Laya.timer.once(500, this, this.stopIt);
                Dialog.manager.mouseEnabled = true;
                return true;
            }
            return false;
        };
        LightBox.prototype.stopIt = function () {
            if (this._msg != "") {
                showToast(this._msg);
            }
            else {
                this._callback();
                App.hero.refreshData(this._data);
                if (this._data.items) {
                    UIMgr.showUI(UIConst.TurnRewardView, this._data.items);
                }
                else {
                    UIUtil.showRewardView(this._data.items ? this._data.items : this._data.commonData);
                }
            }
        };
        /**
         * 光效开始转动
         * @param data 服务端返回数据
         * @param msg 服务端返回msg
         * @param index	最终停的位置
         * @param callback 回调
         */
        LightBox.prototype.startTurn = function (data, msg, index, callback) {
            this.posindex = this._posIdx;
            this._cir = 0;
            this._msg = msg;
            this._data = data;
            this._speed = 450;
            this.endIndex = index;
            this._callback = callback;
            this._startIdx = this._posIdx;
            if (!this.visible)
                this.visible = true;
            Laya.timer.once(this._speed, this, this.startAction);
            Dialog.manager.mouseEnabled = this._endCir = false;
        };
        /**转圈 */
        LightBox.prototype.startAction = function () {
            this.posindex = this._posIdx + 1;
            AudioMgr.playSound("sound/xuyuan.mp3");
            if (!this.isEnd())
                Laya.timer.once(this._speed, this, this.startAction);
        };
        return LightBox;
    }(Laya.Image));
    game.LightBox = LightBox;
})(game || (game = {}));
