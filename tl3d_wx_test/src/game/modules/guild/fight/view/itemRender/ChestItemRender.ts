/**
* name 
*/
module game{
	export class ChestItemRender extends ui.guild.fight.render.ChestItemRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: IGuildChestSvo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IGuildChestSvo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.bg.skin = SkinUtil.getGuildGradeBg(info.grade);
				if(info.name){
					let itemVo = new ItemVo(iface.tb_prop.resTypeKey.guildDonate,info.num);
                    this.itemBox.dataSource = itemVo;
					this.lbItemName.stroke = this.lbName.stroke = 2;
					if(info.grade == GuildGrade.bojin){
						this.lbItemName.strokeColor = this.lbName.strokeColor = "#bc5305";
					}else if(info.grade == GuildGrade.wangzhe){
						this.lbItemName.strokeColor = this.lbName.strokeColor = "#d34d24";
					}else{
						this.lbItemName.strokeColor = this.lbName.strokeColor = "#374873";
					}
					this.lbItemName.text = itemVo.getName();
                    this.lbName.text = info.name;
                    this.itemBox.visible = this.lbName.visible = this.lbItemName.visible = true;
                    this.icon.visible = false;
                }else{
                    this.itemBox.visible = this.lbName.visible = this.lbItemName.visible = false;
                    this.icon.visible = true;
                }
                this.on(Laya.Event.CLICK,this,this.onClick);
			} else{
				this.off(Laya.Event.CLICK,this,this.onClick);
			}
		}

        private onClick():void {
            let info = this.dataSource;
			if(info && !info.name){
				let model = GuildFightModel.getInstance();
				if(model.maxGuildGrade < info.grade){
					showToast(LanMgr.getLan(``,10399,GuildFightModel.GRADE_NAME[info.grade]));
					return;
				}
				if(model.isRewardByGrade(info.grade)){
					showToast(LanMgr.getLan(``,10400));
					return;
				}
				let args = {};
				args[Protocol.game_guild_getGuildWarBoxReward.args.grade] = info.grade;
				args[Protocol.game_guild_getGuildWarBoxReward.args.pos] = info.index;
				PLC.request(Protocol.game_guild_getGuildWarBoxReward,args,($data:any)=>{
					if(!$data) return;
					if($data.hasOwnProperty('modifyBoxAwardCount')){
						App.hero.guildWarAwardCount = $data['modifyBoxAwardCount'];
					}
					UIUtil.showRewardView($data.commonData);
					let modifyObj = $data.modifyBoxList[info.index];
					if(modifyObj){
						info.name = modifyObj.name;
						info.num = modifyObj.num;
					}
					this.refreshData();
					dispatchEvt(new GuildEvent(GuildEvent.REWARD_CHEST_SUCCESS));
				});
            }
        }
	}
}