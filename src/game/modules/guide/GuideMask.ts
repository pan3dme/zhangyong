
module game {

    /** 引导容器 */
    export class GuideMask extends ui.guide.GuideMaskUI {

        // private _interactionArea: Laya.Sprite;
        private _htmlText: Laya.HTMLDivElement;
        constructor() {
            super();
            this.isIgnore = true;

            // 必须设置容器为画布缓存 -- 否则挖空部分会是黑色的
            this.cacheAs = 'bitmap';

            // 绘制遮罩区，含透明度，可见游戏背景
            // let maskArea:Laya.Image = new Laya.Image('comp/bg/zhezhao3.png');
            // maskArea.sizeGrid = '2,2,2,2';
            // maskArea.width = Laya.stage.width;
            // maskArea.height = Laya.stage.height;
            // this.addChild(maskArea);
            this.mouseEnabled = true;

            //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
            // this._interactionArea = new Sprite();
            //设置叠加模式
            // this._interactionArea.blendMode = "destination-out";
            // this.addChildAt(this._interactionArea, this.numChildren - 2);

            let hitA = new Laya.HitArea();
            hitA.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, ColorConst.normalFont);
            this.hitArea = hitA;

            this._htmlText = new Laya.HTMLDivElement();
            this._htmlText.x = 20;
            this._htmlText.y = 20;
            this._htmlText.autoSize = true;
            this._htmlText.color = "#72462b";
            this._htmlText.style.leading = 6;
            this._htmlText.style.fontSize = 25;
            this._htmlText.style.color = "#72462b";
            this._htmlText.style.wordWrap = false;
            this._htmlText.style.stroke = 2;
            this._htmlText.style.strokeColor = ColorConst.WHITE;
            this.lbBox.addChild(this._htmlText);
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.btnPass.y = GameUtil.isFullScreen() ? (HudModel.TOP_ADD_HEIGHT+54) : 54;
            this.bg.width = w;
            this.bg.height = h;
        }

        /**
         * 面板打开
         */
        public onOpened(): void {
            super.onOpened();
            if (this.dataSource) {
                this.showGuide(this.dataSource);
            }
            else {
                this.showTransparent();
            }
        }

