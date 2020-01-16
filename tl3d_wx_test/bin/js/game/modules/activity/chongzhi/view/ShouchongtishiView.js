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
    var ShouchongtishiView = /** @class */ (function (_super) {
        __extends(ShouchongtishiView, _super);
        function ShouchongtishiView() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this.uiScene = new Base2dSceneLayer();
            _this.addChild(_this.uiScene);
            _this.uiScene.zOrder = 5;
            _this.initHtmlText();
            _this.btn_close.on(Laya.Event.CLICK, _this, function () {
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CLOSE_SHOUCHONG_TIPS));
            });
            _this.img_bg.on(Laya.Event.CLICK, _this, _this.showShouchong);
            return _this;
        }
        ShouchongtishiView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
        };
        Object.defineProperty(ShouchongtishiView.prototype, "dataSource", {
            set: function (value) {
                this.initView(value);
            },
            enumerable: true,
            configurable: true
        });
        ShouchongtishiView.prototype.initHtmlText = function () {
            this._htmlText.style.color = ColorConst.normalFont;
            this._htmlText.style.wordWrap = true;
            this._htmlText.mouseEnabled = false;
            this._htmlText.style.align = "left";
            this._htmlText.style.fontSize = 20;
            this._htmlText.style.leading = 5;
            this._htmlText.style.width = 170;
            this.addChild(this._htmlText);
            this._htmlText.y = 22;
            this._htmlText.x = 36;
        };
        ShouchongtishiView.prototype.initView = function (id) {
            this.uiScene.onShow();
            this.uiScene.setPos(0, Launch.offsetY);
            // let data: tb.TB_first_recharge = tb.TB_first_recharge.get_TB_first_rechargeById(id);
            this._htmlText.innerHTML = this.getContext(id);
            this.refreshModel(1004);
        };
        ShouchongtishiView.prototype.getContext = function (idx) {
            switch (idx) {
                case 1:
                    return "<span style='color:#f66217;'>\u9996\u5145</span>\u9001<span style='color:#ff0000;'>6\u661F\u96C5\u5178\u5A1C</span>\uFF0C\u5F3A\u529B\u8F93\u51FA\uFF0C\u989C\u503C\u62C5\u5F53\uFF01";
                case 2:
                    return "<span style='color:#f66217;'>\u7D2F\u514598</span>\u9001<span style='color:#ff0000;'>\u65E0\u754F\u5957\u88C5</span>\uFF0C\u5957\u88C5\u6FC0\u6D3B\uFF0C\u5C5E\u6027\u98DE\u5347\uFF01";
                default:
                    return "<span style='color:#f66217;'>\u7D2F\u5145198</span>\u9001<span style='color:#ff0000;'>\u4F20\u8BF4\u6258\u5C14</span>\uFF0C\u96F7\u795E\u964D\u4E34\uFF0C\u6BC1\u5929\u706D\u5730\uFF01";
            }
        };
        ShouchongtishiView.prototype.showShouchong = function () {
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_SHOUCHONG_PANEL));
        };
        /**
         * 刷新模型id
         * @param modeid 模型id
         */
        ShouchongtishiView.prototype.refreshModel = function (modeid) {
            this.uiScene.addModelChar(modeid, this.x + 50, this.y + 230, 180, 2);
            this.uiScene.sceneChar.play('idea', 0);
        };
        //刷新模型位置
        ShouchongtishiView.prototype.updateModulePos = function () {
            if (this.uiScene && this.uiScene.sceneChar) {
                this.uiScene.sceneChar.set2dPos(this.x - 20, this.y + 230); //坐标
            }
        };
        //关闭面板
        ShouchongtishiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.uiScene.onExit();
        };
        return ShouchongtishiView;
    }(ui.activity.shouchong.ShouchongtishiUI));
    game.ShouchongtishiView = ShouchongtishiView;
})(game || (game = {}));
