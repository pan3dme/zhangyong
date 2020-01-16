/**
* name 
*/
module game {
	export class TujianView extends ui.tujian.TujianViewUI {
		private _allTuJianGodTemps:TuJianGodTemp[];
		constructor() {
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose=true;
			this.bgPanel.dataSource = {uiName:UIConst.TujianView,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12117)};
			this.tab.selectHandler = new Handler(this,this.onTab);
			this.tab.selectedIndex = -1;
			this.list_tujian.mouseHandler = new Handler(this, this.onMouse);
			this.list_race.selectHandler = new Handler(this, this.onSelect);
			this.list_race.array = [0,1,2,3,4,5];
			this.list_race.selectedIndex = -1;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		public close(type?: string, showEffect?: boolean, sound = true): void{
			super.close();
			this.tab.selectedIndex = -1;
			this.list_tujian.array = null;
			this.list_race.selectedIndex = -1;
			this.tuijianView.onExit();
			this.ui_tujian.onExit();
			this._allTuJianGodTemps = null;
		}

		public onClosed(type?: string): void {
			super.onClosed();
		}

		private initView(): void {
			if (!this._allTuJianGodTemps || this._allTuJianGodTemps.length == 0){
				let alldata:TuJianGodTemp[] = TujianModel.getInstance().getTuJianGodTArr();
				//过滤下
				this._allTuJianGodTemps = alldata.filter((vo)=>{
					return vo.starLv == vo.godTemp.star[0] || vo.starLv == vo.godTemp.star[1] || vo.starLv == 5 || vo.starLv == 6;
				});

			}
			this.tab.selectedIndex = 0;
		}

		private onTab(index: number):void{
			if(index == -1) return;
			this.viewstack.selectedIndex = index;
			if(index == 0) {
				this.tuijianView.onExit();	
				this.ui_tujian.onExit();
				this.list_race.selectedIndex = this.list_race.selectedIndex == -1 ? 0 : this.list_race.selectedIndex;
			} else if(index == 1) {
				this.ui_tujian.onExit();
				this.tuijianView.onShow();
			} else if(index == 2){
				this.tuijianView.onExit();			
				FateModel.getInstance().initFateList();
				this.ui_tujian.onShow();
			} 
			this.imgBg.visible = index != 0;			
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