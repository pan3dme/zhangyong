/**
* OnlineModel
*/
var game;
(function (game) {
    var OnlineModel = /** @class */ (function () {
        function OnlineModel() {
        }
        OnlineModel.getInstance = function () {
            if (!OnlineModel._instance) {
                OnlineModel._instance = new OnlineModel();
            }
            return OnlineModel._instance;
        };
        OnlineModel.prototype.getList = function () {
            if (this._list) {
                return this._list;
            }
            this._list = new Array;
            var arytab = tb.TB_online.getTB_share();
            for (var i = 0; i < arytab.length; i++) {
                var itemvo = new game.BoxVo;
                itemvo.id = i;
                itemvo.tab = arytab[i];
                itemvo.needtime = itemvo.tab.time * 60;
                this._list.push(itemvo);
            }
            return this._list;
        };
        OnlineModel.prototype.visiableView = function () {
            var list = this.getList();
            for (var i = 0; i < list.length; i++) {
                if (!list[i].isReceive()) {
                    return true;
                }
            }
            return false;
        };
        OnlineModel.prototype.lastItemState = function () {
            var list = this.getList();
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (!item.isReceive()) {
                    return { istime: !item.canReceive(), vo: item };
                }
            }
            return null;
        };
        return OnlineModel;
    }());
    game.OnlineModel = OnlineModel;
})(game || (game = {}));
