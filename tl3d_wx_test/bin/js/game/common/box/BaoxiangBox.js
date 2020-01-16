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
    var BaoxiangBox = /** @class */ (function (_super) {
        __extends(BaoxiangBox, _super);
        function BaoxiangBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BaoxiangBox.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        BaoxiangBox.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.imgBox.skin = info.getSkin();
                var isCanReward = info.isCanReward();
                this.imgGuang.visible = isCanReward;
                Laya.Tween.clearTween(this.imgGuang);
                if (isCanReward) {
                    this.loopRotation();
                }
                this.lbCount.text = info.getCount() + "";
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                Laya.Tween.clearTween(this.imgGuang);
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        /** 光效 */
        BaoxiangBox.prototype.loopRotation = function () {
            var _this = this;
            this.imgGuang.rotation = 0;
            Laya.Tween.to(this.imgGuang, { rotation: 360 }, 2000, Laya.Ease.linearInOut, new Handler(this, function () {
                _this.loopRotation();
            }));
        };
        /** 点击宝箱 */
        BaoxiangBox.prototype.onClick = function () {
            var info = this.dataSource;
            if (info.isCanReward()) {
                dispatchEvt(info.getEvent(), info);
            }
            else {
                UIMgr.showUI((UIConst.ManyItemsTip), { data: info.getRewardList() });
            }
        };
        return BaoxiangBox;
    }(ui.box.BaoxiangBoxUI));
    common.BaoxiangBox = BaoxiangBox;
})(common || (common = {}));
