/**
* TeamModel
*/
module game {
	export class CopyTeamModel {
		private static _instance: CopyTeamModel;
		static getInstance(): CopyTeamModel {
			if (!CopyTeamModel._instance) {
				CopyTeamModel._instance = new CopyTeamModel();
			}
			return CopyTeamModel._instance;
		}

		constructor() {
			this.initTeamTab();
		}

		public MaxChapter: number;
		public teamTabObj;
		//初始化数据表
		private initTeamTab() {
			this.teamTabObj = {};
			var $obj: any = TableData.getInstance().getTableByName(TableData.tb_team_copy);
			let chapter = 0;
			for (var $key in $obj.data) {
				chapter = Math.floor(Number($obj.data[$key]['copy']) / 10);
				if (!this.teamTabObj[chapter]) {
					this.teamTabObj[chapter] = [];
					this.MaxChapter = chapter;
				}
				this.teamTabObj[chapter].push($obj.data[$key]);
			}
		}

		getTeamAryByChapter(chapter: number) {
			if (!this.teamTabObj) return null;
			return this.teamTabObj[chapter];
		}

		/** 是否有队伍 */
		public hasTeam(): boolean {
			return this.groupId && this.groupId != "";
		}

		/** 队伍列表 */
		private _teamList: CopyTeamListVo[];
		setTeamList(list: any[]): void {
			this._teamList = [];
			let item = null;
			for (let i = 0; i < list.length; i++) {
				item = list[i];

				let team = new CopyTeamListVo();
				team.setSvo(list[i]);
				this._teamList.push(team);
			}
		}
		getTeamList(): CopyTeamListVo[] {
			return this._teamList ? this._teamList : [];
		}

		getLeaderName() {
			if (!this.memberList) return "";
			if (!this.leaderId || this.leaderId == "") return "";
			let vo = this.memberList.find((vo) => {
				return vo.playerId == this.leaderId;
			});
			if (!vo) return "";
			return vo.name;
		}

		public groupId: string;    // 队伍id
		public groupCopyChapterAward: number[];    // [1,2,3]
		public myFloor: number;    // 我的最高通关层id(表tb_team_copy的id)
		public captainFloor: number;    // 队长的最高通关层id(表tb_team_copy的id)
		public leaderId: string = "";//队长id
		public teamAllForce: number = 0;//队伍总战力
		public memberList: Array<any> = [];//成员列表
		public updateTeamInfo(myGroup: any, memberList: any[]): void {
			if (!myGroup) return;
			let flag = 0;
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
				dispatchEvt(new CopyTeamEvent(CopyTeamEvent.DISEVT_JOIN_TEAM));
			} else if (flag == 2) {
				//清空各种列表
				this._applyList = [];
				this._inviteList = [];
				dispatchEvt(new CopyTeamEvent(CopyTeamEvent.UPDATE_APPLY_RP));
				dispatchEvt(new CopyTeamEvent(CopyTeamEvent.DISEVT_EXIT_TEAM));
			} else if (flag == 3) {
				dispatchEvt(new CopyTeamEvent(CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM));
			}
		}

		initGroupData(myGroup: any) {
			if (!myGroup) return;
			this.myFloor = Number(myGroup.groupCopyFloor);
			this.groupId = myGroup.groupCopyId || "";
			this.groupCopyChapterAward = myGroup.groupCopyChapterAward;

			if (this.hasTeam()) {
				//初始化申请列表的数据
				game.CopyTeamThread.getInstance().getApplyList();
			}
		}

		updateGroupState(myGroup: any) {
			if (!myGroup) return;
			this.myFloor = Number(myGroup.groupCopyFloor);
			let temp = this.captainFloor;
			this.captainFloor = Number(myGroup.captainCopyFloor) || 0;
			this.groupId = myGroup.groupCopyId;
			if(this.captainFloor != temp){
				dispatchEvt(new CopyTeamEvent(CopyTeamEvent.UPDATE_TEAM_FLOOR));
			}
			dispatchEvt(new CopyTeamEvent(CopyTeamEvent.UPDATE_GROUP_INFO));
		}

