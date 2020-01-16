/**
* name 
*/
module game {
	import Event = Laya.Event;
	export class ActivityBtnIR extends ui.hud.render.ActivityBtnIRUI {
		private _img_time: Laya.Image;
		private _lab_time: Laya.Label;
		constructor(vo: ActivityBtnVo) {
			super();
			this.dataSource = vo;
			tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_ONLINEREWARD, this.updateState, this);
			this.name = vo.sysOpenId + ``;
			this.on(Event.CLICK, this, () => {
                    HudModel.ActivityBtnEvent(vo.sysOpenId);
                })
		}

		set dataSource(v) {
			this._dataSource = v;
			if (v) this.init();
		}

		get dataSource(): ActivityBtnVo {
			return this._dataSource;
		}

		private updateState() {
			if (this.dataSource && this.dataSource.sysOpenId == iface.tb_prop.sysOpenTypeKey.onlineAward) {
				this.loopOnline();
			}
		}

		private init(): void {
			let vo = this.dataSource;
			let sysId = vo.sysOpenId;
			this.redPoint.setRedPointName(vo.redpointName);
			this.btn.skin = SkinUtil.getTabBtnSkin(vo.tabHud.icon);
			HudModel.getInstance().isPlayEffect(sysId) ? this.ani.play() : this.ani.destroy();

			if (sysId == iface.tb_prop.sysOpenTypeKey.onlineAward) {
				if (!this._img_time) {
					this._img_time = new Laya.Image("comp/bg/pic_shenlizhi.png");
					this._img_time.x = -3;
					this._img_time.y = 94;
					this._img_time.width = 100;
					this._img_time.height = 25;
					this.btn.addChild(this._img_time);
				}
				if (!this._lab_time) {
					this._lab_time = new Laya.Label();
					this._lab_time.color = "#fff0a0";
					this._lab_time.fontSize = 19;
					this._lab_time.stroke = 2;
					this._lab_time.strokeColor = "#000000";
					this._lab_time.anchorX = 0.5;
					this._lab_time.x = 47;
					this._lab_time.y = 98;
					this.btn.addChild(this._lab_time);
				}
				this.loopOnline();
			} else {
				if (this._img_time) {
					this._img_time.removeSelf();
					this._img_time = null;
				}
				if (this._lab_time) {
					this._lab_time.removeSelf();
					this._lab_time = null;
				}
			}
		}

		public loopOnline() {
			if (this._lab_time) {
				let vo = OnlineModel.getInstance().lastItemState();
				if (vo == null || !vo.istime) {
					//不需要计时器
					this.clearloop(vo);
					return;
				} else {
					this.timerLoop(1000, this, this.onLoop, [vo]);
				}
				this.onLoop(vo);
			} else {
				this.clearTimer(this, this.onLoop);
			}
		}

		private onLoop(vo: { istime, vo }) {
			if (vo.vo.canReceive()) {
				this.clearloop(vo);
			} else {
				if (this._lab_time) {
					this._lab_time.text = vo.vo.onTime();
				} else {
					this.clearloop(vo);
				}
			}
		}

		private clearloop(vo: { istime, vo }) {
			if (this._lab_time) {
				this._lab_time.text = (vo == null || vo.vo.isReceive()) ? "已领取" : "领取";
			}
			this.clearTimer(this, this.onLoop);
		}

		//活动按钮移除
		public removeBtn():void{
			this.removeSelf();
			this.redPoint.removeSelf();
		}

	}

	export class ActivityBtnVo {
		/**系统开启Id */
		sysOpenId: number;
		/**hud表 */
		tabHud: tb.TB_hud;
		/**红点名称 */
		redpointName: string;
		/**是否开启 */
		private _isOpen: boolean;
		constructor(tb:tb.TB_hud) {
			this.sysOpenId = tb.system_id;
			this.tabHud = tb;
			this.redpointName = `sys${this.sysOpenId}_group`;
			if (this.sysOpenId == 393){
				this.redpointName = "timeActivity" + TimelimitModel.ACTIVITY_JIJIN_ID;
			}
		}

		/**在活动时间? */
		isOnActivityTime(): boolean {
			// return HudModel.IsOnActivatyTime(this.sysOpenId) && this.sysOpenId != iface.tb_prop.sysOpenTypeKey.firstCharge;//忽略首充按钮
			return HudModel.IsOnActivatyTime(this.sysOpenId);
		}

		/**更新下是否开启，是否有变化 */
		isHaveChange(): boolean {
			let isOpen = this.isOnActivityTime();
			if (this._isOpen != isOpen) {
				this._isOpen = isOpen;
				return true;
			}
			return false;
		}
	}
}