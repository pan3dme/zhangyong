var game;
(function (game) {
    var DayVo = /** @class */ (function () {
        function DayVo() {
        }
        /**
         * 是否已开放
         */
        DayVo.prototype.isopen = function () {
            var now = App.serverTime;
            var createTimeStamp = App.hero.getCreateDayTiem();
            var startTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * (this.id - 1);
            return startTime <= now;
        };
        /**
         * 是否在购买时间内
         */
        DayVo.prototype.canBuy = function () {
            var now = App.serverTime;
            var createTimeStamp = App.hero.getCreateDayTiem();
            var startTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * (this.id - 1);
            var endTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * game.OpenserverModel.getInstance().allday;
            return (startTime <= now && endTime > now);
        };
        /**
         * 是否已购买
         */
        DayVo.prototype.isbuy = function () {
            var welfare = App.hero.welfare;
            if (welfare.hasOwnProperty("doneOpenGifts") && welfare.doneOpenGifts.indexOf(this.id) != -1) {
                return true;
            }
            // if(this.isReceive()){
            //     return true;
            // }
            return false;
        };
        /**
         * 是否已领取奖励
         */
        DayVo.prototype.isReceive = function () {
            return this.isbuy();
        };
        return DayVo;
    }());
    game.DayVo = DayVo;
})(game || (game = {}));
