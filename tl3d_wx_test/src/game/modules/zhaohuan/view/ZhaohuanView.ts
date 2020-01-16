/**
* name 
*/
module game {

	export enum ZHAOHUAN {
		GENERAL,
		FRIENDSHIP,
		DIAMOND,
		LEGEND
	}
	export class ZhaohuanView extends ui.zhaohuan.ZhaohuanUI {
		_ui: UIMgr = UIMgr.getInstance();
		constructor() {
			super();
			this.group = UIConst.hud_group;
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SUMMON,0);
		}

		public onClosed():void{
			super.onClosed();
			ZhaohuanModel.getInstance().curObj.type = -1;
			UIMgr.hideUIByName(UIConst.SysTopView);
			Laya.timer.clearAll(this);
		}

		private listdata = [
			{ type: ZHAOHUAN.GENERAL },
			{ type: ZHAOHUAN.FRIENDSHIP },
			{ type: ZHAOHUAN.DIAMOND },
			{ type: ZHAOHUAN.LEGEND }
		];
		public show() {
			super.show(false, false);
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onShuoming.bind(this)},
				];
			let resAry = [iface.tb_prop.resTypeKey.diamond];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onFanHui.bind(this)});
			this.img_tips.visible = false;
			this.list_zhaohuan.dataSource = this.listdata;
			this.addTick();
			UIUtil.listTween(this.list_zhaohuan);
		}

		private addTick() {
			let propFreeNum: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum);
			let diamondFreeNum: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum);
			let nofreeflag: boolean = propFreeNum != 0 || diamondFreeNum != 0;
			if (nofreeflag) {
				Laya.timer.loop(1000, this, this.onTick);
				this.onTick();
			} else {
				Laya.timer.clear(this, this.onTick);
				this.onTick();
			}
		}

		private onTick() {
			let str = '';
			let date = new Date(App.serverTime);
			date.setHours(0, 0, 0, 0);
			let time = (date.getTime() + TimeConst.ONE_DAY_MILSEC) / 1000;//秒
			let propFreeNum: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum);
			str = propFreeNum != 0 ? GameUtil.toCountdown((time - App.getServerTime()), "hh:mm:ss") + LanMgr.getLan("",12105) : '';
			let item0 = this.list_zhaohuan.getCell(0) as ZhaohuanIR;
			item0.setTime(str);
			let diamondFreeNum: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum);
			str = diamondFreeNum != 0 ? GameUtil.toCountdown((time - App.getServerTime()), "hh:mm:ss") + LanMgr.getLan("",12105) : '';
			let item2 = this.list_zhaohuan.getCell(2) as ZhaohuanIR;
			item2.setTime(str);

			//同步计时器状态
			let nofreeflag: boolean = propFreeNum != 0 || diamondFreeNum != 0;
			if (!nofreeflag) {
				Laya.timer.clear(this, this.onTick);
			}
		}

		public refreshList() {
			this.list_zhaohuan.refresh();
			this.addTick();
		}

		private onFanHui(): void {
			dispatchEvt(new HudEvent(HudEvent.RETURN_LASTVIEW,UIConst.Main3DView));
		}
		private onShuoming(e): void {
			if(!this.img_tips.skin){
				this.img_tips.skin="zhaohuan/summonTips.png";
			}
			this.img_tips.visible = !this.img_tips.visible;
		}
	}
}