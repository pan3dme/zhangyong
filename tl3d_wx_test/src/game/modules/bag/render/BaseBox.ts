module game {
    export class BaseBox extends ui.bag.BaseBoxUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item) {
            if (item) {
                this.label_number.text = "";
                this.lab_equiprefine.text = "";
                this.img_icon.skin = item.getIconUrl();
                this.img_qulity.skin = item.getQulity();
                this.lbLevel.visible = false;
                if( GameUtil.isFunction(item.getLvStr)){
					let str = item.getLvStr();
					this.lbLevel.visible = str && str!="";
					this.lbLevel.text = str;
				}
                if (item instanceof ItemVo || item instanceof tb.TB_item) {
                    let num = Number(item.getNum());
                    this.label_number.visible = num > 0;
                    this.label_number.text = "x" + Snums(num);
                } else if (item instanceof EquipItemVo) {
                    let refinelev = Number(item.getRefineLevel());
                    this.lab_equiprefine.text = "+" + refinelev;
                    let strenglev = Number(item.getStrengthLv());
                    this.label_number.visible = strenglev != 0;
                    this.label_number.text = "+" + strenglev;
                }
                this.anim_select.visible = item.selectid == item.indexid;
                this.anim_select.play();
            } else {
                this.img_icon.skin = "";
                this.img_qulity.skin = "";
                this.label_number.text = "";
                this.lab_equiprefine.text = "";
                this.anim_select.gotoAndStop(0);
            }
        }
    }
}