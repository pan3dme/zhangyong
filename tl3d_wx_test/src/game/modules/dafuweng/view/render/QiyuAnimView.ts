module game {

    export class QiyuAnimView extends ui.dafuweng.QiyuAnimUI{

        constructor(){
            super();
            this.mouseEnabled = true;
            this.mouseThrough = false;
            this.ani1.on(Laya.Event.COMPLETE,this,this.showQiyu);
        }

        private _btnList : QiyuTabIR[] = [];
        private _targetPos : Laya.Point;
        private _removeCallback : Function;
        private _itemAnimEndCallback : Function;
        startAnim(riskList:DafuwengVo[],targetPoint:Laya.Point,removeCb:Function,itemCb:Function):void {
            Dialog.manager.mouseEnabled = false;
            this._removeCallback = removeCb;
            this._itemAnimEndCallback = itemCb;
            this.x = Laya.stage.width/2 - this.width/2;
            this.y = Laya.stage.height/2 - this.height/2;
            Laya.stage.addChild(this);
            this.ani1.play(0,false);

            this._targetPos = targetPoint;
            this._btnList.length = 0;
            let num = 4;
            let itemWh = 170;
            let itemHg = 185;
            let len = riskList.length;
            let startX = this.width/2 - (len > num ? itemWh*num/2 : len*itemWh/2);
            let startY = this.height/2 - 90;
            for(let i = 0 ; i < len ; i++) {
                let itemIR = new QiyuTabIR();
                itemIR.scale(1,1);
                itemIR.dataSource = riskList[i];
                itemIR.clientPos = new Laya.Point(startX + (i % num) * itemWh,startY + itemHg * Math.floor(i/num));
                itemIR.x = itemIR.clientPos.x;
                itemIR.y = itemIR.clientPos.y;
                itemIR.visible = false;
                this._btnList.push(itemIR);
                this.addChild(itemIR);
            }
        }

        // 奇遇图标动画 -- 300毫秒显示，1000毫秒停留，之后逐个飘向奇遇按钮
        private showQiyu():void {
            let len = this._btnList.length;
            let total : number = 0;
            for(let i = 0 ; i < len ; i++) {
                let delay : number = 1300 + i * 200;
                total = delay;
                let item = this._btnList[i];
                item.visible = true;
                Laya.Tween.from(item,{x:275,y:840,alpha:0.5},300);
                Laya.Tween.to(item,{x:this._targetPos.x,y:this._targetPos.y,alpha:0.5,scaleX:0.5,scaleY:0.5},500,null,new Handler(this,()=>{
                    item && item.removeSelf();
                    if(this._itemAnimEndCallback){
                        this._itemAnimEndCallback();
                    }
                }),delay);
            }
            // 1300毫秒之后开始飘
            Laya.timer.once(1300,this,()=>{
                this.ani2.play(0,false);
            });
            Laya.timer.once((total+500),this,this.onRemove);
        }

        onRemove():void {
            Dialog.manager.mouseEnabled = true;
            for(let item of this._btnList) {
                Laya.Tween.clearAll(item);
                item.removeSelf();
            }
            this._btnList.length = 0;
            this.removeSelf();
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            this.ani1.gotoAndStop(0);
            if(this._removeCallback) {
                this._removeCallback();
                this._removeCallback = null;
            }
            this._itemAnimEndCallback = null;
        }
    }
}