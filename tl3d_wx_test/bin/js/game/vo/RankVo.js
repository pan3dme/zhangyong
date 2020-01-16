var common;
(function (common) {
    var RankSvrType;
    (function (RankSvrType) {
        RankSvrType[RankSvrType["common"] = 0] = "common";
        RankSvrType[RankSvrType["matchCrossSvr"] = 1] = "matchCrossSvr";
    })(RankSvrType = common.RankSvrType || (common.RankSvrType = {}));
    /** 通用排行数据vo */
    var RankVo = /** @class */ (function () {
        function RankVo() {
        }
        RankVo.prototype.setArrayTypeGroupCopyFloor = function (ary, rank) {
            if (rank === void 0) { rank = 0; }
            this.playerId = ary[0];
            this.value = ary[1];
            this.force = ary[2];
            this.name = ary[3];
            this.head = ary[4];
            this.level = ary[5];
            this.headFrame = ary[6];
            this.rank = rank;
        };
        RankVo.prototype.setArray = function (ary, rank) {
            if (rank === void 0) { rank = 0; }
            this.playerId = ary[0];
            this.value = ary[1];
            this.name = ary[2];
            this.head = ary[3];
            this.level = ary[4];
            this.force = ary[5];
            this.headFrame = ary[6];
            this.rank = rank;
        };
        RankVo.prototype.setSvo = function (svo) {
            this.playerId = svo.playerId;
            this.name = svo.name;
            this.head = svo.head;
            this.headFrame = svo.headFrame;
            this.level = svo.level;
            this.force = svo.force;
            this.value = svo.value;
            this.rank = svo.rank;
            this.guildName = svo.guildName;
        };
        RankVo.prototype.getHeadVo = function () {
            if (!this._headVo) {
                this._headVo = new UserHeadVo(this.head, this.level, this.headFrame);
            }
            return this._headVo;
        };
        /** 获取排名图片 */
        RankVo.prototype.getRankUrl = function () {
            return SkinUtil.getRankingSkin(this.rank - 1);
        };
        // --- 中间值 ---
        RankVo.prototype.getMidDesc = function () {
            return LanMgr.getLan("", 12082);
        };
        RankVo.prototype.getMid = function () {
            return this.force;
        };
        RankVo.prototype.isShowMid = function () {
            return this.getMid() ? true : false;
        };
        // --- 底部值 ---
        RankVo.prototype.getBottomDesc = function () {
            return LanMgr.getLan("", 12083);
        };
        RankVo.prototype.getBottom = function () {
            return this.guildName ? this.guildName : LanMgr.getLan("", 12084);
        };
        RankVo.prototype.isShowBottom = function () {
            return this.guildName ? true : false;
        };
        // --- 排名值 ---
        RankVo.prototype.getValue = function () {
            return this.value;
        };
        RankVo.prototype.getValueDesc = function () {
            return LanMgr.getLan("", 12081);
        };
        return RankVo;
    }());
    common.RankVo = RankVo;
})(common || (common = {}));
