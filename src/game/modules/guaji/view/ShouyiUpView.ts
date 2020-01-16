/**
* name 
*/
module game {
	export class ShouyiUpView extends ui.guaji.ShouyiUpUI {
		constructor() {
			super();
            this.mouseEnabled = false;
            this.isModelClose = false;
            this.bgPanel.dataSource = { uiName: UIConst.Guaji_ShouyiUpView, closeOnSide: this.isModelClose,closeOnButton:false,title:"收益提升" };
            this.bgPanel.addChildAt(this.listBg, 3);
		}

        createChildren():void {
            super.createChildren();
            this.anchorX = this.anchorY = 0.5;
            this.visible = false;
            this.itemList.renderHandler = new Handler(this,this.itemRender);
        }

		public onOpened(): void {
			super.onOpened();
            let model = GuajiModel.getInstance();
            model.lastCopyId = model.getMaxLev();
            this.visible = false;
            let list : any[] = this.dataSource;
            this.itemList.array = list;
            this.itemList.height = list.length * 36 + (list.length-1) * this.itemList.spaceY;
            this.listBg.height = this.itemList.height + 20;
            this.height = this.bgPanel.height = this.listBg.y + this.listBg.height + 50;
            this.x = (Laya.stage.width >> 1);
            this.y = (Laya.stage.height >> 1);
            this.visible = true;
            this.alpha = 1; 
            Laya.timer.once(1500,this,this.startTween);
		}

        /** 开始漂浮 */
        startTween():void {
            Laya.Tween.clearTween(this);
            Laya.Tween.to(this, { alpha: 0,y:this.y - 300 }, 500, null, Handler.create(this, () => {
                this.close();
            }));
        }

        private itemRender(box:Laya.Box,index):void {
            let info : {type,last,cur} = box.dataSource;
            let imgRes = box.getChildByName("imgRes") as Laya.Image;
            let lbLast = box.getChildByName("lbLast") as Laya.Label;
            let imgArrow = box.getChildByName("imgArrow") as Laya.Image;
            let lbCur = box.getChildByName("lbCur") as Laya.Label;
            if(info){
                imgRes.skin = SkinUtil.getCostSkin(info.type);
                lbLast.text = `${info.last}/m`;
                lbCur.text = `${info.cur}/m`;
            }
        }

        onClosed():void {
            super.onClosed();
            this.visible = false;
            this.itemList.array = null;
            Laya.Tween.clearTween(this);
            Laya.timer.clearAll(this);
        }
		
	}
}