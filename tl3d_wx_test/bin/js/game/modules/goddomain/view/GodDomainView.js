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
    /** 激战神域主界面 */
    var GodDomainView = /** @class */ (function (_super) {
        __extends(GodDomainView, _super);
        function GodDomainView() {
            return _super.call(this) || this;
        }
        GodDomainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GodDomainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.group = UIConst.hud_group;
            this._model = game.GodDomainModel.getInstance();
            this.uiScene = new Base2dSceneLayer();
            this.boxContent.addChild(this.uiScene);
            this.uiScene.setModelBox(this.roleBox, this.lbCoin, this.lbName);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GOD_DOMAIN);
            this.btnAdd.on(Laya.Event.CLICK, this, this.onAdd);
            this.btnCreate.on(Laya.Event.CLICK, this, this.onTeam);
            this.btnMatch.on(Laya.Event.CLICK, this, this.onMatch);
        };
        GodDomainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.uiScene.onExit();
            Laya.timer.clear(this, this.delayShow);
            this.rewardList.array = null;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateRewardCount, this);
            tl3d.ModuleEventManager.removeEvent(game.GodEvent.BUZHEN_COMPLETE, this.delayShow, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateCoin, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        GodDomainView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnSkin: SkinUtil.btn_buzhen, callback: this.onBuzhen.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onRank.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.godDomain];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            this.updateName();
            this.updateForce();
            this.lbTime.text = this._model.doubleTimeStr;
            var items = tb.TB_fight_goddomain_set.getSet().getWinReward();
            this.rewardList.array = items;
            this.rewardList.width = items.length * 90 + (items.length - 1) * this.rewardList.spaceX;
            this.uiScene.onShow();
            Laya.timer.once(200, this, this.delayShow);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateRewardCount, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.delayShow, this);
            this.updateRewardCount();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateCoin, this);
            this.updateCoin();
        };
        GodDomainView.prototype.updateName = function () {
            this.lbName.text = App.hero.name;
        };
        GodDomainView.prototype.updateForce = function () {
            this.lbForce.value = App.hero.force + "";
            this.lbForce.event(Laya.Event.RESIZE);
        };
        GodDomainView.prototype.updateCoin = function () {
            this.lbScore.text = "神域积分：" + game.GodDomainModel.getInstance().score;
            this.lbCoin.text = "神域币：" + App.hero.godDomain;
        };
        /** 更新奖励次数 */
        GodDomainView.prototype.updateRewardCount = function () {
            this.lbCount.text = "\u5956\u52B1\u6B21\u6570\uFF1A" + App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) + "\u6B21";
        };
        /** 购买次数 */
        GodDomainView.prototype.onAdd = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_BUY_VIEW));
        };
        /** 自动匹配 */
        GodDomainView.prototype.onMatch = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_AUTO_MATCH_VIEW));
        };
        GodDomainView.prototype.onRule = function (event) {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_RULE_VIEW));
        };
        GodDomainView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_KUAFU));
        };
        /** 延迟展示模型（延迟主要为了定位） */
        GodDomainView.prototype.delayShow = function () {
            var modeid = game.GodUtils.getShowGodModel(App.hero.showGodId, App.hero.showSkinId);
            var point = this.lbName.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(modeid, point.x + this.lbName.width / 2 - Launch.offsetX, point.y - 20 - Launch.offsetY, 180, 2.5);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        GodDomainView.prototype.onRank = function (event) {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_RANK_VIEW));
        };
        GodDomainView.prototype.onShop = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_SHOP_VIEW));
        };
        GodDomainView.prototype.onBuzhen = function () {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        };
        GodDomainView.prototype.onTeam = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_TEAM_LIST));
        };
        return GodDomainView;
    }(ui.goddomain.GodDomainUI));
    game.GodDomainView = GodDomainView;
})(game || (game = {}));
