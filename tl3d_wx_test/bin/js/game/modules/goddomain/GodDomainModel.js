var game;
(function (game) {
    var GodDomainModel = /** @class */ (function () {
        function GodDomainModel() {
            this.score = 0; // 神域积分
            this.myRank = 0;
            this.oneKeyInviteCd = 0; // 一键邀请cd
            this.matchTime = 0; // 自动匹配时间
        }
        GodDomainModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new GodDomainModel();
            }
            return this._instance;
        };
        GodDomainModel.prototype.initModel = function () {
            this.myTeam = new game.GodDmMyTeamVo();
            this.doubleTimeStr = "";
            var time = tb.TB_fight_goddomain_set.getSet().double_time;
            for (var i = 0; i < time.length; i++) {
                var ary = time[i];
                this.doubleTimeStr += ary[0] + ":00-" + ary[1] + ":00";
                if (i != time.length - 1) {
                    this.doubleTimeStr += "     ";
                }
            }
        };
        GodDomainModel.prototype.updateTeamInfo = function (myGroup, memberList) {
            this.groupId = myGroup['groupId'];
            if (myGroup.hasOwnProperty('godDmScore')) {
                this.score = myGroup['godDmScore'];
            }
            if (myGroup.hasOwnProperty('myRank')) {
                this.myRank = myGroup['myRank'];
            }
            if (myGroup.hasOwnProperty('autoJoin')) {
                this.myTeam.autoJoin = myGroup['autoJoin'];
            }
            if (myGroup.hasOwnProperty('rewardAdd')) {
                this.myTeam.rewardAdd = myGroup['rewardAdd'];
            }
            if (myGroup.hasOwnProperty('regTime')) {
                this.myTeam.regTime = myGroup['regTime'];
            }
            this.myTeam.updateData(memberList ? memberList : []);
        };
        GodDomainModel.prototype.resetGroupId = function () {
            this.groupId = "";
        };
        GodDomainModel.prototype.setTeamList = function (list) {
            if (this._teamList) {
                for (var _i = 0, _a = this._teamList; _i < _a.length; _i++) {
                    var team = _a[_i];
                    Laya.Pool.recover(game.PoolConst.TeamListVo, team);
                }
            }
            this._teamList = [];
            for (var i = 0; i < list.length; i++) {
                var team = Laya.Pool.getItemByClass(game.PoolConst.TeamListVo, game.GodDmTeamListVo);
                team.setSvo(list[i]);
                this._teamList.push(team);
            }
        };
        GodDomainModel.prototype.getTeamList = function () {
            return this._teamList ? this._teamList : [];
        };
        GodDomainModel.prototype.setInviteList = function (list) {
            if (this._inviteList) {
                for (var _i = 0, _a = this._inviteList; _i < _a.length; _i++) {
                    var team = _a[_i];
                    Laya.Pool.recover(game.PoolConst.InviteInfoVo, team);
                }
            }
            this._inviteList = [];
            for (var i = 0; i < list.length; i++) {
                var team = Laya.Pool.getItemByClass(game.PoolConst.InviteInfoVo, game.GodDmInviteVo);
                team.setSvo(list[i]);
                this._inviteList.push(team);
            }
        };
        GodDomainModel.prototype.getInviteList = function () {
            return this._inviteList ? this._inviteList : [];
        };
        /** 是否有队伍 */
        GodDomainModel.prototype.hasTeam = function () {
            return this.groupId && this.groupId != "";
        };
        /** 是否在双倍时间内 */
        GodDomainModel.prototype.isInDoubleTime = function () {
            var date = new Date(App.serverTime);
            var hour = date.getHours();
            var time = tb.TB_fight_goddomain_set.getSet().double_time;
            return time.some(function (ary) {
                return hour >= ary[0] && hour < ary[1];
            });
        };
        /** 获取购买次数花费的钻石数量 */
        GodDomainModel.prototype.getBuyCost = function () {
            var set = tb.TB_fight_goddomain_set.getSet();
            var costAry = set.buy_cost;
            var count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGodDmRewardNum);
            if (count >= costAry.length) {
                return costAry[costAry.length - 1];
            }
            else {
                return costAry[count];
            }
        };
        /** 可挑战红点 */
        GodDomainModel.prototype.challengeRp = function () {
            if (!this.isOpen())
                return false;
            var isDouble = this.isInDoubleTime();
            var isEend = false;
            if (!isDouble) {
                var date = new Date(App.serverTime);
                var hour_1 = date.getHours();
                var time = tb.TB_fight_goddomain_set.getSet().double_time;
                isEend = time.every(function (ary) {
                    return hour_1 >= ary[0] && hour_1 >= ary[1];
                });
            }
            return this.isOpen() && (isDouble || isEend) && App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) > 0;
        };
        /** 是否开启 */
        GodDomainModel.prototype.isOpen = function () {
            return App.IsSysOpen(ModuleConst.GOD_DOMAIN);
        };
        return GodDomainModel;
    }());
    game.GodDomainModel = GodDomainModel;
})(game || (game = {}));
