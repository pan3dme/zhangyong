var game;
(function (game) {
    var RedPointGroup = /** @class */ (function () {
        function RedPointGroup(name, rules) {
            /** 子规则名称数组 */
            this._ruleNames = [];
            /** 子规则数组 */
            // private _ruleArr:IRedPointRule[] = [];
            this._handlers = [];
            this._initialized = false;
            this._name = name;
            this._ruleNames = rules;
        }
        Object.defineProperty(RedPointGroup.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RedPointGroup.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        /** 初始化 */
        RedPointGroup.prototype.initRules = function () {
            var _this = this;
            if (this._initialized == false) {
                this._initialized = true;
                this.init();
                this._ruleNames.forEach(function (name) {
                    var rule = game.RedPointManager.getRule(name);
                    if (rule) {
                        rule.addHandler(new Handler(_this, _this.updateVisible));
                    }
                });
            }
        };
        RedPointGroup.prototype.init = function () {
        };
        /** 更新红点可视状态 */
        RedPointGroup.prototype.updateVisible = function () {
            this._visible = this._ruleNames.some(function (name) {
                var rule = game.RedPointManager.getRule(name);
                return rule && rule.visible;
            });
            this.runHandler();
        };
        /** 执行界面状态更新处理器 */
        RedPointGroup.prototype.runHandler = function () {
            for (var i = 0; i < this._handlers.length; i++) {
                var handler = this._handlers[i];
                handler.runWith(handler.args);
            }
        };
        /** 添加界面状态更新处理器 */
        RedPointGroup.prototype.addHandler = function (handler) {
            // 先添加子处理器
            this.initRules();
            // 再添加父处理器
            if (!this.hasHandler(handler.method, handler.caller)) {
                this._handlers.push(handler);
                handler.runWith(handler.args);
            }
            else {
                logdebug('RedPointGroup: the handler already exists');
            }
        };
        /** 是否有处理器 */
        RedPointGroup.prototype.hasHandler = function (callback, context) {
            return this._handlers.some(function (handler) {
                return handler.caller == context && handler.method == callback;
            });
        };
        /** 移除处理器 */
        RedPointGroup.prototype.removeHandler = function (callback, context) {
            var find = this.getHandler(callback, context);
            if (find) {
                var index = this._handlers.indexOf(find);
                this._handlers.splice(index, 1);
            }
        };
        /** 清除 */
        RedPointGroup.prototype.clearHandler = function () {
            this._handlers = [];
        };
        /** 获取处理器 */
        RedPointGroup.prototype.getHandler = function (callback, context) {
            return this._handlers.find(function (handler) {
                return handler.caller == context && handler.method == callback;
            });
        };
        /** 是否存在规则 */
        RedPointGroup.prototype.hasRule = function (name) {
            return this._ruleNames.some(function (rname) {
                return rname == name;
            });
        };
        /** 添加规则 */
        RedPointGroup.prototype.addRule = function (rule) {
            if (!this.hasRule(rule.name)) {
                this._ruleNames.push(rule.name);
                // 需要添加处理回调方法
                rule.addHandler(new Handler(this, this.updateVisible));
                return true;
            }
            return false;
        };
        /** 添加规则 */
        RedPointGroup.prototype.addRules = function (ruleList) {
            for (var i = 0; i < ruleList.length; i++) {
                var rule = ruleList[i];
                this.addRule(rule);
            }
        };
        RedPointGroup.prototype.removeRule = function (name) {
            var index = this._ruleNames.findIndex(function (rname) {
                return rname == name;
            });
            if (index != -1) {
                this._ruleNames.splice(index, 1);
            }
            var rule = game.RedPointManager.getRule(name);
            if (rule) {
                rule.removeHandler(this.updateVisible, this);
            }
        };
        RedPointGroup.prototype.getRuleNames = function () {
            return this._ruleNames;
        };
        RedPointGroup.prototype.onDispose = function () {
            this._ruleNames = [];
            this._visible = false;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            this.runHandler();
            this.clearHandler();
            // loghgy('onDispose',++rpNum,this._name);
        };
        return RedPointGroup;
    }());
    game.RedPointGroup = RedPointGroup;
})(game || (game = {}));
