var game;
(function (game) {
    var OpenServerGiftVo = /** @class */ (function () {
        function OpenServerGiftVo(time) {
            this._startTime = 0;
            this._endTime = Number.MAX_VALUE;
            this._timeTemp = time;
            this._giftList = [];
            this.analysisTime();
        }
        //解析活动时间
        OpenServerGiftVo.prototype.analysisTime = function () {
            switch (this._timeTemp.type) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    var openTime = App.getOpenServerTime();
                    this._startTime = openTime + (this._timeTemp.time[0] - 1) * TimeConst.ONE_DAY_SEC;
                    this._endTime = openTime + this._timeTemp.time[1] * TimeConst.ONE_DAY_SEC;
                    break;
            }
        };
        //添加活动
        OpenServerGiftVo.prototype.addGift = function (gifttemp) {
            if (!gifttemp)
                return;
            this._giftList.push(gifttemp);
        };
        //开始时间
        OpenServerGiftVo.prototype.getStartTime = function () {
            return this._startTime;
        };
        //结束时间
        OpenServerGiftVo.prototype.getEndTime = function () {
            return this._endTime;
        };
        //是否在活动时间内
        OpenServerGiftVo.prototype.isActivityTime = function () {
            var curTime = App.getServerTime();
            return this._startTime < curTime && curTime <= this._endTime;
        };
        //获取剩余时间
        OpenServerGiftVo.prototype.getRemainTime = function () {
            if (!this.isActivityTime())
                return 0;
            var curTime = App.getServerTime();
            return this._endTime - curTime;
        };
        //获取礼包列表
        OpenServerGiftVo.prototype.getGiftList = function () {
            return this._giftList;
        };
        return OpenServerGiftVo;
    }());
    game.OpenServerGiftVo = OpenServerGiftVo;
})(game || (game = {}));
