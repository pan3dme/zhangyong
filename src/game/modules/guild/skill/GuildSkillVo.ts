

module game {
    export class GuildSkillVo {
        public godType : number;
        public attrType : number;       
        public lv : number;
        public tbSkill : tb.TB_guild_skill;
        constructor(godType:number,attrType:number){
            this.godType = godType;
            this.attrType = attrType;
            this.updateData();
        }

        public updateData(): void {
            this.lv = GuildSkillModel.getInstance().getSkillLv(this.godType,this.attrType);
            this.tbSkill = tb.TB_guild_skill.getTbByParam(this.godType,this.attrType,this.lv);
        }
        
        /** 返回当前效果的字符串 */
        public getXiaoguo(): string {
            if(this.tbSkill.attr[0] <= 4 && this.tbSkill.attr[1] == 0) {
                return this.tbSkill.attr[2] + '';
            }            
            return (Math.floor(this.tbSkill.attr[2] * 10000) / 100) + '%';
        }

        /** 获得属性球最大等级 */
        public getMaxLv(): number {
            let count: number = 0;
            let initId: number = this.godType * 1000 + this.attrType * 100 + 0;
            for(let id = initId;;id++) {
                let tbSkill = tb.TB_guild_skill.get_TB_guild_skillById(id);
                if(tbSkill.cost == 0) break;
                count++;
            }
            return count;
        }

        /** 是否可升级 */
        isCanLvup():boolean {
            return this.tbSkill.cost != 0 && this.tbSkill.cost <= App.hero.guildDonate;
        }

    }
}