module game {
    export class DafuwengChar extends GameUIChar {
        constructor() {
            super();
        }

        public moveingFun: Function;
        private moveToCurV2d: tl3d.Vector2D;
        private posAry: tl3d.Vector2D[] = [];
        public moveTomorepos(vs: tl3d.Vector2D[]): void {
            this.posAry = vs;
            this.goto();
        }
        public set2dPos($x: number, $y: number): void {
            super.set2dPos($x, $y);
            //记录当前位置
            this.pixelPos = new tl3d.Vector2D($x, $y)
        }
        public updateFrame(t: number): void {
            if (this.moveToCurV2d) {
                var $dis: number = tl3d.Vector2D.distance(this.pixelPos, this.moveToCurV2d)
                if ($dis > 10) {
                    var $nmr: tl3d.Vector2D = this.pixelPos.sub(this.moveToCurV2d);
                    $nmr.normalize()
                    $nmr.scaleBy(this.runspeed)
                    this.pixelPos.x += $nmr.x
                    this.pixelPos.y += $nmr.y
                    super.set2dPos(this.pixelPos.x, this.pixelPos.y);
                    this.play(tl3d.CharAction.WALK);
                } else {
                    super.set2dPos(this.moveToCurV2d.x, this.moveToCurV2d.y);
                    //取下一个
                    this.goto();
                }
                if(this.moveingFun){
                    this.moveingFun(this.pixelPos);
                }
            }
            super.updateFrame(t);
            if (!this._partDic) return;
            var dicAry: Array<tl3d.CombineParticle> = this._partDic["mesh"];
            for (var i: number = 0; dicAry && i < dicAry.length; i++) {
                if (dicAry[i].scaleX != this.scale) {
                    dicAry[i].scaleX = this.scale
                    dicAry[i].scaleY = this.scale
                    dicAry[i].scaleZ = this.scale
                }
            }
        }

        private goto() {
            this.moveToCurV2d = (this.posAry && this.posAry.length > 0) ? this.posAry.shift() : null;
            if (this.moveToCurV2d) {
                var $nmr: tl3d.Vector2D = this.pixelPos.sub(this.moveToCurV2d);
                this.pRotationY = 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
            } else {
                this.play(tl3d.CharAction.STANAD);
                //移动回调
                if (this.movetocb)
                    this.movetocb();
            }
        }
    }
}