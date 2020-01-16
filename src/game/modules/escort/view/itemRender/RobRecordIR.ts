

module game {

    export class RobRecordIR extends ui.escort.itemRender.RobRecordIRenderUI {

        constructor() {
            super();
            this.lbContent.autoSize = true;
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.initView();
		}

		public get dataSource():IRobRecord {
			return this._dataSource;
		}

        private initView(): void {
            let info = this.dataSource;
            if(info) {
                this.lbContent.text = info.getContent();
                let ary = info.getLossList();
                if(ary.length > 0){
                    this.itemList.y = this.lbContent.y + this.lbContent.height + 9;
                    this.itemList.array = ary;
                    this.bg.height = this.height = this.itemList.y + this.itemList.height + 18;
                }else {
                    this.itemList.array = null;
                    this.bg.height = this.height = this.lbContent.y + this.lbContent.height + 16;
                }
            }else{
                this.itemList.array = null;
            }
        }
    }
}