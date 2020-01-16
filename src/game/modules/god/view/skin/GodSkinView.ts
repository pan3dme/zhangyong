/**
* name 
*/
module game {
    export class GodSkinView extends ui.god.GodSkinUI {

        private _uiScene: Base2dSceneLayer;
        private _godVo: GodItemVo;      // 英雄培养界面进来
        private _tbGod: tb.TB_god;     // 图鉴界面进来

        private _listUIScene: Base2dSceneLayerExt;
        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12220) };
            this.lbAttr.text = "";
            this.skinList.array = null;
            this.skinList.selectedIndex = -1;
            this.skinList.selectEnable = true;
            this.skinList.renderHandler = new Handler(this, this.onSkinRender);
            this.skinList.selectHandler = new Handler(this, this.selectHandler);
            this.btnWear.on(Laya.Event.CLICK, this, this.onWear);
            if (this.skinList.scrollBar) {
                this.skinList.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange);
            }

            this._uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this._uiScene);
            this._uiScene.setModelBox(this, this.lbName, this.lbDesc);

            this._listUIScene = new Base2dSceneLayerExt();
            this.skinPanel.addChild(this._listUIScene);
            this.skinPanel.mouseEnabled = false;
            this.skinPanel.hScrollBarSkin = "";

            this.bgPanel.box_Content.addChild(this.img_bg);
            this.bgPanel.box_Content.addChild(this.skinList);
            this.btn_rotateleft.on(Laya.Event.CLICK, this, this.rotateModel, [1]);
            this.btn_rotateright.on(Laya.Event.CLICK, this, this.rotateModel, [2]);
        }

        public popup(): void {
            super.popup();
            this.initView();
        }

        public show(): void {
            super.show();
            this.initView();
        }

        onOpened(): void {
            super.onOpened();
            this.renderSkinPanel();
        }

        public close(): void {
            super.close();
            this._uiScene.onExit();
            this._listUIScene.onExit();
            this.skinList.array = null;
            this.skinList.selectedIndex = -1;
            Laya.timer.clearAll(this);
            this._godVo = null;
            this._tbGod = null;
        }

        private _isOpenByTujian: boolean;  // 是否从图鉴打开
        private initView(): void {
            this._uiScene.onShow();
            this._listUIScene.onShow();
            this._isOpenByTujian = UIMgr.hasStage(UIConst.TujianView);
            let dataAry: any[] = this.dataSource;
            if (dataAry[0] instanceof GodItemVo) {
                this._godVo = dataAry[0] as GodItemVo;
            } else if (dataAry[0] instanceof tb.TB_god) {
                this._tbGod = dataAry[0];
            }

            let tbGod = this._godVo ? this._godVo.tab_god : this._tbGod;
            let skinList = tbGod.getSkinList();
            let ary = skinList.map((skinVo) => {
                return { godVo: this._godVo, skinVo };
            });
            this.skinList.array = ary;
            if (this.skinList.scrollBar) {
                this.skinList.scrollBar.touchScrollEnable = ary.length > 3;
            }
            let index: number = 0;
            let skinId: number = 0;
            if (dataAry.length >= 2) {
                skinId = dataAry[1];
            } else {
                skinId = this._godVo ? this._godVo.skinId : 0;
            }
            index = skinList.findIndex((vo) => {
                return vo.skinId == skinId;
            });
            index = index == -1 ? 0 : index;
            this.skinList.selectedIndex = index;
        }
        /** 选择 */
        private selectHandler(index: number): void {
            if (index == -1) return;
            this.updateView();
        }

        private onSkinRender(cell: GodSkinIR, index: number): void {
            if (!cell) return;
            let isSelect = this.skinList.selectedIndex == index;
            cell.imgDi.visible = isSelect;
            if (isSelect) {
                cell.ani1.play(0, true);
            } else {
                cell.ani1.gotoAndStop(0);
            }
        }

        private updateView(refreshModel: boolean = true): void {
            let index = this.skinList.selectedIndex;
            if (index == -1) return;
            let info = this.skinList.array[index];
            let skinVo: GodSkinVo = info ? info['skinVo'] : null;
            if (!info || !skinVo) return;
            this.lbName.text = skinVo.getName();
            let tbGod = this._godVo ? this._godVo.tab_god : this._tbGod;
            let isActivity: boolean = this._godVo ? skinVo.isActivity(this._godVo.awakenLv) : false;
            this.costItem.visible = this.lbCost.visible = this.lbHas.visible = false;
            this.lbAttr.text = "";
            let attrAry = skinVo.getTbAttrStrAry();
            if (attrAry) {
                for (let i = 0; i < attrAry.length; i++) {
                    this.lbAttr.text += (attrAry[i][0] + " " + attrAry[i][1]) + (i == attrAry.length - 1 ? "" : "      ");
                }
            }
            if (refreshModel) {
                Laya.timer.once(300, this, this.delayShow, [skinVo.getModelId()]);
            }
            if (this._isOpenByTujian) {
                this.btnWear.visible = false;
                this.lbDesc.visible = true;
                this.lbDesc.text = skinVo.getCondition();
                return;
            }

            this.canActivityRP.visible = skinVo.isCanActivity();
            if (isActivity) {
                let isWear = skinVo.isWear(this._godVo.skinId);
                this.lbDesc.visible = isWear;
                this.lbDesc.text = LanMgr.getLan("",12365);
                this.btnWear.visible = !isWear;
                this.btnWear.label = LanMgr.getLan("",12366);
            } else {
                if (skinVo.skinId == GodSkinType.awaken) {
                    this.btnWear.visible = false;
                    this.lbDesc.visible = true;
                    this.lbDesc.text = LanMgr.getLan("",12361,tb.TB_god_set.get_TB_god_set().awake_section);
                } else {
                    // 付费
                    let isNeedCost: boolean = skinVo.isNeedCost();
                    if (isNeedCost) {
                        this.btnWear.visible = true;
                        this.btnWear.label = LanMgr.getLan("",12367);
                        this.lbDesc.visible = false;
                        this.costItem.visible = this.lbCost.visible = this.lbHas.visible = true;
                        this.costItem.dataSource = skinVo.costVo;
                        this.lbCost.text = "/" + skinVo.costVo.count;
                        let has = App.hero.getBagItemNum(skinVo.costVo.id);
                        this.lbHas.text = has + "";
                        this.lbHas.color = has >= skinVo.costVo.count ? ColorConst.normalFont : ColorConst.RED;
                    } else {
                        this.btnWear.visible = false;
                        this.lbDesc.visible = true;
                        this.lbDesc.text = LanMgr.getLan("",12362);
                    }
                }
            }
        }

        /** 穿戴 */
        private onWear(): void {
            if (!this._godVo) return;
            let godVo = this._godVo as GodItemVo;
            let info = this.skinList.array[this.skinList.selectedIndex];
            let skinVo: GodSkinVo = info ? info['skinVo'] : null;
            if (!godVo || !info || !skinVo) return;
            // 穿戴
            if (skinVo.isActivity(godVo.awakenLv) && !skinVo.isWear(godVo.skinId)) {
                let arg = {};
                arg[Protocol.game_god_setGodSkinId.args.godId] = godVo.uuid;
                arg[Protocol.game_god_setGodSkinId.args.skinId] = skinVo.skinId;
                PLC.request(Protocol.game_god_setGodSkinId, arg, (data) => {
                    if (!data) return;
                    this.updateView(false);
                    this.skinList.refresh();
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                        view.godView.refreshModel();
                    }
                    dispatchEvt(new game.GodEvent(game.GodEvent.WEAR_SUCCESS));
                });
            } else if (!skinVo.isActivity(godVo.awakenLv) && skinVo.isNeedCost()) {
                if (!App.isEnough(skinVo.costVo.id, skinVo.costVo.count)) {
                    showToast(LanMgr.getLan(``, 10373))
                    return;
                }
                // 激活
                let arg = {};
                arg[Protocol.game_god_activeGodSkin.args.godId] = godVo.uuid;
                arg[Protocol.game_god_activeGodSkin.args.skinId] = skinVo.skinId;
                PLC.request(Protocol.game_god_activeGodSkin, arg, (data) => {
                    if (!data) return;
                    this.updateView(false);
                    this.skinList.refresh();
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                        view.godView.refreshModel();
                    }
                    dispatchEvt(new game.GodEvent(game.GodEvent.WEAR_SUCCESS));
                });
            }
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(modeid: any): void {
            let point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            this._uiScene.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, point.y - Launch.offsetY - 50, 180, 2.7);
            this._uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        }

        //向右 2 向左 1
        private rotateModel(dir: number) {
            this._uiScene.sceneChar.rotationY = dir == 1 ? this._uiScene.sceneChar.rotationY - 15 : this._uiScene.sceneChar.rotationY + 15;
        }


        /** 渲染所有皮肤模型 */
        private renderSkinPanel(): void {
            let ary: GodSkinVo[] = [];
            for (let i = 0; i < this.skinList.array.length; i++) {
                let obj: { godVo, skinVo } = this.skinList.array[i];
                if (obj && obj.skinVo) {
                    ary.push(obj.skinVo);
                }
            }
            for (let i = 0; i < ary.length; i++) {
                Laya.timer.once(i * 50, this, (modeid: any, index: number) => {
                    this.skinPanelShow(modeid, index);
                }, [GodUtils.getGodModel(ary[i].skinId, ary[i].tbGod), i]);
            }
        }
        private skinPanelShow(modeid: any, index: number): void {
            if (!modeid) return;
            let point = this.skinPanel.localToGlobal(new Laya.Point(0, 0));
            let px = point.x + index * 204 + this.skinList.spaceX * index + 102 - Launch.offsetX;
            let py = point.y + 220 - Launch.offsetY;
            this._listUIScene.addModelChar(modeid, px, py, 180, 1.3);
        }
        private onScrollChange(): void {
            if (this.skinList.scrollBar) {
                this._listUIScene.x = -this.skinList.scrollBar.value;
            }
        }
    }
}