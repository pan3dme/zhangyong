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
var game;
(function (game) {
    var UnLockView = /** @class */ (function (_super) {
        __extends(UnLockView, _super);
        function UnLockView() {
            var _this = _super.call(this) || this;
            _this.lab_text.text = "";
            _this.lab_text.alpha = 0;
            _this.lab_close.alpha = 0;
            _this.isModelClose = false;
            _this.img_bg.zOrder = 100;
            _this.uiScene = new Base2dSceneLayer();
            _this.addChild(_this.uiScene);
            _this.img_zhezhao.on(Laya.Event.CLICK, _this, _this.onExit);
            return _this;
        }
        UnLockView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.uiScene.onExit();
            Laya.timer.clearAll(this);
        };
        UnLockView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.uiScene.onShow();
            this.initView(this.dataSource);
        };
        UnLockView.prototype.initView = function (data) {
            var _this = this;
            if (!data)
                return;
            this.lab_text.text = LanMgr.getLan("", 12512, data.name);
            this.lab_text.centerX = 0;
            Laya.Tween.to(this.img_bg, { alpha: 0 }, 500, null, Handler.create(this, function () {
                _this.uiScene.addEffect(_this, 10000016, new tl3d.Vector3D(180, 0, -350), 7, 3, null, 180);
                Laya.timer.frameOnce(60, _this, function () {
                    _this.refreshModel(data);
                });
                Laya.Tween.to(_this.lab_text, { alpha: 1 }, 500);
                Laya.Tween.to(_this.lab_close, { alpha: 1 }, 800, null, Handler.create(_this, function () {
                    _this.isModelClose = true;
                    dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.SHOW_VISIBLE_TRUE));
                }));
            }));
        };
        /**
         * 刷新模型id
         * @param modeid 模型id
         */
        UnLockView.prototype.refreshModel = function (tbArtifact) {
            var locations = tbArtifact.location;
            this.uiScene.addModelChar(tbArtifact.model.toString(), (Laya.stage.width >> 1)
                + Number(locations[0]) - Launch.offsetX, Number(locations[1] + 150), Number(locations[2]), Number(locations[3]), Number(locations[4]));
        };
        UnLockView.prototype.onExit = function () {
            if (this.isModelClose) {
                this.img_bg.alpha = 1;
                this.lab_text.alpha = 0;
                this.lab_text.text = "";
                this.lab_close.alpha = 0;
                this.isModelClose = false;
                this.close();
            }
        };
        return UnLockView;
    }(ui.artifact.ArtifactUnLockUI));
    game.UnLockView = UnLockView;
})(game || (game = {}));
