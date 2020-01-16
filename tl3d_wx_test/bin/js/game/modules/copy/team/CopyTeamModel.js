/**
* TeamModel
*/
var game;
(function (game) {
    var CopyTeamModel = /** @class */ (function () {
        function CopyTeamModel() {
            this.leaderId = ""; //队长id
            this.teamAllForce = 0; //队伍总战力
            this.memberList = []; //成员列表
            this.initTeamTab();
        }
        CopyTeamModel.getInstance = function () {
            if (!CopyTeamModel._instance) {
                CopyTeamModel._instance = new CopyTeamModel();
            }
            return CopyTeamModel._instance;
        };
        //初始化数据表
        CopyTeamModel.prototype.initTeamTab = function () {
            this.teamTabObj = {};
            var $obj = TableData.getInstance().getTableByName(TableData.tb_team_copy);
            var chapter = 0;
            for (var $key in $obj.data) {
                chapter = Math.floor(Number($obj.data[$key]['copy']) / 10);
                if (!this.teamTabObj[chapter]) {
                    this.teamTabObj[chapter] = [];
                    this.MaxChapter = chapter;
                }
                this.teamTabObj[chapter].push($obj.data[$key]);
            }
        };
        CopyTeamModel.prototype.getTeamAryByChapter = function (chapter) {
            if (!this.teamTabObj)
                return null;
            return this.teamTabObj[chapter];
        };
        /** 是否有队伍 */
        CopyTeamModel.prototype.hasTeam = function () {
            return this.groupId && this.groupId != "";
        };
        CopyTeamModel.prototype.setTeamList = function (list) {
            this._teamList = [];
            var item = null;
            for (var i = 0; i < list.length; i++) {
                item = list[i];
                var team = new game.CopyTeamListVo();
                team.setSvo(list[i]);
                this._teamList.push(team);
            }
        };
        CopyTeamModel.prototype.getTeamList = function () {
            return this._teamList ? this._teamList : [];
        };
        CopyTeamModel.prototype.getLeaderName = function () {
            var _this = this;
            if (!this.memberList)
                return "";
            if (!this.leaderId || this.leaderId == "")
                return "";
            var vo = this.memberList.find(function (vo) {
                return vo.playerId == _this.leaderId;
            });
            if (!vo)
                return "";
            return vo.name;
        };
        CopyTeamModel.prototype.updateTeamInfo = function (myGroup, memberList) {
            if (!myGroup)
                return;
            var flag = 0;
            if (!this.hasTeam() && myGroup.groupCopyId) {
                //监听到加入新队伍
                flag = 1;
            }
            if (this.hasTeam() && !myGroup.groupCopyId) {
                //监听到退出队伍
                flag = 2;
            }
            if (this.hasTeam() && myGroup.groupCopyId && myGroup.groupCopyId !== this.groupId) {
                //监听到从一个队伍进入到另一个队伍
                flag = 3;
            }
            this.updateGroupState(myGroup);
            this.updateMemberList(memberList);
            if (flag == 1) {
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.DISEVT_JOIN_TEAM));
            }
            else if (flag == 2) {
                //清空各种列表
                this._applyList = [];
                this._inviteList = [];
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_APPLY_RP));
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.DISEVT_EXIT_TEAM));
            }
            else if (flag == 3) {
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM));
            }
        };
        CopyTeamModel.prototype.initGroupData = function (myGroup) {
            if (!myGroup)
                return;
            this.myFloor = Number(myGroup.groupCopyFloor);
            this.groupId = myGroup.groupCopyId || "";
            this.groupCopyChapterAward = myGroup.groupCopyChapterAward;
            if (this.hasTeam()) {
                //初始化申请列表的数据
                game.CopyTeamThread.getInstance().getApplyList();
            }
        };
        CopyTeamModel.prototype.updateGroupState = function (myGroup) {
            if (!myGroup)
                return;
            this.myFloor = Number(myGroup.groupCopyFloor);
            var temp = this.captainFloor;
            this.captainFloor = Number(myGroup.captainCopyFloor) || 0;
            this.groupId = myGroup.groupCopyId;
            if (this.captainFloor != temp) {
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_TEAM_FLOOR));
            }
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_GROUP_INFO));
        };
        CopyTeamModel.prototype.delMember = function (delMemberId) {
            if (!delMemberId || delMemberId == "")
                return;
            if (!this.memberList)
                return;
            var delidx = this.memberList.findIndex(function (vo) {
                return vo.playerId == delMemberId;
            });
            if (delidx == -1)
                return;
            this.memberList.splice(delidx, 1);
        };
        CopyTeamModel.prototype.updateMemberList = function (memberList) {
            this.memberList = memberList || [];
            this.teamAllForce = 0;
            this.leaderId = "";
            var item = null;
            for (var key in this.memberList) {
                item = this.memberList[key];
                if (!item)
                    continue;
                if (Number(item.job) == iface.tb_prop.groupJobTypeKey.captain) {
                    this.leaderId = item.playerId;
                }
                this.teamAllForce += item.force;
            }
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST));
        };
        CopyTeamModel.prototype.setInviteList = function (data) {
            this._inviteList = data || [];
        };
        CopyTeamModel.prototype.getInviteList = function () {
            return this._inviteList || [];
        };
        CopyTeamModel.prototype.setApplyList = function (data) {
            this._applyList = data || [];
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_APPLY_RP));
        };
        CopyTeamModel.prototype.getApplyList = function () {
            return this._applyList || [];
        };
        CopyTeamModel.prototype.hasApplyRedPoint = function () {
            if (!this._applyList)
                return false;
            return this.hasTeam() && this._applyList.length > 0;
        };
        CopyTeamModel.prototype.clearApplyList = function (delList) {
            var keystr = null, delIdx = -1;
            while (delList && delList.length > 0) {
                keystr = delList.shift();
                delIdx = this._applyList.findIndex(function (vo) {
                    return vo.playerId == keystr;
                });
                if (delIdx != -1) {
                    this._applyList.splice(delIdx, 1);
                }
            }
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_APPLY_RP));
        };
        CopyTeamModel.prototype.getNextId = function (curid) {
            var tabs = TableData.getInstance().getTableByName(TableData.tb_team_copy);
            var keys = Object.keys(tabs.data);
            return Math.min(keys.length, curid + 1);
        };
        CopyTeamModel.prototype.getMyNextId = function () {
            return this.getNextId(this.myFloor);
        };
        CopyTeamModel.prototype.IsLeader = function () {
            return this.leaderId === App.hero.playerId;
        };
        CopyTeamModel.prototype.getTeamAllForce = function () {
            return this.teamAllForce;
        };
        CopyTeamModel.prototype.getMemberById = function (id) {
            var item = null;
            for (var key in this.memberList) {
                item = this.memberList[key];
                if (!item)
                    continue;
                if (Number(item.pos) == id) {
                    return item;
                }
            }
            return { pos: id, playerId: null };
        };
        CopyTeamModel.prototype.swapMember = function (data) {
            if (!data)
                return;
            var item = null, idx = -1;
            for (var key in this.memberList) {
                item = this.memberList[key];
                if (!item)
                    continue;
                idx = data.indexOf(item.pos);
                if (idx != -1) {
                    idx = (idx + 1) % 2;
                    item.pos = data[idx];
                }
            }
        };
        CopyTeamModel.prototype.getRewardList = function (sort) {
            if (sort === void 0) { sort = false; }
            if (!this._rewardList) {
                this._rewardList = [];
                var list = tb.TB_team_target.getList();
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var tbData = list_1[_i];
                    this._rewardList.push(new game.CopyRewardVo(tbData));
                }
            }
            if (sort) {
                // 按照可领取、未完成、已领取顺序排列
                this._rewardList.forEach(function (vo) {
                    vo.sortNum = vo.isCanReward() ? vo.tbData.ID : (!vo.isFinish() ? vo.tbData.ID + 1000 : vo.tbData.ID + 10000);
                });
                this._rewardList.sort(function (a, b) {
                    return a.sortNum - b.sortNum;
                });
            }
            return this._rewardList;
        };
        /** 是否可领取通关奖励 */
        CopyTeamModel.prototype.isCanReward = function () {
            var list = this.getRewardList();
            return list.some(function (vo) { return vo.isCanReward(); });
        };
        /**
         * 获得其他成员列表
         */
        CopyTeamModel.prototype.getOtherMembers = function () {
            if (!this.memberList) {
                return [];
            }
            var ary = [];
            for (var key in this.memberList) {
                if (this.memberList[key].playerId != App.hero.playerId) {
                    ary.push(this.memberList[key]);
                }
            }
            return ary;
        };
        return CopyTeamModel;
    }());
    game.CopyTeamModel = CopyTeamModel;
})(game || (game = {}));
