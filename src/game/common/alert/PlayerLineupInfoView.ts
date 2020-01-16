/**
* name 
*/
module common {
	export class PlayerLineupInfoView extends ui.component.PlayerLinuepInfoUI {

		constructor() {
			super();
			this.isModelClose = true;
		}

		createChildren(): void {
			super.createChildren();
			this.btnLinueUp.on(Laya.Event.CLICK, this, this.onLinueUp);
			this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
		}
		popup(): void {
			// popup前设置高度
			let data: IPlayerLinuepInfo = this.dataSource;
			let isShowBtn = data.type == LinuepType.arena;
			this.btnChallenge.visible = this.btnLinueUp.visible = isShowBtn;
			this.btnChallenge.x = 376;
			this.btnChallenge.label = "挑战";

			if (isShowBtn) {
				let data: game.ArenaInfoVo = this.dataSource;
				this.btnLinueUp.visible = data.rank < data.myRank;
				this.btnChallenge.x = this.btnLinueUp.visible ? 376 : 275;
				this.btnChallenge.label = this.btnLinueUp.visible ? "挑战" : "扫荡";
			}
			this.height = this.img_bg.height = isShowBtn ? 730 : 660;
			super.popup();
			this.initView();
		}

		protected initView(): void {
			this.btnClose.on(Laya.Event.CLICK, this, this.close);
			let data: IPlayerLinuepInfo = this.dataSource;
			this.lab_title.text = data.type == LinuepType.arena ? "挑 战" : "阵 容";
			this.lbName.text = data.name;
			this.lbGuild.text = data.guildName ? `公会：${data.guildName}` : "暂无公会";
			this.headBox.dataSource = new UserHeadVo(data.head, data.level, data.headFrame);
			this.lineupUI.dataSource = { lineupGods: data.getLineupGods(), shenqiAry: data.getShenqiAry(), showShenli: true, force: data.force, userLevel: data.level, title: "" };
		}

		/**打开布阵界面 */
		private onLinueUp(): void {
			dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
		}

		/**挑战玩家 */
		private onChallenge(): void {
			let data = this.dataSource;
			if (data instanceof game.ArenaInfoVo) {
				if (!data.canChallenge) {
					if (data.isMySelf()) showToast(LanMgr.getLan('', 10208));
					else showToast(LanMgr.getLan('', 10209));
					return;
				}

				if (data.rank >= data.myRank) {
					//扫荡
					dispatchEvt(new game.ArenaEvent(game.ArenaEvent.ARENA_BATTEL_SWEEP), this.dataSource);
				} else {
					dispatchEvt(new game.ArenaEvent(game.ArenaEvent.ARENA_BATTEL_START), this.dataSource);
				}
			}
		}

		public onClosed(): void {
			super.onClosed();
			this.btnClose.off(Laya.Event.CLICK, this, this.close);
			this.lineupUI.dataSource = null;
		}
	}

	/** 玩家阵容信息数据 */
	export interface IPlayerLinuepInfo {
		type?: number;
		title?: string;
		name: string;
		guildName: string;
		svrName?: string;
		force: number;
		sex: number;
		head: number
		headFrame: number
		level: number;
		getLineupGods(): GodItemVo[];
		getShenqiAry(): number[];

		playerId ?: string;
		showGodId ?: number;
		showSkinId ?:number;
		rank ?: number;
	}

	/** 阵容界面类型 */
	export enum LinuepType {
		glory = 1,		// 荣耀之战
		arena = 2,		// 竞技场
	}
}