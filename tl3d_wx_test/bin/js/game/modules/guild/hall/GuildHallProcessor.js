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
    var GuildHallProcessor = /** @class */ (function (_super) {
        __extends(GuildHallProcessor, _super);
        function GuildHallProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.GuildModel.getInstance();
            return _this;
        }
        GuildHallProcessor.prototype.getName = function () {
            return "GuildHallProcessor";
        };
        GuildHallProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.UPDATE_MEMBER_LIST),
                new game.GuildEvent(game.GuildEvent.UPDATE_APPLY_LIST),
                new game.GuildEvent(game.GuildEvent.SHOW_APPLY_VIEW),
                new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_NOTICE),
                new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_SETTING),
                new game.GuildEvent(game.GuildEvent.MEMBER_SETUP_OPERATE),
                new game.GuildEvent(game.GuildEvent.GUILD_ZHAOMU),
                new game.GuildEvent(game.GuildEvent.GUILD_HALL_VIEW_CHANGEICON),
            ];
        };
        //处理事件
        GuildHallProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GuildEvent) {
                switch ($event.type) {
                    case game.GuildEvent.SHOW_APPLY_VIEW:
                        this.showApplyView();
                        break;
                    case game.GuildEvent.UPDATE_MEMBER_LIST:
                        this.updateMemberList();
                        break;
                    case game.GuildEvent.UPDATE_APPLY_LIST:
                        this.updateApplyList();
                        break;
                    case game.GuildEvent.CHANGE_GUILD_NOTICE:
                        this.sendNotice($event.data);
                        break;
                    case game.GuildEvent.CHANGE_GUILD_SETTING:
                        this.changeSet($event.data);
                        break;
                    case game.GuildEvent.MEMBER_SETUP_OPERATE:
                        this.memberOperate($event.data);
                        break;
                    case game.GuildEvent.GUILD_ZHAOMU:
                        this.onZhaomo($event.data);
                        break;
                    case game.GuildEvent.GUILD_HALL_VIEW_CHANGEICON:
                        this.changeGuildIcon($event.data);
                        break;
                }
            }
        };
        GuildHallProcessor.prototype.showApplyView = function () {
            var _this = this;
            PLC.request(Protocol.guild_guild_apply_list, null, function ($data, msg) {
                if (!$data)
                    return;
                var model = _this._model;
                model.setApplyList($data.applyList);
                if (model.getApplyList().length <= 0) {
                    showToast(LanMgr.getLan('', 10155));
                    return;
                }
                UIMgr.showUI(UIConst.GuildApplyListView);
            });
        };
        /**刷新公会界面 */
        GuildHallProcessor.prototype.updateMemberList = function () {
            if (this.guildInfoView) {
                this.guildInfoView.updateMemberList();
            }
        };
        /**刷新公会申请列表 */
        GuildHallProcessor.prototype.updateApplyList = function () {
            var _this = this;
            PLC.request(Protocol.guild_guild_apply_list, null, function ($data, msg) {
                if (!$data)
                    return;
                _this._model.setApplyList($data.applyList);
                if (UIMgr.hasStage(UIConst.GuildApplyListView)) {
                    _this.guildApplyListView.updateApplyList();
                }
            });
        };
        /** 更改公会公告 */
        GuildHallProcessor.prototype.sendNotice = function (text) {
            var _this = this;
            var arg = {};
            arg[Protocol.guild_guild_notice_modify.args.notice] = text;
            PLC.request(Protocol.guild_guild_notice_modify, arg, function ($data, msg) {
                if (!$data)
                    return;
                var info = _this._model.guildInfo;
                if (info) {
                    info.notice = text;
                }
                guildMemberChatSend(text);
                UIMgr.hideUIByName(UIConst.GuildNoticeView);
                if (_this.guildInfoView) {
                    _this.guildInfoView.renderView();
                }
            });
        };
        /** 更新入会设置 */
        GuildHallProcessor.prototype.changeSet = function (ary) {
            var _this = this;
            var level = ary[0];
            var auto = ary[1];
            var args = {};
            args[Protocol.guild_guild_set.args.level] = level;
            args[Protocol.guild_guild_set.args.auto] = auto;
            PLC.request(Protocol.guild_guild_set, args, function ($data, msg) {
                if (!$data)
                    return;
                var guildInfo = _this._model.guildInfo;
                var changeInfo = $data.guildInfo ? $data.guildInfo : {};
                if (changeInfo.hasOwnProperty('autoJoin')) {
                    guildInfo.autoJoin = changeInfo.autoJoin;
                }
                if (changeInfo.hasOwnProperty('limitLevel')) {
                    guildInfo.limitLevel = changeInfo.limitLevel;
                }
                UIMgr.hideUIByName(UIConst.GuildSetUpView);
                if (_this.guildInfoView) {
                    _this.guildInfoView.renderView();
                }
            });
        };
        /** 成员操作 */
        GuildHallProcessor.prototype.memberOperate = function (dataAry) {
            var type = dataAry[0];
            var data = dataAry[1];
            switch (type) {
                case game.GuildMemberOptType.zhuanrang_hz:
                case game.GuildMemberOptType.bamian_fhz:
                case game.GuildMemberOptType.renming_fhz:
                    this.appointMember(type, data);
                    break;
                case game.GuildMemberOptType.zhuchu_gh:
                    this.kickMember(data);
                    break;
                case game.GuildMemberOptType.cuanwei:
                    this.cuanwei(data);
                    break;
            }
        };
        /** 任命 */
        GuildHallProcessor.prototype.appointMember = function (type, data) {
            var _this = this;
            var jobKey = iface.tb_prop.guildJobTypeKey;
            if (type == game.GuildMemberOptType.renming_fhz && this._model.getMemberNum(jobKey.vicePresident) >= tb.TB_guild_set.getSet().vice_chairman_num) {
                showToast(LanMgr.getLan('', 10406, tb.TB_guild_set.getSet().vice_chairman_num));
                return;
            }
            var job = type == game.GuildMemberOptType.zhuanrang_hz ? jobKey.president : (type == game.GuildMemberOptType.renming_fhz ? jobKey.vicePresident : jobKey.member);
            var arg = {};
            arg[Protocol.guild_guild_appoint.args.playerId] = data.playerId;
            arg[Protocol.guild_guild_appoint.args.job] = job;
            PLC.request(Protocol.guild_guild_appoint, arg, function ($data, msg) {
                if (!$data)
                    return;
                data.job = job;
                if (type == game.GuildMemberOptType.zhuanrang_hz) {
                    _this._model.guildInfo.job = iface.tb_prop.guildJobTypeKey.member;
                    guildMemberChatSend("会长" + App.hero.name + "退位让贤，将会长职位传给了" + data.name);
                }
                _this.updateMemberList();
                common.AlertBox.close();
                UIMgr.hideUIByName(UIConst.GuildMemberSetView);
            });
        };
        /**踢出公会请求 */
        GuildHallProcessor.prototype.kickMember = function (info) {
            var _this = this;
            if (info) {
                var arg = {};
                arg[Protocol.guild_guild_quit.args.playerId] = info.playerId;
                PLC.request(Protocol.guild_guild_quit, arg, function ($data, msg) {
                    if (!$data)
                        return;
                    guildMemberChatSend("道不同不相为谋，会长将" + info.name + "踢出了公会。");
                    _this.updateMemberList();
                    common.AlertBox.close();
                    UIMgr.hideUIByName(UIConst.GuildMemberSetView);
                });
            }
        };
        /** 篡位 */
        GuildHallProcessor.prototype.cuanwei = function (info) {
            var _this = this;
            var guildInfo = this._model.guildInfo;
            var vicePresident = guildInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident;
            var day = vicePresident ? tb.TB_guild_set.getSet().usurper_time[0] : tb.TB_guild_set.getSet().usurper_time[1];
            var isOutTime = info.online != 1 && (App.serverTimeSecond - info.logoutTime) >= TimeConst.ONE_DAY_SEC * day;
            if (!isOutTime) {
                showToast(LanMgr.getLan('', vicePresident ? 10407 : 10408, day));
                return;
            }
            PLC.request(Protocol.guild_guild_guildUsurp, null, function ($data, msg) {
                if (!$data)
                    return;
                _this.updateMemberList();
                common.AlertBox.close();
                UIMgr.hideUIByName(UIConst.GuildMemberSetView);
            });
        };
        /** 公会信息界面更改公会图标 */
        GuildHallProcessor.prototype.changeGuildIcon = function ($data) {
            var _this = this;
            var args = {};
            args[Protocol.guild_guild_setHead.args.head] = $data.tbHead.ID;
            PLC.request(Protocol.guild_guild_setHead, args, function ($data, msg) {
                if (!$data) {
                    UIMgr.hideUIByName(UIConst.IconChangeView);
                    return;
                }
                UIMgr.hideUIByName(UIConst.IconChangeView);
                _this._model.guildInfo.head = $data.guildInfo.head;
                if (UIMgr.getUIByName(UIConst.GuildInfoView)) {
                    var guildInfoView = UIMgr.getUIByName(UIConst.GuildInfoView);
                    guildInfoView.updateIcon();
                }
            });
        };
        /** 招募 */
        GuildHallProcessor.prototype.onZhaomo = function (ary) {
            var _this = this;
            var level = ary[0];
            var auto = ary[1];
            var maxCount = tb.TB_guild_set.getSet().daily_recruit_num;
            var count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildRecruitNum);
            if (count >= maxCount) {
                showToast(LanMgr.getLan('', 10409));
                return;
            }
            var cost = tb.TB_guild_set.getSet().recruit_cost[count] || 0;
            var temptext = cost <= 0 ? LanMgr.getLan("", 10511) : LanMgr.getLan("", 10512, cost);
            var text = LanMgr.getLan("", 10513, temptext, maxCount - count);
            common.AlertBox.showAlert({
                text: text, confirmCb: function () {
                    if (cost > 0 && App.hero.diamond < cost) {
                        showToast(LanMgr.getLan('', 10005));
                        return;
                    }
                    var args = {};
                    args[Protocol.guild_guild_sendGuildRecruitNotice.args.level] = level;
                    args[Protocol.guild_guild_sendGuildRecruitNotice.args.auto] = auto;
                    PLC.request(Protocol.guild_guild_sendGuildRecruitNotice, args, function ($data, msg) {
                        if (!$data)
                            return;
                        showToast(LanMgr.getLan('', 10411));
                        var guildInfo = _this._model.guildInfo;
                        var changeInfo = $data.guildInfo ? $data.guildInfo : {};
                        if (changeInfo.hasOwnProperty('autoJoin')) {
                            guildInfo.autoJoin = changeInfo.autoJoin;
                        }
                        if (changeInfo.hasOwnProperty('limitLevel')) {
                            guildInfo.limitLevel = changeInfo.limitLevel;
                        }
                        if (_this.guildInfoView) {
                            _this.guildInfoView.renderView();
                        }
                    });
                }
            });
        };
        Object.defineProperty(GuildHallProcessor.prototype, "guildInfoView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GuildInfoView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuildHallProcessor.prototype, "guildApplyListView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GuildApplyListView);
            },
            enumerable: true,
            configurable: true
        });
        return GuildHallProcessor;
    }(tl3d.Processor));
    game.GuildHallProcessor = GuildHallProcessor;
})(game || (game = {}));
