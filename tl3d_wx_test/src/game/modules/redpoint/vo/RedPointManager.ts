

module game {

    export class RedPointManager {
        constructor() {
        }

        private static _instance: RedPointManager;
        public static getInstance(): RedPointManager {
            if (!this._instance) {
                this._instance = new RedPointManager();
            }
            return this._instance;
        }

        private _rulesDic:Object = {};
        /** 添加红点规则 */
        addRule(rule:IRedPointRule):boolean {
            if(!this.hasRule(rule.name)) {
                this._rulesDic[rule.name]=rule;
                return true;
            }
            return false;
        }
        /** 获取规则 */
        getRule(name:string):IRedPointRule {
            return this._rulesDic[name];
        }
        /** 是否存在该规则 */
        hasRule(name:string):boolean {
            return this._rulesDic[name] ? true : false;
        }
        
        getGroupRuleInfo(group:string):any {
            let obj = {};
            let ruleGroup = this.getRule(group) as RedPointGroup;
            if(ruleGroup){
                let names = ruleGroup.getRuleNames();
                for(let name of names){
                    let rule = this.getRule(name);
                    if(rule){
                        obj[name] = rule.visible;
                    }
                }
            }
            // console.log(`组：${group}的红点情况`,obj);
            return obj;
        }

        /** 
         *  移除规则
         *  如果是组，会递归移除子规则
         */
        removeRule(name:string):boolean {
            let findRule = this.getRule(name);
            if(!findRule) return false;
            if(findRule instanceof RedPointGroup){
                for(let rname of findRule.getRuleNames()){
                    this.removeRule(rname);
                }
            }
            findRule.onDispose();
            delete this._rulesDic[name];
            return true;
        }
        /** 移除全部 */
        removeAll():void {
            for(let key in this._rulesDic){
                let findRule = this.getRule(key);
                if(findRule){
                    findRule.onDispose();
                }
            }
            this._rulesDic={};
        }

        /** 注入规则 */
        static injection(rule:IRedPointRule):IRedPointRule {
            RedPointManager.getInstance().addRule(rule);
            return rule;
        }

        static getRule(name:string):IRedPointRule {
            return RedPointManager.getInstance().getRule(name);
        }

        static hasRule(name:string):boolean {
            return RedPointManager.getInstance().hasRule(name);
        }

        static removeRule(name:string):boolean {
            return RedPointManager.getInstance().removeRule(name);
        }

        static removeAll():void {
            return RedPointManager.getInstance().removeAll();
        }
    }
}