
module game {

    export class TabWarriorView extends ui.task.TabWarriorUI {

        private _model : WarriorProveModel;
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this._model = WarriorProveModel.getInstance();
            this.btnBuy.on(Laya.Event.CLICK,this,this.onBuy);
            this.btnUnlock.on(Laya.Event.CLICK,this,this.onUnlock);
            this.listTask.array = null;
        }

        public close(): void {
            this.listTask.array = null;
            Laya.timer.clearAll(this);
            tl3d.ModuleEventManager.removeEvent(TaskEvent.UPDATE_WARRIOR_EXP, this.initView, this);
            tl3d.ModuleEventManager.removeEvent(TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.initView, this);
        }

        private _endTime : number;
        public initView(): void {
            let model = this._model;
            this.lbLevel.text = App.hero.tasks.warriorLevel + "";
            if(App.hero.tasks.warriorLevel > 0){
                let curTbLv = model.getWarriorVoByLv(App.hero.tasks.warriorLevel);
                this.pgExp.value = App.hero.tasks.warriorExp / curTbLv.tbData.exp;
                this.lbExp.text = `${App.hero.tasks.warriorExp}/${curTbLv.tbData.exp}`;
            }else{
                let nextTbLv = model.getWarriorVoByLv(1);
                this.lbLevel.text = "0";
                this.pgExp.value = 0;
                this.lbExp.text = `0/${nextTbLv.tbData.total_exp}`;
            }
            this.lbTime.text = model.getTimeStr();
            let isUnlock = model.isUnlockJinjie();
            this.btnUnlock.label = isUnlock ? LanMgr.getLan("",12142) : LanMgr.getLan("",12143);
            this.btnUnlock.visible = !isUnlock;
            this.imgSuo.visible = !isUnlock;
            // 按照等级低到高
            let lvList = model.getWarriorList();
            this.listTask.array = lvList;
            // 默认位置 首先默认选择最低可领取在第一个
            let index = lvList.findIndex((vo)=>{
                return vo.isCanReward();
            });
            if(index == -1){
                // 否则，默认位置在第一个未完成的;全部领取完，显示在最底下即可
                index = lvList.findIndex((vo)=>{
                    return !vo.isFinish();
                });
                index = index == -1 ? lvList.length-1 : index;
            }
            this.listTask.scrollTo(index);
            // Laya.timer.frameOnce(1,this,()=>{
            //     this.listTask.scrollTo(index);
            // });
            this._endTime = model.endTime;
            Laya.timer.clear(this,this.updateTime);
            Laya.timer.loop(1000,this,this.updateTime);
            this.updateTime();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_WARRIOR_EXP, this.initView, this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.initView, this);
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

        public onReresh():void {

        }

        /** 购买等级 */
        private onBuy():void {
            dispatchEvt(new TaskEvent(TaskEvent.SHOW_WARRIOR_BUY_LEVEL));
        }
        /** 进阶解锁 */
        private onUnlock():void {
            dispatchEvt(new TaskEvent(TaskEvent.SHOW_WARRIOR_JINJIE));
        }

    }

}