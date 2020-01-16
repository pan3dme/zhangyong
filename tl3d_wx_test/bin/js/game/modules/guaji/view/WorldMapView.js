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
    var WorldMapView = /** @class */ (function (_super) {
        __extends(WorldMapView, _super);
        function WorldMapView() {
            var _this = _super.call(this) || this;
            //通关的最高难度
            _this._maxLv = 1;
            _this.moveAni = false;
            _this._curCenter = [1000, 1000];
            _this.isModelClose = true;
            _this.box_chapter0.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter1.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter2.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter3.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter4.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter5.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter6.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter7.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter8.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.box_chapter9.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_lev0.on(Laya.Event.CLICK, _this, _this.onSelectLev);
            _this.btn_lev1.on(Laya.Event.CLICK, _this, _this.onSelectLev);
            _this.btn_lev2.on(Laya.Event.CLICK, _this, _this.onSelectLev);
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this.img_viewport.scrollRect = new laya.maths.Rectangle(0, 0, 600, 1006);
            _this._model = game.GuajiModel.getInstance();
            return _this;
        }
        /**
         * 鼠标按下拖动地图
         * @param e
         */
        WorldMapView.prototype.mouseDown = function (e) {
            if (this._model.isInMapGuide()) {
                return;
            }
            this.moveFlag = false;
            this.downX = this.mLastMouseX = this.bg.mouseX;
            this.downY = this.mLastMouseY = this.bg.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        /**
         * 拖动
         * @param e
         */
        WorldMapView.prototype.mouseMove = function (e) {
            var diffx = (this.bg.mouseX - this.mLastMouseX);
            this.bg.x += diffx;
            var viewport = this.img_viewport.scrollRect;
            var vw = viewport.width;
            // let vh = viewport.height;
            if (this.bg.x < (vw - this.bg.width)) {
                this.bg.x = vw - this.bg.width;
            }
            if (this.bg.x > 0) {
                this.bg.x = 0;
            }
            if (!this.moveFlag) {
                var moveX = Math.abs(this.downX - this.bg.mouseX);
                var moveY = Math.abs(this.downY - this.bg.mouseY);
                this.moveFlag = moveX > 3 || moveY > 3;
                this.stopAni(this.ani_move);
            }
        };
        WorldMapView.prototype.mouseUp = function () {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        /**
         * 移动到某个点
         * @param tx
         * @param ty
         */
        WorldMapView.prototype.moveMap = function (cb) {
            //移动完毕前，禁止任何点击操作。
            game.GuideMask.showWithTransparent();
            var viewport = this.img_viewport.scrollRect;
            var vw = viewport.width;
            var tx = this._curCenter[0];
            tx = -(tx - vw / 2);
            if (tx < (viewport.width - this.bg.width)) {
                tx = viewport.width - this.bg.width;
            }
            if (tx > 0) {
                tx = 0;
            }
            Laya.Tween.to(this.bg, { "x": tx }, 500, null, Handler.create(this, function () {
                if (cb) {
                    cb();
                }
                else {
                    game.GuideMask.hide();
                }
            }));
        };
        WorldMapView.prototype.setBtnGary = function () {
            this.btn_lev0.gray = Number(this.btn_lev0.name) > this._maxLv;
            this.btn_lev1.gray = Number(this.btn_lev1.name) > this._maxLv;
            this.btn_lev2.gray = Number(this.btn_lev2.name) > this._maxLv;
        };
        WorldMapView.prototype.onSelectLev = function ($e) {
            var btnlev = Number($e.target.name);
            if (btnlev > this._maxLv) {
                showToast(LanMgr.getLan('', 10085));
                return;
            }
            this._curlev = btnlev;
            this.refreshData();
            this.showtip();
        };
        WorldMapView.prototype.setLev = function () {
            // this.btn_lev0.mouseEnabled = this.btn_lev0.selected = this._curlev != 1;
            // this.btn_lev1.mouseEnabled = this.btn_lev1.selected = this._curlev != 2;
            // this.btn_lev2.mouseEnabled = this.btn_lev2.selected = this._curlev != 3;
            //10 118 225
            this.btn_select.x = this._curlev == 1 ? 10 : this._curlev == 2 ? 118 : 225;
        };
        WorldMapView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            if (isNaN(this.bg.x)) {
                this.bg.x = 0;
            }
            //监听
            this.bg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.bg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.bg.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            this.ani_suo.visible = false;
            this._zjlist = this._model.zhangjieList;
            this._curlev = this._model.currentZhangjie.tbCopy.sub_type;
            this.getMaxLvOpt();
            this.refreshData();
            this.setBtnGary();
            this.showtip();
        };
        WorldMapView.prototype.showtip = function () {
            var _this = this;
            //新难度提示
            var ntag = this._model.newOpen;
            this.aniArrow.visible = false;
            if (ntag != 0) {
                var zj = this.getZjVoById(ntag);
                if (zj.tbCopy.sub_type == this._curlev) {
                    //在当前难度
                    var idx = zj.tbCopy.chapter - 1;
                    var ui_1 = this["box" + idx];
                    this._curCenter = [ui_1.x, ui_1.y];
                    this.moveMap(function () {
                        _this.ani_suo.visible = true;
                        _this.ani_suo.x = ui_1.x;
                        _this.ani_suo.y = ui_1.y;
                        _this.ani_suo.play(0, false);
                        setTimeout(function () {
                            _this.ani_suo.visible = false;
                            if (!game.GuideWeakManager.isExcuting()) {
                                _this.aniArrow.visible = true;
                            }
                            _this.aniArrow.x = ui_1.x + _this.bg.x;
                            _this.aniArrow.y = ui_1.y;
                            _this.aniArrow.rotation = 180;
                            game.GuideMask.hide();
                        }, 1000);
                    });
                }
                else {
                    if (!game.GuideWeakManager.isExcuting()) {
                        this.aniArrow.visible = true;
                    }
                    var idx = zj.tbCopy.sub_type - 1;
                    var ui_2 = this["btn_lev" + idx];
                    this.aniArrow.x = ui_2.x;
                    this.aniArrow.y = ui_2.y;
                    this.aniArrow.rotation = 0;
                    this.moveMap();
                }
                this.aniArrow.play();
            }
            else {
                this.aniArrow.stop();
                //没有新解锁的章节
                this.moveMap();
                if (!this.ani_move.visible && !this.moveAni) {
                    this.moveAni = true;
                    this.ani_move.visible = true;
                    this.ani_move.play();
                }
            }
        };
        WorldMapView.prototype.getZjVoById = function (id) {
            for (var i = 0; i < this._zjlist.length; i++) {
                if (this._zjlist[i].id == id) {
                    return this._zjlist[i];
                }
            }
            return null;
        };
        WorldMapView.prototype.getMaxLvOpt = function () {
            for (var i = 0; i < this._zjlist.length;) {
                var element = this._zjlist[i];
                if (element.isOpen()) {
                    i = i + tb.TB_copy_set.getCopySet().max_chapter;
                    this._maxLv = element.tbCopy.sub_type;
                }
                else {
                    break;
                }
            }
        };
        WorldMapView.prototype.onClick = function ($e) {
            var _this = this;
            //战斗中无法切换地图
            if (this._model.isFight) {
                showToast(LanMgr.getLan("", 10391));
                return;
            }
            // if (this.moveFlag) return;
            var target = $e.target;
            var zjvo = target.dataSource;
            var ui = this["img_chapter" + (zjvo.tbCopy.chapter - 1)];
            AudioMgr.playSound();
            Laya.Tween.to(ui, { scaleX: 1.2, scaleY: 1.2 }, 120, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(ui, { scaleX: 1, scaleY: 1 }, 120, null, Laya.Handler.create(_this, function () {
                    if (ui.gray) {
                        showToast(ui.dataSource.info);
                        return;
                    }
                    if (App.hero.copyUnlockId < zjvo.id) {
                        var args = {};
                        args[Protocol.game_copy_copyUnlock.args.id] = zjvo.id;
                        PLC.request(Protocol.game_copy_copyUnlock, args, function ($data) {
                            if (!$data)
                                return;
                            App.hero.copyUnlockId = $data.copyUnlockId;
                            _this._model.newOpen = 0;
                            _this.onClickBtn(zjvo, true);
                        });
                    }
                    else {
                        _this.onClickBtn(zjvo);
                    }
                }));
            }));
        };
        WorldMapView.prototype.onClickBtn = function (zjvo, isUnlock) {
            if (isUnlock === void 0) { isUnlock = false; }
            if (isUnlock && this._model.currentZhangjie.id != zjvo.id) {
                this._model.currentZhangjie = zjvo;
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.UPDATE_ZHANGJIE_EVENT));
                UIMgr.showUI(UIConst.OpenChapterView, { type: game.OpenChapterView.TYPE_GUAJI, isnew: true, infovo: zjvo });
            }
            else {
                UIMgr.showUI(UIConst.GuanQiaNewView, zjvo);
            }
            this.close();
        };
        WorldMapView.prototype.stopAni = function (ani) {
            if (ani && ani.visible) {
                ani.gotoAndStop(0);
                ani.visible = false;
            }
        };
        WorldMapView.prototype.refreshData = function () {
            this.stopAni(this.ani_fight);
            this.setLev();
            for (var i = 0; i < this._zjlist.length; i++) {
                var zj = this._zjlist[i];
                var tb_1 = zj.tbCopy;
                if (tb_1.sub_type == this._curlev) {
                    var idx = tb_1.chapter - 1;
                    //绑定红点
                    var redpointId = tb_1.sub_type * 10 + tb_1.chapter;
                    var ui_3 = this["img_chapter" + idx];
                    ui_3.dataSource = tb_1;
                    var tag = i % 10;
                    this["box_chapter" + tag].dataSource = zj;
                    this["lab_chapter" + tag].text = tb_1.name;
                    var isopen = zj.isOpen();
                    this["img_chapter" + tag].gray = !isopen;
                    this["img_chapter" + tag].dataSource = { info: LanMgr.getLan("", 11003) };
                    this["lab_open" + tag].visible = false;
                    if (!isopen && zj.isNew()) {
                        var lev = zj.getOpenLev();
                        if (lev != 0 && lev > App.hero.level) {
                            this["lab_open" + tag].visible = true;
                            this["lab_open" + tag].text = lev + "\u7EA7\u5F00\u542F";
                            this["img_chapter" + tag].dataSource = { info: lev + "\u7EA7\u5F00\u542F" };
                        }
                    }
                    if (zj.id == this._model.currentZhangjie.id) {
                        this.ani_fight.visible = true;
                        this.ani_fight.x = this["box" + tag].x;
                        this.ani_fight.y = this["box" + tag].y;
                        this.ani_fight.play(0, true);
                        this._curCenter = [this.ani_fight.x, this.ani_fight.y];
                    }
                }
            }
        };
        WorldMapView.prototype.close = function () {
            _super.prototype.close.call(this, "", false);
            //移除监听
            this.bg.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.bg.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.bg.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            Laya.Tween.clearAll(this.bg);
            //关闭界面时，一定要关闭掉遮罩。
            game.GuideMask.hide();
            this.stopAni(this.ani_move);
        };
        return WorldMapView;
    }(ui.guaji.WorldMapUI));
    game.WorldMapView = WorldMapView;
})(game || (game = {}));
