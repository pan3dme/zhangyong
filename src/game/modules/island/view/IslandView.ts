
module game {

    export class IslandView extends ui.island.IslandMainUI {

        private _boxList: Laya.Box[];
        private _model: IslandModel;
        private _init: boolean
        constructor() {
            super();
            this.group = UIConst.hud_group;
        }
        createChildren(): void {
            super.createChildren();
            this._model = IslandModel.getInstance();
            this.itemPanel.hScrollBarSkin = "";
            this._boxList = [];
            for (let i = 0; i < 7; i++) {
                let item = this['item' + i];
                this._boxList.push(item);
            }
            this.imgBg1.skin = SkinUtil.getSysMapSkin(ModuleConst.Island,1);
            this.imgBg2.skin = SkinUtil.getSysMapSkin(ModuleConst.Island,2);
            this.imgBg3.skin = SkinUtil.getSysMapSkin(ModuleConst.Island,3);
            this.imgBg4.skin = SkinUtil.getSysMapSkin(ModuleConst.Island,4);
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
			this.lbDesc.y = GameUtil.isFullScreen() ? (137+HudModel.TOP_ADD_HEIGHT) : 137;
            this.lbRefreshTime.y = GameUtil.isFullScreen() ? (168+HudModel.TOP_ADD_HEIGHT) : 168;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public onClosed(): void {
            super.onClosed();
            Laya.timer.clearAll(this);
            for (let i = 0; i < this._boxList.length; i++) {
                this._boxList[i].on(Laya.Event.CLICK, this, this.onClickIsland);
                this._boxList[i].dataSource = null;
            }
            this.imgArrow.x = 0;
            this.imgArrow.visible = false;
            IslandUtil.stopRobLoop();
            UIMgr.hideUIByName(UIConst.SysTopView);
        }

        private initView(): void {
            let funList: BtnFuncVo[] = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_record, redpointName: "island_record", callback: this.onRecord.bind(this) },
            ];
            let resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry, funList, closeCallback: this.onFanHui.bind(this) });
            for (let i = 0; i < this._boxList.length; i++) {
                this._boxList[i].on(Laya.Event.CLICK, this, this.onClickIsland);
            }
            let model = this._model;
            let list = model.getList();
            for (let i = 0; i < this._boxList.length; i++) {
                let box = this._boxList[i];
                box.dataSource = list[i];
            }
            this.updateView();
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            IslandUtil.loopRequestRobbed();
            model.updateEndTime(false);
            this.callLater(this.scrollTo);
        }

        private scrollTo(): void {
            if (this.imgArrow.visible) {
                this.itemPanel.scrollTo(this.imgArrow.x - 360);
            } else if (!this._init) {
                this.timer.frameOnce(5, this, () => {
                    this._init = true;
                    if (this.itemPanel) {
                        this.itemPanel.scrollTo(364);
                    }
                });
            }


            // let pos:number = this.imgArrow.visible ? this.imgArrow.x-360 : 364;
            // this.itemPanel.scrollTo(pos);
        }

        public updateView(): void {
            let model = this._model;
            let curId = model.myOreInfo ? model.myOreInfo.islandId : 0;
            let itemRender = curId > 0 ? this._boxList.find((box: Laya.Box) => {
                let info: IslandInfoVo = box.dataSource;
                return info && info.tbIsland.ID == curId;
            }) : null;
            this.setIndexImage(itemRender);
        }
        /**
		 * 设置当前索引位置
		 * @param guanqia 
		 */
        private setIndexImage(item: Laya.Box): void {
            if (item) {
                let targetX = item.x + item.width / 2;
                if (this.imgArrow.x != targetX) {
                    this.imgArrow.x = targetX;
                    this.imgArrow.y = item.y + item.height / 2;
                    this.imgArrow.visible = true;
                    this.imgArrow.ani1.play(0, true);
                    this.imgArrow.ani2.play(0, true);
                }
            } else {
                this.imgArrow.visible = false;
            }
        }

        /** 更新时间 */
        public updateTime(): void {
            let time = this._model.getNextRefreshTime();
            this.lbRefreshTime.text = LanMgr.getLan('', 10190, GameUtil.toCountdown(time, "hh:mm:ss"));
        }

        /** 进入岛屿 */
        private onClickIsland(event: Laya.Event): void {
            let box = event.target as Laya.Box;
            if (box && box.dataSource) {
                dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_ORE_MAP, box.dataSource));
            }
        }
        /** 规则 */
        private onRule(): void {
            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_RULE_VIEW));
        }
        /** 记录 */
        private onRecord(): void {
            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_RESCORD_VIEW));
        }

        private onFanHui(): void {
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_JINGJI));
        }


    }
}