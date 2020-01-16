var BaseFightVo = /** @class */ (function () {
    function BaseFightVo() {
    }
    BaseFightVo.prototype.setLineupInfo = function (info) {
        this.lineupInfo = info;
        this.lineupGods = [];
        var ary = info && info[0] ? info[0] : [];
        for (var i = 0; i < ary.length; i++) {
            var godData = ary[i];
            if (godData) {
                var param = {
                    templateId: godData[0],
                    starLevel: godData[1],
                    level: godData[2],
                    degree: godData[4],
                    awakenLv: godData[5],
                    skinId: godData[6],
                };
                var god = App.hero.createGodVo(param, -i);
                if (godData[3]) {
                    god.iSeverAttri = map2ary(godData[3]);
                }
                this.lineupGods.push(god);
            }
            else {
                this.lineupGods.push(null);
            }
        }
        this.shenqiVo = info && info[1] ? info[1] : [];
    };
    BaseFightVo.prototype.getShenqiAry = function () {
        return this.shenqiVo;
    };
    /** 获取玩家的英雄id组 */
    BaseFightVo.prototype.getLineupGodIds = function () {
        var ary = [];
        for (var i = 0; i < this.lineupGods.length; i++) {
            var vo = this.lineupGods[i];
            if (vo) {
                ary.push(vo.templateId);
            }
            else {
                ary.push(0);
            }
        }
        return ary;
    };
    /** 获取存在的怪物数据 */
    BaseFightVo.prototype.getExistGods = function () {
        return this.lineupGods.filter(function (vo) {
            return vo && vo.templateId;
        });
    };
    /** 设置数据类型 */
    BaseFightVo.prototype.setDataType = function (dataType) {
        for (var _i = 0, _a = this.lineupGods; _i < _a.length; _i++) {
            var godvo = _a[_i];
            if (godvo) {
                godvo.dataType = dataType;
            }
        }
    };
    /** 获取阵容神灵-有位置的 */
    BaseFightVo.prototype.getLineupGods = function () {
        return this.lineupGods;
    };
    /** 获取英雄总血量 */
    BaseFightVo.prototype.getGodTotalHp = function (tbid) {
        var lineupInfo = this.lineupInfo && this.lineupInfo[0] ? this.lineupInfo[0] : [];
        var god = lineupInfo.find(function (ary) {
            return ary && ary[0] == tbid;
        });
        return god && god[3] ? god[3]['1'] : 0;
    };
    /** 获取阵容总血量 */
    BaseFightVo.prototype.getLineupTotalHp = function () {
        var blood = 0;
        var lineupInfo = this.lineupInfo && this.lineupInfo[0] ? this.lineupInfo[0] : [];
        for (var _i = 0, lineupInfo_1 = lineupInfo; _i < lineupInfo_1.length; _i++) {
            var ary = lineupInfo_1[_i];
            blood += (ary && ary[3]['1'] ? ary[3]['1'] : 0);
        }
        return blood;
    };
    /** 是否有阵容信息 */
    BaseFightVo.prototype.isHasLineup = function () {
        return this.lineupInfo && this.lineupInfo.length > 0;
    };
    BaseFightVo.prototype.turnTemplatID = function (objs) {
        var ary = {};
        var infos = this.lineupInfo[0];
        for (var key in objs) {
            var id = (Number(key) % 10) - 1;
            ary[infos[id][0]] = objs[key];
        }
        return ary;
    };
    /** 清除阵容数据 */
    BaseFightVo.prototype.clearLineupInfo = function () {
        this.lineupInfo = [];
        this.lineupGods = [];
        this.shenqiVo = [];
    };
    return BaseFightVo;
}());
