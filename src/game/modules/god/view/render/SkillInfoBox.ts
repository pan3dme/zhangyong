/**
* name 
*/
module game {
    export class SkillInfoBox extends ui.god.render.SkillInfoBoxUI {

        private _buffList : Laya.Component[] = [];
        constructor() {
            super();
            this.lbName.autoSize = true;
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        public refreshData() {
            let info : {skill,openDgLv,dgLv,index,godId} = this._dataSource;
            if (info) {
                let maxStarLv = 10;
                let tbGod = tb.TB_god.get_TB_godById(info.godId);
                if(tbGod){
                    maxStarLv = tbGod.star[1];
                }
                this.ui_icon.dataSource = {skill:info.skill,openDgLv:info.openDgLv,dgLv:10};
                let skill: tb.TB_skill = info.skill;
                this.lbName.text = skill.name + "  Lv." + skill.level;
                this.lab_type.text = LanMgr.getLan("",12342) + ":" + (skill.type == 3 ? LanMgr.getLan("",12340) : LanMgr.getLan("",12341));

                this.clearBuffList();
                if(skill.effect_desc && skill.effect_desc.length > 0) {
                    let img = new Laya.Image(SkinUtil.fengexian);
                    img.width = 344;
                    img.x = 28;
                    this.addChildAt(img,1);
                    this._buffList.push(img);
                    for(let i = 0 , len = skill.effect_desc.length ; i < len ; i++){
                        let buffDesc = tb.TB_skill_desc.getTbSkillDesc(skill.effect_desc[i]);
                        if(buffDesc){
                            let lbName = new Laya.Label();
                            lbName.fontSize = 22;
                            lbName.color = ColorConst.LIGHT;
                            lbName.x = 28;
                            lbName.text = `【${buffDesc.name}】`;
                            this.addChild(lbName);
                            this._buffList.push(lbName);
                            let lbDesc = new Laya.Label();
                            lbDesc.autoSize = true;
                            lbDesc.width = 344;
                            lbDesc.wordWrap = true;
                            lbDesc.leading = 5;
                            lbDesc.fontSize = 20;
                            lbDesc.color ="#b59c7e";
                            lbDesc.x = 28;
                            lbDesc.text = buffDesc.desc;
                            this.addChild(lbDesc);
                            this._buffList.push(lbDesc);
                        }
                    }
                }
                // let cd = skill.cd > 0 ? `（冷却时间：${skill.cd}回合）` : '';
                this.lab_info.text = `${skill.info}`;
                if (info.openDgLv > 0 && info.dgLv < info.openDgLv){
                    //未解锁
                    this.lab_condition.text = LanMgr.getLan("", 12368, info.openDgLv);
                }else{
                    let nextLv:number = game.GodUtils.getSkillUpLvCondition(info.index, skill.level,maxStarLv);
                    if (nextLv == 0){
                        this.lab_condition.text = LanMgr.getLan("", 12369);
                    }else{
                        this.lab_condition.text = LanMgr.getLan("", 12370, nextLv);
                    }
                }
                this.layoutView();
            } else {
                this.clearBuffList();
                this.lab_info.text = this.lbName.text = "";
                this.ui_icon.dataSource = null;
            }
        }

        private layoutView():void{
            let posy:number = this.lab_info.y + this.lab_info.height + 5;
            if(this._buffList.length > 0) {
                for(let i = 0 , len = this._buffList.length ; i<len ;i++){
                    let comp = this._buffList[i];
                    comp.y = posy;
                    // 分割线之后要加10
                    posy += comp.height + (i == 0 ? 10 : 5);
                }
            }
            this.img_split.y = posy;
            posy += 15;
            this.lab_condition.y = posy;
            this.height = posy + this.lab_condition.height + 20;
        }

        private clearBuffList():void {
            for(let comp of this._buffList){
                comp.removeSelf();
            }
            this._buffList.length = 0;
        }
    }
}