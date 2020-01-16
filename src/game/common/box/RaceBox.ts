/**
* name 
*/
module common {
	export class RaceBox extends ui.box.RaceBoxUI {
		constructor() {
			super();
		}

		public set dataSource(data: any) {
			this._dataSource = data;
			if (data != null){
				this.img_race.skin = SkinUtil.getGodBigRaceSkin(data);
			}
		}
	}
}