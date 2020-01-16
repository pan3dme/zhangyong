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
    var IGuideTalkOpt = /** @class */ (function () {
        function IGuideTalkOpt() {
        }
        return IGuideTalkOpt;
    }());
    game.IGuideTalkOpt = IGuideTalkOpt;
    /** 模型位置 */
    var LocationType;
    (function (LocationType) {
        LocationType[LocationType["center"] = 0] = "center";
        LocationType[LocationType["left"] = 1] = "left";
        LocationType[LocationType["right"] = 2] = "right"; // 右边
    })(LocationType = game.LocationType || (game.LocationType = {}));
    var GuideTalkView = /** @class */ (function (_super) {
        __extends(GuideTalkView, _super);
        function GuideTalkView() {
            return _super.call(this) || this;
        }
        GuideTalkView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._htmlText = new Laya.HTMLDivElement();
            this._htmlText.x = 31;
            this._htmlText.y = 399;
            this._htmlText.width = 555;
            this._htmlText.color = "#72462b";
            this._htmlText.style.fontSize = 25;
            this._htmlText.style.leading = 6;
            this._htmlText.style.color = "#72462b";
            this._htmlText.style.wordWrap = true;
            this.box.addChildAt(this._htmlText, this.box.numChildren - 2);
            this.uiScene = new Base2dSceneLayer();
            this.addChildAt(this.uiScene, 0);
        };
        GuideTalkView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.btnPass.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 54) : 54;
        };
        GuideTalkView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuideTalkView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 初始化界面 */
        GuideTalkView.prototype.initView = function () {
            this._opt = this.dataSource;
            if (!this.dataSource.hasOwnProperty('remove')) {
                this._opt.remove = true;
            }
            this._htmlText.innerHTML = this._opt.text;
            this.on(Laya.Event.CLICK, this, this.onCloseComp);
            this.btnPass.on(Laya.Event.CLICK, this, this.onPass);
            if (this._opt.hidePass) {
                this.btnPass.visible = false;
            }
            else {
                this.btnPass.visible = game.GuideManager.canShowPassBtn();
            }
            this.lab_name.text = this._opt.modelName;
            // 设置模型位置
            var posx = 0;
            // 1120
            var posy = Laya.stage.height - 160;
            var scale = this._opt.modelScale;
            if (this._opt.location == LocationType.left) {
                posx = (Laya.stage.width >> 1) - 170;
                this.bgName.x = 37;
            }
            else if (this._opt.location == LocationType.right) {
                posx = (Laya.stage.width >> 1) + 170;
                this.bgName.x = 387;
            }
            else {
                posx = Laya.stage.width >> 1;
                this.bgName.x = 217;
                // 1070
                posy = Laya.stage.height - 210;
            }
            // 偏移
            posx = posx - Launch.offsetX;
            posy = posy - Launch.offsetY;
            this.lab_name.x = this.bgName.x + (this.bgName.width >> 1);
            // loghgy("模型位置",posx,posy);
            this.uiScene.addModelChar(String(this._opt.model), posx, posy, 180, scale);
        };
        GuideTalkView.prototype.onCloseComp = function (event) {
            event.stopPropagation();
            if (this._opt.remove) {
                UIMgr.hideUIByName(UIConst.GuideTalkView);
            }
            dispatchEvt(new game.GuideEvent(game.GuideEvent.Guide_Talk_End));
        };
        GuideTalkView.prototype.onPass = function (event) {
            event.stopPropagation();
            Laya.timer.frameOnce(5, this, function () {
                game.GuideManager.passGuide();
            });
        };
        GuideTalkView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.uiScene.onExit();
            this.off(Laya.Event.CLICK, this, this.onCloseComp);
            this.btnPass.off(Laya.Event.CLICK, this, this.onPass);
        };
        return GuideTalkView;
    }(ui.guide.GuideTalkUI));
    game.GuideTalkView = GuideTalkView;
})(game || (game = {}));
