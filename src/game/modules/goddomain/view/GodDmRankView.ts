
module game {

	export class GodDmRankView extends ui.goddomain.RankViewUI {

        private _rankList : common.RankVo[];
        private _rank : number = 0;
        constructor(){
            super();
        }

        createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12324) };
            this.tabBar.selectHandler = Handler.create(this,this.onSelected,null,false);
		}
        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}
        public onClosed():void{
			super.onClosed();
            this.tabBar.selectedIndex = -1;
            this.rankList.array = null;
            this._rankList = null;
		}

        private initView():void {
            this.tabBar.selectedIndex = 0;
        }

        private onSelected(index:number):void {
            if(index == -1) return;
            this.viewStack.selectedIndex = index;
            if(index == 0){
                if(!this._rankList){
                    this._rankList = [];
                    this.rankList.array = null;
                    this.lab_empty.visible = !this.rankList.array || this.rankList.array.length == 0;
                    GameUtil.requestRankList(iface.tb_prop.rankTypeKey.godDmLocal,GodDmRankVo)
                    .then((data:{myRank:number,rankValue:number,rankList:common.RankVo[]})=>{
                        this._rankList = data.rankList;
                        this._rank = data.myRank;
                        this.setRankList();
                    });
                }else{
                    this.setRankList();
                }
            }else {
                this.rewardList.array = tb.TB_fight_goddomain_reward.getItemList();
                this.lab_empty.visible = false;
            }
        }

        /** 设置排行列表数据 */
        setRankList():void {
            if(this.tabBar.selectedIndex == 0){
                this.rankList.array = this._rankList;
                this.rankList.scrollTo(0);
                this.lbScore.text = GodDomainModel.getInstance().score + "";
                this.lbRank.text = this._rank == 0 ? LanMgr.getLan("",12187) : this._rank + "";
                this.lbScore.event(Laya.Event.RESIZE);
                this.lbRank.event(Laya.Event.RESIZE);
                this.lab_empty.visible = !this.rankList.array || this.rankList.array.length == 0;
            }
        }
        
    }

}