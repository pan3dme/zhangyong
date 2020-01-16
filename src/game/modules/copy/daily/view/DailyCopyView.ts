

module game {

    export class DailyCopyView extends ui.dailycopy.DailyCopyUI {
        private _curType: number;
        private _overPlusTypeKey:number[] = [iface.tb_prop.overplusTypeKey.dailyCopyNum1,iface.tb_prop.overplusTypeKey.dailyCopyNum2,iface.tb_prop.overplusTypeKey.dailyCopyNum3];
        constructor() {
            super();
            this.isModelClose = true;	
        }
        createChildren(): void {
            super.createChildren();
            this.bgPanel.addChildAt(this.img_bg, 3);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close(type?: string, showEffect?: boolean, sound = true): void {
            super.close(type, showEffect, sound);
        }
        public onClosed(): void {
            super.onClosed();
            this.bgPanel.dataSource = null;
            this.btnBuy.off(Laya.Event.CLICK, this, this.onClick);
            this.list.array = null;
            tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateCount,this);
            tl3d.ModuleEventManager.removeEvent(ResEvent.LIMIT_VALUE_CHANGE,this.updateCount,this);
        }

        /** 初始化界面 */
        private initView(): void {
            //监听
            this.btnBuy.on(Laya.Event.CLICK, this, this.onClick);
            //当前选择的副本
            this._curType = this.dataSource ? this.dataSource : iface.tb_prop.dailyCopyTypeKey.gold;        
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:DailyCopyModel.COPY_NAME[this._curType] };
            //更新界面
            this.updateView();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateCount,this);
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE,this.updateCount,this);
        }

        public updateView(): void {
            let list:DailyCopyInfoVo[] = DailyCopyModel.getInstance().getCopyListByType(this._curType);
            if(!list || list.length <= 0) return;
            this.list.array = list;
            this.updateCount();
            let idx:number = this.getMaxOpenIndex(list);
            this.list.scrollTo(idx-3);
        }

        private getMaxOpenIndex(list:DailyCopyInfoVo[]):number{
            if (!list || list.length == 0) return 0;
            let idx:number = 0;
            for (let i:number = 0; i < list.length; i++){
                if (list[i].isLvLimit()){
                    return idx;
                }
                idx = i;
            } 
            return idx;
        }
        /** 更新数量 */
        public updateCount():void {
            let count = App.hero.getOverplusValue(this._overPlusTypeKey[this._curType-1]);
            if (count <= 0){
                //购买次数
                let total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum);
                 let limitType = DailyCopyModel.getInstance().getLimitType(this._curType);
                count = total - App.hero.getlimitValue(limitType);
                this.lbCount.text = LanMgr.getLan('可购买次数:{0}', -1, count);    
            }else{
                //剩余次数
                this.lbCount.text = LanMgr.getLan('', 10081, count);    
            }
            
        }

        /** 按钮点击 */
        private onClick(event: Laya.Event): void {
            let target = event.target;
            switch (target) {
                case this.btnBuy:
                    let list = DailyCopyModel.getInstance().getCopyListByType(this._curType);
                    dispatchEvt(new DailyEvent(DailyEvent.SHOW_BUY_VIEW, list[0].type));
                    break;
            }
        }
  

 

   

    }
}