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
    var GuildinitView = /** @class */ (function (_super) {
        __extends(GuildinitView, _super);
        function GuildinitView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.GuildinitView, closeOnSide: _this.isModelClose, title: "创建公会" };
            _this._model = game.GuildModel.getInstance();
            return _this;
        }
        GuildinitView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildinitView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildinitView.prototype.initView = function () {
            this.btn_lookup.on(Laya.Event.CLICK, this, this.lookUp);
            this.btn_create.on(Laya.Event.CLICK, this, this.createGuild);
            this.btn_update.on(Laya.Event.CLICK, this, this.onRefresh);
            this.list_guild.array = this._model.getGuildList();
            this.requestGuildList();
        };
        GuildinitView.prototype.requestGuildList = function () {
            var _this = this;
            this._model.requestGuildList().then(function () {
                _this.refreshList();
            });
        };
        GuildinitView.prototype.refreshList = function () {
            var glist = this._model.getGuildList();
            this.list_guild.array = glist;
            this.img_side.visible = glist.length >= 7;
        };
        GuildinitView.prototype.onRefresh = function () {
            var _this = this;
            this._model.requestGuildList().then(function () {
                _this.refreshList();
            });
        };
        /**搜索公会 */
        GuildinitView.prototype.lookUp = function () {
            var _this = this;
            if (this.are_putin.text == "") {
                showToast(LanMgr.getLan('', 10160));
                return;
            }
            var arg = {};
            arg[Protocol.guild_guild_find.args.name] = this.are_putin.text;
            PLC.request(Protocol.guild_guild_find, arg, function ($data, msg) {
                if (!$data)
                    return;
                _this.list_guild.array = $data.findList;
            });
        };
        /**创建公会 */
        GuildinitView.prototype.createGuild = function () {
            UIMgr.showUI(UIConst.CreateGuildView);
        };
        /**退出 */
        GuildinitView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.list_guild.array = null;
            this.btn_lookup.off(Laya.Event.CLICK, this, this.lookUp);
            this.btn_create.off(Laya.Event.CLICK, this, this.createGuild);
            this.btn_update.off(Laya.Event.CLICK, this, this.onRefresh);
        };
        return GuildinitView;
    }(ui.guild.init.GuildinitUI));
    game.GuildinitView = GuildinitView;
})(game || (game = {}));
