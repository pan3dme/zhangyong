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
    var ChatQuickView = /** @class */ (function (_super) {
        __extends(ChatQuickView, _super);
        function ChatQuickView() {
            var _this = _super.call(this) || this;
            _this.forbitHide = false; // 是否禁止隐藏
            return _this;
        }
        ChatQuickView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.lanList.renderHandler = new Handler(this, this.onRender);
            this.lanList.mouseHandler = new Handler(this, this.onClick);
        };
        ChatQuickView.prototype.onEnter = function (callback, sp) {
            this.forbitHide = false;
            this.visible = false;
            this._selectSp = sp;
            if (sp) {
                sp.visible = false;
            }
            this._callback = callback;
            this.lanList.array = tb.TB_chat_quick.getList();
            ;
        };
        /** 列表渲染 */
        ChatQuickView.prototype.onRender = function (box, index) {
            var label = box.getChildByName("lbContent");
            var obj = box.dataSource;
            if (obj) {
                label.text = obj.desc;
            }
        };
        /** 选择 */
        ChatQuickView.prototype.onClick = function (event) {
            var box = event.currentTarget;
            var label = box.getChildByName("lbContent");
            var obj = box.dataSource;
            if (event.type == Laya.Event.CLICK) {
                if (this._callback) {
                    this._callback(obj);
                }
                this.onOpenOrHide();
            }
            else if (event.type == Laya.Event.MOUSE_OVER || event.type == Laya.Event.ROLL_OVER) {
                label.color = ColorConst.TASK_ORANGE;
            }
            else if (event.type == Laya.Event.MOUSE_OUT || event.type == Laya.Event.ROLL_OUT) {
                label.color = ColorConst.WHITE;
            }
        };
        /** 点击 */
        ChatQuickView.prototype.onOpenOrHide = function () {
            var _this = this;
            // 禁止隐藏
            if (this.forbitHide && this.visible) {
                return;
            }
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
        ChatQuickView.prototype.onClickView = function (event) {
            var target = event.target;
            if (target != this.lanList) {
                this.onOpenOrHide();
            }
        };
        ChatQuickView.prototype.onExit = function () {
            this.lanList.array = null;
            this._callback = null;
            if (this._selectSp) {
                this._selectSp.visible = false;
            }
            this.stage.off(Laya.Event.CLICK, this, this.onClickView);
            this.forbitHide = false;
        };
        return ChatQuickView;
    }(ui.chat.ChatQuickUI));
    game.ChatQuickView = ChatQuickView;
})(game || (game = {}));
