/**
* DafuwengModel
*/
var game;
(function (game) {
    var RiskType;
    (function (RiskType) {
        RiskType[RiskType["EMPTY"] = 0] = "EMPTY";
        RiskType[RiskType["PROP"] = 1] = "PROP";
        RiskType[RiskType["OUT"] = 2] = "OUT";
        RiskType[RiskType["QUESTION"] = 3] = "QUESTION";
        RiskType[RiskType["BOX"] = 4] = "BOX";
        RiskType[RiskType["CAIQUAN"] = 5] = "CAIQUAN";
        RiskType[RiskType["CAIDAXIAO"] = 6] = "CAIDAXIAO";
        RiskType[RiskType["BIYANLI"] = 7] = "BIYANLI";
    })(RiskType = game.RiskType || (game.RiskType = {}));
    var DafuwengModel = /** @class */ (function () {
        function DafuwengModel() {
            // 十次探险选中
            this.TEN_SELECT = false;
            this.riskList = [];
        }
        DafuwengModel.getInstance = function () {
            if (!DafuwengModel._instance) {
                DafuwengModel._instance = new DafuwengModel();
            }
            return DafuwengModel._instance;
        };
        /** 初始化数据 */
        DafuwengModel.prototype.initData = function () {
            var welfare = App.hero.welfare;
            this.curRiskId = isEmptyObject(welfare) ? 0 : welfare.curRiskId;
            this.riskIds = isEmptyObject(welfare) ? [] : welfare.riskIds;
            this.riskInfo = isEmptyObject(welfare) ? {} : welfare.riskInfo;
            this.riskList.length = 0;
            for (var key in this.riskInfo) {
                var vo = new game.DafuwengVo(Number(key), this.riskInfo[key]);
                if (!vo.isExpire()) {
                    this.riskList.push(vo);
                }
            }
            this.resetTimeout();
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.UPDATE_RISK_INFO));
        };
        /** 获取奇遇列表 */
        DafuwengModel.prototype.getRiskList = function (sort) {
            if (sort === void 0) { sort = false; }
            this.checkInvaildRisk();
            if (sort) {
                this.riskList.sort(function (a, b) {
                    return a.svo.limitTime - b.svo.limitTime;
                });
            }
            return this.riskList;
        };
        /** 添加奇遇信息 */
        DafuwengModel.prototype.addRiskInfo = function (riskSvo) {
            var addVos = [];
            for (var key in riskSvo) {
                this.riskInfo[key] = riskSvo[key];
                var vo = new game.DafuwengVo(Number(key), riskSvo[key]);
                this.riskList.push(vo);
                addVos.push(vo);
            }
            this.resetTimeout();
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.ADD_RISK_INFO));
            return addVos;
        };
        /** 删除奇遇信息 */
        DafuwengModel.prototype.delRiskInfo = function (keys) {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                delete this.riskInfo[key];
            }
            for (var i = this.riskList.length - 1; i >= 0; i--) {
                if (keys.indexOf(this.riskList[i].key) != -1) {
                    this.riskList.splice(i, 1);
                }
            }
            this.resetTimeout();
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.DEL_RISK_INFO));
        };
        /** 获取奇遇信息 */
        DafuwengModel.prototype.getRiskInfo = function (key) {
            return this.riskList.find(function (vo) {
                return vo.key == key;
            });
        };
        /** 检测无效奇遇：过期 */
        DafuwengModel.prototype.checkInvaildRisk = function () {
            var keys = [];
            for (var _i = 0, _a = this.riskList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.isExpire()) {
                    keys.push(vo.key);
                }
            }
            if (keys.length > 0) {
                this.delRiskInfo(keys);
            }
        };
        /** 重置最大超时时间 */
        DafuwengModel.prototype.resetTimeout = function () {
            var maxTime = 0;
            for (var _i = 0, _a = this.riskList; _i < _a.length; _i++) {
                var vo = _a[_i];
                if (vo.svo.limitTime > maxTime) {
                    maxTime = vo.svo.limitTime;
                }
            }
            var time = maxTime - App.serverTimeSecond;
            Laya.timer.clearAll(this);
            if (time > 0) {
                Laya.timer.once(time * 1000, this, function () {
                    dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.UPDATE_RISK_INFO));
                });
            }
        };
        DafuwengModel.STEP_COUNT = 80;
        return DafuwengModel;
    }());
    game.DafuwengModel = DafuwengModel;
})(game || (game = {}));
