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
    var QiyuAnimView = /** @class */ (function (_super) {
        __extends(QiyuAnimView, _super);
        function QiyuAnimView() {
            var _this = _super.call(this) || this;
            _this._btnList = [];
            _this.mouseEnabled = true;
            _this.mouseThrough = false;
            _this.ani1.on(Laya.Event.COMPLETE, _this, _this.showQiyu);
            return _this;
        }
        QiyuAnimView.prototype.startAnim = function (riskList, targetPoint, removeCb, itemCb) {
            Dialog.manager.mouseEnabled = false;
            this._removeCallback = removeCb;
            this._itemAnimEndCallback = itemCb;
            this.x = Laya.stage.width / 2 - this.width / 2;
            this.y = Laya.stage.height / 2 - this.height / 2;
            Laya.stage.addChild(this);
            this.ani1.play(0, false);
            this._targetPos = targetPoint;
            this._btnList.length = 0;
            var num = 4;
            var itemWh = 170;
            var itemHg = 185;
            var len = riskList.length;
            var startX = this.width / 2 - (len > num ? itemWh * num / 2 : len * itemWh / 2);
            var startY = this.height / 2 - 90;
            for (var i = 0; i < len; i++) {
                var itemIR = new game.QiyuTabIR();
                itemIR.scale(1, 1);
                itemIR.dataSource = riskList[i];
                itemIR.clientPos = new Laya.Point(startX + (i % num) * itemWh, startY + itemHg * Math.floor(i / num));
                itemIR.x = itemIR.clientPos.x;
                itemIR.y = itemIR.clientPos.y;
                itemIR.visible = false;
                this._btnList.push(itemIR);
                this.addChild(itemIR);
            }
        };
        // 奇遇图标动画 -- 300毫秒显示，1000毫秒停留，之后逐个飘向奇遇按钮
        QiyuAnimView.prototype.showQiyu = function () {
            var _this = this;
            var len = this._btnList.length;
            var total = 0;
            var _loop_1 = function (i) {
                var delay = 1300 + i * 200;
                total = delay;
                var item = this_1._btnList[i];
                item.visible = true;
                Laya.Tween.from(item, { x: 275, y: 840, alpha: 0.5 }, 300);
                Laya.Tween.to(item, { x: this_1._targetPos.x, y: this_1._targetPos.y, alpha: 0.5, scaleX: 0.5, scaleY: 0.5 }, 500, null, new Handler(this_1, function () {
                    item && item.removeSelf();
                    if (_this._itemAnimEndCallback) {
                        _this._itemAnimEndCallback();
                    }
                }), delay);
            };
            var this_1 = this;
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
            // 1300毫秒之后开始飘
            Laya.timer.once(1300, this, function () {
                _this.ani2.play(0, false);
            });
            Laya.timer.once((total + 500), this, this.onRemove);
        };
        QiyuAnimView.prototype.onRemove = function () {
            Dialog.manager.mouseEnabled = true;
            for (var _i = 0, _a = this._btnList; _i < _a.length; _i++) {
                var item = _a[_i];
                Laya.Tween.clearAll(item);
                item.removeSelf();
            }
            this._btnList.length = 0;
            this.removeSelf();
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            this.ani1.gotoAndStop(0);
            if (this._removeCallback) {
                this._removeCallback();
                this._removeCallback = null;
            }
            this._itemAnimEndCallback = null;
        };
        return QiyuAnimView;
    }(ui.dafuweng.QiyuAnimUI));
    game.QiyuAnimView = QiyuAnimView;
})(game || (game = {}));
