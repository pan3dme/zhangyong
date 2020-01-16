

module game {
    export class GuaJiRewardView extends ui.guaji.GuaJiRewardUI {
        private _curTask: tb.TB_checkpoint_pass;
        private _curCopyInfo: tb.TB_copy_info;
        private _curBossTemp: tb.TB_monster;
        private _uiScene: Base2dSceneLayer;
        constructor() {
            super();
            this.isModelClose = true;
            this.uiPanel.dataSource = { uiName: UIConst.Lilian_RewardView, closeOnSide: this.isModelClose, title: "通关奖励" };
            this._uiScene = new Base2dSceneLayer();
            this.box_scene.addChild(this._uiScene);
        }

        /** 界面移除 */
        public close(): void {
            super.close();

            tl3d.ModuleEventManager.removeEvent(GuajiEvent.FUBEN_REWARD_CHANGE, this.updateView, this);
            tl3d.ModuleEventManager.removeEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.updateBtn, this);
            this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
            this.list.array = null;
            this._curTask = null;
            this._uiScene.onExit();
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 初始化界面 */
        private initView(): void {
            tl3d.ModuleEventManager.addEvent(GuajiEvent.FUBEN_REWARD_CHANGE, this.updateView, this);
            tl3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.updateBtn, this);
            this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive);
            this._uiScene.onShow();
            this.updateView();
        }

        private updateView(): void {
            let vo = null;
            if (this.dataSource) {
                vo = tb.TB_checkpoint_pass.getTabByTaskId(this.dataSource);
            } else {
                vo = this.getCurTaskVo();
            }
            if (vo && (this._curTask != vo || vo.ID == 60)) {
                this._curTask = vo;
                this._curCopyInfo = tb.TB_copy_info.get_TB_copy_infoById(vo.para);
                this._curBossTemp = this.getBoss(this._curCopyInfo);
                this.lab_desc.text = this._curTask.desc;
                this.updateReward();
                this.updateBtn();
                this.updateBoss();
            }
        }

        private getCurTaskVo(): tb.TB_checkpoint_pass {
            let data = TableData.getInstance().getTableByName(TableData.tb_checkpoint_pass).data;
            let lastkey;
            for (let key in data) {
                let id: number = data[key].ID;
                if (App.hero.mapBoxAwardIds.indexOf(id) == -1) {
                    return data[key];
                }
                lastkey = key;
            }
            return data[lastkey];
        }

        //获取boss
        private getBoss(vo: tb.TB_copy_info): tb.TB_monster {
            if (!vo) return null;
            let monsterTemps: Array<tb.TB_monster> = vo.getMonsters();
            if (monsterTemps) {
                for (let i: number = 0; i < monsterTemps.length; i++) {
                    if (monsterTemps[i].type == 1 || monsterTemps[i].type == 2) return monsterTemps[i];
                }
            }
            return null;
        }

        private updateReward(): void {
            if (this._curTask) {
                this.list.array = ary2prop(this._curTask.reward);
                //布局
                let num: number = this.list.array ? this.list.array.length : 0;
                this.list.width = num * 100 + 10.5;
                let posx: number = (this.width - this.list.width) / 2;
                this.list.x = posx;
            } else {
                this.list.array = null;
            }
        }

        private updateBtn(): void {
            this.btn_receive.visible = false;
            this.img_hasReceive.visible = false;
            this.lab_title.text = "";
            this.lab_cha.text = "";
            if (this._curTask) {
                this.lab_title.text = `${this._curTask.name}`;
                if (App.hero.mapBoxAwardIds.indexOf(this._curTask.ID) != -1) {
                    this.img_hasReceive.visible = true;
                } else if (App.hero.isPassRuneCopyInfo(this._curCopyInfo.ID, this._curCopyInfo.getChapter())) {
                    this.btn_receive.visible = true;
                    this.btn_receive.label = LanMgr.getLan('', 10041);
                    this.btn_receive.disabled = false;
                    this.btn_receive.skin = SkinUtil.buttonGreen;
                    this.btn_receive.labelStrokeColor = ColorConst.GREEN_FILTER;
                } else {

                    let curzhangjie: ZhangjieVo = GuajiModel.getInstance().getZhangjie(App.hero.copyUnlockId);
                    let curGuan: GuaJiGuanqiaVo = curzhangjie.getCurGuanqia();
                    let copyinfo: tb.TB_copy_info = tb.TB_copy_info.get_TB_copy_infoById(this._curTask.para);
                    if (curGuan.tbCopyInfo.area_number == copyinfo.area_number) {
                        this.btn_receive.visible = true;
                        this.btn_receive.label = LanMgr.getLan('击杀', -1);
                        this.btn_receive.disabled = false;
                        this.btn_receive.skin = SkinUtil.buttonNormal;
                        this.btn_receive.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    } else {
                        let num: number = copyinfo.area_number - curGuan.tbCopyInfo.area_number;
                        if (num < 0) num += 10;
                        this.lab_cha.text = LanMgr.getLan("{0}关后可击杀", -1, num);
                        this.btn_receive.label = LanMgr.getLan('', 10045);
                        this.btn_receive.disabled = true;
                        this.btn_receive.skin = SkinUtil.buttonNormal;
                        this.btn_receive.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    }

                }


            }
        }

        //更新boss
        private _BossModelInfo: any = {
            20004: [370, 650, 1.4, 500],
            20028: [370, 600, 0.7, 500],
            20024: [370, 700, 1.5, 300],
            20027: [370, 650, 0.7, 400],
            20002: [370, 650, 1.4, 400],
            20011: [370, 600, 0.6, 400],
            20005: [370, 750, 1.4, 400],
            20026: [370, 650, 0.7, 400],
            20036: [370, 800, 1.4, 340],
            20035: [370, 800, 1.4, 260],
            20006: [370, 800, 1.2, 500],
            20029: [370, 650, 1.2, 500],
            20034: [370, 800, 1.4, 300],
            20030: [370, 650, 0.7, 570],
            20025: [370, 900, 1.2, 240],
            20033: [370, 600, 0.7, 500],
        }
        private updateBoss(): void {
            if (this._curBossTemp) {
                this.lab_boss_lv.text = LanMgr.getLan("LV.{0}", -1, this._curBossTemp.level);
                this.lab_boss_name.text = this._curBossTemp.name;

                //布局
                let allw: number = this.lab_boss_lv.width + this.lab_boss_name.width + 5;
                let labPosx: number = (this.width - allw) / 2;
                this.lab_boss_name.x = labPosx;
                this.lab_boss_lv.x = labPosx + this.lab_boss_name.width + 5;

                let modelid: string = this._curBossTemp.model.toString();
                let scale: number = this._curBossTemp.model_multiple * 0.7;
                let posx: number = 370;
                let posy: number = 650;
                let maskw: number = 300;
                if (this._BossModelInfo[modelid]) {
                    let info: number[] = this._BossModelInfo[modelid];
                    posx = info[0];
                    posy = info[1];
                    scale = info[2] * this._curBossTemp.model_multiple;
                    maskw = info[3];
                }
                this.img_mask.width = maskw;
                this.img_mask.centerX = modelid == "20036" ? -50 : 0
                this._uiScene.addModelChar(modelid, posx, posy + 80, 180, scale);
                this.timer.once(500, this, () => {
                    if (this._uiScene && this._uiScene.sceneChar) {
                        this._uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
                    }
                });
            } else {
                this.lab_boss_lv.text = "";
                this.lab_boss_name.text = "";
            }


        }

        private onClickReceive(): void {
            if (!this._curTask) return;
            if (this.btn_receive.label == '击杀') {
                let model = GuajiModel.getInstance();
                let zhangjievo: ZhangjieVo = model.getZhangjie(this._curCopyInfo.area);
                model.currentZhangjie = zhangjievo;
                if (this._curCopyInfo.is_enter) {
                    dispatchEvt(new GuajiEvent(GuajiEvent.ENTER_FIGHT_EVENT), this._curCopyInfo.ID);
                } else {
                    UIMgr.showUI(UIConst.GuajiView);
                    dispatchEvt(new GuajiEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT));
                }
                this.close();
                return;
            }
            // dispatchEvt(new TaskEvent(TaskEvent.RECEIVE_TASK_REWARD,this._curTask));
            var args = {};
            args[Protocol.game_copy_getMapBoxAward.args.id] = this._curTask.ID;
            PLC.request(Protocol.game_copy_getMapBoxAward, args, ($data: any) => {
                if (!$data) return;

                if ($data && $data.commonData) {
                    UIUtil.showRewardView($data.commonData);
                }
                dispatchEvt(new TaskEvent(TaskEvent.REWARD_TASK_SUCCESS));
            });
        }


    }
}