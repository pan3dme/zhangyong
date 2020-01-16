/**
* name 
*/
module game {
	export class YuekaView extends ui.activity.huodong.welfare.tab.YuekaUI {

		private _initCard1Y : number;
		private _initCard2Y : number;
		constructor() {
			super();
			this.initView();
			this.btn_getyueka.on(Laya.Event.CLICK, this, this.lingqu, [1]);
			this.btn_zhongsheng.on(Laya.Event.CLICK, this, this.lingqu, [2]);
			this._initCard1Y = this.box_card1.y;
			this._initCard2Y = this.box_card2.y;
		}

		public onAdd() {
			if(this._cells){
				Laya.timer.callLater(this, () => {
                    UIUtil.playListEff(this._cells);
                });
			}
		}

		public onExit() {
			this.close();
			this.box_card1.y = this._initCard1Y;
			this.box_card2.y = this._initCard2Y;
			UIUtil.clearListEff(this._cells);
		}


		private _cells = null;
		public initView(): void {
			this._cells = [this.box_card1,this.box_card2];
			tl3d.ModuleEventManager.addEvent(TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.initView, this);

			//月卡
			let buyYK: boolean = App.hero.welfare.monthCardEndTime > App.getServerTime();
			let ykTemp: tb.TB_month_card = tb.TB_month_card.getTbMonthCardById(1);
			this.btn_getyueka.skin = "comp/button/button.png";
			this.btn_getyueka.labelStrokeColor = "#ca7005";
			if (buyYK) {
				//购买
				let endtime = parseInt(App.hero.welfare.monthCardEndTime);
				let dayBetween = (endtime - App.getServerTime()) / 86400;
				this.lab_time.text = LanMgr.getLan("剩余{0}天", -1, String(Math.ceil(dayBetween)));

				if (App.hero.welfare.monthCardAward != 1) {
					//可领取
					this.btn_getyueka.label = "领取";
					this.btn_getyueka.gray = false;
					this.btn_getyueka.skin = "comp/button/btn_qianwang.png";
					this.btn_getyueka.labelStrokeColor = "#538901";
					// this.btn_getyueka.visible = true;
					this.img_yk_receive.visible = false;
				} else {
					//领取完了

					this.btn_getyueka.label = "已领取";
					this.btn_getyueka.gray = true;
					this.btn_getyueka.skin = "comp/button/btn_qianwang.png";
					this.btn_getyueka.labelStrokeColor = "#538901";
					// this.btn_getyueka.visible = false;
					this.img_yk_receive.visible = false;
				}
			} else {
				//未购买
				this.btn_getyueka.gray = false;
				this.lab_time.text = "";
				this.btn_getyueka.label = "￥" + ykTemp.recharge_count;
				// this.btn_getyueka.visible = true;
				this.img_yk_receive.visible = false;
				// this.btn_getyueka.skin = "comp/button/button.png";
				// this.btn_getyueka.labelStrokeColor = "#ca7005";
			}
			let itemarr: ItemVo[] = ary2prop(ykTemp.item_gift);
			this.list_yueka.dataSource = itemarr.map(vo => {
				return { item: vo, show: buyYK };
			});

			//终身卡
			let buyZSK: boolean = App.hero.welfare.lifelongCard == 1;
			let zskTemp: tb.TB_month_card = tb.TB_month_card.getTbMonthCardById(2);
			this.btn_zhongsheng.skin = "comp/button/button.png";
			this.btn_zhongsheng.labelStrokeColor = "#ca7005";
			if (buyZSK) {
				//购买
				if (App.hero.welfare.lifelongCardAward != 1) {
					//可领取
					this.btn_zhongsheng.label = "领取";
					this.btn_zhongsheng.gray = false;
					this.btn_zhongsheng.skin = "comp/button/btn_qianwang.png";
					this.btn_zhongsheng.labelStrokeColor = "#538901";
					// this.btn_zhongsheng.visible = true;
					this.img_zs_receive.visible = false;
				} else {
					//领取完了
					// this.btn_zhongsheng.visible = false;
					this.img_zs_receive.visible = false;
					this.btn_zhongsheng.label = "已领取";
					this.btn_zhongsheng.gray = true;
					this.btn_zhongsheng.skin = "comp/button/btn_qianwang.png";
					this.btn_zhongsheng.labelStrokeColor = "#538901";
				}
			} else {
				//未购买
				this.btn_zhongsheng.gray = false;
				this.btn_zhongsheng.label = "￥" + zskTemp.recharge_count;
				// this.btn_zhongsheng.visible = true;
				this.img_zs_receive.visible = false;
				// this.btn_zhongsheng.skin = "comp/button/button.png";
				// this.btn_zhongsheng.labelStrokeColor = "#ca7005";
			}
			itemarr = ary2prop(zskTemp.item_gift);
			this.list_zhonghsenka.dataSource = itemarr.map(vo => {
				return { item: vo, show: buyZSK };
			});

			this.yuekaRP.onDispose();
			this.yuekaRP.setRedPointName(`month_reward`);
			this.lifeRP.onDispose();
			this.lifeRP.setRedPointName(`life_reward`);
		}

		/**
		 * 点击领取
		 * @param num 
		 */
		private lingqu(num: number) {
			if (num == 1) {
				//月卡
				if (App.hero.welfare.monthCardEndTime > App.getServerTime()) {
					//购买了
					if (App.hero.welfare.monthCardAward != 1) {
						PLC.request(Protocol.game_welfare_getMonthCardAward, null, ($data: any, msg: any) => {
							if ($data)
								UIUtil.showRewardView($data.commonData);
							this.initView();
						});
					} else {
						showToast(LanMgr.getLan('', 10219));
					}
				} else {
					//未购买
					let Temp: tb.TB_month_card = tb.TB_month_card.getTbMonthCardById(1);
					this.jump(Temp.recharge_id);
				}

			} else {
				//终身卡
				if (App.hero.welfare.lifelongCard == 1) {
					//购买了
					if (App.hero.welfare.lifelongCardAward != 1) {
						PLC.request(Protocol.game_welfare_getLifelongCardAward, null, ($data: any, msg: any) => {
							if ($data)
								UIUtil.showRewardView($data.commonData);
							this.initView();
						});
					} else {
						showToast(LanMgr.getLan('', 10219));
					}
				} else {
					//未购买
					let Temp: tb.TB_month_card = tb.TB_month_card.getTbMonthCardById(2);
					this.jump(Temp.recharge_id);
				}
			}
		}

		/**跳转到充值界面 */
		private jump(id: number): void {
			let pid = Number(window.platform.pid);
			if (ChongzhiModel.isRealPay(pid)) {
				let item = tb.TB_recharge.get_TB_rechargeById(id);
				ChongzhiModel.pay(item);
			} else {
				this.test(id);//模拟充值
			}
		}

        /**
		 * 测试购买
		 * @param id 
		 */
		private test(id: number) {
			UIUtil.payDebug(id,null,()=>{
                this.initView();
            });
		}

	}
}