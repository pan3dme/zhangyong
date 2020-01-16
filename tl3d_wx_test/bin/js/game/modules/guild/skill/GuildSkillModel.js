var game;
(function (game) {
    var GuildSkillModel = /** @class */ (function () {
        function GuildSkillModel() {
            /** 公会技能列表 */
            this._skillList = [];
            /** 公会技能数量 */
            this.skillNum = 5;
            this.godTypes = []; // 神灵类型数组
            this.skillAttrs = []; // 技能属性数组
            this._check = true;
        }
        GuildSkillModel.getInstance = function () {
            if (!GuildSkillModel._instance) {
                GuildSkillModel._instance = new GuildSkillModel();
            }
            return GuildSkillModel._instance;
        };
        ;
        GuildSkillModel.prototype.initModel = function () {
            this.godTypes = [GodType.shuchu, GodType.zhiliao, GodType.fuzhu, GodType.kongzhi, GodType.fangyu];
            var attrType = iface.tb_prop.attrTypeKey;
            // 属性定死，不需要去遍历表结构
            this.skillAttrs = [attrType.hpMax, attrType.atk, attrType.def, attrType.crit, attrType.critDmg];
            for (var _i = 0, _a = this.godTypes; _i < _a.length; _i++) {
                var gtype = _a[_i];
                for (var _b = 0, _c = this.skillAttrs; _b < _c.length; _b++) {
                    var attr = _c[_b];
                    this._skillList.push(new game.GuildSkillVo(gtype, attr));
                }
            }
        };
        /** 通过种族获取到公会技能列表 x个  先更新再获取*/
        GuildSkillModel.prototype.getSkillList = function (godType) {
            return godType == 0 ? this._skillList : this._skillList.filter(function (vo) {
                return vo.godType == godType;
            });
        };
        /**　获取到可升级的属性 */
        GuildSkillModel.prototype.getCanLvupAttr = function (type) {
            var list = this.getSkillList(type);
            var vo = list.find(function (vo) {
                return vo.isCanLvup();
            });
            return vo ? vo.attrType : 1;
        };
        Object.defineProperty(GuildSkillModel.prototype, "check", {
            get: function () {
                return this._check;
            },
            set: function ($value) {
                this._check = $value;
            },
            enumerable: true,
            configurable: true
        });
        /** 遍历查看是否有可以升级的 */
        GuildSkillModel.prototype.isHasDonateLevelUp = function () {
            if (App.IsSysOpen(ModuleConst.GONGHUI) && game.GuildModel.getInstance().isHasGuild() && App.hero.loginCount == 1 && this._check) {
                return this._skillList.some(function (vo) {
                    return vo.isCanLvup();
                });
            }
            return false;
        };
        /** 获取到神力对象 */
        GuildSkillModel.prototype.getCurSkillAttr = function (godType) {
            // 格式:[{固定值对象},{百分比对象}]
            var attrAry = [{}, {}];
            var list = this.getSkillList(godType);
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var skillVo = list_1[_i];
                var attr = skillVo.tbSkill.attr;
                if (attr[1] == ValueType.percent) {
                    attrAry[1][attr[0]] = attrAry[1][attr[0]] ? attrAry[1][attr[0]] + attr[2] : attr[2];
                }
                else {
                    attrAry[0][attr[0]] = attrAry[0][attr[0]] ? attrAry[0][attr[0]] + attr[2] : attr[2];
                }
            }
            return attrAry;
        };
        /** 获取技能等级 */
        GuildSkillModel.prototype.getSkillLv = function (godType, attrType) {
            var key = "" + godType + attrType;
            return App.hero.guildSkillInfo[key] || 0;
        };
        /** 获取技能对象 */
        GuildSkillModel.prototype.getSkillVo = function (godType, attrType) {
            return this._skillList.find(function (vo) {
                return vo.godType == godType && vo.attrType == attrType;
            });
        };
        GuildSkillModel.prototype.updateSkillData = function () {
            for (var _i = 0, _a = this._skillList; _i < _a.length; _i++) {
                var skill = _a[_i];
                skill.updateData();
            }
        };
        return GuildSkillModel;
    }());
    game.GuildSkillModel = GuildSkillModel;
})(game || (game = {}));
