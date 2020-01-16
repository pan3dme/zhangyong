var game;
(function (game) {
    var IslandQueueMgr = /** @class */ (function () {
        function IslandQueueMgr() {
            this._recordList = [];
        }
        IslandQueueMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new IslandQueueMgr();
            }
            return this._instance;
        };
        /** 请求查看是否有被抢占时留下的收益未领取
         *  当有记录时，弹出提示；关闭时
         */
        IslandQueueMgr.prototype.requestRobbed = function (isGoto, force) {
            var _this = this;
            if (force === void 0) { force = false; }
            if (UIMgr.hasStage(UIConst.FightViews) || UIMgr.hasStage(UIConst.OreSettlementView))
                return;
            if (force || game.IslandModel.getInstance().hasNewRecord) {
                PLC.request(Protocol.game_mine_mineRobList, null, function ($data) {
                    if (!$data)
                        return;
                    var grabList = $data.grabList ? $data.grabList : [];
                    if (grabList.length > 0) {
                        _this.pushRecords(grabList, isGoto);
                        _this.showNoticeView();
                    }
                }, false);
            }
        };
        /** 显示提示界面 */
        IslandQueueMgr.prototype.showNoticeView = function () {
            if (UIMgr.hasStage(UIConst.FightViews) || this._recordList.length == 0) {
                this.clearRecords();
                return;
            }
            var info = this._recordList.shift();
            if (info && info.recordVo) {
                UIMgr.showUI(UIConst.OreSettlementView, info);
            }
        };
        /** 推入记录 */
        IslandQueueMgr.prototype.pushRecords = function (grabList, isGoto) {
            for (var _i = 0, grabList_1 = grabList; _i < grabList_1.length; _i++) {
                var svo = grabList_1[_i];
                if (!this.isExistRcord(svo.recordId)) {
                    var recordVo = new game.IslandRecordVo(svo);
                    recordVo.isGoto = isGoto;
                    var info = { title: recordVo.getTitle(), content: recordVo.getContent(), itemArray: recordVo.getLossList(), recordVo: recordVo };
                    this._recordList.push(info);
                }
            }
            this._recordList.sort(function (a, b) {
                return b.recordVo.svo.recordTime - a.recordVo.svo.recordTime;
            });
        };
        /** 清除记录 */
        IslandQueueMgr.prototype.clearRecords = function () {
            this._recordList.length = 0;
        };
        /** 获取记录 */
        IslandQueueMgr.prototype.getRecordVo = function (recordId) {
            return this._recordList.find(function (vo) {
                return vo.recordVo.svo.recordId == recordId;
            });
        };
        /** 是否存在记录 */
        IslandQueueMgr.prototype.isExistRcord = function (recordId) {
            return this.getRecordVo(recordId) ? true : false;
        };
        /** 是否存在记录 */
        IslandQueueMgr.prototype.isHasRcord = function () {
            return this._recordList.length > 0;
        };
        return IslandQueueMgr;
    }());
    game.IslandQueueMgr = IslandQueueMgr;
})(game || (game = {}));
