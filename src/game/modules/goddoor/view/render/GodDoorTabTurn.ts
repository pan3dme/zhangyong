module game {
    export class GodDoorTabTurn extends ui.goddoor.render.TabTurnUI {
        private uiScene: Base2dSceneLayerExt;
        constructor() {
            super();
            this.uiScene = new Base2dSceneLayerExt();
            this.addChildAt(this.uiScene, 2);

        }

        private mainChar: GameUIChar
        private resultChar: GameUIChar
        private curRaceIdx: number = 0;
        public onstage: boolean;
        public init() {
            this.onstage = true;
            this.removeMask();
            this.list_god.mouseHandler = Handler.create(this, this.onGodMouse, null, false);
            this.list_god.renderHandler = Handler.create(this, this.onGodRender, null, false);
            this.list_race.selectHandler = Handler.create(this, this.onRaceSelect, null, false);
            this.list_race.renderHandler = Handler.create(this, this.onRaceRender, null, false);

            this.btn_cancel.on(Laya.Event.CLICK, this, this.onCancel);
            this.btn_save.on(Laya.Event.CLICK, this, this.onSave);
            this.btn_zhuanhuan.on(Laya.Event.CLICK, this, this.onTurn);
            this.btn_xiangxi.on(Laya.Event.CLICK, this, this.onDetailed);

            this.curRaceIdx = 0;
            this.list_race.dataSource = [0, 1, 2, 3];
            this.list_race.selectedIndex = 0;


            this.setBtn(true);
            this.selectGod = null;
            GodModel.getInstance().showItemsByView = ChooseOpenType.TURN_VIEW;
        }

        public close() {
            this.onstage = false;
            Laya.timer.clearAll(this);
            if (this.list_god.renderHandler) {
                this.list_god.renderHandler.recover();
                this.list_god.renderHandler = null;
            }
            if (this.list_god.mouseHandler) {
                this.list_god.mouseHandler.recover();
                this.list_god.mouseHandler = null;
            }
            if (this.list_race.renderHandler) {
                this.list_race.renderHandler.recover();
                this.list_race.renderHandler = null;
            }
            if (this.list_race.selectHandler) {
                this.list_race.selectHandler.recover();
                this.list_race.selectHandler = null;
            }
            this.list_race.dataSource = [];
            this.list_god.dataSource = [];

            this.btn_cancel.off(Laya.Event.CLICK, this, this.onCancel);
            this.btn_save.off(Laya.Event.CLICK, this, this.onSave);
            this.btn_zhuanhuan.off(Laya.Event.CLICK, this, this.onTurn);
            this.btn_xiangxi.off(Laya.Event.CLICK, this, this.onDetailed);

            this.removeLeftEff();
            this.removeRightEff();
            this.uiScene.onExit();
            this.mainChar = null;
            this.resultChar = null;

            this.ani1.stop();
            this.removeMask();
            this._godDoorMain = null;
            this.removeRewardEff();
        }

        private onRaceRender(itemRender: common.RaceBox, index: number) {
            let selected = itemRender.img_selected;
            selected.visible = index == this.curRaceIdx
        }

        private onRaceSelect(index: number) {
            if (index == -1) return;
            this.curRaceIdx = index;
            let tempAry: Array<GodItemVo> = GodDoorModel.getInstance().getGodList(index);
            this.list_god.dataSource = tempAry;
        }

        private onGodRender(cell: godChooseIR, index: number) {
            let goditemvo: GodItemVo = cell.dataSource;
            cell.img_gouxuan.visible = cell.dataSource.selected = this._selectGod == goditemvo;
        }

        private _selectGod: GodItemVo;
        private onGodMouse(e: Laya.Event, $index: number) {
            if (e.type != Laya.Event.CLICK) return;
            if ($index == -1 || this._selectGod == this.list_god.dataSource[$index]) {
                //取消
                this.selectGod = null;
                this.list_god.selectedIndex = -1;
            } else {
                //选中
                let sgod = this.list_god.array[$index] as GodItemVo;
                if (!sgod.isInLinuep()) {
                    this.selectGod = sgod;
                    this.list_god.selectedIndex = $index;

                } else {
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan("", 10501), confirmCb: () => {
                            GodUtils.downGods(sgod).then(() => {
                                this.list_god.refresh();
                            });
                        }
                    });
                }
            }

        }

        public set selectGod($val) {
            this._selectGod = $val;
            this.showLeftInfo(this._selectGod);
            this.drawCost();
            this.showRightInfo(this.selectGod);
        }

        public get selectGod(): GodItemVo {
            return this._selectGod;
        }

        private drawCost() {
            if (this.selectGod) {
                //有消耗
                this.img_cost1.visible = false;
                this.img_cost2.visible = false;
                let tabkey: number = this.selectGod.tab_god.race_type * 100 + this.selectGod.starLevel * 10 + this.selectGod.tab_god.quality;
                let replacetab: tb.TB_divinity_replace = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
                for (var i = 0; i < replacetab.cost.length; i++) {
                    let idx = i + 1;
                    let img: Laya.Image = this["img_cost" + idx];
                    img.visible = true;
                    img.skin = SkinUtil.getCostSkin(replacetab.cost[i][0]);
                    this["lab_cost" + idx].text = "x " + Snums(replacetab.cost[i][1]);
                }
                this.img_cost_bg.visible = true;
            } else {
                this.img_cost_bg.visible = false;
                this.img_cost1.visible = false;
                this.img_cost2.visible = false;
            }
        }

        private onDetailed() {
            this.removeMask();
            let tab = tb.TB_god.get_TB_godById(this._resultId);
            let tabevolution = tb.TB_god_evolution.get_TB_god_evolutionById(this.selectGod.starLevel);
            let realDegree = this.selectGod.starLevel <= 5 ? this.selectGod.starLevel : 5;
            let obj = { templateId: tab.ID, starLevel: this.selectGod.starLevel, level: tabevolution.level, skill: tab.skill, degree: realDegree };
            let godData: GodItemVo = new GodItemVo(obj);
            godData.tab_god = tab;
            dispatchEvt(new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
        }

        private onCancel() {
            this.setResult();
        }

        private onSave() {
            dispatchEvt(new GodDoorEvent(GodDoorEvent.TURN_GOD_OK), this.selectGod);
        }

        public refreshResult($targetGod) {
            for (var key in $targetGod) {
                if (this.selectGod.uuid == key) {
                    this.selectGod.templateId = $targetGod[key].templateId;
                    this.selectGod.tab_god = tb.TB_god.get_TB_godById(this.selectGod.templateId);
                    this.showLeftInfo(this.selectGod);
                    this.list_god.refresh();
                }
            }

            this.setResult();
        }

        private setResult() {
            this.removeMask();
            this.setBtn(true);
            this.drawCost();
            this.showRightInfo(this.selectGod);
        }

        private removeMask() {
            let view:CurMainView = this.getGodDoorMain();
            if (view){
                view.removeBoxMask();
            }
        }

        private _godDoorMain:CurMainView;
        private getGodDoorMain():CurMainView{
            if (!this._godDoorMain){
                this._godDoorMain = UIMgr.getUIByName(UIConst.GodDoorView);
            }
            return this._godDoorMain;
        }
        public addMask() {
            let view:CurMainView = this.getGodDoorMain();
            if (view){
                view.addBoxMask(Laya.Handler.create(this, this.onClickMask, null, false));
                view.addBoxMaskUnit(this.btn_cancel);
                view.addBoxMaskUnit(this.btn_save);
                view.addBoxMaskUnit(this.btn_xiangxi);
            }
        }

        private onClickMask():void{
             showToast(LanMgr.getLan("", 10108));
        }

        //服务端返回的新英雄数据
        private _resultId: number;
        private onTurn() {
            if (this._hasRewardEff) return;
            if (!this.selectGod) {
                showToast(LanMgr.getLan("", 10109));
                return;
            }
            //发送转换请求
            // sendDispatchEvent(new GodDoorEvent(GodDoorEvent.TURN_GOD_EVENT), this.selectGod);
            this.turnGodEvent(this.selectGod);
        }

        private turnGodEvent($data: GodItemVo) {
            let tabkey: number = $data.tab_god.race_type * 100 + $data.starLevel * 10 + $data.tab_god.quality;
            let replacetab: tb.TB_divinity_replace = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
            let flag: boolean = true;
            for (var i = 0; i < replacetab.cost.length; i++) {
                if (replacetab.cost[i][0] == iface.tb_prop.resTypeKey.convertDust) {
                    if (replacetab.cost[i][1] > App.hero.convertDust) {
                        flag = false;
                        showToast(LanMgr.getLan("", 10120));
                        break;
                    }
                } else if (replacetab.cost[i][0] == iface.tb_prop.resTypeKey.gold) {
                    if (replacetab.cost[i][1] > App.hero.gold) {
                        flag = false;
                        showToast(LanMgr.getLan("", 10120));
                        break;
                    }
                } else {
                    logdebug("新增道具没加判断！");
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var args = {};
                args[Protocol.game_god_doorConvert.args.godId] = $data.uuid;
                PLC.request(Protocol.game_god_doorConvert, args, ($sdata: any) => {
                    if ($sdata && $sdata.convertTpltId) {
                        if (this.onstage) {
                            this.addRewardEff();
                            Laya.timer.once(600, this, () => {
                                this.removeRewardEff();
                                this.turnResult($sdata.convertTpltId);
                            })
                        }
                    }
                });
            }
        }

        public turnResult($newId: number) {
            if (!this.onstage) return;
            this._resultId = $newId
            let god = tb.TB_god.get_TB_godById(this._resultId);   //英雄
            this.showRightInfo(this.selectGod, god);
            this.setBtn(false);
            this.addMask();
        }

        private setBtn(turnbefore: boolean) {
            this.img_cost1.visible = this.img_cost2.visible = this.img_cost_bg.visible = turnbefore;
            this.btn_xiangxi.visible = this.btn_cancel.visible = this.btn_save.visible = !turnbefore;
            this.btn_zhuanhuan.visible = turnbefore;
        }

        //显示右边信息
        private showRightInfo(leftGod: GodItemVo, godTemp: tb.TB_god = null): void {
            if (leftGod) {
                this.box_new.visible = true;
                this.img_new_flag.skin = SkinUtil.getGodRaceSkin(leftGod.tab_god.race_type);
                this.star_new.setStarNum(leftGod.starLevel);
                this.addRightEff();
                if (godTemp) {

                    this.lab_new_name.text = LanMgr.getLan("Lv.{0} {1}", -1, leftGod.level, godTemp.name);
                    this.resultChar = this.uiScene.addModelChar(String(godTemp.model), 530, 630, 190, 2.2);
                    this.img_wh.visible = false;
                    this.ani1.stop();
                } else {
                    this.lab_new_name.text = LanMgr.getLan("Lv.{0} {1}", -1, leftGod.level, "??");
                    if (this.resultChar) {
                        this.uiScene.removeModelChar(this.resultChar);
                    }
                    this.img_wh.visible = true;
                    this.ani1.play();
                }
            } else {
                //左边都没有的话，右边肯定也没有
                this.box_new.visible = false;
                this.removeRightEff();
                if (this.resultChar) {
                    this.uiScene.removeModelChar(this.resultChar);
                }
                this.img_wh.visible = false;
                this.ani1.stop();
            }

        }

        //显示左边信息
        private showLeftInfo(god: GodItemVo = null): void {
            if (god) {

                this.removeLeftEff();
                this.box_old.visible = true;
                this.setMainChar(god);

                this.img_old_flag.skin = SkinUtil.getGodRaceSkin(god.tab_god.race_type);
                this.star_old.setStarNum(this.selectGod.starLevel);
                this.lab_old_name.text = LanMgr.getLan("Lv.{0} {1}", -1, this.selectGod.level, this.selectGod.tab_god.name);
                let tabkey: number = this.selectGod.tab_god.race_type * 100 + this.selectGod.starLevel * 10 + this.selectGod.tab_god.quality;
                let replacetab: tb.TB_divinity_replace = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
                for (var i = 0; i < replacetab.cost.length; i++) {
                    let idx = i + 1;
                    let img: Laya.Image = this["img_cost" + idx];
                    img.visible = true;
                    img.skin = SkinUtil.getCostSkin(replacetab.cost[i][0]);
                    this["lab_cost" + idx].text = "x " + Snums(replacetab.cost[i][1]);
                }
                this.img_cost_bg.visible = true;
            } else {
                this.addLeftEff();
                this.box_old.visible = false;
                if (this.mainChar) {
                    this.uiScene.removeModelChar(this.mainChar);
                }
            }
        }

        private setMainChar(god: GodItemVo) {
            if (this.mainChar) {
                this.uiScene.removeModelChar(this.mainChar);
            }
            if (god) {
                this.mainChar = this.uiScene.addModelChar(String(god.tab_god.model), 170, 630, 170, 2.2);
            }
        }

        //添加左边特效
        private _leftEff: any;
        private _hasLeftEff: boolean = false;
        private addLeftEff(): void {
            if (this._hasLeftEff) return;
            this._hasLeftEff = true;
            this.uiScene.addEffect(this, 10000023, new tl3d.Vector3D(85, 0, -450), 2, 10, ($particle) => {
                this._leftEff = $particle;
                if (!this._hasLeftEff) {
                    this.removeLeftEff();
                }
            });
        }

        //移除左边特效
        private removeLeftEff(): void {
            this._hasLeftEff = false;
            if (this._leftEff) {
                this.uiScene.removeEffect(this._leftEff);
                this._leftEff = null;
            }
        }

        //添加右边特效
        private _rightEff: any;
        private _hasRightEff: boolean = false;
        private addRightEff(): void {
            if (this._hasRightEff) return;
            this._hasRightEff = true;
            this.uiScene.addEffect(this, 10000022, new tl3d.Vector3D(270, 0, -450), 2, 30, ($particle) => {
                this._rightEff = $particle;
                if (!this._hasRightEff) {
                    this.removeRightEff();
                }
            });
        }

        //移除左边特效
        private removeRightEff(): void {
            this._hasRightEff = false;
            if (this._rightEff) {
                this.uiScene.removeEffect(this._rightEff);
                this._rightEff = null;
            }
        }

        //添加奖励特效
        private _rewardEff: any;
        private _hasRewardEff: boolean = false;
        private addRewardEff(): void {
            if (this._hasRewardEff) return;
            this._hasRewardEff = true;
            this.uiScene.addEffect(this, 10000021, new tl3d.Vector3D(270, 0, -450), 2, 30, ($particle) => {
                this._rewardEff = $particle;
                if (!this._hasRewardEff) {
                    this.removeRewardEff();
                }
            });
        }

        //移除奖励特效
        private removeRewardEff(): void {
            this._hasRewardEff = false;
            if (this._rewardEff) {
                this.uiScene.removeEffect(this._rewardEff);
                this._rewardEff = null;
            }
        }

    }
    
}