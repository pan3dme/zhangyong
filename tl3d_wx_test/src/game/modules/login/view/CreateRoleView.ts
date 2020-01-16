module game {
    export class CreateRoleView extends ui.login.CreateRoleUI {
        constructor() {
            super();
            this.popupCenter = true;
            this.btn_ok.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_random.on(Laya.Event.CLICK, this, this.onRandom);
            this.edit_name.text = tb.TB_random_name.getRandomName(Math.random() < 0.5 ? 0 : 1);
        }

        public onOpened(){
            super.onOpened();
            if(!DialogExt.manager.mouseEnabled){
                DialogExt.manager.mouseEnabled = true;
            }
        }

        private onClick() {
            let obj: any = checkUserName(this.edit_name.text);
            if (obj.state != 3) {
                if (obj.strlen > 12) {
                    showToast(LanMgr.getLan('', 10068));
                    return;
                } else if (obj.strlen < 1) {
                    showToast(LanMgr.getLan('', 10012));
                    return;
                }
                //发送请求
                let args = {};
                args[Protocol.game_common_changePlayerData.args.name] = this.edit_name.text;
                args[Protocol.game_common_changePlayerData.args.sex] = 0;
                PLC.request(Protocol.game_common_changePlayerData, args, ($data: any) => {
                    if (!$data) return;
                    App.hero.name = $data.name;
                    App.hero.sex = $data.sex;
                    App.hero.isNewPlayer = 1;
                    App.hero.updateSelfHead();
                    //sdk数据上报
                    BingoSDK.gameReport("enterGame", App.hero.uid, App.hero.name, 'HOODINN', window.platform.serverInfo.serverId, { level: App.hero.level, vipLevel: App.hero.vip, score: 0, isNew: 1, shareRole: 0 });
                    dispatchEvt(new HudEvent(HudEvent.SET_NAME));
                    this.close();
                });
            } else {
                showToast(LanMgr.getLan('', 10069));
                return;
            }
        }

        private onRandom(e): void {
            AudioMgr.playSound();
            this.edit_name.text = tb.TB_random_name.getRandomName(Math.random() < 0.5 ? 0 : 1);
        }

        public onClosed() {
            super.onClosed();
            GuideManager.startInit();
        }
        
    }
}