var game;
(function (game) {
    var TabBaptizeMap = /** @class */ (function () {
        function TabBaptizeMap() {
            this.map = {};
        }
        TabBaptizeMap.prototype.add = function (god) {
            var raceType = god.getRaceType();
            if (!this.map.hasOwnProperty(raceType)) {
                this.map[raceType] = new game.TabBaptizeVo;
            }
            this.map[raceType].addItem(god);
        };
        TabBaptizeMap.prototype.getNumByRaceType = function (raceType) {
            var totalNum = 0;
            if (raceType == 0) {
                for (var key in this.map) {
                    var vo = this.map[key];
                    totalNum += vo.getNum();
                }
            }
            else {
                if (this.map.hasOwnProperty(raceType)) {
                    totalNum += this.map[raceType].getNum();
                }
            }
            return totalNum;
        };
        TabBaptizeMap.prototype.getValByRaceType = function (raceType, attrKey) {
            var totalVal = 0;
            for (var key in this.map) {
                if (raceType == 0 || raceType == Number(key)) {
                    var vo = this.map[key];
                    // logyhj("阵营：",raceType,"属性键：",attrKey,"  属性值：",vo.getTotalVal(attrKey));
                    totalVal += vo.getTotalVal(attrKey);
                }
            }
            return totalVal;
        };
        return TabBaptizeMap;
    }());
    game.TabBaptizeMap = TabBaptizeMap;
})(game || (game = {}));
