


module game{
	export class GodDmTeamIR extends ui.goddomain.render.TeamIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: GodDmTeamListVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():GodDmTeamListVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.lbTeam.text = info.svo.name;
				this.lbGuild.text = info.svo.guildName?info.svo.guildName:LanMgr.getLan("",12084);
				this.lbCount.text = info.svo.memberNum + "";
				this.lbForce.text = info.svo.force +"";
				this.headBox.dataSource = new UserHeadVo(info.svo.head,info.svo.level,info.svo.headFrame);
                this.btnJoin.on(Laya.Event.CLICK,this,this.onJoin);
			} else{
				this.headBox.dataSource = null;
				this.btnJoin.off(Laya.Event.CLICK,this,this.onJoin);
			}
		}

        private onJoin():void {
            dispatchEvt(new GodDomainEvent(GodDomainEvent.JOIN_TEAM),this.dataSource);
        }


	}
}