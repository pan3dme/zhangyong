

module game {

    export class ForestGuanqiaVo  {
        private _model : FogForestModel;

        public tbForest : tb.TB_forest;
        public modelId : number;
        public sortNum : number;

        public specialModel : number;
        public itemVo : ItemVo;
        constructor(tbForest:tb.TB_forest) {
            this._model = FogForestModel.getInstance();
            this.tbForest = tbForest;
            this.modelId = tb.TB_monster.get_TB_monsterById(tbForest.boss_show).model;
            this.specialModel = 0;
            if(this.isSpecial()){
                let tbItem = tb.TB_item.get_TB_itemById(this.tbForest.special_show[0]);
                if(tbItem.type == iface.tb_prop.itemTypeKey.god) {
                    let tbGod = tbItem ? tb.TB_god.get_TB_godById(tbItem.defined[0]) : null;
                    this.specialModel = tbGod ? tbGod.model : 0;
                }else{
                    this.itemVo = new ItemVo(tbItem.ID,this.tbForest.special_show[1]);
                }
            }
        }

        /** 是否是当前关卡 */
        isCurrent():boolean {
            return this._model.isCurrent(this.tbForest.ID);
        }
        /** 是否是最后一关 */
        isLast(): boolean {
            return this._model.isAllFinish();
        }
        /** 是否通关 (通当前关卡)*/
        isPass():boolean {
            return this._model.forestCurFloor >= this.tbForest.ID;
        }

        /** 是否有宝箱奖励 (首通奖励)*/
        isHasBaoxiang():boolean {
            return this.tbForest.first_reward && this.tbForest.first_reward.length > 0;
        }
        
        /** 是否有特殊奖励 (15层一波的特殊奖励)*/
        isSpecial():boolean {
            return this.tbForest.special_show && this.tbForest.special_show.length > 0;
        }

        getShowItem():ItemVo {
            if(!this.isSpecial()) return null;
            let vo = new ItemVo(this.tbForest.special_show[0],this.tbForest.special_show[1]);
            vo.show = true;
            return vo;
        }

        /** 是否已领取宝箱奖励 (遍历已领取数组,判断是否领取)*/
        isReward():boolean {
            return App.hero.doneForestChests.indexOf(this.tbForest.ID) != -1;
        }
        /** 是否可以领取奖励 (是否通关以及是否领取奖励)*/
        isCanReward():boolean {
            return this.isPass() && !this.isReward();
        }
    }
}