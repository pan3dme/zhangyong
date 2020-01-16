var game;
(function (game) {
    var GuanqiaModelVo = /** @class */ (function () {
        function GuanqiaModelVo(cp) {
            var _this = this;
            /** 关卡列表 */
            this._guanqiaList = [];
            /** 页数 */
            this.pageNum = 0;
            /** 当前页数 从0开始*/
            this.curPage = 0;
            /** 最后一关副本id */
            this.endCopyId = 0;
            this.tbCopy = cp;
            var infos = tb.TB_copy_info.get_TB_copy_info('area', String(cp.ID));
            infos.forEach(function ($item, index) {
                // boss关卡默认就是每个第十关
                _this._guanqiaList.push(new game.GuanqiaVo($item, (index % 10 == 9)));
            });
            var len = this._guanqiaList.length;
            this.endCopyId = this._guanqiaList[len - 1].tbCopyInfo.ID;
            this.pageNum = Math.ceil(len / game.TowerModel.PAGE_NUM);
        }
        /** 更新关卡数据 */
        GuanqiaModelVo.prototype.updateGuanqia = function () {
            var copyId = App.hero.towerCopyInfo[this.tbCopy.sub_type];
            var copyInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            var finishGuanqia;
            var tbCopy = copyInfo ? tb.TB_copy.get_TB_copyById(copyInfo.area) : null;
            if (copyInfo && tbCopy && tbCopy.type == iface.tb_prop.copyTypeKey.tower) {
                finishGuanqia = this.getGuanqiaVo(copyInfo.ID);
                if (!copyInfo.next) {
                    this.curGuanqia = this.getGuanqiaVo(copyId);
                }
                else {
                    this.curGuanqia = this.getGuanqiaVo(copyInfo.next);
                }
            }
            else {
                //从第一个开始
                this.curGuanqia = this._guanqiaList[0];
            }
            // 当前模式的通过层数
            var num = this.curGuanqia.tbCopyInfo.area_number;
            // 上一关卡,如果上一个关卡是boss关，且未领取奖励,则定位到该层
            if (finishGuanqia && finishGuanqia.isBoss && !finishGuanqia.isReward()) {
                num = finishGuanqia.tbCopyInfo.area_number;
            }
            // 当前页数（从0开始计算）
            this.curPage = Math.floor((num - 1) / game.TowerModel.PAGE_NUM);
        };
        /** 获取关卡 */
        GuanqiaModelVo.prototype.getGuanqiaVo = function (id) {
            return this._guanqiaList.find(function (vo) {
                return vo.tbCopyInfo.ID == id;
            });
        };
        /** 获取关卡 */
        GuanqiaModelVo.prototype.getGuanqiaVoByIndex = function (idx) {
            return this._guanqiaList[idx];
        };
        GuanqiaModelVo.prototype.getGuanqiaVoById = function (id) {
            return this._guanqiaList.find(function (vo) {
                return vo.tbCopyInfo.ID == id;
            });
        };
        /** 获取当前层的10个关卡 */
        GuanqiaModelVo.prototype.getListByPage = function (page) {
            var startIdx = game.TowerModel.PAGE_NUM * page;
            var list = this._guanqiaList.slice(startIdx, startIdx + game.TowerModel.PAGE_NUM);
            return list;
        };
        /** 当前层是否通过 */
        GuanqiaModelVo.prototype.isPassByPage = function (page) {
            var list = this.getListByPage(page);
            return list.every(function (item) {
                return item.isPass();
            });
        };
        GuanqiaModelVo.prototype.getJiangliList = function () {
            if (!this._jiangliList) {
                this._jiangliList = [];
                var tb_1 = TableData.getInstance().getTableByName(TableData.tb_trial).data;
                for (var id in tb_1) {
                    var tbTrial = tb_1[id];
                    if (tbTrial.type == 0) {
                        this._jiangliList.push(new game.JiangliVo(tb_1[id]));
                    }
                    else if (tbTrial.type == this.tbCopy.sub_type) {
                        this._jiangliList.push(new game.JiangliVo(tb_1[id]));
                    }
                }
            }
            return this._jiangliList;
        };
        /** 获取可领取的关卡 */
        GuanqiaModelVo.prototype.getCanRewardVo = function () {
            return this._guanqiaList.find(function (vo) {
                return vo.isCanReward();
            });
        };
        /** 是否有未领取的boss奖励 -- 上一关是boss关卡时,必须领取完才能进入下一关 */
        GuanqiaModelVo.prototype.isCanReward = function () {
            return this.getCanRewardVo() ? true : false;
        };
        /** 当前模式是否全部通关 */
        GuanqiaModelVo.prototype.isAllFinish = function () {
            var copyId = App.hero.towerCopyInfo[this.tbCopy.sub_type];
            return copyId >= this.endCopyId;
        };
        /** 全部通关并且全部领取 */
        GuanqiaModelVo.prototype.isAllPass = function () {
            return this.isAllFinish() && !this.isCanReward();
        };
        return GuanqiaModelVo;
    }());
    game.GuanqiaModelVo = GuanqiaModelVo;
})(game || (game = {}));
