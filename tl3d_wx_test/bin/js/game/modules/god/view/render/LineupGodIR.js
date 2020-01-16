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
    var LineupGodIR = /** @class */ (function (_super) {
        __extends(LineupGodIR, _super);
        function LineupGodIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(LineupGodIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        LineupGodIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var isExist = info.godVo ? true : false;
                var isUnlock = game.GodUtils.isUnlock(info.pos, info.userLv || App.hero.level);
                this.headBox.visible = isExist;
                this.headBox.dataSource = isExist ? info.godVo : null;
                this.box_null.visible = !isExist;
                this.btn_add.visible = !isExist && isUnlock;
                this.imgLock.visible = this.lbLock.visible = !isUnlock;
                this.lbLock.text = game.GodUtils.getUnlockLv(info.pos) + LanMgr.getLan("", 10031);
                this.headBox.img_shangzhen.visible = false;
                this.anim_select.play();
            }
            else {
                this.headBox.dataSource = null;
                this.anim_select.gotoAndStop(0);
            }
        };
        return LineupGodIR;
    }(ui.god.render.LineupGodIRUI));
    game.LineupGodIR = LineupGodIR;
})(game || (game = {}));