        private _maskOpt: IGuideMaskOpt;
        public showGuide(maskOpt: IGuideMaskOpt): void {
            this.bg.alpha = maskOpt.maskAlpha;
            this._maskOpt = maskOpt;
            let target = maskOpt.target;
            let arrowDir = maskOpt.arrowDir;
            let text = maskOpt.text;
            let textDir = maskOpt.textDir;
            let mouseThrough = maskOpt.mouseThrough;

            // 是否有文本显示 -- 有的时候点击该引导遮罩会关闭，点击区域也可以点
            let hasText: boolean = text && text.length > 0;
            let bounds = target.getBounds();
            // Laya.Utils.getGlobalPosAndScale() 计算传入的显示对象 Sprite 的全局坐标系的坐标和缩放值
            let point = target.localToGlobal(new Laya.Point(0, 0));
            let width = target.width || bounds.width || 50;
            width = Math.floor(width * target.scaleX);
            let height = target.height || bounds.height || 50;
            height = Math.floor(height * target.scaleY);

            //自定义路径
            // let rad = Math.min(Math.floor(width / 5), Math.floor(height / 5)); //半径
            let x = Math.floor(point.x);//-(Laya.stage.width-720)/2;
            let y = Math.floor(point.y);
            // loghgy('GuideMask-target:',x,y,width,height,target);
            // if(target.parent) {
            //     loghgy('GuideMask-target.parent:',target.parent['x'],target.parent['y'],target.parent['width'],target.parent['height'],target.parent);
            // }

            // let path: any[] = [
            //     ["moveTo", rad, 0], //画笔的起始点，
            //     ["lineTo", width - rad, 0],   //lineTo可省略
            //     ["arcTo", width, 0, width, rad, rad], //p1(width, 0)夹角  (width, rad)为端点p2  弧度rad
            //     ["arcTo", width, height, width - rad, height, rad],
            //     ["arcTo", 0, height, 0, height - rad, rad],
            //     ["arcTo", 0, 0, rad, 0, rad]
            // ];
            // 设置unHit区域使可以穿透
            (this.hitArea as Laya.HitArea).unHit.clear();
            if (mouseThrough) {
                (this.hitArea as Laya.HitArea).unHit.drawRect(x, y, width, height, ColorConst.normalFont);
            }
            // drawPath绘制会使无法穿透点击
            // (this.hitArea as Laya.HitArea).unHit.drawPath(x, y, path);

            // 绘制圆角矩形 改成渐变遮罩，暂废弃
            // this._interactionArea.graphics.clear();
            // this._interactionArea.graphics.drawRect(x, y, width,height, ColorConst.normalFont);
            // 没有设置fillStyle时会绘制不出圆角矩形
            // this._interactionArea.graphics.drawPath(x, y, path, { fillStyle: ColorConst.normalFont }, { "strokeStyle": ColorConst.normalFont, "lineWidth": "3" });

            // 设置渐变遮罩
            if(this._maskOpt.showJianbianMask){
                this.maskMid.visible = true;
                // 取整，不然后面的计算出现小数会出现间隙
                let midX = Math.round(x + (width/2));
                let midY = Math.round(y + (height/2));
                let midWidth = this.maskMid.width;
                let midHeight = this.maskMid.height;
                // 锚点在中心 0.5,0.5
                this.maskMid.x = midX;
                this.maskMid.y = midY;
                let topH = midY - midHeight/2;
                this.maskTop.visible = topH > 0;
                // 锚点在下中 0.5,1
                if(this.maskTop.visible){
                    this.maskTop.width = this.width;
                    this.maskTop.height = topH;
                    this.maskTop.x = this.width/2;
                    this.maskTop.y = topH;
                }
                let leftW = midX - (midWidth/2);
                this.maskLf.visible = leftW > 0;
                // 锚点在右中 1,0.5
                if(this.maskLf.visible){
                    this.maskLf.width = leftW;
                    this.maskLf.height = midHeight;
                    this.maskLf.x = leftW;
                    this.maskLf.y = midY;
                }
                let rightW = this.width - midX - midWidth/2;
                // 锚点在左中 0,0.5
                this.maskRg.visible = rightW > 0;
                if(this.maskRg.visible){
                    this.maskRg.width = rightW;
                    this.maskRg.height = midHeight;
                    this.maskRg.x = midX + midWidth/2;
                    this.maskRg.y = midY;
                }
                // 锚点在上中 0.5,0
                let bottomH = this.height - midY - midHeight/2;
                this.maskBottom.visible = bottomH > 0;
                if(this.maskBottom.visible){
                    this.maskBottom.width = this.width;
                    this.maskBottom.height = bottomH;
                    this.maskBottom.x = this.width/2;
                    this.maskBottom.y = midY + midHeight/2;
                }
                // loghgy("位置中",this.maskMid.x,this.maskMid.y,this.maskMid.width,this.maskMid.height);
                // loghgy("位置上",this.maskTop.x,this.maskTop.y,this.maskTop.width,this.maskTop.height);
                // loghgy("位置左",this.maskLf.x,this.maskLf.y,this.maskLf.width,this.maskLf.height);
                // loghgy("位置右",this.maskRg.x,this.maskRg.y,this.maskRg.width,this.maskRg.height);
                // loghgy("位置下",this.maskBottom.x,this.maskBottom.y,this.maskBottom.width,this.maskBottom.height);
            }else{
                this.maskTop.visible = this.maskBottom.visible = this.maskLf.visible = this.maskRg.visible = this.maskMid.visible = false;
            }

            // 手指动画
            this.ani1.play(0, true);
            this.aniBox.visible = arrowDir != DirectionType.none;
            this.aniBox.x = x + (width/2);
            this.aniBox.y = y + (height/2);
            this.aniBox.scaleX = this.aniBox.scaleY = 1;
            this.aniBox.rotation = 0;
            if (arrowDir == DirectionType.bottom) {
                this.aniBox.scaleY = -1;
            } else if (arrowDir == DirectionType.left) {
                this.aniBox.rotation = -90;
                this.aniBox.scaleX = -1;
            } else if (arrowDir == DirectionType.right) {
                this.aniBox.rotation = 90;
            }
            this.aniBox.x = x + width / 2;
            this.aniBox.y = y + height / 2;
            this.lbBox.visible = hasText;

            // 文本提示
            if (hasText) {
                this._htmlText.style.wordWrap = false;
                this._htmlText.innerHTML = text;
                // Laya.timer.frameOnce(1,this,this.resizeHtmlText,[arrowDir,textDir,text]);
                this.resizeHtmlText(arrowDir, textDir, text);
            } else {
                this._htmlText.innerHTML = "";
            }
            if (!mouseThrough || this._maskOpt.cbFun) {
                this.on(Laya.Event.CLICK, this, this.onClick);
            } else {
                this.off(Laya.Event.CLICK, this, this.onClick);
            }

            // 跳过按钮  指向的位置覆盖了跳过按钮
            // let isCover = this.aniBox.x <= this.btnPass.x && this.aniBox.y <= this.btnPass.y;
            let isCover = false;
            this.btnPass.visible = GuideManager.canShowPassBtn() && !isCover;
            this.btnPass.on(Laya.Event.CLICK, this, this.onPass);
        }

