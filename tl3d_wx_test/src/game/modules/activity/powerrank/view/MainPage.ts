module game {
    export class MainPage extends ui.activity.powerrank.mainPageUI {
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.PowerRank, closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12633) };
            
            this.list_tab.selectHandler = new Handler(this, this.onTabSelect);
			this.list_tab.renderHandler = new Handler(this, this.onTabRender);
        }


        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        private init() {
            this.list_tab.dataSource = this.getTabList();
            this.setSelectTabNum(~~this.list_tab.dataSource.findIndex(vo => vo[2].ID == PowerrankModel.getInstance().curRankID));

            Laya.timer.clearAll(this);
            let time:number = App.getServerTime() % TimeConst.ONE_DAY_SEC;
            time += 10;//过天延迟10秒刷新
            Laya.timer.once(time*1000, this, this.init);
        }

        //获取列表
        private getTabList():any[]{
            let list:any[] = [];
			let tempData: Array<any> = TableData.getInstance().getTableByName(TableData.tb_rank_type).data;
			for (let key in tempData) {
				if (tempData[key]) {
                    let temp:tb.TB_rank_type = tempData[key];
					let time:number = App.getServerTime() - App.getOpenServerTime();
                    if (temp.isShowActivityBtn(time)){
                        let obj:any[] = []
                        obj[0] = this.getTabName(temp.ID);
                        obj[1] = "shenjie" + temp.ID;
                        obj[2] = temp;
                        list.push(obj);
                    }
				}
			}
 
            //排序
            list.sort((a:any, b:any)=>{
                return b[2].time[0] - a[2].time[0];
            });

            return list;
        }

        private getTabName(id:number):string{
            switch(id){
                case PrRankVo.ID_FUBEN:
                    return LanMgr.getLan("",12634);
                case PrRankVo.ID_LEVEL:
                    return LanMgr.getLan("",12635);
                case PrRankVo.ID_SHENLING:
                    return LanMgr.getLan("",12636);
                case PrRankVo.ID_SHILIAN:
                    return LanMgr.getLan("",12183);
                case PrRankVo.ID_ZHANLI:
                    return LanMgr.getLan("",12637);
                default:
                    return "";
            }
        }

        public setSelectTabNum(value) {
			this.list_tab.selectedIndex = value;
			this.list_tab.refresh();
		}

        private onTabSelect(index: number) {
			if (index < 0) return;
            dispatchEvt(new PowerrankEvent(PowerrankEvent.SHOW_VIEW_EVENT), this.list_tab.dataSource[index][2].ID);
		}

		private onTabRender($cell: common.TabIR1, $index: number) {
			$cell.btn_tab.selected = $index == this.list_tab.selectedIndex;
		}

        //更新数据
        public updateData(data:RankListVo):void{
            this.mainview.dataSource = data;
            this.mainview.init();
        }

        public onOpened() {
            super.onOpened();
            this.updateData(this.dataSource);
        }

        public close() {
            super.close();
            this.mainview.close();
        }

        public onClosed() {
            super.onClosed();
            this.mainview.close();
            PowerrankModel.getInstance().rankingList = {};
            Laya.timer.clearAll(this);
        }
    }
}