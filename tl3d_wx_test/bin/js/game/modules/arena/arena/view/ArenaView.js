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
    var ArenaView = /** @class */ (function (_super) {
        __extends(ArenaView, _super);
        function ArenaView() {
            var _this = _super.call(this) || this;
            _this._failCD = 0;
            /**界面按钮点击事件 */
            _this._clickRefreshTime = 0;
            _this.group = UIConst.hud_group;
            return _this;
        }
        ArenaView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.uiScene = new Base2dSceneLayer();
            this.panel.addChild(this.uiScene);
            this.btnbuynum.on(Laya.Event.CLICK, this, this.onClick);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.JINGJI);
            this.rankList.array = null;
            this.rankList.selectedIndex = -1;
            this.rankList.selectEnable = true;
            this.rankList.renderHandler = new Handler(this, this.onRender);
            if (this.rankList.scrollBar) {
                this.rankList.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange);
            }
        };
        ArenaView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.initView();
        };
        ArenaView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.initView();
        };
        Object.defineProperty(ArenaView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
            },
            enumerable: true,
            configurable: true
        });
        ArenaView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onRank.bind(this) },
                { btnSkin: SkinUtil.btn_record, callback: this.onRecord.bind(this) },
                { btnSkin: SkinUtil.btn_refresh, callback: this.onRefresh.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.arena];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.toClose.bind(this) });
            this.setArenaInfo();
            this.setChallengeNum();
            tl3d.ModuleEventManager.addEvent(game.ArenaEvent.UPDATE_MYSELF_FORCE, this.updateMyselfForce, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.setChallengeNum, this);
        };
        /**服务端更新数据 */
        ArenaView.prototype.setArenaInfo = function () {
            var data = this.dataSource;
            this.lbmyrank.changeText("" + LanMgr.getLan("", 12265) + data.rank);
            this.lbrankmax.changeText("" + LanMgr.getLan("", 12550) + data.topRank);
            var list = data.clgInfoList || [];
            this.rankList.array = list;
            var idx = this.rankList.array.findIndex(function (vo) { return vo.isMySelf(); });
            if (idx != -1)
                this.rankList.scrollTo(idx);
            game.ArenaModel.getInstance().loads(this.uiScene, list);
        };
        /**更新自己的神力 */
        ArenaView.prototype.updateMyselfForce = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.UPDATE_ARENA_RANK));
        };
        /**是否在战斗冷却中 */
        ArenaView.prototype.getChallengeFailCD = function () {
            return App.hero.arenaFailTime + tb.TB_arena_new_set.getArenaNewSet().fail_cd - App.serverTimeSecond;
        };
        /**剩余挑战次数 */
        ArenaView.prototype.setChallengeNum = function () {
            this.lbhasnum.changeText("\u5956\u52B1\u6B21\u6570\uFF1A" + App.hero.arenaNum);
        };
        /**list渲染位置改变下 */
        ArenaView.prototype.onRender = function (cell, index) {
            cell.x = !(index % 2 != 0 && index != 0) ? 0 : 400;
        };
        ArenaView.prototype.onClick = function (e) {
            if (e.target === this.btnbuynum) { //购买次数
                dispatchEvt(new game.ArenaEvent(game.ArenaEvent.BUY_ARENA_CHALLENGE));
            }
        };
        ArenaView.prototype.toClose = function () {
            this.close();
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_JINGJI));
        };
        //勋章商店
        ArenaView.prototype.onShop = function () {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.jingjichang);
        };
        //排行榜
        ArenaView.prototype.onRank = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_ARENARANK_PANEL));
        };
        //防守记录 
        ArenaView.prototype.onRecord = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_RECORD_PANLE));
        };
        //刷新列表
        ArenaView.prototype.onRefresh = function () {
            if (this._clickRefreshTime + 3 >= App.getServerTime()) {
                showToast(LanMgr.getLan("", 11012));
                return;
            }
            this._clickRefreshTime = App.getServerTime();
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.UPDATE_ARENA_RANK));
        };
        /**
         * 用一个3D场景把模型全部挂上去
         * 因为list渲染只会渲染视图内的项
         * 并且模型不会随着itemRende的位置改变而改变
         * */
        ArenaView.prototype.addChildModel = function () {
            var _this = this;
            this.uiScene.onExit();
            this.rankList.array.forEach(function (data, index) {
                var x = !(index % 2 != 0 && index != 0) ? 0 : 400;
                _this.addModelChar(data.maxForceGodId + "", x, index * (311 + _this.rankList.spaceY));
            });
        };
        ArenaView.prototype.onScrollChange = function () {
            if (this.rankList.scrollBar) {
                this.uiScene.y = 255 - this.rankList.scrollBar.value - Launch.offsetY;
            }
        };
        /** 添加ui角色 */
        ArenaView.prototype.addModelChar = function (mid, postionx, postiony, rotate, scale) {
            if (rotate === void 0) { rotate = 180; }
            if (scale === void 0) { scale = 1.4; }
            var sceneChar = new GameUIChar();
            this.uiScene.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl(mid));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.set2dPos(postionx, postiony); //坐标
            sceneChar.scale = scale;
        };
        ArenaView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            game.ArenaModel.getInstance().clearAllChar();
            this.uiScene.onExit();
            this.rankList.array = null;
            tl3d.ModuleEventManager.removeEvent(game.ArenaEvent.UPDATE_MYSELF_FORCE, this.updateMyselfForce, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.setChallengeNum, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        return ArenaView;
    }(ui.arena.arena.ArenaUI));
    game.ArenaView = ArenaView;
})(game || (game = {}));
