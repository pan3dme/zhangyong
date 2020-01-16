module game{

    /** 邀请你组队 */
	export class InviteJoinView extends ui.goddomain.InviteJoinUI{

        private _thread : GodDmThread;
		constructor(){
			super();
			this.isModelClose = false;
            this._thread = GodDmThread.getInstance();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            Laya.timer.clearAll(this);
            this.btnYes.off(Laya.Event.CLICK,this,this.onYes);
            this.btnNo.off(Laya.Event.CLICK,this,this.onNot);
            this.checkBox.off(Laya.Event.CHANGE,this,this.onChange);
		}

        private _cd : number;
		public initView():void{
            this.checkBox.selected = false;
            this._cd = tb.TB_fight_goddomain_set.getSet().invite_time;
            let info : {playerId,name} = this.dataSource;
            this.lab_title.text = "激战神域邀请"
            this.lbContent.text = `你的好友${info.name}邀请你组队，一起激战神域，是否要加入？`;
            Laya.timer.loop(1000,this,this.updateTime);
            this.updateTime();
            this.btnYes.on(Laya.Event.CLICK,this,this.onYes);
            this.btnNo.on(Laya.Event.CLICK,this,this.onNot);
            this.checkBox.on(Laya.Event.CHANGE,this,this.onChange);
        }

        /** 更新时间 */
        private updateTime():void {
            if(this._cd <= 0){
                Laya.timer.clear(this,this.updateTime);
                this.close();
                return;
            }
            this.lbTime.text = `倒计时：${this._cd}秒`;
            this._cd --;
        }

        
        private onYes():void {
            let info : {playerId,name} = this.dataSource;
            this._thread.joinInvite(info.playerId).then(()=>{
                this.close();
                dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_GODDOMAIN_VIEW));
            });
        }

        private onNot():void {
            let info : {playerId,name} = this.dataSource;
            this._thread.refuseInvite(info.playerId).then(()=>{
                this.close();
            });
        }

		private onChange():void {
            let info : {playerId,name} = this.dataSource;
			let state = this.checkBox.selected ? iface.tb_prop.groupInviteTypeKey.no : iface.tb_prop.groupInviteTypeKey.yes;
			this._thread.todayRefuseJoin(info.playerId,state).then((setInvite)=>{
				this.checkBox.selected = setInvite == iface.tb_prop.groupInviteTypeKey.no ? true : false;
			});
		}
    }
}