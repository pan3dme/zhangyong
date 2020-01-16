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
    var ShouyiUpView = /** @class */ (function (_super) {
        __extends(ShouyiUpView, _super);
        function ShouyiUpView() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = false;
            _this.isModelClose = false;
            _this.bgPanel.dataSource = { uiName: UIConst.Guaji_ShouyiUpView, closeOnSide: _this.isModelClose, closeOnButton: false, title: "收益提升" };
            _this.bgPanel.addChildAt(_this.listBg, 3);
            return _this;
        }
        ShouyiUpView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.anchorX = this.anchorY = 0.5;
            this.visible = false;
            this.itemList.renderHandler = new Handler(this, this.itemRender);
        };
        ShouyiUpView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            var model = game.GuajiModel.getInstance();
            model.lastCopyId = model.getMaxLev();
            this.visible = false;
            var list = this.dataSource;
            this.itemList.array = list;
            this.itemList.height = list.length * 36 + (list.length - 1) * this.itemList.spaceY;
            this.listBg.height = this.itemList.height + 20;
            this.height = this.bgPanel.height = this.listBg.y + this.listBg.height + 50;
            this.x = (Laya.stage.width >> 1);
            this.y = (Laya.stage.height >> 1);
            this.visible = true;
            this.alpha = 1;
            Laya.timer.once(1500, this, this.startTween);
        };
        /** 开始漂浮 */
        ShouyiUpView.prototype.startTween = function () {
            var _this = this;
            Laya.Tween.clearTween(this);
            Laya.Tween.to(this, { alpha: 0, y: this.y - 300 }, 500, null, Handler.create(this, function () {
                _this.close();
            }));
        };
        ShouyiUpView.prototype.itemRender = function (box, index) {
            var info = box.dataSource;
            var imgRes = box.getChildByName("imgRes");
            var lbLast = box.getChildByName("lbLast");
            var imgArrow = box.getChildByName("imgArrow");
            var lbCur = box.getChildByName("lbCur");
            if (info) {
                imgRes.skin = SkinUtil.getCostSkin(info.type);
                lbLast.text = info.last + "/m";
                lbCur.text = info.cur + "/m";
            }
        };
        ShouyiUpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.visible = false;
            this.itemList.array = null;
            Laya.Tween.clearTween(this);
            Laya.timer.clearAll(this);
        };
        return ShouyiUpView;
    }(ui.guaji.ShouyiUpUI));
    game.ShouyiUpView = ShouyiUpView;
})(game || (game = {}));
