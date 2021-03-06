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
    var CopyTeamMainView = /** @class */ (function (_super) {
        __extends(CopyTeamMainView, _super);
        function CopyTeamMainView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        CopyTeamMainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.CopyTeamModel.getInstance();
            this.boxCopy0.on(Laya.Event.CLICK, this, this.onClickBox);
            this.boxCopy1.on(Laya.Event.CLICK, this, this.onClickBox);
            this.boxCopy2.on(Laya.Event.CLICK, this, this.onClickBox);
            this.btn_left.on(Laya.Event.CLICK, this, this.onPage, [-1]);
            this.btn_right.on(Laya.Event.CLICK, this, this.onPage, [1]);
            this.uiScene = new Base2dSceneLayerExt();
            this.itemPanel.addChildAt(this.uiScene, 2);
            this.uiScene.setPos(0, 0);
            this.itemPanel.hScrollBarSkin = "";
            if (this.itemPanel.hScrollBar) {
                this.itemPanel.hScrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange);
            }
        };
        CopyTeamMainView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.itemPanel.width = w;
            this.itemPanel.height = h;
            if (this.itemPanel.hScrollBar) {
                this.itemPanel.hScrollBar.max = Math.max(900 - w, 0);
            }
            this.lbDesc.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 178) : 178;
            this.btn_left.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 178) : 178;
            this.btn_right.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 178) : 178;
        };
        CopyTeamMainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamMainView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamMainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.stopTime();
            UIMgr.hideUIByName(UIConst.SysTopView);
            this.itemPanel.hScrollBar.value = 0;
            this.uiScene.onExit();
            this._model1 = null;
            this._model2 = null;
            this._model3 = null;
        };
        CopyTeamMainView.prototype.initView = function () {
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, redpointName: "team_reward", callback: this.onJiangli.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.onRank.bind(this) },
                { btnSkin: SkinUtil.btn_team, callback: this.onTeam.bind(this), redpointName: "CopyTeamRp" }
            ];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            Laya.timer.frameOnce(2, this, this.delayScroll);
            this.uiScene.onShow();
            this.startTime();
        };
        //计时器只有存在队伍中，才开启
        CopyTeamMainView.prototype.startTime = function () {
            this.stopTime();
            if (this._model.hasTeam()) {
                this.timerLoop(3000, this, this.updateRender);
            }
        };
        CopyTeamMainView.prototype.stopTime = function () {
            this.clearTimer(this, this.updateRender);
        };
        CopyTeamMainView.prototype.updateRender = function () {
            game.CopyTeamThread.getInstance().requestMyTeamInfo();
        };
        CopyTeamMainView.prototype.updateMainState = function () {
            var myNextFloor = this._model.getMyNextId();
            this.ani_guanqia.stop();
            this.ani_roleselect.stop();
            this.ani_guanqia.visible = false;
            this.ani_roleselect.visible = false;
            this.lbDesc.text = LanMgr.getLan("", 10079, num2ChiNum(this._chapter));
            var chapterTabs = this._model.getTeamAryByChapter(this._chapter);
            var item = null;
            for (var i = 0; i < chapterTabs.length; i++) {
                item = chapterTabs[i];
                if (!item)
                    continue;
                this.drawItem(item, myNextFloor);
            }
        };
        CopyTeamMainView.prototype.drawItem = function (tab, myNextFloor) {
            var idx = tab.copy % 10;
            var lbcopy = idx == 1 ? this.lbCopy0 : idx == 2 ? this.lbCopy1 : this.lbCopy2;
            lbcopy.text = this._model.myFloor >= tab.ID ? LanMgr.getLan("", 12478) : LanMgr.getLan("", 10030, num2ChiNum(idx));
            lbcopy.color = this._model.myFloor >= tab.ID ? "#40ff7c" : "#ffeecc";
            var monster = tb.TB_monster.get_TB_monsterById(tab.monster_show);
            var role = idx == 1 ? this._model1 : idx == 2 ? this._model2 : this._model3;
            var target = idx == 1 ? this.boxCopy0 : idx == 2 ? this.boxCopy1 : this.boxCopy2;
            target.dataSource = tab;
            if (!role) {
                role = this.uiScene.addModelChar(String(monster.model), target.x, target.y, 180, tab.model_multiple);
                if (idx == 1) {
                    this._model1 = role;
                }
                else if (idx == 2) {
                    this._model2 = role;
                }
                else {
                    this._model3 = role;
                }
            }
            else {
                role.setRoleUrl(getRoleUrl(String(monster.model)));
                role.scale = tab.model_multiple;
            }
            //myNextFloor != this._model.myFloor为全部通关
            if (myNextFloor != this._model.myFloor && tab.ID == myNextFloor) {
                this.ani_roleselect.visible = this.ani_guanqia.visible = true;
                this.ani_guanqia.play(0, true);
                this.ani_roleselect.play(0, true);
                this.ani_guanqia.x = target.x;
                this.ani_guanqia.y = target.y - 150;
                this.ani_roleselect.x = target.x;
                this.ani_roleselect.y = target.y - 25;
                this.ani_roleselect.scaleX = idx <= 2 ? 0.6 : 1;
                this.ani_roleselect.scaleY = idx <= 2 ? 0.6 : 1;
            }
        };
        CopyTeamMainView.prototype.onRule = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_RULE_VIEW));
        };
        CopyTeamMainView.prototype.onJiangli = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_REWARD_VIEW));
        };
        CopyTeamMainView.prototype.onRank = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_RANK_VIEW));
        };
        CopyTeamMainView.prototype.onPage = function (index, e) {
            if (e.target.dataSource && e.target.dataSource.info) {
                if (e.target.dataSource.info.length > 0) {
                    showToast(e.target.dataSource.info);
                }
                return;
            }
            this._chapter += index;
            this.updateBtn();
            this.updateMainState();
        };
        CopyTeamMainView.prototype.onTeam = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_TEAMBUILD));
        };
        CopyTeamMainView.prototype.delayScroll = function () {
            var viewFloor = this._model.hasTeam() ? this._model.captainFloor : this._model.myFloor;
            viewFloor = this._model.getNextId(viewFloor);
            var tab = tb.TB_team_copy.getTB_team_copyById(viewFloor);
            if (!tab)
                return;
            this._chapter = Math.floor(tab.copy / 10);
            var idx = tab.copy % 10;
            this.lab_campInfo.visible = this._model.hasTeam();
            this.lab_campInfo.text = LanMgr.getLan("", 12479) + (":" + this._chapter + "-" + idx);
            this.updateBtn();
            this.updateMainState();
            // this.addGuangEff();
            if (this.itemPanel.hScrollBar) {
                this.itemPanel.hScrollBar.max = 900 - this.itemPanel.width;
                this.itemPanel.hScrollBar.value = idx == 1 ? 0 : idx == 2 ? 180 : 90;
            }
        };
        CopyTeamMainView.prototype.updateBtn = function () {
            this.btn_left.gray = this._chapter <= 1;
            this.btn_left.dataSource = null;
            if (this._chapter <= 1) {
                this.btn_left.dataSource = { info: LanMgr.getLan("", 10263) };
            }
            this.btn_right.gray = false;
            this.btn_right.dataSource = null;
            if (this._chapter >= this._model.MaxChapter) {
                //到最后一章了
                this.btn_right.gray = true;
                this.btn_right.dataSource = { info: LanMgr.getLan("", 10263) };
            }
            else {
                var nextchapter = this._model.getTeamAryByChapter(this._chapter + 1);
                if (nextchapter) {
                    //是否全部通关
                    this.btn_right.gray = nextchapter[0].ID > this._model.getMyNextId();
                    if (this.btn_right.gray) {
                        this.btn_right.dataSource = { info: LanMgr.getLan("", 10264) };
                    }
                }
                else {
                    //下一章不存在
                    this.btn_right.gray = true;
                    this.btn_right.dataSource = { info: LanMgr.getLan("", 10265) };
                }
            }
        };
        CopyTeamMainView.prototype.onClickBox = function (e) {
            var _this = this;
            if (!e.target || !e.target.dataSource)
                return;
            if (this._model.hasTeam()) {
                if (this._model.IsLeader()) {
                    var idx = this._model.memberList.findIndex(function (vo) {
                        return _this._model.getNextId(vo.copyFloor) < e.target.dataSource.ID;
                    });
                    if (idx == -1) {
                        UIMgr.showUI(UIConst.CopyTeamBattleInfo, tb.TB_team_copy.getTB_team_copyById(e.target.dataSource.ID));
                    }
                    else {
                        showToast(LanMgr.getLan("", 10266, this._model.memberList[idx].name));
                    }
                }
                else {
                    showToast(LanMgr.getLan("", 10267));
                }
            }
            else {
                if (e.target.dataSource.ID <= this._model.getMyNextId()) {
                    UIMgr.showUI(UIConst.CopyTeamBattleInfo, tb.TB_team_copy.getTB_team_copyById(e.target.dataSource.ID));
                }
                else {
                    showToast(LanMgr.getLan("", 10268));
                }
            }
        };
        CopyTeamMainView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_LILIAN));
        };
        CopyTeamMainView.prototype.onScrollChange = function () {
            if (this.itemPanel.hScrollBar) {
                this.uiScene.x = -this.itemPanel.hScrollBar.value;
            }
        };
        return CopyTeamMainView;
    }(ui.teamcopy.TeamCopyMainUI));
    game.CopyTeamMainView = CopyTeamMainView;
})(game || (game = {}));