        private resizeHtmlText(arrowDir: number, textDir: number, text: string): void {
            let textWth = this._htmlText.contextWidth;
            // let textHei = this._htmlText.contextHeight;
            // logdebug('GuideMask:', this._htmlText.width, textWth);
            // 智能设置宽度--最大宽度300
            if (textWth > 300) {
                this._htmlText.style.wordWrap = true;
                this._htmlText.width = 300;
            } else {
                this._htmlText.style.wordWrap = false;
                this._htmlText.width = textWth;
            }
            this.lbBox.height = this.lbImg.height = this._htmlText.y + this._htmlText.contextHeight + 20;
            this.lbBox.width = this.lbImg.width = this._htmlText.x + this._htmlText.contextWidth + 20;
            if (textDir == DirectionType.top) {
                this.lbBox.x = this.aniBox.x - this.lbBox.width / 2;
                this.lbBox.y = arrowDir == textDir ? (this.aniBox.y - 150 - this.lbBox.height) : (this.aniBox.y - 70 - this.lbBox.height);
            } else if (textDir == DirectionType.bottom) {
                this.lbBox.x = this.aniBox.x - this.lbBox.width / 2;
                this.lbBox.y = arrowDir == textDir ? (this.aniBox.y + 150) : (this.aniBox.y + 70);
            } else if (textDir == DirectionType.right) {
                this.lbBox.y = this.aniBox.y - this.lbBox.height / 2;
                this.lbBox.x = arrowDir == textDir ? (this.aniBox.x + 150) : (this.aniBox.x + 70);
            } else {
                this.lbBox.y = this.aniBox.y - this.lbBox.height / 2;
                this.lbBox.x = arrowDir == textDir ? (this.aniBox.x - 150 - this.lbBox.width) : (this.aniBox.x - 70 - this.lbBox.width);
            }
            this.lbBox.x = this.lbBox.x < 0 ? 0 : this.lbBox.x;
            this.lbBox.x = this.lbBox.x > (this.width - this.lbBox.width) ? (this.width - this.lbBox.width) : this.lbBox.x;
            this.lbBox.y = this.lbBox.y < 0 ? 0 : this.lbBox.y;
            this.lbBox.y = this.lbBox.y > (this.height - this.lbBox.height) ? (this.height - this.lbBox.height) : this.lbBox.y;
        }

