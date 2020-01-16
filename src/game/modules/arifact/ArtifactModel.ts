/**
* name 
*/
module game {
	export class ArtifactModel {
		/**洗练提示 */
		public hint?: boolean;
		private static _instance: ArtifactModel;
		constructor() {
		}
		public static getInstance(): ArtifactModel {
			if (!ArtifactModel._instance) {
				ArtifactModel._instance = new ArtifactModel();
			}
			return ArtifactModel._instance;
		}

		/** 是否系统开启 */
		isSysOpen():boolean {
			return App.hero.tasks.advanceLevel >= 1;
		}

		//神器解锁数量
		public getUnlockArtifactNum(): number {
			let num: number = 0;
			if (App.hero.artifactInfo) {
				for (let key in App.hero.artifactInfo) {
					num++;
				}
			}
			return num;
		}

		/** 是否可解锁某个神器 */
		isCanUnlock(id:number):boolean {
			let tbAri = tb.TB_artifact.get_TB_artifactById(id);
			return App.hero.getBagItemNum(tbAri.cost[0][0]) >= tbAri.cost[0][1] && !this.isUnlock(tbAri.ID);
		}
		/** 是否已解锁 */
		isUnlock(id:number):boolean {
			return App.hero.artifactInfo[id];
		}
		/** 是否可激活 */
		isCanActivit(id:number):boolean {
			return !this.isUnlock(id) && this.isCanUnlock(id);
		}

		/**玩家神器收集tb */
		static getArtObtain(): tb.TB_artifact_obtain {
			let num = ArtifactModel.getInstance().getUnlockArtifactNum();
			return tb.TB_artifact_obtain.get_TB_artifact_obtainById(num);
		}

		/**玩家当前神器收集属性
		 * @param type 值类型：0固定值 1百分比
		 */
		static getArtAttr(): Array<Array<number>> {
			let tb = this.getArtObtain();
			if (tb) {
				let tempResult: Array<Array<number>> = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]; 
				for(let ary of tb.attr) {
					let key = ary[0]; // 属性
					tempResult[ary[1]][key-1] += ary[2];
				}
				return tempResult;
			}
			return null;
		}

