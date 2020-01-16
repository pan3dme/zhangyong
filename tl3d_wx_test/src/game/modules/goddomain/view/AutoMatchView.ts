module game{

    /** 自动匹配界面 */
	export class AutoMatchView extends ui.goddomain.AutoMatchUI{

        private _model : GodDomainModel;
        private _thread : GodDmThread;
		constructor(){
			super();
			this.isModelClose = false;
            this._model = GodDomainModel.getInstance();
            this._thread = GodDmThread.getInstance();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            Laya.timer.clearAll(this);
            this.btnCancel.off(Laya.Event.CLICK,this,this.onCancel);
		}

		private initView():void{
            Laya.timer.loop(1000,this,this.updateTime);
            this.updateTime();
            this.btnCancel.on(Laya.Event.CLICK,this,this.onCancel);
            Laya.timer.loop(2000,this,this.matchTeam);
        }

        /** 更新时间 */
        private updateTime():void {
            let time = Math.ceil(App.serverTimeSecond - this._model.matchTime);
            this.lbTime.text = LanMgr.getLan("",10507,time);
        }

        /** 匹配队伍 */
        private matchTeam():void {
            this._thread.requestMyTeamInfo(false).then(()=>{
                if(this._model.hasTeam()){
                    Laya.timer.clearAll(this);
                    this._model.matchTime = 0;
                    this.close();
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                }
            });
        }
        /** 取消匹配 */
        private onCancel():void {
            this._thread.cancelAutoMatch().then(()=>{
                this._model.matchTime = 0;
                if(this._model.hasTeam()){
                    Laya.timer.clearAll(this);
                    this.close();
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                }else{
                    this.close();
                }
            });
        }
    }
}