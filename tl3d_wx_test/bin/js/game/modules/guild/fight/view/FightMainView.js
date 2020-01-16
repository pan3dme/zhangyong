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
    var FightMainView = /** @class */ (function (_super) {
        __extends(FightMainView, _super);
        function FightMainView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            _this._model = game.GuildFightModel.getInstance();
            return _this;
        }
        FightMainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        FightMainView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        FightMainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.teamList.array = null;
            this.atkList.array = null;
            Laya.timer.clear(this, this.updateTime);
            this.myGuildBox.off(Laya.Event.CLICK, this, this.onSelect);
            this.enemyGuildBox.off(Laya.Event.CLICK, this, this.onSelect);
            this.btnRank.off(Laya.Event.CLICK, this, this.onRank);
            this._model.fightThreadVo.stopMatchLoop();
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        FightMainView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, redpointName: "guild_war_award", callback: this.onBaoxiang.bind(this) },
                { btnSkin: SkinUtil.btn_saiji, callback: this.onSaiji.bind(this) },
                { btnSkin: SkinUtil.btn_huiyuan, callback: this.onHuiyuan.bind(this) },
                { btnSkin: SkinUtil.btn_glory_hall, callback: this.onHall.bind(this) }
            ];
            var model = this._model;
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.guildDonate];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onReturn.bind(this) });
            var myTeamVo = model.myTeamVo;
            this.lbName1.text = myTeamVo.teamSvo.guildName;
            this.lbJifen1.text = '积分：' + myTeamVo.teamSvo.dailyScore;
            this.lbForce1.text = '总战斗力：' + myTeamVo.teamSvo.totalForce;
            this.myGuildBox.dataSource = myTeamVo.headVo;
            var self = myTeamVo.getMember(App.hero.playerId);
            var atkCount = (self ? self.svo.atkCount : 0);
            var ary = [];
            for (var i = 1; i <= tb.TB_guild_war_set.getSet().atk_num; i++) {
                var url = atkCount >= i ? SkinUtil.jian_liang : SkinUtil.jian_an;
                ary.push(url);
            }
            this.atkList.array = ary;
            this.lbGrade.text = game.GuildFightModel.GRADE_NAME[myTeamVo.teamSvo.guildGrade];
            var emenyTeamVo = model.enemyTeamVo;
            this.lbName2.text = emenyTeamVo.teamSvo.guildName;
            this.lbJifen2.text = '积分：' + emenyTeamVo.teamSvo.dailyScore;
            this.lbForce2.text = '总战斗力：' + emenyTeamVo.teamSvo.totalForce;
            this.enemyGuildBox.dataSource = emenyTeamVo.headVo;
            this.onSelect(false);
            this.myGuildBox.on(Laya.Event.CLICK, this, this.onSelect, [true]);
            this.enemyGuildBox.on(Laya.Event.CLICK, this, this.onSelect, [false]);
            this.btnRank.on(Laya.Event.CLICK, this, this.onRank);
            model.fightThreadVo.loopRequestMatchInfo();
            var date = new Date();
            date.setTime(App.serverTime);
            date.setHours(22, 0, 0, 0);
            this._endTime = Math.ceil(date.getTime() / 1000);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        };
        FightMainView.prototype.updateTime = function () {
            var time = this._endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = GameUtil.toCountdown(time, "hh:mm:ss");
            }
            else {
                Laya.timer.clear(this, this.updateTime);
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_BATTLE_VIEW));
            }
        };
        /** 更新界面 */
        FightMainView.prototype.updateView = function () {
            var model = this._model;
            var self = this.imgArrow1.visible;
            if (self) {
                this.teamList.array = model.myTeamVo.getTeamList();
            }
            else {
                this.teamList.array = model.enemyTeamVo.getTeamList();
            }
        };
        /** 选择公会 */
        FightMainView.prototype.onSelect = function (self) {
            this.imgArrow1.visible = self;
            var exist = this._model.myTeamVo.getMember(App.hero.playerId);
            this.atkList.visible = exist && !self;
            this.imgArrow2.visible = !self;
            this.updateView();
        };
        FightMainView.prototype.onReturn = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
        };
        FightMainView.prototype.onRank = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GROUP_RANK_VIEW));
        };
        FightMainView.prototype.onBaoxiang = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GRADE_CHEST_VIEW));
        };
        FightMainView.prototype.onHall = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_HONOR_HALL_VIEW));
        };
        FightMainView.prototype.onSaiji = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_SEASON_AWARD_VIEW));
        };
        FightMainView.prototype.onRule = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_FIGHT_RULE_VIEW));
        };
        FightMainView.prototype.onHuiyuan = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_PERSON_RANK_VIEW));
        };
        return FightMainView;
    }(ui.guild.fight.GuildFightUI));
    game.FightMainView = FightMainView;
})(game || (game = {}));
