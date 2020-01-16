

module game {

    export class ForestGuanqiaBox extends ui.fogforest.GuanqiaBoxUI {

        private uiScenes: Base2dSceneLayerExt;
        constructor() {
            super();
            this.uiScenes = new Base2dSceneLayer();
            this.boxRole.addChild(this.uiScenes);
            this.uiScenes.setModelBox(this, this.lbTitle, this.imgDitu);
        }

        public set dataSource($value:ForestGuanqiaVo) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource():ForestGuanqiaVo {
            return this._dataSource;
        }

        private initView(): void {
            let info = this.dataSource;
            if (info) {
                this.lab_condition.visible = false;
                // this.lab_condition.visible = info.tbForest.need_power > App.hero.force;
                // this.lab_condition.text = LanMgr.getLan("", 12128, info.tbForest.need_power);
                // 单数右边
                let isRight = info.tbForest.ID % 2 == 1;
                this.imgDitu.scaleX = isRight ? 1 : -1;
                this.boxRole.x = isRight ? (this.width/2 + 100) : (this.width/2 - 300);
                this.boxChallenge.x = isRight ? (this.width/2+40) : (this.width/2-120);
                this.ani_guanqia.x = this.boxChallenge.x + this.boxChallenge.width/2;
                this.ani_guanqia.y = this.boxChallenge.y + this.boxChallenge.height/2;
                let isCur = info.isCurrent();
                let isPass = info.isPass();
                this.lbTitle.visible = this.imgDi.visible = true;
                this.lbTitle.text = info.tbForest.name;
                this.imgMask.visible = isPass;
                this.imgMiwu.visible = !isPass && !isCur;
                if(isCur){
                    this.ani_guanqia.play(0, true);
                    this.ani_guanqia.visible = true;
                }else{
                    this.ani_guanqia.stop();
                    this.ani_guanqia.visible = false;
                }
                
                // 需先移除
                this.removeBgEff();
                this.uiScenes.onExit();
                if(!isPass || isCur){
                    this.uiScenes.onShow();
                    Laya.timer.once(300, this, this.delayShow, [info.modelId]);
                    if(isCur){
                        Laya.timer.once(350,this,this.addBgEff);
                    }
                }
                this.boxChallenge.on(Laya.Event.CLICK,this,this.onChallenge);
                this.boxRole.on(Laya.Event.CLICK,this,this.onChallenge);
            }else{
                this.uiScenes.onExit();
                this.removeBgEff();
                Laya.timer.clearAll(this);
                this.boxChallenge.off(Laya.Event.CLICK,this,this.onChallenge);
                this.boxRole.off(Laya.Event.CLICK,this,this.onChallenge);
                this.ani_guanqia.stop();
                this.ani_guanqia.visible = false;
            }
            
        }
        /** 挑战 */
        private onChallenge():void {
            let info = this.dataSource;
            if(info && info.isCurrent()){
                dispatchEvt(new FogForestEvent(FogForestEvent.GUANQIA_CHALLENGE),info);
            }
        }

        //添加背景特效 : 
        private _bgEff:any;
        private _hasbgEff:boolean = false;
        private addBgEff():void{
            let info = this.dataSource;
            if (this._hasbgEff || !info) return;
            this._hasbgEff = true;
            let point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            let v3d = this.uiScenes.get3dPos(point.x+this.boxRole.width/2- Launch.offsetX,point.y+this.boxRole.height- Launch.offsetY);
            this.uiScenes.addEffect(this, 10000022, v3d, 2.5, 30, ($particle) => {
				this._bgEff = $particle;
                if (!this._hasbgEff){
                    this.removeBgEff();
                }
			});
        }

        //移除背景特效
        private removeBgEff():void{
            this._hasbgEff = false;
            if (this._bgEff) {
				this.uiScenes.removeEffect(this._bgEff);
				this._bgEff = null;
			}
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(modeid: any): void {
            let point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            if (this.uiScenes.sceneChar) {
                this.uiScenes.sceneChar.setRoleUrl(getRoleUrl(modeid));
                this.uiScenes.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
            } else {
                let posy = point.y + this.boxRole.height - Launch.offsetY;
                this.uiScenes.addModelChar(modeid, point.x + this.boxRole.width/2 - Launch.offsetX, posy, 180, 2);
            }
        }
    }
}