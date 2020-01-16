module game {
    export class LoginView extends ui.login.LoginUI {

        constructor() {
            super();
            this.btn_login.on(Laya.Event.CLICK, this, this.onLoginEvent);
            this.btn_touristslogin.on(Laya.Event.CLICK, this, this.onTouristsLoginEvent);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.login);
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }

        public onOpened() {
            super.onOpened();
            BaseSceneMgr.getInstance().showEffect(this, 1, 1000010, 188, -268, 5.8,0);
        }

        private onLoginEvent() {
            AudioMgr.playSound();
            let account = this.ed_account.text;
            if (!account || account.length == 0) {
                showToast(LanMgr.getLan("", 10442));
                return;
            }
            this.sendSSO(account);
        }

        /**
         * 游客登陆
         */
        private onTouristsLoginEvent() {
            AudioMgr.playSound();
            this.sendSSO(randomWord(false, 8, 8));
        }

        /**
         * 发送登陆
         * @param data 
         */
        private sendSSO(account): void {
            AudioMgr.playSound();
            let wplatform=window.platform;
            wplatform.gameId= '1';
            wplatform.uid= account;
            wplatform.userName= account; 
            wplatform.time=new Date().getTime() / 1000;
            wplatform.head='';
            wplatform.sex=0;
            wplatform.fromUid='';
            //
            wplatform.fcm=0;
            wplatform.pid="1"; 
            wplatform.shiming=1;
            wplatform.vconsle=0;
            let evt = new LoginEvent(LoginEvent.SEND_SSO_EVENT);
            dispatchEvt(evt);
        }



        
        public onClosed() {
            super.onClosed();
            BaseSceneMgr.getInstance().removeEffect(1000010);
            this.btn_login.off(Laya.Event.CLICK, this, this.onLoginEvent);
            this.btn_touristslogin.off(Laya.Event.CLICK, this, this.onTouristsLoginEvent);
        }
    }
}