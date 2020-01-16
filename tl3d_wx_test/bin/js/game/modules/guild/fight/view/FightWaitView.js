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
    var FightWaitView = /** @class */ (function (_super) {
        __extends(FightWaitView, _super);
        function FightWaitView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            _this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GONGHUI_FIGHT);
            return _this;
        }
        FightWaitView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        FightWaitView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        FightWaitView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._rankVo = null;
            Laya.timer.clear(this, this.updateTime);
            this.btnJoin.off(Laya.Event.CLICK, this, this.onClick);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        FightWaitView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, redpointName: "guild_war_award", callback: this.onBaoxiang.bind(this) },
                { btnSkin: SkinUtil.btn_saiji, callback: this.onSaiji.bind(this) },
                { btnSkin: SkinUtil.btn_huiyuan, callback: this.onHuiyuan.bind(this) },
                { btnSkin: SkinUtil.btn_glory_hall, callback: this.onHall.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.guildDonate];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onReturn.bind(this) });
            this.lbDesc.text = "";
            this.lbNote.text = "";
            // this.imgCaidai.visible =
            this.imgWangzhe.visible = this.lbWangzhe.visible = false;
            this.menuView.updateView();
            var model = game.GuildFightModel.getInstance();
            Laya.timer.clear(this, this.updateTime);
            if (model.isJoin()) {
                // 周一到周六22点-6点（不包括周一0点到6点）
                if (model.isRestTime()) {
                    this.btnJoin.label = "查看上轮排名";
                    this.requestRank();
                }
                else {
                    this.btnJoin.label = "已报名";
                    if (model.matchType == 1) {
                        var tbSet = tb.TB_guild_war_set.getSet();
                        this.lbNote.text = LanMgr.getLan("由于{0}级人数小于{1}人，不能参与本轮比赛", -1, tbSet.role_level, tbSet.guild_player_num);
                    }
                    else if (model.matchType == 2) {
                        this.lbNote.text = LanMgr.getLan("由于本轮轮空，直接获得积分，请静候下轮比赛", -1);
                    }
                }
                var date = new Date(App.serverTime);
                var week = date.getDay();
                var hour = date.getHours();
                // 如果是最后一轮（周六22:00-24:00）,下轮开启倒计时隐藏
                if (week == WeekNum.Sat && hour >= tb.TB_guild_war_set.getSet().end_time) {
                    this.lbDesc.text = "";
                    Laya.timer.loop(1000, this, this.updateTime);
                }
                else {
                    this._endTime = model.getNextStartTime();
                    Laya.timer.loop(1000, this, this.updateTime);
                    this.updateTime();
                }
            }
            else {
                this.btnJoin.label = "报名";
                this.lbDesc.text = "等待会长报名中";
            }
            this.btnJoin.on(Laya.Event.CLICK, this, this.onClick);
        };
        /** 请求排行 */
        FightWaitView.prototype.requestRank = function () {
            var _this = this;
            PLC.request(Protocol.guild_guildWar_getGroupList, null, function ($data) {
                if (!$data)
                    return;
                // 更新maxGuildGrade
                game.GuildFightModel.getInstance().updateSeason($data);
                var myRank = $data.myRank ? $data.myRank : 0;
                // 不需要设置数据,打开就会重新请求
                _this._rankVo = { groupList: [], upGradeType: 0, guildGrade: 0, myRank: myRank };
                // 显示王者标识 this.imgCaidai.visible
                _this.imgWangzhe.visible = _this.lbWangzhe.visible = myRank > 0;
                _this.lbWangzhe.text = "\u738B\u8005" + myRank + "\u540D";
            });
        };
        /** 更新倒计时 */
        FightWaitView.prototype.updateTime = function () {
            var time = this._endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbDesc.text = "下轮比赛倒计时：" + GameUtil.toCountdown(time, "hh:mm:ss", 1);
            }
            else {
                Laya.timer.clear(this, this.updateTime);
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_BATTLE_VIEW));
            }
        };
        FightWaitView.prototype.onClick = function () {
            var model = game.GuildFightModel.getInstance();
            if (model.isJoin()) {
                if (model.isRestTime()) {
                    if (!this._rankVo) {
                        showToast(LanMgr.getLan('', 10398));
                    }
                    else {
                        dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GROUP_RANK_VIEW));
                    }
                }
            }
            else {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.JOIN_FIGHT));
            }
        };
        FightWaitView.prototype.onReturn = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
        };
        FightWaitView.prototype.onBaoxiang = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GRADE_CHEST_VIEW));
        };
        FightWaitView.prototype.onHall = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_HONOR_HALL_VIEW));
        };
        FightWaitView.prototype.onSaiji = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_SEASON_AWARD_VIEW));
        };
        FightWaitView.prototype.onRule = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_FIGHT_RULE_VIEW));
        };
        FightWaitView.prototype.onHuiyuan = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_PERSON_RANK_VIEW));
        };
        return FightWaitView;
    }(ui.guild.fight.GuildFightWaitUI));
    game.FightWaitView = FightWaitView;
})(game || (game = {}));
