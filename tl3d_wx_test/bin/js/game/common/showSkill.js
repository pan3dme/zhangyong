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
/**
* name
*/
var common;
(function (common) {
    var showSkill = /** @class */ (function (_super) {
        __extends(showSkill, _super);
        function showSkill() {
            var _this = _super.call(this) || this;
            _this.x = _this.y = 0;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            return _this;
        }
        showSkill.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        showSkill.prototype.show = function () {
            _super.prototype.show.call(this);
            this.initView();
        };
        showSkill.prototype.initView = function () {
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
                this._skillLab.strokeColor = "#000000";
                this._skillLab.stroke = 5;
                this.addChild(this._skillLab);
            }
            this.setData();
        };
        // private _particle:Pan3d.CombineParticle
        showSkill.prototype.setData = function () {
            var _this = this;
            if (this.dataSource) {
                this.uiScene.addModelChar(String(this.dataSource.model), this.dataSource.charx, this.dataSource.chary, 170, this.dataSource.scale);
                this.uiScene.addEffect(this, 1000009, new tl3d.Vector3D(0, 0, this.dataSource.effz), 10, 0, function (particle) {
                    // this._particle = particle;
                }, 0, 0, false, 0.5);
                this._skillLab.text = this.dataSource.text;
            }
            setTimeout(function () {
                if (_this.dataSource && _this.dataSource.cb) {
                    _this.dataSource.cb();
                }
                _this.close();
            }, 800);
        };
        showSkill.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.uiScene.onExit();
        };
        return showSkill;
    }(common.DialogExt));
    common.showSkill = showSkill;
})(common || (common = {}));
