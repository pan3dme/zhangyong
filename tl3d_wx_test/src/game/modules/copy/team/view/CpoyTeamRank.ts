
module game {

    export class CopyTeamRank extends ui.teamcopy.TeamCopyRankUI {

        private _listDatas: common.RankVo[];
        private _rank: number = 0;
        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12475) };
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public onClosed(): void {
            super.onClosed();
            this.listteam.array = null;
        }

        private initView(): void {
            this.lab_empty.visible = !this.listteam.array || this.listteam.array.length <= 0;
            GameUtil.requestRankList(iface.tb_prop.rankTypeKey.groupCopyFloor, common.RankVo)
                .then((data: { myRank: number, rankValue: number, rankList: common.RankVo[] }) => {
                    this._listDatas = data.rankList;
                    let len = this._listDatas.length;
                    if(len < 6){
                        for (var i = 0; i < 6 - len; i++) {
                            let temp = new common.RankVo;
                            temp.rank = len + i + 1;
                            temp.playerId = null;
                            this._listDatas.push(temp);
                        }
                    }
                    this._rank = data.myRank;
                    this.setlistteam();
                });
        }


        /** 设置排行列表数据 */
        setlistteam(): void {
            this.listteam.array = this._listDatas;
            this.listteam.scrollTo(0);
            this.lbRank.text = this._rank == 0 ? LanMgr.getLan("",12187) : this._rank + "";
            this.lbRank.event(Laya.Event.RESIZE);
            this.lbPass.text = LanMgr.getLan("",12476);
            if (CopyTeamModel.getInstance().myFloor > 0) {
                let tab = tb.TB_team_copy.getTB_team_copyById(CopyTeamModel.getInstance().myFloor);
                if (tab) {
                    this.lbPass.text = `${Math.floor(tab.copy / 10)}-${tab.copy % 10}`;
                }
            }
            this.lbPass.event(Laya.Event.RESIZE);
            this.lab_empty.visible = !this.listteam.array || this.listteam.array.length <= 0;
        }

    }

}