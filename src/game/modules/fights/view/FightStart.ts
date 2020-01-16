module game {

    /** 战斗开始 */
    export class FightStart extends DialogExt {
        private _sceneTransitionUi: Laya.Image;
        public game2dScene: Base2dSceneLayer;
        constructor() {
            super();
            this.isModelClose = false;
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;

            this.game2dScene = new Base2dSceneLayer();
            this.addChild(this.game2dScene);

            this._sceneTransitionUi = new Laya.Image("preload/black.jpg");
            this._sceneTransitionUi.x = this._sceneTransitionUi.y = 0;
            this._sceneTransitionUi.width = Laya.stage.width;
            this._sceneTransitionUi.height = Laya.stage.height;

            // showToast("宽："+this._sceneTransitionUi.width + "   高："+this._sceneTransitionUi.height);
            // this._sceneTransitionUi.width = 720;
            // this._sceneTransitionUi.height = 1280;
            this._sceneTransitionUi.alpha = 0;
            this._sceneTransitionUi.visible = false;
            this.addChild(this._sceneTransitionUi);
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.isModal = !this.dataSource.isJy;
            this.initView();
        }

        public onOpened() {
            super.onOpened();
            this.refresh();
        }

        public close(): void {
            super.close();
            this.game2dScene.onExit();
            this.clearJingYingStartEff();
        }

        private initView(): void {

        }

        public refresh() {
            this._sceneTransitionUi.visible = this.dataSource.optType != startOptState.START && this.isModal;
            if (this.dataSource.optType == startOptState.START) {
                if (this.dataSource.isJy){
                    this.playJingYingStartEff();
                }else{
                    this.playStartEff(this.dataSource.isBoss);
                }
            } else if (this.dataSource.optType == startOptState.GUOCHANG) {
                Laya.Tween.to(this._sceneTransitionUi, { alpha: 0.6 }, 1000, null, Laya.Handler.create(this, () => {
                    if (this.dataSource && this.dataSource.cb) {
                        this.dataSource.cb();
                    }
                }));
            } else if (this.dataSource.optType == startOptState.GUOCHANGCOMPLETE) {
                this._sceneTransitionUi.alpha = 0.6;
                Laya.Tween.to(this._sceneTransitionUi, { alpha: 0 }, 1000, null, Laya.Handler.create(this, this.onComplete));
            }
        }

        private playStartEff(isboss:boolean) {
            this.game2dScene.addEffect(this, isboss ? 10000017 : 10000013, new tl3d.Vector3D(180, 0, -400), isboss ? 18 : 3, 30, ($particle) => {
                $particle.onComplete = (particle) => {
                    this.game2dScene.scene.removeParticle(particle);
                    if (isboss) {
                        this.playStartEff(false);
                    } else {
                        this.onComplete();
                    }
                };
            });
        }

        private _jyStartEff:Laya.Animation;
        private playJingYingStartEff():void{
            if (!this._jyStartEff){
                this._jyStartEff = new Laya.Animation();
                this._jyStartEff.x = this.width/2;
                this._jyStartEff.y = this.height/2;
                
            }
            this._jyStartEff.loadAnimation("eff/TiaoZhanJingYingEff.ani", Handler.create(this, function () {
                this._jyStartEff.play(0, false);
            }), "guaji.atlas");
            this.addChild(this._jyStartEff);
            this._jyStartEff.visible = true;
            Laya.timer.clear(this, this.onComplete);
            Laya.timer.once(1200, this, this.onComplete);
        }

        private clearJingYingStartEff():void{
            if (this._jyStartEff){
                this._jyStartEff.stop();
                this._jyStartEff.visible = false;

            }
            Laya.timer.clear(this, this.onComplete);
        }

        private onComplete() {
            if (this.dataSource && this.dataSource.cb) {
                this.dataSource.cb();
            }
            this.close();
        }
    }
}