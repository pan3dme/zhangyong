class GodBuffVo {
    public uuid:string;
    public tb_buff: tb.TB_buff;
    public round: number;
    public casterId: string;//buff的施加者id
    public targetId: string;//buff的所有者id
    public skillId: number;//buff的宿主技能id  if == -1 则表示子buff
    public shieldnum:number = 0;//护盾抵抗数值
    public particle:tl3d.CombineParticle;
}