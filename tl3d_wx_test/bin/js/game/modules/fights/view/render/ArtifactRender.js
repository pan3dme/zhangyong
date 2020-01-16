var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var ArtifactRender = /** @class */ (function (_super) {
        __extends(ArtifactRender, _super);
        function ArtifactRender() {
            return _super.call(this) || this;
        }
        ArtifactRender.prototype.initArtifact = function (templatId, anger) {
            var _this = this;
            this.visible = false;
            this.img_shenqiiconteam.skin = "shenqi/" + tb.TB_artifact.get_TB_artifactById(templatId).icon + ".png";
            //创建遮罩对象
            if (!this._probarmask) {
                this._probarmask = new Laya.Sprite();
                //实现img显示对象的遮罩效果,起始原点位置为mask所属ui的原点
                this.img_probarteam.mask = this._probarmask;
            }
            this.setAnger(anger);
            setTimeout(function () {
                _this.visible = true;
            }, 1000);
        };
        /**
         * 设置愤怒值
         * @param anger
         */
        ArtifactRender.prototype.setAnger = function ($anger) {
            if (!this._probarmask)
                return;
            var img_all = this.img_angerAll2;
            var ani_anger = this.ani1;
            img_all.visible = false;
            if (ani_anger.isPlaying) {
                ani_anger.stop();
            }
            var tab = tb.TB_artifact_set.get_TB_artifact_setById(1);
            var anger = $anger > tab.anger[0] ? tab.anger[0] : $anger;
            var angerRate = Math.floor(anger / tab.anger[0] * 360);
            this._probarmask.graphics.clear();
            if (angerRate == 360) {
                this._probarmask.graphics.drawCircle(63.5, 63.5, 70, "#f16712", null, 0.01);
                img_all.visible = true;
                ani_anger.play(1, true);
            }
            else
                this._probarmask.graphics.drawPie(63.5, 63.5, 70, 270, 270 + angerRate, "#f16712", null, 0.01);
        };
        ArtifactRender.prototype.clearArtifact = function () {
            this.visible = false;
            this.img_probarteam.mask = null;
            if (this._probarmask) {
                this._probarmask.destroy();
                this._probarmask = null;
            }
        };
        return ArtifactRender;
    }(ui.fight.box.ArtifactRenderUI));
    game.ArtifactRender = ArtifactRender;
})(game || (game = {}));
