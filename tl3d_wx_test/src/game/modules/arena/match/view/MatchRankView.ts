
module game {

	export class MatchRankView extends ui.arena.match.MatchRankUI {

        private _benfuList : MatchRankVo[];
        private _kuafuList : MatchRankVo[];
        constructor(){
            super();
        }

        createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12324) };
            this.tabBar.selectHandler = Handler.create(this,this.onSelected,null,false);
            this.lbScore.autoSize = this.lbRank.autoSize = this.lbGrade.autoSize = true;
		}
        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}
        public onClosed():void{
			super.onClosed();
            this.tabBar.selectedIndex = -1;
            this.rankList.array = null;
            this._benfuList = null;
            this._kuafuList = null;
		}

        private initView():void {
            this.tabBar.selectedIndex = 0;
        }

        private onSelected(index:number):void {
            if(index == -1) return;
            if(index == 0){
                if(!this._benfuList){
                    this._benfuList = [];
                    this.rankList.array = null;
                    MatchThread.getInsatnce().requestRankList(true).then((data:any)=>{
                        for(let key in data){
                            let rankVo = new MatchRankVo();
                            rankVo.setSvo(data[key]);
                            rankVo.rank = Number(key);
                            rankVo.score = data[key]["score"];
                            this._benfuList.push(rankVo);
                        }
                        this.setBenfuList();
                    });
                }else{
                    this.setBenfuList();
                }
            }else {
                if(!this._kuafuList){
                    this._kuafuList = [];
                    this.rankList.array = null;
                    MatchThread.getInsatnce().requestRankList(false).then((data:any)=>{
                        for(let key in data){
                            let rankVo = new MatchRankVo();
                            rankVo.setSvo(data[key]);
                            rankVo.rank = Number(key);
                            rankVo.score = data[key]["score"];
                            rankVo.rankSvrType = common.RankSvrType.matchCrossSvr;
                            this._kuafuList.push(rankVo);
                        }
                        this.setKuafuList();
                    });
                }else{
                    this.setKuafuList();
                }
            }
        }

        /** 设置本服列表数据 */
        setBenfuList():void {
            if(this.tabBar.selectedIndex == 0){
                this.rankList.array = this._benfuList;
                this.rankList.scrollTo(0);
                let model = MatchModel.getInstance();
                this.lbScore.text = model.score + "";
                this.lbRankDesc.text = "   " + LanMgr.getLan("",12547);
                this.lbRank.text = model.benfuRank+"";
                this.lbGrade.text = model.getGradeName(model.score);
                this.lbRank.event(Laya.Event.RESIZE);
            }
        }
        /** 设置跨服列表数据 */
        setKuafuList():void {
            if(this.tabBar.selectedIndex == 1){
                this.rankList.array = this._kuafuList;
                this.rankList.scrollTo(0);
                let model = MatchModel.getInstance();
                this.lbScore.text = model.score + "";
                this.lbRankDesc.text = "   " + LanMgr.getLan("",12548);
                this.lbRank.text = model.kuafuRank + "";
                this.lbGrade.text = model.getGradeName(model.score);
                this.lbRank.event(Laya.Event.RESIZE);
            }
        }
    }

}