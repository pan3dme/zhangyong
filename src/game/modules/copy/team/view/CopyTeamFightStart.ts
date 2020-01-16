module game {

    /** 战斗开始 */
    export class CopyTeamFightStart extends ui.teamcopy.teamCopyStartUI {

        private uiScene: Base2dSceneLayerExt;
        constructor() {
            super();
            this.isModelClose = false;

            this.uiScene = new Base2dSceneLayerExt();
            this.addChild(this.uiScene);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onOpened() {
            super.onOpened();
            this.drawData();
            this.refresh();
        }

        private leftModel: number = 2010;
        private rightModel: number = 2010;
        private drawData() {
            logfight("过场-----", this.dataSource);
            let data = this.dataSource.vo;
            if (data) {
                let leftvo: copyTeamFightMember = data.leftInfo;
                let rightvo: copyTeamFightMember = data.rightInfo;

                if (leftvo) {
                    this.ui_head_left.dataSource = new UserHeadVo(leftvo.head, leftvo.level, leftvo.headFrame);
                    this.lab_name_left.text = leftvo.name;
                    this.lab_power_left.text = leftvo.force + "";
                    this.leftModel = leftvo.modelId;
                }

                if (rightvo) {
                    this.ui_head_right.dataSource = new UserHeadVo(rightvo.head, rightvo.level, rightvo.headFrame);
                    this.lab_name_right.text = rightvo.name;
                    this.lab_power_right.text = rightvo.force + "";
                    this.rightModel = rightvo.modelId;
                }

            }
        }

        public close(): void {
            super.close();
            this.uiScene.onExit();
        }

        private initView(): void {
            this.ani1.on(Laya.UIEvent.COMPLETE, this, this.onComplete1);
            this.ani2.on(Laya.UIEvent.COMPLETE, this, this.onComplete2);
        }

        public refresh() {
            if (this.dataSource.optType == startOptState.START
                || this.dataSource.optType == startOptState.GUOCHANG) {
                this.img_vs.visible = false;
                this.ani2.play(0, false);
            } else if (this.dataSource.optType == startOptState.GUOCHANGCOMPLETE) {
                this.img_vs.visible = true;
                this.ani1.play(0, false);
            }
        }

        private onComplete1() {
            this.ani1.off(Laya.UIEvent.COMPLETE, this, this.onComplete1);
            this.onExit();
        }
        private onComplete2() {
            this.ani2.off(Laya.UIEvent.COMPLETE, this, this.onComplete2);
            //添加模型
            this.uiScene.addModelChar(String(this.leftModel), 160, 950, 180, 2.2);
            this.uiScene.addModelChar(String(this.rightModel), 560, 550, 180, 2.2);
            Laya.timer.frameOnce(3, this, () => {
                if (this.dataSource.optType == startOptState.START) {
                    this.img_vs.visible = true;
                    this.ani1.play(0, false);
                } else {
                    if (this.dataSource && this.dataSource.cb) {
                        this.dataSource.cb();
                    }
                }
            });
        }

        private onExit() {
            setTimeout(() => {
                if (this.dataSource && this.dataSource.cb) {
                    this.dataSource.cb();
                }
                this.close();
            }, 1000);
        }
    }
}