

module game {
    /** 队伍 */
    export class GodDmMyTeamVo {

        private _memberList: GodDmMemberVo[];
        public rewardAdd: number;     // 总加成（100+额外奖励加成）
        public autoJoin: number;   // 自动加入
        public regTime: number;    // 开始匹配时间

        constructor() {
            this._memberList = [];
            for (let i = 1; i <= 3; i++) {
                this._memberList.push(new GodDmMemberVo(i));
            }
            this.clearTeamData();
        }

        public isChange: boolean = false;  // 队长更换人选
        public autoStartTime: number = 0;
        /** 初始化队伍 */
        updateData(memberList: IMemberVo[]): void {
            let oldReady: boolean = this.isAllReady();
            let oldCaptain = this.getCaptain();
            // 旧队长id
            let oldUid = oldCaptain ? oldCaptain.svo.playerId : "";
            // 新队长id
            let curUid;
            for (let i = 1; i <= 3; i++) {
                let chgMember = memberList.find((vo) => {
                    return vo.pos == i;
                });
                let curMember = this.getMemberByPos(i);
                curMember.updateData(chgMember);
                if (chgMember && chgMember.job == iface.tb_prop.groupJobTypeKey.captain) {
                    curUid = chgMember.playerId;
                }
            }
            this.isChange = oldUid != curUid;
            let newReady = this.isAllReady();
            if (!oldReady && newReady) {
                // 从未准备到全部准备
                this.autoStartTime = Math.floor(App.serverTimeSecond) + 30;
            } else if (oldReady && !newReady) {
                // 从全部准备到未准备
                this.autoStartTime = 0
            } if (oldReady && newReady && this.isChange) {
                // 队长更换人选并且全部准备下重置
                this.autoStartTime = Math.floor(App.serverTimeSecond) + 30;
            }
        }

        /** 离开队伍 */
        clearTeamData(): void {
            this.rewardAdd = 0;
            this.regTime = 0;
            this.autoStartTime = 0;
            this.autoJoin = iface.tb_prop.groupJoinTypeKey.no;
            for (let vo of this._memberList) {
                vo.clearVo();
            }
        }

        /** 新增成员 */
        addMember(svo: IMemberVo): void {
            let memberVo = this.getMemberByPos(svo.pos);
            memberVo.updateData(svo);
        }

        /** 移除成员 */
        removeMember(playerId: string): void {
            let member = this._memberList.find((vo) => {
                return vo.isExist() && vo.svo.playerId == playerId;
            });
            if (member) {
                member.clearVo();
            }
        }
        /** 对换 */
        swapMember(src: GodDmMemberVo, tar: GodDmMemberVo): void {
            let srcVo = JSON.parse(JSON.stringify(src.svo));
            let tarVo = tar.isExist() ? JSON.parse(JSON.stringify(tar.svo)) : null;
            tar.updateData(srcVo);
            src.updateData(tarVo);
        }
        /** 移交队长 */
        appointMember(appointId: string): void {
            let captain = this.getCaptain();
            let member = this.getMemberByUId(appointId);
            if (captain && member) {
                captain.svo.job = iface.tb_prop.groupJobTypeKey.member;
                member.svo.job = iface.tb_prop.groupJobTypeKey.captain;
            }
        }

