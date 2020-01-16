var game;
(function (game) {
    /** 材料数据 */
    var GodMaterialVo = /** @class */ (function () {
        function GodMaterialVo(tbVo, curGod) {
            this.tbVo = tbVo;
            this.curGod = curGod;
            this.choose = [];
        }
        GodMaterialVo.prototype.getRaceType = function () {
            return this.curGod.tab_god.race_type;
        };
        /** 是否足够 */
        GodMaterialVo.prototype.isEnough = function () {
            return this.choose.length >= this.tbVo.count;
        };
        /** 获取格式化数据 -- 给后端的数据格式 */
        GodMaterialVo.prototype.getFormatData = function () {
            var ary = [[], []];
            for (var _i = 0, _a = this.choose; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.type == MaterialType.god) {
                    ary[0].push(vo.id);
                }
                else if (vo.type == MaterialType.card) {
                    ary[1].push(vo.id);
                }
            }
            return ary;
        };
        return GodMaterialVo;
    }());
    game.GodMaterialVo = GodMaterialVo;
    /** 指定的类型 */
    var ConfigType;
    (function (ConfigType) {
        ConfigType[ConfigType["god"] = 1] = "god";
        ConfigType[ConfigType["race"] = 2] = "race";
    })(ConfigType = game.ConfigType || (game.ConfigType = {}));
    /** 材料类型 */
    var MaterialType;
    (function (MaterialType) {
        MaterialType[MaterialType["god"] = 1] = "god";
        MaterialType[MaterialType["card"] = 2] = "card";
    })(MaterialType = game.MaterialType || (game.MaterialType = {}));
})(game || (game = {}));
