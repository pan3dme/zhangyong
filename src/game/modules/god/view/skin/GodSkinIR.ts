/**
* name 
*/
module game{
	export class GodSkinIR extends ui.god.render.GodSkinIRUI{

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

		private refreshData() {
            let info : {godVo:GodItemVo,skinVo:GodSkinVo} = this.dataSource;
            if(info) {
                let skinVo = info.skinVo;
                this.imgBg.skin = skinVo.getBgSkin();
                this.lbName.text = skinVo.getName();
                this.imgWear.visible = info.godVo && skinVo.skinId == info.godVo.skinId;
                let isOpenByTujian = UIMgr.hasStage(UIConst.TujianView);
                this.canActivityRP.visible = !isOpenByTujian && skinVo.isCanActivity();
                this.ani1.play(0,true);
            }else{
                this.ani1.gotoAndStop(0);
            }
        }
	}
}