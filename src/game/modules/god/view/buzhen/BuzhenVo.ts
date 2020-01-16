module game {
    export class BuzhenItemVo {
        public openflag: boolean;
        public msg: string; // 开启条件描述
        public data: any;
        public posDes : string; // 位置描述
    }

    export class BuzhenListItemVo {
        public godVo: GodItemVo;

        public linuepType: number;             // 阵容类型
        public showBlood: boolean = false;     // 是否显示血条
        public hp: number = 0;                 // 当前血量
        public totalHp: number = 0;            // 总血量
        public canGray: boolean = false;       // 是否可以置灰
        constructor(vo: GodItemVo, linuepType: number) {
            this.godVo = vo;
            this.linuepType = linuepType;
        }
    }
}