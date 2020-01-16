

module game {

    export class CopyTeamListVo {

        public svo: CopyTeamListIFS;
        public memberList: any[];
        constructor() {
            this.memberList = [];
            let item = null;
            for (var i = 1; i <= 3; i++) {
                this.memberList.push({pos:i});
            }
        }

        setSvo(svo: CopyTeamListIFS): void {
            this.svo = svo;
            let item = null;
            for (var key in this.svo.memberInfo) {
                item = this.svo.memberInfo[key];
                this.memberList[item.pos - 1] = item;
            }
        }
    }

    export interface CopyTeamListIFS {
        name: string;       // 队长名字
        groupId: string;   // 队伍ID
        isApply: boolean;
        copyFloor: number;  // 限制id      
        force: number;      // 平均战斗力
        memberInfo: any[];
    }


}