/**
* name 
*/
module common {
	export class SkillBox extends ui.box.SkillBoxUI {
		private _array: Array<tb.TB_skill>
		constructor() {
			super();
			this._array = new Array
		}

		public set dataSource($data: common.SkillTipData) {
			if ($data) {
				this._dataSource = $data.skill;
				this._array = this.getSkillInfo($data.skill);
				this.img_icon.skin = $data.skill.getIconUrl();
				this.lab_dengji.text = "Lv " + $data.skill.getLevel().toString();
				this.gray = $data.dgLv < $data.openDgLv;
				if ($data.isShow) {
					this.on(Laya.Event.CLICK, this, this.onOut, [true, $data.isShowlist]);
					// this.on(Laya.Event.MOUSE_MOVE, this, this.onOut, [true,$data.miaoshutype]);
					// this.on(Laya.Event.MOUSE_OUT, this, this.onOut, [false,$data.miaoshutype]);
					// this.on(Laya.Event.MOUSE_UP, this, this.onOut, [false,$data.miaoshutype]);
				}
			}
			else {
				this.off(Laya.Event.CLICK, this, this.onOut);
				// this.off(Laya.Event.MOUSE_MOVE, this, this.onOut);
				// this.off(Laya.Event.MOUSE_OUT, this, this.onOut);
				// this.off(Laya.Event.MOUSE_UP, this, this.onOut);
				this.img_icon.skin = null;
			}
		}

		private onOut(visibel: boolean, type: boolean): void {
			// if (this.seleted.visible === visibel) return;
			// this.seleted.visible = visibel;
			let pos = this.localToGlobal(new Laya.Point(0, 0));
			if (this._array.length === 0) {
				UIUtil.isShowInfoBox(null, false, pos.x + this.width / 2, pos.y);
				return;
			};
			let data: common.listData = { skilldata: this._array.concat([]), isShowlist: type };
			UIUtil.isShowInfoBox(data, visibel, pos.x + this.width / 2, pos.y);
		}

		/**获得技能的全部等级信息
		 * @param $skill 玩家英雄的某个技能
		 * @return 相同且经过等级排序的全部技能
		 */
		public getSkillInfo($skill: tb.TB_skill): Array<tb.TB_skill> {
			let _arrskills: Array<tb.TB_skill> = [];
			let temp: tb.TB_skill = $skill;
			while (temp) {
				_arrskills.push(temp);
				temp = tb.TB_skill.get_TB_skillById(temp.ID + 1);
			}

			temp = tb.TB_skill.get_TB_skillById($skill.ID - 1);
			while (temp) {
				_arrskills.push(temp);
				temp = tb.TB_skill.get_TB_skillById(temp.ID - 1);
			}

			_arrskills.sort((itema, itemb) => {
				return itema.level - itemb.level;
			});
			return _arrskills;
		}
	}
}