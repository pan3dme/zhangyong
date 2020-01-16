

module game {
    export class GuanQiaNewIR extends ui.guaji.GuanQiaNewIRUI {

        constructor() {
			super();
            this.setSelect(false, true);
		}

		public set dataSource($value:GuaJiGuanqiaVo) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():GuaJiGuanqiaVo {
			return this._dataSource;
		}

		private refreshView() {
          let data:GuaJiGuanqiaVo = this.dataSource;
          if (data){
            if (data.tbCopyInfo.area_number == 10){
                this.img_boss.visible = true;
            }else{
                this.img_boss.visible = false;
            }
          }else{
              this.img_boss.visible = false;
          }
		}

        private _isSelect:boolean = false
        public setSelect(val:boolean, force:boolean = false):void{
            if (this._isSelect == val && !force) return;
            this._isSelect = val;
            this.img_icon.skin = val ? "comp/image/gq_zuobiao2.png" : "comp/image/gq_zuobiao.png";
            this.img_boss.gray = !val;
        }

        
    }
}