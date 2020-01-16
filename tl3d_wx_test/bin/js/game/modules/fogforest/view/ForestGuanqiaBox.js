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
    var ForestGuanqiaBox = /** @class */ (function (_super) {
        __extends(ForestGuanqiaBox, _super);
        function ForestGuanqiaBox() {
            var _this = _super.call(this) || this;
            _this._hasbgEff = false;
            _this.uiScenes = new Base2dSceneLayer();
            _this.boxRole.addChild(_this.uiScenes);
            _this.uiScenes.setModelBox(_this, _this.lbTitle, _this.imgDitu);
            return _this;
        }
        Object.defineProperty(ForestGuanqiaBox.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        ForestGuanqiaBox.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.lab_condition.visible = false;
                // this.lab_condition.visible = info.tbForest.need_power > App.hero.force;
                // this.lab_condition.text = LanMgr.getLan("", 12128, info.tbForest.need_power);
                // 单数右边
                var isRight = info.tbForest.ID % 2 == 1;
                this.imgDitu.scaleX = isRight ? 1 : -1;
                this.boxRole.x = isRight ? (this.width / 2 + 100) : (this.width / 2 - 300);
                this.boxChallenge.x = isRight ? (this.width / 2 + 40) : (this.width / 2 - 120);
                this.ani_guanqia.x = this.boxChallenge.x + this.boxChallenge.width / 2;
                this.ani_guanqia.y = this.boxChallenge.y + this.boxChallenge.height / 2;
                var isCur = info.isCurrent();
                var isPass = info.isPass();
                this.lbTitle.visible = this.imgDi.visible = true;
                this.lbTitle.text = info.tbForest.name;
                this.imgMask.visible = isPass;
                this.imgMiwu.visible = !isPass && !isCur;
                if (isCur) {
                    this.ani_guanqia.play(0, true);
                    this.ani_guanqia.visible = true;
                }
                else {
                    this.ani_guanqia.stop();
                    this.ani_guanqia.visible = false;
                }
                // 需先移除
                this.removeBgEff();
                this.uiScenes.onExit();
                if (!isPass || isCur) {
                    this.uiScenes.onShow();
                    Laya.timer.once(300, this, this.delayShow, [info.modelId]);
                    if (isCur) {
                        Laya.timer.once(350, this, this.addBgEff);
                    }
                }
                this.boxChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
                this.boxRole.on(Laya.Event.CLICK, this, this.onChallenge);
            }
            else {
                this.uiScenes.onExit();
                this.removeBgEff();
                Laya.timer.clearAll(this);
                this.boxChallenge.off(Laya.Event.CLICK, this, this.onChallenge);
                this.boxRole.off(Laya.Event.CLICK, this, this.onChallenge);
                this.ani_guanqia.stop();
                this.ani_guanqia.visible = false;
            }
        };
        /** 挑战 */
        ForestGuanqiaBox.prototype.onChallenge = function () {
            var info = this.dataSource;
            if (info && info.isCurrent()) {
                dispatchEvt(new game.FogForestEvent(game.FogForestEvent.GUANQIA_CHALLENGE), info);
            }
        };
        ForestGuanqiaBox.prototype.addBgEff = function () {
            var _this = this;
            var info = this.dataSource;
            if (this._hasbgEff || !info)
                return;
            this._hasbgEff = true;
            var point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            var v3d = this.uiScenes.get3dPos(point.x + this.boxRole.width / 2 - Launch.offsetX, point.y + this.boxRole.height - Launch.offsetY);
            this.uiScenes.addEffect(this, 10000022, v3d, 2.5, 30, function ($particle) {
                _this._bgEff = $particle;
                if (!_this._hasbgEff) {
                    _this.removeBgEff();
                }
            });
        };
        //移除背景特效
        ForestGuanqiaBox.prototype.removeBgEff = function () {
            this._hasbgEff = false;
            if (this._bgEff) {
                this.uiScenes.removeEffect(this._bgEff);
                this._bgEff = null;
            }
        };
        /** 延迟展示模型（延迟主要为了定位） */
        ForestGuanqiaBox.prototype.delayShow = function (modeid) {
            var point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            if (this.uiScenes.sceneChar) {
                this.uiScenes.sceneChar.setRoleUrl(getRoleUrl(modeid));
                this.uiScenes.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
            }
            else {
                var posy = point.y + this.boxRole.height - Launch.offsetY;
                this.uiScenes.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, posy, 180, 2);
            }
        };
        return ForestGuanqiaBox;
    }(ui.fogforest.GuanqiaBoxUI));
    game.ForestGuanqiaBox = ForestGuanqiaBox;
})(game || (game = {}));
