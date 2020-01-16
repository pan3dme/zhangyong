/**
* name 
*/
module game {
	export class UpRoadTabIR extends ui.uproad.UpRoadTabIRUI {
		constructor() {
			super();
		}

		public set dataSource($value: tb.TB_advance_road) {
			this._dataSource = $value;
			this.refresh();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refresh(): void {
			let data = this.dataSource;
			if (data) {
				let lv:number = App.hero.tasks.advanceLevel;
				this.img_icon.gray = data.ID > lv+1;
				this.img_icon.skin = LanMgr.getLan("zhaohuanshi/{0}.png", -1, data.ID);
				 this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                	this.ani_select.play();
            	}), ResConst.atlas_circle_select);
			} else {
				this.ani_select.gotoAndStop(0);
			}
		}

	

		public destroy(destroyChild:boolean = true):void{
			super.destroy(destroyChild);
		}

	


	}
}