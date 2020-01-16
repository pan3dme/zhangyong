/**
* name 
*/
module game{
	export class GuildDonationItemRender extends ui.guild.donation.GuildDonationItemRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: GuildDonationVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():GuildDonationVo {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
				this.lbName.text = data.tbDonate.desc;
				this.lbGet.text = `公会贡献+${data.getDonate()}`;
				this.imgBg.skin = SkinUtil.getDonationImgUrl(data.tbDonate.ID);
                this.imgCost.skin = SkinUtil.getCostSkin(data.tbDonate.cost[0]);
				this.imgCost.scaleX = 1;
				this.imgCost.scaleY = 1;
				if (data.tbDonate.cost[0] == iface.tb_prop.resTypeKey.gold){
					this.imgCost.scaleX = 0.8;
					this.imgCost.scaleY = 0.8;
				}
                this.lbCost.text = "X" + Snums(data.tbDonate.cost[1]);
				this.btnDonation.disabled = data.isDonate();
				if(!this.btnDonation.disabled){
					this.btnDonation.gray = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate) != 0;
				}
				this.btnDonation.label = data.isDonate() ? "已捐献" : "捐 献";
                this.btnDonation.on(Laya.Event.CLICK,this,this.onDonate);
			} else{
                this.btnDonation.off(Laya.Event.CLICK,this,this.onDonate);
			}
		}

		private onDonate():void{
			dispatchEvt(new GuildEvent(GuildEvent.GUILD_DONATE,this.dataSource));
		}

	}
}