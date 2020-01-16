module game {

    /** 列表数据vo */
    export interface IYZFriendHelpListSvo {
        helpId : number;
        playerId : string;
        name : string;
        godInfo : any[];
        isHire : boolean;
    }

    export class YZHelpInfoVo {

        public svo : IYZFriendHelpListSvo;
        public force : number;
        public godVo : GodItemVo;
        constructor(svo:IYZFriendHelpListSvo) {
            this.svo = svo;
            let godInfo = svo.godInfo;
            this.force = godInfo[0];
            let obj = godInfo[1];
            let tbGod = tb.TB_god.get_TB_godById(obj[0]);
            let godVo = new GodItemVo(tbGod);
            // [templateId, starLv, level, attrs, degree, awakenLv, skinId]
            godVo.starLevel = obj[1];
            godVo.level = obj[2];
            godVo.degree = obj[4];
            godVo.dataType = 1;
            if (obj[3]) {
                godVo.iSeverAttri = map2ary(obj[3]);
            }
            this.godVo = godVo;
            this.godVo.svrForce = this.force;
            this.godVo.dataType = 1;
        }
        /** 是否已雇佣 */
        isHire():boolean {
            return this.svo.isHire;
        }
        /** 是否超过我方最高神力英雄的120% */
        isOverForce():boolean {
            let maxForce = GodModel.getInstance().getMaxForce();
            return this.force > (maxForce * tb.TB_copy_set.getCopySet().hire_fight_percent / 100);
        }
    }
}