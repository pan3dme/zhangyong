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
    var PingjiaIR = /** @class */ (function (_super) {
        __extends(PingjiaIR, _super);
        function PingjiaIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PingjiaIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        PingjiaIR.prototype.refresh = function () {
            var info = this.dataSource;
            if (info) {
                this.label_name.text = info.name;
                this.label_Numbers.text = info.num + "";
                this.label_godstext.text = info.content;
                this.label_godstext.event(Laya.Event.RESIZE);
                this.btn_giveup.on(Laya.Event.CLICK, this, this.onGiveup);
                this.imgBg.height = this.height = this.label_godstext.height + 65;
            }
            else {
                this.btn_giveup.off(Laya.Event.CLICK, this, this.onGiveup);
            }
        };
        /**查看评论的英雄 */
        PingjiaIR.prototype.game_god_observeGod = function () {
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_PINGLUNGOD_PANEL), this.dataSource);
        };
        /**点赞 */
        PingjiaIR.prototype.onGiveup = function () {
            var info = this.dataSource;
            if (!info)
                return;
            if (info.playerId == App.hero.playerId) {
                showToast(LanMgr.getLan('', 10468));
                return;
            }
            dispatchEvt(new game.TujianEvent(game.TujianEvent.DIANZAN), this.dataSource);
        };
        return PingjiaIR;
    }(ui.tujian.render.pingjiaIRUI));
    game.PingjiaIR = PingjiaIR;
})(game || (game = {}));
