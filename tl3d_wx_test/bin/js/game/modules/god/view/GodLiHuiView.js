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
    var GodLiHuiView = /** @class */ (function (_super) {
        __extends(GodLiHuiView, _super);
        function GodLiHuiView() {
            var _this = _super.call(this) || this;
            _this.factor = 0.15;
            //上次记录的两个触模点之间距离 用于双指缩放
            _this.lastDistance = 0;
            _this._isDown = false;
            _this._lastPosX = 0;
            _this._lastPosY = 0;
            _this.isModelClose = true;
            _this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.GOD_LIHUI);
            _this.panel_main.width = Laya.stage.width;
            _this.panel_main.height = Laya.stage.height;
            return _this;
        }
        GodLiHuiView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        GodLiHuiView.prototype.initView = function () {
            this.panel_main.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
            this.panel_main.on(Laya.Event.MOUSE_UP, this, this.onUp);
            this.panel_main.on(Laya.Event.MOUSE_OUT, this, this.onUp);
            this.btn_reduce.on(Laya.Event.CLICK, this, this.onClickReduce);
            this.btn_add.on(Laya.Event.CLICK, this, this.onClickAdd);
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.sl_scale.changeHandler = Handler.create(this, this.onScaleChange, null, false);
            this.sl_scale.showLabel = false;
            this._godTemp = this.dataSource;
            this.lab_title.text = this._godTemp.name;
            this.updateView();
        };
        GodLiHuiView.prototype.updateView = function () {
            var _this = this;
            this.img_god.skin = SkinUtil.getLiHuiIcon(this._godTemp.paint);
            this.img_god.scale(1, 1);
            this.img_god.x = this.panel_main.width / 2;
            this.img_god.y = this.panel_main.height / 2;
            Laya.timer.frameOnce(3, this, function () {
                _this.sl_scale.value = 100;
            });
        };
        GodLiHuiView.prototype.onDown = function (e) {
            this._isDown = true;
            this._lastPosX = e.currentTarget.mouseX;
            this._lastPosY = e.currentTarget.mouseY;
            this.panel_main.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
            var touches = e.touches;
            if (touches && touches.length == 2) {
                this.lastDistance = this.getDistance(touches);
            }
        };
        /**计算两个触摸点之间的距离*/
        GodLiHuiView.prototype.getDistance = function (points) {
            var distance = 0;
            if (points && points.length == 2) {
                var dx = points[0].stageX - points[1].stageX;
                var dy = points[0].stageY - points[1].stageY;
                distance = Math.sqrt(dx * dx + dy * dy);
            }
            return distance;
        };
        GodLiHuiView.prototype.onMove = function (e) {
            if (!this._isDown)
                return;
            var touches = e.touches;
            if (touches && touches.length == 2) {
                //双指
                var distance = this.getDistance(e.touches);
                //判断当前距离与上次距离变化，确定是放大还是缩小
                var scale = (distance - this.lastDistance) * this.factor;
                this.lastDistance = distance;
                scale += this.sl_scale.value;
                scale = Math.min(GodLiHuiView.SCALE_MAX, scale);
                this.sl_scale.value = Math.max(GodLiHuiView.SCALE_MIN, scale);
            }
            else {
                var newPosx = e.currentTarget.mouseX;
                var newPosy = e.currentTarget.mouseY;
                var chaposx = newPosx - this._lastPosX;
                var chaposy = newPosy - this._lastPosY;
                this._lastPosX = newPosx;
                this._lastPosY = newPosy;
                this.img_god.x += chaposx;
                this.img_god.y += chaposy;
            }
        };
        GodLiHuiView.prototype.onUp = function (e) {
            this._isDown = false;
            this.panel_main.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
        };
        GodLiHuiView.prototype.onScaleChange = function (value) {
            var per = this.getScaleBySliderValue(value);
            this.img_god.scale(per, per);
        };
        GodLiHuiView.prototype.onClickReduce = function () {
            this.sl_scale.value = Math.max(GodLiHuiView.SCALE_MIN, this.sl_scale.value - 1);
        };
        GodLiHuiView.prototype.onClickAdd = function () {
            this.sl_scale.value = Math.min(GodLiHuiView.SCALE_MAX, this.sl_scale.value + 1);
        };
        GodLiHuiView.prototype.getScaleBySliderValue = function (sliderVal) {
            var val = sliderVal / 100;
            return val;
        };
        GodLiHuiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.panel_main.off(Laya.Event.MOUSE_DOWN, this, this.onDown);
            this.panel_main.off(Laya.Event.MOUSE_UP, this, this.onUp);
            this.panel_main.off(Laya.Event.MOUSE_OUT, this, this.onUp);
            this.btn_reduce.off(Laya.Event.CLICK, this, this.onClickReduce);
            this.btn_add.off(Laya.Event.CLICK, this, this.onClickAdd);
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            if (this.sl_scale.changeHandler) {
                this.sl_scale.changeHandler.recover();
                this.sl_scale.changeHandler = null;
            }
            this._godTemp = null;
        };
        GodLiHuiView.SCALE_MIN = 50;
        GodLiHuiView.SCALE_MAX = 150;
        return GodLiHuiView;
    }(ui.god.GodLiHuiUI));
    game.GodLiHuiView = GodLiHuiView;
})(game || (game = {}));
