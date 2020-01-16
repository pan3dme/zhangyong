
module game {

    export class IGuideTalkOpt {
        text: string;      // 文本
        remove: boolean;  // 是否点击移除界面
        model: number;      // 引导模型
        modelName: string;
        modelScale: number;
        location: number;  // 模型位置
        hidePass : boolean;
    }
    /** 模型位置 */
    export enum LocationType {
        center = 0,     // 中间
        left = 1,       // 左边
        right = 2       // 右边
    }

    export class GuideTalkView extends ui.guide.GuideTalkUI {

        private _opt: IGuideTalkOpt;
        private _htmlText: Laya.HTMLDivElement;
        private uiScene: Base2dSceneLayer;
        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this._htmlText = new Laya.HTMLDivElement();
            this._htmlText.x = 31;
            this._htmlText.y = 399;
            this._htmlText.width = 555;
            this._htmlText.color = "#72462b";
            this._htmlText.style.fontSize = 25;
            this._htmlText.style.leading = 6;
            this._htmlText.style.color = "#72462b";
            this._htmlText.style.wordWrap = true;
            this.box.addChildAt(this._htmlText, this.box.numChildren - 2);
            this.uiScene = new Base2dSceneLayer();
            this.addChildAt(this.uiScene, 0);
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.btnPass.y = GameUtil.isFullScreen() ? (HudModel.TOP_ADD_HEIGHT+54) : 54;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        /** 初始化界面 */
        public initView(): void {
            this._opt = this.dataSource;
            if (!this.dataSource.hasOwnProperty('remove')) {
                this._opt.remove = true;
            }
            this._htmlText.innerHTML = this._opt.text;
            this.on(Laya.Event.CLICK, this, this.onCloseComp);
            this.btnPass.on(Laya.Event.CLICK, this, this.onPass);
            if(this._opt.hidePass){
                this.btnPass.visible = false;
            }else{
                this.btnPass.visible = GuideManager.canShowPassBtn();
            }
            this.lab_name.text = this._opt.modelName;

            // 设置模型位置
            let posx: number = 0
            // 1120
            let posy: number = Laya.stage.height - 160;
            let scale: number = this._opt.modelScale;
            if (this._opt.location == LocationType.left) {
                posx = (Laya.stage.width >> 1) - 170;
                this.bgName.x = 37;
            } else if (this._opt.location == LocationType.right) {
                posx = (Laya.stage.width >> 1) + 170;
                this.bgName.x = 387;
            } else {
                posx = Laya.stage.width >> 1;
                this.bgName.x = 217;
                // 1070
                posy = Laya.stage.height - 210;
            }
            // 偏移
            posx = posx - Launch.offsetX;
            posy = posy - Launch.offsetY;
            this.lab_name.x = this.bgName.x + (this.bgName.width >> 1);
            // loghgy("模型位置",posx,posy);
            this.uiScene.addModelChar(String(this._opt.model), posx, posy, 180, scale);
        }

        private onCloseComp(event: Laya.Event): void {
            event.stopPropagation();
            if (this._opt.remove) {
                UIMgr.hideUIByName(UIConst.GuideTalkView);
            }
            dispatchEvt(new GuideEvent(GuideEvent.Guide_Talk_End));
        }

        private onPass(event: Laya.Event): void {
            event.stopPropagation();
            Laya.timer.frameOnce(5, this, () => {
                GuideManager.passGuide();
            });
        }

        public onClosed(): void {
            super.onClosed();
            this.uiScene.onExit();
            this.off(Laya.Event.CLICK, this, this.onCloseComp);
            this.btnPass.off(Laya.Event.CLICK, this, this.onPass);
        }
    }
}