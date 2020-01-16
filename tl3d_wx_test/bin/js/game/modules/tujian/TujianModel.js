/**
* name
*/
var game;
(function (game) {
    var TujianModel = /** @class */ (function () {
        function TujianModel() {
            //英雄详细界面的index
            this.index = 0;
            this.yeqianData = [[1], [1, 2, 3], [1, 2, 3]];
            this.tabNames = [LanMgr.getLan("", 12114), LanMgr.getLan("", 12115), LanMgr.getLan("", 12116)];
        }
        TujianModel.getInstance = function () {
            if (!TujianModel._instance) {
                TujianModel._instance = new TujianModel();
            }
            return TujianModel._instance;
        };
        //获取图鉴英雄模板
        TujianModel.prototype.getTuJianGodTArr = function () {
            if (!this._tuJianGodTArr) {
                this._tuJianGodTArr = [];
                var tabGods = TableData.getInstance().getTableByName(TableData.tb_god).data;
                if (tabGods) {
                    for (var key in tabGods) {
                        var godt = tabGods[key];
                        if (godt) {
                            var startLv = godt.star[0];
                            var endLv = godt.star[1];
                            if (endLv < startLv) {
                                logwarn("英雄模板等级配置错误，最大等级小于最小等级:", godt.name);
                                continue;
                            }
                            for (var lv = startLv; lv <= endLv; lv++) {
                                var temp = new TuJianGodTemp();
                                temp.init(godt, lv);
                                this._tuJianGodTArr.push(temp);
                            }
                        }
                    }
                    //排序
                    this._tuJianGodTArr.sort(function (a, b) {
                        var sorta = 0;
                        var sortb = 0;
                        if (a.starLv != b.starLv) {
                            //等级
                            sorta = a.starLv;
                            sortb = b.starLv;
                        }
                        else {
                            //阵营
                            sorta = a.godTemp.race_type;
                            sortb = b.godTemp.race_type;
                        }
                        return sorta - sortb;
                    });
                }
            }
            return this._tuJianGodTArr;
        };
        return TujianModel;
    }());
    game.TujianModel = TujianModel;
    var TuJianGodTemp = /** @class */ (function () {
        function TuJianGodTemp() {
        }
        //初始化
        TuJianGodTemp.prototype.init = function (godT, starLevel) {
            this.godTemp = godT;
            this.starLv = starLevel;
            if (this.starLv < godT.star[0]) {
                this.starLv = godT.star[0];
            }
            else if (this.starLv > godT.star[1]) {
                this.starLv = godT.star[1];
            }
        };
        return TuJianGodTemp;
    }());
    game.TuJianGodTemp = TuJianGodTemp;
})(game || (game = {}));
