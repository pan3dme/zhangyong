/**
* ShareModel
*/
var game;
(function (game) {
    var ShareModel = /** @class */ (function () {
        function ShareModel() {
        }
        ShareModel.getInstance = function () {
            if (!ShareModel._instance) {
                ShareModel._instance = new ShareModel();
            }
            return ShareModel._instance;
        };
        /**
         * 累计次数
         */
        ShareModel.totalNum = function () {
            if (App.hero.welfare.hasOwnProperty("shareNumTotal")) {
                return App.hero.welfare.shareNumTotal;
            }
            logerror("share data error!(1)");
            return 0;
        };
        /**
         * 今日次数
         */
        ShareModel.todayNum = function () {
            if (App.hero.welfare.hasOwnProperty("shareNumToday")) {
                return App.hero.welfare.shareNumToday;
            }
            logerror("share data error!(2)");
            return 0;
        };
        /**
         * 是否领取首次分享的奖励
         */
        ShareModel.isReceiveFirst = function () {
            if (App.hero.welfare.hasOwnProperty("doneShares")) {
                var sharelist = App.hero.welfare.doneShares;
                return sharelist.indexOf(0) != -1;
            }
            logerror("share data error!(3)");
            return false;
        };
        ShareModel.prototype.getItemList = function () {
            var ary = tb.TB_share.getTB_share();
            var list = new Array;
            for (var i = 0; i < ary.length; i++) {
                var item = new game.ShareItemVo();
                item.tab = ary[i];
                item.id = i;
                // item.num = item.tab.type == 1?ShareModel.todayNum():ShareModel.totalNum();
                item.recive = ShareModel.receiveState(item.tab.ID);
                list.push(item);
            }
            return list;
        };
        ShareModel.receiveState = function (id) {
            var listShare = [];
            if (App.hero.welfare.hasOwnProperty("doneShares")) {
                listShare = App.hero.welfare.doneShares;
            }
            return listShare.indexOf(id) != -1;
        };
        /**
         * 是否存在红点
         * id: 首次分享—0 正常分享—表id
         */
        ShareModel.redPointVisiable = function (id) {
            var today = this.todayNum();
            var total = this.totalNum();
            if (id == 0) {
                //首次分享奖励可领取
                return total == 1 && !this.isReceiveFirst();
            }
            else {
                var tab = tb.TB_share.getTB_shareById(id);
                var num = tab.type == 1 ? today : total;
                return tab.share_num <= num && !this.receiveState(tab.ID);
            }
        };
        /** 分享时间戳 */
        ShareModel.shareTime = 0;
        return ShareModel;
    }());
    game.ShareModel = ShareModel;
})(game || (game = {}));
