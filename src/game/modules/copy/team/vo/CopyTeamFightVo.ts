module game {
    export class CopyTeamFightVo {
        public memberlist: copyTeamFightMember[];
        public copyFloor: number;
        constructor(copyFloor: number, memberInfo: any[]) {
            this.copyFloor = copyFloor;
            this.memberlist = memberInfo;
        }

        getCurAtkForce(curWave: number) {
            let item = this.getPosMember(curWave);
            return (item && item.force) || 0;
        }

        getMonster() {
            let tab = tb.TB_team_copy.getTB_team_copyById(this.copyFloor);
            if (!tab) return [[]];
            return [tab.monster];
        }

        setHeadData(data, curWave: number) {
            let tab = tb.TB_team_copy.getTB_team_copyById(this.copyFloor);
            if (tab) {
                let tbmonster = tb.TB_monster.get_TB_monsterById(tab.monster_show);
                data.enemyLevel = tbmonster.level;
                data.enemyName = tbmonster.name;
            }

            let item = this.getPosMember(curWave);
            if (item) {
                data.ownLevel = item.level
                data.ownName = item.name;
            }
        }

        /** 获得展示的怪物信息对象 */
        getShowMonsterVo() {
            let tab = tb.TB_team_copy.getTB_team_copyById(this.copyFloor);
            if (!tab) return null;
            let monstertab = tb.TB_monster.get_TB_monsterById(tab.monster_show);
            let vo = new copyTeamFightMember;
            vo.head = monstertab.icon;
            vo.modelId = monstertab.model;
            vo.headFrame = 0;
            vo.level = monstertab.level;
            vo.name = monstertab.name;
            return vo;
        }

        public getPosMember(curWave: number) {
            let pos = curWave + 1;
            if (this.memberlist) {
                this.memberlist.sort((a:copyTeamFightMember, b:copyTeamFightMember) => {
                    return a.pos - b.pos;
                });
                return this.memberlist[curWave];
            } else {
                return null;
            }
        }
    }

    export class copyTeamFightMember {
        public force: number;
        public head: number;
        public headFrame: number;
        public job: number;
        public level: number;
        public lineupInfo: any[];
        public name: string;
        public pos: number;
        public modelId: number;
    }
}