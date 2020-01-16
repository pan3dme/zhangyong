module game{

    /** 队伍匹配界面 */
	export class TeamMatchView extends ui.goddomain.TeamMatchUI{

        private _model : GodDomainModel;
		constructor(){
			super();
			this.isModelClose = false;
		}

        createChildren():void {
            super.createChildren();
            this._model = GodDomainModel.getInstance();
            this.memberList.renderHandler = new Handler(this,this.itemRender)
        }

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            this.btnCancel.disabled = false;
            this.memberList.array = null;
            this.btnCancel.off(Laya.Event.CLICK,this,this.onCancel);
            Laya.timer.clearAll(this);
		}

		private initView():void{
            this.memberList.array = this._model.myTeam.getMemberList();
            this.btnCancel.on(Laya.Event.CLICK,this,this.onCancel);
            Laya.timer.loop(2000,this,this.requestBattle);
            Laya.timer.loop(1000,this,this.updateTime);
            this.updateTime();
        }
        /** 获取战报 */
        private requestBattle():void {
            let args = {};
            args[Protocol.friend_group_getBattleInfo.args.regTime] = this._model.myTeam.regTime;
            PLC.request(Protocol.friend_group_getBattleInfo, args, ($data,msg,msgid) => {
                if (!$data) {
                    loghgy("获取战报报错 ----",msgid);
                    if(msgid == Lans.GroupNotRegTime){
                        this.toClose();
                    }
                    return;
                }
                this.doBattle($data);
            },false);
        }
        /** 播放战报 */
        private doBattle($data:any):void {
            Laya.timer.clearAll(this);
            let myTeam = this._model.myTeam;
            myTeam.setBattleMemberInfo($data["leftInfo"],$data["rightInfo"],$data["waveResults"],$data["winCamp"]);
            myTeam.regTime = 0;
            myTeam.autoStartTime = 0;
            this.btnCancel.disabled = true;

            let copyvo = new FightVo();
            copyvo.copyType = CopyType.godDomain;
            copyvo.godDomainVo = myTeam;

            let page = new ServerPage();
            page.initPage($data.battleReport.reportData);
            page.result = $data.winCamp == 1 ? playState.VICTORY : playState.FAILURE;//左方胜利就为胜
            copyvo.fightPageControl = page;
            let enterVo: EnterFightVo = { vo: copyvo, event: new GodDomainEvent(GodDomainEvent.SHOW_GODDOMAIN_VIEW),responseData:$data };
            dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        }
        /** 更新时间 */
        private updateTime():void {
            let regTiem = this._model.myTeam.regTime;
            let time = Math.ceil(App.serverTimeSecond - regTiem);
            this.lbTime.text = LanMgr.getLan(``,10507,time);
        }
        /** 取消 */
        private onCancel():void {
            common.AlertBox.showAlert({
                text: LanMgr.getLan(``,10506), confirmCb: () => {
                    let self = this._model.myTeam.getSelfInfo();
                    GodDmThread.getInstance().cancelMatch(self).then((data)=>{
                        if(data.battleReport){
                            this.doBattle(data);
                        }else{
                            this.toClose();
                        }
                    });
                }, parm: null,yes:LanMgr.getLan(``,10508),no:LanMgr.getLan(``,10509)
            });
        }
        /** 关闭界面 : 主动或者被动取消匹配 */
        private toClose():void {
            this._model.myTeam.autoStartTime = Math.floor(App.serverTimeSecond) + 30;
            if(UIMgr.hasStage(UIConst.GodDm_TeamView)){
                let view = UIMgr.getUIByName(UIConst.GodDm_TeamView) as GodDmTeamView;
                view.updateListTick();
                view.checkState();
                view.updateView();
            }
            this.close();
        }

        /** 渲染成员数据 */
        private itemRender(cell:Laya.Box,index:number):void {
            let lbName = cell.getChildByName("lbName") as Laya.Label;
            let lbCount = cell.getChildByName("lbCount") as Laya.Label;
            let info = cell.dataSource as GodDmMemberVo;
            lbName.text = info.svo.name;
            lbCount.text = info.getRewardCnt() + "";
        }

        
    }
}