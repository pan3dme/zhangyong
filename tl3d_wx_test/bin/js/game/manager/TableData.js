function traceNoTabelData() {
    throw new Error("数据表无");
}
var tb;
(function (tb) {
    var TB_hud = /** @class */ (function () {
        function TB_hud() {
        }
        TB_hud.get_TB_hudById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_hud, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_hud.get_TB_hudBySysId = function (id) {
            var list = TB_hud.get_TB_hud();
            return list.find(function (vo) {
                return vo.system_id == id;
            });
        };
        TB_hud.get_TB_hud = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_hud);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_hud;
    }());
    tb.TB_hud = TB_hud;
    var TB_sys_open = /** @class */ (function () {
        function TB_sys_open() {
        }
        TB_sys_open.get_TB_sys_openById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_sys_open, $id);
            if (!$obj) {
                logerror('没有该系统id', $id);
            }
            var $vo = $obj;
            return $vo;
        };
        TB_sys_open.get_TB_sys_open = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_sys_open);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_sys_open;
    }());
    tb.TB_sys_open = TB_sys_open;
    var TB_role = /** @class */ (function () {
        function TB_role($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.ID = $obj.ID;
            this.exp = $obj.exp;
            this.reward = $obj.reward;
        }
        TB_role.get_TB_rolenById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_role, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_role.get_TB_role = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_role);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_role;
    }());
    tb.TB_role = TB_role;
    var TB_god_employ_set = /** @class */ (function () {
        function TB_god_employ_set() {
        }
        TB_god_employ_set.get_TB_god_employ_setnById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_god_employ_set, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_god_employ_set.get_TB_god_employ_set = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god_employ_set);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_god_employ_set;
    }());
    tb.TB_god_employ_set = TB_god_employ_set;
    var TB_god_resolve = /** @class */ (function () {
        function TB_god_resolve() {
        }
        TB_god_resolve.get_TB_god_resolveById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_god_resolve, $id);
            var $vo = $obj;
            return $vo;
        };
        return TB_god_resolve;
    }());
    tb.TB_god_resolve = TB_god_resolve;
    var TB_god_level = /** @class */ (function () {
        function TB_god_level() {
        }
        TB_god_level.get_TB_god_levelnById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_god_level, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_god_level.get_TB_god_level = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god_level);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_god_level;
    }());
    tb.TB_god_level = TB_god_level;
    var TB_god = /** @class */ (function () {
        function TB_god() {
        }
        TB_god.prototype.getName = function () {
            return this.name;
        };
        TB_god.prototype.getLevel = function () {
            return 1;
        };
        TB_god.prototype.getStar = function () {
            return 0;
        };
        TB_god.prototype.isAwaken = function () {
            return false;
        };
        /** 是否有觉醒模型 */
        TB_god.prototype.hasAwakenModel = function () {
            return this.awake_model > 0 && this.awake_model != this.model;
        };
        TB_god.prototype.isMoreThanSix = function () {
            return this.quality >= 6;
        };
        TB_god.prototype.getType = function () {
            return "null";
        };
        TB_god.prototype.getDataType = function () {
            return 1;
        };
        TB_god.prototype.getRaceType = function () {
            return false;
        };
        TB_god.prototype.getAttrType = function () {
            return this.type;
        };
        TB_god.prototype.getQulity = function () {
            var starLv = this.quality >= 6 ? 6 : this.quality;
            return SkinUtil.getBoxQulityIcon(starLv);
        };
        TB_god.prototype.getIconUrl = function () {
            return SkinUtil.getHeadIcon(this.icon);
        };
        TB_god.prototype.getFrameUrl = function () {
            var quality = this.star ? this.star[0] : 0;
            if (quality > 6)
                quality = 6;
            return SkinUtil.getBoxQulityIcon(quality);
        };
        TB_god.prototype.getProperty = function () {
            return null;
        };
        TB_god.prototype.jisuanjineng = function () {
            return null;
        };
        TB_god.prototype.getSkill = function () {
            var skillAry = [];
            for (var _i = 0, _a = this.skill; _i < _a.length; _i++) {
                var ary = _a[_i];
                skillAry.push(ary[0]);
            }
            return skillAry;
        };
        /** 是否可以觉醒 */
        TB_god.prototype.isCanAwaken = function () {
            var maxStar = this.star[1] || 0;
            return maxStar > tb.TB_god_set.get_TB_god_set().star_evolution;
        };
        TB_god.get_TB_godById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_god, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_god.get_TB_god = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        /** 获取属性值 */
        TB_god.prototype.getPropValByType = function (type) {
            var result = this.attr_init.find(function (ary) {
                return ary[0] == type;
            });
            return Number(result[1]);
        };
        /** 获取技能的开放阶级 */
        TB_god.prototype.getSkillOpenDgLv = function (skill) {
            var skillAry = this.skill.find(function (ary) {
                return ary[0] == skill;
            });
            return skillAry && (skillAry[1] || 0);
        };
        /** 获取阶数开启的技能 */
        TB_god.prototype.getSkillIdByDegree = function (degree) {
            for (var _i = 0, _a = this.skill; _i < _a.length; _i++) {
                var ary = _a[_i];
                if (ary[1] == degree) {
                    return ary[0];
                }
            }
            return 0;
        };
        TB_god.prototype.getSkinList = function () {
            if (!this._skinList) {
                this._skinList = [];
                this._skinList.push(new game.GodSkinVo(this, game.GodSkinType.origin));
                if (this.hasAwakenModel()) {
                    this._skinList.push(new game.GodSkinVo(this, game.GodSkinType.awaken));
                }
                if (this.skin && this.skin.length > 0) {
                    for (var _i = 0, _a = this.skin; _i < _a.length; _i++) {
                        var id = _a[_i];
                        this._skinList.push(new game.GodSkinVo(this, id));
                    }
                }
            }
            return this._skinList;
        };
        /** 获取皮肤对象 */
        TB_god.prototype.getSkinVo = function (skinid) {
            var list = this.getSkinList();
            return list.find(function (vo) {
                return vo.skinId == skinid;
            });
        };
        /**
        * 获取英雄的所有技能
        * @param  英雄对象
        */
        TB_god.prototype.getAllSkill = function (degree, starLevel) {
            var ary = new Array;
            var realskills = getSkillList(this.skill, degree, starLevel);
            for (var i = 0; i < realskills.length; i++) {
                var tbSkill = tb.TB_skill.get_TB_skillById(realskills[i][0]);
                if (tbSkill) {
                    ary.push(tbSkill);
                }
            }
            return ary;
        };
        /**
        * 获取英雄的所有技能
        * @param  英雄对象
        */
        TB_god.prototype.getBaseSkill = function () {
            var ary = new Array;
            for (var i = 0; i < this.skill.length; i++) {
                var tbSkill = tb.TB_skill.get_TB_skillById(this.skill[i][0]);
                if (tbSkill) {
                    ary.push(tbSkill);
                }
            }
            return ary;
        };
        return TB_god;
    }());
    tb.TB_god = TB_god;
    var TB_skin = /** @class */ (function () {
        function TB_skin() {
        }
        TB_skin.getTbById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skin, id);
            return $obj;
        };
        /** 获取属性 */
        TB_skin.prototype.getAttr = function () {
            if (!this._attrAry) {
                this._attrAry = [{}, {}];
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        if (ary[1] == ValueType.fixed) {
                            this._attrAry[0][ary[0]] = ary[2];
                        }
                        else {
                            this._attrAry[1][ary[0]] = ary[2];
                        }
                    }
                }
            }
            return this._attrAry;
        };
        return TB_skin;
    }());
    tb.TB_skin = TB_skin;
    var TB_awaken_conditions = /** @class */ (function () {
        function TB_awaken_conditions() {
        }
        TB_awaken_conditions.getTbById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_awaken_conditions, $id);
            var $vo = $obj;
            return $vo;
        };
        return TB_awaken_conditions;
    }());
    tb.TB_awaken_conditions = TB_awaken_conditions;
    var TB_star_title = /** @class */ (function () {
        function TB_star_title() {
        }
        TB_star_title.getTbById = function ($id) {
            return TableData.getInstance().getData(TableData.tb_star_title, $id);
        };
        return TB_star_title;
    }());
    tb.TB_star_title = TB_star_title;
    var TB_god_awaken = /** @class */ (function () {
        function TB_god_awaken() {
        }
        TB_god_awaken.getTbById = function ($id) {
            return TableData.getInstance().getData(TableData.tb_god_awaken, $id);
        };
        TB_god_awaken.prototype.getMaterialList = function () {
            var _this = this;
            if (!this._materialList) {
                this._materialList = [];
                if (this.material) {
                    this.material.forEach(function (ary) {
                        var itemVo = new ItemVo(ary[0], 0);
                        itemVo.constNum = ary[1];
                        itemVo.countFromBag = true;
                        _this._materialList.push(itemVo);
                    });
                }
            }
            return this._materialList;
        };
        TB_god_awaken.prototype.getGodMaterialList = function () {
            var _this = this;
            if (!this._godMaterialList) {
                this._godMaterialList = [];
                if (this.god_material) {
                    this.god_material.forEach(function (ary) {
                        _this._godMaterialList.push({ type: game.ConfigType.race, starLv: ary[0], count: ary[1], race: ary[2] });
                    });
                }
            }
            return this._godMaterialList;
        };
        TB_god_awaken.prototype.getReturnMaterialList = function () {
            var _this = this;
            if (!this._returnMaterialList) {
                this._returnMaterialList = [];
                if (this.return_material) {
                    this.return_material.forEach(function (ary) {
                        _this._returnMaterialList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._returnMaterialList;
        };
        /** 获取加成的属性值 */
        TB_god_awaken.prototype.getAttrValue = function (id) {
            var attr = this.attr ? this.attr.find(function (ary) {
                return ary[0] == id;
            }) : null;
            return attr ? attr[1] : 0;
        };
        return TB_god_awaken;
    }());
    tb.TB_god_awaken = TB_god_awaken;
    var TB_god_set = /** @class */ (function () {
        function TB_god_set() {
        }
        TB_god_set.get_TB_god_set = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_god_set, 1);
            var $vo = $obj;
            return $vo;
        };
        return TB_god_set;
    }());
    tb.TB_god_set = TB_god_set;
    var TB_skill = /** @class */ (function () {
        function TB_skill() {
        }
        //获取图片路径
        TB_skill.prototype.getIconUrl = function () {
            return SkinUtil.getSkillIcon(Number(this.icon));
        };
        //获取品质
        TB_skill.prototype.getQulity = function () {
            return SkinUtil.getBoxQulityIcon(this.type);
        };
        //获取等级
        TB_skill.prototype.getLevel = function () {
            return this.level;
        };
        TB_skill.prototype.isSkillDmgMultiSection = function () {
            if (this.effect <= 0) {
                return false;
            }
            var tabeff = tb.TB_skill_effect.get_TB_skill_effectById(this.effect);
            if (!tabeff) {
                return false;
            }
            var frame = tabeff.frame;
            return frame && frame.length > 2;
        };
        TB_skill.get_TB_skillById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_skill.get_TB_skill = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_skill);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_skill;
    }());
    tb.TB_skill = TB_skill;
    var TB_skill_desc = /** @class */ (function () {
        function TB_skill_desc() {
        }
        TB_skill_desc.getTbSkillDesc = function (id) {
            return TableData.getInstance().getData(TableData.tb_skill_desc, id);
        };
        return TB_skill_desc;
    }());
    tb.TB_skill_desc = TB_skill_desc;
    var TB_sub_skill = /** @class */ (function () {
        function TB_sub_skill() {
        }
        TB_sub_skill.get_TB_sub_skillById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_sub_skill, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_sub_skill.get_TB_sub_skill = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_sub_skill);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_sub_skill;
    }());
    tb.TB_sub_skill = TB_sub_skill;
    var TB_skill_replace = /** @class */ (function () {
        function TB_skill_replace() {
        }
        TB_skill_replace.replaceSkill = function (skillList) {
            var flag = false;
            var itemIdx;
            for (var i = 0; i < skillList.length; i++) {
                var id = skillList[i];
                var $obj = TableData.getInstance().getTableByName(TableData.tb_skill_replace);
                var $vo = $obj.data[id];
                if (!$vo) {
                    continue;
                }
                //搜索是否有替换的目标
                for (var x = 0; x < skillList.length; x++) {
                    var chgItem = skillList[x];
                    itemIdx = $vo.initial_skill.indexOf(chgItem);
                    if (itemIdx != -1 && $vo.replace_skill[itemIdx]) {
                        skillList[x] = $vo.replace_skill[itemIdx];
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    break;
                }
            }
            return flag;
        };
        return TB_skill_replace;
    }());
    tb.TB_skill_replace = TB_skill_replace;
    var TB_effect = /** @class */ (function () {
        function TB_effect() {
        }
        TB_effect.get_TB_effectById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_effect, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_effect.get_TB_effect = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_effect);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_effect;
    }());
    tb.TB_effect = TB_effect;
    var TB_msgCode = /** @class */ (function () {
        function TB_msgCode($obj) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.ID = $obj.ID;
            this.code = $obj.code;
            this.text = $obj.text;
            this.region0 = $obj.region0;
            this.time = $obj.time;
            this.onTop = $obj.onTop;
        }
        TB_msgCode.get_TB_msgCodeById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_msgCode, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_msgCode.get_TB_msgCodeByCode = function (code) {
            if (this._codeObj[code]) {
                return this._codeObj[code];
            }
            var ary = TB_msgCode.get_TB_msgCode('code', code);
            return ary && ary.length > 0 ? ary[0] : null;
        };
        TB_msgCode.get_TB_msgCode = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_msgCode);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_msgCode._codeObj = {};
        return TB_msgCode;
    }());
    tb.TB_msgCode = TB_msgCode;
    var TB_game_set = /** @class */ (function () {
        function TB_game_set() {
        }
        TB_game_set.prototype.selectAttrItem = function (key) {
            var temp = null;
            for (var i = 0; i < this.attr_para.length; i++) {
                temp = this.attr_para[i];
                if (temp && temp[0] == key) {
                    return temp[1];
                }
            }
            return 0;
        };
        TB_game_set.get_TB_game_setById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_game_set, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_game_set.get_TB_game_set = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_game_set);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        /** 获得buff */
        TB_game_set.getBuffByAttr = function (attr) {
            var $obj = TableData.getInstance().getData(TableData.tb_game_set, 1);
            for (var i = 0; i < $obj.attr_buff.length; i++) {
                var element = $obj.attr_buff[i];
                if (element[0] == attr) {
                    return element[1];
                }
            }
            logerror("--------tb error-------缺少数据配置");
            return -1;
        };
        /** 获取每次好友赠送的友情点配置 */
        TB_game_set.getFriendPonit = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_game_set, 1);
            var arr = $obj.friend_once_reward[0];
            return parseInt(arr[1]);
        };
        /** 获取每日获得的友情点上限 */
        TB_game_set.getMaxFriendPonit = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_game_set, 1);
            return $obj.friend_point_max;
        };
        /** 获取最大好友上限 */
        TB_game_set.getMaxfriendNum = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_game_set, 1);
            return $obj.friend_max;
        };
        /**获取最大英雄上限 */
        TB_game_set.getMaxGodsNum = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_game_set, 1);
            return $obj.limit_god;
        };
        return TB_game_set;
    }());
    tb.TB_game_set = TB_game_set;
    var TB_buff = /** @class */ (function () {
        function TB_buff() {
        }
        TB_buff.get_TB_buffById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_buff, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_buff.get_TB_buff = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_buff);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_buff;
    }());
    tb.TB_buff = TB_buff;
    var TB_skill_effect = /** @class */ (function () {
        function TB_skill_effect() {
        }
        TB_skill_effect.get_TB_skill_effectById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_effect, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_skill_effect.get_TB_skill_effect = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_skill_effect);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_skill_effect;
    }());
    tb.TB_skill_effect = TB_skill_effect;
    var TB_skill_set = /** @class */ (function () {
        function TB_skill_set() {
        }
        TB_skill_set.getSkillSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_set, 1);
            var $vo = $obj;
            return $vo;
        };
        return TB_skill_set;
    }());
    tb.TB_skill_set = TB_skill_set;
    var TB_buff_effect = /** @class */ (function () {
        function TB_buff_effect() {
        }
        TB_buff_effect.get_TB_buff_effectById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_buff_effect, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_buff_effect.get_TB_buff_effect = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_buff_effect);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_buff_effect;
    }());
    tb.TB_buff_effect = TB_buff_effect;
    var TB_trial = /** @class */ (function () {
        function TB_trial() {
        }
        TB_trial.get_TB_trialById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_trial, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_trial.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        return TB_trial;
    }());
    tb.TB_trial = TB_trial;
    var TB_copy = /** @class */ (function () {
        function TB_copy() {
        }
        /**获取副本奖励 */
        TB_copy.prototype.getRewardItems = function () {
            var _this = this;
            if (!this._rewardItems) {
                this._rewardItems = new Array();
                this.reward_preview.forEach(function (item, index, arr) {
                    _this._rewardItems.push(TB_item.get_TB_itemById(item));
                });
            }
            return this._rewardItems;
        };
        TB_copy.initAllCopy = function () {
            if (!TB_copy.zhuxianFuben) {
                TB_copy.zhuxianFuben = new Array();
                TB_copy.fuwenFuben = new Array();
                TB_copy.dixiaFuben = new Array();
                TB_copy.shilianFuben = new Array();
                var $obj = TableData.getInstance().getTableByName(TableData.tb_copy);
                for (var $key in $obj.data) {
                    var $vo = $obj.data[$key];
                    switch ($vo.type) {
                        case iface.tb_prop.copyTypeKey.main:
                            TB_copy.zhuxianFuben.push($vo);
                            break;
                        case iface.tb_prop.copyTypeKey.rune:
                            TB_copy.fuwenFuben.push($vo);
                            break;
                        case iface.tb_prop.copyTypeKey.underground:
                            if ($vo.ID == 2002 || $vo.ID == 2004)
                                TB_copy.dixiaFuben.push($vo);
                            break;
                        case iface.tb_prop.copyTypeKey.tower:
                            TB_copy.shilianFuben.push($vo);
                            break;
                    }
                }
            }
        };
        TB_copy.get_TB_copyById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_copy, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_copy.get_TB_copy = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_copy);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_copy;
    }());
    tb.TB_copy = TB_copy;
    var TB_copy_info = /** @class */ (function () {
        function TB_copy_info() {
            //章节
            this._chapter = -1;
        }
        /** 获取开启前置条件值 */
        TB_copy_info.prototype.getConditionVal = function (type) {
            var conditionsAry = this.precondition ? this.precondition : [];
            for (var _i = 0, conditionsAry_1 = conditionsAry; _i < conditionsAry_1.length; _i++) {
                var ary = conditionsAry_1[_i];
                if (Number(ary[0]) == type) {
                    return Number(ary[1]);
                }
            }
            return 0;
        };
        /**获取副本奖励 */
        TB_copy_info.prototype.getRewardShowItems = function () {
            if (!this._rewardShowItems) {
                this._rewardShowItems = new Array();
                for (var i = 0; this.reward_show && i < this.reward_show.length; i++) {
                    var propid = this.reward_show[i];
                    var itemVo = App.hero.createItemVo(0, propid);
                    this._rewardShowItems.push(itemVo);
                }
            }
            return this._rewardShowItems;
        };
        TB_copy_info.prototype.getRewardItems = function () {
            if (!this._rewardItems) {
                this._rewardItems = [];
                if (this.reward) {
                    for (var i = 0; i < this.reward.length; i++) {
                        var itemVo = App.hero.createItemVo(this.reward[i][1], this.reward[i][0]);
                        this._rewardItems.push(itemVo);
                    }
                }
            }
            return this._rewardItems;
        };
        TB_copy_info.prototype.getMonsters = function () {
            if (!this._monsters) {
                this._monsters = new Array();
                this.monstersModels = new Array();
                for (var i = 0; i < this.monster.length; i++) {
                    for (var j = 0; j < this.monster[i].length; j++) {
                        var item = this.monster[i][j];
                        if (item != 0) {
                            var itemVo = TB_monster.get_TB_monsterById(item);
                            this._monsters.push(itemVo);
                            this.monstersModels.push(itemVo.model);
                        }
                    }
                }
            }
            return this._monsters;
        };
        TB_copy_info.prototype.getAllMonsters = function () {
            if (!this._allmonster) {
                this._allmonster = new Array();
                for (var i = 0; i < this.monster.length; i++) {
                    for (var j = 0; j < this.monster[i].length; j++) {
                        var item = this.monster[i][j];
                        if (item != 0) {
                            var itemVo = TB_monster.get_TB_monsterById(item);
                            this._allmonster.push(itemVo);
                        }
                        else {
                            this._allmonster.push(null);
                        }
                    }
                }
            }
            return this._allmonster;
        };
        TB_copy_info.prototype.getIconMonster = function () {
            if (!this._showIconMonsters) {
                this._showIconMonsters = new Array();
                for (var i = 0; i < this.show_icon.length; i++) {
                    var item = this.show_icon[i];
                    if (item != 0) {
                        var itemVo = TB_monster.get_TB_monsterById(item);
                        this._showIconMonsters.push(itemVo);
                    }
                }
            }
            return this._showIconMonsters;
        };
        TB_copy_info.get_TB_copy_infoById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_copy_info, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_copy_info.get_TB_copy_info = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_copy_info);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_copy_info.prototype.getChapter = function () {
            if (this._chapter == -1) {
                var tbcopy = tb.TB_copy.get_TB_copyById(this.area);
                this._chapter = tbcopy ? tbcopy.chapter : 0;
            }
            return this._chapter;
        };
        return TB_copy_info;
    }());
    tb.TB_copy_info = TB_copy_info;
    var TB_plot = /** @class */ (function () {
        function TB_plot() {
        }
        TB_plot.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_plot, id);
            return $obj;
        };
        return TB_plot;
    }());
    tb.TB_plot = TB_plot;
    var TB_daily_copy = /** @class */ (function () {
        function TB_daily_copy() {
        }
        TB_daily_copy.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_daily_copy, id);
            return $obj;
        };
        TB_daily_copy.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        return TB_daily_copy;
    }());
    tb.TB_daily_copy = TB_daily_copy;
    var TB_expedition = /** @class */ (function () {
        function TB_expedition() {
        }
        TB_expedition.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_expedition, id);
            return $obj;
        };
        TB_expedition.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_expedition.prototype.getSpecialList = function () {
            var _this = this;
            if (!this._specialList) {
                this._specialList = [];
                if (this.special) {
                    this.special.forEach(function (ary) {
                        _this._specialList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._specialList;
        };
        TB_expedition.prototype.getBoxRewardList = function () {
            var _this = this;
            if (!this._boxRewards) {
                this._boxRewards = [];
                if (this.box) {
                    this.box.forEach(function (ary) {
                        _this._boxRewards.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._boxRewards;
        };
        return TB_expedition;
    }());
    tb.TB_expedition = TB_expedition;
    var TB_copy_set = /** @class */ (function () {
        function TB_copy_set() {
        }
        TB_copy_set.getCopySet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_copy_set, 1);
            return $obj;
        };
        return TB_copy_set;
    }());
    tb.TB_copy_set = TB_copy_set;
    /**合成表 */
    var TB_exchange = /** @class */ (function () {
        function TB_exchange() {
        }
        TB_exchange.get_TB_exchangeById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_exchange, $id);
            var $vo = $obj;
            return $vo;
        };
        return TB_exchange;
    }());
    tb.TB_exchange = TB_exchange;
    var TB_item = /** @class */ (function () {
        function TB_item() {
            this.isFirst = false;
            this.show = true;
            this.showNum = true;
        }
        TB_item.prototype.firstFlag = function () {
            return this.isFirst;
        };
        TB_item.prototype.getShow = function () {
            return this.show;
        };
        TB_item.prototype.getStar = function () {
            return this.icon[3] ? this.icon[3] : 0;
        };
        TB_item.prototype.isMoreThanSix = function () {
            return false;
        };
        //获取图片路径
        TB_item.prototype.getIconUrl = function () {
            return SkinUtil.getItemIcon(this);
        };
        //显示动画
        TB_item.prototype.isStartAction = function () {
            return false;
        };
        //获取品质
        TB_item.prototype.getQulity = function () {
            return SkinUtil.getBoxQulityIcon(this.quality);
        };
        //获取数量
        TB_item.prototype.getNum = function () {
            return this.showNum ? App.hero.getBagItemNum(this.ID.toString()) : 0;
        };
        //获取消耗数量
        TB_item.prototype.getConstNum = function () {
            return this.constnum;
        };
        //是否碎片
        TB_item.prototype.isChip = function () {
            return this.icon && this.icon[1] > 0;
        };
        TB_item.prototype.getChipSkin = function () {
            return this.icon && this.icon[1] == 2 ? SkinUtil.chip_godSkin : SkinUtil.chip_normal;
        };
        TB_item.prototype.showRace = function () {
            return this.icon[2] ? this.icon[2] : 0;
        };
        TB_item.prototype.getExtParm = function () {
            return null;
        };
        TB_item.get_TB_itemById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_item, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_item.get_TB_item = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_item);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_item;
    }());
    tb.TB_item = TB_item;
    var TB_optional = /** @class */ (function () {
        function TB_optional() {
        }
        TB_optional.get_TB_ById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_optional, $id);
            var $vo = $obj;
            return $vo;
        };
        return TB_optional;
    }());
    tb.TB_optional = TB_optional;
    var TB_monster = /** @class */ (function () {
        function TB_monster() {
        }
        TB_monster.prototype.getAttrType = function () {
            return this.attr_type;
        };
        TB_monster.prototype.getName = function () {
            return this.name;
        };
        TB_monster.prototype.getLevel = function () {
            return this.level;
        };
        TB_monster.prototype.getStar = function () {
            return this.star;
        };
        TB_monster.prototype.isAwaken = function () {
            return false;
        };
        TB_monster.prototype.isMoreThanSix = function () {
            return this.star >= 6;
        };
        TB_monster.prototype.getType = function () {
            return "null";
        };
        TB_monster.prototype.getDataType = function () {
            return 1;
        };
        TB_monster.prototype.getRaceType = function () {
            return this.race_type;
        };
        TB_monster.prototype.getQulity = function () {
            var starLv = this.star >= 6 ? 6 : this.star;
            return SkinUtil.getBoxQulityIcon(starLv);
        };
        TB_monster.prototype.getIconUrl = function () {
            return SkinUtil.getHeadIcon(this.icon);
        };
        TB_monster.prototype.getFrameUrl = function () {
            return SkinUtil.getBoxQulityIcon(this.quality);
        };
        TB_monster.prototype.jisuanjineng = function () {
            var ary = new Array;
            var tempvo;
            for (var i = 0; i < this.skill.length; i++) {
                ary.push(tb.TB_skill.get_TB_skillById(this.skill[i]));
            }
            ;
            return ary;
        };
        //根据当前星级修正真实技能id
        TB_monster.prototype.getSkillList = function () {
            return this.skill.map(function (skilid) {
                return [skilid, 0];
            });
        };
        TB_monster.prototype.getProperty = function () {
            return this.attr;
        };
        /** 获取属性值 */
        TB_monster.prototype.getPropValByType = function (type) {
            var result = this.attr.find(function (ary) {
                return ary[0] == type;
            });
            return Number(result[1]);
        };
        TB_monster.prototype.getShenli = function () {
            return 0;
        };
        TB_monster.get_TB_monsterById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_monster, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_monster.get_TB_monster = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_monster);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_monster;
    }());
    tb.TB_monster = TB_monster;
    var TB_god_evolution = /** @class */ (function () {
        function TB_god_evolution() {
        }
        TB_god_evolution.get_TB_god_evolutionById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_god_evolution, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_god_evolution.get_TB_god_evolutionAtMaxID = function () {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god_evolution).data;
            var vaule = null;
            for (var key in $obj) {
                if ($obj[key]) {
                    vaule = $obj[key];
                }
            }
            return vaule;
        };
        TB_god_evolution.get_TB_god_evolution = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god_evolution);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_god_evolution;
    }());
    tb.TB_god_evolution = TB_god_evolution;
    var TB_god_star = /** @class */ (function () {
        function TB_god_star() {
        }
        TB_god_star.get_TB_god_starById = function (id) {
            return TableData.getInstance().getData(TableData.tb_god_star, id);
        };
        TB_god_star.get_TB_god_star = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god_star);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_god_star.prototype.getGodMaterialList = function () {
            var _this = this;
            if (!this._godMaterialList) {
                this._godMaterialList = [];
                if (this.material) {
                    this.material.forEach(function (ary) {
                        _this._godMaterialList.push({ type: ary[0], race: ary[1], godId: ary[1], starLv: ary[2], count: ary[3] });
                    });
                }
            }
            return this._godMaterialList;
        };
        return TB_god_star;
    }());
    tb.TB_god_star = TB_god_star;
    /** 英雄缘分系统表 */
    var TB_god_fate = /** @class */ (function () {
        function TB_god_fate() {
        }
        TB_god_fate.get_TB_god_fateById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_god_fate, $id);
            return $obj;
        };
        TB_god_fate.get_TB_god_fate = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_god_fate);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_god_fate;
    }());
    tb.TB_god_fate = TB_god_fate;
    /**英雄融魂表 */
    var TB_fusion_soul = /** @class */ (function () {
        function TB_fusion_soul() {
        }
        TB_fusion_soul.get_TB_fusion_soulById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_fusion_soul, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_fusion_soul.get_TB_fusion_soul = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_fusion_soul);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        /** 获取单次消耗的 */
        TB_fusion_soul.prototype.getOnceCost = function (type) {
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                return this.cost_hp[0][1];
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                return this.cost_atk[0][1];
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                return this.cost_def[0][1];
            }
            return 0;
        };
        /** 获取属性上限 */
        TB_fusion_soul.prototype.getMaxAttr = function (type) {
            for (var _i = 0, _a = this.attr_max; _i < _a.length; _i++) {
                var ary = _a[_i];
                if (ary[0] == type) {
                    return ary[1];
                }
            }
            return 0;
        };
        /** 获取等级上限 */
        TB_fusion_soul.prototype.getMaxLv = function (type) {
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                return this.hp_max;
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                return this.atk_max;
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                return this.def_max;
            }
            return 0;
        };
        /** 获取单次增加的属性值 */
        TB_fusion_soul.prototype.getOnceAdd = function (type) {
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                return this.add_hp;
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                return this.add_atk;
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                return this.add_def;
            }
            return 0;
        };
        return TB_fusion_soul;
    }());
    tb.TB_fusion_soul = TB_fusion_soul;
    var TB_wish = /** @class */ (function () {
        function TB_wish() {
        }
        TB_wish.get_TB_wishById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_wish, $id);
            var $vo = $obj;
            return $vo;
        };
        TB_wish.get_TB_wish = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_wish);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_wish;
    }());
    tb.TB_wish = TB_wish;
    var TB_wish_set = /** @class */ (function () {
        function TB_wish_set() {
        }
        TB_wish_set.get_TB_wish_set = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_wish_set, 1);
            var $vo = $obj;
            return $vo;
        };
        /** 获取每日免费次数 */
        TB_wish_set.getFreeNum = function () {
            var item = tb.TB_wish_set.get_TB_wish_set();
            return item.free_num;
        };
        /** 获取最大次数 */
        TB_wish_set.getMaxNum = function () {
            var item = tb.TB_wish_set.get_TB_wish_set();
            return item.max_num;
        };
        return TB_wish_set;
    }());
    tb.TB_wish_set = TB_wish_set;
    /** 主线任务 */
    var TB_task = /** @class */ (function () {
        function TB_task() {
        }
        TB_task.getTaskById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_task, id);
            return $obj;
        };
        TB_task.getTaskListByType = function (type) {
            var table = TableData.getInstance().getTableByName(TableData.tb_task).data;
            var list = [];
            for (var id in table) {
                var task = table[id];
                if (task.type == type) {
                    list.push(task);
                }
            }
            return list;
        };
        TB_task.getAchievementListByType = function (lbType, subLbType) {
            if (subLbType === void 0) { subLbType = 0; }
            var table = TableData.getInstance().getTableByName(TableData.tb_task).data;
            var list = [];
            for (var id in table) {
                var task = table[id];
                if (task.type == iface.tb_prop.taskTypeKey.achievement && task.label == lbType && task.sub_label == subLbType) {
                    list.push(task);
                }
            }
            return list;
        };
        return TB_task;
    }());
    tb.TB_task = TB_task;
    /** 挑战任务的主标签 */
    var TB_task_title = /** @class */ (function () {
        function TB_task_title() {
        }
        TB_task_title.getCfgById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_task_title, id);
            return $obj;
        };
        return TB_task_title;
    }());
    tb.TB_task_title = TB_task_title;
    /** 日常任务 */
    var TB_daily = /** @class */ (function () {
        function TB_daily() {
        }
        TB_daily.getTaskById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_daily, id);
            return $obj;
        };
        return TB_daily;
    }());
    tb.TB_daily = TB_daily;
    /** 日常任务活跃任务 */
    var TB_daily_reward = /** @class */ (function () {
        function TB_daily_reward() {
        }
        TB_daily_reward.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_daily_reward, id);
            return $obj;
        };
        TB_daily_reward.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        return TB_daily_reward;
    }());
    tb.TB_daily_reward = TB_daily_reward;
    /** 集市商品 */
    var TB_market = /** @class */ (function () {
        function TB_market() {
        }
        TB_market.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_market, id);
            return $obj;
        };
        return TB_market;
    }());
    tb.TB_market = TB_market;
    /** 集市商品 */
    var TB_market_set = /** @class */ (function () {
        function TB_market_set() {
        }
        TB_market_set.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_market_set, id);
            return $obj;
        };
        /** 获取每日刷新次数 */
        TB_market_set.getMaxNum = function () {
            var item = tb.TB_market_set.getItemById(1);
            return item.max_num;
        };
        /** 获取刷新消耗 */
        TB_market_set.getCostDiamond = function () {
            var item = tb.TB_market_set.getItemById(1);
            return item.cost_diamond;
        };
        return TB_market_set;
    }());
    tb.TB_market_set = TB_market_set;
    /** 英雄评价模板 */
    var TB_evaluation = /** @class */ (function () {
        function TB_evaluation() {
        }
        TB_evaluation.get_TB_evaluationById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_evaluation, id);
            return $obj;
        };
        return TB_evaluation;
    }());
    tb.TB_evaluation = TB_evaluation;
    var TB_rune = /** @class */ (function () {
        function TB_rune() {
        }
        TB_rune.get_TB_runeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rune, id);
            return $obj;
        };
        return TB_rune;
    }());
    tb.TB_rune = TB_rune;
    var TB_rune_prefix = /** @class */ (function () {
        function TB_rune_prefix() {
        }
        TB_rune_prefix.get_TB_rune_prefixById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rune_prefix, id);
            return $obj;
        };
        return TB_rune_prefix;
    }());
    tb.TB_rune_prefix = TB_rune_prefix;
    var TB_rune_strength = /** @class */ (function () {
        function TB_rune_strength() {
        }
        TB_rune_strength.get_TB_rune_strengthById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rune_strength, id);
            return $obj;
        };
        return TB_rune_strength;
    }());
    tb.TB_rune_strength = TB_rune_strength;
    var TB_rune_set = /** @class */ (function () {
        function TB_rune_set() {
        }
        TB_rune_set.get_TB_rune_setById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rune_set, id);
            return $obj;
        };
        return TB_rune_set;
    }());
    tb.TB_rune_set = TB_rune_set;
    var TB_rune_suit = /** @class */ (function () {
        function TB_rune_suit() {
        }
        TB_rune_suit.get_TB_rune_suitById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rune_suit, id);
            return $obj;
        };
        TB_rune_suit.get_TB_rune = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_rune_suit);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_rune_suit;
    }());
    tb.TB_rune_suit = TB_rune_suit;
    /* 随机名字库 */
    var TB_random_name = /** @class */ (function () {
        function TB_random_name() {
        }
        /**
         * 根据性别获得一个随机的名字
         * @param sex null:随机性别,0:男,1女
         */
        TB_random_name.getRandomName = function (sex) {
            if (this.familyNames.length == 0) {
                var tb_random_name = TableData.getInstance().getTableByName(TableData.tb_random_name).data;
                for (var key in tb_random_name) {
                    var info = tb_random_name[key];
                    if (info.xing !== '') {
                        TB_random_name.familyNames.push(info.xing);
                    }
                    if (info.boy_name !== '') {
                        TB_random_name.boyNames.push(info.boy_name);
                    }
                    if (info.girl_name !== '') {
                        TB_random_name.girlNames.push(info.girl_name);
                    }
                }
            }
            var familyName = this.familyNames[utils.random(0, this.familyNames.length - 1)];
            var firstName = null;
            if (!sex) {
                sex = utils.random(0, 1);
            }
            if (sex === 0) {
                firstName = this.boyNames[utils.random(0, this.boyNames.length - 1)];
            }
            else {
                firstName = this.girlNames[utils.random(0, this.girlNames.length - 1)];
            }
            return familyName + firstName;
        };
        TB_random_name.familyNames = [];
        TB_random_name.boyNames = [];
        TB_random_name.girlNames = [];
        return TB_random_name;
    }());
    tb.TB_random_name = TB_random_name;
    /** Npc挑战列表 */
    var TB_arena_npc = /** @class */ (function () {
        function TB_arena_npc() {
        }
        TB_arena_npc.get_TB_arena_npcById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_arena_npc, id);
            return $obj;
        };
        TB_arena_npc.get_TB_arena_npc = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_arena_npc);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_arena_npc;
    }());
    tb.TB_arena_npc = TB_arena_npc;
    /**名次和所需积分 */
    var TB_arena_rank = /** @class */ (function () {
        function TB_arena_rank() {
        }
        TB_arena_rank.get_TB_arena_rankById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_arena_rank, id);
            return $obj;
        };
        TB_arena_rank.get_TB_arena_rank = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_arena_rank);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_arena_rank;
    }());
    tb.TB_arena_rank = TB_arena_rank;
    /**段位奖励 */
    var TB_rank_score = /** @class */ (function () {
        function TB_rank_score() {
        }
        TB_rank_score.get_TB_rank_scoreById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_rank_score, id);
            return $obj;
        };
        TB_rank_score.get_TB_rank_score = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_rank_score);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_rank_score;
    }());
    tb.TB_rank_score = TB_rank_score;
    /**商店/荣誉商店 */
    var TB_goods = /** @class */ (function () {
        function TB_goods() {
        }
        TB_goods.get_TB_goodsById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_goods, id);
            return $obj;
        };
        TB_goods.get_TB_goods = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_goods);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_goods.get_TB_goodsByType = function (type, label) {
            if (label === void 0) { label = 0; }
            var $goodsobj = TableData.getInstance().getTableByName(TableData.tb_goods).data;
            var $obj = [];
            for (var i in $goodsobj) {
                if ($goodsobj[i].type === type) {
                    if ($goodsobj[i].label === label)
                        $obj.push($goodsobj[i]);
                }
            }
            $obj.sort(function (obja, objb) {
                return obja.rank - objb.rank;
            });
            return $obj;
        };
        return TB_goods;
    }());
    tb.TB_goods = TB_goods;
    /**公会升级所需经验/人数上限 */
    var TB_guild = /** @class */ (function () {
        function TB_guild() {
        }
        TB_guild.get_TB_guildById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild, id);
            return $obj;
        };
        TB_guild.get_TB_guild = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_guild);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_guild;
    }());
    tb.TB_guild = TB_guild;
    /** 公会图标 */
    var TB_guild_icon = /** @class */ (function () {
        function TB_guild_icon() {
        }
        TB_guild_icon.get_TB_guild_iconById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_icon, id);
            return $obj;
        };
        TB_guild_icon.get_TB_guild_icon = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array();
            var $obj = TableData.getInstance().getTableByName(TableData.tb_guild_icon);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_guild_icon;
    }());
    tb.TB_guild_icon = TB_guild_icon;
    /** 公会技能 */
    var TB_guild_skill = /** @class */ (function () {
        function TB_guild_skill() {
        }
        TB_guild_skill.get_TB_guild_skillById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_skill, id);
            return $obj;
        };
        TB_guild_skill.getTbByParam = function (godType, attrType, level) {
            var key = godType * 1000 + attrType * 100 + level;
            return TB_guild_skill.get_TB_guild_skillById(key);
        };
        TB_guild_skill.get_TB_guild_skill = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array();
            var $obj = TableData.getInstance().getTableByName(TableData.tb_guild_skill);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_guild_skill;
    }());
    tb.TB_guild_skill = TB_guild_skill;
    /**公会签到奖励 */
    var TB_guild_sign = /** @class */ (function () {
        function TB_guild_sign() {
        }
        TB_guild_sign.get_TB_guild_signById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_sign, id);
            return $obj;
        };
        TB_guild_sign.get_TB_guild_signMaxId = function () {
            return this.get_TB_guild_signById(this.get_TB_guild_sign().length);
        };
        TB_guild_sign.get_TB_guild_sign = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_guild_sign);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_guild_sign;
    }());
    tb.TB_guild_sign = TB_guild_sign;
    /**公会限制信息 */
    var TB_guild_set = /** @class */ (function () {
        function TB_guild_set() {
        }
        TB_guild_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_set, 1);
            return $obj;
        };
        return TB_guild_set;
    }());
    tb.TB_guild_set = TB_guild_set;
    var TB_guild_donate = /** @class */ (function () {
        function TB_guild_donate() {
        }
        TB_guild_donate.getItemnById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_donate, id);
            return $obj;
        };
        return TB_guild_donate;
    }());
    tb.TB_guild_donate = TB_guild_donate;
    var TB_guild_help = /** @class */ (function () {
        function TB_guild_help() {
        }
        TB_guild_help.getItemnById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_help, id);
            return $obj;
        };
        TB_guild_help.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach(function (ary) {
                        var vo = new ItemVo(Number(ary[0]), Number(ary[1]));
                        vo.show = false;
                        _this._rewardList.push(vo);
                    });
                }
            }
            return this._rewardList;
        };
        TB_guild_help.getList = function (selectkey, selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if (selectValue === void 0) { selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_guild_help).data;
            for (var key in obj) {
                if (selectkey != null) {
                    if (obj[key][selectkey] == selectValue) {
                        arr.push(obj[key]);
                    }
                }
                else {
                    arr.push(obj[key]);
                }
            }
            return arr;
        };
        return TB_guild_help;
    }());
    tb.TB_guild_help = TB_guild_help;
    var TB_guild_copy = /** @class */ (function () {
        function TB_guild_copy() {
        }
        TB_guild_copy.prototype.getName = function () {
            return LanMgr.getLan('', 10030, (this.index + 1));
        };
        TB_guild_copy.prototype.getMonterId = function () {
            var monsterId = this.moster.find(function (id) {
                return Number(id) != 0;
            });
            return monsterId;
        };
        TB_guild_copy.getItemnById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_guild_copy, id);
            return $obj;
        };
        TB_guild_copy.getListByChapter = function (chapter) {
            var list = [];
            var tbCopy = TableData.getInstance().getTableByName(TableData.tb_guild_copy).data;
            for (var id in tbCopy) {
                var num = Math.floor(parseInt(id) / 10);
                if (num == chapter) {
                    list.push(tbCopy[id]);
                }
            }
            return list;
        };
        TB_guild_copy.getList = function (selectkey, selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if (selectValue === void 0) { selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_guild_copy).data;
            for (var key in obj) {
                if (selectkey != null) {
                    if (obj[key][selectkey] == selectValue) {
                        arr.push(obj[key]);
                    }
                }
                else {
                    arr.push(obj[key]);
                }
            }
            return arr;
        };
        return TB_guild_copy;
    }());
    tb.TB_guild_copy = TB_guild_copy;
    var TB_copy_reward = /** @class */ (function () {
        function TB_copy_reward() {
        }
        TB_copy_reward.getItemnById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_copy_reward, id);
            return $obj;
        };
        return TB_copy_reward;
    }());
    tb.TB_copy_reward = TB_copy_reward;
    /**首充奖励 */
    var TB_first_recharge = /** @class */ (function () {
        function TB_first_recharge() {
        }
        TB_first_recharge.get_TB_first_rechargeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_first_recharge, id);
            return $obj;
        };
        TB_first_recharge.get_TB_first_recharge = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_first_recharge);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_first_recharge;
    }());
    tb.TB_first_recharge = TB_first_recharge;
    /**等级礼包 */
    var TB_level = /** @class */ (function () {
        function TB_level() {
        }
        TB_level.get_TB_levelById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_level, id);
            return $obj;
        };
        TB_level.get_TB_level = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_level);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_level;
    }());
    tb.TB_level = TB_level;
    /**签到奖励 */
    var TB_day_sign = /** @class */ (function () {
        function TB_day_sign() {
        }
        TB_day_sign.get_TB_day_signById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_day_sign, id);
            return $obj;
        };
        TB_day_sign.get_TB_day_sign = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_day_sign);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_day_sign;
    }());
    tb.TB_day_sign = TB_day_sign;
    /**累计签到奖励 */
    var TB_total_sign = /** @class */ (function () {
        function TB_total_sign() {
        }
        TB_total_sign.get_TB_total_signById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_total_sign, id);
            return $obj;
        };
        TB_total_sign.get_TB_total_sign = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_total_sign);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_total_sign;
    }());
    tb.TB_total_sign = TB_total_sign;
    /** 每日礼包 */
    var TB_daily_recharge = /** @class */ (function () {
        function TB_daily_recharge() {
        }
        TB_daily_recharge.get_TB_ById = function (id) {
            var obj = TableData.getInstance().getData(TableData.tb_daily_recharge, id);
            return obj;
        };
        TB_daily_recharge.getTBByRechargeId = function (id) {
            var ary = TB_daily_recharge.getAllTB();
            return ary.find(function (vo) {
                return vo.recharge_id == id;
            });
        };
        TB_daily_recharge.getAllTB = function () {
            var arr = new Array;
            var obj = TableData.getInstance().getTableByName(TableData.tb_daily_recharge);
            for (var $key in obj.data) {
                arr.push(obj.data[$key]);
            }
            return arr;
        };
        /** 获取所有的充值ID */
        TB_daily_recharge.getAllRecharges = function () {
            var ids = [];
            var ary = TB_daily_recharge.getAllTB();
            for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                var tbVo = ary_1[_i];
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        };
        TB_daily_recharge.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach(function (ary) {
                        _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        };
        return TB_daily_recharge;
    }());
    tb.TB_daily_recharge = TB_daily_recharge;
    /** 每周礼包 */
    var TB_week_recharge = /** @class */ (function () {
        function TB_week_recharge() {
        }
        TB_week_recharge.get_TB_ById = function (id) {
            var obj = TableData.getInstance().getData(TableData.tb_week_recharge, id);
            return obj;
        };
        TB_week_recharge.getTBByRechargeId = function (id) {
            var ary = TB_week_recharge.getAllTB();
            return ary.find(function (vo) {
                return vo.recharge_id == id;
            });
        };
        TB_week_recharge.getAllTB = function () {
            var arr = new Array;
            var obj = TableData.getInstance().getTableByName(TableData.tb_week_recharge);
            for (var $key in obj.data) {
                arr.push(obj.data[$key]);
            }
            return arr;
        };
        /** 获取所有的充值ID */
        TB_week_recharge.getAllRecharges = function () {
            var ids = [];
            var ary = TB_week_recharge.getAllTB();
            for (var _i = 0, ary_2 = ary; _i < ary_2.length; _i++) {
                var tbVo = ary_2[_i];
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        };
        TB_week_recharge.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach(function (ary) {
                        _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        };
        return TB_week_recharge;
    }());
    tb.TB_week_recharge = TB_week_recharge;
    /** 每月礼包 */
    var TB_month_recharge = /** @class */ (function () {
        function TB_month_recharge() {
        }
        TB_month_recharge.get_TB_ById = function (id) {
            var obj = TableData.getInstance().getData(TableData.tb_month_recharge, id);
            return obj;
        };
        TB_month_recharge.getTBByRechargeId = function (id) {
            var ary = TB_month_recharge.getAllTB();
            return ary.find(function (vo) {
                return vo.recharge_id == id;
            });
        };
        TB_month_recharge.getAllTB = function () {
            var arr = new Array;
            var obj = TableData.getInstance().getTableByName(TableData.tb_month_recharge);
            for (var $key in obj.data) {
                arr.push(obj.data[$key]);
            }
            return arr;
        };
        /** 获取所有的充值ID */
        TB_month_recharge.getAllRecharges = function () {
            var ids = [];
            var ary = TB_month_recharge.getAllTB();
            for (var _i = 0, ary_3 = ary; _i < ary_3.length; _i++) {
                var tbVo = ary_3[_i];
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        };
        TB_month_recharge.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach(function (ary) {
                        _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        };
        return TB_month_recharge;
    }());
    tb.TB_month_recharge = TB_month_recharge;
    /**七日签到奖励 */
    var TB_sevendays = /** @class */ (function () {
        function TB_sevendays() {
        }
        TB_sevendays.get_TB_sevendaysById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_sevendays, id);
            return $obj;
        };
        TB_sevendays.get_TB_sevendays = function (type) {
            if (type === void 0) { type = 1; }
            if (!this._allSevenTypes) {
                this._allSevenTypes = [];
                var $obj = TableData.getInstance().getTableByName(TableData.tb_sevendays);
                for (var $key in $obj.data) {
                    var $vo = $obj.data[$key];
                    var index = Math.floor(($vo.ID - 1) / this.TYPE_DAYS);
                    if (!this._allSevenTypes[index]) {
                        this._allSevenTypes[index] = [];
                    }
                    this._allSevenTypes[index].push($vo);
                }
            }
            var idx = type - 1;
            if (idx < 0)
                return [];
            return this._allSevenTypes[idx];
        };
        TB_sevendays.TYPE_DAYS = 7;
        TB_sevendays.TYPE_NUM = 2;
        return TB_sevendays;
    }());
    tb.TB_sevendays = TB_sevendays;
    /**七日活动时间 */
    var TB_sevendays_times = /** @class */ (function () {
        function TB_sevendays_times() {
        }
        TB_sevendays_times.getActivityOpenId = function () {
            //创角第几天
            var crt = Math.floor((App.serverTime - App.hero.getCreateDayTiem()) / TimeConst.ONE_DAY_MILSEC) + 1;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_sevendays_time);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                if (crt >= $vo.time[0] && crt <= $vo.time[1]) {
                    return $vo.ID;
                }
            }
            return -1;
        };
        TB_sevendays_times.getIdx = function (createday) {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_sevendays_time);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                if (createday >= $vo.time[0] && createday <= $vo.time[1]) {
                    return createday - $vo.time[0];
                }
            }
            return -1;
        };
        TB_sevendays_times.getEndTime = function (createday) {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_sevendays_time);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                if (createday >= $vo.time[0] && createday <= $vo.time[1]) {
                    return $vo.time[1];
                }
            }
            return -1;
        };
        return TB_sevendays_times;
    }());
    tb.TB_sevendays_times = TB_sevendays_times;
    /**竞技场（新） */
    var TB_arena_new = /** @class */ (function () {
        function TB_arena_new() {
        }
        TB_arena_new.get_TB_arena_newById = function (id) {
            return TableData.getInstance().getData(TableData.tb_arena_new, id);
        };
        TB_arena_new.get_TB_arena_new = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_arena_new);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        /**是否是前三 */
        TB_arena_new.prototype.isBeforeThree = function () {
            return !this.rank.some(function (rank) { return rank > 3; }) && this.rank[0] == this.rank[1];
        };
        /**名次描述 */
        TB_arena_new.prototype.getRankText = function () {
            return this.isBeforeThree() ? "" : this.rank[0] + "-" + this.rank[1];
        };
        TB_arena_new.prototype.getRankSkin = function () {
            var rank = Number(this.rank[0]);
            return SkinUtil.getRankingSkin(rank - 1);
        };
        TB_arena_new.prototype.getRank = function () {
            return Number(this.rank[0]) == Number(this.rank[1]) ? Number(this.rank[0]) : 999;
        };
        TB_arena_new.prototype.getRankStr = function () {
            if (!this._rankStr) {
                this._rankStr = this.rank[0] == this.rank[1] ? "" + this.rank[0] : this.rank[0] + "-" + this.rank[1];
            }
            return this._rankStr;
        };
        TB_arena_new.prototype.getRewardList = function () {
            if (!this._rewards)
                this._rewards = this.reward.map(function (item) { return new ItemVo(item[0], item[1]); });
            return this._rewards;
        };
        return TB_arena_new;
    }());
    tb.TB_arena_new = TB_arena_new;
    /**竞技场NPC（新) */
    var TB_arena_new_npc = /** @class */ (function () {
        function TB_arena_new_npc() {
            this.level = 1;
            this.head = Math.ceil(random(2));
        }
        TB_arena_new_npc.getTB_arena_newById = function (id) {
            return TableData.getInstance().getData(TableData.tb_arena_new_npc, id);
        };
        TB_arena_new_npc.prototype.getModelId = function () {
            return this.getMonsters()[0].model;
        };
        TB_arena_new_npc.prototype.getMonsters = function () {
            if (!this._monsters)
                this._monsters = this.monster.map(function (vo) { return tb.TB_monster.get_TB_monsterById(vo); });
            return this._monsters;
        };
        return TB_arena_new_npc;
    }());
    tb.TB_arena_new_npc = TB_arena_new_npc;
    /**竞技场翻牌 */
    var TB_arena_draw = /** @class */ (function () {
        function TB_arena_draw() {
        }
        TB_arena_draw.getDataById = function (id) {
            return TableData.getInstance().getData(TableData.tb_arena_draw, id);
        };
        return TB_arena_draw;
    }());
    tb.TB_arena_draw = TB_arena_draw;
    var TB_arena_new_set = /** @class */ (function () {
        function TB_arena_new_set() {
        }
        /**获取竞技场购买次数花费 */
        TB_arena_new_set.prototype.getBuyCostDiamond = function () {
            var limitNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyArenaNum);
            return this.buy_cost[limitNum] ? this.buy_cost[limitNum] : this.buy_cost[this.buy_cost.length - 1];
        };
        TB_arena_new_set.getArenaNewSet = function () {
            return TableData.getInstance().getData(TableData.tb_arena_new_set, 1);
        };
        return TB_arena_new_set;
    }());
    tb.TB_arena_new_set = TB_arena_new_set;
    /** 商队护送配置 */
    var TB_escort = /** @class */ (function () {
        function TB_escort() {
        }
        TB_escort.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_escort, id);
            return $obj;
        };
        TB_escort.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.escort_reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_escort.prototype.getLossList = function () {
            var _this = this;
            if (!this._lossList) {
                this._lossList = [];
                if (this.escort_loss) {
                    this.escort_loss.forEach(function (ary) {
                        _this._lossList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._lossList;
        };
        TB_escort.prototype.getRobList = function () {
            var _this = this;
            if (!this._robList) {
                this._robList = [];
                if (this.rob_reward) {
                    this.rob_reward.forEach(function (ary) {
                        _this._robList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._robList;
        };
        return TB_escort;
    }());
    tb.TB_escort = TB_escort;
    /** 商队护送参数配置 */
    var TB_escort_set = /** @class */ (function () {
        function TB_escort_set() {
        }
        TB_escort_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_escort_set, 1);
            return $obj;
        };
        return TB_escort_set;
    }());
    tb.TB_escort_set = TB_escort_set;
    /** 迷雾森林 */
    var TB_forest = /** @class */ (function () {
        function TB_forest() {
        }
        TB_forest.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_forest, id);
            return $obj;
        };
        /** 通关奖励 */
        TB_forest.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        /** 每3层奖励 */
        TB_forest.prototype.getBossRewards = function () {
            var _this = this;
            if (!this._boosRewardList) {
                this._boosRewardList = [];
                if (this.first_reward && this.first_reward.length > 0) {
                    this.first_reward.forEach(function (ary) {
                        _this._boosRewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._boosRewardList;
        };
        TB_forest.prototype.getMonsters = function () {
            if (!this._monsters) {
                this._monsters = new Array();
                for (var i = 0; i < this.monster.length; i++) {
                    var mid = parseInt(this.monster[i]);
                    if (mid != 0) {
                        var itemVo = TB_monster.get_TB_monsterById(mid);
                        this._monsters.push(itemVo);
                    }
                }
            }
            return this._monsters;
        };
        return TB_forest;
    }());
    tb.TB_forest = TB_forest;
    var TB_forest_set = /** @class */ (function () {
        function TB_forest_set() {
        }
        TB_forest_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_forest_set, 1);
            return $obj;
        };
        return TB_forest_set;
    }());
    tb.TB_forest_set = TB_forest_set;
    /** 神秘岛屿 */
    var TB_island = /** @class */ (function () {
        function TB_island() {
        }
        TB_island.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_island, id);
            return $obj;
        };
        return TB_island;
    }());
    tb.TB_island = TB_island;
    var TB_island_level = /** @class */ (function () {
        function TB_island_level() {
        }
        TB_island_level.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_island_level, id);
            return $obj;
        };
        /** 概率物品 */
        TB_island_level.prototype.getRateList = function () {
            var _this = this;
            if (!this._rateList) {
                this._rateList = [];
                this.rare_reward.forEach(function (ary) {
                    _this._rateList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rateList;
        };
        /** 被掠夺的损失 */
        TB_island_level.prototype.getLossList = function () {
            var _this = this;
            if (!this._lossList) {
                this._lossList = [];
                this.rare_loss.forEach(function (ary) {
                    _this._lossList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._lossList;
        };
        return TB_island_level;
    }());
    tb.TB_island_level = TB_island_level;
    var TB_island_set = /** @class */ (function () {
        function TB_island_set() {
        }
        TB_island_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_island_set, 1);
            return $obj;
        };
        return TB_island_set;
    }());
    tb.TB_island_set = TB_island_set;
    /** 世界boss配置 */
    var TB_worldboss = /** @class */ (function () {
        function TB_worldboss() {
        }
        TB_worldboss.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_worldboss, id);
            return $obj;
        };
        TB_worldboss.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.attack_reward.forEach(function (ary) {
                    var temp = {
                        itemData: new ItemVo(Number(ary[0]), Number(ary[1])),
                        type: 0 //必掉
                    };
                    _this._rewardList.push(temp);
                });
                if (this.item_show) {
                    this.item_show.forEach(function (ary1) {
                        var temp1 = {
                            itemData: new ItemVo(Number(ary1[0]), Number(ary1[1])),
                            type: 1 //概率
                        };
                        _this._rewardList.push(temp1);
                    });
                }
            }
            return this._rewardList;
        };
        return TB_worldboss;
    }());
    tb.TB_worldboss = TB_worldboss;
    var TB_boss_set = /** @class */ (function () {
        function TB_boss_set() {
        }
        TB_boss_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_boss_set, 1);
            return $obj;
        };
        return TB_boss_set;
    }());
    tb.TB_boss_set = TB_boss_set;
    /** 邮件 */
    var TB_mail = /** @class */ (function () {
        function TB_mail() {
        }
        TB_mail.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_mail, id);
            return $obj;
        };
        return TB_mail;
    }());
    tb.TB_mail = TB_mail;
    /**充值表 */
    var TB_recharge = /** @class */ (function () {
        function TB_recharge() {
        }
        // public day_gift: Array<any>;
        TB_recharge.get_TB_rechargeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_recharge, id);
            return $obj;
        };
        TB_recharge.get_TB_recharge = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_recharge);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_recharge;
    }());
    tb.TB_recharge = TB_recharge;
    /**VIP表 */
    var TB_vip = /** @class */ (function () {
        function TB_vip() {
        }
        TB_vip.getMaxVip = function () {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_vip);
            var keylist = Object.keys($obj.data);
            return Number(keylist[keylist.length - 1]);
        };
        TB_vip.get_TB_vipById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_vip, id);
            return $obj;
        };
        TB_vip.get_TB_vip = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_vip);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_vip;
    }());
    tb.TB_vip = TB_vip;
    /**月卡 */
    var TB_month_card = /** @class */ (function () {
        function TB_month_card() {
        }
        TB_month_card.getTbMonthCardById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_month_card, id);
            return $obj;
        };
        return TB_month_card;
    }());
    tb.TB_month_card = TB_month_card;
    /** 专属特权*/
    var TB_vip_privilege = /** @class */ (function () {
        function TB_vip_privilege() {
        }
        TB_vip_privilege.get_TB_vip_privilegeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_vip_privilege, id);
            return $obj;
        };
        TB_vip_privilege.get_TB_vip_privilege = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_vip_privilege);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_vip_privilege.getPrompt = function (id) {
            var tbVip = TableData.getInstance().getData(TableData.tb_vip_privilege, id);
            if (tbVip.vip_level > 0 && tbVip.general_level != 999) {
                return "vip" + tbVip.vip_level + "\u5F00\u542F\uFF0C\u6216\u73A9\u5BB6\u7B49\u7EA7" + tbVip.general_level + "\u5F00\u542F";
            }
            else if (tbVip.vip_level > 0) {
                return "vip" + tbVip.vip_level + "\u5F00\u542F";
            }
            else {
                return "\u73A9\u5BB6\u7B49\u7EA7" + tbVip.general_level + "\u5F00\u542F";
            }
        };
        return TB_vip_privilege;
    }());
    tb.TB_vip_privilege = TB_vip_privilege;
    /** 专属特权*/
    var TB_vip_desc = /** @class */ (function () {
        function TB_vip_desc() {
        }
        TB_vip_desc.get_TB_vip_descById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_vip_desc, id);
            return $obj;
        };
        return TB_vip_desc;
    }());
    tb.TB_vip_desc = TB_vip_desc;
    /**装备强化基础属性表 */
    var TB_equip_strength = /** @class */ (function () {
        function TB_equip_strength() {
        }
        TB_equip_strength.get_TB_equip_strengthById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_equip_strength, id);
            return $obj;
        };
        TB_equip_strength.prototype.getAttr = function () {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.strength_attr) {
                    for (var _i = 0, _a = this.strength_attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        };
        TB_equip_strength.get_TB_equip_strength = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equip_strength);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_equip_strength;
    }());
    tb.TB_equip_strength = TB_equip_strength;
    /**装备强化套装属性表 */
    var TB_strength_suit = /** @class */ (function () {
        function TB_strength_suit() {
        }
        TB_strength_suit.get_TB_strength_suitById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_strength_suit, id);
            return $obj;
        };
        TB_strength_suit.prototype.getAttr = function () {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        };
        TB_strength_suit.get_TB_strength_suit = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_strength_suit);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_strength_suit.get_TB_strength_suitByLv = function (lv) {
            var tbSuit = null;
            var obj = TableData.getInstance().getTableByName(TableData.tb_strength_suit);
            for (var key in obj.data) {
                var vo = obj.data[key];
                if (tbSuit) {
                    if (lv >= vo.level && vo.level > tbSuit.level) {
                        tbSuit = vo;
                    }
                }
                else {
                    if (lv >= vo.level) {
                        tbSuit = vo;
                    }
                }
            }
            return tbSuit;
        };
        return TB_strength_suit;
    }());
    tb.TB_strength_suit = TB_strength_suit;
    /**装备强化套装属性表 */
    var TB_refine_suit = /** @class */ (function () {
        function TB_refine_suit() {
        }
        TB_refine_suit.get_TB_refine_suitById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_refine_suit, id);
            return $obj;
        };
        TB_refine_suit.prototype.getAttr = function () {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        };
        TB_refine_suit.get_TB_refine_suit = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_refine_suit);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_refine_suit.get_TB_refine_suitByLv = function (lv) {
            var tbSuit = null;
            var obj = TableData.getInstance().getTableByName(TableData.tb_refine_suit);
            for (var key in obj.data) {
                var vo = obj.data[key];
                if (tbSuit) {
                    if (lv >= vo.level && vo.level > tbSuit.level) {
                        tbSuit = vo;
                    }
                }
                else {
                    if (lv >= vo.level) {
                        tbSuit = vo;
                    }
                }
            }
            return tbSuit;
        };
        return TB_refine_suit;
    }());
    tb.TB_refine_suit = TB_refine_suit;
    /**装备套装加成表 */
    var TB_equip_suit = /** @class */ (function () {
        function TB_equip_suit() {
        }
        TB_equip_suit.get_TB_equip_suitById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_equip_suit, id);
            return $obj;
        };
        /** 获取套装品质 */
        TB_equip_suit.prototype.getQuality = function () {
            return Math.floor(this.ID / 10);
        };
        /** 获取套装所需数量 */
        TB_equip_suit.prototype.getCount = function () {
            return this.ID % 10;
        };
        TB_equip_suit.get_TB_equip_suit = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equip_suit);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_equip_suit.getSuitByQuality = function (quality) {
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_equip_suit);
            for (var key in obj.data) {
                var vo = obj.data[key];
                if (Math.floor(vo.ID / 10) == quality) {
                    arr.push(vo);
                }
            }
            return arr;
        };
        return TB_equip_suit;
    }());
    tb.TB_equip_suit = TB_equip_suit;
    /**装备精炼表 */
    var TB_equip_refine = /** @class */ (function () {
        function TB_equip_refine() {
        }
        TB_equip_refine.get_TB_equip_refineById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_equip_refine, id);
            return $obj;
        };
        TB_equip_refine.prototype.getAttr = function () {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        this._attrObj[ary[0]] = ary[2];
                    }
                }
            }
            return this._attrObj;
        };
        TB_equip_refine.get_TB_equip_refine = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equip_refine);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_equip_refine;
    }());
    tb.TB_equip_refine = TB_equip_refine;
    /**装备回收表 */
    var TB_equip_recycle = /** @class */ (function () {
        function TB_equip_recycle() {
        }
        TB_equip_recycle.get_TB_equip_recycleById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_equip_recycle, id);
            return $obj;
        };
        TB_equip_recycle.get_TB_equip_recycle = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equip_recycle);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_equip_recycle;
    }());
    tb.TB_equip_recycle = TB_equip_recycle;
    /**装备读表 */
    var TB_equip_set = /** @class */ (function () {
        function TB_equip_set() {
        }
        TB_equip_set.get_TB_equip_setById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_equip_set, id);
            return $obj;
        };
        TB_equip_set.get_TB_equip_set = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_equip_set);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        /** 获取对应阶级可精炼的等级上限 */
        TB_equip_set.getRefineLimit = function (degree) {
            var tbset = TableData.getInstance().getData(TableData.tb_equip_set, 1);
            return tbset.refine_limit[degree] || 0;
        };
        return TB_equip_set;
    }());
    tb.TB_equip_set = TB_equip_set;
    /**装备宝石表 */
    var TB_gemstone_new = /** @class */ (function () {
        function TB_gemstone_new() {
        }
        TB_gemstone_new.getTBOneById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_gemstone_new, id);
            return $obj;
        };
        TB_gemstone_new.getTbGemByType = function (type, lv) {
            var id = type * 100 + lv;
            return TB_gemstone_new.getTBOneById(id);
        };
        /** 固定值属性加成 */
        TB_gemstone_new.prototype.getAttr = function () {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        };
        TB_gemstone_new.prototype.getType = function () {
            return Math.floor(this.ID / 100);
        };
        TB_gemstone_new.prototype.getLevel = function () {
            return this.ID % 100;
        };
        // 宝石只有一种属性
        TB_gemstone_new.prototype.getAttrType = function () {
            return this.attr && this.attr[0] ? this.attr[0][0] : 0;
        };
        TB_gemstone_new.prototype.getAttrVal = function () {
            return this.attr && this.attr[0] ? this.attr[0][1] : 0;
        };
        TB_gemstone_new.getTbList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_gemstone_new);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_gemstone_new.getTbList2 = function (type, lv) {
            var list = TB_gemstone_new.getTbList();
            var result = list.filter(function (vo) {
                return (type == 0 || vo.getType() == type) && vo.getLevel() == lv;
            });
            return result;
        };
        return TB_gemstone_new;
    }());
    tb.TB_gemstone_new = TB_gemstone_new;
    var TB_gemstone_compound = /** @class */ (function () {
        function TB_gemstone_compound() {
        }
        TB_gemstone_compound.getTBOneById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_gemstone_compound, id);
            return $obj;
        };
        TB_gemstone_compound.prototype.getMaterialList = function () {
            var _this = this;
            if (!this._materialList) {
                this._materialList = [];
                if (this.material) {
                    this.material.forEach(function (ary) {
                        _this._materialList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._materialList;
        };
        TB_gemstone_compound.prototype.getObtainList = function () {
            var _this = this;
            if (!this._obtainList) {
                this._obtainList = [];
                if (this.obtain) {
                    this.obtain.forEach(function (ary) {
                        _this._obtainList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._obtainList;
        };
        TB_gemstone_compound.getTBList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_gemstone_compound);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_gemstone_compound;
    }());
    tb.TB_gemstone_compound = TB_gemstone_compound;
    /**运营活动表 */
    var TB_operate_activity = /** @class */ (function () {
        function TB_operate_activity() {
        }
        //获得time_index对应的活动link
        TB_operate_activity.getLinkByIdx = function (idx) {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_operate_activity);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                if ($vo && $vo.time_index == idx) {
                    return $vo.link;
                }
            }
            return -1;
        };
        //获得time_index的数组
        TB_operate_activity.gettimeIdx = function () {
            var ary = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_operate_activity);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                if (ary.indexOf($vo.time_index) == -1) {
                    ary.push($vo.time_index);
                }
            }
            return ary;
        };
        TB_operate_activity.get_TB_operate_activityById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_operate_activity, id);
            return $obj;
        };
        TB_operate_activity.getChangeTemplate = function ($selectkey, $selectValue) {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_operate_activity);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        return $vo;
                    }
                }
            }
            return null;
        };
        TB_operate_activity.get_TB_operate_activity = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_operate_activity);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_operate_activity;
    }());
    tb.TB_operate_activity = TB_operate_activity;
    var TB_activity_time = /** @class */ (function () {
        function TB_activity_time() {
        }
        TB_activity_time.getTabInfo = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_activity_time, $id);
            return $obj.desc;
        };
        return TB_activity_time;
    }());
    tb.TB_activity_time = TB_activity_time;
    var TB_group_buy = /** @class */ (function () {
        function TB_group_buy() {
        }
        TB_group_buy.get_TB_group_buy = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_group_buy);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_group_buy;
    }());
    tb.TB_group_buy = TB_group_buy;
    var TB_model_dialogue = /** @class */ (function () {
        function TB_model_dialogue() {
        }
        TB_model_dialogue.getRandomTalk = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_model_dialogue, id);
            if (!$obj) {
                return '';
            }
            var key = random($obj.dialogue_id.length);
            var linkId = $obj.dialogue_id[key];
            return TB_evaluation.get_TB_evaluationById(linkId).content;
        };
        return TB_model_dialogue;
    }());
    tb.TB_model_dialogue = TB_model_dialogue;
    var TB_risk = /** @class */ (function () {
        function TB_risk() {
        }
        TB_risk.getTB_riskById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_risk, $id);
            return $obj;
        };
        TB_risk.get_TB_risk = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_risk);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_risk;
    }());
    tb.TB_risk = TB_risk;
    var TB_question = /** @class */ (function () {
        function TB_question() {
        }
        TB_question.getTB_questionById = function ($id) {
            var $obj = TableData.getInstance().getData(TableData.tb_question, $id);
            return $obj;
        };
        return TB_question;
    }());
    tb.TB_question = TB_question;
    var TB_recharge_rebate = /** @class */ (function () {
        function TB_recharge_rebate() {
        }
        TB_recharge_rebate.getTBItemById = function (id) {
            return TableData.getInstance().getData(TableData.tb_recharge_rebate, id);
        };
        TB_recharge_rebate.getTBList = function () {
            var ary = new Array;
            var obj = TableData.getInstance().getTableByName(TableData.tb_recharge_rebate);
            for (var key in obj.data) {
                ary.push(obj.data[key]);
            }
            return ary;
        };
        return TB_recharge_rebate;
    }());
    tb.TB_recharge_rebate = TB_recharge_rebate;
    var TB_activity_set = /** @class */ (function () {
        function TB_activity_set() {
        }
        TB_activity_set.getTabSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_activity_set, 1);
            return $obj;
        };
        TB_activity_set.prototype.getVipGiftList = function () {
            var _this = this;
            if (!this._vipGiftList) {
                this._vipGiftList = [];
                this.super_vip_gift.forEach(function (ary) {
                    _this._vipGiftList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._vipGiftList;
        };
        return TB_activity_set;
    }());
    tb.TB_activity_set = TB_activity_set;
    var TB_risk_set = /** @class */ (function () {
        function TB_risk_set() {
        }
        TB_risk_set.getTabSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_risk_set, 1);
            return $obj;
        };
        return TB_risk_set;
    }());
    tb.TB_risk_set = TB_risk_set;
    var TB_fight_rank = /** @class */ (function () {
        function TB_fight_rank() {
        }
        TB_fight_rank.getTB_fight_rank = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_fight_rank);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_fight_rank;
    }());
    tb.TB_fight_rank = TB_fight_rank;
    var TB_openservice = /** @class */ (function () {
        function TB_openservice() {
        }
        TB_openservice.getTB_openservice = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_openservice);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                $arr.push($vo);
            }
            return $arr;
        };
        TB_openservice.getTB_openserviceByChargeid = function (id) {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_openservice);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                if ($vo.charge_id == id)
                    return $vo;
            }
            return null;
        };
        return TB_openservice;
    }());
    tb.TB_openservice = TB_openservice;
    var TB_share = /** @class */ (function () {
        function TB_share() {
        }
        TB_share.getTB_share = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_share);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                $arr.push($vo);
            }
            return $arr;
        };
        TB_share.getTB_shareById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_share, id);
            return $obj;
        };
        return TB_share;
    }());
    tb.TB_share = TB_share;
    var TB_online = /** @class */ (function () {
        function TB_online() {
        }
        TB_online.getTB_share = function () {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_online);
            for (var $key in $obj.data) {
                var $vo = $obj.data[$key];
                $arr.push($vo);
            }
            return $arr;
        };
        return TB_online;
    }());
    tb.TB_online = TB_online;
    /**七日活动表 */
    var TB_activity_sevendays = /** @class */ (function () {
        function TB_activity_sevendays() {
        }
        TB_activity_sevendays.get_TB_operate_activityByDay = function (period, day) {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_activity_sevendays).data;
            var $arr = new Array;
            var arr = new Array;
            for (var $key in $obj) {
                var vo = $obj[$key];
                if (vo.time_type == period && vo.day == day) {
                    arr.push($obj[$key]);
                }
            }
            for (var i = 1; i < 5; i++) {
                var data = [];
                for (var j in arr) {
                    if (arr[j].link == i) {
                        data.push(arr[j]);
                    }
                }
                $arr.push(data);
            }
            return $arr;
        };
        TB_activity_sevendays.get_TB_operate_activityById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_activity_sevendays, id);
            return $obj;
        };
        TB_activity_sevendays.get_TB_operate_activity = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_activity_sevendays);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_activity_sevendays;
    }());
    tb.TB_activity_sevendays = TB_activity_sevendays;
    /** 限时召唤时间表 */
    var TB_limit_time = /** @class */ (function () {
        function TB_limit_time() {
        }
        TB_limit_time.get_TB_limit_timeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_limit_time, id);
            return $obj;
        };
        TB_limit_time.get_TB_limit_time = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_limit_time);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_limit_time;
    }());
    tb.TB_limit_time = TB_limit_time;
    /** 限时召唤排行表 */
    var TB_summon_rank = /** @class */ (function () {
        function TB_summon_rank() {
        }
        TB_summon_rank.get_TB_summon_rankById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_summon_rank, id);
            return $obj;
        };
        TB_summon_rank.get_TB_summon_rank = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_summon_rank);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_summon_rank.get_TB_summon_rankByType = function (type) {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_summon_rank);
            for (var $key in $obj.data) {
                if ($obj.data[$key].type == type) {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_summon_rank;
    }());
    tb.TB_summon_rank = TB_summon_rank;
    /** 限时召唤宝箱表 */
    var TB_summon_box = /** @class */ (function () {
        function TB_summon_box() {
        }
        TB_summon_box.get_TB_summon_boxById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_summon_box, id);
            return $obj;
        };
        TB_summon_box.get_TB_summon_box = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_summon_box);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_summon_box.get_TB_summon_boxByType = function (type) {
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_summon_box);
            for (var $key in $obj.data) {
                if ($obj.data[$key].type == type) {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_summon_box;
    }());
    tb.TB_summon_box = TB_summon_box;
    /** 限时团购时间表 */
    var TB_group_buying_time = /** @class */ (function () {
        function TB_group_buying_time() {
        }
        TB_group_buying_time.TB_group_buying_timeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_group_buying_time, id);
            return $obj;
        };
        TB_group_buying_time.get_TB_group_buying_time = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_group_buying_time);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_group_buying_time;
    }());
    tb.TB_group_buying_time = TB_group_buying_time;
    /** 限时团购表 */
    var TB_group_buying = /** @class */ (function () {
        function TB_group_buying() {
        }
        TB_group_buying.get_TB_group_buyingById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_group_buying, id);
            return $obj;
        };
        TB_group_buying.get_TB_group_buying = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_group_buying);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_group_buying;
    }());
    tb.TB_group_buying = TB_group_buying;
    /**神力之门表 */
    var TB_divinity_door = /** @class */ (function () {
        function TB_divinity_door() {
        }
        TB_divinity_door.get_TB_divinity_doorById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_divinity_door, id);
            return $obj;
        };
        TB_divinity_door.get_TB_divinity_door = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_divinity_door);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_divinity_door;
    }());
    tb.TB_divinity_door = TB_divinity_door;
    var TB_divinity_set = /** @class */ (function () {
        function TB_divinity_set() {
        }
        TB_divinity_set.get_TB_divinity_set = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_divinity_set, 1);
            return $obj;
        };
        return TB_divinity_set;
    }());
    tb.TB_divinity_set = TB_divinity_set;
    /** 英雄转换 */
    var TB_divinity_replace = /** @class */ (function () {
        function TB_divinity_replace() {
        }
        TB_divinity_replace.get_TB_divinity_replaceById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_divinity_replace, id);
            return $obj;
        };
        return TB_divinity_replace;
    }());
    tb.TB_divinity_replace = TB_divinity_replace;
    /**等级基金表 */
    var TB_level_fund = /** @class */ (function () {
        function TB_level_fund() {
        }
        TB_level_fund.get_TB_get_TB_level_fundById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_level_fund, id);
            return $obj;
        };
        TB_level_fund.get_TB_level_fund = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_level_fund);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            var arr = [];
            for (var i = 0; i < $arr.length;) {
                if (App.hero.welfare.levelFundAward[$arr[i].ID]) {
                    arr.push($arr[i]);
                    $arr.splice(Number(i), 1);
                }
                else {
                    i++;
                }
            }
            return $arr.concat(arr);
        };
        return TB_level_fund;
    }());
    tb.TB_level_fund = TB_level_fund;
    var TB_sevendays_reward = /** @class */ (function () {
        function TB_sevendays_reward() {
        }
        TB_sevendays_reward.get_TB_get_TB_level_fundById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_sevendays_reward, id);
            return $obj;
        };
        TB_sevendays_reward.get_TB_sevendays_reward = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_sevendays_reward);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_sevendays_reward;
    }());
    tb.TB_sevendays_reward = TB_sevendays_reward;
    /**神器 */
    var TB_artifact = /** @class */ (function () {
        function TB_artifact() {
        }
        TB_artifact.prototype.getConstItems = function () {
            this._constitems = this.cost.map(function (element) {
                var item = tb.TB_item.get_TB_itemById(element[0]);
                return item;
            });
            return this._constitems;
        };
        TB_artifact.get_TB_artifactById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact, id);
            return $obj;
        };
        TB_artifact.get_TB_artifact = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        TB_artifact.getArtifactByItemId = function (itemid) {
            if (!this.ItemToArtifacts) {
                this.ItemToArtifacts = {};
                var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact);
                for (var $key in $obj.data) {
                    var temp = $obj.data[$key];
                    if (temp) {
                        for (var i = 0; i < temp.cost.length; i++) {
                            var iteminfo = temp.cost[i];
                            this.ItemToArtifacts[iteminfo[0]] = temp;
                        }
                    }
                }
            }
            return this.ItemToArtifacts[itemid];
        };
        return TB_artifact;
    }());
    tb.TB_artifact = TB_artifact;
    /**神器强化 */
    var TB_artifact_strength = /** @class */ (function () {
        function TB_artifact_strength() {
        }
        TB_artifact_strength.get_TB_artifact_strengthById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_strength, id);
            return $obj;
        };
        TB_artifact_strength.prototype.getAttr = function () {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.strength_attr) {
                    for (var _i = 0, _a = this.strength_attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        };
        TB_artifact_strength.get_TB_artifact_strength = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact_strength);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_artifact_strength;
    }());
    tb.TB_artifact_strength = TB_artifact_strength;
    /**神器技能 */
    var TB_artifact_skill = /** @class */ (function () {
        function TB_artifact_skill() {
        }
        TB_artifact_skill.get_TB_artifact_skillById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_skill, id);
            return $obj;
        };
        TB_artifact_skill.get_TB_artifact_skills = function (ArtifactId) {
            if (ArtifactId === void 0) { ArtifactId = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact_skill);
            for (var $key in $obj.data) {
                if (ArtifactId != null) {
                    if (Number($obj.data[$key].ID.toString().substring(0, 1)) == ArtifactId) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_artifact_skill;
    }());
    tb.TB_artifact_skill = TB_artifact_skill;
    var TB_artifact_skillcost = /** @class */ (function () {
        function TB_artifact_skillcost() {
        }
        TB_artifact_skillcost.get_TB_artifact_skillcostById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_skillcost, id);
            return $obj;
        };
        return TB_artifact_skillcost;
    }());
    tb.TB_artifact_skillcost = TB_artifact_skillcost;
    /**神器洗练 */
    var TB_artifact_baptize = /** @class */ (function () {
        function TB_artifact_baptize() {
        }
        TB_artifact_baptize.get_TB_artifact_baptizeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_baptize, id);
            return $obj;
        };
        TB_artifact_baptize.get_TB_artifact_baptize = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact_baptize);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_artifact_baptize;
    }());
    tb.TB_artifact_baptize = TB_artifact_baptize;
    /** 洗练品质 */
    var TB_baptize = /** @class */ (function () {
        function TB_baptize() {
        }
        /**是否在本属性范围之内 */
        TB_baptize.prototype.isOnScope = function (value) {
            return this.attr.some(function (vo) { return vo[0] == value[0] && vo[1] == value[1] && vo[2] <= value[2] && vo[3] >= value[2]; });
        };
        /**是否是最大值 */
        TB_baptize.prototype.isMaxAttr = function (v) {
            return v[3] == 0 && this.attr.some(function (vo) { return vo[3] == v[2]; });
        };
        TB_baptize.get_TB_baptizeById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_baptize, id);
            return $obj;
        };
        TB_baptize.get_TB_baptize = function ($selectValue) {
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_baptize);
            for (var $key in $obj.data) {
                if ($selectValue != null) {
                    if ($obj.data[$key].attr[1] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_baptize;
    }());
    tb.TB_baptize = TB_baptize;
    /** 神器附魔 */
    var TB_artifact_enchant = /** @class */ (function () {
        function TB_artifact_enchant() {
        }
        /**当前概率释义 */
        TB_artifact_enchant.prototype.getOddStrByOdds = function (odd) {
            if (odd < this.odds_show[0])
                return "\u4F4E";
            else if (odd > this.odds_show[1])
                return "\u9AD8";
            else
                return "\u4E00\u822C";
        };
        TB_artifact_enchant.get_TB_artifact_enchantById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_enchant, id);
            return $obj;
        };
        return TB_artifact_enchant;
    }());
    tb.TB_artifact_enchant = TB_artifact_enchant;
    /**神器收集 */
    var TB_artifact_obtain = /** @class */ (function () {
        function TB_artifact_obtain() {
        }
        TB_artifact_obtain.get_TB_artifact_obtainById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_obtain, id);
            return $obj;
        };
        TB_artifact_obtain.get_TB_artifact_obtain = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact_obtain);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_artifact_obtain;
    }());
    tb.TB_artifact_obtain = TB_artifact_obtain;
    /**神器set */
    var TB_artifact_set = /** @class */ (function () {
        function TB_artifact_set() {
        }
        TB_artifact_set.get_TB_artifact_setById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_artifact_set, id);
            return $obj;
        };
        TB_artifact_set.get_TB_artifact_set = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact_set);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_artifact_set;
    }());
    tb.TB_artifact_set = TB_artifact_set;
    /**推荐阵容 */
    var TB_recommend_squad = /** @class */ (function () {
        function TB_recommend_squad() {
        }
        TB_recommend_squad.get_TB_recommend_squadById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_recommend_squad, id);
            return $obj;
        };
        TB_recommend_squad.get_TB_recommend_squad = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_recommend_squad);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_recommend_squad;
    }());
    tb.TB_recommend_squad = TB_recommend_squad;
    var TB_dan = /** @class */ (function () {
        function TB_dan() {
        }
        TB_dan.get_TB_danById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_dan, id);
            return $obj;
        };
        TB_dan.get_TB_dan = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_dan);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_dan;
    }());
    tb.TB_dan = TB_dan;
    var TB_luck_artifact = /** @class */ (function () {
        function TB_luck_artifact() {
        }
        TB_luck_artifact.get_TB_luck_artifactById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_artifact, id);
            return $obj;
        };
        TB_luck_artifact.get_TB_luck_artifact = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = 'type'; }
            if ($selectValue === void 0) { $selectValue = App.hero.welfare.luckArtId; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_artifact);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_artifact;
    }());
    tb.TB_luck_artifact = TB_luck_artifact;
    var TB_luck_artifact_time = /** @class */ (function () {
        function TB_luck_artifact_time() {
        }
        TB_luck_artifact_time.get_TB_luck_artifact_timeById = function (id) {
            if (id === void 0) { id = App.hero.welfare.luckArtId; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_artifact_time, id);
            return $obj;
        };
        TB_luck_artifact_time.get_TB_luck_artifact_time = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_artifact_time);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_artifact_time;
    }());
    tb.TB_luck_artifact_time = TB_luck_artifact_time;
    var TB_luck_god = /** @class */ (function () {
        function TB_luck_god() {
        }
        TB_luck_god.get_TB_luck_godById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_god, id);
            return $obj;
        };
        TB_luck_god.get_TB_luck_god = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = 'type'; }
            if ($selectValue === void 0) { $selectValue = App.hero.welfare.luckGodId; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_god);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_god;
    }());
    tb.TB_luck_god = TB_luck_god;
    var TB_luck_god_time = /** @class */ (function () {
        function TB_luck_god_time() {
        }
        TB_luck_god_time.get_TB_luck_god_timeById = function (id) {
            if (id === void 0) { id = App.hero.welfare.luckGodId; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_god_time, id);
            return $obj;
        };
        TB_luck_god_time.get_TB_luck_god_time = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_god_time);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_god_time;
    }());
    tb.TB_luck_god_time = TB_luck_god_time;
    var TB_luck_equip = /** @class */ (function () {
        function TB_luck_equip() {
        }
        TB_luck_equip.get_TB_luck_equipById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_equip, id);
            return $obj;
        };
        TB_luck_equip.get_TB_luck_equip = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = 'type'; }
            if ($selectValue === void 0) { $selectValue = App.hero.welfare.luckEquipId; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_equip);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_equip;
    }());
    tb.TB_luck_equip = TB_luck_equip;
    var TB_luck_equip_time = /** @class */ (function () {
        function TB_luck_equip_time() {
        }
        TB_luck_equip_time.get_TB_luck_equip_timeById = function (id) {
            if (id === void 0) { id = App.hero.welfare.luckEquipId; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_equip_time, id);
            return $obj;
        };
        TB_luck_equip_time.get_TB_luck_equip_time = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_equip_time);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_equip_time;
    }());
    tb.TB_luck_equip_time = TB_luck_equip_time;
    var TB_luck_treasure = /** @class */ (function () {
        function TB_luck_treasure() {
        }
        TB_luck_treasure.getTempById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_luck_treasure, id);
            return $obj;
        };
        TB_luck_treasure.get_TB_luck_Treasure = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = 'type'; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_treasure);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_treasure;
    }());
    tb.TB_luck_treasure = TB_luck_treasure;
    var TB_luck_treasure_time = /** @class */ (function () {
        function TB_luck_treasure_time() {
        }
        TB_luck_treasure_time.getTempById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_luck_treasure_time, id);
            return $obj;
        };
        return TB_luck_treasure_time;
    }());
    tb.TB_luck_treasure_time = TB_luck_treasure_time;
    var TB_recharge_sign = /** @class */ (function () {
        function TB_recharge_sign() {
        }
        TB_recharge_sign.get_TB_recharge_signById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_recharge_sign, id);
            return $obj;
        };
        TB_recharge_sign.get_TB_recharge_sign = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_recharge_sign);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_recharge_sign;
    }());
    tb.TB_recharge_sign = TB_recharge_sign;
    var TB_luck_equip_reward = /** @class */ (function () {
        function TB_luck_equip_reward() {
        }
        TB_luck_equip_reward.get_TB_luck_equip_rewardById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_luck_equip_reward, id);
            return $obj;
        };
        TB_luck_equip_reward.get_TB_luck_equip_reward = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = "type"; }
            if ($selectValue === void 0) { $selectValue = App.hero.welfare.luckEquipId; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_luck_equip_reward);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_luck_equip_reward;
    }());
    tb.TB_luck_equip_reward = TB_luck_equip_reward;
    var TB_guild_season = /** @class */ (function () {
        function TB_guild_season() {
        }
        TB_guild_season.get_TB_guild_seasonById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_guild_season, id);
            return $obj;
        };
        TB_guild_season.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.season_reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_guild_season.get_TB_guild_season = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_guild_season);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_guild_season;
    }());
    tb.TB_guild_season = TB_guild_season;
    var TB_person_season = /** @class */ (function () {
        function TB_person_season() {
        }
        TB_person_season.get_TB_person_seasonById = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_person_season, id);
            return $obj;
        };
        TB_person_season.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.season_reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_person_season.prototype.getRank = function () {
            return undefined;
        };
        TB_person_season.prototype.getRankStr = function () {
            if (!this._rankStr) {
                this._rankStr = this.rank[0] == this.rank[1] ? "" + this.rank[0] : this.rank[0] + "-" + this.rank[1];
            }
            return this._rankStr;
        };
        TB_person_season.prototype.getRankSkin = function () {
            var rank = Number(this.rank[0]);
            return rank <= 3 ? SkinUtil.getRankingSkin(rank) : "";
        };
        TB_person_season.get_TB_person_season = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = new Array;
            var $obj = TableData.getInstance().getTableByName(TableData.tb_person_season);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo = $obj.data[$key];
                        $arr.push($vo);
                    }
                }
                else {
                    var $vo = $obj.data[$key];
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        return TB_person_season;
    }());
    tb.TB_person_season = TB_person_season;
    var TB_guild_war_set = /** @class */ (function () {
        function TB_guild_war_set() {
        }
        TB_guild_war_set.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_guild_war_set, id);
            return $obj;
        };
        return TB_guild_war_set;
    }());
    tb.TB_guild_war_set = TB_guild_war_set;
    var Tb_version = /** @class */ (function () {
        function Tb_version() {
        }
        Tb_version.get_TB_version_ById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_version, id);
            return $obj;
        };
        return Tb_version;
    }());
    tb.Tb_version = Tb_version;
    var TB_notice = /** @class */ (function () {
        function TB_notice() {
        }
        TB_notice.get_TB_notice_ById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_notice, id);
            return $obj;
        };
        /** 获取类型 */
        TB_notice.prototype.getType = function (index) {
            if (!this.par_click)
                return -1;
            for (var _i = 0, _a = this.par_click; _i < _a.length; _i++) {
                var ary = _a[_i];
                if (Number(ary[0]) == index) {
                    return Number(ary[1]);
                }
            }
            return -1;
        };
        /** 获取下标 */
        TB_notice.prototype.getIndex = function (type) {
            if (!this.par_click)
                return -1;
            for (var _i = 0, _a = this.par_click; _i < _a.length; _i++) {
                var ary = _a[_i];
                if (Number(ary[1]) == type) {
                    return Number(ary[0]);
                }
            }
            return -1;
        };
        return TB_notice;
    }());
    tb.TB_notice = TB_notice;
    /** 交换金币 */
    var TB_gold_exchange = /** @class */ (function () {
        function TB_gold_exchange() {
        }
        /** 通过次数查找所需金币和钻石数据 */
        TB_gold_exchange.getDataById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_gold_exchange, id);
            return $obj;
        };
        return TB_gold_exchange;
    }());
    tb.TB_gold_exchange = TB_gold_exchange;
    /** 交换金币初始数量 */
    var TB_exchange_set = /** @class */ (function () {
        function TB_exchange_set() {
        }
        /** 最初数据 */
        TB_exchange_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_exchange_set, 1);
            return $obj;
        };
        return TB_exchange_set;
    }());
    tb.TB_exchange_set = TB_exchange_set;
    var TB_map = /** @class */ (function () {
        function TB_map() {
        }
        TB_map.prototype.canAutoTurn = function () {
            return this.auto_scope && this.auto_scope.length > 0;
        };
        TB_map.prototype.canTurn = function () {
            return this.turnstate == 1;
        };
        TB_map.get_TB_map_ById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_map, id);
            return $obj;
        };
        return TB_map;
    }());
    tb.TB_map = TB_map;
    var TB_honour = /** @class */ (function () {
        function TB_honour() {
        }
        TB_honour.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_honour, id);
            return $obj;
        };
        TB_honour.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.bet_reward) {
                    this.bet_reward.forEach(function (ary) {
                        _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        };
        TB_honour.prototype.getItemList = function () {
            var _this = this;
            if (!this._itemList) {
                this._itemList = [];
                if (this.bet_item) {
                    this.bet_item.forEach(function (ary) {
                        _this._itemList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._itemList;
        };
        TB_honour.prototype.getNotice = function () {
            var tbNotice = tb.TB_notice.get_TB_notice_ById(this.notice);
            return tbNotice ? tbNotice.content : "无内容";
        };
        return TB_honour;
    }());
    tb.TB_honour = TB_honour;
    var TB_honour_reward = /** @class */ (function () {
        function TB_honour_reward() {
        }
        TB_honour_reward.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_honour_reward, id);
            return $obj;
        };
        TB_honour_reward.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_honour_reward.getHonourRewardList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_honour_reward);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_honour_reward;
    }());
    tb.TB_honour_reward = TB_honour_reward;
    var TB_honour_set = /** @class */ (function () {
        function TB_honour_set() {
        }
        TB_honour_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_honour_set, 1);
            return $obj;
        };
        return TB_honour_set;
    }());
    tb.TB_honour_set = TB_honour_set;
    var TB_match = /** @class */ (function () {
        function TB_match() {
        }
        TB_match.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_match, id);
            return $obj;
        };
        TB_match.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_match.prototype.getRankSkin = function () {
            var rank = Number(this.rank[0]);
            return SkinUtil.getRankingSkin(rank - 1);
        };
        TB_match.prototype.getRank = function () {
            return Number(this.rank[0]) == Number(this.rank[1]) ? Number(this.rank[0]) : 999;
        };
        TB_match.prototype.getRankStr = function () {
            if (!this._rankStr) {
                if (this.rank[1] == 99999999) {
                    this._rankStr = "\u5927\u4E8E" + this.rank[0];
                }
                else {
                    this._rankStr = this.rank[0] == this.rank[1] ? "" + this.rank[0] : this.rank[0] + "-" + this.rank[1];
                }
            }
            return this._rankStr;
        };
        TB_match.getItemList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_match);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_match;
    }());
    tb.TB_match = TB_match;
    var TB_match_score = /** @class */ (function () {
        function TB_match_score() {
            this.max_score = -1;
        }
        TB_match_score.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_match_score, id);
            return $obj;
        };
        TB_match_score.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_match_score.prototype.getRankText = function () {
            return this.max_score == -1 ? ("大于" + this.score) : (this.score + "-" + this.max_score);
        };
        TB_match_score.getItemList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_match_score);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_match_score;
    }());
    tb.TB_match_score = TB_match_score;
    var TB_match_box = /** @class */ (function () {
        function TB_match_box() {
        }
        TB_match_box.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_match_box, id);
            return $obj;
        };
        TB_match_box.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        return TB_match_box;
    }());
    tb.TB_match_box = TB_match_box;
    var TB_copy_config = /** @class */ (function () {
        function TB_copy_config() {
        }
        TB_copy_config.getSet = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_copy_config, id);
            return $obj;
        };
        return TB_copy_config;
    }());
    tb.TB_copy_config = TB_copy_config;
    var TB_match_set = /** @class */ (function () {
        function TB_match_set() {
        }
        TB_match_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_match_set, 1);
            return $obj;
        };
        TB_match_set.prototype.getWinRewardList = function () {
            var _this = this;
            if (!this._winRewardList) {
                this._winRewardList = [];
                this.win_reward.forEach(function (ary) {
                    _this._winRewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._winRewardList;
        };
        TB_match_set.prototype.getLostRewardList = function () {
            var _this = this;
            if (!this._loserRewardList) {
                this._loserRewardList = [];
                this.lose_reward.forEach(function (ary) {
                    _this._loserRewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._loserRewardList;
        };
        return TB_match_set;
    }());
    tb.TB_match_set = TB_match_set;
    /** 激战神域 */
    var TB_fight_goddomain = /** @class */ (function () {
        function TB_fight_goddomain() {
        }
        TB_fight_goddomain.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_fight_goddomain, id);
            return $obj;
        };
        return TB_fight_goddomain;
    }());
    tb.TB_fight_goddomain = TB_fight_goddomain;
    var TB_fight_goddomain_reward = /** @class */ (function () {
        function TB_fight_goddomain_reward() {
        }
        TB_fight_goddomain_reward.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_fight_goddomain_reward, id);
            return $obj;
        };
        TB_fight_goddomain_reward.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.season_reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        };
        TB_fight_goddomain_reward.prototype.getRank = function () {
            return this.rank[0];
        };
        TB_fight_goddomain_reward.prototype.getRankStr = function () {
            if (!this._rankStr) {
                this._rankStr = this.rank[0] == this.rank[1] ? "" + this.rank[0] : (this.rank[0] > 500 ? "\u5927\u4E8E500" : this.rank[0] + "-" + this.rank[1]);
            }
            return this._rankStr;
        };
        TB_fight_goddomain_reward.prototype.getRankSkin = function () {
            var rank = Number(this.rank[0]);
            return rank <= 3 ? SkinUtil.getRankingSkin(rank - 1) : "";
        };
        TB_fight_goddomain_reward.getItemList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_fight_goddomain_reward);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_fight_goddomain_reward;
    }());
    tb.TB_fight_goddomain_reward = TB_fight_goddomain_reward;
    var TB_fight_goddomain_set = /** @class */ (function () {
        function TB_fight_goddomain_set() {
        }
        TB_fight_goddomain_set.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_fight_goddomain_set, id);
            return $obj;
        };
        TB_fight_goddomain_set.prototype.getWinReward = function () {
            var _this = this;
            if (!this._winReward) {
                this._winReward = [];
                this.win_reward.forEach(function (ary) {
                    _this._winReward.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
                this.win_reward_bonus.forEach(function (ary) {
                    _this._winReward.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._winReward;
        };
        TB_fight_goddomain_set.prototype.getLoseReward = function () {
            var _this = this;
            if (!this._loseReward) {
                this._loseReward = [];
                this.lose_reward.forEach(function (ary) {
                    _this._loseReward.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._loseReward;
        };
        return TB_fight_goddomain_set;
    }());
    tb.TB_fight_goddomain_set = TB_fight_goddomain_set;
    var TB_rank_type = /** @class */ (function () {
        function TB_rank_type() {
        }
        TB_rank_type.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_rank_type, id);
            return $obj;
        };
        TB_rank_type.getPowerRanKEndTime = function () {
            // this._powerRankEndTime = 7;
            if (this._powerRankEndTime == 0) {
                var alldata = TableData.getInstance().getTableByName(TableData.tb_rank_type).data;
                for (var key in alldata) {
                    if (alldata[key] && alldata[key].time.length >= 2 && alldata[key].time[1] > this._powerRankEndTime) {
                        this._powerRankEndTime = alldata[key].time[1];
                    }
                }
            }
            return this._powerRankEndTime;
        };
        //是否在活动时间内--params:time--开服到现在的时间
        TB_rank_type.prototype.isActivityTime = function (time) {
            if (this.time.length < 2)
                return false;
            return (this.time[0] - 1) * TimeConst.ONE_DAY_SEC <= time && time <= this.time[1] * TimeConst.ONE_DAY_SEC;
        };
        //是否显示活动入口按钮--params:time--开服到现在的时间
        TB_rank_type.prototype.isShowActivityBtn = function (time) {
            if (this.time.length < 2)
                return false;
            return (this.time[0] - 1) * TimeConst.ONE_DAY_SEC <= time && time <= (this.time[1] + 1) * TimeConst.ONE_DAY_SEC;
        };
        //神界排行结束时间
        TB_rank_type._powerRankEndTime = 0;
        return TB_rank_type;
    }());
    tb.TB_rank_type = TB_rank_type;
    var TB_growth_guide = /** @class */ (function () {
        function TB_growth_guide() {
        }
        TB_growth_guide.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_growth_guide, id);
            return $obj;
        };
        TB_growth_guide.getGrowthGuideList = function () {
            if (!this._growthGuideList) {
                this._growthGuideList = [];
                var alldata = TableData.getInstance().getTableByName(TableData.tb_growth_guide).data;
                for (var key in alldata) {
                    if (alldata[key]) {
                        this._growthGuideList.push(alldata[key]);
                    }
                }
                //排序
                this._growthGuideList.sort(function (a, b) {
                    return a.rank - b.rank;
                });
            }
            return this._growthGuideList;
        };
        return TB_growth_guide;
    }());
    tb.TB_growth_guide = TB_growth_guide;
    var TB_rank_reward = /** @class */ (function () {
        function TB_rank_reward() {
        }
        TB_rank_reward.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_rank_reward, id);
            return $obj;
        };
        TB_rank_reward.getRewardListByType = function (type) {
            if (!this._typeRewardList) {
                this._typeRewardList = new Object();
                var alldata = TableData.getInstance().getTableByName(TableData.tb_rank_reward).data;
                for (var key in alldata) {
                    if (alldata[key]) {
                        if (!this._typeRewardList[alldata[key].type]) {
                            this._typeRewardList[alldata[key].type] = new Array();
                        }
                        this._typeRewardList[alldata[key].type].push(alldata[key]);
                    }
                }
                //排序下
            }
            return this._typeRewardList[type];
        };
        return TB_rank_reward;
    }());
    tb.TB_rank_reward = TB_rank_reward;
    var TB_function = /** @class */ (function () {
        function TB_function() {
        }
        TB_function.getSysids = function (funcId) {
            switch (funcId) {
                case TB_function.TYPE_MAOXIAN:
                    return [ModuleConst.WORLD_BOSS, ModuleConst.FOG_FOREST, ModuleConst.SHILIANTA];
                case TB_function.TYPE_LILIAN:
                    return [ModuleConst.DAILY_COPY, ModuleConst.EXPEDITION, ModuleConst.CARAVAN_ESCORT, ModuleConst.TEAM_COPY];
                case TB_function.TYPE_JINGJI:
                    return [ModuleConst.JINGJI, ModuleConst.Island];
                case TB_function.TYPE_KUAFU:
                    return [ModuleConst.MATCH_FIGHT, ModuleConst.GLORY_FIGHT, ModuleConst.GOD_DOMAIN];
            }
            return [];
        };
        TB_function.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_function, id);
            return $obj;
        };
        TB_function.getFunctionListByType = function (type) {
            if (!this._functionList) {
                this._functionList = new Object();
                var alldata = TableData.getInstance().getTableByName(TableData.tb_function).data;
                for (var key in alldata) {
                    if (alldata[key]) {
                        var id = alldata[key].ID;
                        var yu = id % 100;
                        var type_1 = id - yu;
                        if (!this._functionList[type_1]) {
                            this._functionList[type_1] = new Array();
                        }
                        if (yu != 0) {
                            this._functionList[type_1].push(alldata[key]);
                        }
                    }
                }
                //排序下
            }
            return this._functionList[type];
        };
        TB_function.TYPE_LILIAN = 100; //历练
        TB_function.TYPE_MAOXIAN = 200; //冒险
        TB_function.TYPE_JINGJI = 300; //竞技
        TB_function.TYPE_KUAFU = 400; //跨服
        TB_function.FUNCTION_REDPOINT = {
            101: "dailycopy_group",
            102: "yuanzheng_group",
            103: "escort_group",
            104: "team_group",
            201: "",
            202: "boss_group",
            203: "forest_group",
            301: "jingjichang_group",
            302: "island_group",
            401: "glory_group",
            402: "jjc_match_group",
            403: "godDm_group",
        };
        TB_function.FUNCTION_GROUP_REDPOINT = {
            100: ["dailycopy_group", "yuanzheng_group", "escort_group", "team_group"],
            200: ["boss_group", "forest_group"],
            300: ["jingjichang_group", "island_group"],
            400: ["jjc_match_group", "glory_group", "godDm_group"],
        };
        return TB_function;
    }());
    tb.TB_function = TB_function;
    var TB_fund = /** @class */ (function () {
        function TB_fund() {
        }
        TB_fund.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_fund, id);
            return $obj;
        };
        TB_fund.init = function () {
            var day = 0;
            var alldata = TableData.getInstance().getTableByName(TableData.tb_fund).data;
            for (var key in alldata) {
                if (alldata[key]) {
                    if (day < alldata[key].openserver_time) {
                        day = alldata[key].openserver_time;
                    }
                }
            }
            this._fundStartTime = App.getOpenServerTime();
            this._fundEndTime = this._fundStartTime + day * 86400;
        };
        //获取基金开始时间
        TB_fund.fundStartTime = function () {
            if (this._fundStartTime == 0) {
                this.init();
            }
            return this._fundStartTime;
        };
        //获取基金结束时间
        TB_fund.fundEndTime = function () {
            if (this._fundEndTime == 0) {
                this.init();
            }
            return this._fundEndTime;
        };
        TB_fund._fundStartTime = 0;
        TB_fund._fundEndTime = 0;
        return TB_fund;
    }());
    tb.TB_fund = TB_fund;
    var TB_fund_reward = /** @class */ (function () {
        function TB_fund_reward() {
        }
        TB_fund_reward.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_fund_reward, id);
            return $obj;
        };
        TB_fund_reward.getFundListByType = function (type) {
            if (!this._fundList) {
                this._fundList = new Object();
                var alldata = TableData.getInstance().getTableByName(TableData.tb_fund_reward).data;
                for (var key in alldata) {
                    if (alldata[key]) {
                        var type_2 = alldata[key].type;
                        if (!this._fundList[type_2]) {
                            this._fundList[type_2] = new Array();
                        }
                        this._fundList[type_2].push(alldata[key]);
                    }
                }
                //排序下
            }
            return this._fundList[type];
        };
        TB_fund_reward.FUND_TYPE_128 = 1;
        TB_fund_reward.FUND_TYPE_228 = 2;
        return TB_fund_reward;
    }());
    tb.TB_fund_reward = TB_fund_reward;
    var TB_openservice_gift = /** @class */ (function () {
        function TB_openservice_gift() {
        }
        TB_openservice_gift.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_openservice_gift, id);
            return $obj;
        };
        return TB_openservice_gift;
    }());
    tb.TB_openservice_gift = TB_openservice_gift;
    var TB_gift_time = /** @class */ (function () {
        function TB_gift_time() {
        }
        TB_gift_time.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_gift_time, id);
            return $obj;
        };
        return TB_gift_time;
    }());
    tb.TB_gift_time = TB_gift_time;
    /** 快捷语 */
    var TB_chat_quick = /** @class */ (function () {
        function TB_chat_quick() {
        }
        TB_chat_quick.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_chat_quick, id);
            return $obj;
        };
        TB_chat_quick.getList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_chat_quick);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_chat_quick;
    }());
    tb.TB_chat_quick = TB_chat_quick;
    /** 圣物 */
    var TB_treasure = /** @class */ (function () {
        function TB_treasure() {
        }
        /** 获取属性 */
        TB_treasure.prototype.getAttr = function () {
            if (!this._attrAry) {
                this._attrAry = [{}, {}];
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        if (ary[1] == ValueType.fixed) {
                            this._attrAry[0][ary[0]] = ary[2];
                        }
                        else {
                            this._attrAry[1][ary[0]] = ary[2];
                        }
                    }
                }
            }
            return this._attrAry;
        };
        /** 获取品质 */
        TB_treasure.prototype.getQuality = function () {
            return Math.floor(this.ID / 100000);
        };
        /** 获取编号 */
        TB_treasure.prototype.getSlot = function () {
            var qlty = this.getQuality();
            var slt = Math.floor((this.ID - qlty * 100000) / 1000);
            return slt;
        };
        /** 获取强化等级 */
        TB_treasure.prototype.getStrengthLv = function () {
            var qlty = this.getQuality();
            var slt = this.getSlot();
            return this.ID - qlty * 100000 - 1000 * slt;
        };
        /** 通过品质、编号、等级获取表数据 */
        TB_treasure.getTbItem = function (quality, pos, lv) {
            var id = TB_treasure.getTbId(quality, pos, lv);
            return tb.TB_treasure.getItemById(id);
        };
        /**通过品质、编号、等级获取表ID */
        TB_treasure.getTbId = function (quality, pos, lv) {
            return quality * 100000 + pos * 1000 + lv;
            ;
        };
        TB_treasure.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_treasure, id);
            return $obj;
        };
        TB_treasure.getList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_treasure);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        /** 获取某品质某编号下的所有等级数据列表 */
        TB_treasure.getList2 = function (quality, slot) {
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_treasure);
            for (var key in obj.data) {
                var tbData = obj.data[key];
                var qlty = tbData.getQuality();
                var slt = tbData.getSlot();
                if (qlty == quality && slt == slot) {
                    arr.push(obj.data[key]);
                }
            }
            return arr;
        };
        return TB_treasure;
    }());
    tb.TB_treasure = TB_treasure;
    var TB_treasure_star = /** @class */ (function () {
        function TB_treasure_star() {
        }
        /** 获取属性 */
        TB_treasure_star.prototype.getAttr = function () {
            if (!this._attrAry) {
                this._attrAry = [{}, {}];
                if (this.attr) {
                    for (var _i = 0, _a = this.attr; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        if (ary[1] == ValueType.fixed) {
                            this._attrAry[0][ary[0]] = ary[2];
                        }
                        else {
                            this._attrAry[1][ary[0]] = ary[2];
                        }
                    }
                }
            }
            return this._attrAry;
        };
        TB_treasure_star.prototype.getMaterialList = function () {
            var _this = this;
            if (!this._godMaterialList) {
                this._godMaterialList = [];
                if (this.star_cost) {
                    this.star_cost.forEach(function (ary) {
                        _this._godMaterialList.push({ type: ary[0], quality: ary[1], itemId: ary[1], starLv: ary[2], count: ary[3] });
                    });
                }
            }
            return this._godMaterialList;
        };
        /** 获取品质 */
        TB_treasure_star.prototype.getQuality = function () {
            return Math.floor(this.ID / 10000);
        };
        /** 获取编号 */
        TB_treasure_star.prototype.getSlot = function () {
            var qlty = this.getQuality();
            var slt = Math.floor((this.ID - qlty * 10000) / 100);
            return slt;
        };
        /** 获取星级 */
        TB_treasure_star.prototype.getStarlv = function () {
            var qlty = this.getQuality();
            var slt = this.getSlot();
            return this.ID - qlty * 10000 - 100 * slt;
        };
        /**通过品质、编号、等级获取表数据 */
        TB_treasure_star.getTbItem = function (quality, pos, starLv) {
            var id = TB_treasure_star.getTbId(quality, pos, starLv);
            return tb.TB_treasure_star.getItemById(id);
        };
        /**通过品质、编号、等级获取表ID */
        TB_treasure_star.getTbId = function (quality, pos, starLv) {
            return quality * 10000 + pos * 100 + starLv;
        };
        /**通过ID获取表数据 */
        TB_treasure_star.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_treasure_star, id);
            return $obj;
        };
        TB_treasure_star.getList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_treasure_star);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        /** 获取某品质某编号下的所有等级数据列表：排除无属性的项 */
        TB_treasure_star.getList2 = function (quality, slot) {
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_treasure_star);
            for (var key in obj.data) {
                var tbData = obj.data[key];
                var qlty = tbData.getQuality();
                var slt = tbData.getSlot();
                if (tbData.attr && tbData.attr.length > 0 && qlty == quality && slt == slot) {
                    arr.push(obj.data[key]);
                }
            }
            return arr;
        };
        return TB_treasure_star;
    }());
    tb.TB_treasure_star = TB_treasure_star;
    /** 圣物 */
    var TB_treasure_book = /** @class */ (function () {
        function TB_treasure_book() {
        }
        TB_treasure_book.getItemById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_treasure_book, id);
            return $obj;
        };
        TB_treasure_book.getList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_treasure_book);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_treasure_book;
    }());
    tb.TB_treasure_book = TB_treasure_book;
    /** 组队副本配置表 */
    var TB_team_set = /** @class */ (function () {
        function TB_team_set() {
        }
        TB_team_set.getTB_team_set = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_team_set, 1);
            return $obj;
        };
        return TB_team_set;
    }());
    tb.TB_team_set = TB_team_set;
    var TB_team_target = /** @class */ (function () {
        function TB_team_target() {
        }
        TB_team_target.getTB_team_targetById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_team_target, id);
            return $obj;
        };
        TB_team_target.prototype.getRewardItems = function () {
            var _this = this;
            if (!this._rewardItems) {
                this._rewardItems = [];
                if (this.reward) {
                    this.reward.forEach(function (ary, index) {
                        _this._rewardItems.push(new ItemVo(ary[0], ary[1]));
                    });
                }
            }
            return this._rewardItems;
        };
        TB_team_target.getList = function ($selectkey, $selectValue) {
            if ($selectkey === void 0) { $selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var $arr = [];
            var $obj = TableData.getInstance().getTableByName(TableData.tb_team_target);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key]);
                    }
                }
                else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        };
        return TB_team_target;
    }());
    tb.TB_team_target = TB_team_target;
    var TB_team_copy = /** @class */ (function () {
        function TB_team_copy() {
        }
        TB_team_copy.getTB_team_copyById = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_team_copy, id);
            return $obj;
        };
        TB_team_copy.prototype.getRewardList = function () {
            var _this = this;
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach(function (ary) {
                    _this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            for (var key in this._rewardList) {
                //使用isShowEff来代替已领取的数据存储
                this._rewardList[key].extPram = Boolean(game.CopyTeamModel.getInstance().myFloor >= this.ID);
            }
            return this._rewardList;
        };
        return TB_team_copy;
    }());
    tb.TB_team_copy = TB_team_copy;
    var TB_treasure_set = /** @class */ (function () {
        function TB_treasure_set() {
        }
        TB_treasure_set.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_treasure_set, id);
            return $obj;
        };
        /** 获取圣物道具的经验 */
        TB_treasure_set.prototype.getTreasureExp = function (id) {
            var ary = this.treasure_exp.find(function (ary) {
                return ary[0] == id;
            });
            return ary && ary[1] ? ary[1] : 0;
        };
        /** 获取圣物被吞噬的经验 */
        TB_treasure_set.prototype.getQualityExp = function (quality) {
            var ary = this.be_devour_exp.find(function (ary) {
                return ary[0] == quality;
            });
            return ary && ary[1] ? ary[1] : 0;
        };
        return TB_treasure_set;
    }());
    tb.TB_treasure_set = TB_treasure_set;
    var TB_advance_road = /** @class */ (function () {
        function TB_advance_road() {
        }
        TB_advance_road.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_advance_road, id);
            return $obj;
        };
        TB_advance_road.prototype.getCondition = function () {
            if (!this._conditionT) {
                this._conditionT = [];
                for (var i = 0; i < this.condition.length; i++) {
                    var temp = TB_advance_condition.getSet(this.condition[i]);
                    if (temp)
                        this._conditionT.push(temp);
                }
            }
            return this._conditionT;
        };
        TB_advance_road.getMaxLevel = function () {
            if (this._maxLevel == -1) {
                this._maxLevel = 0;
                var data = TableData.getInstance().getTableByName(TableData.tb_advance_road).data;
                for (var key in data) {
                    this._maxLevel++;
                }
            }
            return this._maxLevel;
        };
        TB_advance_road._maxLevel = -1;
        return TB_advance_road;
    }());
    tb.TB_advance_road = TB_advance_road;
    var TB_advance_condition = /** @class */ (function () {
        function TB_advance_condition() {
        }
        TB_advance_condition.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_advance_condition, id);
            return $obj;
        };
        TB_advance_condition.getAdvanceLevel = function (id) {
            if (!this.ADVANCE_LEVEL) {
                this.ADVANCE_LEVEL = [];
                var data = TableData.getInstance().getTableByName(TableData.tb_advance_road).data;
                for (var key in data) {
                    var conditions = data[key].condition;
                    for (var i = 0; i < conditions.length; i++) {
                        this.ADVANCE_LEVEL[conditions[i]] = data[key].ID;
                    }
                }
            }
            return this.ADVANCE_LEVEL[id] ? this.ADVANCE_LEVEL[id] : 0;
        };
        return TB_advance_condition;
    }());
    tb.TB_advance_condition = TB_advance_condition;
    var TB_checkpoint_pass = /** @class */ (function () {
        function TB_checkpoint_pass() {
        }
        TB_checkpoint_pass.getSet = function (id) {
            if (id === void 0) { id = 1; }
            var $obj = TableData.getInstance().getData(TableData.tb_checkpoint_pass, id);
            return $obj;
        };
        TB_checkpoint_pass.getTabByTaskId = function (id) {
            if (id === void 0) { id = 1; }
            var data = TableData.getInstance().getTableByName(TableData.tb_checkpoint_pass).data;
            for (var key in data) {
                var taskid = data[key].para;
                if (taskid == id) {
                    return data[key];
                }
            }
            return null;
        };
        return TB_checkpoint_pass;
    }());
    tb.TB_checkpoint_pass = TB_checkpoint_pass;
    var TB_halo = /** @class */ (function () {
        function TB_halo() {
            this._raceType = -1;
            this._godNum = -1;
            this._conditionStr = "";
        }
        TB_halo.getTB = function (id) {
            var $obj = TableData.getInstance().getData(TableData.tb_halo, id);
            var $vo = $obj;
            return $vo;
        };
        Object.defineProperty(TB_halo.prototype, "raceType", {
            get: function () {
                if (this._raceType == -1) {
                    this._raceType = Math.floor(this.type / TB_halo.TYPE_BASE);
                    if (this._raceType < 0)
                        this._raceType = -2;
                }
                return this._raceType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TB_halo.prototype, "godNum", {
            get: function () {
                if (this._godNum == -1) {
                    this._godNum = this.type % TB_halo.TYPE_BASE;
                }
                return this._godNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TB_halo.prototype, "conditionStr", {
            get: function () {
                if (this._conditionStr == "") {
                    var idx = Math.floor(this.type / TB_halo.TYPE_BASE);
                    var needNum = this.type % tb.TB_halo.TYPE_BASE;
                    if (idx == TB_halo.TYPE_ALL) {
                        this._conditionStr = LanMgr.getLan("所有阵营上阵{0}个", -1, needNum);
                    }
                    else {
                        this._conditionStr = LanMgr.getLan("上阵{0}个{1}英雄", -1, needNum, LanMgr.GOD_RACE_NAME[idx]);
                    }
                }
                return this._conditionStr;
            },
            enumerable: true,
            configurable: true
        });
        TB_halo.init = function () {
            if (this._isInit)
                return;
            this._isInit = true;
            this._typeList = [];
            var data = TableData.getInstance().getTableByName(TableData.tb_halo).data;
            for (var key in data) {
                var type = Math.floor(data[key].type / this.TYPE_BASE);
                if (!this._typeList[type]) {
                    this._typeList[type] = [];
                }
                this._typeList[type].push(data[key]);
            }
        };
        //获取全部类型
        TB_halo.getAllType = function () {
            this.init();
            return this._typeList;
        };
        //获取类型
        TB_halo.getType = function (type) {
            this.init();
            return this._typeList[type];
        };
        TB_halo.TYPE_ALL = 0; //全能之力
        TB_halo.TYPE_NUM = 6; //类型数量
        TB_halo.TYPE_BASE = 100;
        TB_halo._isInit = false;
        return TB_halo;
    }());
    tb.TB_halo = TB_halo;
    /** 头像框 */
    var TB_picture_frame = /** @class */ (function () {
        function TB_picture_frame() {
        }
        TB_picture_frame.getItemById = function (id) {
            return TableData.getInstance().getData(TableData.tb_picture_frame, id);
        };
        TB_picture_frame.getList = function (selectkey, $selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_picture_frame);
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo = obj.data[key];
                        arr.push(vo);
                    }
                }
                else {
                    var vo = obj.data[key];
                    arr.push(vo);
                }
            }
            return arr;
        };
        /** 是否锁住了 */
        TB_picture_frame.prototype.isLock = function () {
            var tbVip = tb.TB_vip_privilege.get_TB_vip_privilegeById(this.activate_condition);
            return tbVip ? App.hero.vip < tbVip.vip_level : false;
        };
        return TB_picture_frame;
    }());
    tb.TB_picture_frame = TB_picture_frame;
    /** 勇者之证期数 */
    var TB_warrior_cycle = /** @class */ (function () {
        function TB_warrior_cycle() {
        }
        TB_warrior_cycle.getItemById = function (id) {
            return TableData.getInstance().getData(TableData.tb_warrior_cycle, id);
        };
        /** 获取所有的充值ID */
        TB_warrior_cycle.getAllRecharges = function () {
            var ids = [];
            var ary = TB_warrior_cycle.getList();
            for (var _i = 0, ary_4 = ary; _i < ary_4.length; _i++) {
                var tbVo = ary_4[_i];
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        };
        TB_warrior_cycle.getList = function (selectkey, $selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_warrior_cycle);
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo = obj.data[key];
                        arr.push(vo);
                    }
                }
                else {
                    var vo = obj.data[key];
                    arr.push(vo);
                }
            }
            return arr;
        };
        /** 进阶直接获得奖励 */
        TB_warrior_cycle.prototype.getRewardItems = function () {
            var _this = this;
            if (!this._rewardItems) {
                this._rewardItems = [];
                if (this.activate_reward) {
                    this.activate_reward.forEach(function (ary, index) {
                        _this._rewardItems.push(new ItemVo(ary[0], ary[1]));
                    });
                }
            }
            return this._rewardItems;
        };
        /** 进阶激活奖励展示 */
        TB_warrior_cycle.prototype.getShowItems = function () {
            var _this = this;
            if (!this._showItems) {
                this._showItems = [];
                if (this.activate_reward_show) {
                    this.activate_reward_show.forEach(function (ary, index) {
                        _this._showItems.push(new ItemVo(ary[0], ary[1]));
                    });
                }
            }
            return this._showItems;
        };
        return TB_warrior_cycle;
    }());
    tb.TB_warrior_cycle = TB_warrior_cycle;
    /** 勇者之证等级 */
    var TB_warrior_prove = /** @class */ (function () {
        function TB_warrior_prove() {
        }
        TB_warrior_prove.getItemById = function (id) {
            return TableData.getInstance().getData(TableData.tb_warrior_prove, id);
        };
        TB_warrior_prove.getItemByLv = function (cycle, level) {
            var list = TB_warrior_prove.getList();
            return list.find(function (vo) {
                return vo.cycle == cycle && vo.level == level;
            });
        };
        TB_warrior_prove.getList = function (selectkey, $selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_warrior_prove);
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo = obj.data[key];
                        arr.push(vo);
                    }
                }
                else {
                    var vo = obj.data[key];
                    arr.push(vo);
                }
            }
            return arr;
        };
        /** 普通奖励 */
        TB_warrior_prove.prototype.getRewardItems = function () {
            var _this = this;
            if (!this._rewardItems) {
                this._rewardItems = [];
                if (this.reward) {
                    this.reward.forEach(function (ary, index) {
                        _this._rewardItems.push(new ItemVo(ary[0], ary[1]));
                    });
                }
            }
            return this._rewardItems;
        };
        /** 进阶奖励 */
        TB_warrior_prove.prototype.getSpecialItems = function () {
            var _this = this;
            if (!this._specialItems) {
                this._specialItems = [];
                if (this.special_reward) {
                    this.special_reward.forEach(function (ary, index) {
                        _this._specialItems.push(new ItemVo(ary[0], ary[1]));
                    });
                }
            }
            return this._specialItems;
        };
        return TB_warrior_prove;
    }());
    tb.TB_warrior_prove = TB_warrior_prove;
    /** 周试炼任务 */
    var TB_week_trial = /** @class */ (function () {
        function TB_week_trial() {
        }
        TB_week_trial.getItemById = function (id) {
            return TableData.getInstance().getData(TableData.tb_week_trial, id);
        };
        TB_week_trial.getList = function (selectkey, $selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_week_trial);
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo = obj.data[key];
                        arr.push(vo);
                    }
                }
                else {
                    var vo = obj.data[key];
                    arr.push(vo);
                }
            }
            return arr;
        };
        return TB_week_trial;
    }());
    tb.TB_week_trial = TB_week_trial;
    /** 月试炼任务 */
    var TB_month_trial = /** @class */ (function () {
        function TB_month_trial() {
        }
        TB_month_trial.getItemById = function (id) {
            return TableData.getInstance().getData(TableData.tb_month_trial, id);
        };
        TB_month_trial.getList = function (selectkey, $selectValue) {
            if (selectkey === void 0) { selectkey = null; }
            if ($selectValue === void 0) { $selectValue = null; }
            var arr = [];
            var obj = TableData.getInstance().getTableByName(TableData.tb_month_trial);
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo = obj.data[key];
                        arr.push(vo);
                    }
                }
                else {
                    var vo = obj.data[key];
                    arr.push(vo);
                }
            }
            return arr;
        };
        return TB_month_trial;
    }());
    tb.TB_month_trial = TB_month_trial;
    /** 勇者之证 */
    var TB_warrior_set = /** @class */ (function () {
        function TB_warrior_set() {
        }
        TB_warrior_set.getSet = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_warrior_set, 1);
            return $obj;
        };
        return TB_warrior_set;
    }());
    tb.TB_warrior_set = TB_warrior_set;
})(tb || (tb = {}));
var ResTabelVo = /** @class */ (function () {
    function ResTabelVo() {
        this.size = 0;
        this.maxId = 0;
    }
    ResTabelVo.prototype.parseTable = function ($name, $typs, $field, $data) {
        if (!$data)
            return;
        this.name = $name;
        this.field = [];
        if ($field) {
            this.field = $field.split(",");
        }
        this.typs = [];
        if ($typs) {
            this.typs = $typs.split(",");
        }
        var lines = $data.split(String.fromCharCode(1));
        var tw = this.field.length;
        var th = lines.length / tw; //行数
        var id = 0;
        this.data = new Object;
        var maxId = 0;
        for (var i = 0; i < th; i++) {
            //   var $celarr: Array<string> = new Array;
            var cls = TableData.mapCls[$name];
            var obj = cls ? new cls : new Object; //映射到指定的类或者
            for (var j = 0; j < tw; j++) {
                var $str = lines[id];
                //      $celarr.push(tempCell);
                switch (this.typs[j]) {
                    case "int":
                    case "float":
                        obj[this.field[j]] = Number($str);
                        break;
                    case "bool":
                        obj[this.field[j]] = $str == "1";
                        break;
                    case "string":
                        obj[this.field[j]] = $str;
                        break;
                    case "array":
                        obj[this.field[j]] = this.parseAry($str);
                        break;
                    case "array2":
                        obj[this.field[j]] = this.parseAry2($str);
                        break;
                    default:
                        obj[this.field[j]] = $str;
                        break;
                }
                id++;
            }
            this.data[obj.ID] = obj;
            if (obj.ID > maxId) {
                maxId = obj.ID;
            }
        }
        this.size = th;
        this.maxId = maxId;
    };
    ResTabelVo.prototype.parseAry = function ($str) {
        $str = ($str + "").replace(/，/g, ","); //为了防止策划误填，先进行转换
        $str = $str.trim();
        if ($str === "")
            return null;
        var tempArr = $str.split(",");
        var arr = [];
        for (var i = 0, li = tempArr.length; i < li; i++) {
            var v = tempArr[i].trim();
            arr.push(!isNaN(Number(v)) ? Number(v) : v);
        }
        if (tempArr.length === 1 && arr[0] == 0) {
            arr = [];
        }
        return arr;
    };
    ResTabelVo.prototype.parseAry2 = function ($str) {
        $str = ($str + "").replace(/，/g, ","); //为了防止策划误填，先进行转换
        $str = ($str + "").replace(/},/g, ";").replace(/{/g, "").replace(/}/g, "");
        $str = $str.trim();
        if ($str === "")
            return null;
        var arr = [];
        var tempArr0 = $str.split(";");
        for (var i = 0, li = tempArr0.length; i < li; ++i) {
            var strI = tempArr0[i].trim();
            if (strI === "") {
                continue;
            }
            // var tempArr1 = strI.split(",");
            // var arr1 = [];
            // for (var j = 0, lj = tempArr1.length; j < lj; j++) {
            //     var v = tempArr1[j].trim();
            //     arr1.push(v);
            // }
            // arr.push(arr1);
            arr.push(this.parseAry(strI));
        }
        // if (tempArr0.length === 1 && arr[0].length === 1 && arr[0][0] == 0) {
        //     arr = [];
        // }
        if (tempArr0.length === 1 && arr[0].length === 0) {
            arr = [];
        }
        return arr;
    };
    ResTabelVo.prototype.getDataByID = function ($id) {
        return this.data[$id];
    };
    return ResTabelVo;
}());
var TableData = /** @class */ (function () {
    function TableData() {
        this._iter = 0;
        this._count = 0;
        this.tb = new Object;
    }
    TableData.getInstance = function () {
        if (!this._instance) {
            this._instance = new TableData();
        }
        return this._instance;
    };
    TableData.prototype.loadGameData = function (tbUrl, $fun, $progessFun) {
        var _this = this;
        if ($fun === void 0) { $fun = null; }
        if ($progessFun === void 0) { $progessFun = null; }
        this._completeFun = $fun;
        this._progessFun = $progessFun;
        tl3d.LoadManager.getInstance().load(tbUrl, tl3d.LoadManager.XML_TYPE, function ($str) {
            _this.parseLineByStr($str);
        });
    };
    TableData.prototype.parseLineByStr = function ($str) {
        this._lines = $str.split(String.fromCharCode(13));
        this._count = this._lines.length / 4;
        Laya.timer.frameLoop(1, this, this.loopAnlysi);
    };
    //异步解析配置表
    TableData.prototype.loopAnlysi = function () {
        var i = 3;
        while (i > 0) {
            i--;
            if (this._iter >= this._count) {
                if (this._completeFun) {
                    this._completeFun();
                    this._completeFun = null;
                    this._progessFun = null;
                }
                return;
            }
            if (this._progessFun) {
                this._progessFun(this._iter / this._count);
            }
            var $name = this._lines[this._iter * 4 + 0];
            var $field = this._lines[this._iter * 4 + 1];
            var $typs = this._lines[this._iter * 4 + 2];
            var $data = this._lines[this._iter * 4 + 3];
            var vo = new ResTabelVo();
            vo.parseTable($name, $typs, $field, $data);
            this.tb[$name] = vo;
            this._iter++;
        }
    };
    TableData.prototype.getData = function ($tbName, $id) {
        if (this.tb[$tbName]) {
            //logdebug(this.tb[$tbName].getDataByID($id));
            return this.tb[$tbName].getDataByID($id);
        }
        return null;
    };
    TableData.prototype.getTabSize = function ($tbName) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].size;
        }
        return 0;
    };
    TableData.prototype.getTabMaxID = function ($tbName) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].maxId;
        }
        return 0;
    };
    TableData.prototype.getTableByName = function ($tbName) {
        if (this.tb[$tbName]) {
            return this.tb[$tbName];
        }
        return null;
    };
    TableData.tb_hud = "tb_hud";
    TableData.tb_sys_open = "tb_sys_open";
    TableData.tb_role = "tb_role";
    TableData.tb_god = "tb_god";
    TableData.tb_skin = "tb_skin";
    TableData.tb_god_set = "tb_god_set";
    TableData.tb_god_employ_set = "tb_god_employ_set";
    TableData.tb_awaken_conditions = "tb_awaken_conditions";
    TableData.tb_god_awaken = "tb_god_awaken";
    TableData.tb_star_title = "tb_star_title";
    TableData.tb_msgCode = "tb_msgCode";
    TableData.tb_game_set = "tb_game_set";
    TableData.tb_skill = "tb_skill";
    TableData.tb_skill_desc = "tb_skill_desc";
    TableData.tb_sub_skill = "tb_sub_skill";
    TableData.tb_skill_replace = "tb_skill_replace";
    TableData.tb_effect = "tb_effect";
    TableData.tb_buff = "tb_buff";
    TableData.tb_skill_effect = "tb_skill_effect";
    TableData.tb_buff_effect = "tb_buff_effect";
    TableData.tb_copy = "tb_copy";
    TableData.tb_copy_info = "tb_copy_info";
    TableData.tb_plot = "tb_plot";
    TableData.tb_daily_copy = "tb_daily_copy";
    TableData.tb_expedition = "tb_expedition";
    TableData.tb_copy_set = "tb_copy_set";
    TableData.tb_item = "tb_item";
    TableData.tb_monster = "tb_monster";
    TableData.tb_god_evolution = "tb_god_evolution";
    TableData.tb_god_star = "tb_god_star";
    TableData.tb_wish = "tb_wish";
    TableData.tb_wish_set = "tb_wish_set";
    TableData.tb_task = "tb_task";
    TableData.tb_task_title = "tb_task_title";
    TableData.tb_daily = "tb_daily";
    TableData.tb_daily_reward = "tb_daily_reward";
    TableData.tb_market = "tb_market";
    TableData.tb_market_set = "tb_market_set";
    TableData.tb_god_level = "tb_god_level";
    TableData.tb_god_resolve = "tb_god_resolve";
    TableData.tb_god_fate = "tb_god_fate";
    TableData.tb_fusion_soul = "tb_fusion_soul";
    TableData.tb_evaluation = "tb_evaluation";
    TableData.tb_random_name = "tb_random_name";
    TableData.tb_rune_suit = "tb_rune_suit";
    TableData.tb_rune = "tb_rune";
    TableData.tb_rune_prefix = "tb_rune_prefix";
    TableData.tb_rune_strength = "tb_rune_strength";
    TableData.tb_rune_set = "tb_rune_set";
    TableData.tb_arena_npc = "tb_arena_npc";
    TableData.tb_rank_score = "tb_rank_score";
    TableData.tb_arena_rank = "tb_arena_rank";
    // public static tb_arena_set: string = "tb_arena_set";
    TableData.tb_goods = "tb_goods";
    TableData.tb_trial = "tb_trial";
    TableData.tb_guild = "tb_guild";
    TableData.tb_guild_icon = "tb_guild_icon";
    TableData.tb_guild_skill = "tb_guild_skill";
    TableData.tb_guild_sign = "tb_guild_sign";
    TableData.tb_guild_set = "tb_guild_set";
    TableData.tb_guild_donate = "tb_guild_donate";
    TableData.tb_guild_copy = "tb_guild_copy";
    TableData.tb_guild_help = "tb_guild_help";
    TableData.tb_copy_reward = "tb_copy_reward";
    TableData.tb_exchange = "tb_exchange";
    TableData.tb_first_recharge = "tb_first_recharge";
    TableData.tb_level = "tb_level";
    TableData.tb_day_sign = "tb_day_sign";
    TableData.tb_total_sign = "tb_total_sign";
    TableData.tb_sevendays = "tb_sevendays";
    TableData.tb_sevendays_time = "tb_sevendays_time";
    TableData.tb_arena_new = "tb_arena_new";
    TableData.tb_arena_new_npc = "tb_arena_new_npc";
    TableData.tb_arena_draw = "tb_arena_draw";
    TableData.tb_arena_new_set = "tb_arena_new_set";
    TableData.tb_recharge = "tb_recharge";
    TableData.tb_vip = "tb_vip";
    TableData.tb_month_card = "tb_month_card";
    TableData.tb_vip_privilege = "tb_vip_privilege";
    TableData.tb_vip_desc = "tb_vip_desc";
    TableData.tb_escort_set = "tb_escort_set";
    TableData.tb_escort = "tb_escort";
    TableData.tb_adventure = "tb_adventure";
    TableData.tb_adventure_set = "tb_adventure_set";
    TableData.tb_forest = "tb_forest";
    TableData.tb_forest_set = "tb_forest_set";
    TableData.tb_island_set = "tb_island_set";
    TableData.tb_island_level = "tb_island_level";
    TableData.tb_island = "tb_island";
    TableData.tb_worldboss = "tb_worldboss";
    TableData.tb_boss_set = "tb_boss_set";
    TableData.tb_mail = "tb_mail";
    TableData.tb_equip_strength = "tb_equip_strength";
    TableData.tb_strength_suit = "tb_strength_suit";
    TableData.tb_refine_suit = "tb_refine_suit";
    TableData.tb_equip_suit = "tb_equip_suit";
    TableData.tb_equip_refine = "tb_equip_refine";
    TableData.tb_equip_recycle = "tb_equip_recycle";
    TableData.tb_equip_set = "tb_equip_set";
    TableData.tb_gemstone = "tb_gemstone";
    TableData.tb_gemstone_new = "tb_gemstone_new";
    TableData.tb_gemstone_compound = "tb_gemstone_compound";
    TableData.tb_accessory = "tb_accessory";
    TableData.tb_accessory_suit = "tb_accessory_suit";
    TableData.tb_accessory_set = "tb_accessory_set";
    TableData.tb_level_fund = "tb_level_fund";
    TableData.tb_operate_activity = "tb_operate_activity";
    TableData.tb_risk_set = "tb_risk_set";
    TableData.tb_activity_set = "tb_activity_set";
    TableData.tb_model_dialogue = "tb_model_dialogue";
    TableData.tb_risk = "tb_risk";
    TableData.tb_group_buy = "tb_group_buy";
    TableData.tb_question = "tb_question";
    TableData.tb_activity_sevendays = "tb_activity_sevendays";
    TableData.tb_limit_time = "tb_limit_time";
    TableData.tb_summon_rank = "tb_summon_rank";
    TableData.tb_summon_box = "tb_summon_box";
    TableData.tb_group_buying_time = "tb_group_buying_time";
    TableData.tb_group_buying = "tb_group_buying";
    TableData.tb_divinity_door = "tb_divinity_door";
    TableData.tb_divinity_set = "tb_divinity_set";
    TableData.tb_sevendays_reward = "tb_sevendays_reward";
    TableData.tb_baptize = "tb_baptize";
    TableData.tb_artifact = "tb_artifact";
    TableData.tb_artifact_strength = "tb_artifact_strength";
    TableData.tb_artifact_enchant = "tb_artifact_enchant";
    TableData.tb_artifact_baptize = "tb_artifact_baptize";
    TableData.tb_artifact_obtain = "tb_artifact_obtain";
    TableData.tb_artifact_skill = "tb_artifact_skill";
    TableData.tb_artifact_skillcost = "tb_artifact_skillcost";
    TableData.tb_artifact_set = "tb_artifact_set";
    TableData.tb_divinity_replace = "tb_divinity_replace";
    TableData.tb_version = "tb_version";
    TableData.tb_notice = "tb_notice";
    TableData.tb_exchange_set = "tb_exchange_set";
    TableData.tb_gold_exchange = "tb_gold_exchange";
    TableData.tb_map = "tb_map";
    TableData.tb_skill_set = "tb_skill_set";
    TableData.tb_shield = "tb_shield";
    TableData.tb_recommend_squad = "tb_recommend_squad";
    TableData.tb_dan = "tb_dan";
    TableData.tb_person_season = "tb_person_season";
    TableData.tb_guild_season = "tb_guild_season";
    TableData.tb_guild_war_set = "tb_guild_war_set";
    TableData.tb_luck_artifact = "tb_luck_artifact";
    TableData.tb_luck_artifact_time = "tb_luck_artifact_time";
    TableData.tb_luck_god = "tb_luck_god";
    TableData.tb_luck_god_time = "tb_luck_god_time";
    TableData.tb_luck_equip = "tb_luck_equip";
    TableData.tb_luck_equip_time = "tb_luck_equip_time";
    TableData.tb_luck_equip_reward = "tb_luck_equip_reward";
    TableData.tb_luck_treasure = "tb_luck_treasure";
    TableData.tb_luck_treasure_time = "tb_luck_treasure_time";
    TableData.tb_recharge_sign = "tb_recharge_sign";
    TableData.tb_share = "tb_share";
    TableData.tb_online = "tb_online";
    TableData.tb_openservice = "tb_openservice";
    TableData.tb_fight_rank = "tb_fight_rank";
    TableData.tb_activity_time = "tb_activity_time";
    TableData.tb_honour = "tb_honour";
    TableData.tb_honour_reward = "tb_honour_reward";
    TableData.tb_honour_set = "tb_honour_set";
    TableData.tb_match = "tb_match";
    TableData.tb_match_score = "tb_match_score";
    TableData.tb_match_set = "tb_match_set";
    TableData.tb_match_box = "tb_match_box";
    TableData.tb_copy_config = "tb_copy_config";
    TableData.tb_fight_goddomain = "tb_fight_goddomain";
    TableData.tb_fight_goddomain_reward = "tb_fight_goddomain_reward";
    TableData.tb_fight_goddomain_set = "tb_fight_goddomain_set";
    TableData.tb_rank_type = "tb_rank_type";
    TableData.tb_growth_guide = "tb_growth_guide";
    TableData.tb_rank_reward = "tb_rank_reward";
    TableData.tb_function = "tb_function";
    TableData.tb_fund = "tb_fund";
    TableData.tb_fund_reward = "tb_fund_reward";
    TableData.tb_openservice_gift = "tb_openservice_gift";
    TableData.tb_gift_time = "tb_gift_time";
    TableData.tb_optional = "tb_optional";
    TableData.tb_daily_recharge = "tb_daily_recharge";
    TableData.tb_week_recharge = "tb_week_recharge";
    TableData.tb_month_recharge = "tb_month_recharge";
    TableData.tb_chat_quick = "tb_chat_quick";
    TableData.tb_treasure_star = "tb_treasure_star";
    TableData.tb_treasure = "tb_treasure";
    TableData.tb_treasure_book = "tb_treasure_book";
    TableData.tb_treasure_set = "tb_treasure_set";
    TableData.tb_advance_road = "tb_advance_road";
    TableData.tb_advance_condition = "tb_advance_condition";
    TableData.tb_checkpoint_pass = "tb_checkpoint_pass";
    TableData.tb_halo = "tb_halo";
    TableData.tb_recharge_rebate = "tb_recharge_rebate";
    TableData.tb_picture_frame = "tb_picture_frame";
    TableData.tb_warrior_prove = "tb_warrior_prove";
    TableData.tb_warrior_cycle = "tb_warrior_cycle";
    TableData.tb_week_trial = "tb_week_trial";
    TableData.tb_month_trial = "tb_month_trial";
    TableData.tb_warrior_set = "tb_warrior_set";
    TableData.tb_team_copy = "tb_team_copy";
    TableData.tb_team_target = "tb_team_target";
    TableData.tb_team_set = "tb_team_set";
    TableData.mapCls = {
        "tb_treasure_star": tb.TB_treasure_star,
        "tb_team_copy": tb.TB_team_copy,
        "tb_team_target": tb.TB_team_target,
        "tb_treasure": tb.TB_treasure,
        "tb_treasure_set": tb.TB_treasure_set,
        "tb_skill": tb.TB_skill,
        "tb_map": tb.TB_map,
        "tb_item": tb.TB_item,
        "tb_god": tb.TB_god,
        "tb_copy_info": tb.TB_copy_info,
        "tb_daily_copy": tb.TB_daily_copy,
        "tb_expedition": tb.TB_expedition,
        "tb_copy": tb.TB_copy,
        "tb_god_set": tb.TB_god_set,
        "tb_god_star": tb.TB_god_star,
        "tb_monster": tb.TB_monster,
        "tb_worldboss": tb.TB_worldboss,
        "tb_notice": tb.TB_notice,
        "tb_artifact": tb.TB_artifact,
        "tb_daily_reward": tb.TB_daily_reward,
        "tb_escort": tb.TB_escort,
        "tb_forest": tb.TB_forest,
        "tb_baptize": tb.TB_baptize,
        "tb_island_level": tb.TB_island_level,
        "tb_artifact_enchant": tb.TB_artifact_enchant,
        "tb_guild_season": tb.TB_guild_season,
        "tb_guild_help": tb.TB_guild_help,
        "tb_person_season": tb.TB_person_season,
        "tb_recharge_sign": tb.TB_recharge_sign,
        "tb_group_buying_time": tb.TB_group_buying_time,
        "tb_summon_box": tb.TB_summon_box,
        "tb_summon_rank": tb.TB_summon_rank,
        "tb_limit_time": tb.TB_limit_time,
        "tb_honour": tb.TB_honour,
        "tb_honour_reward": tb.TB_honour_reward,
        "tb_arena_new_set": tb.TB_arena_new_set,
        "tb_arena_new": tb.TB_arena_new,
        "tb_arena_new_npc": tb.TB_arena_new_npc,
        "tb_match": tb.TB_match,
        "tb_match_score": tb.TB_match_score,
        "tb_match_set": tb.TB_match_set,
        "tb_match_box": tb.TB_match_box,
        "tb_trial": tb.TB_trial,
        "tb_fight_goddomain_reward": tb.TB_fight_goddomain_reward,
        "tb_fight_goddomain_set": tb.TB_fight_goddomain_set,
        "tb_activity_set": tb.TB_activity_set,
        "tb_rank_type": tb.TB_rank_type,
        "tb_growth_guide": tb.TB_growth_guide,
        "tb_god_awaken": tb.TB_god_awaken,
        "tb_fusion_soul": tb.TB_fusion_soul,
        "tb_rank_reward": tb.TB_rank_reward,
        "tb_strength_suit": tb.TB_strength_suit,
        "tb_function": tb.TB_function,
        "tb_refine_suit": tb.TB_refine_suit,
        "tb_fund": tb.TB_fund,
        "tb_fund_reward": tb.TB_fund_reward,
        "tb_month_card": tb.TB_month_card,
        "tb_openservice_gift": tb.TB_openservice_gift,
        "tb_gift_time": tb.TB_gift_time,
        "tb_optional": tb.TB_optional,
        "tb_equip_suit": tb.TB_equip_suit,
        "tb_artifact_strength": tb.TB_artifact_strength,
        "tb_equip_refine": tb.TB_equip_refine,
        "tb_equip_strength": tb.TB_equip_strength,
        "tb_game_set": tb.TB_game_set,
        "tb_advance_road": tb.TB_advance_road,
        "tb_advance_condition": tb.TB_advance_condition,
        "tb_checkpoint_pass": tb.TB_checkpoint_pass,
        "tb_luck_treasure": tb.TB_luck_treasure,
        "tb_luck_treasure_time": tb.TB_luck_treasure_time,
        "tb_skin": tb.TB_skin,
        "tb_daily_recharge": tb.TB_daily_recharge,
        "tb_week_recharge": tb.TB_week_recharge,
        "tb_month_recharge": tb.TB_month_recharge,
        "tb_gemstone_new": tb.TB_gemstone_new,
        "tb_gemstone_compound": tb.TB_gemstone_compound,
        "tb_halo": tb.TB_halo,
        "tb_guild_copy": tb.TB_guild_copy,
        "tb_picture_frame": tb.TB_picture_frame,
        "tb_warrior_prove": tb.TB_warrior_prove,
        "tb_warrior_cycle": tb.TB_warrior_cycle,
        "tb_week_trial": tb.TB_week_trial,
        "tb_month_trial": tb.TB_month_trial,
    };
    return TableData;
}());