        /** 显示单独的透明遮罩 */
        public showTransparent(): void {
            this.hide();
            this.bg.alpha = 0;
            this.aniBox.visible = false;
            this.lbBox.visible = false;
            this.btnPass.visible = false;
            (this.hitArea as Laya.HitArea).unHit.clear();
            this.maskTop.visible = this.maskBottom.visible = this.maskLf.visible = this.maskRg.visible = this.maskMid.visible = false;
            // this._interactionArea.graphics.clear();
        }

        /** 关闭 */
        public hide(): void {
            this.ani1.stop();
            this.off(Laya.Event.CLICK, this, this.onClick);
            this.btnPass.off(Laya.Event.CLICK, this, this.onPass);
        }

        /** 点击关闭界面 */
        private onClick(event:Laya.Event): void {
            event.stopPropagation();
            if (this._maskOpt.cbFun) {
                this._maskOpt.cbFun();
            } else {
                GuideMask.hide();
            }
        }

        /**
         * 显示引导遮罩
         * @param target 目标显示对象
         * @param arrowDir 手指方向位置
         * @param text 文本内容,文本方向默认与手势方向一致  注：有文本时手指方向只能是top、bottom，左右方向可能存在位置不够
         * @param mouseThrough 是否穿透
         */
        public static show(target: Laya.Sprite, arrowDir: number = 1, text: string = "", mouseThrough: boolean = true, cb: Function = null,maskAlpha:number=0,showJianbianMask:boolean=true): void {
            let textDir = arrowDir; // 文本方向默认与手势方向一致
            let opt: IGuideMaskOpt = { target, arrowDir, text, mouseThrough, textDir, cbFun: cb,maskAlpha,showJianbianMask };
            if (UIMgr.hasStage(UIConst.GuideMask)) {
                let ui: GuideMask = UIMgr.getUIByName(UIConst.GuideMask) as GuideMask;
                ui.dataSource = opt;
                ui.onOpened();
            } else {
                UIMgr.showUI(UIConst.GuideMask, opt);
            }
        }

        public static hide(): void {
            let ui = UIMgr.getUIByName(UIConst.GuideMask) as GuideMask;
            if (ui) {
                ui.hide();
            }
            UIMgr.hideUIByName(UIConst.GuideMask);
        }

        /** 显示透明遮罩，禁止点击 */
        public static showWithTransparent(): void {
            if (UIMgr.hasStage(UIConst.GuideMask)) {
                let ui: GuideMask = UIMgr.getUIByName(UIConst.GuideMask) as GuideMask;
                ui.dataSource = null;
                ui.onOpened();
            } else {
                UIMgr.showUI(UIConst.GuideMask);
            }
        }

        /** 设置遮罩 */
        public static setMaskAlpha(alpha:number):void {
            if (UIMgr.hasStage(UIConst.GuideMask)) {
                let ui: GuideMask = UIMgr.getUIByName(UIConst.GuideMask) as GuideMask;
                ui.bg.alpha = alpha;
            }
        }

        public static dispose(): void {
            GuideMask.hide();
        }

        /** 跳过整个引导 */
        private onPass(event:Laya.Event): void {
            event.stopPropagation();
            Laya.timer.frameOnce(5, this, () => {
                GuideManager.passGuide();
            });
        }
    }

    export enum DirectionType {
        none = 0,
        top = 1,
        bottom = 2,
        left = 3,
        right = 4
    }

    export interface IGuideMaskOpt {
        target: Laya.Sprite;        // 目标显示对象
        arrowDir: number;           // 手指方向
        mouseThrough?: boolean;     // 是否穿透 没文本时又穿透，有文本时需要设置是否穿透
        text?: string;              // 附带文本
        textDir?: number;           // 文本方向
        cbFun?: Function;
        maskAlpha ?: number;        // 遮罩透明度
        showJianbianMask ?:boolean; // 是否显示渐变遮罩
    }
}