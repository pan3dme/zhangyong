
module game{
    export class GuildSkillRender extends ui.guild.skill.GuildSkillRenderUI{

        public attrType : number;
        constructor(){
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource(): GuildSkillVo {
            return this._dataSource;
        }

        public refreshData(): void {
            let info = this.dataSource;
            if(info) {
                this.lb_dengji.text = info.lv + "/" + info.getMaxLv();
                this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                	this.ani_select.play();
            	}), ResConst.atlas_circle_select);
            }else{
                this.ani_select.gotoAndStop(0);
            }
        } 

    }
}