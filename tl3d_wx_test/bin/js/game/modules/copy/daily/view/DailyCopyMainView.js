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
    var DailyCopyMainView = /** @class */ (function (_super) {
        __extends(DailyCopyMainView, _super);
        function DailyCopyMainView() {
            var _this = _super.call(this) || this;
            _this._overPlusTypeKey = [iface.tb_prop.overplusTypeKey.dailyCopyNum1, iface.tb_prop.overplusTypeKey.dailyCopyNum2, iface.tb_prop.overplusTypeKey.dailyCopyNum3];
            _this.group = UIConst.hud_group;
            return _this;
        }
        DailyCopyMainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.boxCopy0.on(Laya.Event.CLICK, this, this.onClickBox, [0]);
            this.boxCopy1.on(Laya.Event.CLICK, this, this.onClickBox, [1]);
            this.boxCopy2.on(Laya.Event.CLICK, this, this.onClickBox, [2]);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.DAILY_COPY);
            this.uiScene = new Base2dSceneLayerExt();
            this.imgBg.addChild(this.uiScene);
            this.itemPanel.hScrollBarSkin = "";
            if (this.itemPanel.hScrollBar) {
                this.itemPanel.hScrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange);
            }
        };
        DailyCopyMainView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.itemPanel.width = w;
            this.itemPanel.height = h;
            this.lbDesc.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 140) : 140;
        };
        DailyCopyMainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        DailyCopyMainView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        DailyCopyMainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            for (var i = 0; i < DailyCopyMainView.BOX_NUM; i++) {
                var uiRed = this["ui_red_" + i];
                if (uiRed)
                    uiRed.onDispose();
            }
            this.ani1.stop();
            UIMgr.hideUIByName(UIConst.SysTopView);
            this.itemPanel.hScrollBar.value = 0;
            this.uiScene.onExit();
        };
        DailyCopyMainView.prototype.initView = function () {
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: null, closeCallback: this.onFanHui.bind(this) });
            for (var i = 0; i < DailyCopyMainView.BOX_NUM; i++) {
                var uiRed = this["ui_red_" + i];
                if (uiRed)
                    uiRed.setRedPointName("dailyCoyp_tab" + this._overPlusTypeKey[i]);
            }
            this.itemPanel.hScrollBar.value = 0;
            Laya.timer.frameOnce(2, this, this.delayScroll);
            this.ani1.play(0, true);
            this.uiScene.onShow();
        };
        DailyCopyMainView.prototype.delayScroll = function () {
            var _this = this;
            this.addGuangEff();
            Laya.timer.frameOnce(1, this, function () {
                _this.itemPanel.scrollTo(180);
            });
        };
        DailyCopyMainView.prototype.onClickBox = function (index) {
            var type = iface.tb_prop.dailyCopyTypeKey.gold;
            if (index == 1) {
                type = iface.tb_prop.dailyCopyTypeKey.exp;
            }
            else if (index == 2) {
                type = iface.tb_prop.dailyCopyTypeKey.chip;
            }
            UIMgr.showUI(UIConst.Copy_DailyView, type);
        };
        DailyCopyMainView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_LILIAN));
        };
        DailyCopyMainView.prototype.addGuangEff = function () {
            var _this = this;
            var targetPos = this.img_box_0.localToGlobal(new Laya.Point(0, 0));
            var pos = this.uiScene.get3dPos(targetPos.x + 150 - Launch.offsetX, targetPos.y + 120 - Launch.offsetY);
            this.uiScene.addEffect(this, 1000008, pos, 3, 30, function ($particle) {
                if (_this._coinEff1) {
                    _this.uiScene.removeEffect(_this._coinEff1);
                }
                _this._coinEff1 = $particle;
            });
            targetPos = this.img_box_1.localToGlobal(new Laya.Point(0, 0));
            pos = this.uiScene.get3dPos(targetPos.x + 150 - Launch.offsetX, targetPos.y + 120 - Launch.offsetY);
            this.uiScene.addEffect(this, 1000008, pos, 3, 30, function ($particle) {
                if (_this._coinEff2) {
                    _this.uiScene.removeEffect(_this._coinEff2);
                }
                _this._coinEff2 = $particle;
            });
            targetPos = this.img_box_2.localToGlobal(new Laya.Point(0, 0));
            pos = this.uiScene.get3dPos(targetPos.x + 150 - Launch.offsetX, targetPos.y + 120 - Launch.offsetY);
            this.uiScene.addEffect(this, 1000008, pos, 3, 30, function ($particle) {
                if (_this._coinEff3) {
                    _this.uiScene.removeEffect(_this._coinEff3);
                }
                _this._coinEff3 = $particle;
            });
        };
        DailyCopyMainView.prototype.onScrollChange = function () {
            if (this.itemPanel.hScrollBar) {
                this.uiScene.x = -this.itemPanel.hScrollBar.value;
            }
        };
        DailyCopyMainView.BOX_NUM = 3; //三个箱子（精炼，宝石，碎片）
        return DailyCopyMainView;
    }(ui.dailycopy.DailyCopyMainUI));
    game.DailyCopyMainView = DailyCopyMainView;
})(game || (game = {}));
