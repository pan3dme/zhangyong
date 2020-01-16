var game;
(function (game) {
    var BoxVo = /** @class */ (function () {
        function BoxVo() {
        }
        /** 是否可领取 */
        BoxVo.prototype.canReceive = function () {
            //已经在线的秒数
            var lastTime = App.getServerTime() - App.hero.onlineEndTime;
            lastTime += App.hero.totalOnlineTime;
            if (lastTime >= this.needtime) {
                //可以领取
                return true;
            }
            return false;
        };
        /** 是否已领取 */
        BoxVo.prototype.isReceive = function () {
            if (App.hero.welfare.hasOwnProperty("onlineTimeAward")) {
                return App.hero.welfare.onlineTimeAward.hasOwnProperty(this.tab.ID) ? (App.hero.welfare.onlineTimeAward[this.tab.ID] == 1) : false;
            }
            else {
                return false;
            }
        };
        /** 红点判断 */
        BoxVo.prototype.onRedPoint = function () {
            return this.canReceive() && !this.isReceive();
        };
        /** 倒计时时间 */
        BoxVo.prototype.onTime = function () {
            //已经在线的秒数
            var lastTime = App.getServerTime() - App.hero.onlineEndTime;
            lastTime += App.hero.totalOnlineTime;
            if (lastTime >= this.needtime) {
                //可以领取
                return "";
            }
            return GameUtil.toCountdown(Math.floor(this.needtime - lastTime), "mm:ss", 2);
        };
        return BoxVo;
    }());
    game.BoxVo = BoxVo;
})(game || (game = {}));
