/**
* name
*/
var game;
(function (game) {
    var GuildModel = /** @class */ (function () {
        function GuildModel() {
            /** 是否初始化 */
            this._isInited = false;
            /**  创建时初始化图标 */
            this._createInitIconID = 1;
            // --------------- 缓存申请列表 -------------------
            this.hasNewApply = false;
            // --------------- 捐献 -------------------
            /** 捐献列表 */
            this._donationList = [];
        }
        GuildModel.getInstance = function () {
            if (!GuildModel._instance) {
                GuildModel._instance = new GuildModel();
            }
            return GuildModel._instance;
        };
        GuildModel.prototype.initModel = function () {
            if (!App.IsSysOpen(ModuleConst.GONGHUI))
                return;
            this.checkGuildExist(true);
        };
        /** 初始化数据一次:有公会才初始化 */
        GuildModel.prototype.initData = function () {
            if (!this.isHasGuild() || this._isInited)
                return;
            this._isInited = true;
            this._donationList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_guild_donate).data;
            for (var key in tbData) {
                this._donationList.push(new game.GuildDonationVo(tbData[key]));
            }
            game.GuildCopyModel.getInstance().initModel();
            game.GuildSkillModel.getInstance().initModel();
            game.GuildFightModel.getInstance().initModel();
            game.GuildHelpModel.getInstance().initModel();
        };
        Object.defineProperty(GuildModel.prototype, "createInitIconID", {
            get: function () {
                return this._createInitIconID;
            },
            set: function ($value) {
                this._createInitIconID = $value;
            },
            enumerable: true,
            configurable: true
        });
        /**　将图标数据从表中取出 */
        GuildModel.prototype.getIconList = function () {
            if (!this._iconList) {
                this._iconList = [];
                var ary = tb.TB_guild_icon.get_TB_guild_icon();
                for (var i = 0; i < ary.length; i++) {
                    this._iconList.push(new game.IconVo(ary[i]));
                }
            }
            return this._iconList;
        };
        /** 通过headID获取Icon */
        GuildModel.prototype.getIcon = function (id) {
            var ary = tb.TB_guild_icon.get_TB_guild_icon();
            for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                var obj = ary_1[_i];
                if (obj.ID == id) {
                    return new game.IconVo(obj);
                }
            }
            return new game.IconVo(ary[0]);
        };
        /** 更新公会信息 */
        GuildModel.prototype.updateGuildInfo = function (info) {
            this.guildInfo = info;
            App.hero.guildName = info ? info.name : "";
            App.hero.guildId = info ? info.guildId : "";
            App.hero.guildExp = info ? info.exp : 0;
            this.initData();
            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_GUILD_INFO));
        };
        GuildModel.prototype.updateGuildExp = function (exp) {
            if (this.guildInfo) {
                this.guildInfo.exp = exp;
            }
        };
        /** 重新请求公会最新数据 */
        GuildModel.prototype.checkGuildExist = function (request) {
            return new Promise(function (resolve) {
                if (request) {
                    PLC.request(Protocol.guild_guild_info, null, function ($data, msg) {
                        GuildModel.getInstance().updateGuildInfo($data ? $data.guildInfo : null);
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        };
        /** 是否有公会 */
        GuildModel.prototype.isHasGuild = function () {
            return App.hero.guildId && App.hero.guildId != "";
        };
        GuildModel.prototype.setMemberList = function (list) {
            this._memberList = list;
            var selfInfo = this._memberList.find(function (vo) {
                return vo.playerId == App.hero.playerId;
            });
            if (selfInfo) {
                this.guildInfo.job = selfInfo.job;
            }
        };
        GuildModel.prototype.getMemberList = function (sort) {
            if (sort === void 0) { sort = false; }
            var list = this._memberList || [];
            if (sort) {
                // 优先按照在线不在线排序 在线按照职位，然后再按照神力 不在线按照离线时间排序
                list.sort(function (a, b) {
                    if (a.online == 1 && b.online == 1) {
                        var aNum = a.job == iface.tb_prop.guildJobTypeKey.president ? 0 : (a.job == iface.tb_prop.guildJobTypeKey.vicePresident ? 1 : 2);
                        var bNum = b.job == iface.tb_prop.guildJobTypeKey.president ? 0 : (b.job == iface.tb_prop.guildJobTypeKey.vicePresident ? 1 : 2);
                        return aNum != bNum ? (aNum - bNum) : (b.force - a.force);
                    }
                    else if (a.online == 1) {
                        return -1;
                    }
                    else if (b.online == 1) {
                        return 1;
                    }
                    else {
                        return b.logoutTime - a.logoutTime;
                    }
                });
            }
            return list;
        };
        /** 获取公会职位的成员数量 */
        GuildModel.prototype.getMemberNum = function (jobType) {
            if (jobType == 0)
                return this._memberList.length;
            var list = this._memberList.filter(function (vo) {
                return vo.job == jobType;
            });
            return list.length;
        };
        GuildModel.prototype.updateNewApply = function (flag) {
            this.hasNewApply = flag;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_APPLY_INFO));
        };
        GuildModel.prototype.setApplyList = function (list) {
            this.hasNewApply = false;
            this._applyList = list;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_APPLY_INFO));
        };
        GuildModel.prototype.getApplyList = function () {
            return this._applyList ? this._applyList : [];
        };
        GuildModel.prototype.isHasNewApply = function () {
            return this.hasNewApply || this.getApplyList().length > 0;
        };
        // --------------- 缓存公会列表 -------------------
        GuildModel.prototype.requestGuildList = function () {
            var _this = this;
            return new Promise(function (resolve) {
                PLC.request(Protocol.guild_guild_list, null, function ($data) {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    _this.setGuildList($data.guildList);
                    resolve();
                });
            });
        };
        GuildModel.prototype.setGuildList = function (list) {
            this._guildList = list;
        };
        GuildModel.prototype.getGuildList = function () {
            return this._guildList ? this._guildList : [];
        };
        GuildModel.prototype.getDonationList = function () {
            return this._donationList;
        };
        /** 是否可捐献 */
        GuildModel.prototype.isCanDonate = function () {
            return this.isHasGuild() && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate) == 0;
        };
        /** 是否管理者： 会长和副会长 */
        GuildModel.prototype.isController = function () {
            return this.guildInfo ? [iface.tb_prop.guildJobTypeKey.president, iface.tb_prop.guildJobTypeKey.vicePresident].indexOf(this.guildInfo.job) != -1 : false;
        };
        return GuildModel;
    }());
    game.GuildModel = GuildModel;
})(game || (game = {}));
