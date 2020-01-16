/*
* name;
*/
module common {
    export class CommonRuleIR extends ui.box.CommonRuleIRUI {
        constructor() {
            super();
            this.htmlText.style.align = 'left';
            this.htmlText.style.fontSize = 22;
            this.htmlText.style.wordWrap = true;
            this.htmlText.style.leading = 10;
            this.htmlText.autoSize = true;
            this.htmlText.style.color = ColorConst.normalFont;
        }

        public set dataSource(value) {
            this._dataSource = value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        public refreshData() {
            let strArr: string[] = this.dataSource;
            if (strArr) {
                this.lbTitle.text = strArr[0];
                this.htmlText.width = this.width - 60;
                // 往右靠一点
                this.htmlText.x = this.width/2 - this.htmlText.width/2 + 8;
                let text = "";
                for(let i = 1 ; i < strArr.length ; i++){
                    text += (i == strArr.length - 1) ? strArr[i] : (strArr[i] + "<br/>");
                }
                this.htmlText.innerHTML = text;
                this.height = this.htmlText.y + this.htmlText.contextHeight + 10;
            }else {

            }
        }
    }
} 