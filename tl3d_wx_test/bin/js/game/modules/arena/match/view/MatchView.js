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
    var MatchView = /** @class */ (function (_super) {
        __extends(MatchView, _super);
        function MatchView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        MatchView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.MatchModel.getInstance();
            this._boxItems = [];
            var boxAry = this._model.getBoxList();
            var len = boxAry.length;
            var boxW = this.box.width;
            for (var i = 0; i < len; i++) {
                var box = new common.BaoxiangBox();
                box.anchorX = 0.5;
                box.x = (boxAry[i].getCount() / this._model.maxTbCount) * boxW;
                box.y -= 20;
                this.box.addChild(box);
                this._boxItems.push(box);
            }
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.MATCH_FIGHT);
            this.btnAdd.on(Laya.Event.CLICK, this, this.onClick);
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onClick);
        };
        MatchView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        MatchView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            for (var _i = 0, _a = this._boxItems; _i < _a.length; _i++) {
                var item = _a[_i];
                item.dataSource = null;
            }
            this.matchList.array = null;
            Laya.timer.clearAll(this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateSYCount, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        /** 初始化界面 */
        MatchView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onAward.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onRank.bind(this) },
                { btnSkin: SkinUtil.btn_record, callback: this.onRecord.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            this.updateBox();
            this.lbName.text = App.hero.name;
            this.lbScore.text = LanMgr.getLan("", 12543) + "：" + this._model.score;
            this.lbGrade.text = LanMgr.getLan("", 12544) + "：" + this._model.getGradeName(this._model.score);
            this.lbCount.text = LanMgr.getLan("", 12540) + this._model.challengeCount + LanMgr.getLan("", 12108);
            this.refreshList();
            this.updateSYCount();
            this.resetRefreshInterval();
            this.resetMatchInterval();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateSYCount, this);
        };
        /** 更新宝箱 */
        MatchView.prototype.updateBox = function () {
            var model = this._model;
            var boxList = model.getBoxList();
            for (var i = 0, len = this._boxItems.length; i < len; i++) {
                this._boxItems[i].dataSource = boxList[i];
            }
            this.imgPb.value = (model.challengeCount / model.maxTbCount);
        };
        /** 刷新列表 */
        MatchView.prototype.refreshList = function () {
            this.matchList.array = this._model.getMatchList();
        };
        /** 重置本轮倒计时 */
        MatchView.prototype.resetMatchInterval = function () {
            Laya.timer.clear(this, this.updateMatchTime);
            Laya.timer.loop(1000, this, this.updateMatchTime);
            this.updateMatchTime();
        };
        /** 更新倒计时 */
        MatchView.prototype.updateMatchTime = function () {
            var time = this._model.roundEndTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = LanMgr.getLan("", 12545) + GameUtil.getTimeStr(time);
            }
            else {
                this._model.updateEndTime();
            }
        };
        /** 重置定时器 */
        MatchView.prototype.resetRefreshInterval = function () {
            Laya.timer.clear(this, this.updateRefreshTime);
            var time = App.serverTimeSecond - this._model.lastRefreshTime;
            if (time < tb.TB_match_set.getSet().refresh_interval) {
                Laya.timer.loop(1000, this, this.updateRefreshTime);
                this.updateRefreshTime();
            }
            else {
                this.btnRefresh.label = LanMgr.getLan("", 10172);
                this.btnRefresh.gray = false;
            }
        };
        /** 更新倒计时 */
        MatchView.prototype.updateRefreshTime = function () {
            var time = App.serverTimeSecond - this._model.lastRefreshTime;
            var second = Math.ceil(tb.TB_match_set.getSet().refresh_interval - time);
            if (second > 0) {
                this.btnRefresh.label = second + LanMgr.getLan("", 12093);
                this.btnRefresh.gray = true;
            }
            else {
                this.btnRefresh.label = LanMgr.getLan("", 10172);
                this.btnRefresh.gray = false;
                Laya.timer.clear(this, this.updateRefreshTime);
            }
        };
        /** 更新剩余数量 */
        MatchView.prototype.updateSYCount = function () {
            this.lbSYCount.text = LanMgr.getLan("", 10081, App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.matchNum));
        };
        MatchView.prototype.onClick = function (event) {
            var btn = event.target;
            if (btn == this.btnAdd) {
                dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_BUY_VIEW));
            }
            else if (btn == this.btnRefresh) {
                if (this.btnRefresh.gray) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                dispatchEvt(new game.ArenaEvent(game.ArenaEvent.REFRESH_MATCH_LIST));
            }
        };
        MatchView.prototype.onRule = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_NOTICE_VIEW));
        };
        MatchView.prototype.onAward = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_AWARD_VIEW));
        };
        MatchView.prototype.onRank = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_RANK_VIEW));
        };
        MatchView.prototype.onRecord = function () {
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_RECORD_VIEW));
        };
        MatchView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_KUAFU));
        };
        return MatchView;
    }(ui.arena.match.MatchMainUI));
    game.MatchView = MatchView;
})(game || (game = {}));