		delMember(delMemberId: string) {
			if (!delMemberId || delMemberId == "") return;
			if (!this.memberList) return;
			let delidx = this.memberList.findIndex((vo) => {
				return vo.playerId == delMemberId;
			});

			if (delidx == -1) return;
			this.memberList.splice(delidx, 1);
		}

		updateMemberList(memberList: any[]) {
			this.memberList = memberList || [];
			this.teamAllForce = 0;
			this.leaderId = "";
			let item = null;
			for (var key in this.memberList) {
				item = this.memberList[key];
				if (!item) continue;
				if (Number(item.job) == iface.tb_prop.groupJobTypeKey.captain) {
					this.leaderId = item.playerId;
				}
				this.teamAllForce += item.force;
			}

			dispatchEvt(new CopyTeamEvent(CopyTeamEvent.UPDATE_MEMBERLIST));
		}

		private _inviteList: any[];
		setInviteList(data) {
			this._inviteList = data || [];
		}

		getInviteList() {
			return this._inviteList || [];
		}

		private _applyList: any[];
		setApplyList(data) {
			this._applyList = data || [];
			dispatchEvt(new CopyTeamEvent(CopyTeamEvent.UPDATE_APPLY_RP));
		}

		getApplyList() {
			return this._applyList || [];
		}

		hasApplyRedPoint() {
			if (!this._applyList) return false;
			return this.hasTeam() && this._applyList.length > 0;
		}

		clearApplyList(delList: Array<string>) {
			let keystr = null, delIdx = -1;
			while (delList && delList.length > 0) {
				keystr = delList.shift();
				delIdx = this._applyList.findIndex((vo) => {
					return vo.playerId == keystr;
				});
				if (delIdx != -1) {
					this._applyList.splice(delIdx, 1);
				}
			}

			dispatchEvt(new CopyTeamEvent(CopyTeamEvent.UPDATE_APPLY_RP));
		}

		getNextId(curid: number): number {
			let tabs = TableData.getInstance().getTableByName(TableData.tb_team_copy);
			let keys = Object.keys(tabs.data);
			return Math.min(keys.length, curid + 1);
		}

		getMyNextId(): number {
			return this.getNextId(this.myFloor);
		}

		IsLeader(): boolean {
			return this.leaderId === App.hero.playerId
		}

		getTeamAllForce(): number {
			return this.teamAllForce;
		}


		getMemberById(id) {
			let item = null;
			for (var key in this.memberList) {
				item = this.memberList[key];
				if (!item) continue;
				if (Number(item.pos) == id) {
					return item;
				}
			}
			return { pos: id, playerId: null };
		}

		swapMember(data: Array<number>) {
			if (!data) return;
			let item = null, idx: number = -1;
			for (var key in this.memberList) {
				item = this.memberList[key];
				if (!item) continue;
				idx = data.indexOf(item.pos);
				if (idx != -1) {
					idx = (idx + 1) % 2
					item.pos = data[idx];
				}
			}
		}

		// ---------- 奖励列表 ----------
		private _rewardList: CopyRewardVo[];
		getRewardList(sort: boolean = false): CopyRewardVo[] {
			if (!this._rewardList) {
				this._rewardList = [];
				let list = tb.TB_team_target.getList();
				for (let tbData of list) {
					this._rewardList.push(new CopyRewardVo(tbData));
				}
			}
			if (sort) {
				// 按照可领取、未完成、已领取顺序排列
				this._rewardList.forEach((vo) => {
					vo.sortNum = vo.isCanReward() ? vo.tbData.ID : (!vo.isFinish() ? vo.tbData.ID + 1000 : vo.tbData.ID + 10000);
				});
				this._rewardList.sort((a, b) => {
					return a.sortNum - b.sortNum;
				});
			}
			return this._rewardList;
		}
		/** 是否可领取通关奖励 */
		isCanReward(): boolean {
			let list = this.getRewardList();
			return list.some(vo => vo.isCanReward());
		}

		/**
		 * 获得其他成员列表
		 */
		getOtherMembers() {
			if (!this.memberList) {
				return [];
			}

			let ary = [];
			for (var key in this.memberList) {
				if (this.memberList[key].playerId != App.hero.playerId) {
					ary.push(this.memberList[key]);
				}
			}
			return ary;
		}

	}
}