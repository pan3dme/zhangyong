module game {
    export class TreasureMaterialIR extends ui.god.treasure.render.TreasureMaterialIRUI {
        constructor() {
            super();
        }

        public set dataSource($value:TreasureMaterialVo) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource():TreasureMaterialVo {
            return this._dataSource;
        }

        private initView() {
            let data = this.dataSource;
            if (data) {
                let info = data.tbVo;
                let obj : ITreasureSvo = {templateId:info.itemId,quality:info.quality,starLv:info.starLv,num:0};
                let treasureVo = TreasureUtil.createTreasureVo("",obj);
                treasureVo.show = false;
                if(info.type == TreasureConfigType.item) {
                    let tbItem = tb.TB_item.get_TB_itemById(info.itemId);
                    treasureVo.quality = tbItem ? tbItem.quality : 1;
                }else if(info.type == TreasureConfigType.quality){
                    treasureVo.clientUrl = SkinUtil.getTreasureQualitySkin(info.quality);
                }
                this.itemBox.dataSource = treasureVo;
            }
        }

        /** 刷新数据 */
        public refreshData(chooseList:TreasureMaterialVo[]):void {
            let data = this.dataSource;
            if(data){
                let ary : ChooseTreasureMaterialVo[] = [];
                for(let vo of chooseList){
                    if(vo != data){
                        ary.push(...vo.choose)
                    }
                }
                let listdata = TreasureUtil.filterTreasures(data.tbVo,data.curTreasure, ary); //符合条件的英雄
                let info = data.tbVo;
                let isEnough = data.choose.length >= info.count;
                // this.itemBox.itemBox.gray = !isEnough;
                this.btnAdd.visible = listdata.length > 0 && !isEnough;
                this.lbNum.visible = true;
                this.lbNum.text = data.choose.length + "/" + info.count;
                this.lbNum.color = data.choose.length == info.count ? "#0bff00" : "#ff0501";
            }
        }
        
    }
}