var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var OreSpotInfoVo = /** @class */ (function (_super) {
        __extends(OreSpotInfoVo, _super);
        function OreSpotInfoVo(pos, tbland) {
            var _this = _super.call(this) || this;
            _this.tbIsland = tbland;
            _this.pos = pos;
            return _this;
        }
        /** 设置矿产基础数据 */
        OreSpotInfoVo.prototype.setSimpleInfo = function (info) {
            if (this.svo && info) {
                for (var key in info) {
                    this.svo[key] = info[key];
                }
                // 上一时刻有人占领,时间到之后刷新了无人占领的矿产，需要置空占领数据；如果刷新到的是有人占领的矿产，上面循环赋值了
                if (this.svo.playerId && !info.playerId) {
                    this.clearDetailInfo();
                }
            }
            else {
                this.svo = info;
            }
            this.tbOre = info ? tb.TB_island_level.getItemById(info.mineType) : null;
        };
        /** 清除矿点占领信息 */
        OreSpotInfoVo.prototype.clearDetailInfo = function () {
            this.svo.playerId = null;
            this.svo.playerName = null;
            this.svo.force = 0;
            this.svo.lineupInfo = [[], []];
            this.svo.occupyTime = 0;
            this.svo.profitInfo = [];
            this.svo.robCount = 0;
            this.svo.startTime = 0;
            this.svo.level = 0;
            this.svo.head = 0;
        };
        OreSpotInfoVo.prototype.setDetailInfo = function (info) {
            for (var key in info) {
                this.svo[key] = info[key];
            }
            _super.prototype.setLineupInfo.call(this, this.svo.lineupInfo);
            // 当前收益
            this._specialAward = [];
            var commonReward = this.tbOre.reward;
            for (var _i = 0, _a = info.profitInfo; _i < _a.length; _i++) {
                var ary = _a[_i];
                if (ary[0] == Number(commonReward[0])) {
                    this._award = [ary[0], ary[1]];
                }
                else {
                    this._specialAward.push(new ItemVo(ary[0], ary[1]));
                }
            }
            if (!this._award) {
                this._award = [Number(commonReward[0]), 0];
            }
        };
        OreSpotInfoVo.prototype.getHeadVo = function () {
            if (this.hasUser()) {
                return new UserHeadVo(this.svo.head, this.svo.level, this.svo.headFrame);
            }
            return null;
        };
        /** 获取特殊奖励 */
        OreSpotInfoVo.prototype.getSpecialAward = function () {
            return this._specialAward;
        };
        /** 累积奖励 */
        OreSpotInfoVo.prototype.getAward = function () {
            return this._award;
        };
        /** 抢夺奖励 */
        OreSpotInfoVo.prototype.getRobAward = function () {
            var award = this._award;
            return [award[0], Math.floor(Number(award[1]) * this.tbOre.plunder_loss / 100)];
        };
        /** 是否有矿产 */
        OreSpotInfoVo.prototype.isExist = function () {
            return this.svo && this.svo.mineIndex ? true : false;
        };
        /** 是否有玩家占领 */
        OreSpotInfoVo.prototype.hasUser = function () {
            return this.svo && this.svo.playerId ? true : false;
        };
        /** 是否自身 */
        OreSpotInfoVo.prototype.isSelf = function () {
            return this.svo && this.svo.playerId == App.hero.playerId;
        };
        /** 是否采集结束了 */
        OreSpotInfoVo.prototype.isOutTime = function () {
            return this.getAllOccupyTime() >= this.tbOre.max_time;
        };
        /** 获取总的采集时间 */
        OreSpotInfoVo.prototype.getAllOccupyTime = function () {
            var occupyTime = 0;
            if (this.svo.startTime > 0) {
                occupyTime = App.serverTimeSecond - this.svo.startTime;
            }
            return occupyTime + this.svo.occupyTime;
        };
        OreSpotInfoVo.prototype.getFightDesc = function () {
            return this.isOccupyFight ? LanMgr.getLan("", 12198) : "";
        };
        /** 复制一份数据 */
        OreSpotInfoVo.copy = function (oldInfo) {
            var vo = new OreSpotInfoVo(oldInfo.pos, oldInfo.tbIsland);
            var simpleInfo = { mineIndex: oldInfo.svo.mineIndex, mineId: oldInfo.svo.mineId, mineType: oldInfo.svo.mineType };
            vo.setSimpleInfo(simpleInfo);
            var data = JSON.parse(JSON.stringify(oldInfo.svo));
            vo.setDetailInfo(data);
            return vo;
        };
        return OreSpotInfoVo;
    }(BaseFightVo));
    game.OreSpotInfoVo = OreSpotInfoVo;
})(game || (game = {}));
