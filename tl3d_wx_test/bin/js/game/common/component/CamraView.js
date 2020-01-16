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
var common;
(function (common) {
    /*
    * name;
    */
    var CamraView = /** @class */ (function (_super) {
        __extends(CamraView, _super);
        function CamraView(scene) {
            var _this = _super.call(this) || this;
            _this._vis = true;
            _this._scene = scene;
            _this.bar_1.changeHandler = new Handler(_this, _this.Change1);
            _this.bar_2.changeHandler = new Handler(_this, _this.Change2);
            _this.bar_3.changeHandler = new Handler(_this, _this.Change3);
            _this.bar_4.changeHandler = new Handler(_this, _this.Change4);
            _this.bar_5.changeHandler = new Handler(_this, _this.Change5);
            _this.bar_6.changeHandler = new Handler(_this, _this.Change6);
            _this.bar_7.changeHandler = new Handler(_this, _this.Change7);
            _this.bar_8.changeHandler = new Handler(_this, _this.Change8);
            _this.bar_9.changeHandler = new Handler(_this, _this.Change9);
            _this.bar_10.changeHandler = new Handler(_this, _this.Change10);
            _this.btn_fre.on(Laya.Event.CLICK, _this, _this.initCam);
            _this.btn_vis.on(Laya.Event.CLICK, _this, function () {
                _this._scene.LogPos();
                _this._vis = !_this._vis;
                _this.box_item.visible = _this._vis;
            });
            _this.initCam();
            return _this;
        }
        CamraView.prototype.Change1 = function (value) {
            this.lbl_1.text = value.toString();
            this._scene.gameScene.camRotationX = value;
        };
        CamraView.prototype.Change2 = function (value) {
            this.lbl_2.text = value.toString();
            this._scene.gameScene.camRotationY = value;
        };
        CamraView.prototype.Change3 = function (value) {
            this.lbl_3.text = value.toString();
            this._scene.gameScene.camDistance = value;
        };
        CamraView.prototype.Change4 = function (value) {
            this.lbl_4.text = value.toString();
            this._scene.gameScene.camPositionX = value;
        };
        CamraView.prototype.Change5 = function (value) {
            this.lbl_5.text = value.toString();
            this._scene.gameScene.camPositionY = value;
        };
        CamraView.prototype.Change6 = function (value) {
            this.lbl_6.text = value.toString();
            this._scene.gameScene.camPositionZ = value;
        };
        CamraView.prototype.Change7 = function (value) {
            this.lbl_7.text = value.toString();
            this._scene.gameScene.camViewLH = value / 100;
        };
        CamraView.prototype.Change8 = function (value) {
            this.lbl_8.text = value.toString();
            this._scene.gameScene.camFar = value;
        };
        CamraView.prototype.Change9 = function (value) {
            this.lbl_9.text = value.toString();
            Scene_data.fogData[0] = value;
        };
        CamraView.prototype.Change10 = function (value) {
            this.lbl_10.text = value.toString();
            Scene_data.fogData[1] = value / 1000;
        };
        CamraView.prototype.initCam = function () {
            this.bar_1.value = this._scene.gameScene.camRotationX;
            this.bar_2.value = this._scene.gameScene.camRotationY; //水平旋转
            this.bar_3.value = this._scene.gameScene.camDistance;
            this.bar_4.value = this._scene.gameScene.camPositionX; //px
            this.bar_5.value = this._scene.gameScene.camPositionY;
            this.bar_6.value = this._scene.gameScene.camPositionZ;
            this.bar_7.value = this._scene.gameScene.camViewLH * 100;
            this.bar_8.value = this._scene.gameScene.camFar;
            this.bar_9.value = Scene_data.fogData[0];
            this.bar_10.value = Scene_data.fogData[1] * 1000;
        };
        return CamraView;
    }(ui.component.CamraUI));
    common.CamraView = CamraView;
})(common || (common = {}));
