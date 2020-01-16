/**
* name 
*/
module game{
	export class TujianIR extends ui.tujian.render.TujianIRUI{

		public heroSkin : string;
		constructor(){
			super();
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():any {
			return this._dataSource;
		}

		private _godTemp:tb.TB_god;
		private _starLv:number = 0;
		private refreshData() {
			let data = this.dataSource;
			if (data) {
				tl3d.ModuleEventManager.addEvent(GodEvent.GOD_MAX_STAR_LV_CHANGE, this.onMaxStarLvChange, this);
				this._starLv = data instanceof GodItemVo ? data.starLevel : data.starLv;
				this._godTemp = data instanceof GodItemVo ? data.tab_god : data.godTemp;

				this.lbl_name.text=this._godTemp.name;
				this.lbl_name.color = ColorConst.getTujianNameColor(this._starLv);
				this.heroSkin = SkinUtil.getBigIconById(this._godTemp.icon);
				this.img_icon.skin = this.heroSkin;
				if(!ResUseMgr.isExistRes(this.heroSkin)){
					ResUseMgr.useRes([this.heroSkin]);
				}
				this.img_kuang.skin = SkinUtil.getTujianKuang(this._starLv > 5 ? 5 : this._starLv);
				this.img_race.skin = SkinUtil.getTujianRace(this._godTemp.race_type);
				this.box_star.starLevel = this._starLv;
				this.onMaxStarLvChange();
			}else{
				if(this.heroSkin) {
					if(ResUseMgr.isExistRes(this.heroSkin)){
						ResUseMgr.releaseRes([this.heroSkin]);
					}
				}
				this.img_icon.skin = "";
				this._godTemp = null;
				this._starLv = 0;
				tl3d.ModuleEventManager.removeEvent(GodEvent.GOD_MAX_STAR_LV_CHANGE, this.onMaxStarLvChange, this);
				this.heroSkin = null;
			}
		}

		private onMaxStarLvChange():void{
			if (!this._godTemp || this._starLv < 1){
				this.gray = true;
			}else{
				this.gray = this.dataSource instanceof TuJianGodTemp && !GodUtils.isActiveGodStarLv(this._godTemp.ID, this._starLv);
			}
		}
	}
}