
module game {
    export class DailyCopyMainView extends ui.dailycopy.DailyCopyMainUI {
        public static BOX_NUM:number = 3;//三个箱子（精炼，宝石，碎片）
        private uiScene: Base2dSceneLayerExt;
        private _overPlusTypeKey:number[] = [iface.tb_prop.overplusTypeKey.dailyCopyNum1,iface.tb_prop.overplusTypeKey.dailyCopyNum2,iface.tb_prop.overplusTypeKey.dailyCopyNum3];
        constructor() {
            super();
            this.group = UIConst.hud_group;
        }
        createChildren(): void {
            super.createChildren();
            this.boxCopy0.on(Laya.Event.CLICK, this, this.onClickBox,[0]);
            this.boxCopy1.on(Laya.Event.CLICK, this, this.onClickBox,[1]);
            this.boxCopy2.on(Laya.Event.CLICK, this, this.onClickBox,[2]);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.DAILY_COPY);
            this.uiScene = new Base2dSceneLayerExt();
            this.imgBg.addChild(this.uiScene);
            this.itemPanel.hScrollBarSkin = "";
            if(this.itemPanel.hScrollBar){
                this.itemPanel.hScrollBar.on(Laya.Event.CHANGE,this,this.onScrollChange);
            }
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.itemPanel.width = w;
            this.itemPanel.height = h;
            this.lbDesc.y = GameUtil.isFullScreen() ? (HudModel.TOP_ADD_HEIGHT+140) : 140;
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
            Laya.timer.clearAll(this);
            for (let i:number = 0; i < DailyCopyMainView.BOX_NUM; i++){
                let uiRed:RedPointProp = this["ui_red_"+i];
                if (uiRed) uiRed.onDispose();
            }
            this.ani1.stop();
            UIMgr.hideUIByName(UIConst.SysTopView);
            this.itemPanel.hScrollBar.value = 0;
            this.uiScene.onExit();
        }

        private initView(): void {
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList:null,closeCallback:this.onFanHui.bind(this)});
            for (let i:number = 0; i < DailyCopyMainView.BOX_NUM; i++){
                let uiRed:RedPointProp = this["ui_red_"+i];
                if (uiRed) uiRed.setRedPointName(`dailyCoyp_tab${this._overPlusTypeKey[i]}`);
            }
            this.itemPanel.hScrollBar.value = 0;
            Laya.timer.frameOnce(2,this,this.delayScroll);
            this.ani1.play(0,true);
            this.uiScene.onShow();
        }

        private delayScroll():void{
            this.addGuangEff();
            Laya.timer.frameOnce(1,this,()=>{
                this.itemPanel.scrollTo(180);
            });
        }

        private onClickBox(index:number):void{
            let type:number = iface.tb_prop.dailyCopyTypeKey.gold;
            if (index == 1){
                type = iface.tb_prop.dailyCopyTypeKey.exp;
            }else if (index == 2){
                type = iface.tb_prop.dailyCopyTypeKey.chip;
            }
            UIMgr.showUI(UIConst.Copy_DailyView, type);
        }

        private onFanHui():void{
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_LILIAN));
        }

        private _coinEff1:tl3d.CombineParticle;
        private _coinEff2:tl3d.CombineParticle;
        private _coinEff3:tl3d.CombineParticle;
        private addGuangEff(): void {
            let targetPos = this.img_box_0.localToGlobal(new Laya.Point(0, 0));
            let pos = this.uiScene.get3dPos(targetPos.x+150 - Launch.offsetX, targetPos.y+120- Launch.offsetY);
            this.uiScene.addEffect(this, 1000008, pos, 3, 30, ($particle: tl3d.CombineParticle) => {
                if(this._coinEff1){
                    this.uiScene.removeEffect(this._coinEff1);
                }
                this._coinEff1 = $particle;
            });

            targetPos = this.img_box_1.localToGlobal(new Laya.Point(0, 0));
            pos = this.uiScene.get3dPos(targetPos.x+150 - Launch.offsetX, targetPos.y+120- Launch.offsetY);
            this.uiScene.addEffect(this, 1000008, pos, 3, 30, ($particle: tl3d.CombineParticle) => {
                if(this._coinEff2){
                    this.uiScene.removeEffect(this._coinEff2);
                }
                this._coinEff2 = $particle;
            });

            targetPos = this.img_box_2.localToGlobal(new Laya.Point(0, 0));
            pos = this.uiScene.get3dPos(targetPos.x+150 - Launch.offsetX, targetPos.y+120- Launch.offsetY);
            this.uiScene.addEffect(this, 1000008, pos, 3, 30, ($particle: tl3d.CombineParticle) => {
                if(this._coinEff3){
                    this.uiScene.removeEffect(this._coinEff3);
                }
                this._coinEff3 = $particle;
            });
        }

        private onScrollChange(): void {
            if (this.itemPanel.hScrollBar) {
                this.uiScene.x = -this.itemPanel.hScrollBar.value;
            }
        }
    }
}