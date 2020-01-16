module game {
    /*
    * ShenjiezhimenProcessor
    */
    export class GodDoorProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "GodDoorProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GodDoorEvent(GodDoorEvent.OPEN_SHEN_MEN_VIEW),
                new GodDoorEvent(GodDoorEvent.OPEN_DOOR_EVENT),
                new GodDoorEvent(GodDoorEvent.TURN_GOD_EVENT),
                new GodDoorEvent(GodDoorEvent.TURN_GOD_OK),
                new common.GlobalEvent(common.GlobalEvent.DIALOG_CLOSED),
                new ResEvent(ResEvent.RESOURCE_CHANGE),
                new ResEvent(ResEvent.PROP_CHANGE),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof GodDoorEvent) {
                switch (event.type) {
                    case GodDoorEvent.OPEN_SHEN_MEN_VIEW:
                        this.openView();
                        break;
                    case GodDoorEvent.OPEN_DOOR_EVENT:
                        break;
                    case GodDoorEvent.TURN_GOD_EVENT:
                        this.turnGodEvent(event.data);
                        break;
                    case GodDoorEvent.TURN_GOD_OK:
                        this.turnGodOkEvent(event.data);
                        break;
                }
            }
            if (event instanceof common.GlobalEvent) {
                switch (event.type) {
                    case common.GlobalEvent.DIALOG_CLOSED:
                        let panel = event.data as GuaiwuxinxiView
                        if (panel.name == UIConst.GuaiwuxinxiView && UIMgr.hasStage(UIConst.GodDoorView)) {
                            this.shenjiezhimen.vs_item1.addMask();
                        }
                        break;
                }
            }

            if (event instanceof ResEvent) {
                switch (event.type) {
                    case ResEvent.RESOURCE_CHANGE:
                    case ResEvent.PROP_CHANGE:
                        this.coinsChange();
                        break;

                }
            }
        }

        public openView(): void {
            UIMgr.showUI(UIConst.GodDoorView);
        }

        private turnGodOkEvent($data: GodItemVo) {
            var args = {};
            args[Protocol.game_god_doorConvertSave.args.godId] = $data.uuid;
            PLC.request(Protocol.game_god_doorConvertSave, args, ($sdata: any) => {
                if ($sdata && $sdata.targetGod) {
                    if (this.shenjiezhimen) {
                        this.shenjiezhimen.vs_item1.refreshResult($sdata.targetGod);
                    }
                }
            });
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
                        if (this.shenjiezhimen) {
                            this.shenjiezhimen.vs_item1.turnResult($sdata.convertTpltId);
                        }
                    }
                });
            }
        }

        private coinsChange() {
            if (this.shenjiezhimen) {
                this.shenjiezhimen.drawMoney();
            }
        }
        public get shenjiezhimen(): CurMainView {
            return UIMgr.getUIByName(UIConst.GodDoorView);
        }

    }
}