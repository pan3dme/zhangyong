module game {
    export class ArtifactRender extends ui.fight.box.ArtifactRenderUI {
        constructor() {
            super();
        }

        public initArtifact(templatId: number, anger: number) {
            this.visible = false;
            this.img_shenqiiconteam.skin = "shenqi/" + tb.TB_artifact.get_TB_artifactById(templatId).icon + ".png";
            //创建遮罩对象
            if (!this._probarmask) {
                this._probarmask = new Laya.Sprite();
                //实现img显示对象的遮罩效果,起始原点位置为mask所属ui的原点
                this.img_probarteam.mask = this._probarmask;
            }
            this.setAnger(anger);
            setTimeout(() => {
                this.visible = true;
            }, 1000);
        }

        /**
		 * 设置愤怒值
		 * @param anger 
		 */
        public setAnger($anger: number) {
            if (!this._probarmask) return;
            let img_all = this.img_angerAll2;
            let ani_anger = this.ani1;
            img_all.visible = false;
            if (ani_anger.isPlaying) {
                ani_anger.stop();
            }
            let tab = tb.TB_artifact_set.get_TB_artifact_setById(1);
            let anger = $anger > tab.anger[0] ? tab.anger[0] : $anger;
            let angerRate = Math.floor(anger / tab.anger[0] * 360);
            this._probarmask.graphics.clear();
            if (angerRate == 360) {
                this._probarmask.graphics.drawCircle(63.5, 63.5, 70, "#f16712", null, 0.01);
                img_all.visible = true;
                ani_anger.play(1, true);
            } else
                this._probarmask.graphics.drawPie(63.5, 63.5, 70, 270, 270 + angerRate, "#f16712", null, 0.01);
        }

        private _probarmask: Laya.Sprite;
        public clearArtifact() {
            this.visible = false;
            this.img_probarteam.mask = null;
            if (this._probarmask) {
                this._probarmask.destroy();
                this._probarmask = null;
            }
        }
    }
}