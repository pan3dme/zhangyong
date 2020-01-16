
module game{
	/** 赛区排名 */
	export class GroupRankView extends ui.guild.fight.GroupRankUI{
		constructor(){
			super();
            this.isModelClose = true;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();		
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();		
		}

        public onClosed():void{
			super.onClosed();
			this.rankList.array = null;
		}

		private initView():void{
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:`赛区排名` };
			this.rankList.array = null;
			this.requestRank();
		}

		/** 请求排行 */
		requestRank():void {
			PLC.request(Protocol.guild_guildWar_getGroupList,null,($data:any)=>{
				if(!$data) return;
				let model = GuildFightModel.getInstance();
				// 更新maxGuildGrade
				model.updateSeason($data);
				// let upGradeType = $data.upGradeType;
				let grade = $data.guildGrade;
				let resultList :IWarGuildRankSvo[] = [];
				for(let i = 0 ; i < $data.groupList.length ; i ++){
					let info : IWarGuildRankSvo = $data.groupList[i];
					info.guildGrade = grade;
					resultList.push(info);
				}
				// 排序
				resultList.sort((a,b)=>{
					return b.score - a.score;
				});
				// let myRank = $data.myRank ? $data.myRank : 0;
				let tbDan = tb.TB_dan.get_TB_danById(grade);
				for(let i = 0 ; i < resultList.length ; i++){
					let info = resultList[i];
					info.rank = i+1;
					info.upType = model.getUpgradeType(tbDan,info.rank);
				}
				// let rankVo : IGroupRankVo = {groupList:resultList,upGradeType,guildGrade:grade,myRank};
				this.bgPanel.updateTitle(`${GuildFightModel.GRADE_NAME[grade]}组排名`);
				this.rankList.array = resultList;
			});
		}

	}

	
}