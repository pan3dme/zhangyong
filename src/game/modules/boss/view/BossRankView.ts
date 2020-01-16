

module game {

    export class BossRankView extends ui.boss.RankUI{
        
        constructor() {
            super();
            this.isModelClose = true;
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
			this.listRank.array = null;
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:LanMgr.getLan("",12505) };
			this.listRank.array = null;
            this.lbDamage.text = "";
			this.requestRank();
        }

        private requestRank():void {
            let info:BossInfoVo = this.dataSource;
            let arg = {};
            arg[Protocol.center_boss_getRankList.args.id] = info.tbBoss.ID;
            PLC.request(Protocol.center_boss_getRankList,arg,(data)=>{
                if(!data) return;
                let rlist = data.WorldBossRankList;
                let rankLists = [];
                for(let i = 0 ; i < rlist.length ; i ++){
                    rankLists.push(new BossRankInfo(rlist[i], (i+1)));
                }
                let myRank = data.myRank;
                let rankText = myRank == 0 ? LanMgr.getLan('',10028) : LanMgr.getLan('',10029,myRank);
                this.lbDamage.text = `${LanMgr.getLan("",10080,data.rankValue)}    ${rankText}`;
                this.listRank.array = rankLists;
                this.empty.visible = rankLists.length == 0;
            });
        }
    }
}