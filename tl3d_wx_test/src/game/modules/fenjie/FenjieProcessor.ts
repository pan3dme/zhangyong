module game {
    /*
    * FenjieProcessor
    */
    export class FenjieProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: FenjieModel = FenjieModel.getInstance();

        public getName(): string {
            return "FenjieProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW),
                new FenjieEvent(FenjieEvent.CLICK_BTN_FENJIE),
                new GodEvent(GodEvent.GOD_CHANGE),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof FenjieEvent) {
                switch (event.type) {
                    case FenjieEvent.SHOW_FENJIE_VIEW:
                        this.showFenjie();
                        break;
                    case FenjieEvent.CLICK_BTN_FENJIE:
                        this.fenjie(event.data);
                        break;
                }
            } else if(event instanceof GodEvent){
                switch (event.type){
                    case GodEvent.GOD_CHANGE:
                        if(this.fenjieview){
                            this.refrshFenjieView();
                        }
                        break;
                }
            }
        }

        /** 打开分解界面 */
        private showFenjie() {
            UIMgr.showUI(UIConst.FenjieView);
        }

        /** 点击分解 */
        private fenjie(gods:GodItemVo[]):void{
            if(!gods || gods.length == 0) return;
            //遍历数组查看是否有超过4星的神灵
            let haveFour: boolean = false;
            for(let i = 0; i < gods.length; i++){
                if(gods[i].starLevel >= 4){
                    haveFour = true;
                    break;
                }
            }
            //如果有4星
            if (haveFour){
                let alertStr = LanMgr.getLan("", 10500);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: () => {
                        //协议方法
                        this.sendFenjie(gods);
                    }
                });
            } else {
                //协议方法
                this.sendFenjie(gods);
            }
        }

        /** 分解的协议 */
        private sendFenjie(gods:GodItemVo[]):void{
            if(!gods || gods.length == 0) return;
            let IdAry = new Array;
            for(let i = 0; i < gods.length; i++){
                IdAry.push(gods[i].uuid);
            }
            var args = {};
            args[Protocol.game_god_resolve.args.rsvIds] = IdAry;
            PLC.request(Protocol.game_god_resolve, args, ($data: any, $msg) => {
                if(!$data) return;
                this.refrshFenjieView();
                if(UIMgr.hasStage(UIConst.God_MainView)) {
                    let uiPanel:GodMainView = UIMgr.getUIByName(UIConst.God_MainView);
                    uiPanel.onOpened();
                }
                // 返还装备？
                if($data.commonData['modifyEquips']) {
                    $data.commonData['returnEquip'] = {};
                    let equips = $data.commonData['modifyEquips'];
                    for(let key in equips) {
                        let equip = App.hero.getEquipByuuid(key);
                        equip.type = 2;
                        $data.commonData['returnEquip'][key] = equip;
                    }
                }
                
                UIUtil.showRewardView($data.commonData);
            });
        }

        /** 刷新分解界面 */
        public refrshFenjieView(){
            let view = this.fenjieview;
            view.refreshView();
            view.clearSelect();
            view.showHaveGod();
            view.refreshItemList();
        }

        /** 获得分解View */
        public get fenjieview(): FenjieView {
            return UIMgr.getUIByName(UIConst.FenjieView);
        }
    }
}