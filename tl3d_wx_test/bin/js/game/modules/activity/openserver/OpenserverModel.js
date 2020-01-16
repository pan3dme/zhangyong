/**
* OpenserverModel
*/
var game;
(function (game) {
    var OpenserverModel = /** @class */ (function () {
        function OpenserverModel() {
            this._osGiftStartTime = 0;
            this._osGiftEndTime = 0;
            this.initOpenServerGift();
        }
        OpenserverModel.getInstance = function () {
            if (!OpenserverModel._instance) {
                OpenserverModel._instance = new OpenserverModel();
            }
            return OpenserverModel._instance;
        };
        OpenserverModel.prototype.initOpenServerGift = function () {
            this._openServerGiftVoArr = [];
            var alldata = TableData.getInstance().getTableByName(TableData.tb_openservice_gift).data;
            for (var key in alldata) {
                var temp = alldata[key];
                if (temp) {
                    if (!this._openServerGiftVoArr[temp.time_index - 1]) {
                        var giftTime = tb.TB_gift_time.getSet(temp.time_index);
                        var osGiftVo = new game.OpenServerGiftVo(giftTime);
                        this._openServerGiftVoArr[temp.time_index - 1] = osGiftVo;
                        if (this._osGiftStartTime == 0 || this._osGiftStartTime > osGiftVo.getStartTime()) {
                            this._osGiftStartTime = osGiftVo.getStartTime();
                        }
                        if (osGiftVo.getEndTime() > this._osGiftEndTime) {
                            this._osGiftEndTime = osGiftVo.getEndTime();
                        }
                    }
                    this._openServerGiftVoArr[temp.time_index - 1].addGift(temp);
                }
            }
        };
        //获取开服礼包数据
        OpenserverModel.prototype.getOpenServerGiftVoArr = function () {
            return this._openServerGiftVoArr;
        };
        //获取当前开服礼包活动数据
        OpenserverModel.prototype.getCurOpenServerGiftVo = function (stayLast) {
            if (stayLast === void 0) { stayLast = false; }
            for (var i = 0; i < this._openServerGiftVoArr.length; i++) {
                if (this._openServerGiftVoArr[i].isActivityTime()) {
                    return this._openServerGiftVoArr[i];
                }
            }
            return stayLast && this._openServerGiftVoArr.length > 0 ? this._openServerGiftVoArr[this._openServerGiftVoArr.length - 1] : null;
        };
        //获取开服礼包开始时间
        OpenserverModel.prototype.getOsGiftStartTime = function () {
            return this._osGiftStartTime;
        };
        //获取开服礼包结束时间
        OpenserverModel.prototype.getOsGiftEndTime = function () {
            return this._osGiftEndTime;
        };
        //是否有开服礼包活动
        OpenserverModel.prototype.hasOsGiftActivity = function () {
            var curTime = App.getServerTime();
            return this._osGiftStartTime < curTime && curTime < this._osGiftEndTime;
        };
        //获取开服礼包活动数据
        OpenserverModel.prototype.getOsGiftByRechargeid = function (id) {
            for (var i = 0; i < this._openServerGiftVoArr.length; i++) {
                if (this._openServerGiftVoArr[i].isActivityTime()) {
                    var allgift = this._openServerGiftVoArr[i].getGiftList();
                    for (var j = 0; j < allgift.length; j++) {
                        if (allgift[j].charge_id == id)
                            return allgift[j];
                    }
                }
            }
            return null;
        };
        OpenserverModel.prototype.init = function () {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_openservice);
            var keys = Object.keys($obj.data);
            this.allday = Number(keys[keys.length - 1]);
            this._payList = [];
        };
        OpenserverModel.prototype.getList = function () {
            if (this._list) {
                return this._list;
            }
            this._list = new Array;
            var tabary = tb.TB_openservice.getTB_openservice();
            for (var i = 0; i < tabary.length; i++) {
                var vo = new game.DayVo;
                vo.tab = tabary[i];
                vo.id = vo.tab.ID;
                this._list.push(vo);
            }
            return this._list;
        };
        OpenserverModel.prototype.addpay = function ($id) {
            if (this._payList.indexOf($id) == -1) {
                this._payList.push($id);
            }
        };
        OpenserverModel.prototype.delpay = function ($id) {
            var delid = this._payList.indexOf($id);
            if (delid != -1) {
                this._payList.splice(delid, 1);
            }
        };
        OpenserverModel.prototype.hasPay = function ($id) {
            return this._payList.indexOf($id) != -1;
        };
        OpenserverModel.prototype.visiableView = function () {
            var $obj = TableData.getInstance().getTableByName(TableData.tb_openservice);
            var keys = Object.keys($obj.data);
            this.allday = Number(keys[keys.length - 1]);
            var list = this.getList();
            for (var i = 0; i < list.length; i++) {
                var element = list[i];
                if (element.canBuy()) {
                    return true;
                }
                if (element.isbuy() && !element.isReceive()) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 是否在购买时间内
         */
        OpenserverModel.prototype.needtime = function () {
            var now = App.serverTime;
            var createTimeStamp = App.hero.getCreateDayTiem();
            var endTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * OpenserverModel.getInstance().allday;
            return endTime > now;
        };
        OpenserverModel.prototype.onTime = function () {
            var createTimeStamp = App.hero.getCreateDayTiem();
            var endTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * OpenserverModel.getInstance().allday;
            return LanMgr.getLan("", 12632) + activityTime(endTime / 1000, App.getServerTime());
        };
        return OpenserverModel;
    }());
    game.OpenserverModel = OpenserverModel;
})(game || (game = {}));
