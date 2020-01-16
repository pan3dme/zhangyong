/**
* name 
*/
module common {
    export class showSkill extends DialogExt {

        /**角色场景 */
        public uiScene: Base2dSceneLayer;

        constructor() {
            super();
            this.x = this.y = 0;
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }

        public popup() {
            super.popup();
            this.initView();
        }

        public show() {
            super.show();
            this.initView();
        }

        private _bg: Laya.Image
        private _skillLab: Laya.Label
        private initView() {
            if (!this._bg) {
                this._bg = new Laya.Image("comp/bg/zhezhao3.png");
                this._bg.x = this._bg.y = 0;
                this._bg.width = Laya.stage.width;
                this._bg.height = Laya.stage.height;
                this._bg.alpha = 0.5;
                this.addChild(this._bg);
            }

            if (!this.uiScene) {
                this.uiScene = new Base2dSceneLayer();
                this.uiScene.scene.changeBloodManager(new BloodManagerExt);
                this.addChild(this.uiScene);
            }


            if (!this._skillLab) {
                this._skillLab = new Laya.Label();
                this._skillLab.x = 300;
                this._skillLab.y = 700;
                this._skillLab.fontSize = 60;
                this._skillLab.color = "#ffffff";
                this._skillLab.strokeColor = "#000000"
                this._skillLab.stroke = 5;
                this.addChild(this._skillLab);
            }

            this.setData();

        }

        // private _particle:Pan3d.CombineParticle
        private setData() {
            if (this.dataSource) {
                this.uiScene.addModelChar(String(this.dataSource.model), this.dataSource.charx, this.dataSource.chary, 170, this.dataSource.scale);
                this.uiScene.addEffect(this, 1000009, new tl3d.Vector3D(0, 0, this.dataSource.effz), 10, 0,(particle)=>{
                    // this._particle = particle;
                }, 0, 0, false, 0.5);
                this._skillLab.text = this.dataSource.text;
            }

            setTimeout(() => {
                if (this.dataSource && this.dataSource.cb) {
                    this.dataSource.cb();
                }
                this.close();
            }, 800);
        }

        public onClosed(): void {
            super.onClosed();
            this.uiScene.onExit();
        }
    }
}