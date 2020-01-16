

class BaseFightVo {

    public lineupInfo: any[];
    public lineupGods: GodItemVo[];
    public shenqiVo: any[]; // [id,skillLv,strengthLv] 神器vo,id,技能等级,强化等级
    setLineupInfo(info): void {
        this.lineupInfo = info;
        this.lineupGods = [];
        let ary = info && info[0] ? info[0] : [];
        for (let i = 0; i < ary.length; i++) {
            let godData: any[] = ary[i];
            if (godData) {
                let param = {
                    templateId: godData[0],
                    starLevel: godData[1],
                    level: godData[2],
                    degree:godData[4],
                    awakenLv:godData[5],
                    skinId:godData[6],
                };
                let god:GodItemVo = App.hero.createGodVo(param, -i);
                if (godData[3]){
                    god.iSeverAttri = map2ary(godData[3]);
                }
                this.lineupGods.push(god);
            } else {
                this.lineupGods.push(null);
            }
        }
        this.shenqiVo = info && info[1] ? info[1] : [];
    }

    getShenqiAry():number[] {
        return this.shenqiVo;
    }

    /** 获取玩家的英雄id组 */
    getLineupGodIds(): number[] {
        let ary = [];
        for (let i = 0; i < this.lineupGods.length; i++) {
            let vo = this.lineupGods[i];
            if (vo) {
                ary.push(vo.templateId);
            } else {
                ary.push(0);
            }
        }
        return ary;
    }

    /** 获取存在的怪物数据 */
    getExistGods(): GodItemVo[] {
        return this.lineupGods.filter((vo) => {
            return vo && vo.templateId;
        });
    }
    /** 设置数据类型 */
    setDataType(dataType: number): void {
        for (let godvo of this.lineupGods) {
            if (godvo) {
                godvo.dataType = dataType;
            }
        }
    }
    /** 获取阵容神灵-有位置的 */
    getLineupGods(): GodItemVo[] {
        return this.lineupGods;
    }

    /** 获取英雄总血量 */
    getGodTotalHp(tbid: number): number {
        let lineupInfo = this.lineupInfo && this.lineupInfo[0] ? this.lineupInfo[0] : [];
        let god = lineupInfo.find((ary: any) => {
            return ary && ary[0] == tbid;
        });
        return god && god[3] ? god[3]['1'] : 0;
    }

    /** 获取阵容总血量 */
    getLineupTotalHp(): number {
        let blood: number = 0;
        let lineupInfo = this.lineupInfo && this.lineupInfo[0] ? this.lineupInfo[0] : [];
        for (let ary of lineupInfo) {
            blood += (ary && ary[3]['1'] ? ary[3]['1'] : 0);
        }
        return blood;
    }

    /** 是否有阵容信息 */
    isHasLineup(): boolean {
        return this.lineupInfo && this.lineupInfo.length > 0;
    }

    turnTemplatID(objs) {
        let ary = {};
        let infos = this.lineupInfo[0];
        for (var key in objs) {
            let id = (Number(key) % 10) - 1;
            ary[infos[id][0]] = objs[key];
        }
        return ary;
    }

    /** 清除阵容数据 */
    clearLineupInfo(): void {
        this.lineupInfo = [];
        this.lineupGods = [];
        this.shenqiVo = [];
    }
}