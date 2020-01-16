module game {
    export class ZhaohuanBoxIR extends ui.zhaohuan.render.ZhaohuanBoxUI {
        private _glowFilter:Laya.GlowFilter;

        static BLUR_MIN:number = 3;
        static BLUR_MAX:number = 16;
        static TURN_TIME:number = 1200;
        constructor() {
            super();
            this._glowFilter = new Laya.GlowFilter("#ffff00", 16, -1.5, -1.5);
        }
        public set dataSource($value) {
            // 是否第一次设置数据
            if(!this._dataSource && $value) {
                this.visible = false;
            }
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private _startTime:number = 0;
        private refreshData() {
            if (this._dataSource) {
                // this.ui_headbox.dataSource = this._dataSource;
                // this.ani_good.visible = this._dataSource.getStar() >= 4;
                // this.ani_good.stop();
                // if (this._dataSource.getStar() >= 4) {
                //     this.ani_good.play(0, true);
                // }
                this.ui_card.dataSource = this._dataSource;
                
                if (this._dataSource.getStar() > 4){
                    //设置滤镜集合为发光滤镜
                    Laya.timer.loop(1, this, this.update);
                    this._startTime = Laya.timer.currTimer;
                    this.update();
			        
                }else{
                    this.ui_card.filters = null;
                    Laya.timer.clear(this, this.update);
                }

            }else{
                this.visible = false;
                this.ui_card.dataSource = null;
                Laya.timer.clear(this, this.update);
            }
        }

        private update():void{
            let difft:number = Laya.timer.currTimer - this._startTime;
            if (difft < 0) difft = 0;
            difft = difft % ZhaohuanBoxIR.TURN_TIME;
            let per:number = 0;
            let halfTime:number = ZhaohuanBoxIR.TURN_TIME/2;
            if (difft > halfTime){
                per = (ZhaohuanBoxIR.TURN_TIME - difft)/halfTime;
            }else{
                per = difft/halfTime;
            }
            this._glowFilter.blur = ZhaohuanBoxIR.BLUR_MIN + (ZhaohuanBoxIR.BLUR_MAX - ZhaohuanBoxIR.BLUR_MIN) * per;
            this.ui_card.filters = [this._glowFilter];
        }
    }
}