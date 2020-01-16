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
    var FaceView = /** @class */ (function (_super) {
        __extends(FaceView, _super);
        function FaceView() {
            return _super.call(this) || this;
        }
        FaceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.faceList.array = null;
            this.faceList.renderHandler = new Handler(this, this.onBqRender);
            this.faceList.mouseHandler = new Handler(this, this.onBqClick);
        };
        FaceView.prototype.onEnter = function (callback, sp) {
            if (sp === void 0) { sp = null; }
            this.faceList.array = game.ChatModel.getInstance().getBqList();
            this.visible = false;
            this._selectSp = sp;
            if (sp) {
                sp.visible = false;
            }
            this._callback = callback;
        };
        /** 表情列表渲染 */
        FaceView.prototype.onBqRender = function (img, index) {
            var obj = img.dataSource;
            if (obj) {
                img.skin = obj.url;
            }
            else {
                img.skin = null;
            }
        };
        /** 选择表情 */
        FaceView.prototype.onBqClick = function (event) {
            var obj = event.currentTarget.dataSource;
            if (event.type == Laya.Event.CLICK) {
                if (this._callback) {
                    this._callback(obj);
                }
                this.onOpenOrHide();
            }
        };
        /**点击表情 */
        FaceView.prototype.onOpenOrHide = function () {
            var _this = this;
            this.visible = !this.visible;
            if (this.visible) {
                Laya.timer.callLater(this, function () {
                    _this.stage.on(Laya.Event.CLICK, _this, _this.onClickView);
                });
                if (this._selectSp) {
                    this._selectSp.visible = true;
                }
            }
            else {
                this.stage.off(Laya.Event.CLICK, this, this.onClickView);
                if (this._selectSp) {
                    this._selectSp.visible = false;
                }
            }
        };
        FaceView.prototype.onClickView = function (event) {
            var target = event.target;
            if (target != this) {
                this.onOpenOrHide();
            }
        };
        FaceView.prototype.onExit = function () {
            this.faceList.array = null;
            this._callback = null;
            this.stage.off(Laya.Event.CLICK, this, this.onClickView);
        };
        return FaceView;
    }(ui.chat.FaceUI));
    game.FaceView = FaceView;
})(game || (game = {}));
