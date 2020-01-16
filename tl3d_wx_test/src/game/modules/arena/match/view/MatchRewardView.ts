
module game {

	export class MatchRewardView extends ui.arena.match.MatchRewardUI {

        constructor(){
            super();
        }

        createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12261) };
            this.tabBar.selectHandler = Handler.create(this,this.onSelected,null,false);
		}
        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}
        public onClosed():void{
			super.onClosed();
            this.tabBar.selectedIndex = -1;
            this.benfuList.array = null;
            this.kuafuList.array = null;
		}

        private initView():void {
            this.tabBar.selectedIndex = 0;
            let model = MatchModel.getInstance();
            this.lbScore.text = model.score + "";
            this.lbRank.text = model.benfuRank + "";
            this.lbGrade.text = model.getGradeName(model.score);
        }

        private onSelected(index:number):void {
            if(index == -1) return;
            this.viewStack.selectedIndex = index;
            let model = MatchModel.getInstance();
            let isBenfu = index == 0;
            if(isBenfu){
                this.benfuList.array = tb.TB_match.getItemList();
            }else {
                this.kuafuList.array = tb.TB_match_score.getItemList();
            }
            // this.lbRankDesc.text = isBenfu ? "   本服排名：" : "   跨服排名：";
            // this.lbRank.text = isBenfu ? (model.benfuRank+"") : (model.kuafuRank+"");
            // this.lbGrade.text = model.getGradeName(model.score);
            // this.lbRank.event(Laya.Event.RESIZE);
        }

    }

}