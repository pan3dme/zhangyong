
module game{
	/** 段位宝箱 */
	export class GradeChestView extends ui.guild.fight.GradeChestUI{

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
			this.itemList.array = null;
			this.tabbar.selectedIndex = -1;
		}

		private initView():void{
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:"段位宝箱" };
			this.itemList.array = null;
			this.tabbar.selectHandler = new Handler(this,this.selectTab);
			this.tabbar.selectedIndex = 0;
		}

		private selectTab(index:number):void {
			if(index == -1) return;
			let grade = index == 0 ? GuildGrade.baiyin : (index == 1 ? GuildGrade.bojin : GuildGrade.wangzhe);
			if( GuildFightModel.getInstance().maxGuildGrade >= grade ){
				let args = {};
				args[Protocol.guild_guildWar_getBoxList.args.grade] = grade;
				PLC.request(Protocol.guild_guildWar_getBoxList,args,($data:any)=>{
					if(!$data) {
						this.itemList.array = null;
						return;
					}
					for(let i = 0 ; i < $data.boxList.length ; i++){
						let svo : IGuildChestSvo = $data.boxList[i];
						svo.index = i;
						svo.grade = grade;
					}
					this.itemList.array = $data.boxList;
				});
			}else{
				let tbGuild = tb.TB_guild.get_TB_guildById(GuildModel.getInstance().guildInfo.level);
				let num = tbGuild ? tbGuild.limit_num : 10;
				let ary = [];
				for(let i = 0 ; i < num ;i++){
					ary.push({index:i,grade:grade});
				}
				this.itemList.array = ary;
			}
		}
	}


	
}