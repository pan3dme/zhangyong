/**
* name 
*/
module game {
	export class TaskBaoxiangIR extends ui.task.itemrender.TaskBaoxiangIRUI {
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
                this.imgBox.skin = info.getRewardSkin();
                this.lab_num.text = String(info.getCount());
                let isCanReward = info.isCanReward();
                this.imgGuang.visible = isCanReward
                Laya.Tween.clearTween(this.imgGuang);
                if(isCanReward){
                    this.loopRotation();
                    this.startAni();
                }else{
                    this.ani1.gotoAndStop(0);
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            } else {
                Laya.Tween.clearTween(this.imgGuang);
                Laya.timer.clearAll(this);
                this.off(Laya.Event.CLICK, this, this.onClick);
                this.ani1.gotoAndStop(0);
            }
        }

        public startAni():void {
            let info = this.dataSource;
            if(info && info.isCanReward()) {
                this.ani1.play(0, false);
            }else{
                this.ani1.gotoAndStop(0);
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