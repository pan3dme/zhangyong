/**
* name 
*/
module game {
    export class GodSkillItemIR extends ui.god.render.SkillItemIRUI {
        
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():{skill:tb.TB_skill,openDgLv:number,dgLv:number} {
            return this._dataSource;
        }

        public refreshData() {
            let info = this.dataSource;
            if (info && info.skill) {
                let skill: tb.TB_skill = info.skill;
                this.icon.skin = skill.getIconUrl();
                let isOpen = info.dgLv >= info.openDgLv;
                this.icon.gray = this.imgSuo.visible = !isOpen;
                this.lab_lv.visible = isOpen;
                this.lab_lv.text = "Lv." + skill.level;
            }else{
                this.icon.skin = null;
                this.icon.gray = false;
                this.imgSuo.visible = false;
                this.lab_lv.visible = false;
            }
        }
    }
}