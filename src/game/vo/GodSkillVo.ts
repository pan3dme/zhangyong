class GodSkillVo implements inface.ISkillData {
    public skillid: number;
    public skillfile: string = "0";
    public effectName: string;
    public tabskill1: tb.TB_skill;
    public tempbuffidAry: Array<number>;
    public cd: number;
    public trigger_count: number
    public selectFlag: boolean = false;
    //已死亡队友数
    public deathNum: number = 0;

    public getLevel(): number {
        return this.tabskill1.getLevel();
    }
    public getQulity(): string {
        return this.tabskill1.getQulity();
    }

    public getIconUrl(): string {
        return this.tabskill1.getIconUrl();
    }

    public triggerSkill(){
        logfight("触发技能：",this.tabskill1.ID,this.tabskill1.type == 0?"被动":"主动");
        this.trigger_count++;
        this.cd = 0;
    }

    public settlementSkill(){
        this.cd = this.cd > 0 ? (this.cd - 1) : 0;
    }
}