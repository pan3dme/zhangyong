

module game {

    export class forestAwardView extends ui.fogforest.AwardUI {

        private uiScenes1: Base2dSceneLayer;
        constructor() {
            super();
            this.uiScenes1 = new Base2dSceneLayer();
            this.addChild(this.uiScenes1);
            this.uiScenes1.setModelBox(this, this.lbDesc, this.lbDesc);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshView();
        }

        public get dataSource(): ForestGuanqiaVo {
            return this._dataSource;
        }

        refreshView(): void {
            let info = this.dataSource;
            if (info) {
                this.visible = true;
                this.lbDesc.text = info.tbForest.special_desc;
                if (info.isSpecial()) {
                    let isGod = info.specialModel > 0;
                    this.itemBox.visible = false;
                    this.uiScenes1.onExit();
                    if (isGod) {
                        this.uiScenes1.onShow();
                        Laya.timer.once(200, this, this.delayShow, [info.specialModel]);
                    } else {
                        this.itemBox.visible = true;
                        this.itemBox.dataSource = info.itemVo;
                    }
                } else {
                    this.uiScenes1.onExit();
                }
            } else {
                this.uiScenes1.onExit();
                this.visible = false;
            }
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(modeid: any): void {
            let point = this.lbDesc.localToGlobal(new Laya.Point(0, 0));
            this.uiScenes1.addModelChar(modeid, point.x + this.lbDesc.width / 2 - Launch.offsetX, point.y - Launch.offsetY - 10, 180, 1.2);
            this.uiScenes1.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        }
    }
}