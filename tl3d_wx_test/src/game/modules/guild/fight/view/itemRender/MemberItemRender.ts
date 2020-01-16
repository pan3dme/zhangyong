/**
* name 
*/
module game{
	export class MemberItemRender extends ui.guild.fight.render.GuildFightRenderUI{
		constructor(){
			super();
			
		}

		public set dataSource($value: GuildFightMemberVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():GuildFightMemberVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.lbName.text = info.svo.name;
                this.boxUser.dataSource = info.headVo;
                this.godList.array = info.getExistGods();
                this.lbForce.text = LanMgr.getLan('',10117,info.svo.force);
                this.lbScore.text = info.svo.integral.toString();

				let ary = [];
				for(let i = 1 ; i <= tb.TB_guild_war_set.getSet().atk_num ; i++){
					let url = info.svo.atkCount >= i ? SkinUtil.jian_liang : SkinUtil.jian_an;
					ary.push(url);
				}
				this.atkList.array = ary;

				ary = [];
				for(let i = 1 ; i <= tb.TB_guild_war_set.getSet().life_num ; i++){
					let url = info.svo.lifeNum >= i ? SkinUtil.aixin_liang : SkinUtil.aixin_an;
					ary.push(url);
				}
				this.lifeList.array = ary;

				let curHp = info.getLineupCurHp();
				let totalHp = info.getLineupTotalHp();
				this.lbBlood.text = totalHp <= 0 ? "0%" : Math.ceil((curHp / totalHp)*100) + "%";
				this.pgBlood.value = totalHp <= 0 ? 0 : (curHp / totalHp);
				if(info.isMyTeam){
					this.btnChallenge.visible = false;
				}else{
					this.btnChallenge.visible = true;
					this.btnChallenge.label = info.isDead() ? "已击败" : "挑战";
					this.btnChallenge.disabled = info.isDead();
				}
				this.btnChallenge.on(Laya.Event.CLICK,this,this.onChallenge);
			} else{
				this.godList.array = null;
				this.lifeList.array = null;
				this.atkList.array = null;
				this.btnChallenge.off(Laya.Event.CLICK,this,this.onChallenge);
			}
		}

		private onChallenge():void{
			dispatchEvt(new GuildEvent(GuildEvent.CHALLENGE_ENEMY,this.dataSource));
		}

	}
}