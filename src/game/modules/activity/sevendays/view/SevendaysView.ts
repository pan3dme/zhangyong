/**
* name 
*/
module game {
	export class SevendaysView extends ui.activity.sevendays.sevendaysUI {
		private _curData: Array<Array<tb.TB_activity_sevendays>>;
		private _boxItems: Array<game.TaskBaoxiangIR>;
		public selectTodayNum: number = 0;
		public selectDaysNum: number = 0;
		constructor() {
			super();
			
			this.list_today.selectHandler = new Handler(this, this.onListTodaysSelect);
			this.list_today.renderHandler = new Handler(this, this.onListTodaysRender);
			this.list_days.selectHandler = new Handler(this, this.onListDaysSelect);
			this.list_days.renderHandler = new Handler(this, this.onListDaysRender);
			this.btn_sevenDay.on(Laya.Event.CLICK, this, this.onClick);
			
			this.isModelClose = true;

			this.bgPanel.dataSource = { uiName: UIConst.SevendaysView, closeOnSide: this.isModelClose, closeOnButton:true };
			this.bgPanel.addChildAt(this.img_bg, 3);
		}

		public popup(): void {
			super.popup();
			let model = SevendaysModel.getInstance();
			let arrDays;
			this.list_days.selectedIndex = -1;
			let openid:number = tb.TB_sevendays_times.getActivityOpenId();
			if (openid == 2){
				arrDays = JSON.parse(JSON.stringify(model.arr2Days));
				this.btn_sevenDay.skin = "huodong/qingdian714/14tian.png";
				this.img_ani.skin = "huodong/qingdian714/14tian.png";
			}else{
				arrDays = JSON.parse(JSON.stringify(model.arrDays));
				this.btn_sevenDay.skin = "huodong/qingdian714/haidisi.png";
				this.img_ani.skin = "huodong/qingdian714/haidisi.png";
			}
			
			this.btn_sevenDay.dataSource = arrDays.pop();
			this.list_days.dataSource = arrDays;

			this.playEff();

			Laya.timer.loop(3500,this,this.playEff);

			this.init();
		}

		private playEff(){
			this.ani1.play(0,false);
			this.startAnim();
		}

		private init() {
			this._curOpenId = tb.TB_sevendays_times.getActivityOpenId();
			this.img_title.skin = this._curOpenId == 1?"huodong/qingdian714/qirikuanghuan.png":"huodong/qingdian714/banyueqingdian.png";
			let crt = Math.floor((App.serverTime - App.hero.getCreateDayTiem()) / TimeConst.ONE_DAY_MILSEC) + 1;
			let idx = tb.TB_sevendays_times.getIdx(crt);
			this.selectDaysNum = idx != -1 ? idx : 0;

			if (this.selectDaysNum != 6) this.list_days.selectedIndex = this.selectDaysNum;
			this.initView(this.selectDaysNum);
			this.refreshProgressBar();
			this.list_days.refresh();
		}

		private _curOpenId: number;
		public initView(day: number): void {
			let model = SevendaysModel.getInstance();
			this.list_today.dataSource = model.getArrProJect(day);
			this.lab_finish.text = model.getFinishTaskNum() + "个";
			// this.lab_endTime.text = model.getRemainingTime();
			this.dataSource = model.arrSevendaysTb[day];
			model.UpdateSevendayByday(day, this.selectTodayNum);
			this.list_item.dataSource = this.dataSource[this.selectTodayNum];
			this.onListTodaysSelect(this.selectTodayNum);
			Laya.timer.clear(this, this.setEndTime);
			Laya.timer.loop(1000, this, this.setEndTime);
		}

		setEndTime(): void {
			let model = SevendaysModel.getInstance();
			this.lab_endTime.text = LanMgr.getLan("",12172,model.getRemainingTime());
			let openid = tb.TB_sevendays_times.getActivityOpenId();
			if (this._curOpenId != openid) {
				//跨天了或者结束了
				if (openid != -1) {
					model.initArr();
					this.init();
					this.initExtList();
				}
				dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT));
			}
		}

		createChildren(): void {
			super.createChildren();
			this.initExtList();
		}

		private initExtList() {
			if (!this._boxItems) {
				this._boxItems = [];
			}
			let boxAry = SevendaysModel.getInstance().getSevendaysExtList();
			let len = boxAry.length;
			for (let i = 0; i < len; i++) {
				if (this._boxItems[i]) {
					this._boxItems[i].dataSource = boxAry[i];
				} else {
					let box = new game.TaskBaoxiangIR();
					box.dataSource = boxAry[i];
					box.x = (565 / len) * (i + 1) - 40;
					box.y -= 30;
					box.scale(0.8,0.8);
					this.boxLiveness.addChild(box);
					this._boxItems.push(box);
				}
			}
		}
		private startAnim():void {
            for (let box of this._boxItems) {
                box.startAni();
            }
        }

		refreshProgressBar(): void {
			let model = SevendaysModel.getInstance();
			let arr = model.getSevendaysExtList()[model.getSevendaysExtList().length - 1];
			this.progressBar.value = model.getFinishTaskNum() / arr.tbReward.need_num;
		}

		/** 刷新活跃度数据 */
		refreshLiveness(): void {
			for (let box of this._boxItems) {
				box.refreshView();
			}
			this.refreshProgressBar();
		}

		private onClick(): void {
			if (this.selectDaysNum == 6) return;
			this.list_days.cells[this.selectDaysNum].btn_tab.selected = false;
			// this.btn_sevenDay.selected = false;
			this.list_days.selection = null;
			this.selectDaysNum = 6;
			this.initView(6);
		}

		private onListDaysSelect(index: number) {
			if (index == -1) return;
			this.selectDaysNum = index;
			this.initView(this.selectDaysNum);
		}

		private onListDaysRender(cell: tabIR, $index: number) {
			// this.btn_sevenDay.selected = this.selectDaysNum != 6;
			cell.btn_tab.selected = $index != this.selectDaysNum;
		}

		private onListTodaysSelect(index: number) {
			if (index == -1) return;
			this.selectTodayNum = index;
			this.list_item.dataSource = this.dataSource[this.selectTodayNum];
			if (index == 3) {
				let cell: common.TabIR1 = <common.TabIR1>this.list_today.getCell(index);
				cell.refreshData(this.list_today.array[index]);
				RedPointManager.removeRule(cell.redpoint.redpointName);
				cell.redpoint.visible = false;
				cell.redpoint.onDispose();
			}
		}

		private onListTodaysRender($cell: common.TabIR1, $index: number) {
			$cell.btn_tab.selected = $index == this.selectTodayNum;
		}

		public onClosed(): void {
			super.onClosed()
			Laya.timer.clearAll(this);
			this.ani1.stop();
		}
	}
}