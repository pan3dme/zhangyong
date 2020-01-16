

module game {
    export class YZHelpView extends ui.yuanzheng.HelpViewUI{

        private _model : YuanzhengModel;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = {uiName:UIConst.Yuanzheng_RewardView,closeOnSide:this.isModelClose,closeOnButton:false, title:LanMgr.getLan("",12471)};
            this.tabbar.selectedIndex = -1;
            this.tabbar.selectHandler = new Handler(this,this.onSelect);
            this.listHelpFriend.array = null;
            this.listHelpMe.array = null;
            this._model = YuanzhengModel.getInstance();
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this.tabbar.selectedIndex = -1;
            this.listHelpFriend.array = null;
            this.listHelpMe.array = null;
            this.godList = null;
        }

        private initView(): void {
            this.tabbar.selectedIndex = 0;
        }

        private onSelect(index:number):void {
            if(index < 0) return;
            let helpMe : boolean = index == 0;
            this.lbCount.visible = this.lbHelpMeDesc.visible = this.listHelpMe.visible = helpMe;
            this.lbHelpFriendDesc.visible = this.listHelpFriend.visible = !helpMe;
            this.boxEmpty.visible = helpMe;
            if(helpMe){
                this._model.requestHelpMeList().then(()=>{
                    this.renderHelpMe();
                });
            }else{
                this._model.requestDispatchList().then(()=>{
                    this.renderHelpFriend();
                });
            }
        }

        public renderHelpMe():void {
            let model = this._model;
            let list = model.getHelpMeList();;
            this.listHelpMe.array = list;
            this.boxEmpty.visible = list.length == 0;
            this.lbHelpMeDesc.text = LanMgr.getLan("",12473,tb.TB_copy_set.getCopySet().hire_fight_percent);
            this.lbCount.text = LanMgr.getLan("",12472,model.getHireCount(),tb.TB_copy_set.getCopySet().hire_num);
        }

        public godList : GodItemVo[];
        public renderHelpFriend():void {
            if(!this.godList){
                // 显示神力前20且等级大于30级的英雄
                this.godList = [];
                let godAry = [...App.hero.getGodArr()];
                godAry.sort((a,b)=>{
                    return b.getShenli() - a.getShenli();
                });
                this.godList = godAry.filter((vo,index)=>{
                    return index < 20 && vo.level >= YuanzhengModel.SHANGZHEN_LEVEL && !this._model.isDispatch(vo.uuid);
                });
                let model = this._model;
                for(let vo of model.getMyDispatchList()){
                    this.godList.unshift(vo.godVo);
                }
            }
            this.listHelpFriend.array = this.godList;
            this.boxEmpty.visible = false;
        }
        
    }
}