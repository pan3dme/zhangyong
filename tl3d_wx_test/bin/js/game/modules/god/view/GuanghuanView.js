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
    var GuanghuanView = /** @class */ (function (_super) {
        __extends(GuanghuanView, _super);
        function GuanghuanView() {
            return _super.call(this) || this;
        }
        GuanghuanView.prototype.initView = function (type, posAry) {
            this._posAry = posAry;
            this.imgBg.skin = type == 0 ? SkinUtil.wofang_guanghuan : SkinUtil.difang_guanghuan;
            var _loop_1 = function (i) {
                var img = this_1["img" + i];
                if (!img)
                    return "continue";
                var race = posAry[i] || 0;
                img.visible = race > 0;
                if (race > 0) {
                    img.skin = SkinUtil.getGodRaceSkin(race);
                    var num = posAry.filter(function (posRace) {
                        return posRace == race;
                    }).length;
                    img.gray = !game.GodUtils.isActiveHalo(race, num);
                }
            };
            var this_1 = this;
            for (var i = 0; i < 6; i++) {
                _loop_1(i);
            }
            this.on(Laya.Event.CLICK, this, this.onShow);
        };
        GuanghuanView.prototype.onShow = function () {
            var obj = {};
            if (this._posAry) {
                for (var _i = 0, _a = this._posAry; _i < _a.length; _i++) {
                    var race = _a[_i];
                    obj[race] = obj[race] || 0;
                    obj[race] += 1;
                }
            }
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_KEZHI_VIEW), obj);
        };
        GuanghuanView.prototype.onExit = function () {
            this._posAry = null;
            this.off(Laya.Event.CLICK, this, this.onShow);
        };
        return GuanghuanView;
    }(ui.god.GuanghuanUI));
    game.GuanghuanView = GuanghuanView;
})(game || (game = {}));
