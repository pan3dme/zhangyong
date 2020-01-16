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
    var PingjiaShuruView = /** @class */ (function (_super) {
        __extends(PingjiaShuruView, _super);
        function PingjiaShuruView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_Sure.on(Laya.Event.CLICK, _this, _this.onSure);
            _this.btn_Calloff.on(Laya.Event.CLICK, _this, _this.close);
            _this.textarea_put.on(Laya.Event.INPUT, _this, _this.onPutText);
            return _this;
        }
        PingjiaShuruView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.onPutText();
        };
        PingjiaShuruView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.textarea_put.text = "";
        };
        PingjiaShuruView.prototype.onPutText = function () {
            this.label_residuetext.text = LanMgr.getLan("", 12119, (60 - this.textarea_put.text.length));
        };
        /**确认添加评价 */
        PingjiaShuruView.prototype.onSure = function () {
            var args = {};
            if (this.textarea_put.text.length === 0) {
                showToast(LanMgr.getLan("", 10207));
                return;
            }
            args[Protocol.game_god_publishComment.args.templateId] = this.dataSource.ID;
            args[Protocol.game_god_publishComment.args.content] = this.textarea_put.text;
            dispatchEvt(new game.TujianEvent(game.TujianEvent.UPDATE_EVALUATION), args);
            this.close();
        };
        return PingjiaShuruView;
    }(ui.tujian.PingjiaShuruUI));
    game.PingjiaShuruView = PingjiaShuruView;
})(game || (game = {}));
