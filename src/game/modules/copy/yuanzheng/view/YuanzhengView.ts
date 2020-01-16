

module game {

    export class YuanzhengView extends ui.yuanzheng.YuanzhengViewUI{

        private _guanqiaList : YZGuanqiaIR[];
        private _baoxiangList : YZBaoxiangIR[];
        constructor(){
            super();
            this.group=UIConst.hud_group;
            this.isModelClose = true;
        }

        createChildren():void {
            super.createChildren();
            this._guanqiaList = [];
            for(let i = 1 ; i <= 15 ; i++){
                this._guanqiaList.push(this["item"+i]);
            }
            this._baoxiangList = [];
            for(let i = 1 ; i <= 5 ; i++){
                this._baoxiangList.push(this["box"+i]);
            }
            this.itemPanel.hScrollBarSkin = "";
            this.imgBg1.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION,1);
            this.imgBg2.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION,2);
            this.imgBg3.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION,3);
            this.imgBg4.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION,4);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.showTopView();
            this.initView(true);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.showTopView();
            this.initView(true);
        }

        public onClosed(): void {
            super.onClosed();
            Laya.Tween.clearTween(this.imgArrow);
            for(let i = 0,len = this._guanqiaList.length ; i < len ; i++){
                this._guanqiaList[i].dataSource = null;
            }
            for(let i = 0,len = this._baoxiangList.length ; i < len ; i++){
                this._baoxiangList[i].dataSource = null;
            }
            tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE,this.updateCount,this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        }

        private showTopView():void {
            let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_shop,callback:this.onShop.bind(this)},
                    {btnId:BtnFuncId.reviveHero,btnSkin:SkinUtil.btn_fuhuo,text:App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui),callback:this.onFuhuo.bind(this)},
                    {btnId:BtnFuncId.recoverHero,btnSkin:SkinUtil.btn_huifu,text:App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui),callback:this.onHuifu.bind(this)},
                    {btnSkin:SkinUtil.btn_zhuzhan,redpointName:"yuanzheng_dispatch",callback:this.onYuanzhu.bind(this)},
				];
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.darkEssence];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onFanHui.bind(this)});
        }

        initView(scrollTo:boolean=false): void {
            let model = YuanzhengModel.getInstance();
            let guanqiasData = model.getGuanqiaList();
            for(let i = 0,len = this._guanqiaList.length ; i < len ; i++){
                this._guanqiaList[i].dataSource = guanqiasData[i];
            }
            let baoxiangsData = model.getBaoxiangList();
            for(let i = 0,len = this._baoxiangList.length ; i < len ; i++){
                this._baoxiangList[i].dataSource = baoxiangsData[i];
            }
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE,this.updateCount,this);

            let itemRender = this._guanqiaList.find((item)=>{
                return item.dataSource.isCurrent();
            });
            this.setIndexImage(itemRender);
            this.updateCount();
            if(scrollTo){
                Laya.timer.callLater(this,this.scrollToItemRender,[itemRender ? itemRender : this._guanqiaList[this._guanqiaList.length-1]]);
            }
        }

        /** 更新药水数量 */
        private updateCount():void {
            let ary = [{btnId:BtnFuncId.reviveHero,text:App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui)},{btnId:BtnFuncId.recoverHero,text:App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui)}];
            dispatchEvt(new HudEvent(HudEvent.UPDATE_SYS_TOP_BTN_INFO),ary);
        }

        /**
		 * 设置当前索引位置
		 * @param guanqia 
		 */
        private setIndexImage(item: YZGuanqiaIR): void {
            if (item) {
                Laya.Tween.clearTween(this.imgArrow);
                this.imgArrow.x = item.x + 13;
                this.imgArrow.y = item.y - 15;
                this.imgArrow.visible = true;
                UIUtil.loop(this.imgArrow,this.imgArrow.x,this.imgArrow.y,1000,30,TweenDirection.down);
            }else{
                this.imgArrow.visible = false;
                Laya.Tween.clearTween(this.imgArrow);
            }
            
        }
        /** 定位 */
        private scrollToItemRender(item: YZGuanqiaIR):void {
            if(item){
                let scrollX = item.x - 360;
                this.itemPanel.scrollTo(scrollX,0);
            }
        }

        private onFuhuo():void {
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_RECOVERY_VIEW,iface.tb_prop.expeditionOpTypeKey.revive));
        }
        private onHuifu():void {
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_RECOVERY_VIEW,iface.tb_prop.expeditionOpTypeKey.recover));
        }
        private onShop():void {
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_SHOP_VIEW),4);
        }

        private onFanHui():void{
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_LILIAN));
        }
        private onYuanzhu():void{
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_HELP_VIEW));
        }

    }
}