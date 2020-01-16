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
    var GuanQiaNewView = /** @class */ (function (_super) {
        __extends(GuanQiaNewView, _super);
        function GuanQiaNewView() {
            var _this = _super.call(this) || this;
            //设置关卡地图位置
            _this._leftRange = 0;
            _this._rightRange = 0;
            _this.isModelClose = true;
            _this.img_viewport.scrollRect = new laya.maths.Rectangle(0, 0, 600, 1006);
            var range = _this.img_viewport.scrollRect.width - _this.img_guanqia.width;
            if (range > 0) {
                _this._leftRange = -321;
                _this._rightRange = _this._leftRange + range;
            }
            else {
                _this._rightRange = -321;
                _this._leftRange = _this._rightRange + range;
            }
            _this._uiGuanQiaList = [];
            for (var i = 0; i < 10; i++) {
                _this._uiGuanQiaList[i] = _this["ui_level_" + i];
            }
            return _this;
        }
        GuanQiaNewView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            //监听
            this.img_bg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.img_bg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.img_bg.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            for (var i = 0; i < this._uiGuanQiaList.length; i++) {
                this._uiGuanQiaList[i].on(Laya.Event.CLICK, this, this.onClickGuanQia, [i]);
            }
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.img_worldmap.on(Laya.Event.CLICK, this, this.onClickWorldMap);
            tl3d.ModuleEventManager.addEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.onGuanQiaChange, this);
            // Pan3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT, this.onZhangJieChange, this);
            this.onZhangJieChange();
            this.onGuanQiaChange();
        };
        //更新章节
        GuanQiaNewView.prototype.onZhangJieChange = function () {
            this._curZhangJieVo = this.dataSource;
            this._curGuanQiaPos = GuanQiaNewView.GUANQIA_POS_INFO[this._curZhangJieVo.tbCopy.chapter - 1];
            this._allGuanQiaVo = [];
            for (var key in this._curZhangJieVo.guankaMap) {
                var obj = this._curZhangJieVo.guankaMap[key];
                this._allGuanQiaVo[obj.index - 1] = obj;
            }
            this.updateZhangJie();
        };
        //更新关卡
        GuanQiaNewView.prototype.onGuanQiaChange = function () {
            this._curGuanQiaVo = this._curZhangJieVo.getCurGuanqia();
            this.updateGuanQia();
            var curIndex = this._curGuanQiaVo.index - 1;
            var curGuanQiaPosx = this._curGuanQiaPos[curIndex * 2];
            this.scrollMap(-51 - curGuanQiaPosx);
        };
        //更新章节
        GuanQiaNewView.prototype.updateZhangJie = function () {
            if (!this._curZhangJieVo)
                return;
            this.img_guanqia.skin = LanMgr.getLan("guaji/sjdt/{0}.jpg", -1, this._curZhangJieVo.tbCopy.chapter);
            var sub_type = this._curZhangJieVo.tbCopy.sub_type;
            var stateStr = sub_type == 1 ? "普通" : sub_type == 2 ? "困难" : "地狱";
            this.lab_title.text = LanMgr.getLan("{0}({1})", -1, this._curZhangJieVo.tbCopy.name, stateStr);
            this.img_title.width = this.lab_title.width + 70;
            for (var i = 0; i < this._uiGuanQiaList.length; i++) {
                var ui_1 = this._uiGuanQiaList[i];
                if (i < this._allGuanQiaVo.length) {
                    ui_1.visible = true;
                    ui_1.dataSource = this._allGuanQiaVo[i];
                    ui_1.x = this._curGuanQiaPos[i * 2];
                    ui_1.y = this._curGuanQiaPos[i * 2 + 1];
                }
                else {
                    ui_1.visible = false;
                    ui_1.dataSource = null;
                }
            }
        };
        //更新关卡
        GuanQiaNewView.prototype.updateGuanQia = function () {
            var hasAni = false;
            for (var i = 0; i < this._allGuanQiaVo.length; i++) {
                var ui_2 = this._uiGuanQiaList[i];
                if (ui_2) {
                    var vo = this._allGuanQiaVo[i];
                    vo.updateState();
                    if (vo.isPass || vo.isNext()) {
                        ui_2.setSelect(true);
                    }
                    else {
                        ui_2.setSelect(false);
                    }
                    if (!this._curGuanQiaVo.isPass && vo.index == this._curGuanQiaVo.index) {
                        hasAni = true;
                        this.ani_select.x = ui_2.x + 28;
                        this.ani_select.y = ui_2.y - 20;
                    }
                }
            }
            if (hasAni) {
                this.ani_select.visible = true;
                this.ani_select.play();
            }
            else {
                this.ani_select.visible = false;
                this.ani_select.stop();
            }
        };
        GuanQiaNewView.prototype.scrollMap = function (posx) {
            if (posx < this._leftRange)
                posx = this._leftRange;
            if (posx > this._rightRange)
                posx = this._rightRange;
            if (this.img_bg.x == posx)
                return;
            this.img_bg.x = posx;
        };
        GuanQiaNewView.prototype.onClickGuanQia = function (index) {
            if (this._allGuanQiaVo && this._allGuanQiaVo[index]) {
                UIMgr.showUI(UIConst.GuanQiaInfoView, this._allGuanQiaVo[index]);
            }
        };
        GuanQiaNewView.prototype.onClickWorldMap = function () {
            UIMgr.showUI(UIConst.WordMap);
            this.close();
        };
        /**
         * 鼠标按下拖动地图
         * @param e
         */
        GuanQiaNewView.prototype.mouseDown = function (e) {
            this.downX = this.mLastMouseX = this.img_bg.mouseX;
            this.downY = this.mLastMouseY = this.img_bg.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        /**
         * 拖动
         * @param e
         */
        GuanQiaNewView.prototype.mouseMove = function (e) {
            var diffx = (this.img_bg.mouseX - this.mLastMouseX);
            this.scrollMap(this.img_bg.x + diffx);
        };
        GuanQiaNewView.prototype.mouseUp = function () {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        GuanQiaNewView.prototype.close = function () {
            _super.prototype.close.call(this, "", false);
            this.img_bg.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.img_bg.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.img_bg.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            for (var i = 0; i < this._uiGuanQiaList.length; i++) {
                this._uiGuanQiaList[i].off(Laya.Event.CLICK, this, this.onClickGuanQia);
            }
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            this.img_worldmap.off(Laya.Event.CLICK, this, this.onClickWorldMap);
            tl3d.ModuleEventManager.removeEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.onGuanQiaChange, this);
            // Pan3d.ModuleEventManager.removeEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT, this.onZhangJieChange, this);
            this._curZhangJieVo = null;
            this._curGuanQiaVo = null;
            this._curGuanQiaPos = null;
            this._allGuanQiaVo = null;
        };
        /** 关卡位置信息 */
        GuanQiaNewView.GUANQIA_POS_INFO = [
            [209, 158, 152, 258, 83, 376, 292, 373, 519, 374, 696, 459, 740, 362, 638, 167, 808, 207, 824, 96],
            [178, 155, 213, 332, 189, 425, 423, 409, 648, 512, 766, 432, 649, 341, 417, 255, 681, 193, 534, 122],
            [612, 172, 415, 90, 254, 162, 118, 259, 239, 290, 454, 236, 419, 367, 253, 412, 545, 425, 750, 377],
            [168, 147, 269, 226, 189, 332, 314, 414, 400, 364, 554, 459, 715, 393, 682, 280, 506, 239, 456, 116],
            [135, 93, 169, 187, 248, 358, 427, 300, 596, 325, 756, 458, 714, 223, 580, 189, 372, 214, 495, 138],
            [198, 310, 337, 343, 308, 460, 446, 494, 461, 400, 578, 373, 738, 379, 608, 271, 482, 294, 442, 208],
            [229, 319, 270, 423, 470, 401, 617, 442, 833, 411, 781, 273, 686, 127, 547, 151, 432, 196, 314, 119],
            [252, 444, 705, 488, 828, 298, 694, 113, 503, 123, 224, 85, 127, 173, 272, 311, 604, 251, 420, 338],
            [105, 220, 168, 326, 386, 462, 648, 487, 566, 387, 728, 348, 672, 259, 519, 213, 285, 241, 492, 111],
            [548, 483, 434, 417, 266, 382, 397, 332, 596, 366, 704, 271, 556, 196, 358, 225, 233, 194, 439, 70],
        ];
        return GuanQiaNewView;
    }(ui.guaji.GuanQiaNewUI));
    game.GuanQiaNewView = GuanQiaNewView;
})(game || (game = {}));
