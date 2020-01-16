/**
* name 
*/
module game {
	export class ChongzhiView extends ui.activity.chongzhi.ChongzhiUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.btn_tequan.on(Laya.Event.CLICK, this, this.onTequan);
			this.btn_chongzhi.on(Laya.Event.CLICK, this, this.onChongzhi);
			
			this.list_item.selectHandler = new Handler(this, this.onSelect);
			this.list_item.mouseHandler = new Handler(this, this.onMouse);
			this.bgPanel.box_Content.addChild(this.img_bg);
		}

		public popup() {
			super.popup();
			this.refreshData();
			this.dataSource ? this.onTequan() : this.onChongzhi();
			this.bgPanel.dataSource = { uiName: UIConst.ChongzhiView, closeOnSide: false, closeOnButton: false, title: "充 值" };
			this.btnClose.on(Laya.Event.CLICK, this, this.onCLickClose);
		}

		/**
		 * 刷新充值界面数据
		 */
		public refreshData() {
			this.exp();
			let rechargetab: tb.TB_recharge;
			let itemarry: Array<tb.TB_recharge> = new Array<tb.TB_recharge>();
			// let flag: boolean = false;
			// if(App.hero.welfare.lifelongCard == 1)
			// 	flag = true;
			for (let i = 1; i < 10; i++) {
				// if (i == 1 && App.hero.welfare.monthCardEndTime >= App.getServerTime()){
				// 	//已购买月卡就不显示
				// 	continue;
				// }
				// if (App.hero.welfare.lifelongCard == 1 && i == 2) { //已购买过终身卡 不再显示终身卡选项
				// 	// if(i == 2)
				// 	continue;
				// }
				// 隐藏月卡和终身卡选项
				if(i == 1 || i == 2){
					continue;
				}
				rechargetab = tb.TB_recharge.get_TB_rechargeById(i);
				itemarry.push(rechargetab);
			}
			itemarry.sort(
				function (a: tb.TB_recharge, b: tb.TB_recharge): number {
					return a.rank - b.rank;
				}
			);
			this.list_item.dataSource = itemarry;
			this.list_item.selectedIndex = -1;
			this.lbl_vip.text = App.hero.vip.toString();
		}

		/**
		 * 计算并显示经验值
		 */
		private exp() {
			let maxVip = App.getMaxVipLv();
			let nextVip: tb.TB_vip = App.hero.vip == maxVip ? tb.TB_vip.get_TB_vipById(maxVip) : tb.TB_vip.get_TB_vipById(App.hero.vip + 1);
			let vipScore: number = App.hero.vipScore;
			let expvalue: number = 1;
			let expstr: string;
			if (nextVip) {
				expvalue = vipScore / (nextVip.recharge * 10);
			}
			this.probar_exp.value = expvalue;
			this.explabui.text = vipScore + "/" + nextVip.recharge * 10;
			this.box_nextlv.visible = App.hero.vip == 15 ? false : true;
			this.lab_more.text = Snums(Math.floor(nextVip.recharge*10 - vipScore));
			this.lab_nextlv.text = "VIP" + (App.hero.vip + 1);
		}

		/**
		 * 点击购买项
		 * @param index 
		 */
		private onSelect(index: number) {
			if (index == -1) return;
			let item = this.list_item.dataSource[index];
			let pid = Number(window.platform.pid);
			if(ChongzhiModel.isRealPay(pid)) {
				ChongzhiModel.pay(item);
			}else{
				this.test(item);//模拟充值
			}
			//需要重置为-1 ，否则无法下次点击
			this.list_item.selectedIndex = -1;
		}

		/**
		 * 按钮点击效果
		 * @param e 
		 * @param index 
		 */
		private onMouse(e: Laya.Event, index: number) {
			switch (e.type) {
				case Laya.Event.MOUSE_DOWN:
					AudioMgr.playSound();
					e.target.scaleX = 0.9;
					e.target.scaleY = 0.9;
					break;
				case Laya.Event.MOUSE_OUT:
				case Laya.Event.MOUSE_UP:
					e.target.scaleX = 1;
					e.target.scaleY = 1;
					break;
			}
		}

		/**
		 * 测试购买
		 * @param id 
		 */
		private test(item: tb.TB_recharge) {
			UIUtil.payDebug(item.ID,null,()=>{
				let $evt = new HuodongEvent(HuodongEvent.REFRESH_YUEKA_PANEL);
				dispatchEvt($evt);
				this.refreshData();
				this.list_item.selectedIndex = -1;
			});
		}

		/**
		 * 查看特权界面
		 */
		private onTequan() {
			let viptab: tb.TB_vip
			if (App.hero.vip > 0) {
				viptab = tb.TB_vip.get_TB_vipById(App.hero.vip);
			}
			else
				viptab = tb.TB_vip.get_TB_vipById(1);
			this.list_item.visible = false;
			this.box_cz.visible = false;
			this.btn_chongzhi.visible = true;
			this.btn_tequan.visible = false;
			this.view_tequan.visible = true;
			this.view_tequan.dataSource = viptab;
		}

		private onCLickClose():void{
			UIMgr.hideUIByName(UIConst.ChongzhiView);
		}

		/**
		 * 点击前往充值
		 */
		private onChongzhi() {
			this.list_item.visible = true;
			this.box_cz.visible = true;
			this.btn_chongzhi.visible = false;
			this.btn_tequan.visible = true;
			this.view_tequan.visible = false;
			this.view_tequan.dataSource = null;
		}

		public close() {
			super.close();
			this.btnClose.off(Laya.Event.CLICK, this, this.onCLickClose);
			this.bgPanel.dataSource = null;
			this.list_item.dataSource = null;
			this.view_tequan.dataSource = null;
		}
	}
}