/**
* name 
*/
module game {
    export class RankProcessor extends tl3d.Processor {

        private _model : RankModel;
        constructor() {
            super();
            this._model = RankModel.getInstance();
        }

        public getName(): string {
            return "RankProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new RankingListEvent(RankingListEvent.SHOW_RANKINGLIST_PANEL),
                new RankingListEvent(RankingListEvent.RANKINGLIST_IS_WORKSHIP),
                new RankingListEvent(RankingListEvent.RED_EVENT_RANKLIST),
                new RankingListEvent(RankingListEvent.REQUEST_RANK_DATA),
            ];
        }

        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof RankingListEvent) {
                switch (event.type) {
                    case RankingListEvent.SHOW_RANKINGLIST_PANEL:
                        this.onProtocolRankingList(event.data);
                        break;
                    case RankingListEvent.RANKINGLIST_IS_WORKSHIP:
                        this.onProtocolWorkShip(event.data);
                        break;
                    case RankingListEvent.REQUEST_RANK_DATA:
                        this.requestRankData(event.data);
                        break;
                }
            }
        }

        /**获取排行榜 */
        private onProtocolRankingList(type: number): void {
            let model = this._model;
            model.curRankType = type
            if (UIMgr.hasStage(UIConst.RankView)) {
                if (model.rankingList.hasOwnProperty(type)) {
                    this.rankingListView.initView(model.rankingList[type]);
                    return;
                }
            }
            if (type == RankListType.Guild) {/**公会 */
                PLC.request(Protocol.guild_guild_levelRankList, null, ($data: any, msg: any) => {
                    if(!$data) return;
                    App.hero.guildLv = $data.rankValue;
                    // model.rankingList[type] = $data;
                    model.setRankData(type, $data);
                    if (UIMgr.hasStage(UIConst.RankView)) this.rankingListView.initView(model.rankingList[type]);
                    else UIMgr.showUI(UIConst.RankView, model.rankingList[type]);
                });
            } else {
                let arg = {};
                arg[Protocol.game_rank_getRankList.args.rankType] = type;
                PLC.request(Protocol.game_rank_getRankList, arg, (data) => {
                    if(!data) return;
                    // model.rankingList[type] = data;
                    model.setRankData(type, data);
                    if (UIMgr.hasStage(UIConst.RankView)) this.rankingListView.initView(model.rankingList[type]);
                    else UIMgr.showUI(UIConst.RankView, model.rankingList[type]);
                });
            }
        }

        private requestRankData(type:number):void{
            let model = this._model;
            if (type == RankListType.Guild){
                //公会
                PLC.request(Protocol.guild_guild_levelRankList, null, ($data: any, msg: any) => {
                    if(!$data) return;
                    App.hero.guildLv = $data.rankValue;
                    model.setRankData(type, $data);
                });
            }else{
                let arg = {};
                arg[Protocol.game_rank_getRankList.args.rankType] = type;
                PLC.request(Protocol.game_rank_getRankList, arg, (data) => {
                    if(!data) return;
                    model.setRankData(type, data);
                });
            }
        }

        //膜拜
        private onProtocolWorkShip(type:number): void {
            let model = this._model;
            let arg = {};
            arg[Protocol.game_rank_worship.args.rankType] = type ? type : model.curRankType;
            PLC.request(Protocol.game_rank_worship, arg, (data) => {
                if(!data) return;
                let tabNames = RankModel.getInstance().arrRankListName;
                let idx = tabNames.findIndex(vo => vo[2] == model.curRankType) ;
                let type = Math.min(tabNames.length - 1, idx + 1)
                dispatchEvt(new RankingListEvent(RankingListEvent.RED_EVENT_RANKLIST));
                UIUtil.showRewardView(data.commonData);
                if (this.rankingListView) this.rankingListView.updateBtn();
                // this.rankingListView.listsetScroll('right');
                // 不自动切换
                // this.onProtocolRankingList(tabNames[type][2]);
            });
        }

        public get rankingListView(): RankModuleView {
            return UIMgr.getUIByName(UIConst.RankView);
        }

    }
}