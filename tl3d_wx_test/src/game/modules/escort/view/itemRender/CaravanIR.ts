

module game {

    export class CaravanIR extends ui.escort.itemRender.CaravanIRenderUI {

        private uiScene: Base2dSceneLayer;
        private _modelId: string;
        constructor() {
            super();
            this.uiScene = new Base2dSceneLayer();
            this.addChildAt(this.uiScene, 0);
            this.uiScene.setModelBox(this, this.lbName, this.lbTime);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource(): CaravanInfoVo {
            return this._dataSource;
        }

        /** 设置初始位置 */
        public setStartPositon(maxy: number, miny: number = 420): void {
            this.x = - this.width + 15;
            this.y = miny + Math.floor(Math.random() * (maxy - miny)) - this.height;
        }

        private initView(): void {
            let info = this.dataSource;
            if (info) {
                this.lbName.text = info.svo.name;
                this.lbShenli.text = LanMgr.getLan('', 10117, info.svo.force);
                Laya.timer.loop(1000, this, this.updateTime);
                this.updateTime();
                this.uiScene.onShow();
                this._modelId = info.tbEscort.model;
                Laya.timer.once(200, this, this.delayShow);
                Laya.timer.frameLoop(2, this, this.updatePosition);
                this.on(Laya.Event.CLICK, this, this.onShowDetail);
            } else {
                this.onRemove();
            }
        }

        /** 更新倒计时 */
        private updateTime(): void {
            let info = this.dataSource;
            if (!info) return;
            let time = info.svo.endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = GameUtil.toCountdown(time, "mm:ss");
                if (this.x >= 995) {
                    this.onRemove();
                }
            } else {
                this.onRemove();
            }
        }

        /** 更新位置 */
        private updatePosition(): void {
            // 647/8=80  80/60=1.3 一帧1.3
            this.x += 2.5;
            if (this.uiScene.sceneChar) {
                let point = this.lbShenli.localToGlobal(new Laya.Point(0, 0));
                this.uiScene.sceneChar.set2dPos(this.getX(point.x), this.getY(point.y));
            }
        }

        private getX(pointx): number {
            return pointx + this.lbShenli.width / 2 - Launch.offsetX;
        }
        private getY(pointy): number {
            return pointy - 20 - Launch.offsetY;
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(): void {
            if (!this._modelId) return;
            let point = this.lbShenli.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(this._modelId, this.getX(point.x), this.getY(point.y), 90, 1.0);
            this.uiScene.sceneChar.play(tl3d.CharAction.WALK, 0);
        }

        /** 打开商队信息 */
        private onShowDetail(): void {
            if (this.dataSource) {
                dispatchEvt(new EscortEvent(EscortEvent.SHOW_CARAVAN_INFO_VIEW, this.dataSource));
            }
        }

        /** 移除 */
        public onRemove(): void {
            this._dataSource = null;
            Laya.timer.clearAll(this);
            this.off(Laya.Event.CLICK, this, this.onShowDetail);
            this.uiScene.onExit();
            EscortModel.getInstance().pushItemRender(this);
            this.removeSelf();
        }
    }
}