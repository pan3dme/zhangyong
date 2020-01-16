/**
* name 
*/
module game {
    export class DgUpSuccView extends ui.god.UplevelsuccUI {

        private _skillVo : {skill:tb.TB_skill,openDgLv:number,dgLv:number};
        constructor() {
            super();
            this.isModelClose = true;
            this.list_new.renderHandler = new Handler(this, this.onDegreeRender);
            this.list_old.renderHandler = new Handler(this, this.onDegreeRender1);
            this.list_newattr.renderHandler = new Handler(this, this.jichuRender);
            this.list_oldattr.renderHandler = new Handler(this, this.jichuRender);
        }

        public popup() {
            // 先initView下，需要设置宽高
            this.initView();
            super.popup();
            this.bgPanel.dataSource = { title: "comp/title/jinjiechenggong.png" };
        }

        private initView() {
            let uuid = this.dataSource;
            let godvo: GodItemVo = App.hero.getGodVoById(uuid);
            this.setPinjieList(godvo);
        }

        /**设置品阶List */
        private setPinjieList(godvo: GodItemVo): void {
            let degreeNum = godvo.starLevel < 6 ? godvo.starLevel : 6;
            let nowAry = new Array;
            let oldAry = new Array;
            for (let i = 0; i < degreeNum; i++) {
                nowAry.push(godvo.degree);
                oldAry.push(godvo.degree - 1);
            }
            this.list_old.repeatX = degreeNum;
            this.list_old.dataSource = oldAry;

            this.list_new.repeatX = degreeNum;
            this.list_new.dataSource = nowAry;

            let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(godvo.degree -1);
			let nextevotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(godvo.degree);
            this.lab_old.text = LanMgr.getLan("",12355) + "： " + evotab.level;
			this.lab_new.text = LanMgr.getLan("",12355) + "： " + nextevotab.level;

            let nowAttr = godvo.jisuanchushi(godvo.degree - 1);
			let nextAttr = godvo.jisuanchushi(godvo.degree);
            this.list_oldattr.dataSource = nowAttr;
            this.list_newattr.dataSource = nextAttr;

            let skillId = godvo.getSkillIdByDegree(godvo.degree);
            let tbSkill = tb.TB_skill.get_TB_skillById(skillId);
            if(tbSkill){
                this.skillBox.visible = true;
                this.lbName.text = tbSkill.name;
                // let cd = tbSkill.cd > 0 ? `（冷却时间：${tbSkill.cd}回合）` : '';
                this.lab_info.text = `${tbSkill.info}`;
                this.height = this.bgPanel.height = 600;
                this._skillVo = {skill:tbSkill,openDgLv:tbSkill.level,dgLv:godvo.degree};
                this.skillIR.dataSource = this._skillVo;
            }else{
                this.skillBox.visible = false;
                this.skillIR.dataSource = null;
                this.height = this.bgPanel.height = 420;
            }
        }

        /**基础属性加成list */
		private jichuRender(cell: Laya.HBox, index: number): void {
			let data = cell.dataSource;
			if (data) {
				let img_jichu = <Laya.Image>cell.getChildByName("box_img").getChildByName("img_jichu");
				let lab_value = <Laya.Label>cell.getChildByName("lab_value");
				img_jichu.skin = SkinUtil.getAttrSkin(data[0]);
				lab_value.text = `${Math.floor(data[1])}`;
				cell.refresh();
			}
		}

        /**
         * 渲染阶级
         * @param itemRender 
         * @param index 
         */
		private onDegreeRender(itemRender: Laya.Image, index: number) {
			itemRender.gray = itemRender.dataSource - 1 < index;
            if(itemRender.dataSource - 1 == index){
                this.img_eff.x = this.list_new.x + index * 37 + 14;
                this.img_eff.y = this.list_new.y + 16;
                this.ani1.play();
            }
		}

        /**
         * 渲染阶级
         * @param itemRender 
         * @param index 
         */
		private onDegreeRender1(itemRender: Laya.Image, index: number) {
			itemRender.gray = itemRender.dataSource - 1 < index;
		}

        public close() {
            super.close();
            this.bgPanel.dataSource = null;
            this.ani1.stop();
            // 技能开启特效播放
            if(this._skillVo && (UIMgr.hasStage(UIConst.God_MainView) || UIMgr.hasStage(UIConst.God_GodCultureView))) {
                let godView : GodIntroduceView = UIMgr.hasStage(UIConst.God_MainView) ? (UIMgr.getUIByName(UIConst.God_MainView) as GodMainView).godView : (UIMgr.getUIByName(UIConst.God_GodCultureView) as GodCultureView).godView;
                if(!godView) return;
                let viewInfo = godView.viewInfo;
                if(!viewInfo) return;
                let index = viewInfo.skillList.cells.findIndex((cell:GodSkillItemIR)=>{
                    return cell && cell.dataSource && cell.dataSource.skill && cell.dataSource.skill.ID == this._skillVo.skill.ID;
                });
                let targetSkillIR = viewInfo.skillList.getCell(index);
                if(!targetSkillIR) return;
                let targetPos = targetSkillIR.localToGlobal(new Laya.Point(0, 0));
                let skillIR = new GodSkillItemIR();
                skillIR.dataSource = this._skillVo;
                let curPos = this.skillIR.localToGlobal(new Laya.Point(0, 0));
                skillIR.x = curPos.x;
                skillIR.y = curPos.y;
                Laya.stage.addChild(skillIR);
                Laya.Tween.to(skillIR,{x:targetPos.x,y:targetPos.y,alpha:0.3},500,Laya.Ease.linearIn,new Handler(this,()=>{
                    if(godView && (UIMgr.hasStage(UIConst.God_MainView) || UIMgr.hasStage(UIConst.God_GodCultureView))) {
                        viewInfo.bombAnim.x = viewInfo.skillList.x + 50 + 100*index + viewInfo.skillList.spaceX*index;
                        viewInfo.bombAnim.y = viewInfo.skillList.y + 55;
                        viewInfo.bombAnim.visible = true;
                        viewInfo.bombAnim.play(0,false);
                        viewInfo.updateList();
                    }
                    Laya.stage.removeChild(skillIR);
                    Laya.Tween.clearTween(skillIR);
                }),100);
            }
            this._skillVo = null;
        }

        public onClosed():void {
            super.onClosed();
        }
    }
}