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
    var GuildMainView = /** @class */ (function (_super) {
        __extends(GuildMainView, _super);
        function GuildMainView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            _this.uiScene = new Base2dSceneLayer();
            _this.addChild(_this.uiScene);
            _this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GONGHUI);
            return _this;
        }
        GuildMainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildMainView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildMainView.prototype.close = function (type, showEffect) {
            _super.prototype.close.call(this, type, showEffect);
            Laya.timer.clearAll(this);
            this.removeEff();
            this.boxHall.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxSkill.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxCopy.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxDonate.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxFight.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxShop.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxHelp.off(Laya.Event.CLICK, this, this.onBtnClick);
        };
        GuildMainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            UIMgr.hideUIByName(UIConst.SysTopView);
            this.anil_help.gotoAndStop(0);
        };
        GuildMainView.prototype.initView = function () {
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.guildDonate];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: null, closeCallback: this.onFanhui.bind(this) });
            this.playEff();
            this.boxHall.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxSkill.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxCopy.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxDonate.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxFight.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxShop.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxHelp.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.anil_help.play(0, true);
        };
        GuildMainView.prototype.playEff = function () {
            var _this = this;
            if (!this._particle) {
                this.uiScene.addEffect(this, 10000019, new tl3d.Vector3D(175, 0, -450), 7, 30, function ($particle) {
                    _this._particle = $particle;
                });
            }
            if (!this._particle2) {
                this.uiScene.addEffect(this, 10000018, new tl3d.Vector3D(180, 0, -460), 6.8, 30, function ($particle) {
                    _this._particle2 = $particle;
                });
            }
        };
        GuildMainView.prototype.removeEff = function () {
            if (this._particle) {
                this.uiScene.removeEffect(this._particle);
                this._particle = null;
            }
            if (this._particle2) {
                this.uiScene.removeEffect(this._particle2);
                this._particle2 = null;
            }
        };
        GuildMainView.prototype.onBtnClick = function (event) {
            var target = event.target;
            switch (target) {
                case this.boxHall:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_HALL_VIEW));
                    break;
                case this.boxSkill:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_SKILL_VIEW));
                    break;
                case this.boxCopy:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_COPY_VIEW));
                    break;
                case this.boxDonate:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_DONATION_VIEW));
                    break;
                case this.boxFight:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_BATTLE_VIEW));
                    break;
                case this.boxShop:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_SHOP_VIEW));
                    break;
                case this.boxHelp:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_HELP_VIEW));
                    break;
            }
        };
        GuildMainView.prototype.onFanhui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.RETURN_LASTVIEW, UIConst.Main3DView));
        };
        return GuildMainView;
    }(ui.guild.GuildMainUI));
    game.GuildMainView = GuildMainView;
})(game || (game = {}));
