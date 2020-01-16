module game {
    export interface BaoshiIRVo {
        godVo : GodItemVo;
        slot : number;  // 1 - 12 宝石槽位
        equipVo:EquipItemVo;
        type:number;    // 宝石类型
        gemVo:GemstoneItemVo;
    }
    export class BaoshiIR extends ui.equip.gemstone.BaoShiIRUI {

        constructor() {
            super();
        }

        public set dataSource($value: BaoshiIRVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():BaoshiIRVo {
            return this._dataSource;
        }

        private refreshData() {
            let info = this.dataSource;
            if(info) {
                this.imgAttr.skin = SkinUtil.getAttrSkin(info.type);
                this.lbAttr.text = "0";
                let gemVo = info.gemVo;
                let isExist = gemVo ? true : false;
                this.itemBox.visible = isExist;
                this.btnAdd.visible = !isExist;
                this.itemBox.dataSource = gemVo;
                this.itemBox.label_number.visible = false;
                this.itemBox.lbLevel.visible = false;
                this.lbName.text = LanMgr.baoshiName[info.type];
                if(gemVo) {
                    this.lbAttr.text = gemVo.tbGem.getAttrVal() + "";
                    this.lbName.text = gemVo.tbItem.name;
                }
                this.redpoint.onDispose();
                if(info.godVo){
                    this.redpoint.setRedPointName(`equip_baoshi_${info.godVo.uuid}_${info.slot}`);
                }
                this.imgBg.on(Laya.Event.CLICK,this,this.onChange);
            }else {
                this.itemBox.dataSource = null;
                this.redpoint.onDispose();
                this.imgBg.off(Laya.Event.CLICK,this,this.onChange);
            }
        }

        public playAnim():void {
            let info = this.dataSource;
            if(!info) return;
            this.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                this.ani_succ.play(0, false);
                this.ani_succ.visible = true;
            }), ResConst.atlas_strength_effect);
        }

        private onChange():void {
            let info = this.dataSource;
            if(!info) return;
            dispatchEvt(new GemstoneEvent(GemstoneEvent.SHOW_REPLACE_GEM_VIEW),info);
        }


    }
}