        /** 获取成员列表 */
        getMemberList(): GodDmMemberVo[] {
            return this._memberList;
        }
        /** 获取位置上的队员 */
        getMemberByPos(pos: number): GodDmMemberVo {
            return this._memberList.find((vo) => {
                return vo.pos == pos;
            });
        }
        /** 获取队员 */
        getMemberByUId(uuid: string): GodDmMemberVo {
            return this._memberList.find((vo) => {
                return vo.isExist() && vo.svo.playerId == uuid;
            });
        }
        /** 获取队长信息 */
        getCaptain(): GodDmMemberVo {
            return this._memberList.find((vo) => {
                return vo.isCaptain();
            });
        }
        getSelfInfo(): GodDmMemberVo {
            return this._memberList.find((vo) => {
                return vo.isSelf();
            });
        }
        /** 获取成员数量 */
        getMemberCount(): number {
            let num = 0;
            for (let vo of this._memberList) {
                if (vo.isExist()) {
                    num++;
                }
            }
            return num;
        }
        /** 获取最新的准备时间 */
        getMaxReadyTime(): number {
            let time = 0;
            for (let vo of this._memberList) {
                if (vo.isExist() && vo.svo.readyTime > time) {
                    time = vo.svo.readyTime;
                }
            }
            return time;
        }
        /** 是否全员准备 */
        isAllReady(): boolean {
            return this._memberList.every((vo) => {
                return vo.isReady();
            });
        }
        /** 是否全是真人 */
        isAllRealPerson(): boolean {
            return this._memberList.every((vo) => {
                return vo.isExist() && !vo.isRobot();
            });
        }
        /** 自己是否队长 */
        isCaptain(): boolean {
            return this.getSelfInfo().isCaptain();
        }
        /** 是否自动加入 */
        isAutoJoin(): boolean {
            return this.autoJoin == iface.tb_prop.groupJoinTypeKey.yes;
        }


        // 战报成员数据
        public leftInfo: IGodDomainFightSvo[];
        public rightInfo: IGodDomainFightSvo[];
        public waveResults: any[];
        public winCamp: number;
        setBattleMemberInfo(leftInfo: any[], rightInfo: any[], waveResults: any[], winCamp: number): void {
            this.leftInfo = leftInfo.map((ary: any[]) => {
                return { playerId: ary[0], name: ary[1], head: ary[2]||0, level: ary[3]||1, force: ary[4]||0, godId:ary[5]||0,awakenlv:ary[6],skinId:ary[7],headFrame:ary[8]};
            });
            this.rightInfo = rightInfo.map((ary: any[]) => {
                return { playerId: ary[0], name: ary[1], head: ary[2]||0, level: ary[3]||1, force: ary[4]||0, godId:ary[5]||0,awakenlv:ary[6],skinId:ary[7],headFrame:ary[8] };
            });
            this.waveResults = waveResults;
            this.winCamp = winCamp;
            this._selfcamp = -1;
            this._fightTeamList = null;
        }

        private _fightTeamList: Array<Array<number>>
        /**
         * 获得指定轮次的对战双方
         * @param wave 
         */
        getFightTeams(wave: number) {
            if (!this._fightTeamList) {
                let left = 0;
                let right = 0;

                let curleft = 0;
                let curright = 0;

                let leftTotal = 0;
                let rightTotal = 0;

                let leftResult = this.waveResults[battle.BatteConsts.BATTLE_CAMPATK];
                let ary = [[0, 0]];
                while (leftTotal < 4 && rightTotal < 4) {
                    if (leftResult[left] > curleft) {
                        curright = 0;
                        curleft++;
                        leftTotal++;
                        right++;
                    } else {
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
        }

        private _selfcamp:number = -1;
        getSelfCamp():number {
            if(this._selfcamp != -1){
                return this._selfcamp;
            }
            let leftvo = this.leftInfo.find((vo) => {
                return vo.playerId == App.hero.playerId;
            });
            this._selfcamp = battle.BatteConsts.BATTLE_CAMPATK;
            if (!leftvo) {
                this._selfcamp = battle.BatteConsts.BATTLE_CAMPDEF;
            }
            return this._selfcamp;
        }
    }


    export interface IGodDomainFightSvo {
        playerId: string;
        name: string;
        head: number;
        level: number;
        force: number;
        godId : number;
        skinId : number;
        awakenlv:number;
        headFrame:number

        state ?: number; // 客户端：  0：已阵亡 1：出战中 2：等待中
        count ?: number;
    }
}