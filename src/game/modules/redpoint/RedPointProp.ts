
module game {
    /** 红点扩展脚本 */
    export class RedPointProp extends ui.component.RedPointUI{

        public redpointName : string;
        constructor(){
            super();
            this.mouseEnabled = false;
            this.visible = false;
            //自定义的脚本会有时序问题，所以在此添加一个延时
            this.frameOnce(2,this,this.onDelay);
        }

        private onDelay():void {
            this.updateRule();
        }

        /** 设置红点名称 */
        public setRedPointName(sname:string):void {
            this.redpointName = sname;
            this.updateRule();
        }
        
        private _redPoint: IRedPointRule;
        /** 更新规则 */
        private updateRule():void {
            if (this._redPoint) {
                this._redPoint.removeHandler(this.updateState, this);
            }
            this._redPoint = RedPointManager.getRule(this.redpointName);
            if (this._redPoint) {
                this._redPoint.addHandler(new Handler(this, this.updateState));
            }
            this.updateState();
        }

        /** 更新状态 */
        updateState(): void {
            this.visible = this._redPoint ? this._redPoint.visible : false;
        }

        /** 清除红点规则 */
        onDispose(): void {
            if (this._redPoint) {
                this._redPoint.removeHandler(this.updateState, this);
            }
            this._redPoint = null;
            this.redpointName = "";
            this.visible = false;
        }
    }
}