var game;
(function (game) {
    var RedPointManager = /** @class */ (function () {
        function RedPointManager() {
            this._rulesDic = {};
        }
        RedPointManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new RedPointManager();
            }
            return this._instance;
        };
        /** 添加红点规则 */
        RedPointManager.prototype.addRule = function (rule) {
            if (!this.hasRule(rule.name)) {
                this._rulesDic[rule.name] = rule;
                return true;
            }
            return false;
        };
        /** 获取规则 */
        RedPointManager.prototype.getRule = function (name) {
            return this._rulesDic[name];
        };
        /** 是否存在该规则 */
        RedPointManager.prototype.hasRule = function (name) {
            return this._rulesDic[name] ? true : false;
        };
        RedPointManager.prototype.getGroupRuleInfo = function (group) {
            var obj = {};
            var ruleGroup = this.getRule(group);
            if (ruleGroup) {
                var names = ruleGroup.getRuleNames();
                for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                    var name_1 = names_1[_i];
                    var rule = this.getRule(name_1);
                    if (rule) {
                        obj[name_1] = rule.visible;
                    }
                }
            }
            // console.log(`组：${group}的红点情况`,obj);
            return obj;
        };
        /**
         *  移除规则
         *  如果是组，会递归移除子规则
         */
        RedPointManager.prototype.removeRule = function (name) {
            var findRule = this.getRule(name);
            if (!findRule)
                return false;
            if (findRule instanceof game.RedPointGroup) {
                for (var _i = 0, _a = findRule.getRuleNames(); _i < _a.length; _i++) {
                    var rname = _a[_i];
                    this.removeRule(rname);
                }
            }
            findRule.onDispose();
            delete this._rulesDic[name];
            return true;
        };
        /** 移除全部 */
        RedPointManager.prototype.removeAll = function () {
            for (var key in this._rulesDic) {
                var findRule = this.getRule(key);
                if (findRule) {
                    findRule.onDispose();
                }
            }
            this._rulesDic = {};
        };
        /** 注入规则 */
        RedPointManager.injection = function (rule) {
            RedPointManager.getInstance().addRule(rule);
            return rule;
        };
        RedPointManager.getRule = function (name) {
            return RedPointManager.getInstance().getRule(name);
        };
        RedPointManager.hasRule = function (name) {
            return RedPointManager.getInstance().hasRule(name);
        };
        RedPointManager.removeRule = function (name) {
            return RedPointManager.getInstance().removeRule(name);
        };
        RedPointManager.removeAll = function () {
            return RedPointManager.getInstance().removeAll();
        };
        return RedPointManager;
    }());
    game.RedPointManager = RedPointManager;
})(game || (game = {}));
