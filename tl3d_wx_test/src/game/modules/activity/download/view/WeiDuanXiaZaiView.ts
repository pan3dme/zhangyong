module game {
    export class WeiDuanXiaZaiView extends ui.activity.download.WeiDuanXiaZaiViewUI {
        constructor() {
            super();
            this.isModelClose = true;
        }


        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        private init() {
            
            this.btn_download.on(Laya.Event.CLICK, this, this.onDownload);
            this.btnClose.on(Laya.Event.CLICK, this, this.onExit);
            let tabset = tb.TB_activity_set.getTabSet();
            this.itemlists.dataSource = ary2prop(tabset.micro_download_reward);
            listAtCenter(this.itemlists, 244, this.itemlists.repeatX,this.itemlists.dataSource.length);
            this.refreshState();
            
        }

         public refreshState() {
            //领取状态
            let isDownload:boolean = App.hero.downClient == 1;
            let isReceive:boolean = App.hero.isReceiveWDXZ;
            if (!isDownload){
                //不是微端进来的，显示下载
                this.btn_download.disabled = false;
                this.btn_download.label = "立即下载";
                this.btn_download.skin = "comp/button/btn_dengluyouxi.png";
                this.btn_download.labelStrokeColor = "#ca7005";
            }else if (!isReceive){
                //还没领取，显示领取
                this.btn_download.disabled = false;
                this.btn_download.label = "领取";
                this.btn_download.skin = "comp/button/btn_qianwang.png";
                this.btn_download.labelStrokeColor = "#2f7806";
            }else{
                this.btn_download.disabled = true;
                this.btn_download.label = "已领取";
            }

        }


        //下载
        private onDownload():void{
            if (App.hero.downClient == 0){
                dispatchEvt(new DownloadeEvent(DownloadeEvent.DOWNLOAD_WEIDUAN));
            }else if (!App.hero.isReceiveWDXZ){
                dispatchEvt(new DownloadeEvent(DownloadeEvent.SEND_RECEIVE_EVENT));
            }
        }

        private onExit():void{
			UIMgr.hideUIByName(UIConst.WeiDuanXiaZaiView);
		}

         public onClosed() {
            super.onClosed();
            this.btn_download.off(Laya.Event.CLICK, this, this.onDownload);
            this.btnClose.off(Laya.Event.CLICK, this, this.onExit);
        }
    }
}