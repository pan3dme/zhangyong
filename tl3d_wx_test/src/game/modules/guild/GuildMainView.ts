

module game {

    export class GuildMainView extends ui.guild.GuildMainUI {

        /**角色场景 */
		public uiScene: Base2dSceneLayer;
        constructor(){
            super();
            this.group=UIConst.hud_group;
             this.uiScene = new Base2dSceneLayer();
            this.addChild(this.uiScene);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GONGHUI);
        }
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close(type?: string, showEffect?: boolean):void {
            super.close(type,showEffect);
            Laya.timer.clearAll(this);
            this.removeEff();
            this.boxHall.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxSkill.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxCopy.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxDonate.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxFight.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxShop.off(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxHelp.off(Laya.Event.CLICK, this, this.onBtnClick);
        }
        public onClosed():void{
			super.onClosed();
			UIMgr.hideUIByName(UIConst.SysTopView);
            this.anil_help.gotoAndStop(0);
		}

        private initView(): void {
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.guildDonate];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList:null,closeCallback:this.onFanhui.bind(this)});
            this.playEff();
            this.boxHall.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxSkill.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxCopy.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxDonate.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxFight.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxShop.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.boxHelp.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.anil_help.play(0,true);
        }

        private _particle: tl3d.CombineParticle;
        private _particle2: tl3d.CombineParticle
		public playEff() {
			if (!this._particle){
                this.uiScene.addEffect(this, 10000019, new tl3d.Vector3D(175, 0, -450), 7, 30, ($particle) => {
                    this._particle = $particle;
                });
            }
			if (!this._particle2){
                this.uiScene.addEffect(this, 10000018, new tl3d.Vector3D(180, 0, -460), 6.8, 30, ($particle) => {
                    this._particle2 = $particle;
                });
            }
		}

		public removeEff() {
			if (this._particle) {
				this.uiScene.removeEffect(this._particle);
				this._particle = null;
			}
            if (this._particle2) {
				this.uiScene.removeEffect(this._particle2);
				this._particle2 = null;
			}
		}

        onBtnClick(event:Laya.Event):void {
            let target = event.target;
            switch(target){
                case this.boxHall:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_HALL_VIEW));
                    break;
                case this.boxSkill:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_SKILL_VIEW));
                    break;
                case this.boxCopy:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_COPY_VIEW));
                    break;
                case this.boxDonate:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_DONATION_VIEW));
                    break;
                case this.boxFight:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_BATTLE_VIEW));
                    break;
                case this.boxShop:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_SHOP_VIEW));
                    break;
                case this.boxHelp:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_HELP_VIEW));
                    break;
            }
        }

        private onFanhui():void {
            dispatchEvt(new HudEvent(HudEvent.RETURN_LASTVIEW,UIConst.Main3DView));
        }

    }
}