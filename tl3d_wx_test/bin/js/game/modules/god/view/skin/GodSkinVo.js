var game;
(function (game) {
    var GodSkinType;
    (function (GodSkinType) {
        GodSkinType[GodSkinType["origin"] = 0] = "origin";
        GodSkinType[GodSkinType["awaken"] = -1] = "awaken";
    })(GodSkinType = game.GodSkinType || (game.GodSkinType = {}));
    /** 皮肤数据 */
    var GodSkinVo = /** @class */ (function () {
        function GodSkinVo(tbGod, skinId) {
            this.skinId = 0; // 付费皮肤id
            this.tbGod = tbGod;
            this.skinId = skinId;
            if (skinId > 0) {
                this.tbSkin = tb.TB_skin.getTbById(skinId);
                this.costVo = this.tbSkin.item && this.tbSkin.item.length > 0 ? new ItemVo(this.tbSkin.item[0], this.tbSkin.item[1]) : null;
            }
        }
        /** 获取名称 */
        GodSkinVo.prototype.getName = function () {
            if (this.skinId == GodSkinType.origin)
                return LanMgr.getLan("", 12218);
            if (this.skinId == GodSkinType.awaken)
                return LanMgr.getLan("", 12219);
            return this.tbSkin ? this.tbSkin.name : LanMgr.getLan("", 12230);
        };
        GodSkinVo.prototype.getName2 = function () {
            if (this.skinId == GodSkinType.origin || this.skinId == GodSkinType.awaken)
                return this.tbGod.name;
            return this.tbSkin ? this.tbSkin.name : LanMgr.getLan("", 12230);
        };
        /** 获取标题 */
        GodSkinVo.prototype.getTitle = function () {
            if (this.skinId == GodSkinType.origin)
                return this.tbGod.name + "(" + LanMgr.getLan("", 12218) + ")";
            if (this.skinId == GodSkinType.awaken)
                return this.tbGod.name + "(" + LanMgr.getLan("", 12219) + ")";
            return this.tbSkin ? this.tbGod.name + "(" + this.tbSkin.name + ")" : this.tbGod.name + "(" + LanMgr.getLan("", 12230) + ")";
        };
        /** 解锁条件 */
        GodSkinVo.prototype.getCondition = function (ingoreOrigin) {
            if (ingoreOrigin === void 0) { ingoreOrigin = true; }
            if (this.skinId == GodSkinType.origin) {
                return ingoreOrigin ? LanMgr.getLan("", 12218) : LanMgr.getLan("", 12364, this.tbGod.name);
            }
            else if (this.skinId == GodSkinType.awaken) {
                return LanMgr.getLan("", 12361, tb.TB_god_set.get_TB_god_set().awake_section);
            }
            // 付费
            var isNeedCost = this.isNeedCost();
            var item = isNeedCost ? tb.TB_item.get_TB_itemById(this.costVo.id) : null;
            return item ? LanMgr.getLan("", 12363, item.name) : LanMgr.getLan("", 12362);
        };
        /** 获取背景皮肤 */
        GodSkinVo.prototype.getBgSkin = function () {
            if (this.skinId == GodSkinType.origin)
                return "shizhuang/chushi.png";
            if (this.skinId == GodSkinType.awaken)
                return "shizhuang/xiyou.png";
            return "shizhuang/chuanshuo.png";
        };
        /** 获取模型ID */
        GodSkinVo.prototype.getModelId = function () {
            if (this.skinId == GodSkinType.origin)
                return this.tbGod.model;
            if (this.skinId == GodSkinType.awaken)
                return this.tbGod.awake_model;
            return this.tbSkin ? this.tbSkin.model : 0;
        };
        /** 是否激活 是否忽略英雄是否获得*/
        GodSkinVo.prototype.isActivity = function (awakenLv, ingoreOrigin) {
            if (ingoreOrigin === void 0) { ingoreOrigin = true; }
            if (this.skinId == GodSkinType.origin) {
                return ingoreOrigin ? true : game.GodUtils.isActiveGod(this.tbGod.ID);
            }
            if (this.skinId == GodSkinType.awaken && awakenLv >= tb.TB_god_set.get_TB_god_set().awake_section)
                return true;
            return App.hero.skinIds.indexOf(this.skinId) != -1;
        };
        /** 是否可以激活 */
        GodSkinVo.prototype.isCanActivity = function () {
            return this.isNeedCost() && !this.isActivity(0) ? App.isEnough(this.costVo.id, this.costVo.count) : false;
        };
        /** 是否穿戴 */
        GodSkinVo.prototype.isWear = function (skinId) {
            return skinId == this.skinId;
        };
        /** 是否需要消耗 */
        GodSkinVo.prototype.isNeedCost = function () {
            return this.costVo ? true : false;
        };
        /** 是否特殊皮肤 */
        GodSkinVo.prototype.isSpecialSkin = function () {
            return this.tbSkin ? true : false;
        };
        GodSkinVo.prototype.getTbAttrStrAry = function () {
            if (!this.tbSkin)
                return null;
            if (!this._attrStrAry) {
                this._attrStrAry = [];
                var arrAttstr = LanMgr.attrName;
                var showPercent = [iface.tb_prop.attrTypeKey.effectHit, iface.tb_prop.attrTypeKey.effectResist, iface.tb_prop.attrTypeKey.crit, iface.tb_prop.attrTypeKey.dizzy,
                    iface.tb_prop.attrTypeKey.critDmg, iface.tb_prop.attrTypeKey.healRate, iface.tb_prop.attrTypeKey.addDmg, iface.tb_prop.attrTypeKey.subDmg];
                var attrAry = this.tbSkin.getAttr();
                var fixedObj = attrAry[0] || {};
                var percentObj = attrAry[1] || {};
                var arrAttr = [];
                for (var i in fixedObj) {
                    var peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
                    var str = showPercent.indexOf(Number(i)) != -1 ? "+" + Math.round(fixedObj[i] * 10000) / 100 + "%" : "+" + fixedObj[i];
                    arrAttr.push([peoprety, str]);
                }
                for (var i in percentObj) {
                    var peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
                    var str = "+" + Math.round(percentObj[i] * 10000) / 100 + "%";
                    arrAttr.push([peoprety, str]);
                }
                this._attrStrAry = arrAttr;
            }
            return this._attrStrAry;
        };
        return GodSkinVo;
    }());
    game.GodSkinVo = GodSkinVo;
})(game || (game = {}));
