module game {
    export interface StepVo {
        type?: number;
        objId?: number;
        level?: number;
        degree?: number;
        starLev?: number;
        awakenLv?: number;
        skinId?: number;
        uuid?: number;

        hp?: number;
        hpMax?: number;
        objType?: number;
        templateId?: number;

        round?: number;

        atkBar?: number;

        flyTextType?: number;

        skillId?: number;
        targetIds?: [number];

        buffId?: number;
        buffInstId?: number;
        casterId?: number;
        stackCnt?: number;
        bCrit?: boolean;
        showeff?: boolean;
        value?: number;

        atkBarMax?: number;

        atkSpd?: number;

        camp?: number;
        anger?: number;
    }

    export class sStep {
        public step: StepVo;
        public skillId: number

        constructor(step: StepVo, skillId?: number) {
            this.step = step;
            this.skillId = skillId;
        }
    }
}