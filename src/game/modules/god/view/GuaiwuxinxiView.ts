/**
* name 
*/
module game {
	export class GuaiwuxinxiView extends ui.god.GuaiwuxinxiUI {
		private _sdsx: number = 0;
		private _sdsy: number = 0;
		private _arrskilldata: Array<common.SkillTipData> = [];
		constructor() {
			super();
			this.isModelClose = true;
			this.list_skill.selectHandler = new Handler(this, this.onSelectSkill);
			this.list_skill.selectedIndex = -1;
			this.bgPanel.addChildAt(this.img_bg, 3);
		}

		public popup() {
			super.popup(false, true);
			let data: inface.IHeadData = this.dataSource;
			this.headBox.dataSource = data;
			this._arrskilldata = [];
			let skills = this.dataSource.getSkillList();
			for (let i in skills) {
				let skillT:tb.TB_skill = tb.TB_skill.get_TB_skillById(skills[i][0]);
				if (skillT && skillT.type != 1){
					let openDgLv = skills[i][1];
					this._arrskilldata.push({ skill: skillT, isShow: false, isShowlist: false, openDgLv, dgLv:this.dataSource.degree });
				}
			}
			this.list_skill.array = this._arrskilldata;
			this.list_skill.selectedIndex = 0;
			this.list_skill.selectEnable = true;
			this.list_skill.width = this._arrskilldata.length * 90 + (this._arrskilldata.length-1) * this.list_skill.spaceX;
			this.lab_name.text = data.getName();
			let attrType = data.getAttrType ? data.getAttrType() : 0;
			this.lab_type.text = LanMgr.godTypeName[attrType];
			let arrGodProperty: number[][] = data.getProperty();
			this.lab_hp.text = Math.floor(arrGodProperty[0][1]).toString();
			this.lab_ack.text = Math.floor(arrGodProperty[1][1]).toString();
			this.lab_def.text = Math.floor(arrGodProperty[2]?arrGodProperty[2][1]:0).toString();
			this.lab_spd.text = Math.floor(arrGodProperty[3]?arrGodProperty[3][1]:0).toString();
			this.onSelectSkill(this.list_skill.selectedIndex);
			this.bgPanel.dataSource = { uiName: UIConst.GuaiwuxinxiView, closeOnSide: this.isModelClose };
		}

		private onSelectSkill(index: number) {
			if(index == -1) return;
			let tbSkill = this._arrskilldata[index].skill;
			this.lab_skill.text = tbSkill.name + "  Lv." + tbSkill.level;
			this.lab_open.text = LanMgr.getLan("",12343,this._arrskilldata[index].openDgLv);
			// let cd = tbSkill.cd > 0 ? `（冷却时间：${tbSkill.cd}回合）` : '';
			this.lab_skilldescription.text = `${tbSkill.info}`;
			this.lab_open.visible = this.dataSource.degree < this._arrskilldata[index].openDgLv;
			this.lab_skill_type.text = LanMgr.getLan("",12342) + ":" + (tbSkill.type == 3 ? LanMgr.getLan("",12340) : LanMgr.getLan("",12341));
			    
            this.lab_open.x = this.lab_skill.x + this.lab_skill.width;
			this.updateSelect();
		}

		private updateSelect():void {
			let index = this.list_skill.selectedIndex;
			for(let i = 0 ; i < this.list_skill.cells.length ; i++){
				let item = this.list_skill.cells[i] as common.SkillBox;
				let isCur = i == index
				item.selectBox.visible = isCur;
				if(isCur) {
					item.selectBox.play();
				}else{
					item.selectBox.gotoAndStop(0);
				}
			}
		}

		/**返回 */
		public close(): void {
			super.close("", true);
			this.bgPanel.dataSource = null;
			this.list_skill.array = null;
			this.list_skill.selectedIndex = -1;
		}
	}
}