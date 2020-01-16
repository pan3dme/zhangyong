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
    var MemberInfoRender = /** @class */ (function (_super) {
        __extends(MemberInfoRender, _super);
        function MemberInfoRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MemberInfoRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        MemberInfoRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                var jobKey = iface.tb_prop.guildJobTypeKey;
                this.lbName.text = data.name;
                this.lbTime.text = data.online == 1 ? "在线" : GameUtil.getTimePrev(data.logoutTime);
                this.lbTime.color = data.online == 1 ? ColorConst.TASK_GREEN : ColorConst.GRAY;
                this.headBox.dataSource = new UserHeadVo(data.head, data.level, data.headFrame);
                this.lbJob.text = data.job == jobKey.president ? "\u4F1A\u957F" : (data.job == jobKey.vicePresident ? " 副会长" : "成员");
                this.lbJob.color = data.job == jobKey.president ? ColorConst.LIGHT_STH : (data.job == jobKey.vicePresident ? ColorConst.PURPLE : ColorConst.normalFont);
                this.lbForce.text = "\u795E\u529B:" + data.force;
                var isSelf = data.playerId == App.hero.playerId;
                this.btnSetup.visible = !isSelf;
                if (!isSelf) {
                    var guildInfo = game.GuildModel.getInstance().guildInfo;
                    var isCaptain = guildInfo.job == jobKey.president;
                    var isViceCaptain = guildInfo.job == jobKey.vicePresident;
                    // 会长和副会长显示, 
                    if (isCaptain || isViceCaptain) {
                        this.btnSetup.visible = isCaptain || data.job != jobKey.vicePresident;
                    }
                    else {
                        // 会员显示条件：会长离线大于3天，并且只显示在会长后面,按钮提前显示
                        var isOutTime = data.online != 1 && (App.serverTimeSecond - data.logoutTime) >= TimeConst.ONE_DAY_SEC * tb.TB_guild_set.getSet().usurper_time[0];
                        this.btnSetup.visible = data.job == jobKey.president && isOutTime;
                    }
                }
                this.headBox.on(Laya.Event.CLICK, this, this.showMemberInfo);
                this.btnSetup.on(Laya.Event.CLICK, this, this.onSetup);
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.showMemberInfo);
                this.btnSetup.off(Laya.Event.CLICK, this, this.onSetup);
            }
        };
        MemberInfoRender.prototype.showMemberInfo = function () {
            var info = this.dataSource;
            if (!info || info.playerId == App.hero.playerId)
                return;
            var event = new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW), { playerId: info.playerId, event: event });
        };
        MemberInfoRender.prototype.onSetup = function () {
            var info = this.dataSource;
            if (info) {
                UIMgr.showUI(UIConst.GuildMemberSetView, info);
            }
        };
        return MemberInfoRender;
    }(ui.guild.hall.MemberInfoRenderUI));
    game.MemberInfoRender = MemberInfoRender;
})(game || (game = {}));
