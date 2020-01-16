/**
* name 
*/
module common {
	export class SkillTip extends ui.component.SkillTipUI {
		private _Objectpos: Laya.Point = new Laya.Point();
		constructor() {
			super();
			this.mouseEnabled = false;
			this.mouseThrough = true;
			this.lab_miaoshusize.mouseEnabled = false;
			this.list_miaoshu.renderHandler = new Handler(this, this.onRenderMiaoshu);
		}


		/**坐标初始化 */
		public initPosition(): void {
			this.img_bg.height = 146;
			this.list_miaoshu.height = 24;
			this.img_bg.x = this._Objectpos.x - this.img_bg.width / 2;
			this.img_bg.y = this._Objectpos.y - this.img_bg.height;
		}

		/**坐标适配 */
		private setPosition(): void {
			let value = 10;
			if (this.img_bg.x + this.img_bg.width > Laya.stage.width) {
				let pos_x = this.img_bg.x + this.img_bg.width - Laya.stage.width;
				this.img_bg.x -= (pos_x + value);
			} else if (this.img_bg.y + this.img_bg.height > Laya.stage.height) {
				let pos_y = this.img_bg.y + this.img_bg.height - Laya.stage.height;
				this.img_bg.y -= (pos_y + value);
			} else if (this.img_bg.x < 0) {
				this.img_bg.x = value;
			} else if (this.img_bg.y < 0) {
				this.img_bg.y = value;
			}
		}


		/**
		 * 渲染等级技能描述
		 * @param cell 
		 * @param index 
		 */
		private onRenderMiaoshu(cell: Laya.Box, index: number): void {
			if (index > this.list_miaoshu.dataSource.length) return;
			let $data: tb.TB_skill = this.list_miaoshu.dataSource[index] as tb.TB_skill;

			if (!$data) return;

			let dianliang: Laya.Image = cell.getChildByName("img_dianliang") as Laya.Image;
			dianliang.visible = false;

			if ($data.level && $data.level <= this._dataSource.level) dianliang.visible = true;

			let miaoshu: Laya.Label = cell.getChildByName("lab_miaoshu") as Laya.Label;
			miaoshu.text = LanMgr.getLan("{0}级：{1}", -1, $data.level, $data.info);
		}

		public timerOnce(): void {
			Laya.timer.once(1900, this, this.Tweento);
		}

		public Tweento(): void {
			Laya.Tween.to(this, { alpha: 0 }, 200, null, new Handler(this, () => {
				UIMgr.hideUIByName(UIConst.SkillTip);
			}))
		}

		public onOpened(): void {
			super.onOpened();
			let data: listData = this.dataSource[0];
			this._Objectpos.x = this.dataSource[1];
			this._Objectpos.y = this.dataSource[2];
			if (!data.skilldata) {
				return;
			}
			let skillData = data.skilldata[0];
			Laya.timer.clearAll(this);
			this.timerOnce();
			this.initPosition();
			//显示				

			this.lab_type.text = skillData.type == 0 ? LanMgr.getLan("(被动)", -1) : LanMgr.getLan("(主动)", -1);
			this.lab_type.visible = skillData.type == 0;
			this.lab_skillname.text = skillData.name;
			this.lab_skillname.event(Laya.Event.RESIZE);
			this.lab_skillinfo.text = skillData.info;
			this.lab_skillinfo.event(Laya.Event.RESIZE);
			data.skilldata.shift();
			/**描述文字增加宽度值 */
			let miaoShuValue = this.lab_skillinfo.height - 20;

			this.lab_cd.text = "";
			this.lab_cd.height = 0;

			this.lab_cd.event(Laya.Event.RESIZE);
			// if (data.isShowlist) {
			// 	this.list_miaoshu.visible = true;
			// 	this.list_miaoshu.dataSource = data.skilldata;
			// 	let value = (this.list_miaoshu.dataSource.length - 1) * 24;
			// 	this.list_miaoshu.height += (value + miaoShuValue);
			// 	this.img_bg.height += (value + miaoShuValue);					
			// } else {
			this.list_miaoshu.visible = false;
			this.list_miaoshu.height += (miaoShuValue - 24);
			this.img_bg.height += (miaoShuValue - 24);
			// }
			this.img_bg.height -= 20;
			let valueY = this.img_bg.height - 146;
			this.img_bg.y -= valueY;
			this.setPosition();
			Laya.Tween.to(this, { alpha: 1 }, 200)
		}

		public onClosed(): void {
			super.onClosed();
		}
	}


	export interface listData {
		skilldata: Array<tb.TB_skill>;
		isShowlist: boolean;
	}

	export interface SkillTipData {
		skill: tb.TB_skill;
		isShow: boolean;
		isShowlist: boolean;
		openDgLv:number;
		dgLv:number
	}
}