		/**
     	* 获得附魔的基础和特殊属性（[1,8]区间的属性）
     	* @param basic 只获得基础属性
     	*/
    	public getEnchantAtttri(tbenchant:tb.TB_artifact_enchant, enchantNum:number, basic?: boolean, needWear: boolean = false): Array<Array<number>> {
			if (needWear && App.hero.getArtifactIDByLineType() <= 0) return null;
			if (!tbenchant) tbenchant = tb.TB_artifact_enchant.get_TB_artifact_enchantById(App.hero.artifactStarLv);
			if (enchantNum == 0){
				let starExp:number = App.hero.artifactStarExp;
				let artifactsetT:tb.TB_artifact_set = tb.TB_artifact_set.get_TB_artifact_setById();
				enchantNum = starExp / artifactsetT.enchant_plan;
			}
        	let tempResult: Array<Array<number>> = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]; //0固定值 1百分比
        	for (let i in tbenchant.enchant_basic) {
            	if (tbenchant.enchant_basic[i][0] <= 8)
                	tempResult[0][tbenchant.enchant_basic[i][0] - 1] += Number(tbenchant.enchant_basic[i][1]);
        	}
        	if (!basic) {
            	for (let i in tbenchant.enchant_special) {
                	if (tbenchant.enchant_special[i][0] <= 8)
                    	tempResult[tbenchant.enchant_special[i][1]][tbenchant.enchant_special[i][0] - 1] += Number(tbenchant.enchant_special[i][2]);
            	}
        	}
        	for (let i in tbenchant.temporary_attr) {
            	if (tbenchant.temporary_attr[i][0] <= 8)
                	tempResult[0][tbenchant.temporary_attr[i][0] - 1] += (Number(tbenchant.temporary_attr[i][1]) * enchantNum);
        	}
        	return tempResult
    	}

		/**洗练属性 type:0固定值 1百分比 2全部*/
    	public getBapAttri(race: number, type: number): Array<Array<number>> {
        	let tempResult: Array<Array<number>> = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]; // index=0存属性固定值，1存属性百分比
			if (App.hero.getArtifactIDByLineType() <= 0) return tempResult;
			let baptizeAttrs = App.hero.artifactBaptizeAttrs;
        	for (let i in baptizeAttrs) { 
            	if (baptizeAttrs[i][3] == race || baptizeAttrs[i][3] == 0) {
                	if (baptizeAttrs[i][1] == type || type == 2){
                    	tempResult[baptizeAttrs[i][1]][baptizeAttrs[i][0] - 1] += Number(baptizeAttrs[i][2]);
                	}
            	}
        	}
        	return tempResult;
    	}

    	/** 强化属性 */
    	public getStrengthAttr():any{
			if (App.hero.getArtifactIDByLineType() <= 0) return null;
			let strengthtb:tb.TB_artifact_strength = tb.TB_artifact_strength.get_TB_artifact_strengthById(App.hero.artifactStrengthLv);
        	let strengthAttrs = strengthtb ? strengthtb.getAttr() : null;
        	return strengthAttrs;
    	}

		/**(强化、技能、附魔)属性 */
    	public getArtifactAllAttr(): Object {
        	let obj = { attr: {}, buff: {} };
			if (App.hero.getArtifactIDByLineType() <= 0) return obj;
			let strengthtb:tb.TB_artifact_strength = tb.TB_artifact_strength.get_TB_artifact_strengthById(App.hero.artifactStrengthLv);
        	let strengthAttrs = strengthtb.strength_attr;
        	for (let attri of strengthAttrs) {
            	if (obj.attr.hasOwnProperty(attri[0])) {
                	obj.attr[attri[0]] += Number(attri[1])
            	} else {
                	obj.attr[attri[0]] = Number(attri[1])
            	}
        	}

			let starLv:number = App.hero.artifactStarLv;
			let starExp:number = App.hero.artifactStarExp;
			let artifactsetT:tb.TB_artifact_set = tb.TB_artifact_set.get_TB_artifact_setById();
			let artifactEnchantT:tb.TB_artifact_enchant = tb.TB_artifact_enchant.get_TB_artifact_enchantById(starLv);
			let enchantNum:number = starExp / artifactsetT.enchant_plan;
        	/**附魔特殊属性[9,+∞)区间的属性 */
        	for (let special of artifactEnchantT.enchant_special) {
            	if (special[0] >= 9) {
                	if (obj.attr.hasOwnProperty(special[0])) {
                    	obj.attr[special[0]] += Number(special[2])
                	} else {
                    	obj.attr[special[0]] = Number(special[2])
                	}
            	}
        	}

        	for (let temporary of artifactEnchantT.temporary_attr) {
            	if (temporary[0] >= 9) {
                	if (obj.attr.hasOwnProperty(temporary[0])) {
                    	obj.attr[temporary[0]] += (Number(temporary[1]) * enchantNum);
                	} else {
                    	obj.attr[temporary[0]] = (Number(temporary[1]) * enchantNum);
                	}
            	}
        	}

        	return obj;
    	}

    

		/**神器红点 */
		getArtifactRedPoint(id: number, type: number): boolean {
			if (!App.IsSysOpen(ModuleConst.ARTIFACT)) return false;
			// let isWear:boolean = App.hero.isWearArtifact(id);
			// if (!isWear) return false;
			if (!App.hero.isActiveArtifact(id)){
				if (type == Artifact.ACTIVATE){
					let tbArtifactT:tb.TB_artifact = tb.TB_artifact.get_TB_artifactById(id);
					let itemid:number = tbArtifactT.cost[0][0];
					let itemnum:number = tbArtifactT.cost[0][1];
					return App.hero.getBagItemNum(itemid) >= itemnum;
				}
				return false;
			}
			let unlockNum:number = this.getUnlockArtifactNum();
			let tbArtifactSet = tb.TB_artifact_set.get_TB_artifact_setById();
			if (type == Artifact.SKILLUPGRADE) {
				if (unlockNum < tbArtifactSet.artifact_unlock[1]) return false;
				let skillLv:number = App.hero.artifactSkillLv;
        		if (skillLv >= tbArtifactSet.max_skill_level) return false;
				let skillcost:tb.TB_artifact_skillcost = tb.TB_artifact_skillcost.get_TB_artifact_skillcostById(skillLv);
        		let needCost = skillcost.cost;
				return App.hero.artifactStrengthLv >= skillcost.need_level && App.hero.getBagItemNum(skillcost.cost[0][0]) >= skillcost.cost[0][1];
			} else if (type == Artifact.STRENGTH) {
				if (unlockNum < tbArtifactSet.artifact_unlock[0]) return false;
				let strengthLv:number = App.hero.artifactStrengthLv;
        		if (strengthLv >= tbArtifactSet.max_strength_level) return false;
				let strengthT:tb.TB_artifact_strength = tb.TB_artifact_strength.get_TB_artifact_strengthById(strengthLv);
        		return App.hero.getBagItemNum(strengthT.cost[0][0]) >= strengthT.cost[0][1];
			} else if (type == Artifact.GBAPTIZE) {
				if (unlockNum < tbArtifactSet.artifact_unlock[2]) return false;
				if (App.hero.welfare.loginCount > 1)return false;
            	return App.hero.getBagItemNum(tbArtifactSet.rare_baptize[0][0]) >= tbArtifactSet.rare_baptize[0][1];
			} else if (type == Artifact.ENCHANT) {
				if (unlockNum < tbArtifactSet.artifact_unlock[3]) return false;
				let enchantT:tb.TB_artifact_enchant = tb.TB_artifact_enchant.get_TB_artifact_enchantById(App.hero.artifactStarLv);
				return App.hero.getBagItemNum(enchantT.cost[0]) >= enchantT.cost[1];
			} else if (type == Artifact.PBAPTIZE) {
				if (unlockNum < tbArtifactSet.artifact_unlock[2]) return false;
				if (App.hero.welfare.loginCount > 1)return false;
				return App.hero.getBagItemNum(tbArtifactSet.general_baptize[0][0]) >= tbArtifactSet.general_baptize[0][1];
			}
		}
	}
}