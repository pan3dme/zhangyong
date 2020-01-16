

module game {

    export class BianQiangIR extends ui.task.bianqiang.BianQiangIRUI {
        static TYPE_XSRM:number = 1;//新手入门
        static TYPE_XZBB:number = 2;//小资必备
        static TYPE_THBS:number = 3;//土豪必刷
		constructor() {
			super();
            
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():tb.TB_growth_guide {
			return this._dataSource;
		}

		private refreshView() {
            let guidedata : tb.TB_growth_guide = this._dataSource;
			if (guidedata) {
                this.icon.skin = SkinUtil.getSysOpenSkin(guidedata.icon);
                this.lab_title.text = guidedata.name
                if (guidedata.recommend == BianQiangIR.TYPE_XSRM){
                    this.lab_type.text = LanMgr.getLan("",12150);
                    this.lab_type.strokeColor = "#297d0d";
                }else if (guidedata.recommend == BianQiangIR.TYPE_XZBB){
                    this.lab_type.text = LanMgr.getLan("",12151);
                    this.lab_type.strokeColor = "#6c4ac7";
                }else if (guidedata.recommend == BianQiangIR.TYPE_THBS){
                    this.lab_type.text = LanMgr.getLan("",12152);
                    this.lab_type.strokeColor = "#a22a2a";
                }else{
                    this.lab_type.text = "";
                    this.lab_type.strokeColor = "#579f36";
                }
                this.lab_desc.text = guidedata.desc;
                this.img_type.skin = this.getTypeIcon(guidedata.recommend);
                this.btnOperate.on(Laya.Event.CLICK,this,this.onClick);
			}else{
                this.btnOperate.off(Laya.Event.CLICK,this,this.onClick);
            }
		}

        private getTypeIcon(type:number):string{
            switch(type){
                case BianQiangIR.TYPE_XSRM:
                    return "comp/flag/woyaobianqiang_butiao01.png";
                case BianQiangIR.TYPE_XZBB:
                    return "comp/flag/woyaobianqiang_butiao02.png";
                case BianQiangIR.TYPE_THBS:
                    return "comp/flag/woyaobianqiang_butiao03.png";
                default:
                    return "";
            }
        }

        private onClick():void {
            let guidedata : tb.TB_growth_guide = this._dataSource;
            dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW,guidedata.link));
        }
        
	}
}