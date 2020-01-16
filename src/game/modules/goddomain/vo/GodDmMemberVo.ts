

module game {

    export class GodDmMemberVo {

        public pos : number;

        public svo : IMemberVo;
        public tbgod : tb.TB_god;
        constructor(pos:number) {
            this.pos = pos;
        }

        /** 清除数据 */
        clearVo():void {
            this.svo = null;
            this.tbgod = null;
        }

        /** 更新最新数据 */
        public updateData(data:IMemberVo):void {
            // 没有队员
            if(!data) {
                this.clearVo();
                return;
            }
            // 初始化
            if(!this.svo){
                this.svo = data;
                this.tbgod = tb.TB_god.get_TB_godById(data.godId);
                return;
            }
            // 更新
            for(let key in data){
                this.svo[key] = data[key];
            }
            // 没有公会时,data里面没有guildName字段；导致上面的遍历不够，需要重新判断
            if(!data.hasOwnProperty("guildName")){
                this.svo.guildName = null;
            }
            this.tbgod = tb.TB_god.get_TB_godById(data.godId);
        }
        /** 奖励次数 */
        getRewardCnt():number {
            return this.isSelf() ? App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) : this.svo.rewardCount;
        }

        /** 是否存在 */
        isExist():boolean {
            return this.svo ? true : false;
        }
        /** 是否机器人 */
        isRobot():boolean {
            return this.isExist() && this.svo.isRobot == 1;
        }
        /** 是否队长 */
        isCaptain():boolean {
            return this.isExist() && this.svo.job == iface.tb_prop.groupJobTypeKey.captain;
        }
        isSelf():boolean {
            return this.isExist() && this.svo.playerId == App.hero.playerId;
        }
        /** 是否准备 */
        isReady():boolean {
            return this.isExist() && (this.isCaptain() || this.svo.state == iface.tb_prop.groupStateTypeKey.yes);
        }

        getModel(){
            return GodUtils.getShowGodModel(this.tbgod?this.tbgod.ID:0,this.svo.skinId);
        }
    }

    export interface IMemberVo {
        playerId : string;
        pos: number;        // 位置
        name: string;
        force: number;
        guildName: string;
        rewardCount : number;
        job: number;        // 成员类型（枚举groupJobType）
        state:number;       // 成员状态（枚举groupStateType）
        readyTime: number;  // 自动准备时间戳
        godId : number;     // 成员神灵ID
        isRobot : number;   // 是否是机器人（0不是，1是）
        awakenLv : number;  // 觉醒等级
        skinId : number;
    }


}