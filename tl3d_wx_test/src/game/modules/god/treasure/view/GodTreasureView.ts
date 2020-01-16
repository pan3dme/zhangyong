module game {

    export class GodTreasureView extends ui.god.treasure.GodTreasureUI {
        constructor() {
            super();
        }

        public set dataSource(data: GodItemVo) {
            this._dataSource = data;
            this.refreshView();
        }

        public get dataSource():GodItemVo {
            return this._dataSource;
        }

        public refreshView() {
            let info : GodItemVo = this.dataSource;
            if(info){
                let isOpen = App.IsSysOpen(ModuleConst.TREASURE);
                let isHas = info.getCurTreasure() ? true : false;
                this.imgSuo.visible = !isOpen;
                this.btnAdd.visible = isOpen && !isHas;
                this.itemBox.visible = isHas;
                if(isHas){
                    let vo = info.getCurTreasure();
                    this.itemBox.dataSource = vo;
                }else{
                    this.itemBox.dataSource = null;
                }
                this.on(Laya.Event.CLICK,this,this.onClick);
                this.redpoint.setRedPointName(`god_treasure_wear_${info.uuid}`);
            }else{
                this.itemBox.dataSource = null;
                this.imgSuo.visible = this.btnAdd.visible = this.itemBox.visible = false;
                this.off(Laya.Event.CLICK,this,this.onClick);
                this.redpoint.onDispose();
            }
        }

        private onClick():void {
            if(!App.IsSysOpen(ModuleConst.TREASURE)){
                let tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.TREASURE);
                showToast(tbSys.prompt);
                return;
            }
            let info : GodItemVo = this.dataSource;
            if(!info) return;
            let treasureVo = info.getCurTreasure();
            if(treasureVo) {
                TreasureTipsView.showTip(this,treasureVo,info);
            }else{
                dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW),[ChooseTreasureOpenType.wear,null,info]);
            }
        }

    }
}