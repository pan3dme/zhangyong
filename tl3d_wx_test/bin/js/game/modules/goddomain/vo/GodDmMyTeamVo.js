var game;
(function (game) {
    /** 队伍 */
    var GodDmMyTeamVo = /** @class */ (function () {
        function GodDmMyTeamVo() {
            this.isChange = false; // 队长更换人选
            this.autoStartTime = 0;
            this._selfcamp = -1;
            this._memberList = [];
            for (var i = 1; i <= 3; i++) {
                this._memberList.push(new game.GodDmMemberVo(i));
            }
            this.clearTeamData();
        }
        /** 初始化队伍 */
        GodDmMyTeamVo.prototype.updateData = function (memberList) {
            var oldReady = this.isAllReady();
            var oldCaptain = this.getCaptain();
            // 旧队长id
            var oldUid = oldCaptain ? oldCaptain.svo.playerId : "";
            // 新队长id
            var curUid;
            var _loop_1 = function (i) {
                var chgMember = memberList.find(function (vo) {
                    return vo.pos == i;
                });
                var curMember = this_1.getMemberByPos(i);
                curMember.updateData(chgMember);
                if (chgMember && chgMember.job == iface.tb_prop.groupJobTypeKey.captain) {
                    curUid = chgMember.playerId;
                }
            };
            var this_1 = this;
            for (var i = 1; i <= 3; i++) {
                _loop_1(i);
            }
            this.isChange = oldUid != curUid;
            var newReady = this.isAllReady();
            if (!oldReady && newReady) {
                // 从未准备到全部准备
                this.autoStartTime = Math.floor(App.serverTimeSecond) + 30;
            }
            else if (oldReady && !newReady) {
                // 从全部准备到未准备
                this.autoStartTime = 0;
            }
            if (oldReady && newReady && this.isChange) {
                // 队长更换人选并且全部准备下重置
                this.autoStartTime = Math.floor(App.serverTimeSecond) + 30;
            }
        };
        /** 离开队伍 */
        GodDmMyTeamVo.prototype.clearTeamData = function () {
            this.rewardAdd = 0;
            this.regTime = 0;
            this.autoStartTime = 0;
            this.autoJoin = iface.tb_prop.groupJoinTypeKey.no;
            for (var _i = 0, _a = this._memberList; _i < _a.length; _i++) {
                var vo = _a[_i];
                vo.clearVo();
            }
        };
        /** 新增成员 */
        GodDmMyTeamVo.prototype.addMember = function (svo) {
            var memberVo = this.getMemberByPos(svo.pos);
            memberVo.updateData(svo);
        };
        /** 移除成员 */
        GodDmMyTeamVo.prototype.removeMember = function (playerId) {
            var member = this._memberList.find(function (vo) {
                return vo.isExist() && vo.svo.playerId == playerId;
            });
            if (member) {
                member.clearVo();
            }
        };
        /** 对换 */
        GodDmMyTeamVo.prototype.swapMember = function (src, tar) {
            var srcVo = JSON.parse(JSON.stringify(src.svo));
            var tarVo = tar.isExist() ? JSON.parse(JSON.stringify(tar.svo)) : null;
            tar.updateData(srcVo);
            src.updateData(tarVo);
        };
        /** 移交队长 */
        GodDmMyTeamVo.prototype.appointMember = function (appointId) {
            var captain = this.getCaptain();
            var member = this.getMemberByUId(appointId);
            if (captain && member) {
                captain.svo.job = iface.tb_prop.groupJobTypeKey.member;
                member.svo.job = iface.tb_prop.groupJobTypeKey.captain;
            }
        };
        /** 获取成员列表 */
        GodDmMyTeamVo.prototype.getMemberList = function () {
            return this._memberList;
        };
        /** 获取位置上的队员 */
        GodDmMyTeamVo.prototype.getMemberByPos = function (pos) {
            return this._memberList.find(function (vo) {
                return vo.pos == pos;
            });
        };
        /** 获取队员 */
        GodDmMyTeamVo.prototype.getMemberByUId = function (uuid) {
            return this._memberList.find(function (vo) {
                return vo.isExist() && vo.svo.playerId == uuid;
            });
        };
        /** 获取队长信息 */
        GodDmMyTeamVo.prototype.getCaptain = function () {
            return this._memberList.find(function (vo) {
                return vo.isCaptain();
            });
        };
        GodDmMyTeamVo.prototype.getSelfInfo = function () {
            return this._memberList.find(function (vo) {
                return vo.isSelf();
            });
        };
        /** 获取成员数量 */
        GodDmMyTeamVo.prototype.getMemberCount = function () {
            var num = 0;
            for (var _i = 0, _a = this._memberList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.isExist()) {
                    num++;
                }
            }
            return num;
        };
        /** 获取最新的准备时间 */
        GodDmMyTeamVo.prototype.getMaxReadyTime = function () {
            var time = 0;
            for (var _i = 0, _a = this._memberList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.isExist() && vo.svo.readyTime > time) {
                    time = vo.svo.readyTime;
                }
            }
            return time;
        };
        /** 是否全员准备 */
        GodDmMyTeamVo.prototype.isAllReady = function () {
            return this._memberList.every(function (vo) {
                return vo.isReady();
            });
        };
        /** 是否全是真人 */
        GodDmMyTeamVo.prototype.isAllRealPerson = function () {
            return this._memberList.every(function (vo) {
                return vo.isExist() && !vo.isRobot();
            });
        };
        /** 自己是否队长 */
        GodDmMyTeamVo.prototype.isCaptain = function () {
            return this.getSelfInfo().isCaptain();
        };
        /** 是否自动加入 */
        GodDmMyTeamVo.prototype.isAutoJoin = function () {
            return this.autoJoin == iface.tb_prop.groupJoinTypeKey.yes;
        };
        GodDmMyTeamVo.prototype.setBattleMemberInfo = function (leftInfo, rightInfo, waveResults, winCamp) {
            this.leftInfo = leftInfo.map(function (ary) {
                return { playerId: ary[0], name: ary[1], head: ary[2] || 0, level: ary[3] || 1, force: ary[4] || 0, godId: ary[5] || 0, awakenlv: ary[6], skinId: ary[7], headFrame: ary[8] };
            });
            this.rightInfo = rightInfo.map(function (ary) {
                return { playerId: ary[0], name: ary[1], head: ary[2] || 0, level: ary[3] || 1, force: ary[4] || 0, godId: ary[5] || 0, awakenlv: ary[6], skinId: ary[7], headFrame: ary[8] };
            });
            this.waveResults = waveResults;
            this.winCamp = winCamp;
            this._selfcamp = -1;
            this._fightTeamList = null;
        };
        /**
         * 获得指定轮次的对战双方
         * @param wave
         */
        GodDmMyTeamVo.prototype.getFightTeams = function (wave) {
            if (!this._fightTeamList) {
                var left = 0;
                var right = 0;
                var curleft = 0;
                var curright = 0;
                var leftTotal = 0;
                var rightTotal = 0;
                var leftResult = this.waveResults[battle.BatteConsts.BATTLE_CAMPATK];
                var ary = [[0, 0]];
                while (leftTotal < 4 && rightTotal < 4) {
                    if (leftResult[left] > curleft) {
                        curright = 0;
                        curleft++;
                        leftTotal++;
                        right++;
                    }
                    else {
                        curleft = 0;
                        curright++;
                        rightTotal++;
                        left++;
                    }
                    ary.push([left, right]);
                }
                this._fightTeamList = ary;
            }
            return this._fightTeamList[wave];
        };
        GodDmMyTeamVo.prototype.getSelfCamp = function () {
            if (this._selfcamp != -1) {
                return this._selfcamp;
            }
            var leftvo = this.leftInfo.find(function (vo) {
                return vo.playerId == App.hero.playerId;
            });
            this._selfcamp = battle.BatteConsts.BATTLE_CAMPATK;
            if (!leftvo) {
                this._selfcamp = battle.BatteConsts.BATTLE_CAMPDEF;
            }
            return this._selfcamp;
        };
        return GodDmMyTeamVo;
    }());
    game.GodDmMyTeamVo = GodDmMyTeamVo;
})(game || (game = {}));
