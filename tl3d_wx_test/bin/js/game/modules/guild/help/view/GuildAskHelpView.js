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
    var GuildAskHelpView = /** @class */ (function (_super) {
        __extends(GuildAskHelpView, _super);
        function GuildAskHelpView() {
            return _super.call(this) || this;
        }
        GuildAskHelpView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GuildHelpModel.getInstance();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "求 援" };
            this.listItem.selectedIndex = -1;
            this.listItem.mouseHandler = new Handler(this, this.onMouse);
            this.listItem.renderHandler = new Handler(this, this.onRender);
            this.checkBox.selected = true;
            this.btnSure.on(Laya.Event.CLICK, this, this.onSure);
        };
        GuildAskHelpView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
            this.listItem.array = tb.TB_guild_help.getList();
        };
        GuildAskHelpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listItem.cells.forEach(function (cellBox, cellIdx) {
                var img = cellBox.getChildByName("imgGouxuan");
                img.visible = false;
            });
            this.listItem.array = null;
            this._selectInfo = null;
        };
        GuildAskHelpView.prototype.initView = function () {
            this.listItem.selectedIndex = -1;
        };
        GuildAskHelpView.prototype.onMouse = function (evt, index) {
            var _this = this;
            if (index == -1)
                return;
            if (evt.type == Laya.Event.CLICK) {
                var cell = this.listItem.getCell(index);
                if (cell.gray) {
                    showToast(LanMgr.getLan('', 10417));
                    return;
                }
                var imgGouxuan = cell.getChildByName("imgGouxuan");
                if (imgGouxuan.visible) {
                    imgGouxuan.visible = false;
                    this._selectInfo = null;
                }
                else {
                    this.listItem.cells.forEach(function (cellBox, cellIdx) {
                        var img = cellBox.getChildByName("imgGouxuan");
                        img.visible = cellIdx == index;
                        if (cellIdx == index) {
                            _this._selectInfo = cellBox.dataSource;
                        }
                    });
                }
            }
        };
        GuildAskHelpView.prototype.onRender = function (cell, index) {
            var itemBox = cell.getChildByName("itemBox");
            var imgGouxuan = cell.getChildByName("imgGouxuan");
            var info = cell.dataSource;
            if (info) {
                var isExist = game.GuildHelpModel.getInstance().isExistHelp(info.ID);
                cell.gray = isExist;
                itemBox.dataSource = info.getRewardList()[0];
            }
            else {
                itemBox.dataSource = null;
                imgGouxuan.visible = false;
            }
        };
        GuildAskHelpView.prototype.onSure = function () {
            if (!this._selectInfo) {
                showToast(LanMgr.getLan('', 10420));
                return;
            }
            var info = this.dataSource;
            if (info) {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SEND_ASK_HELP), [info.pos, this._selectInfo, this.checkBox.selected]);
            }
        };
        return GuildAskHelpView;
    }(ui.guild.help.AskHelpViewUI));
    game.GuildAskHelpView = GuildAskHelpView;
})(game || (game = {}));
