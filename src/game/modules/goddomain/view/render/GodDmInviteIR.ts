


module game{
	export class GodDmInviteIR extends ui.goddomain.render.InviteIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: GodDmInviteVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():GodDmInviteVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.lbName.text = info.svo.name;
				this.lbGuild.text = info.svo.guildName?info.svo.guildName:LanMgr.getLan("",12084);
				this.lbForce.text = info.svo.force +"";
				let isInvite = info.isInvite();
                this.btnInvite.label = isInvite ? LanMgr.getLan("",12330) : LanMgr.getLan("",12331);
                this.btnInvite.disabled = isInvite;
                this.btnInvite.on(Laya.Event.CLICK,this,this.onInvite);
				this.headBox.dataSource = new UserHeadVo(info.svo.head,info.svo.level,info.svo.headFrame);
			} else{
				this.headBox.dataSource = null;
				this.btnInvite.off(Laya.Event.CLICK,this,this.onInvite);
			}
		}

        private onInvite():void {
			GodDmThread.getInstance().inviteFriend(this.dataSource).then(()=>{
                this.refreshData();
            });
        }

	}
}