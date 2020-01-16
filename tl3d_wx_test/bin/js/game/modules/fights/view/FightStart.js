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
    /** 战斗开始 */
    var FightStart = /** @class */ (function (_super) {
        __extends(FightStart, _super);
        function FightStart() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this.game2dScene = new Base2dSceneLayer();
            _this.addChild(_this.game2dScene);
            _this._sceneTransitionUi = new Laya.Image("preload/black.jpg");
            _this._sceneTransitionUi.x = _this._sceneTransitionUi.y = 0;
            _this._sceneTransitionUi.width = Laya.stage.width;
            _this._sceneTransitionUi.height = Laya.stage.height;
            // showToast("宽："+this._sceneTransitionUi.width + "   高："+this._sceneTransitionUi.height);
            // this._sceneTransitionUi.width = 720;
            // this._sceneTransitionUi.height = 1280;
            _this._sceneTransitionUi.alpha = 0;
            _this._sceneTransitionUi.visible = false;
            _this.addChild(_this._sceneTransitionUi);
            return _this;
        }
        FightStart.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.isModal = !this.dataSource.isJy;
            this.initView();
        };
        FightStart.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.refresh();
        };
        FightStart.prototype.close = function () {
            _super.prototype.close.call(this);
            this.game2dScene.onExit();
            this.clearJingYingStartEff();
        };
        FightStart.prototype.initView = function () {
        };
        FightStart.prototype.refresh = function () {
            var _this = this;
            this._sceneTransitionUi.visible = this.dataSource.optType != startOptState.START && this.isModal;
            if (this.dataSource.optType == startOptState.START) {
                if (this.dataSource.isJy) {
                    this.playJingYingStartEff();
                }
                else {
                    this.playStartEff(this.dataSource.isBoss);
                }
            }
            else if (this.dataSource.optType == startOptState.GUOCHANG) {
                Laya.Tween.to(this._sceneTransitionUi, { alpha: 0.6 }, 1000, null, Laya.Handler.create(this, function () {
                    if (_this.dataSource && _this.dataSource.cb) {
                        _this.dataSource.cb();
                    }
                }));
            }
            else if (this.dataSource.optType == startOptState.GUOCHANGCOMPLETE) {
                this._sceneTransitionUi.alpha = 0.6;
                Laya.Tween.to(this._sceneTransitionUi, { alpha: 0 }, 1000, null, Laya.Handler.create(this, this.onComplete));
            }
        };
        FightStart.prototype.playStartEff = function (isboss) {
            var _this = this;
            this.game2dScene.addEffect(this, isboss ? 10000017 : 10000013, new tl3d.Vector3D(180, 0, -400), isboss ? 18 : 3, 30, function ($particle) {
                $particle.onComplete = function (particle) {
                    _this.game2dScene.scene.removeParticle(particle);
                    if (isboss) {
                        _this.playStartEff(false);
                    }
                    else {
                        _this.onComplete();
                    }
                };
            });
        };
        FightStart.prototype.playJingYingStartEff = function () {
            if (!this._jyStartEff) {
                this._jyStartEff = new Laya.Animation();
                this._jyStartEff.x = this.width / 2;
                this._jyStartEff.y = this.height / 2;
            }
            this._jyStartEff.loadAnimation("eff/TiaoZhanJingYingEff.ani", Handler.create(this, function () {
                this._jyStartEff.play(0, false);
            }), "guaji.atlas");
            this.addChild(this._jyStartEff);
            this._jyStartEff.visible = true;
            Laya.timer.clear(this, this.onComplete);
            Laya.timer.once(1200, this, this.onComplete);
        };
        FightStart.prototype.clearJingYingStartEff = function () {
            if (this._jyStartEff) {
                this._jyStartEff.stop();
                this._jyStartEff.visible = false;
            }
            Laya.timer.clear(this, this.onComplete);
        };
        FightStart.prototype.onComplete = function () {
            if (this.dataSource && this.dataSource.cb) {
                this.dataSource.cb();
            }
            this.close();
        };
        return FightStart;
    }(DialogExt));
    game.FightStart = FightStart;
})(game || (game = {}));
