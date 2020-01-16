var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
* name
*/
var game;
(function (game) {
    var ArenaInfoVo = /** @class */ (function () {
        function ArenaInfoVo(data, myRank) {
            this.defInfo = []; /**阵容 */
            this.playerId = null; /**ID */
            this.godIcon = ""; /**神灵卡片 */
            if (typeof data == "number") {
                this.rank = data;
            }
            else {
                for (var key in data) {
                    this[key] = data[key];
                }
            }
            this.initData();
            this.type = common.LinuepType.arena;
            this.myRank = myRank;
        }
        Object.defineProperty(ArenaInfoVo.prototype, "force", {
            get: function () {
                // if(this.isMySelf()) return modulegod.GodModel.getInstance().getForce(iface.tb_prop.lineupTypeKey.attack);
                return this._force;
            },
            set: function (v) {
                this._force = v;
            },
            enumerable: true,
            configurable: true
        });
        /** 初始化数据 */
        ArenaInfoVo.prototype.initData = function () {
            if (this.isNpc()) {
                var data = this.tbData = tb.TB_arena_new_npc.getTB_arena_newById(this.rank);
                this.force = data.power;
                this.level = data.level;
                this.name = data.name;
                this.sex = data.head;
                this.head = data.head;
                this.headFrame = 0;
                this.maxForceGodId = data.getModelId();
                this.maxForceGodModel = game.GodUtils.getShowGodModel(this.maxForceGodId, 0);
            }
            else {
                this.maxForceGodModel = game.GodUtils.getShowGodModel(this.maxForceGodId, this.skinId);
            }
            if (!this.guildName)
                this.guildName = LanMgr.getLan("", 12561);
        };
        /**如果是两千名并且自己是两千名,数据改为自己的 */
        ArenaInfoVo.prototype.setDataAtAppHero = function () {
            this.defInfo[0] = __spreadArrays(App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack));
            if (this.defInfo[0].length == 0) {
                var god_1 = new GodItemVo(tb.TB_god.get_TB_godById(3002));
                this.defInfo[0].push(god_1);
            }
            var shenqiId = App.hero.lineupArtifactInfo[iface.tb_prop.lineupTypeKey.attack] || 0;
            this.defInfo[1] = [shenqiId];
            var god = this.getDefLinueupFirst();
            this.maxForceGodId = god.tab_god.model;
            this.maxForceGodModel = god.getModel();
            this.guildName = App.hero.guildName;
            this.playerId = App.hero.playerId;
            this.level = App.hero.level;
            this.name = App.hero.name;
            this.head = App.hero.getHeadId();
            this.sex = App.hero.sex;
            this.headFrame = App.hero.headFrame;
            this.force = game.GodModel.getInstance().getForce(iface.tb_prop.lineupTypeKey.attack);
            this.tbData = null;
        };
        /**设置阵容 */
        ArenaInfoVo.prototype.setDefInfo = function (data) {
            this.defInfo = [[]];
            for (var key in data[0]) {
                var info = data[0][key];
                if (!info) {
                    this.defInfo[0].push(null);
                    continue;
                }
                var god = tb.TB_god.get_TB_godById(info[0]);
                var godVo = new GodItemVo(god);
                if (godVo) {
                    godVo.level = info[2];
                    godVo.starLevel = info[1];
                    godVo.templateId = info[0];
                    godVo.degree = info[4];
                    godVo.awakenLv = info[5];
                    godVo.skinId = info[6];
                    godVo.iSeverAttri = map2ary(info[3]);
                    godVo.iSeverAttri.forEach(function (ary) { return ary[0]--; });
                }
                this.defInfo[0].push(godVo);
            }
            this.defInfo[1] = data[1];
        };
        ArenaInfoVo.prototype.getLineupGods = function () {
            var list = this.getLinueUpAry();
            return list ? list : [this.getDefLinueupFirst()];
        };
        ArenaInfoVo.prototype.getShenqiAry = function () {
            return this.defInfo[1];
        };
        /**获得防守阵容的第一个神灵 */
        ArenaInfoVo.prototype.getDefLinueupFirst = function () {
            if (this.defInfo[0])
                return this.defInfo[0].find(function (vo) { return !!vo; });
            else {
                var god = new GodItemVo(tb.TB_god.get_TB_godById(3002));
                return god;
            }
        };
        /**玩家阵容信息 */
        ArenaInfoVo.prototype.getLinueUpAry = function () {
            return this.isNpc() ? this.tbData.getMonsters() : this.defInfo[0];
        };
        /**是否是自己 */
        ArenaInfoVo.prototype.isMySelf = function () {
            return this.playerId == App.hero.playerId;
        };
        /**是否是机器人 */
        ArenaInfoVo.prototype.isNpc = function () {
            return !this.playerId ? true : false;
        };
        /**是否是前三 */
        ArenaInfoVo.prototype.isBeforeThree = function () {
            return this.rank <= 3;
        };
        return ArenaInfoVo;
    }());
    game.ArenaInfoVo = ArenaInfoVo;
})(game || (game = {}));
