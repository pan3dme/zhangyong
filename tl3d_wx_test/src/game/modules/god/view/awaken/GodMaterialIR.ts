module game {
    export class GodMaterialIR extends ui.god.render.GodMaterialIRUI {
        constructor() {
            super();
        }

        /** 设置当前数据源 ：  当前神灵阵营类型,所需材料数据 */
        public set dataSource($value:GodMaterialVo) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource():GodMaterialVo {
            return this._dataSource;
        }

        private initView() {
            let data = this.dataSource;
            if (data) {
                let info = data.tbVo;
                if(info.type == ConfigType.god){
                    let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(info.godId);
                    let itemVo = new ItemVo(itemtab.ID,0);
                    itemVo.star = info.starLv;
                    itemVo.show = false;
                    itemVo.clientUrl = info.starLv >= 6 ? SkinUtil.getItemIcon(tb.TB_item.get_TB_itemById(CostTypeKey.suipian_wuxing)) : null;
                    this.view_icon.dataSource = itemVo;
                    let godtab: tb.TB_god = tb.TB_god.get_TB_godById(info.godId);
                    this.img_type.skin = SkinUtil.getGodRaceSkin(godtab.race_type);
                }else {
                    let tempID = GodModel.getInstance().getItemID(info.starLv);
                    let vo = App.hero.createItemVo(0, tempID);
                    vo.show = false;
                    vo.hideSuipian = true;
                    vo.showStar = true;
                    vo.clientUrl = info.starLv >= 6 ? SkinUtil.getItemIcon(tb.TB_item.get_TB_itemById(CostTypeKey.suipian_wuxing)) : null;
                    let type = info.race == 1 ? data.getRaceType() : 0;
                    this.view_icon.dataSource = vo;
                    this.img_type.skin = SkinUtil.getGodRaceSkin(type);
                }
            }
        }

        /** 刷新数据 */
        public refreshData(chooseList:GodMaterialVo[]):void {
            let data = this.dataSource;
            if(data){
                let ary : GodChooseMaterialVo[] = [];
                for(let vo of chooseList){
                    if(vo != data){
                        ary.push(...vo.choose)
                    }
                }
                let listdata = GodUtils.filterGods(data.tbVo,data.curGod, ary); //符合条件的英雄
                let info = data.tbVo;
                let isEnough = data.choose.length >= info.count;
                this.view_icon.itemBox.gray = !isEnough;
                this.img_add.visible = listdata.length > 0 && !isEnough;
                this.lab_num.visible = true;
                this.lab_num.text = data.choose.length + "/" + info.count;
                this.lab_num.color = data.choose.length == info.count ? "#0bff00" : "#ff0501";
            }
        }
        
    }
}