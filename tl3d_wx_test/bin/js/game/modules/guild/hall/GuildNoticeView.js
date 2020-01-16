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
    var GuildNoticeView = /** @class */ (function (_super) {
        __extends(GuildNoticeView, _super);
        function GuildNoticeView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GuildNoticeView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildNoticeView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildNoticeView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.GuildNoticeView, closeOnSide: this.isModelClose, title: "公告" };
            this.btn_sure.on(Laya.Event.CLICK, this, this.onSure);
            this.btn_cancel.on(Laya.Event.CLICK, this, this.onExit);
            this.are_putin.on(Laya.Event.INPUT, this, this.onPutText);
            this.are_putin.text = this.dataSource || "";
        };
        GuildNoticeView.prototype.onPutText = function () {
            this.label_residuetext.text = LanMgr.getLan("可输入文字：{0}", -1, Math.max(0, (60 - this.are_putin.text.length)));
        };
        GuildNoticeView.prototype.onSure = function () {
            var text = this.are_putin.text;
            if (!text || text == "") {
                return;
            }
            dispatchEvt(new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_NOTICE, text));
        };
        GuildNoticeView.prototype.onExit = function () {
            UIMgr.hideUIByName(UIConst.GuildNoticeView);
        };
        GuildNoticeView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.btn_sure.off(Laya.Event.CLICK, this, this.onSure);
            this.btn_cancel.off(Laya.Event.CLICK, this, this.onExit);
            this.are_putin.off(Laya.Event.INPUT, this, this.onPutText);
        };
        return GuildNoticeView;
    }(ui.guild.hall.GuildNoticeUI));
    game.GuildNoticeView = GuildNoticeView;
})(game || (game = {}));
