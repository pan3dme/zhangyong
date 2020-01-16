var game;
(function (game) {
    var FateVo = /** @class */ (function () {
        function FateVo($id) {
            //英雄vo数组
            this.listItem = [];
            this.id = $id;
            this.tbGodFate = tb.TB_god_fate.get_TB_god_fateById($id);
            this.initGodList();
        }
        /** 初始化英雄数组 */
        FateVo.prototype.initGodList = function () {
            for (var _i = 0, _a = this.tbGodFate.need_god; _i < _a.length; _i++) {
                var obj = _a[_i];
                var vo = new GodItemVo(tb.TB_god.get_TB_godById(obj));
                vo.dataType = 1;
                this.listItem.push(vo);
            }
        };
        /** 该羁绊是否已满足激活条件 */
        FateVo.prototype.isActivite = function () {
            for (var _i = 0, _a = this.tbGodFate.need_god; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (!this.isOwned(obj))
                    return false;
            }
            return true;
        };
        /** 该羁绊是否已激活成功 */
        FateVo.prototype.isActiviteComplete = function () {
            return App.hero.godFateIds.indexOf(this.tbGodFate.ID) != -1;
        };
        /** 该英雄是否曾经拥有 */
        FateVo.prototype.isOwned = function (godId) {
            return App.hero.godAlbum.findIndex(function (vo) { return vo == godId; }) != -1;
        };
        /** 通过属性id获取该羁绊的属性 */
        FateVo.prototype.getAttr = function (id) {
            for (var _i = 0, _a = this.tbGodFate.attr; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj[0] == id)
                    return obj[2] < 1 ? Math.floor(obj[2] * 10000 / 100) : Number(obj[2]);
            }
            return 0;
        };
        /** 通过index(tbFate.attr的index)返回string[属性名(中文)，属性数值(string)] */
        FateVo.prototype.getAttrByIndex = function (index) {
            var attr = this.tbGodFate.attr[index][2] < 1 ? (Math.floor(this.tbGodFate.attr[index][2] * 10000 / 100) + '%') : this.tbGodFate.attr[index][2];
            return [game.FateModel.getInstance().getNameById(Number(this.tbGodFate.attr[index][0])), String(attr)];
        };
        /** 通过属性id获取该羁绊属性(用于计算神力) */
        FateVo.prototype.getAttr2Power = function (id) {
            for (var _i = 0, _a = this.tbGodFate.attr; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj[0] == id)
                    return Number(obj[2]);
            }
            return 0;
        };
        return FateVo;
    }());
    game.FateVo = FateVo;
})(game || (game = {}));
