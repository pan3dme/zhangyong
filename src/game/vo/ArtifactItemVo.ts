/*
* name;
*/
class ArtifactItemVo implements inface.IItemData {
    /**ID */
    public ID: number
    /**附魔进度 */
    public exp: number = 0;
    /**星级 */
    public starLv: number = 0;
    /**技能等级 */
    public skillLv: number = 1;
    /*洗练等级 */
    public baptizeLv: number = 1;
    /*洗练经验 */
    public baptizeExp: number = 0;
    /**强化等级 */
    public strengthLv: number = 0;
    /**洗练属性 [属性id,类型(百分比或者数值),值,种族] */
    public baptizeAttrs: Object = {};
    /*洗练临时属性 */
    public tmpBaptizeAttrs: Object = {};
    /**神器信息 */
    constructor(id: number) {
        this.ID = id;
    }

    getExtParm(){
        return null;
    }

    getNum(): any {
        return 0;
    }

    getStar(): number {
        return 0;
    }

    getShow(): boolean {
        return false;
    }

    showRace(): number {
        return 0;
    }

    firstFlag(): boolean {
        return false;
    }

    isChip(): boolean {
        return false;
    }

    getConstNum(): number {
        return 0;
    }

    isStartAction(): boolean {
        return false;
    }

    isMoreThanSix(): boolean {
        return false;
    }

    getQulity(): string {
        return SkinUtil.getBoxQulityIcon(5);
    }

    getIconUrl(): string {
        if (!this.tbArtifact) {
            return "";
        }
        return SkinUtil.getEquipIcon(this.tbArtifact.icon);
    }

    /**附魔次数 */
    get enchantNum(): number { return this.exp / this.tbSet.enchant_plan };

    get skillId(): number { return this.ID * 1000 + this.skillLv };
    get tbSet(): tb.TB_artifact_set { return tb.TB_artifact_set.get_TB_artifact_setById() };
    get tbSkill(): tb.TB_skill { return tb.TB_skill.get_TB_skillById(this.tbArtifactSkill.skill) };
    get tbArtifactSkill(): tb.TB_artifact_skill { return tb.TB_artifact_skill.get_TB_artifact_skillById(this.skillId) };

    get enchantId(): number { return this.ID * 100 + this.starLv };
    get tbArtifact(): tb.TB_artifact { return tb.TB_artifact.get_TB_artifactById(this.ID) };
    get tbArtifactEnchant(): tb.TB_artifact_enchant { return tb.TB_artifact_enchant.get_TB_artifact_enchantById(this.enchantId) };

    get strengthId(): number { return this.ID * 1000 + this.strengthLv };
    get tbArtifactStrength(): tb.TB_artifact_strength { return tb.TB_artifact_strength.get_TB_artifact_strengthById(this.strengthId) };

    /**是否已解锁 */
    isYiJieSuo(): boolean {
        return App.hero.artifactInfo.hasOwnProperty(this.ID);
    }

    /**在某个阵容是否已穿戴 */
    isWearByType(type: number): boolean {
        return App.hero.lineupArtifactInfo.hasOwnProperty(type) && App.hero.lineupArtifactInfo[type] == this.ID;
    }

    /**是否已穿戴 */
    isWear(): boolean {
        for (let i = 1; i < 4; i++) {
            if (this.isWearByType(i)) return true;
        }
        return false;
    }

    /**是否可解锁 */
    isCanJieSuo(): boolean {
        let needCost = this.tbArtifact.cost;
        return needCost && App.hero.getBagItemNum(needCost[0][0]) >= needCost[0][1] && !this.isYiJieSuo();
    }

    /**是否可附魔 */
    isCanEnchant(): boolean {
        return App.hero.getBagItemNum(this.tbArtifactEnchant.cost[0]) >= this.tbArtifactEnchant.cost[1];
    }

    /**是够可强化 */
    isCanStrengh(): boolean {
        let tbArtifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
        if (this.strengthLv >= tbArtifactSet.max_strength_level) return false;
        let needCost = this.tbArtifactStrength.cost;
        return App.hero.getBagItemNum(needCost[0][0]) >= needCost[0][1] && this.isYiJieSuo() && this.strengthLv < tbArtifactSet.max_strength_level;
    }

    /**是否可升级技能 */
    isCanSkillUp(): boolean {
        let tbArtifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
        if (this.skillLv >= tbArtifactSet.max_skill_level) return false;
        // let needCost = this.tbArtifactSkill.cost;
        // return App.hero.getBagItemNum(needCost[0][0]) >= needCost[0][1] &&
        //     this.isYiJieSuo() && this.skillLv < tbArtifactSet.max_skill_level && this.strengthLv >= this.tbArtifactSkill.need_level;
        return false;
    }

    /**是否可洗练 */
    isCanBaptize(type?: number): boolean {
        if (App.hero.welfare.loginCount > 1)
            return false;
        if (type == Artifact.PBAPTIZE)
            return App.hero.getBagItemNum(this.tbSet.general_baptize[0][0]) >= this.tbSet.general_baptize[0][1];
        else
            return App.hero.getBagItemNum(this.tbSet.rare_baptize[0][0]) >= this.tbSet.rare_baptize[0][1];
    }

    /**排序 */
    getSortNum(wearType?: number): number {
        if (wearType && this.isWearByType(wearType)) {
            return 0;
        }
        else if (!wearType && this.isWear()) {
            return 0;
        } else if (this.isYiJieSuo()) {
            return wearType ? 1 : 3;
        } else {
            let needCost = this.tbArtifact.cost;
            let hasNum = App.hero.getBagItemNum(needCost[0][0]);
            if (!wearType && hasNum >= needCost[0][1]) {
                return 2;
            } else {
                return 4;
            }
        }
    }

 

   

  

  


    

 

  
}