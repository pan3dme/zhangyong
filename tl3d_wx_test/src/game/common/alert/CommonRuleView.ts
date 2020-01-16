

module common {
    import Event=Laya.Event;
    export class CommonRuleView extends ui.component.CommonRuleUI{

        private _ruleList : CommonRuleIR[];
        constructor(){
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.CommonRuleView, closeOnSide: this.isModelClose, title:"提 示" };
            this._ruleList = [];
        }

        createChildren():void {
            super.createChildren();
            this.ctPanel.vScrollBarSkin = "";
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            this.initView();
            super.show(closeOther, showEffect);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            // 必须先设置高度,打开时DialogManager才会根据宽高去居中
            this.initView();
            super.popup(closeOther, showEffect);
        }

        public close(): void {
            super.close();
            this.removeRules();
        }

        public initView(): void {
            let info : IRuleOption = this.dataSource;
            this.width = info.width;
            this.ctPanel.width = info.width - 40;
            let ctHeight : number = 0;
            this.removeRules();
            for(let i = 0 ; i < info.content.length ; i++){
                let ruleIr : CommonRuleIR = Laya.Pool.getItemByClass("CommonRuleIR",CommonRuleIR);
                ruleIr.width = this.ctPanel.width;
                ruleIr.dataSource = info.content[i];
                ruleIr.y = ctHeight;
                ctHeight += ruleIr.height;
                this.ctPanel.addChild(ruleIr);
                this._ruleList.push(ruleIr);
            }
            if(info.height > 0){
                this.height = info.height;
                this.ctPanel.height = this.height - this.ctPanel.y - 60;
            }else{
                let _h = this.ctPanel.y + ctHeight + 60;
                //最低高度，太窄了不好看
                if(_h<350){ 
                    _h=350;
                }
                if(_h>800){
                    _h=800;
                }
                this.height = _h;
                this.ctPanel.height = this.height - this.ctPanel.y - 60;
            }
        }

        private removeRules():void {
            for(let ruleIr of this._ruleList){
                ruleIr.dataSource = null;
                Laya.Pool.recover("CommonRuleIR",ruleIr);
            }
            this._ruleList.length = 0;
            this.ctPanel.removeChildren();
        }

    }
    /** 规则参数 */
    export interface IRuleOption {
        content : Array<Array<string>>;     // 二维字符串数据 [[标题,内容1,内容2],[标题,内容1,内容2]];
        width ?: number;                    // 自定义宽度
        height?: number;                    // 自定义高度
    }
}