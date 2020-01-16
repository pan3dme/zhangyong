
module game {

    export class TabTrialView extends ui.task.TabTrialUI {

        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this.listBtn.selectHandler = new Handler(this, this.onSelectTab);
            this.listBtn.renderHandler = new Handler(this, this.onRenderTab);
            this.listBtn.selectedIndex = -1;
            this.listBtn.array = [0,1];
            this.btnJiangli.on(Laya.Event.CLICK,this,this.showJinjie);
            this.imgBaoxiang.on(Laya.Event.CLICK,this,this.onLingqu);
        }

        public close(): void {
            this.animGuang.visible = false;
            this.animGuang.gotoAndStop(0);
            this.ani1.gotoAndStop(0);
            Laya.timer.clearAll(this);
            this.listBtn.selectedIndex = -1;
            tl3d.ModuleEventManager.removeEvent(TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateBaoxiangState, this);
        }
        
        private _endTime : number;
        public initView(): void {
			this.listBtn.selectedIndex = 0;
            this.updateBaoxiangState();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateBaoxiangState, this);
        }

        /** 选择标签页 */
		private onSelectTab(index: number) {
			if(index == -1) return;
            let isWeek = index == 0;
            let model = TrialTaskModel.getInstance();
			let dataAry = isWeek ? model.getWeekList(true) : model.getMonthList(true);
			this.listTask.array = dataAry;
			this.listTask.scrollTo(0);
            // 倒计时
            this._endTime = isWeek ? (model.weekEndTime > model.monthEndTime ? model.monthEndTime : model.weekEndTime) : model.monthEndTime;
            Laya.timer.clear(this,this.updateTime);
            Laya.timer.loop(1000,this,this.updateTime);
            this.updateTime();
        }

        /** 渲染tab */
		private onRenderTab(cell: Laya.Box, index: number) {
            let btn = cell.getChildByName("btnTab") as Laya.Button;
            let redpoint = cell.getChildByName("redpoint") as RedPointProp;
            let type = cell.dataSource;
            if(!isNaN(type)) {
                redpoint.setRedPointName(type == 0 ? "task_trial_week" : "task_trial_month");
                btn.label = type == 0 ? LanMgr.getLan("",12144) : LanMgr.getLan("",12145);
                let selectedIndex = this.listBtn.selectedIndex;
                btn.skin = index == selectedIndex ? SkinUtil.fenye_down : SkinUtil.fenye_up;
                btn.labelSize = selectedIndex == index ? 24 : 22;
                btn.labelColors = selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
                btn.labelBold = true;
            }else{
                redpoint.onDispose();
            }
        }

        /** 更新宝箱状态 */
        public updateBaoxiangState():void {
            let model = WarriorProveModel.getInstance();
            let isUnlock = model.isUnlockJinjie();
            let isReward = model.isRewardWeekGift();
            this.btnJiangli.visible = !isUnlock;
            if(isUnlock && !isReward){
                this.ani1.play(0,true);
                this.animGuang.visible = true;
                this.animGuang.play(0,true);
            }else{
                this.animGuang.visible = false;
                this.animGuang.gotoAndStop(0);
                this.ani1.gotoAndStop(0);
            }
            this.imgBaoxiang.skin = isReward ? SkinUtil.help_bx_open : SkinUtil.help_bx_noopen;
            this.imgBaoxiang.gray = !isUnlock;
        }

        /** 倒计时 */
        private updateTime():void {
            let time = this._endTime - App.serverTimeSecond;
            if(time > 0) {
                this.lbLastTime.text = GameUtil.getTimeStr2(time);
            }else{
                this.lbLastTime.text = LanMgr.getLan("",12094,0,0);
                Laya.timer.clear(this,this.updateTime);
            }
        }

        /** 刷新列表 */
        public onReresh():void {
            let isWeek = this.listBtn.selectedIndex == 0;
            let model = TrialTaskModel.getInstance();
			let dataAry = isWeek ? model.getWeekList(true) : model.getMonthList(true);
			this.listTask.array = dataAry;
        }

        /** 领取每周积分礼包 */
        private showJinjie():void {
            dispatchEvt(new TaskEvent(TaskEvent.SHOW_WARRIOR_JINJIE));
        }

        private onLingqu():void {
            let model = WarriorProveModel.getInstance();
            if(!model.isUnlockJinjie()){
                showToast(LanMgr.getLan('', 10452));
                return;
            }
            if(model.isRewardWeekGift()) {
                showToast(LanMgr.getLan('', 10453));
                return;
            }
            PLC.request(Protocol.game_task_getWarriorAdvanceWeekAward, null, (data: any) => {
                if (!data) return;
                App.hero.tasks.warriorWeekAward = data['modifyWarriorWeekAward'] || 0;
                this.updateBaoxiangState();
                let clientAddItemVoList = [];
                clientAddItemVoList.push(new ItemVo(CostTypeKey.warrior_prove,tb.TB_warrior_set.getSet().warrior_gift));
                UIUtil.showRewardView({clientAddItemVoList});
                dispatchEvt(new TaskEvent(TaskEvent.REWARD_WEEK_GIFT_SUCC));
            });
        }

    }

}