
module game {

    export class RedPointBaseRule implements IRedPointRule{

        /** 红点名称 */
        private _name:string;
        /** 红点可视状态 */
        protected _visible:boolean;
        private _handlers:Handler[] = [];
        constructor(name:string) {
            this._name = name;
        }

        get visible():boolean {
            return this._visible;
        }

        set visible(val){
            this._visible = val;
        }

        get name():string {
            return this._name;
        }

        private _initialized:boolean = false;
        /** 初始化 */
        init():void {
            if(this._initialized) return;
            this._initialized = true;
        }

        /** 更新红点可视状态 */
        updateVisible(visible:boolean):void {
            this.visible = visible;
            this.runHandler();
        }
        /** 执行界面状态更新处理器 */
        runHandler():void {
            for (var i = 0 ; i < this._handlers.length; i ++) {
                let handler = this._handlers[i];
                handler.runWith(handler.args);
            }
        }

        /** 添加界面状态更新处理器 */
        addHandler(handler:Handler):void {
            this.init();
            if(!this.hasHandler(handler.method,handler.caller)) {
                this._handlers.push(handler);
                handler.runWith(handler.args);
            }else{
                logdebug('RedPointBaseRule: the handler already exists');
            }
        }
        /** 是否有处理器 */
        hasHandler(callback:Function,context:any):boolean {
            return this._handlers.some((handler:Handler)=>{
                return handler.caller == context && handler.method == callback; 
            });
        }
        /** 移除处理器 */
        removeHandler(callback:Function,context:any):void {
            let find =  this.getHandler(callback,context);
            if(find) {
                let index = this._handlers.indexOf(find);
                this._handlers.splice(index,1);
            }
        }
        /** 获取处理器 */
        getHandler(callback:Function,context:any):Handler {
            return this._handlers.find((handler:Handler)=>{
                return handler.caller == context && handler.method == callback;
            });
        }
        /** 清除 */
        clearHandler():void {
            this._handlers = [];
        }

        onDispose():void {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            Laya.timer.clearAll(this);
            this._visible = false;
            this.runHandler();
            this.clearHandler();
            // loghgy('onDispose',++rpNum,this._name);
        }
    }
}