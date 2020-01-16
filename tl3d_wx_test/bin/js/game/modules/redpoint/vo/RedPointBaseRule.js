var game;
(function (game) {
    var RedPointBaseRule = /** @class */ (function () {
        function RedPointBaseRule(name) {
            this._handlers = [];
            this._initialized = false;
            this._name = name;
        }
        Object.defineProperty(RedPointBaseRule.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (val) {
                this._visible = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RedPointBaseRule.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        /** 初始化 */
        RedPointBaseRule.prototype.init = function () {
            if (this._initialized)
                return;
            this._initialized = true;
        };
        /** 更新红点可视状态 */
        RedPointBaseRule.prototype.updateVisible = function (visible) {
            this.visible = visible;
            this.runHandler();
        };
        /** 执行界面状态更新处理器 */
        RedPointBaseRule.prototype.runHandler = function () {
            for (var i = 0; i < this._handlers.length; i++) {
                var handler = this._handlers[i];
                handler.runWith(handler.args);
            }
        };
        /** 添加界面状态更新处理器 */
        RedPointBaseRule.prototype.addHandler = function (handler) {
            this.init();
            if (!this.hasHandler(handler.method, handler.caller)) {
                this._handlers.push(handler);
                handler.runWith(handler.args);
            }
            else {
                logdebug('RedPointBaseRule: the handler already exists');
            }
        };
        /** 是否有处理器 */
        RedPointBaseRule.prototype.hasHandler = function (callback, context) {
            return this._handlers.some(function (handler) {
                return handler.caller == context && handler.method == callback;
            });
        };
        /** 移除处理器 */
        RedPointBaseRule.prototype.removeHandler = function (callback, context) {
            var find = this.getHandler(callback, context);
            if (find) {
                var index = this._handlers.indexOf(find);
                this._handlers.splice(index, 1);
            }
        };
        /** 获取处理器 */
        RedPointBaseRule.prototype.getHandler = function (callback, context) {
            return this._handlers.find(function (handler) {
                return handler.caller == context && handler.method == callback;
            });
        };
        /** 清除 */
        RedPointBaseRule.prototype.clearHandler = function () {
            this._handlers = [];
        };
        RedPointBaseRule.prototype.onDispose = function () {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            Laya.timer.clearAll(this);
            this._visible = false;
            this.runHandler();
            this.clearHandler();
            // loghgy('onDispose',++rpNum,this._name);
        };
        return RedPointBaseRule;
    }());
    game.RedPointBaseRule = RedPointBaseRule;
})(game || (game = {}));
