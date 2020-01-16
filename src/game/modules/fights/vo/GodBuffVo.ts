module game {
    export class GodBuffVo {
        public uuid: number;
        public tb_buff: tb.TB_buff;
        public round: number;
        public casterId: number;//buff的施加者id
        public targetId: number;//buff的所有者id
        public skillId: number;//buff的宿主技能id  if == -1 则表示子buff
        public stackCnt: number;//堆叠数
        public particle: tl3d.CombineParticle;
    }
}