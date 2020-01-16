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
    var forestAwardView = /** @class */ (function (_super) {
        __extends(forestAwardView, _super);
        function forestAwardView() {
            var _this = _super.call(this) || this;
            _this.uiScenes1 = new Base2dSceneLayer();
            _this.addChild(_this.uiScenes1);
            _this.uiScenes1.setModelBox(_this, _this.lbDesc, _this.lbDesc);
            return _this;
        }
        Object.defineProperty(forestAwardView.prototype, "dataSource", {
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
        forestAwardView.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.visible = true;
                this.lbDesc.text = info.tbForest.special_desc;
                if (info.isSpecial()) {
                    var isGod = info.specialModel > 0;
                    this.itemBox.visible = false;
                    this.uiScenes1.onExit();
                    if (isGod) {
                        this.uiScenes1.onShow();
                        Laya.timer.once(200, this, this.delayShow, [info.specialModel]);
                    }
                    else {
                        this.itemBox.visible = true;
                        this.itemBox.dataSource = info.itemVo;
                    }
                }
                else {
                    this.uiScenes1.onExit();
                }
            }
            else {
                this.uiScenes1.onExit();
                this.visible = false;
            }
        };
        /** 延迟展示模型（延迟主要为了定位） */
        forestAwardView.prototype.delayShow = function (modeid) {
            var point = this.lbDesc.localToGlobal(new Laya.Point(0, 0));
            this.uiScenes1.addModelChar(modeid, point.x + this.lbDesc.width / 2 - Launch.offsetX, point.y - Launch.offsetY - 10, 180, 1.2);
            this.uiScenes1.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        return forestAwardView;
    }(ui.fogforest.AwardUI));
    game.forestAwardView = forestAwardView;
})(game || (game = {}));
