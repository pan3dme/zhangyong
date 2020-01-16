module game {
    /*
    * name;
    */
    export class LoginModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "LoginModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new LoginProcessor(),new LoginLoadProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister(): void {
            let gameVolume = Laya.LocalStorage.getItem("GameVolume");
            if (!gameVolume || gameVolume.length == 0) {
                gameVolume = "45";
                Laya.LocalStorage.setItem("GameVolume", gameVolume);
            }
            let volume = Number(gameVolume) / 100;
            SoundManager.setMusicVolume(volume);

            let gameSound = Laya.LocalStorage.getItem("GameSound");
            if (!gameSound || gameSound.length == 0) {
                gameSound = "80";
                Laya.LocalStorage.setItem("GameSound", gameSound);
            }
            let sound = Number(gameSound) / 100;
            SoundManager.setSoundVolume(sound);
            //
            Laya.timer.frameOnce(1,this,()=>{
                layapan.LayaScene2dInit.initData(); //初始化3dengine
                Laya.stage.setScreenSize(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio);
            });
            Laya.timer.frameOnce(2,this,()=>{
                dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.LOADBASE_EVENT));
            });
        }
    }

    export class LoginEvent extends tl3d.BaseEvent {
        //展示面板
        public static LOGININIT_EVENT: string = "LOGININIT_EVENT";
        public static SEND_SSO_EVENT: string = "SEND_SSO_EVENT";
        public static SEND_LOGIN_EVENT: string = "SEND_LOGIN_EVENT";
        public static SEND_RELOGIN_EVENT: string = "SEND_RELOGIN_EVENT";
        public static SEND_SERVERLIST_EVENT: string = "SEND_SERVERLIST_EVENT";
        public static SHOW_CHATNOTICE_PANEL: string = "SHOW_CHATNOTICE_PANEL";

        public data: any;
    }

    export class LoginLoadEvent extends tl3d.BaseEvent {
        
        //加载ui基础资源
        public static LOADBASE_EVENT: string = "LOADBASE_EVENT";
        //加载HUD必须资源
        public static LOADHUD_EVENT: string = "LOADHUD_EVENT";
        //加载剧情必须资源
        public static LOADJUQING_EVENT: string = "LOADJUQING_EVENT";
        //显示HUD
        public static ENTERHUD_EVENT: string = "ENTERHUD_EVENT";
        
        public data: any;
    }
}