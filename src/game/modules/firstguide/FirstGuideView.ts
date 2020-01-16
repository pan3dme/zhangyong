module game {
    export class FirstGuideView extends ui.firstguide.FirstGuideUI {

        private narrator: string;
        private skillKey = ["1010110", "300060", "300010", "400030"];

        public scene: MoiveScene;
        constructor() {
            super();
            this.scene = new MoiveScene();
            this.addChildAt(this.scene, 0);
            this.img_bg.width = Laya.stage.width;
            this.img_bg.height = Laya.stage.height;
            // this.list_skillmodel.visible = false;
            // this.list_skillmodel.mouseThrough = false;
            // this.list_skillmodel.selectHandler = new Handler(this, this.onSelect);
            // this.list_skillmodel.selectEnable = true;

            this.ani1.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);

            this.img_bg.on(Laya.Event.CLICK, this, this.onEndClick);
        }

        private onEndClick() {
            if (this.lab_info.visible) {
                this.endterGame();
            }
        }


        private _loadcomplete: boolean;
        private _anicomplete: boolean;
        public set loadcomplete(value) {
            this._loadcomplete = value;
            if (value && this._anicomplete) {
                // if (value && this._anicomplete && Browser.onPC) {
                this.startFight();
            }
        }
        /**
        * 加载引导中所需资源
        */
        private LoadGuideModel() {
            if (!this.scene.gameScene) {
                return;
            }
            this.guideResVis(true);
            this.startGuide();
            let models = [3106, 20012,3101,4103];
            let effary = [888888, 1029, 1024, 1000003];
            let uiMgr = UIMgr.getInstance();
            LoadeQueue.getInstance().loadAll(this.scene.gameScene, this.skillKey, models, effary, "scene012", (value, type) => {
                let txId:number  = type == 0 ? 10545 : type == 1 ? 10546 : type == 2 ? 10547 : type == 3 ? 10548 : -1;
				let str = LanMgr.getLan(``,txId);
                uiMgr.loadingProcess(value, str);
            }, () => {
                uiMgr.hideLoading();
                this.loadcomplete = true;
                this.scene.initRoles();
                this.scene.refreshEnemy(1, 2);
            });
            //todo  等战斗开始再加载潘多拉
            //2008
        }


        private guideResVis(flag: boolean) {
            this.img_pic1.visible = this.img_pic2.visible = this.img_pic3.visible = this.box_info1.visible = this.box_info2.visible = this.box_info3.visible = this.box_info4.visible = flag;
            this.img_bg.visible = flag;
        }

        private preLoadSkill() {
            for (var i = 0; i < this.skillKey.length; i++) {
                this.scene.gameScene.scene.skillMgr.preLoadSkill(getSkillUrl(this.skillKey[i]));
            }
        }

        /**
         * 开始黑幕引导
         */
        private startGuide() {
            this.ani1.play(0, false);
        }

        private _autoenter: number;
        private onAniComplete() {
            this._anicomplete = true;
            // if (!Browser.onPC) {
            //     this.loadcomplete = true;
            // }
            setTimeout(() => {
                this.lab_info.visible = true;
                this._autoenter = setTimeout(() => {
                    this.endterGame();
                }, 3000);
            }, 1000);
        }

        private endterGame() {
            clearTimeout(this._autoenter);
            this.lab_info.visible = false;

            // if (!Browser.onPC) {
            //     this.close();
            //     DialogExt.manager.mouseEnabled = false;
            //     dispatchEvt(new LoginLoadEvent(LoginLoadEvent.ENTERHUD_EVENT), 9);
            //     UIMgr.showUI(UIConst.CreateRoleView, null, false);
            //     return;
            // }

            this.guideResVis(false);
            if (this._loadcomplete) {
                this.startFight();
            } else {
                UIMgr.getInstance().showLoading();
            }
        }

        private _fightstart: boolean;
        private startFight() {
            if (!this._fightstart) {
                this.initFight();
            }
        }

        private initFight() {
            this._fightstart = true;
            // this.scene.initCam();
            this.scene.initCam(this.scene.dxc_initBossCamparm);
            setTimeout(() => {
                this.scene.tweenCam(5, () => {
                    this.fightNext(0);
                    GuideManager.startFightGuide();
                    //这里开始加载下一步资源
                    dispatchEvt(new LoginLoadEvent(LoginLoadEvent.LOADHUD_EVENT), true);
                });
            }, 500);
        }

        public fightNext($stepId: number) {
            if ($stepId >= this.scene.stepAry.length - 1) {
                //完成所有
                setTimeout(() => {
                    this.close();
                    this.scene.gameScene.scene.skillMgr.shock.clearShock();
                    dispatchEvt(new LoginLoadEvent(LoginLoadEvent.ENTERHUD_EVENT), this.scene.stepAry.length + 1);
                }, 100);
                return;
            }
            this.scene.nextStep($stepId);
        }

        public onOpened(): void {
            super.onOpened();
            this._fightstart = false;
            //强制设置1倍数
            this.lab_info.visible = false;
            this.scene.gameScene.timespeed1 = 0.3;
            AudioMgr.setPlayRate(1.3);
            this.loadcomplete = false;
            this._anicomplete = false;

            // if (Browser.onPC) {
            this.LoadGuideModel();
            // } else {
            //     this.guideResVis(true);
            //     this.startGuide();
            // }
        }

        private _bossblood: number;
        public setBossBlood($bloodnum: number) {
            let num = $bloodnum / 100;
            let nwidth = 538 * num;
            if (!this.box_blood.visible && $bloodnum > 0) {
                this.box_blood.visible = true;
                this.img_blood.width = nwidth;
                this.img_pross.width = nwidth;
                this._bossblood = $bloodnum;
                return;
            }

            Laya.Tween.clearTween(this.img_blood);
            Laya.Tween.clearTween(this.img_pross);
            if (this._bossblood < $bloodnum) {
                //回血
                this.img_pross.width = nwidth;
                Laya.Tween.to(this.img_blood, { width: nwidth }, 500, null, Laya.Handler.create(this, () => {
                    this.box_blood.visible = $bloodnum > 0;
                }));
            } else if (this._bossblood > $bloodnum) {
                //掉血
                this.img_blood.width = nwidth;
                Laya.Tween.to(this.img_pross, { width: nwidth }, 500, null, Laya.Handler.create(this, () => {
                    this.box_blood.visible = $bloodnum > 0;
                }));
            }

            this._bossblood = $bloodnum;


        }


        // private _clickBox: Laya.Box
        // public addBox(roleId: string): Laya.Box {
        //     if (!this._clickBox) {
        //         this._clickBox = new Laya.Box;
        //     }
        //     Laya.stage.addChild(this._clickBox);
        //     // roleId
        //     this._clickBox.width = 100;
        //     this._clickBox.height = 100;
        //     let pos: Pan3d.Vector2D;
        //     if (roleId == "2") {
        //         //自己人
        //         pos = this.scene.getRolePos("1_0");
        //     } else {
        //         pos = this.scene.getRolePos("2_4");
        //     }
        //     this._clickBox.x = pos.x - this._clickBox.width / 2;
        //     this._clickBox.y = roleId == "2" ? (pos.y - 30) : pos.y;
        //     return this._clickBox;
        // }

        // public hideBox() {
        //     if (this._clickBox)
        //         this._clickBox.removeSelf();
        // }

        // private _clickmanid: number;
        // public showSelectSkillPanel($skillobj, clickmanid: number) {
        //     logdebug("$skillobj：", $skillobj);
        //     this.on(Laya.Event.CLICK, this, this.onClick);
        //     this._clickmanid = clickmanid;
        //     this.lastSelect = -1;
        //     this.skillary = this.getSkillAry($skillobj);
        //     this.list_skillmodel.dataSource = this.skillary;
        //     this.list_skillmodel.visible = true;
        //     // this.list_skillmodel.x = 205 + Launch.offsetX + (3 - this.skillary.length) * (90 + this.list_skillmodel.spaceX) / 2;
        //     listAtCenter(this.list_skillmodel, 211, 3, 3);
        // }

        // private getSkillAry($skillobj): Array<GodSkillVo> {
        //     let ary: Array<GodSkillVo> = new Array
        //     for (var key in $skillobj) {
        //         if ($skillobj.hasOwnProperty(key)) {
        //             ary.push($skillobj[key]);
        //         }
        //     }

        //     ary.sort((a: GodSkillVo, b: GodSkillVo) => {
        //         return b.tabskill1.type - a.tabskill1.type;
        //     });
        //     return ary;
        // }

        // public hideSelectSkillPanel() {
        //     this.off(Laya.Event.CLICK, this, this.onClick);
        //     this.scene.clearSelectEff();
        //     UIMgr.hideUIByName(UIConst.SkillTip);
        //     this.list_skillmodel.selectedIndex = -1;
        //     this.list_skillmodel.visible = false;
        //     this._selectTargetFlag = false;
        //     this._posAry = null;
        // }

        // private lastSelect: number;
        // private skillary: Array<GodSkillVo>
        // private onSelect($index: number) {
        //     if ($index == -1) {
        //         if (this.lastSelect != -1) {
        //             this.skillary[this.lastSelect].selectFlag = false;
        //         }
        //         return;
        //     }
        //     //不满足条件不让点
        //     let selectData = this.skillary[$index];

        //     this.skillary[$index].selectFlag = true;
        //     if (this.lastSelect != -1) {
        //         this.skillary[this.lastSelect].selectFlag = false;
        //     }
        //     this.lastSelect = $index;
        //     this.list_skillmodel.refresh();
        //     if (this._clickmanid != 6) {
        //         //雅典娜加血引导
        //         let casting_target: number = 0;
        //         let target_limit: number = 0;
        //         for (var k = 0; k < selectData.tabskill1.sub_skills.length; k++) {
        //             var subskillId = selectData.tabskill1.sub_skills[k];
        //             let subskill = tb.TB_sub_skill.get_TB_sub_skillById(subskillId);
        //             if (subskill.main_skill == 1) {
        //                 casting_target = subskill.casting_target;
        //                 target_limit = subskill.target_limit;
        //                 break;
        //             }
        //         }

        //         this._posAry = this.scene.getChar3dPosAry(casting_target, target_limit);
        //         this._selectTargetFlag = true;
        //     } else {
        //         //选中技能并选中对象
        //         this.scene.selectSkill();
        //         this.hideSelectSkillPanel();
        //     }
        //     dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIGHT_SKILL_SELECT));
        //     logdebug("选择技能中");
        // }

        // private _selectTargetFlag: boolean;
        // private _curselect: string
        // private onClick(e: Laya.Event) {
        //     if (!this._selectTargetFlag) {
        //         return;
        //     }
        //     var $a: Pan3d.Vector3D = this.scene.getCam3d();
        //     let $b: Pan3d.Vector3D = this.scene.downPointTo3d(Laya.stage.mouseX, Laya.stage.mouseY);

        //     for (var i = 0; this._posAry && i < this._posAry.length; i++) {
        //         var element: MoiveGodVo = this._posAry[i];
        //         var $hit: boolean = element.char.mouseClik($a, $b);
        //         if ($hit) {
        //             let skillvo: GodSkillVo = this.skillary[this.lastSelect];
        //             logdebug("选中目标：", element.godid, "-----对应选中技能：", skillvo);
        //             if (skillvo && skillvo.tabskill1) {
        //                 dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_SELECT_TAR_SUCC));
        //                 this.scene.selectSkill();
        //                 this.hideSelectSkillPanel();
        //             }
        //         }
        //     }
        // }


        private _posAry: Array<MoiveGodVo>
        public show(): void {
            super.show();
        }

        public onClosed(): void {
            super.onClosed();
            AudioMgr.setPlayRate(1);
            clearTimeout(this._autoenter);
            this.scene.gameScene.timespeed1 = 0;
            // this.off(Laya.Event.CLICK, this, this.onClick);
        }
    }
}