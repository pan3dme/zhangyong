


module game{
	export class GodDmDuizhanIR extends ui.goddomain.render.DuizhanIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: IGodDomainFightSvo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IGodDomainFightSvo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.ui_head.dataSource = new UserHeadVo(info.head, info.level,info.headFrame);
                this.ui_head.gray = info.state == 0;
                this.img_bg.visible = info.state != 2;
				this.lab_name.text = info.name;
                if(this.img_bg.visible){
                    this.img_bg.skin = SkinUtil.getChuzhanIcon(info.state);
                    this.lab_info.text = info.state == 0?LanMgr.getLan("",12332):LanMgr.getLan("",12333);
                }
			} else{
				this.ui_head.dataSource = null;
			}
		}
	}
}