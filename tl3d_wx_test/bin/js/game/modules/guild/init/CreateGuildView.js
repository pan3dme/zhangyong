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
    var CreateGuildView = /** @class */ (function (_super) {
        __extends(CreateGuildView, _super);
        function CreateGuildView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this._model = game.GuildModel.getInstance();
            return _this;
        }
        CreateGuildView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CreateGuildView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CreateGuildView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.btn_red.off(Laya.Event.CLICK, this, this.redlevel);
            this.btn_add.off(Laya.Event.CLICK, this, this.addlevel);
            this.btn_create.off(Laya.Event.CLICK, this, this.create);
            this.lab_level.off(Laya.Event.INPUT, this, this.onput);
            this.img_icon.off(Laya.Event.CLICK, this, this.changeIcon);
            this.btn_seticon.off(Laya.Event.CLICK, this, this.changeIcon);
        };
        CreateGuildView.prototype.initView = function () {
            this.btn_red.on(Laya.Event.CLICK, this, this.redlevel);
            this.btn_add.on(Laya.Event.CLICK, this, this.addlevel);
            this.btn_create.on(Laya.Event.CLICK, this, this.create);
            this.lab_level.on(Laya.Event.INPUT, this, this.onput);
            this.img_icon.on(Laya.Event.CLICK, this, this.changeIcon);
            this.btn_seticon.on(Laya.Event.CLICK, this, this.changeIcon);
            var model = this._model;
            this.img_icon.skin = model.createInitIconID ? SkinUtil.getGuildHeadIconById(model.createInitIconID) : SkinUtil.getGuildHeadIconById(1);
            this.lab_diamonds.text = "x" + tb.TB_guild_set.getSet().create_cost[1];
            this.bgPanel.dataSource = { uiName: UIConst.CreateGuildView, closeOnSide: this.isModelClose, title: "创建公会" };
            var needVip = tb.TB_guild_set.getSet().create_viplevel;
            this.lbVip.text = "VIP" + needVip + "\u53EF\u521B\u5EFA\u516C\u4F1A";
            this.lbVip.color = App.hero.vip >= needVip ? ColorConst.GREEN : ColorConst.RED;
        };
        CreateGuildView.prototype.onput = function () {
            this.btn_red.disabled = Number(this.lab_level.text) == 1;
            this.btn_add.disabled = Number(this.lab_level.text) == 50;
            this.lab_level.text = Math.min(50, Number(this.lab_level.text)).toString();
            this.lab_level.text = Math.max(1, Number(this.lab_level.text)).toString();
        };
        CreateGuildView.prototype.redlevel = function () {
            this.lab_level.text = Math.max(1, Number(this.lab_level.text) - 1).toString();
        };
        CreateGuildView.prototype.addlevel = function () {
            this.lab_level.text = Math.min(50, Number(this.lab_level.text) + 1).toString();
        };
        CreateGuildView.prototype.create = function () {
            var info = { name: this.are_putin.text, level: parseInt(this.lab_level.text), auto: this.chk_auto.selected, head: this._model.createInitIconID };
            dispatchEvt(new game.GuildEvent(game.GuildEvent.CREATE_GUILD, info));
        };
        CreateGuildView.prototype.changeIcon = function () {
            var model = this._model;
            var dataSource = { type: game.GuildIconChangeType.createChange, iconId: model.createInitIconID, list_icon: model.getIconList() };
            dispatchEvt(new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_ICON), dataSource);
        };
        CreateGuildView.prototype.changeIconSuccess = function (iconVo) {
            this.img_icon.skin = SkinUtil.getGuildHeadIcon(iconVo.tbHead.icon);
            this._model.createInitIconID = iconVo.tbHead.ID;
        };
        return CreateGuildView;
    }(ui.guild.init.CreateGuildUI));
    game.CreateGuildView = CreateGuildView;
})(game || (game = {}));
