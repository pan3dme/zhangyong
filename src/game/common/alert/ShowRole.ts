module common {
    export class ShowRole extends ui.prompt.RoleEffUI {
        private uiScene: Base2dSceneLayer;
        constructor() {
            super();
            this.popupCenter = true;
            this.list_stars_0.renderHandler = new Handler(this, this.onXingjiRender);
            this.uiScene = new Base2dSceneLayer();
            this.uiScene.setModelBox(this, this.img_level, this.lab_name);
            this.addChildAt(this.uiScene, this.numChildren - 2);
            this.isModelClose = true;
        }

        get godVo(): GodItemVo {
            return this.dataSource[0];
        }

        private _lastTime: number;
        public onOpened() {
            super.onOpened();
            if (!this.dataSource) {
                let vo = new GodItemVo(tb.TB_god.get_TB_godById(4107));
                vo.starLevel = 10;
                this.dataSource = [vo, UI_FLYTEXT.UPSTART];
            }
            this.img_zhezhao.on(Laya.Event.CLICK, this, this.onExit);
            this.uiScene.onShow();
            let god: GodItemVo = this.godVo;
            let type: number = this.dataSource[1];
            this.lab_info.visible = false;
            this._lastTime = Date.now();
            this.drawListView(god);
            this.img_bgs.visible = this.imgBg.visible = this.list_stars_0.visible = type != UI_FLYTEXT.UPSTART;
            this.box_skill.visible = false;
            this.starList.visible = type == UI_FLYTEXT.UPSTART && this.godVo.starLevel <= 5;
            if (type == UI_FLYTEXT.UPSTART) {
                //升星
                this.playGodStarUpEffect();
                this.setModel(god.getModel());
            } else if (type == UI_FLYTEXT.AWAKEN) {
                //觉醒
                let before: number = god.tab_god.model;
                this.setModel(before);
                this.drawStar(god.getStar());
            }
            setTimeout(() => {
                this.uiScene.addEffect(this, 1000002, new tl3d.Vector3D(180, 0, -640), 3, 30, ($particle: tl3d.CombineParticle) => {
                    this.roleRotation($particle, god, type);
                });
            }, 500);
        }

        private drawListView($vo: GodItemVo) {
            this.lab_name.text = $vo.tab_god.name;
            // this.img_level.skin = SkinUtil.getQulitySkin($vo.tab_god.quality - 1);
        }

        private drawStar($star: number) {
            let star = $star >= 6 ? $star - 5 : $star;
            this.list_stars_0.repeatX = star
            let tempStararry = new Array;
            for (let i = 0; i < star; i++) {
                tempStararry[i] = $star >= 6;
            }
            this.list_stars_0.dataSource = tempStararry;
            this.list_stars_0.x = 291 + (5 - star) * 29 / 2;
        }

        private onXingjiRender(cell: Laya.Image, index: number) {
            let data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
                cell.width = 29;
                cell.height = 31;
            }
            else
                cell.skin = SkinUtil.xingxing;
        }

        public onClosed() {
            if (this.dataSource && this.dataSource[2]) UIUtil.showRewardView(this.dataSource[2]);
            super.onClosed();
            this.img_zhezhao.off(Laya.Event.CLICK, this, this.onExit)
            this._anis.forEach(vo => vo.destroy());
            this._anis.length = 0;
            this.uiScene.onExit();
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            this.onRemoveEffect();
        }
        private onRemoveEffect(): void {
            for (let particle of this.effList) {
                this.uiScene.removeEffect(particle);
            }
            this.effList.length = 0;
        }
        public onExit() {
            UIMgr.hideUIByName(UIConst.ShowRole);
        }

        private roleRotation($particle: tl3d.CombineParticle, $god: GodItemVo, $type: number) {
            setTimeout(() => {
                this.img_bgs.visible = true;
                this.img_bgs.alpha = 0;
                Laya.Tween.to(this.img_bgs, { alpha: $type != UI_FLYTEXT.UPSTART ? 1 : 0 }, 1000, null, Handler.create(this, () => {
                    if ($type == UI_FLYTEXT.AWAKEN) {
                        this.setModel($god.tab_god.awake_model);
                        this.drawStar($god.getStar());
                    } else if ($type == UI_FLYTEXT.UPSTART) {
                        this.setModel($god.getModel());
                        this.drawStar($god.getStar());
                        this.showSkill($god);
                    }

                    Laya.Tween.to(this.img_bgs, { alpha: 0 }, 1000, null, Handler.create(this, () => {
                        this.img_bgs.visible = false;
                    }));

                    if ($type != UI_FLYTEXT.UPSTART) {
                        this.uiScene.addEffect(this, 10000015, new tl3d.Vector3D(180, 0, -200), 7, -30, null, 180);
                        setTimeout(() => {
                            this.lab_info.visible = true;
                        }, 500);
                    }
                    else  {
                        this.lab_info.visible = true;
                    }
                }));
            }, 500);
        }

        private showSkill(god: GodItemVo): void {
            let starLv: number = god.getStar();
            let degree: number = god.degree;
            if (!god || starLv < 2) return;

            let curTemp: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(starLv);
            let lastTemp: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(starLv - 1);
            let idx: number = -1;
            let curLv: number = 0;
            let lastLv: number = 0;
            for (let i: number = 0; i < curTemp.evolution_effect.length; i++) {
                if (curTemp.evolution_effect[i] > lastTemp.evolution_effect[i]) {
                    idx = i;
                    curLv = curTemp.evolution_effect[i];
                    lastLv = lastTemp.evolution_effect[i];
                    break;
                }
            }
            if (idx == -1) return;
            let oldAllSkill: tb.TB_skill[] = god.tab_god.getAllSkill(god.degree, god.getStar() - 1);
            let curAllSkill: tb.TB_skill[] = god.jisuanjineng();
            if (!oldAllSkill || idx >= oldAllSkill.length) return;
            if (!curAllSkill || idx >= curAllSkill.length) return;
            this.box_skill.visible = true;
            let oldTbSkill = oldAllSkill[idx];
            let oldSkill: common.SkillTipData = { skill: oldTbSkill, openDgLv: oldTbSkill.level, dgLv: lastLv, isShow: false, isShowlist: false };
            this.oldSkill.dataSource = oldSkill;

            let newTbSkill = curAllSkill[idx];
            let newSkill: common.SkillTipData = { skill: newTbSkill, openDgLv: newTbSkill.level, dgLv: curLv, isShow: false, isShowlist: false };
            this.newSkill.dataSource = newSkill;
        }

        /**
		 * 设置模型
		 * @param model 模型id
		 */
        public setModel(model): void {
            if (!this.uiScene) {
                return;
            }
            this.uiScene.addModelChar(model, 360, 850, 180);
        }

        private effList: any[] = [];
        private _anis: Laya.Animation[] = [];
        /**用哪种星星 */
        private _type: boolean;
        /**升星特效播放 */
        playGodStarUpEffect(): void {
            this.effList.length = 0;
            let starLv = this.godVo.starLevel /*10*/;
            this._type = starLv > 5;
            let num: number = this._type ? starLv - 5 : starLv;
            if (starLv > 5) {

                for (let i: number = 0; i < num; i++) {
                    Laya.timer.once(200 * (i + 1), this, () => {
                        let posx: number = 100 + (5 - num) * 21 + i * 42;
                        this.uiScene.addEffect(this, 10000024, new tl3d.Vector3D(posx, 0, -120), 3, 3, (particle) => {
                            if (!UIMgr.hasStage(UIConst.ShowRole)) {
                                this.onRemoveEffect();
                                return;
                            }
                            this.effList.push(particle);
                        }, 180);
                        if (i + 1 == num)
                            this.uiScene.addEffect(this, 10000014, new tl3d.Vector3D(180, 0, -200), 7, 3, null, 180);
                    })
                }
            } else {
                this.starList.repeatX = num;
                this.starList.x = 95 + (5 - this.starList.repeatX) * (225 - 150) / 2;
                this.starList.cells.forEach((cell: ui.prompt.StarUpRenderUI, index) => {
                    cell.red.visible = cell.glod.visible = false;
                    Laya.timer.once(200 * (index + 1), cell, () => {
                        this._type ? cell.red.visible = true : cell.glod.visible = true;
                        this._type ? cell.red.play(0, false) : cell.glod.play(0, false);
                        if (index + 1 == this.starList.repeatX)
                            this.uiScene.addEffect(this, 10000014, new tl3d.Vector3D(180, 0, -200), 7, 3, null, 180);
                    })
                })
            }

        }
    }
}