module game {
    export class boxIR extends ui.dafuweng.boxIRUI {
        constructor() {
            super();
            this.img_box.on(Laya.Event.CLICK,this,this.onClick);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource(): tb.TB_risk {
            return this._dataSource;
        }

        private initView(){
            
        }

        private onClick(){
            UIMgr.showUI((UIConst.ManyItemsTip),{data:ary2prop(this.dataSource.box_preview),info:LanMgr.getLan("",12465)});
        }
    }
}