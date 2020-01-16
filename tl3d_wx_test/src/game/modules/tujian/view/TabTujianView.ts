module game {

    export class TabTujianView extends ui.tujian.TabTujianUI {

        private _allTuJianGodTemps:TuJianGodTemp[];
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this.list_tujian.mouseHandler = new Handler(this, this.onMouse);
			this.list_race.selectHandler = new Handler(this, this.onSelect);
			this.list_race.array = [0,1,2,3,4,5];
			this.list_race.selectedIndex = -1;
        }

        public close(): void {
            Laya.timer.clearAll(this);
            this._allTuJianGodTemps = null;
            this.list_tujian.array = null;
			this.list_race.selectedIndex = -1;
        }
        
        public initView(): void {
			if (!this._allTuJianGodTemps || this._allTuJianGodTemps.length == 0){
				let alldata:TuJianGodTemp[] = TujianModel.getInstance().getTuJianGodTArr();
				//过滤下
				this._allTuJianGodTemps = alldata.filter((vo)=>{
					return vo.starLv == vo.godTemp.star[0] || vo.starLv == vo.godTemp.star[1] || vo.starLv == 5 || vo.starLv == 6;
				});
			}
            this.list_race.selectedIndex = 0;
        }

        /** 种族选择 */
		private onSelect(index: number): void {
			if(index == -1) return;
			let arrGodTemp:TuJianGodTemp[] = []
			arrGodTemp = this._allTuJianGodTemps.filter((vo)=>{
				return index == 0 || vo.godTemp.race_type == index;
			});
		
			this.list_tujian.array = arrGodTemp;
			this.lbType.text = LanMgr.GOD_RACE_NAME[index];
		}

        //打开详细界面
		private onMouse(event: Laya.Event, index: number) {
			if (event.type == Laya.Event.CLICK){
				dispatchEvt(new TujianEvent(TujianEvent.SHOW_XIANGXI_PANEL), [index,this.list_tujian.array]);
			}
		}
    }
}