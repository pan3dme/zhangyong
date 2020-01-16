
module game{
	export class TabSysSettingView extends ui.hud.player.TabSysSettingUI{
		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.slider_Music.changeHandler = new Handler(this, this.setMusicVolume);
			this.slider_Sound.changeHandler = new Handler(this, this.setSoundVolume);
            this.img_yinyueon.on(Laya.Event.CLICK, this, this.onYinyue);
			this.img_yinyueoff.on(Laya.Event.CLICK, this, this.onYinyue);
			this.img_yinxiaoon.on(Laya.Event.CLICK, this, this.onYinxiao);
			this.img_yinxiaooff.on(Laya.Event.CLICK, this, this.onYinxiao);
			this.btnExitGame.on(Laya.Event.CLICK,this,this.onExitGame);
			this.btnSwitchAcc.on(Laya.Event.CLICK,this,this.onSwitchAcc);
        }

		public close(){
			// super.close();
		}
		public show(){
			// super.show();
            this.initView();
		}

        private initView():void {
            let gameVolume = Laya.LocalStorage.getItem("GameVolume");
            if (!gameVolume || gameVolume.length == 0) {
                gameVolume = "45";
                Laya.LocalStorage.setItem("GameVolume", gameVolume);
            }
            this.slider_Music.value = Number(gameVolume);
            let gameSound = Laya.LocalStorage.getItem("GameSound");
            if (!gameSound || gameSound.length == 0) {
                gameSound = "80";
                Laya.LocalStorage.setItem("GameSound", gameSound);
            }
            this.slider_Sound.value = Number(gameSound);
            this.lab_resVersion.text = `resVersion：${BingoSDK.resVersion}`
			this.lab_clientVersion.text = `clientVersion：${BingoSDK.clientVersion}`
            Laya.Slider.label.fontSize = 22;
        }

        private onYinxiao() {
			let flag = 0;
			if (this.img_yinxiaoon.visible)
				flag = 1;
			else
				flag = 0;
			switch (flag) {
				case 0:
					this.img_yinxiaooff.visible = false;
					this.img_yinxiaoon.visible = true;
					AudioMgr.SOUNDSTOP = false;
					AudioMgr.playSound();
					break;
				case 1:
					this.img_yinxiaooff.visible = true;
					this.img_yinxiaoon.visible = false;
					AudioMgr.pauseSound();
					break;
			}
			this.slider_Sound.value = flag == 0 ? 1 : 0;
		}

		private onYinyue() {
			let flag = 0;
			if (this.img_yinyueon.visible)
				flag = 1;
			else
				flag = 0;
			switch (flag) {
				case 0:
					this.img_yinyueoff.visible = false;
					this.img_yinyueon.visible = true;
					AudioMgr.MUSICPAUSE = false;
					AudioMgr.resumeMusic();
					break;
				case 1:
					this.img_yinyueoff.visible = true;
					this.img_yinyueon.visible = false;
					AudioMgr.pauseMusic();
					break;
			}
			this.slider_Music.value = flag == 0 ? 1 : 0;
		}

        private setMusicVolume(value: number) {
			dispatchEvt(new HudEvent(HudEvent.SET_VOLUME), value);
			Laya.LocalStorage.setItem("GameVolume", String(value));
			if (this.img_yinyueoff.visible && value > 0) {
				this.img_yinyueoff.visible = false;
				this.img_yinyueon.visible = true;
			}
			if (this.img_yinyueon.visible && value == 0) {
				this.img_yinyueoff.visible = true;
				this.img_yinyueon.visible = false;
			}
		}
		private setSoundVolume(value: number) {
			dispatchEvt(new HudEvent(HudEvent.SET_SOUND), value);
			Laya.LocalStorage.setItem("GameSound", String(value));
			if (this.img_yinxiaooff.visible && value > 0) {
				this.img_yinxiaooff.visible = false;
				this.img_yinxiaoon.visible = true;
			}
			if (this.img_yinxiaoon.visible && value == 0) {
				this.img_yinxiaooff.visible = true;
				this.img_yinxiaoon.visible = false;
			}
		}

		/** 退出游戏 */
		private onExitGame():void {
			common.AlertBox.showAlert({
				text: LanMgr.getLan(``,10528), confirmCb: () => {
					BingoSDK.exitGame();
				}
			});
		}
		/** 切换账号 */
		private onSwitchAcc():void {
			common.AlertBox.showAlert({
				text: LanMgr.getLan(``,10529), confirmCb: () => {
					BingoSDK.loginout();
				}
			});
		}

	}
}