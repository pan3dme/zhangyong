
module game {

    export class BianQiangView extends ui.task.bianqiang.BianQiangUI {

        constructor(){
            super();
            this.isModelClose = true;
			this.bgPanel.dataSource = {uiName:UIConst.BianQiangView,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12149)};
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed():void {
            super.onClosed();
            this.btnClose.off(Laya.Event.CLICK, this, this.close);
            tl3d.ModuleEventManager.removeEvent(TaskEvent.UPDATE_ACHIEVEMENT_DATA,this.onReresh,this);
        }

        /** 初始化界面 */
        private initView():void {
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
            this.tabBar.selectHandler = new Laya.Handler(this,this.onTabSel);
            this.tabBar.selectedIndex = this.dataSource ? parseInt(this.dataSource):0;
            this.onTabSel(this.tabBar.selectedIndex);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_ACHIEVEMENT_DATA,this.onReresh,this);
        }

        /** tab切换 0:变强 1：挑战 */
        private onTabSel(index:number):void {
            this.viewStack.selectedIndex = index;
            if(index == 0){
                this.BianQiangList.array = this.getBianQiangList();
            }else if(index == 1){
                this.challengeList.array = BianQiangModel.getInstance().filterChallengeTask();
            }
        }

        //获取变强列表
        private getBianQiangList():tb.TB_growth_guide[]{
            let arr:tb.TB_growth_guide[] = tb.TB_growth_guide.getGrowthGuideList();
            let need:tb.TB_growth_guide[] = [];
            for(let i:number = 0; i < arr.length; i++){
                if (this.isOpenSys(arr[i].link)){
                    need.push(arr[i]);
                }
            }
            return need;
        }

        //是否开启
        private isOpenSys(link:any):boolean{
            if (!link || !Array.isArray(link) || link.length < 1) return false;
            let sysID = link[0];
            let param1 = link[1];
            let param2 = link[2];
            let tbSys = tb.TB_sys_open.get_TB_sys_openById(parseInt(sysID));
            /** 判断系统是否开启 */
            if (tbSys && !App.IsSysOpen(tbSys.ID)) {
                return false;
            }
            return true;
        }

        /** 刷新列表 -- 顺序改变 */
        resetTaskList():void {
            if(this.viewStack.selectedIndex == 1){
                this.challengeList.array = BianQiangModel.getInstance().filterChallengeTask();
            }
        }
       
        /** 任务数据更新 */
        private onReresh():void {
            if(this.viewStack.selectedIndex == 1){
                this.challengeList.refresh()
            }
        }

    }

}