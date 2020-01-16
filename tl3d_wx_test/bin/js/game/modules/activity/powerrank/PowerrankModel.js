/**
* PowerrankModel
*/
var game;
(function (game) {
    var PowerrankModel = /** @class */ (function () {
        function PowerrankModel() {
            this.rankingList = {};
            //登录红点
            this.firstLogin = false;
        }
        PowerrankModel.getInstance = function () {
            if (!PowerrankModel._instance) {
                PowerrankModel._instance = new PowerrankModel();
            }
            return PowerrankModel._instance;
        };
        PowerrankModel.prototype.visiableView = function () {
            var nTime = App.getOpenServerTime() + (tb.TB_rank_type.getPowerRanKEndTime() + 1) * TimeConst.ONE_DAY_SEC;
            var visibleTime = nTime - App.getServerTime();
            return visibleTime > 0;
        };
        return PowerrankModel;
    }());
    game.PowerrankModel = PowerrankModel;
})(game || (game = {}));
