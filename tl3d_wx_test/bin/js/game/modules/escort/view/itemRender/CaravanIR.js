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
    var CaravanIR = /** @class */ (function (_super) {
        __extends(CaravanIR, _super);
        function CaravanIR() {
            var _this = _super.call(this) || this;
            _this.uiScene = new Base2dSceneLayer();
            _this.addChildAt(_this.uiScene, 0);
            _this.uiScene.setModelBox(_this, _this.lbName, _this.lbTime);
            return _this;
        }
        Object.defineProperty(CaravanIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        /** 设置初始位置 */
        CaravanIR.prototype.setStartPositon = function (maxy, miny) {
            if (miny === void 0) { miny = 420; }
            this.x = -this.width + 15;
            this.y = miny + Math.floor(Math.random() * (maxy - miny)) - this.height;
        };
        CaravanIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info.svo.name;
                this.lbShenli.text = LanMgr.getLan('', 10117, info.svo.force);
                Laya.timer.loop(1000, this, this.updateTime);
                this.updateTime();
                this.uiScene.onShow();
                this._modelId = info.tbEscort.model;
                Laya.timer.once(200, this, this.delayShow);
                Laya.timer.frameLoop(2, this, this.updatePosition);
                this.on(Laya.Event.CLICK, this, this.onShowDetail);
            }
            else {
                this.onRemove();
            }
        };
        /** 更新倒计时 */
        CaravanIR.prototype.updateTime = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var time = info.svo.endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = GameUtil.toCountdown(time, "mm:ss");
                if (this.x >= 995) {
                    this.onRemove();
                }
            }
            else {
                this.onRemove();
            }
        };
        /** 更新位置 */
        CaravanIR.prototype.updatePosition = function () {
            // 647/8=80  80/60=1.3 一帧1.3
            this.x += 2.5;
            if (this.uiScene.sceneChar) {
                var point = this.lbShenli.localToGlobal(new Laya.Point(0, 0));
                this.uiScene.sceneChar.set2dPos(this.getX(point.x), this.getY(point.y));
            }
        };
        CaravanIR.prototype.getX = function (pointx) {
            return pointx + this.lbShenli.width / 2 - Launch.offsetX;
        };
        CaravanIR.prototype.getY = function (pointy) {
            return pointy - 20 - Launch.offsetY;
        };
        /** 延迟展示模型（延迟主要为了定位） */
        CaravanIR.prototype.delayShow = function () {
            if (!this._modelId)
                return;
            var point = this.lbShenli.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(this._modelId, this.getX(point.x), this.getY(point.y), 90, 1.0);
            this.uiScene.sceneChar.play(tl3d.CharAction.WALK, 0);
        };
        /** 打开商队信息 */
        CaravanIR.prototype.onShowDetail = function () {
            if (this.dataSource) {
                dispatchEvt(new game.EscortEvent(game.EscortEvent.SHOW_CARAVAN_INFO_VIEW, this.dataSource));
            }
        };
        /** 移除 */
        CaravanIR.prototype.onRemove = function () {
            this._dataSource = null;
            Laya.timer.clearAll(this);
            this.off(Laya.Event.CLICK, this, this.onShowDetail);
            this.uiScene.onExit();
            game.EscortModel.getInstance().pushItemRender(this);
            this.removeSelf();
        };
        return CaravanIR;
    }(ui.escort.itemRender.CaravanIRenderUI));
    game.CaravanIR = CaravanIR;
})(game || (game = {}));
