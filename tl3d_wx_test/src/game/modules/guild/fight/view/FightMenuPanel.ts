/**
* name 
*/
module game{
	export class FightMenuPanel extends ui.guild.fight.GuildFightMenuUI{
		constructor(){
			super();
		}

		public createChildren():void {
            super.createChildren();
            this.updateView();
        }

		public updateView():void{
			let model = GuildFightModel.getInstance();
			let curDate = new Date(App.serverTime);
            let week = curDate.getDay();
			if(model.isJoin()){
				// 默认选择当前段位
				let myTeamVo = model.myTeamVo.teamSvo;
				this.lbDesc.text =  myTeamVo ? `${GuildFightModel.GRADE_NAME[myTeamVo.guildGrade]}赛 ${week}/6` : "已报名";
			}else{
				this.lbDesc.text =  "未报名";
			}
			this.lbTitle.text = LanMgr.getLan('S{0}赛季',-1,model.season);
		}

	}
}