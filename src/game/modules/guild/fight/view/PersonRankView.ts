
module game{
	/** 会员排名 */
	export class PersonRankView extends ui.guild.fight.PersonRankUI{
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
			this.awardList.array = null;
			this.rankList.array = null;
			this.lbDesc.text = "";
			this._rankList = null;
			this.combo.selectedIndex = -1;
			this.tabBar.selectedIndex = -1;
		}

		private initView():void{
			this.awardList.array = null;
			this.rankList.array = null;
			this.tabBar.selectHandler = new Handler(this,this.selectTab);
			this.combo.selectHandler = new Handler(this,this.selectTCombo);
			this.tabBar.selectedIndex = 0;
			this.lbDesc.visible = false;
			this.empty.visible = false;
			this.requestRank();
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:`会员排名` };
		}

		private selectTab(index:number):void{
			if(index == -1) return;
			this.viewStack.selectedIndex = index;
			if(index == 0){
				if(this.combo.selectedIndex == -1){
					// 默认选择当前段位
					let myTeamVo = GuildFightModel.getInstance().myTeamVo.teamSvo;
					let grade = myTeamVo ? myTeamVo.guildGrade : GuildGrade.wangzhe;
					this.combo.selectedIndex = grade-1;
				}
			}else{
				this.rankList.array = this._rankList;
			}
		}

		/** 选择段位 */
		private selectTCombo(index:number):void {
			if(index == -1) return;
			let list = [];
			let ary = tb.TB_person_season.get_TB_person_season("dan",index+1);
			for(let i = 0 ; i < ary.length ; i++){
				list.push(ary[i]);
			}
			this.awardList.array = list;
		}


		private _rankList : IWarMemberRankVo[];
		/** 请求排行榜 */
		private requestRank():void{
			if(!GuildFightModel.getInstance().isJoin()) {
				this.empty.visible = true;
				this.lbDesc.visible = false;
				return;
			}
            PLC.request(Protocol.guild_guildWar_getMemberRankList,null,($data:any)=>{
                if(!$data){
					this.empty.visible = true;
					this.lbDesc.visible = false;
					return;
				} 
				this._rankList = [];
				for(let svo of $data.memberRankList){
					this._rankList.push(svo);
				}
				this._rankList.sort((a,b)=>{
					return b.score - a.score;
				});
				for(let i = 0 ; i < this._rankList.length ; i++){
					let info = this._rankList[i];
					info.rank = i+1;
				}
				if(this.tabBar.selectedIndex == 1){
					this.rankList.array = this._rankList;
				}
				this.empty.visible = false;
				this.lbDesc.visible = true;
				if($data.myRank > 0){
					this.lbDesc.text = `我的赛季积分:${$data.rankValue}  我的排名:${$data.myRank}`;
				}else{
					this.lbDesc.text = `我的赛季积分:${$data.rankValue}  我的排名:未上榜`;
				}
            });
		}
		
	}
}