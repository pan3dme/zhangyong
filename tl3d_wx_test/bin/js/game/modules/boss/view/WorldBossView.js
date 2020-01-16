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
    var WorldBossView = /** @class */ (function (_super) {
        __extends(WorldBossView, _super);
        function WorldBossView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        WorldBossView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.lbName, this.roleBottom);
            this.bossList.array = null;
            this.itemList.array = null;
            this.bossList.selectedIndex = -1;
            this.bossList.selectHandler = new Handler(this, this.onSelect);
            this.bossList.renderHandler = new Handler(this, this.onBossRender);
            this.lbCount.autoSize = true;
            this.btnChallege.on(Laya.Event.CLICK, this, this.onChallenge);
            this.btnAdd.on(Laya.Event.CLICK, this, this.onAdd);
            this.lbPeople.on(Laya.Event.CLICK, this, this.onRank);
            this.btnPrev.on(Laya.Event.CLICK, this, this.onPrev);
            this.btnNext.on(Laya.Event.CLICK, this, this.onNext);
            this.btn_rotateleft.on(Laya.Event.CLICK, this, this.rotateModel, [1]);
            this.btn_rotateright.on(Laya.Event.CLICK, this, this.rotateModel, [2]);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.WORLD_BOSS);
        };
        WorldBossView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        WorldBossView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this);
            this.initView();
        };
        WorldBossView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        WorldBossView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.uiScene.onExit();
            this._curBossVo = null;
            this.bossList.array = null;
            this.bossList.selectedIndex = -1;
            this.itemList.array = null;
            Laya.timer.clearAll(this);
            game.BossModel.getInstance().stopInterval();
            Laya.timer.clear(this, this.updateCount);
            tl3d.ModuleEventManager.removeEvent(game.BossEvent.UPDATE_BOSS_INFO, this.refreshView, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        /** 初始化界面 */
        WorldBossView.prototype.initView = function () {
            var _this = this;
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onJiangli.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanhui.bind(this) });
            this.uiScene.onShow();
            tl3d.ModuleEventManager.addEvent(game.BossEvent.UPDATE_BOSS_INFO, this.refreshView, this);
            Laya.timer.loop(1000, this, this.updateCount);
            this.updateCount();
            var model = game.BossModel.getInstance();
            model.startInterval();
            var bossList = model.getBossList();
            this.bossList.array = bossList;
            var bossId = this.dataSource;
            var index = -1;
            // 是否有传入bossID, 且开启未死亡的
            if (bossId && !isNaN(bossId)) {
                index = bossList.findIndex(function (vo) {
                    return vo.tbBoss.ID == bossId && vo.isOpen() && !vo.isDead();
                });
            }
            if (index == -1) {
                for (var i = bossList.length - 1; i >= 0; i--) {
                    var boosVo = bossList[i];
                    if (boosVo.isOpen() && !boosVo.isDead()) {
                        index = i;
                        break;
                    }
                }
            }
            index = index != -1 ? index : 0;
            this.bossList.selectedIndex = index;
            Laya.timer.callLater(this, function () {
                var toIndex = index >= 2 ? index - 2 : 0;
                _this.bossList.scrollTo(toIndex);
            });
        };
        WorldBossView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            this._curBossVo = this.bossList.selectedItem;
            if (!this._curBossVo)
                return;
            var info = this._curBossVo;
            this.lbName.text = info.tbMonster.name + LanMgr.getLan('', 10157, info.tbBoss.boss_level.toString());
            var list = info.tbBoss.getRewardList();
            this.itemList.array = list;
            this.itemList.width = list.length * 100 + (list.length - 1) * this.itemList.spaceX;
            Laya.timer.once(300, this, this.delayShow, [info.tbMonster.model]);
            this.updateBossInfo();
        };
        WorldBossView.prototype.updateBossInfo = function () {
            if (!this._curBossVo)
                return;
            var info = this._curBossVo;
            this.lbBlood.text = Math.ceil(info.getBossHp() / info.getBossTotalHp() * 100) + "%";
            this.pbBlood.value = info.getBossHp() / info.getBossTotalHp();
            this.btnChallege.gray = !info.isOpen();
            this.btnChallege.label = info.isDead() ? LanMgr.getLan("", 12502) : info.isOpen() ? LanMgr.getLan("", 10021) : LanMgr.getLan('', 10157, info.tbBoss.level);
            this.lbPeople.text = LanMgr.getLan("", 12503, info.svo.bossRankNum);
        };
        /** 更新界面 */
        WorldBossView.prototype.refreshView = function () {
            this.updateBossInfo();
            this.bossList.refresh();
            for (var _i = 0, _a = this.bossList.cells; _i < _a.length; _i++) {
                var box = _a[_i];
                box.updateBlood();
            }
        };
        /** 更新数量 */
        WorldBossView.prototype.updateCount = function () {
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            var maxCnt = tb.TB_boss_set.getSet().max_time;
            if (count >= maxCnt) {
                this.lbCount.text = LanMgr.getLan('', 10081, count);
            }
            else {
                var replyTime = tb.TB_boss_set.getSet().reply_time;
                var time = replyTime - (App.serverTimeSecond - App.hero.worldBossReplyTime);
                this.lbCount.text = LanMgr.getLan('', 10142, count) + LanMgr.getLan("", 12504, GameUtil.toCountdown(time, "mm:ss"));
            }
            this.btnAdd.x = this.lbCount.x + this.lbCount.width + 30;
            for (var _i = 0, _a = this.bossList.cells; _i < _a.length; _i++) {
                var box = _a[_i];
                box.updateBtn();
            }
        };
        WorldBossView.prototype.onBossRender = function (itemir, index) {
            if (!itemir)
                return;
            if (index == this.bossList.selectedIndex) {
                itemir.ani1.play(0, true);
            }
            else {
                itemir.ani1.gotoAndStop(0);
            }
        };
        /** 挑战 */
        WorldBossView.prototype.onChallenge = function () {
            var item = this.bossList.selectedItem;
            if (item && item instanceof game.BossInfoVo) {
                dispatchEvt(new game.BossEvent(game.BossEvent.CHALLENGE_BOSS, item));
            }
        };
        WorldBossView.prototype.onRule = function () {
            dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_RULE_VIEW));
        };
        WorldBossView.prototype.onAdd = function () {
            dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_BUY_VIEW));
        };
        WorldBossView.prototype.onJiangli = function () {
            var item = this.bossList.selectedItem;
            if (item && item instanceof game.BossInfoVo) {
                dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_REWARD_VIEW, item));
            }
        };
        WorldBossView.prototype.onRank = function () {
            var item = this.bossList.selectedItem;
            if (item && item instanceof game.BossInfoVo) {
                dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_RANK_VIEW, item));
            }
        };
        WorldBossView.prototype.onNext = function () {
            this.bossList.scrollTo(this.bossList.selectedIndex + 3);
        };
        WorldBossView.prototype.onPrev = function () {
            this.bossList.scrollTo(this.bossList.selectedIndex - 3);
        };
        WorldBossView.prototype.onFanhui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_MAOXIAN));
        };
        /** 延迟展示模型（延迟主要为了定位） */
        WorldBossView.prototype.delayShow = function (modeid) {
            var point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, point.y - Launch.offsetY, 180, 0.8);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        //向右 2 向左 1
        WorldBossView.prototype.rotateModel = function (dir) {
            this.uiScene.sceneChar.rotationY = dir == 1 ? this.uiScene.sceneChar.rotationY - 15 : this.uiScene.sceneChar.rotationY + 15;
        };
        return WorldBossView;
    }(ui.boss.WorldBossUI));
    game.WorldBossView = WorldBossView;
})(game || (game = {}));
