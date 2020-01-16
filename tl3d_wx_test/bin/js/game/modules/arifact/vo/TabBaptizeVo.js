var game;
(function (game) {
    var TabBaptizeVo = /** @class */ (function () {
        function TabBaptizeVo() {
            this.objList = [];
        }
        TabBaptizeVo.prototype.addItem = function (goditem) {
            this.objList.push(goditem);
        };
        TabBaptizeVo.prototype.getNum = function () {
            return this.objList.length;
        };
        TabBaptizeVo.prototype.getTotalVal = function (attrKey) {
            var totalVal = 0;
            for (var i = 0; i < this.objList.length; i++) {
                var obj = this.objList[i];
                totalVal += obj.getAttrValByKeyOnBaseAttr(attrKey);
            }
            return totalVal;
        };
        return TabBaptizeVo;
    }());
    game.TabBaptizeVo = TabBaptizeVo;
})(game || (game = {}));
