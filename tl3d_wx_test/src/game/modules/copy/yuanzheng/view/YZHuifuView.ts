

module game {

    export class YZHuifuView extends ui.yuanzheng.HuifuViewUI{

        constructor(){
            super();
            this.isModelClose = true;
        }

        createChildren():void {
            super.createChildren();
            this.godList.mouseHandler = new Handler(this, this.onSelect);
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
            this.godList.array = null;
            this.bgPanel.dataSource = null;
            this.btnUse.off(Laya.Event.CLICK,this,this.onUse);
            tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE,this.updateCount,this);
        }
        
        private initView(): void {
            let str:string = this.dataSource == iface.tb_prop.expeditionOpTypeKey.recover ? LanMgr.getLan("",12469) : LanMgr.getLan("",12470);
            this.bgPanel.dataSource = {uiName:UIConst.Yuanzheng_RecoveryView,closeOnSide:this.isModelClose, title:str};
            this.btnUse.on(Laya.Event.CLICK,this,this.onUse);
            this._curIdx = -1;
            let type = this.dataSource;
            let model = YuanzhengModel.getInstance();
            let godAry = model.getGodsByRecoveryType(type);
            this.godList.array = godAry.map((god)=>{
                let itemVo = new BuzhenListItemVo(god,iface.tb_prop.lineupTypeKey.expedition);
                if(type == iface.tb_prop.expeditionOpTypeKey.recover){
                    itemVo.showBlood = true;
                    itemVo.hp = model.getGodHp(god.uuid);
                    itemVo.totalHp = Math.ceil(god.getPropertyValue(1));
                }
                return itemVo;
            });
            this.updateCount();
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE,this.updateCount,this);
        }

        public delItem():void{
            //先将引用计数制空,再加载
            let itemRender = this.godList.getCell(this._curIdx) as BuzhenGodIR;
            itemRender.chk_select.visible = false;
            this.godList.deleteItem(this._curIdx);
            this.godList.refresh();
            this._curIdx = -1;
        }

        /** 更新药水数量 */
        private updateCount():void {
            let type = this.dataSource;
            if(type == iface.tb_prop.expeditionOpTypeKey.recover){
                //回复
                this.lbDesc.text = LanMgr.getLan('',10118);
                this.lbCount.text = App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui).toString();
                this.costIcon.skin = SkinUtil.getCostSkin(CostTypeKey.huifu_yaoshui);
            }else{
                //复活
                this.lbDesc.text = LanMgr.getLan('',10119);
                this.lbCount.text = App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui).toString();
                this.costIcon.skin = SkinUtil.getCostSkin(CostTypeKey.fuhuo_yaoshui);
            }
        }

        /** 选择计数 */
        private _curIdx : number = -1;
        private onSelect(e: Laya.Event, index: number):void {
            if (e.type == Laya.Event.CLICK) {
                if(this._curIdx == -1){
                    this._curIdx = index;
                    let itemRender = this.godList.getCell(index) as BuzhenGodIR;
                    itemRender.chk_select.visible = true;
                    return;
                }
                if(this._curIdx == index){
                    this._curIdx = -1;
                    let itemRender = this.godList.getCell(index) as BuzhenGodIR;
                    itemRender.chk_select.visible = false;
                }else{
                    let itemRender1 = this.godList.getCell(this._curIdx) as BuzhenGodIR;
                    itemRender1.chk_select.visible = false;
                    let itemRender2 = this.godList.getCell(index) as BuzhenGodIR;
                    itemRender2.chk_select.visible = true;
                    this._curIdx = index;
                }
            }
        }

        private onUse():void {
            let type = this.dataSource;
            if(this._curIdx == -1){
                showToast(LanMgr.getLan('',(type == iface.tb_prop.expeditionOpTypeKey.recover ? 10110 : 10111) ));
                return;
            }
            let itemVo = this.godList.getCell(this._curIdx).dataSource as BuzhenListItemVo;
            let godVo = itemVo ? itemVo.godVo : null;
            if(!godVo){
                showToast(LanMgr.getLan('',(type == iface.tb_prop.expeditionOpTypeKey.recover ? 10110 : 10111) ));
                return;
            }
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.RECOVERY_GOD,{type,godVo:godVo}));
        }
        
    }
}