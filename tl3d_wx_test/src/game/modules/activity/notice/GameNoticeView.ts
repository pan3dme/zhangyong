
module game {
    /** 游戏内公告 */
    export class GameNoticeView extends ui.activity.notice.GameNoticeUI {
        public static noticeVersion = "v1";
        private NOTICE_INFOS : any[];

        private _list:ui.activity.notice.NoticeIRUI[] = [];
        constructor(){
            super();
			this.panel_list.vScrollBarSkin = '';
            this.NOTICE_INFOS = [
                {
                    img:"huodong/gonggao1.jpg",
                    img_h:224,
                    content:LanMgr.getLan("",20021)
                },
                {
                    img:"huodong/gonggao2.jpg",
                    img_h:224,
                    content:LanMgr.getLan("",20022)
                }
            ]
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed():void {
            super.onClosed();
            this.btnClose.off(Laya.Event.CLICK, this, this.onBtnClick);
            
        }

        private onBtnClick(){
            if(this.dataSource.openFlag){
                HuodongModel.getInstance().autoOpenLoginGift();
            }
            this.close();
        }

        /** 初始化界面 */
        private initView():void {

            this.isModelClose = !this.dataSource.openFlag

            this.btnClose.on(Laya.Event.CLICK, this, this.onBtnClick);
            
            this.clearNotice();
            for (let i:number = 0; i < this.NOTICE_INFOS.length; i++){
                this.addNotice(this.NOTICE_INFOS[i]);
            }
            
            this.layout();
        }

        private addNotice(info:any):void{
            if (!info) return;
            let item:ui.activity.notice.NoticeIRUI = new ui.activity.notice.NoticeIRUI();
            item.img_show.skin = info.img;
            item.img_show.height = info.img_h;
            item.lab_content.text = info.content;

            item.lab_content.y = item.img_show.height + 10;
            item.height = item.lab_content.y + item.lab_content.height + 10;
            this._list.push(item);
            this.panel_list.addChild(item);
        }

        private clearNotice():void{
            for (let i:number = 0; i < this._list.length; i++){
                this._list[i].destroy();
            }
            this._list.length = 0;
        }

        private layout():void{
            let posy:number = 0;
            for (let i:number = 0; i < this._list.length; i++){
                let item = this._list[i];
                item.y = posy;
                posy +=item.height;
            }
        }

     


    }

}