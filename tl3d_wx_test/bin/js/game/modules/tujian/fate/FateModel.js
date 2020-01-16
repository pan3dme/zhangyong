var game;
(function (game) {
    var FateModel = /** @class */ (function () {
        function FateModel() {
        }
        FateModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FateModel();
            }
            return this._instance;
        };
        /** 初始化羁绊vo数组 */
        FateModel.prototype.initFateList = function () {
            if (!this.arrFateVo) {
                this.arrFateVo = [];
                var arrTbGodFate = tb.TB_god_fate.get_TB_god_fate();
                for (var _i = 0, arrTbGodFate_1 = arrTbGodFate; _i < arrTbGodFate_1.length; _i++) {
                    var obj = arrTbGodFate_1[_i];
                    this.arrFateVo.push(new game.FateVo(obj.ID));
                }
            }
            this.sort();
        };
        /** 给羁绊排序(表里配的) */
        FateModel.prototype.sort = function () {
            this.arrFateVo.sort(function (a, b) {
                var activitecA = a.isActiviteComplete();
                var activitecB = b.isActiviteComplete();
                if (activitecA == activitecB) {
                    if (activitecA) {
                        return a.tbGodFate.rank - b.tbGodFate.rank;
                    }
                    else {
                        var activiteA = a.isActivite();
                        var activiteB = b.isActivite();
                        if (activiteA == activiteB) {
                            return a.tbGodFate.rank - b.tbGodFate.rank;
                        }
                        else {
                            return activiteA ? -1 : 1;
                        }
                    }
                }
                else {
                    return activitecA ? 1 : -1;
                }
            });
        };
        /** 羁绊[已完成/总数] */
        FateModel.prototype.getFateArrNum = function () {
            var num = 0;
            var MaxNum = 0;
            this.arrFateVo.forEach(function (vo) {
                if (vo.isActiviteComplete())
                    num++;
                MaxNum++;
            });
            return [num, MaxNum];
        };
        /** 通过id获取到属性名字 */
        FateModel.prototype.getNameById = function (id) {
            return LanMgr.attrName[id];
        };
        /** 通过属性id获取到当前激活羁绊的总属性(显示到界面的) */
        FateModel.prototype.getCurFateAttrById = function (id) {
            var num = 0;
            for (var _i = 0, _a = this.arrFateVo; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.isActiviteComplete())
                    num += obj.getAttr(id);
            }
            return num;
        };
        /** 通过属性id获取当前总属性(计算神力) */
        FateModel.prototype.getCurFateAttrById2Power = function (id) {
            var num = 0;
            for (var _i = 0, _a = this.arrFateVo; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.isActiviteComplete())
                    num += obj.getAttr2Power(id);
            }
            return num;
        };
        /** 返回神力 */
        FateModel.prototype.getCurFateAttr = function () {
            this.initFateList();
            var attr = [];
            for (var i = 1; i <= 8; i++) {
                attr.push([i, this.getCurFateAttrById2Power(i)]);
            }
            return attr;
        };
        return FateModel;
    }());
    game.FateModel = FateModel;
})(game || (game = {}));
