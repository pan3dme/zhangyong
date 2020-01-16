module game {
    export class UserNoticeView extends ui.login.UserNoticeUI {
        static TYPE_YINSI:number = 0;//隐私
        static TYPE_XIEYI:number = 1;//协议

        constructor() {
            super();
            this.isModelClose = true;
        }

        private _htmlText : Laya.HTMLDivElement;
        createChildren():void {
			super.createChildren();
            this._htmlText = this.createHtml(this.panel_content.width - 40, this.panel_content.height - 40);
            this._htmlText.x = 20;
            this._htmlText.y = 20;
            this.panel_content.addChild(this._htmlText);
            this.panel_content.vScrollBarSkin = '';
		}

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onOpened(){
            super.onOpened();
        }

        private _type:number;
        private _content:string = "";
        private initView():void{
            this._type = this.dataSource ? this.dataSource : 0;
            this._content = "";

            this.btn_sure.on(Laya.Event.CLICK, this, this.onClickSure);

            this.loadText();
            this.updateTitle();
            this.updateView();
        }

        private updateTitle():void{
            let str:string = LanMgr.getLan("",12194);
            switch(this._type){
                case UserNoticeView.TYPE_YINSI://隐私
                    str = LanMgr.getLan("",12195);
                    break;
                case UserNoticeView.TYPE_XIEYI://协议
                    str = LanMgr.getLan("",12196);
                    break;
            }
            this.bgPanel.updateTitle(str);
        }

        private loadText():void{
            let url:string = "";
            switch(this._type){
                case UserNoticeView.TYPE_YINSI://隐私
                    url = "yinsi.txt";
                    break;
                case UserNoticeView.TYPE_XIEYI://协议
                    url = "xieyi.txt";
                    break;
            }

            if (url == "") return;
            // Laya.loader.load(url, Handler.create(this, this.onLoadTextComplete));
            let self = this;
            tl3d.LoadManager.getInstance().load("usernotice/"+url, tl3d.LoadManager.XML_TYPE, (str:string)=>{
                self.onLoadTextComplete(str);
            });
        }

        private onLoadTextComplete(str:string):void{
            this._content = str;
            this.updateView();
        }

        private updateView():void{
            this._htmlText.innerHTML = this._content;
            this._htmlText.event(Laya.Event.RESIZE);
            this._htmlText._height = this._htmlText.contextHeight;
        }

        private onClickSure():void{
            this.close();
        }


        public onClosed() {
            super.onClosed();
            this.btn_sure.off(Laya.Event.CLICK, this, this.onClickSure);
            this._htmlText.innerHTML = "";
            this._htmlText.event(Laya.Event.RESIZE);
            this.panel_content.vScrollBar.value = 0;
        }

        private createHtml(width:number, height:number, fontsize:number = 20, color:string = "#7e5336"):Laya.HTMLDivElement{
            let htmlT:Laya.HTMLDivElement = new Laya.HTMLDivElement();
            htmlT.style.align = 'left';
            htmlT.style.fontSize = fontsize;
            htmlT.style.color = color;
            htmlT.style.leading = 5;
            htmlT.style.wordWrap = true;
            htmlT.width = width;
            return htmlT;
        }
        
    }
}