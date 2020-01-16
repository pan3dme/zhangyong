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
    var gloryFightPlayerIR = /** @class */ (function (_super) {
        __extends(gloryFightPlayerIR, _super);
        function gloryFightPlayerIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(gloryFightPlayerIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        gloryFightPlayerIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = info.headVo;
                this.lbForce.text = LanMgr.getLan("", 10117, info.force);
                this.lbName.text = info.name;
                this.headBox.on(Laya.Event.CLICK, this, this.onShowLineup);
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.onShowLineup);
            }
        };
        gloryFightPlayerIR.prototype.onShowLineup = function () {
            var info = this.dataSource;
            if (info) {
                game.GloryThread.requestUserLineup(info).then(function () {
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_LINEUP_VIEW), info);
                });
            }
        };
        return gloryFightPlayerIR;
    }(ui.glory.iRender.FightPlayerIRUI));
    game.gloryFightPlayerIR = gloryFightPlayerIR;
})(game || (game = {}));
