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
    var CopyTeamBattleInfo = /** @class */ (function (_super) {
        __extends(CopyTeamBattleInfo, _super);
        function CopyTeamBattleInfo() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.team_two_group;
            return _this;
        }
        CopyTeamBattleInfo.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.CopyTeamModel.getInstance();
            this.isModelClose = true;
            this.btn_addteam.on(Laya.Event.CLICK, this, this.onAddTeam);
            this.btn_singlebattle.on(Laya.Event.CLICK, this, this.onSingleBattle);
        };
        CopyTeamBattleInfo.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamBattleInfo.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamBattleInfo.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.lineupUI.dataSource = null;
            this.bgPanel.dataSource = null;
            this.rewardList.dataSource = null;
        };
        CopyTeamBattleInfo.prototype.initView = function () {
            var teamcopy = this.dataSource;
            if (!teamcopy)
                return;
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamBattleInfo, closeOnButton: false, closeOnSide: this.isModelClose, centerBgHide: true, title: LanMgr.getLan("", 10079, Math.floor(teamcopy.copy / 10)) + " " + LanMgr.getLan("", 10030, teamcopy.copy % 10) };
            this.lineupUI.dataSource = { lineupGods: this.getMonsterList(teamcopy.monster), shenqiAry: [], showShenli: false, title: LanMgr.getLan("", 10020) };
            this.rewardList.dataSource = teamcopy.getRewardList();
            listAtCenter(this.rewardList, 92, 5, this.rewardList.dataSource.length, 100);
            this.btn_singlebattle.label = this._model.hasTeam() ? LanMgr.getLan("", 12486) : LanMgr.getLan("", 12485);
            this.btn_singlebattle.x = this._model.hasTeam() ? 284 : 447;
            this.btn_addteam.visible = !this._model.hasTeam();
            // this.rewardList.x = 400
        };
        CopyTeamBattleInfo.prototype.getMonsterList = function (monsterKeyList) {
            var ary = [], tabmonster = null;
            for (var i = 0; i < monsterKeyList.length; i++) {
                tabmonster = tb.TB_monster.get_TB_monsterById(monsterKeyList[i]);
                if (tabmonster) {
                    ary.push(tabmonster);
                }
                else {
                    logerror("team Copy data error:" + monsterKeyList[i]);
                }
            }
            return ary;
        };
        CopyTeamBattleInfo.prototype.onAddTeam = function () {
            if (this._model.hasTeam()) {
                showToast(LanMgr.getLan('', 10203));
                this.close();
                return;
            }
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_TEAMBUILD));
        };
        CopyTeamBattleInfo.prototype.onSingleBattle = function () {
            if (!this.dataSource)
                return;
            if (this._model.hasTeam() && !this._model.IsLeader()) {
                showToast(LanMgr.getLan('', 10203));
                this.close();
                return;
            }
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.TEAM_COPY_BATTLE), this.dataSource.ID);
        };
        return CopyTeamBattleInfo;
    }(ui.teamcopy.BattleInfoUI));
    game.CopyTeamBattleInfo = CopyTeamBattleInfo;
})(game || (game = {}));
