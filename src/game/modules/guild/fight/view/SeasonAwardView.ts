
module game{
	/** 赛季奖励 */
	export class SeasonAwardView extends ui.guild.fight.SeasonAwardUI{
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
			this.tabbar.selectedIndex = -1;
			this.awardList.array = null;
			this.rankList.array = null;
			this._rankList = null;
		}

		private initView():void{
			this.awardList.array = null;
			this.rankList.array = null;
			this.lbDesc.text = `暂无公会达到王者段位`;
			this.tabbar.selectHandler = new Handler(this,this.selectTab);
			this.tabbar.selectedIndex = 0;
			this.requestRank();
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:`赛季排名` };
		}

		private selectTab(index:number):void{
			if(index == -1) return;
			this.viewStack.selectedIndex = index;
			if(index == 0){
				let list = [];
				let ary = tb.TB_guild_season.get_TB_guild_season();
				for(let i = 0 ; i < ary.length ; i++){
					list.push({rank:(i+1),tbSeason:ary[i]});
				}
				this.awardList.array = list;
			}else{
				this.rankList.array = this._rankList;
			}
		}
		
		private _rankList : IWarGuildRankSvo[];
		/** 请求排行榜 */
		private requestRank():void{
            PLC.request(Protocol.guild_guildWar_getGradeList,null,($data:any)=>{
                if(!$data) {
					this.lbDesc.text = `暂无公会达到王者段位`;
					return;
				}
				this._rankList = [];
				for(let svo of $data.gradeList){
					this._rankList.push(svo);
				}
				this._rankList.sort((a,b)=>{
					return b.score - a.score;
				});
				for(let i = 0 ; i < this._rankList.length ; i++){
					let info = this._rankList[i];
					info.rank = i+1;
				}
				if(this.tabbar.selectedIndex == 1){
					this.rankList.array = this._rankList;
				}
				if($data.myRank > 0){
					this.lbDesc.text = `我的赛季积分:${$data.rankValue}  我的排名:${$data.myRank}`;
				}else{
					this.lbDesc.text = `我的赛季积分:${$data.rankValue}  我的排名:未入王者`;
				}
            });
		}

	}
}