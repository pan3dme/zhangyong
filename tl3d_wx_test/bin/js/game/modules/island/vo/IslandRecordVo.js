var game;
(function (game) {
    var IslandRecordVo = /** @class */ (function () {
        function IslandRecordVo(svo) {
            this.svo = svo;
            this.tbOre = tb.TB_island_level.getItemById(svo.mineType);
        }
        IslandRecordVo.prototype.getTitle = function () {
            return this.svo.recordType == iface.tb_prop.mineRecordTypeKey.finish ? LanMgr.getLan("", 12199) : LanMgr.getLan("", 12200);
        };
        IslandRecordVo.prototype.getContent = function () {
            if (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.finish) {
                return "" + this.getTimePrev() + LanMgr.getLan("", 12205, this.tbOre.name) + (this.isGoto ? LanMgr.getLan("", 12206) : "");
            }
            else if (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.occupyFail) {
                if (this.isHasItemList()) {
                    return "" + this.getTimePrev() + LanMgr.getLan("", 12207, this.tbOre.name, this.svo.name) + LanMgr.getLan("", 12208) + (this.isGoto ? LanMgr.getLan("", 12206) : "");
                }
                else {
                    return "" + this.getTimePrev() + LanMgr.getLan("", 12207, this.tbOre.name, this.svo.name);
                }
            }
            else if (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.occupySuccess) {
                return "" + this.getTimePrev() + LanMgr.getLan("", 12203, this.svo.name);
            }
            else if (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.robSuccess) {
                return "" + this.getTimePrev() + LanMgr.getLan("", 12204, this.svo.name);
            }
            else {
                if (this.isHasItemList()) {
                    return "" + this.getTimePrev() + LanMgr.getLan("", 12201, this.svo.name);
                }
                else {
                    return "" + this.getTimePrev() + LanMgr.getLan("", 12202, this.svo.name);
                }
            }
        };
        IslandRecordVo.prototype.getTimePrev = function () {
            var lastTime = App.serverTimeSecond - this.svo.recordTime;
            var str = "";
            if (lastTime < 3600) {
                str = Math.ceil(lastTime / 60) + LanMgr.getLan("", 12097) + ',';
            }
            else if (lastTime < 86800) {
                str = Math.ceil(lastTime / 3600) + LanMgr.getLan("", 12098) + ',';
            }
            else {
                str = Math.ceil(lastTime / 86800) + LanMgr.getLan("", 12099) + ',';
            }
            return str;
        };
        IslandRecordVo.prototype.getLossList = function () {
            if (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.robSuccess) {
                return [];
            }
            if (!this._itemList) {
                this._itemList = [];
                for (var _i = 0, _a = this.svo.rewardInfo; _i < _a.length; _i++) {
                    var ary = _a[_i];
                    this._itemList.push(new ItemVo(ary[0], ary[1]));
                }
            }
            return this._itemList;
        };
        /** 是否有奖励或者损失物品 */
        IslandRecordVo.prototype.isHasItemList = function () {
            return this.getLossList().length > 0;
        };
        /** 是有有奖励：采集完成或者被占领 */
        IslandRecordVo.prototype.isHasReward = function () {
            return this.isHasItemList() && (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.occupyFail || this.svo.recordType == iface.tb_prop.mineRecordTypeKey.finish);
        };
        return IslandRecordVo;
    }());
    game.IslandRecordVo = IslandRecordVo;
})(game || (game = {}));
