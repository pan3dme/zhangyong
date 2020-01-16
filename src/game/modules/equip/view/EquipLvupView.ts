module game {
	export class EquipLvupView extends ui.equip.EquipLvupUI {
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
			let level = this.dataSource[1];
            if (level > 9){
                this.clip_ten.visible = true;
                this.clip_one.x = 237;
                this.clip_ten.index = level%10;
                this.clip_one.index = Math.floor(level/10);
            }else{
                this.clip_ten.visible = false;
                this.clip_one.x = 255;
                this.clip_one.index = level;
            }
            this.imgBg.skin = type == 0 ? SkinUtil.equip_sth_lvup : SkinUtil.equip_ref_lvup;
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