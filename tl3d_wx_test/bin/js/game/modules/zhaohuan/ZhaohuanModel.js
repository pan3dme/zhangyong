/*
* name;
*/
var game;
(function (game) {
    var ZhaohuanModel = /** @class */ (function () {
        function ZhaohuanModel() {
            this.curObj = { isOne: false, type: -1 };
            /** 跳过动画 */
            this._jumpAni = false;
        }
        ZhaohuanModel.getInstance = function () {
            if (!ZhaohuanModel._instance) {
                ZhaohuanModel._instance = new ZhaohuanModel();
            }
            return ZhaohuanModel._instance;
        };
        Object.defineProperty(ZhaohuanModel.prototype, "jumpAni", {
            get: function () {
                return this._jumpAni;
            },
            set: function ($value) {
                this._jumpAni = $value;
            },
            enumerable: true,
            configurable: true
        });
        return ZhaohuanModel;
    }());
    game.ZhaohuanModel = ZhaohuanModel;
})(game || (game = {}));
