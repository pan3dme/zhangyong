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
    var TaskBaoxiangIR = /** @class */ (function (_super) {
        __extends(TaskBaoxiangIR, _super);
        function TaskBaoxiangIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TaskBaoxiangIR.prototype, "dataSource", {
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
        TaskBaoxiangIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.imgBox.skin = info.getRewardSkin();
                this.lab_num.text = String(info.getCount());
                var isCanReward = info.isCanReward();
                this.imgGuang.visible = isCanReward;
                Laya.Tween.clearTween(this.imgGuang);
                if (isCanReward) {
                    this.loopRotation();
                    this.startAni();
                }
                else {
                    this.ani1.gotoAndStop(0);
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                Laya.Tween.clearTween(this.imgGuang);
                Laya.timer.clearAll(this);
                this.off(Laya.Event.CLICK, this, this.onClick);
                this.ani1.gotoAndStop(0);
            }
        };
        TaskBaoxiangIR.prototype.startAni = function () {
            var info = this.dataSource;
            if (info && info.isCanReward()) {
                this.ani1.play(0, false);
            }
            else {
                this.ani1.gotoAndStop(0);
            }
        };
        /** 光效 */
        TaskBaoxiangIR.prototype.loopRotation = function () {
            var _this = this;
            this.imgGuang.rotation = 0;
            Laya.Tween.to(this.imgGuang, { rotation: 360 }, 2000, Laya.Ease.linearInOut, new Handler(this, function () {
                _this.loopRotation();
            }));
        };
        /** 点击宝箱 */
        TaskBaoxiangIR.prototype.onClick = function () {
            var info = this.dataSource;
            if (info.isCanReward()) {
                dispatchEvt(info.getEvent(), info);
            }
            else {
                UIMgr.showUI((UIConst.ManyItemsTip), { data: info.getRewardList() });
            }
        };
        return TaskBaoxiangIR;
    }(ui.task.itemrender.TaskBaoxiangIRUI));
    game.TaskBaoxiangIR = TaskBaoxiangIR;
})(game || (game = {}));
