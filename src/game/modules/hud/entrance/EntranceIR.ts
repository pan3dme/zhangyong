

module game {

    export class EntranceIR extends ui.hud.entrance.EntranceListIRUI {
		constructor() {
			super();
            
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():tb.TB_function {
			return this._dataSource;
		}

		private refreshView() {
            let data : tb.TB_function = this._dataSource;
			if (data) {
                this.icon.skin = "shenjie/" + data.icon+".png";
				this.redpoint.setRedPointName(tb.TB_function.FUNCTION_REDPOINT[data.ID]);
                this.on(Laya.Event.CLICK, this, this.onClick);

				let tbData = tb.TB_sys_open.get_TB_sys_openById(data.system_id);
				this.icon.gray = tbData && !App.IsSysOpen(data.system_id);
				this.box_condition.visible = this.icon.gray;
				if (this.box_condition.visible){
					this.lab_condition.text = LanMgr.getLan(tbData.prompt, -1);
				}
			}else{
                this.icon.skin = "";
				this.redpoint.setRedPointName("");
                this.off(Laya.Event.CLICK, this, this.onClick);
				Laya.Tween.clearTween(this)
            }
		}

        /**判断是否开启 */
		private isBtnOpen(fundId: number, isTip:boolean = false): boolean {
			let tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
			if (tbData && !App.IsSysOpen(fundId)) {
				if (isTip)showToast(tbData.prompt);
				return true
			}
			return false;
		}

        private onClick():void {
            let data : tb.TB_function = this._dataSource;
        
			if (data.system_id == ModuleConst.DIXIACHENG) return;//地下城目前没用，点击没反应
			if (this.isBtnOpen(data.system_id, true)) return;

			switch (data.system_id) {
				case ModuleConst.SUMMON:
					dispatchEvt(new SummonEvent(SummonEvent.SHOW_ZHAOHUAN_PANEL));
					break;
				case ModuleConst.GONGHUI:
					dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));
					break;
				case ModuleConst.SHILIANTA:
					dispatchEvt(new TowerEvent(TowerEvent.SHOW_SHILIANTA_PANEL));
					break;
				case ModuleConst.TUJIAN:
					dispatchEvt(new TujianEvent(TujianEvent.SHOW_TUJIAN_PANEL));
					break;
				case ModuleConst.JINGJI:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.JINGJI]);
					break;
				case ModuleConst.MATCH_FIGHT:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.MATCH_FIGHT]);
					break;
				// case ModuleConst.DIXIACHENG:
				// 	dispatchEvent(new moduledixiacheng.DixiachengEvent(moduledixiacheng.DixiachengEvent.SHOW_DIXIACHENG_PANEL));
				// 	break;
				case ModuleConst.DAILY_COPY:
					dispatchEvt(new DailyEvent(DailyEvent.SHOW_DAILY_COPY_VIEW));
					break;
				case ModuleConst.WORLD_BOSS:
					dispatchEvt(new BossEvent(BossEvent.SHOW_BOSS_VIEW));
					break;
				case ModuleConst.EXPEDITION:
					dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_MAIN_VIEW));
					break;
				case ModuleConst.Island:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.Island]);
					break;
				case ModuleConst.QIRIKH:
					dispatchEvt(new SevendaysEvent(SevendaysEvent.SHOW_SEVENDAYS_PANEL));
					break;
				case ModuleConst.SHENMEN:
					dispatchEvt(new GodDoorEvent(GodDoorEvent.OPEN_SHEN_MEN_VIEW));
					break;
				case ModuleConst.SHOP:
					dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.shangcheng);
					break;
				case ModuleConst.CARAVAN_ESCORT:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.CARAVAN_ESCORT]);
					break;
				case ModuleConst.FOG_FOREST:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.FOG_FOREST]);
					break;
				case ModuleConst.GOD_DOMAIN:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GOD_DOMAIN]);
                    break;
				case ModuleConst.GLORY_FIGHT:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.GLORY_FIGHT]);
                    break;
				case ModuleConst.TEAM_COPY:
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.TEAM_COPY]);
                    break;
			}

			// UIMgr.hideUIByName(UIConst.EntranceList);
        }
        
	}
}