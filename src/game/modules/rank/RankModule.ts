/**
* name 
*/
module game{
	export class RankModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "RankModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new RankProcessor()];
    }

	}

	export class RankingListEvent extends tl3d.BaseEvent {
        public static SHOW_RANKINGLIST_PANEL:string = "SHOW_RANKINGLIST_PANEL";
        public static RANKINGLIST_IS_WORKSHIP:string = "RANKINGLIST_IS_WORKSHIP";
        public static RED_EVENT_RANKLIST:string = "RED_EVENT_RANKLIST";
        //排行榜数据改变
        public static RANK_DATA_CHANGE:string = "RANK_DATA_CHANGE";
        //请求排行榜数据
        public static REQUEST_RANK_DATA:string = "REQUEST_RANK_DATA";
        //排行榜膜拜改变
        public static RANK_MOBAI_CHANGE:string = "RANK_MOBAI_CHANGE";
        public data: any;
    }
}