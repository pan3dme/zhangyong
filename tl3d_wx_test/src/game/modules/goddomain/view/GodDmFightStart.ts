module game {

    /** 战斗开始 */
    export class GodDmFightStart extends ui.goddomain.fightStartUI {

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

        private leftModel: number
        private rightModel: number
        private drawData() {
            logfight("过场-----",this.dataSource);
            let data = this.dataSource.vo;
            if (data) {
                //左右方区分
                let atks = data.teams;
                if (atks) {
                    let isLeft = data.selfCamp == battle.BatteConsts.BATTLE_CAMPATK;
                    let atkLeft:number = isLeft?atks[0]:atks[1];
                    let atkRight:number = isLeft?atks[1]:atks[0];
                    let leftInfo : IGodDomainFightSvo[] = isLeft?data.leftInfo:data.rightInfo;
                    let rightInfo : IGodDomainFightSvo[] = isLeft?data.rightInfo:data.leftInfo;

                    this.img_01.skin = isLeft?"jizhanshengyu/difang_bj.png":"jizhanshengyu/wofang_bj1.png";
                    this.img_02.skin = isLeft?"jizhanshengyu/wofang_bj.png":"jizhanshengyu/difang_bj1.png";
                    this.cloneInfo(leftInfo, atkLeft);
                    this.cloneInfo(rightInfo, atkRight);
                    let leftvo : IGodDomainFightSvo = leftInfo[atkLeft];
                    let rightvo : IGodDomainFightSvo = rightInfo[atkRight];
                    this.ui_head_left.dataSource = new UserHeadVo(leftvo.head, leftvo.level,leftvo.headFrame);
                    this.lab_name_left.text = leftvo.name;
                    this.lab_power_left.text = leftvo.force + "";
                    this.ui_head_right.dataSource = new UserHeadVo(rightvo.head, rightvo.level,rightvo.headFrame);
                    this.lab_name_right.text = rightvo.name;
                    this.lab_power_right.text = rightvo.force + "";
                    this.leftModel = GodUtils.getShowGodModel(leftvo.godId,leftvo.skinId);
                    this.rightModel = GodUtils.getShowGodModel(rightvo.godId,rightvo.skinId);

                    this.list_left.dataSource = leftInfo;
                    this.list_right.dataSource = rightInfo;
                }
            }
        }

        //0：已阵亡 1：出战中 2：等待中
        private cloneInfo(infoList, team) {
            for (var i = 0; i < infoList.length; i++) {
                var element = infoList[i];
                element["state"] = i == team ? 1 : i < team ? 0 : 2;
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
            if (this.dataSource.optType == startOptState.START) {
                this.img_vs.visible = false;
                this.ani2.play(0, false);
            } else if (this.dataSource.optType == startOptState.GUOCHANGCOMPLETE) {
                this.img_vs.visible = true;
                this.ani1.play(0, false);
            } else if (this.dataSource.optType == startOptState.GUOCHANG) {
                this.img_vs.visible = false;
                this.ani2.play(0, false);
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