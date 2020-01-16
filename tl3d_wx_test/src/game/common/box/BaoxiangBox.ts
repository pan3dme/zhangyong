/**
* name 
*/
module common {
	export class BaoxiangBox extends ui.box.BaoxiangBoxUI {
		constructor() {
			super();
		}

		public set dataSource($value:inface.IBaoxiangData) {
            this._dataSource = $value;
            this.refreshView();
        }

        public get dataSource(): inface.IBaoxiangData {
            return this._dataSource;
        }

        public refreshView(): void {
            let info = this.dataSource;
            if (info) {
                this.imgBox.skin = info.getSkin();
                let isCanReward = info.isCanReward();
                this.imgGuang.visible = isCanReward
                Laya.Tween.clearTween(this.imgGuang);
                if(isCanReward){
                    this.loopRotation();
                }
                this.lbCount.text = info.getCount() + "";
                this.on(Laya.Event.CLICK, this, this.onClick);
            } else {
                Laya.Tween.clearTween(this.imgGuang);
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        }
        /** 光效 */
        private loopRotation(): void {
            this.imgGuang.rotation = 0;
            Laya.Tween.to(this.imgGuang, { rotation: 360 }, 2000, Laya.Ease.linearInOut, new Handler(this, () => {
                this.loopRotation();
            }));
        }

        /** 点击宝箱 */
        private onClick(): void {
            let info = this.dataSource;
            if (info.isCanReward()) {
                dispatchEvt(info.getEvent(), info);
            } else {
                UIMgr.showUI((UIConst.ManyItemsTip),{data:info.getRewardList()});
            }
        }

	}
}