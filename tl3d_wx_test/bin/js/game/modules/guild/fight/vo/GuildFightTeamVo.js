var game;
(function (game) {
    var GuildFightTeamVo = /** @class */ (function () {
        function GuildFightTeamVo(isMyTeam) {
            this.isMyTeam = isMyTeam;
            this._teamList = [];
        }
        /** 设置队伍信息 */
        GuildFightTeamVo.prototype.setTeamInfo = function (targetInfo) {
            if (!targetInfo) {
                this.teamSvo = targetInfo;
                this._teamList.length = 0;
                this.headVo = null;
                return;
            }
            if (this.teamSvo) {
                for (var key in targetInfo) {
                    this.teamSvo[key] = targetInfo[key];
                }
                for (var pid in targetInfo.memberInfo) {
                    var memberVo = this.getMember(pid);
                    if (memberVo) {
                        memberVo.setServerInfo(targetInfo.memberInfo[pid]);
                    }
                }
            }
            else {
                this.teamSvo = targetInfo;
                this._teamList.length = 0;
                for (var pid in targetInfo.memberInfo) {
                    var memberVo = new game.GuildFightMemberVo(this.isMyTeam);
                    memberVo.setServerInfo(targetInfo.memberInfo[pid]);
                    memberVo.svo.playerId = pid;
                    this._teamList.push(memberVo);
                }
                this.headVo = new GuildHeadVo(targetInfo.guildHead, targetInfo.guildLevel);
            }
            this._teamList.sort(function (a, b) {
                return b.sortNum - a.sortNum;
            });
        };
        GuildFightTeamVo.prototype.getTeamList = function () {
            return this._teamList;
        };
        /** 获取成员 */
        GuildFightTeamVo.prototype.getMember = function (playerId) {
            return this._teamList.find(function (vo) {
                return vo.svo.playerId == playerId;
            });
        };
        return GuildFightTeamVo;
    }());
    game.GuildFightTeamVo = GuildFightTeamVo;
})(game || (game = {}));
