

module game {
    /** 护送物品 */
    export class EscortCircleIR extends ui.escort.itemRender.EscortCircleIRUI {

        constructor() {
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.initView();
		}

		public get dataSource():CaravanGoodsVo {
			return this._dataSource;
		}

        private initView(): void {
            let info = this.dataSource;
            if(info) {
                this.img_icon.skin = LanMgr.getLan("husong/husong_{0}.png", -1, info.tbEscort.ID);
                this.img_select.visible = !info.isSelected();
                this.imgQuality.skin = SkinUtil.getEscortQulityIcon(info.tbEscort.ID);
            }else{

            }
        }
    }
}