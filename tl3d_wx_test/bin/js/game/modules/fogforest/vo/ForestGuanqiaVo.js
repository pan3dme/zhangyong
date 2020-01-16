var game;
(function (game) {
    var ForestGuanqiaVo = /** @class */ (function () {
        function ForestGuanqiaVo(tbForest) {
            this._model = game.FogForestModel.getInstance();
            this.tbForest = tbForest;
            this.modelId = tb.TB_monster.get_TB_monsterById(tbForest.boss_show).model;
            this.specialModel = 0;
            if (this.isSpecial()) {
                var tbItem = tb.TB_item.get_TB_itemById(this.tbForest.special_show[0]);
                if (tbItem.type == iface.tb_prop.itemTypeKey.god) {
                    var tbGod = tbItem ? tb.TB_god.get_TB_godById(tbItem.defined[0]) : null;
                    this.specialModel = tbGod ? tbGod.model : 0;
                }
                else {
                    this.itemVo = new ItemVo(tbItem.ID, this.tbForest.special_show[1]);
                }
            }
        }
        /** 是否是当前关卡 */
        ForestGuanqiaVo.prototype.isCurrent = function () {
            return this._model.isCurrent(this.tbForest.ID);
        };
        /** 是否是最后一关 */
        ForestGuanqiaVo.prototype.isLast = function () {
            return this._model.isAllFinish();
        };
        /** 是否通关 (通当前关卡)*/
        ForestGuanqiaVo.prototype.isPass = function () {
            return this._model.forestCurFloor >= this.tbForest.ID;
        };
        /** 是否有宝箱奖励 (首通奖励)*/
        ForestGuanqiaVo.prototype.isHasBaoxiang = function () {
            return this.tbForest.first_reward && this.tbForest.first_reward.length > 0;
        };
        /** 是否有特殊奖励 (15层一波的特殊奖励)*/
        ForestGuanqiaVo.prototype.isSpecial = function () {
            return this.tbForest.special_show && this.tbForest.special_show.length > 0;
        };
        ForestGuanqiaVo.prototype.getShowItem = function () {
            if (!this.isSpecial())
                return null;
            var vo = new ItemVo(this.tbForest.special_show[0], this.tbForest.special_show[1]);
            vo.show = true;
            return vo;
        };
        /** 是否已领取宝箱奖励 (遍历已领取数组,判断是否领取)*/
        ForestGuanqiaVo.prototype.isReward = function () {
            return App.hero.doneForestChests.indexOf(this.tbForest.ID) != -1;
        };
        /** 是否可以领取奖励 (是否通关以及是否领取奖励)*/
        ForestGuanqiaVo.prototype.isCanReward = function () {
            return this.isPass() && !this.isReward();
        };
        return ForestGuanqiaVo;
    }());
    game.ForestGuanqiaVo = ForestGuanqiaVo;
})(game || (game = {}));
