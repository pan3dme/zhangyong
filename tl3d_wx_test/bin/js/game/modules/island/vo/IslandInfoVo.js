var game;
(function (game) {
    var IslandInfoVo = /** @class */ (function () {
        function IslandInfoVo(tbland) {
            this.scrollX = 0;
            this.tbIsland = tbland;
            this.oreList = [];
            for (var i = 1; i <= 36; i++) {
                this.oreList.push(new game.OreSpotInfoVo(i, this.tbIsland));
            }
        }
        /** 设置矿产列表数据 */
        IslandInfoVo.prototype.setServerVo = function (mineList) {
            var _loop_1 = function (i) {
                var curOre = this_1.oreList[i];
                var svo = mineList.find(function (vo) {
                    return vo.mineId == curOre.pos;
                });
                curOre.setSimpleInfo(svo);
            };
            var this_1 = this;
            for (var i = 0; i < this.oreList.length; i++) {
                _loop_1(i);
            }
        };
        /** 获取矿产通过位置 */
        IslandInfoVo.prototype.getOreByPos = function (pos) {
            return this.oreList.find(function (vo) {
                return vo.pos == pos;
            });
        };
        /** 获取矿产通过唯一值 */
        IslandInfoVo.prototype.getOreByUuid = function (mineIndex) {
            return this.oreList.find(function (vo) {
                return vo.isExist() && vo.svo.mineIndex == mineIndex;
            });
        };
        return IslandInfoVo;
    }());
    game.IslandInfoVo = IslandInfoVo;
})(game || (game = {}));
