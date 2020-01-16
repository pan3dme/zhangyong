
module game {

    export interface IYZChallengeInfoVo {
        name: string;       // 黑暗森林守关者名字
        head: number;        // 黑暗森林守关者性别
        level: number;      // 黑暗森林守关者等级
        force: number;      // 黑暗森林守关者神力值
        lineupInfo: any[];    // 黑暗森林守关者布阵信息
        hpInfo: any;        // 黑暗森林守关者血量信息
        headFrame: number;
    }

    export class YZChallengeVo extends BaseFightVo {

        public svo: IYZChallengeInfoVo;
        public guanqiaVo: YZGuanqiaVo;
        public headVo: UserHeadVo;
        constructor() {
            super();
        }

        /** 设置关卡挑战的玩家数据 */
        setServerInfo(svo): void {
            this.svo = svo;
            super.setLineupInfo(this.svo.lineupInfo);
            this.headVo = new UserHeadVo(this.svo.head, this.svo.level, this.svo.headFrame);
        }
        /** 设置关卡数据 */
        setGuanqiaVo(vo: YZGuanqiaVo): void {
            this.guanqiaVo = vo;
        }

        /** 获取玩家的英雄id组 */
        getLineupGodIds(): number[] {
            let ary = [];
            for (let i = 0; i < this.lineupGods.length; i++) {
                let vo = this.lineupGods[i];
                if (vo) {
                    let blood = this.svo.hpInfo[vo.templateId];
                    if (blood > 0) {
                        ary.push(vo.templateId);
                    } else {
                        ary.push(0);
                    }
                } else {
                    ary.push(0);
                }
            }
            return ary;
        }
        /** 获取英雄当前血量 */
        getEnemyGodHp(tbid: number): number {
            return this.svo.hpInfo[tbid];
        }

        /** 获取敌方阵容英雄初始血量（战斗使用） */
        getEnemyGodsHpAry(): number[] {
            let hps = [];
            let godAry = this.getLineupGodIds();
            for (let i = 0; i < godAry.length; i++) {
                let id = godAry[i];
                if (id != 0) {
                    let god = tb.TB_god.get_TB_godById(id);
                    let blood = this.svo.hpInfo[id];
                    hps.push(blood);
                } else {
                    hps.push(0);
                }
            }
            return hps;
        }
        /** 获取己方阵容英雄初始血量万分比（战斗使用） */
        getSelfGodsHp(): number[] {
            let hpAry = [];
            let godidAry: Array<string> = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.expedition, true);
            let expeditionSelfHpInfo = App.hero.copyInfo.expeditionSelfHpInfo;
            for (let i = 0; i < godidAry.length; i++) {
                // let godvo: GodItemVo = App.hero.getGodVoById(godidAry[i]);
                // if (godvo) {
                // let percent = expeditionSelfHpInfo.hasOwnProperty(godvo.uuid) ? (expeditionSelfHpInfo[godvo.uuid] / YuanzhengModel.BLOOD_BASE) : 1;
                // hpAry.push(percent);
                // } else {
                //     hpAry.push(0);
                // }
                let percent = expeditionSelfHpInfo.hasOwnProperty(godidAry[i]) ? (expeditionSelfHpInfo[godidAry[i]] / YuanzhengModel.BLOOD_BASE) : 1;
                hpAry.push(percent);
            }
            // loghgy('getSelfGodsHp:',hpAry);
            return hpAry;
        }


        /** 传给后端的最终伤害信息（key：英雄id, value: 剩余血量万分比）
         *  向上取整
         */
        getSelfHpInfo(lossHpInfo: any, totalHpInfo: any, isSuccess: boolean, lineUp: number): any {
            let selfHpInfo: any = {};
            if (!isSuccess) {
                // 失败为0
                for (let uuid in lossHpInfo) {
                    selfHpInfo[this.getGodUuid(uuid, lineUp)] = 0;
                }
                loghgy('最终的剩余的血量万分比:', selfHpInfo);
                return selfHpInfo;
            }
            let expeditionSelfHpInfo = App.hero.copyInfo.expeditionSelfHpInfo;
            loghgy('lossHpInfo:', lossHpInfo, totalHpInfo, expeditionSelfHpInfo);
            for (let teamId in lossHpInfo) {
                let goduuid = this.getGodUuid(teamId, lineUp);
                let blood = totalHpInfo[teamId];
                let hp = lossHpInfo[teamId];
                // 11 ： 200
                // 失去的血量万分比
                let lossPercent = Math.ceil(hp / blood * YuanzhengModel.BLOOD_BASE);
                if (!expeditionSelfHpInfo.hasOwnProperty(goduuid)) {
                    expeditionSelfHpInfo[goduuid] = YuanzhengModel.BLOOD_BASE;
                }
                // 剩余的血量万分比
                let resetPercent = expeditionSelfHpInfo[goduuid] - lossPercent;
                resetPercent = resetPercent <= 0 ? 0 : resetPercent;
                resetPercent = resetPercent >= YuanzhengModel.BLOOD_BASE ? YuanzhengModel.BLOOD_BASE : resetPercent;
                selfHpInfo[goduuid] = resetPercent;
            }
            loghgy('最终的剩余的血量万分比:', selfHpInfo);
            return selfHpInfo;
        }


        private getGodUuid(uuid, lineUp) {
            let team = App.hero.lineupInfo[lineUp];
            if (team) {
                let id = (uuid % 10) - 1;
                //    let godvo = App.hero.getGodVoById(team[id])
                //    return godvo?godvo.templateId : -1;
                return team[id];
            }
        }
    }
}