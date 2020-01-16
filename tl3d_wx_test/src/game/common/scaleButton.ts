module common {
    export class scaleButton extends Laya.Image {
        private scaleTime:number = 100;

        public initScaleX : number = 1;
        public initScaleY : number = 1;
        constructor(skin: string = null, label: string = "") {
            super(skin);
            //添加鼠标按下事件侦听。按时时缩小按钮。
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmall);
            //添加鼠标抬起事件侦听。抬起时还原按钮。
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            //添加鼠标离开事件侦听。离开时还原按钮。
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
            this.frameOnce(2,this,this.onDelay);
        }

        private onDelay():void {
            this.initScaleX = this.scaleX || 1;
            this.initScaleY = this.scaleY || 1;
        }
        
        private scaleSmall(): void {
            //缩小至0.8的缓动效果
            Laya.Tween.to(this, { scaleX: 0.9, scaleY: 0.9 }, this.scaleTime);
        }
        private scaleBig(): void {
            //变大还原的缓动效果
            Laya.Tween.to(this, { scaleX: this.initScaleX, scaleY: this.initScaleY }, this.scaleTime);
        }
    }
}