
module game {

    export class RedPointGroup implements IRedPointRule {
        /** 红点名称 */
        private _name: string;
        /** 红点可视状态 */
        protected _visible: boolean;

        /** 子规则名称数组 */
        private _ruleNames: string[] = [];
        /** 子规则数组 */
        // private _ruleArr:IRedPointRule[] = [];
        private _handlers: Handler[] = [];
        constructor(name: string, rules: string[]) {
            this._name = name;
            this._ruleNames = rules;
        }

        get visible(): boolean {
            return this._visible;
        }

        get name(): string {
            return this._name;
        }

        private _initialized: boolean = false;
        /** 初始化 */
        initRules(): void {
            if (this._initialized == false) {
                this._initialized = true;
                this.init();
                this._ruleNames.forEach((name: string) => {
                    let rule = RedPointManager.getRule(name);
                    if (rule) {
                        rule.addHandler(new Handler(this, this.updateVisible));
                    }
                });
            }
        }

        init(): void {

        }

        /** 更新红点可视状态 */
        updateVisible(): void {
            this._visible = this._ruleNames.some((name: string) => {
                let rule = RedPointManager.getRule(name);
                return rule && rule.visible;
            })
            this.runHandler();
        }

        /** 执行界面状态更新处理器 */
        runHandler(): void {
            for (var i = 0; i < this._handlers.length; i++) {
                let handler = this._handlers[i];
                handler.runWith(handler.args);
            }
        }

        /** 添加界面状态更新处理器 */
        addHandler(handler: Handler): void {
            // 先添加子处理器
            this.initRules();
            // 再添加父处理器
            if (!this.hasHandler(handler.method, handler.caller)) {
                this._handlers.push(handler);
                handler.runWith(handler.args);
            } else {
                logdebug('RedPointGroup: the handler already exists');
            }
        }

        /** 是否有处理器 */
        hasHandler(callback: Function, context: any): boolean {
            return this._handlers.some((handler: Handler) => {
                return handler.caller == context && handler.method == callback;
            });
        }
        /** 移除处理器 */
        removeHandler(callback: Function, context: any): void {
            let find = this.getHandler(callback, context);
            if (find) {
                let index = this._handlers.indexOf(find);
                this._handlers.splice(index, 1);
            }
        }
        /** 清除 */
        clearHandler(): void {
            this._handlers = [];
        }
        /** 获取处理器 */
        getHandler(callback: Function, context: any): Handler {
            return this._handlers.find((handler: Handler) => {
                return handler.caller == context && handler.method == callback;
            });
        }

        /** 是否存在规则 */
        hasRule(name: string): boolean {
            return this._ruleNames.some((rname: string) => {
                return rname == name;
            });
        }

        /** 添加规则 */
        addRule(rule: IRedPointRule): boolean {
            if (!this.hasRule(rule.name)) {
                this._ruleNames.push(rule.name);
                // 需要添加处理回调方法
                rule.addHandler(new Handler(this, this.updateVisible));
                return true;
            }
            return false;
        }

        /** 添加规则 */
        addRules(ruleList: Array<IRedPointRule>) {
            for (var i = 0; i < ruleList.length; i++) {
                var rule = ruleList[i];
                this.addRule(rule);
            }
        }

        removeRule(name: string): void {
            let index = this._ruleNames.findIndex((rname) => {
                return rname == name;
            });
            if (index != -1) {
                this._ruleNames.splice(index, 1);
            }
            let rule = RedPointManager.getRule(name);
            if (rule) {
                rule.removeHandler(this.updateVisible, this);
            }
        }

        getRuleNames(): string[] {
            return this._ruleNames;
        }

        onDispose(): void {
            this._ruleNames = [];
            this._visible = false;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            this.runHandler();
            this.clearHandler();
            // loghgy('onDispose',++rpNum,this._name);
        }
    }
}