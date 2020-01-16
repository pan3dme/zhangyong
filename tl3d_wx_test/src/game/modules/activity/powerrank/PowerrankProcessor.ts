module game {
    /*
    * PowerrankProcessor
    */
    export class PowerrankProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: PowerrankModel = PowerrankModel.getInstance();

        public getName(): string {
            return "PowerrankProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new PowerrankEvent(PowerrankEvent.SHOW_VIEW_EVENT),
                new PowerrankEvent(PowerrankEvent.OPEN_DETAIL_PANEL),
                new PowerrankEvent(PowerrankEvent.SHOW_RANKVIEW_EVENT),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof PowerrankEvent) {
                switch (event.type) {
                    case PowerrankEvent.SHOW_VIEW_EVENT:
                        this.showview(event.data);
                        break;
                    case PowerrankEvent.OPEN_DETAIL_PANEL:
                        this.opendetail();
                        break;
                    case PowerrankEvent.SHOW_RANKVIEW_EVENT:
                        this.openRankView(event.data);
                        break;
                }
            }
        }

        private opendetail() {
            let model = this._model;
            let rankList:any = model.rankingList[model.curRankID];
            this.openRankView(rankList);
        }

        private showview(id:number) {
            let model = this._model;
            if (!model.visiableView()) {
                showToast(LanMgr.getLan("", 10095));
                return;
            }
            id = id ? id:this.getFirstRankId();
            model.curRankID = id;
            if (this.viewHasStage && model.rankingList.hasOwnProperty(id)){
                //已有数据刷新
                this.view.updateData(model.rankingList[id])
            }else{
                let arg = {};
                arg[Protocol.center_global_getRankList.args.id] = id;
                PLC.request(Protocol.center_global_getRankList, arg, ($data: any, msg: any) => {
                    if (!$data) return;
                    model.firstLogin = false;
                    if (!model.rankingList.hasOwnProperty(id)){
                        model.rankingList[id] = new RankListVo(id);
                    }
                    (model.rankingList[id] as RankListVo).syncData($data);
                    dispatchEvt(new PowerrankEvent(PowerrankEvent.UPDATE_REDPOINT));
                    if (this.viewHasStage){
                        this.view.updateData(model.rankingList[id])
                    }else{
                        UIMgr.showUI(UIConst.PowerRank, model.rankingList[id]);
                    }
                });
            }
            
        }

        private getFirstRankId():number{
            let tempData: Array<any> = TableData.getInstance().getTableByName(TableData.tb_rank_type).data;
            let lastID:number = 1;
			for (let key in tempData) {
				if (tempData[key]) {
                    let temp:tb.TB_rank_type = tempData[key];
					let time:number = App.getServerTime() - App.getOpenServerTime();
                    if (temp.isShowActivityBtn(time)){
                        return temp.ID;
                    }
                    lastID = temp.ID;
				}
			}
            return lastID;
        }

        private openRankView(data) {
            UIMgr.showUI(UIConst.Pow_List, data);
        }

        public get view(): MainPage {
            return UIMgr.getUIByName(UIConst.PowerRank);
        }

        public get viewHasStage(): boolean {
            return UIMgr.hasStage(UIConst.PowerRank);
        }

    }
}