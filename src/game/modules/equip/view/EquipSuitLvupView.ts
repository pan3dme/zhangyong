module game {
	export class EquipSuitLvupView extends ui.equip.EquipSuitLvupUI {
		constructor() {
			super();
			this.isModelClose = false;
            this.mouseEnabled = false;
		}

		public popup() {
            this.initView();
			super.popup();
		}
        public show() {
            this.initView();
			super.show();
		}

		public initView():void {
            let type = this.dataSource[0]
			let num = this.dataSource[1];
            this.clip_num.index = num % 2 != 0 ? (num - num % 2) : num;
            this.clip_num.skin = type == QualityConst.PURPLE ? SkinUtil.equip_purple_suit_num : (type == QualityConst.ORANGE ? SkinUtil.equip_orange_suit_num : SkinUtil.equip_red_suit_num);
           this.imgBg.skin = type == QualityConst.PURPLE ? SkinUtil.equip_purple_suit : (type == QualityConst.ORANGE ? SkinUtil.equip_orange_suit : SkinUtil.equip_red_suit);
            this.visible = false;
		}

        onOpened():void {
            super.onOpened();
            this.y -= 20;
            this.alpha = 0;
            this.visible = true;
            Laya.Tween.to(this,{y:this.y-150,alpha:1},600,Laya.Ease.linearIn,new Handler(this,()=>{
                Laya.timer.once(1000,this,()=>{
                    this.close();
                });
            }));
        }

		public close() {
			super.close();
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
		}
	}
}