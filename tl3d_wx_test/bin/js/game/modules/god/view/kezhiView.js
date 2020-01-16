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
    var kezhiView = /** @class */ (function (_super) {
        __extends(kezhiView, _super);
        function kezhiView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.God_kezhiView, closeOnSide: _this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12339) };
            _this.panel_attr.vScrollBarSkin = '';
            return _this;
        }
        kezhiView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            // 原因：布阵界面之上
            this.zOrder = UI_DEPATH_VALUE.TOP + 3;
            this.initView();
        };
        kezhiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._allHalo = null;
            this.clearRaceForceIR();
        };
        kezhiView.prototype.initView = function () {
            var raceObj = this.dataSource || {};
            this._allHalo = tb.TB_halo.getAllType();
            this.clearRaceForceIR();
            if (this._allHalo && this._allHalo.length > 0) {
                this._allRaceAttr = [];
                for (var i = 0; i < this._allHalo.length; i++) {
                    var halos = this._allHalo[i];
                    if (halos && halos.length > 0) {
                        var ui_1 = new game.RaceForceIR();
                        ui_1.dataSource = { godNum: (raceObj[i] || 0), halos: halos };
                        this.panel_attr.addChild(ui_1);
                        this._allRaceAttr.push(ui_1);
                    }
                }
                this.layoutAttr();
            }
            this.panel_attr.scrollTo(0, 0);
        };
        kezhiView.prototype.layoutAttr = function () {
            if (this._allRaceAttr) {
                this._allRaceAttr.sort(function (a, b) {
                    return a.sortnum - b.sortnum;
                });
                var posy = 0;
                var spacey = 10;
                for (var i = 0; i < this._allRaceAttr.length; i++) {
                    var ui_2 = this._allRaceAttr[i];
                    ui_2.x = 10;
                    ui_2.y = posy;
                    posy += ui_2.height + spacey;
                }
            }
        };
        kezhiView.prototype.clearRaceForceIR = function () {
            if (this._allRaceAttr) {
                for (var i = 0; i < this._allRaceAttr.length; i++) {
                    this._allRaceAttr[i].dataSource = null;
                    this._allRaceAttr[i].destroy();
                    this._allRaceAttr[i] = null;
                }
                this._allRaceAttr = null;
            }
        };
        return kezhiView;
    }(ui.god.ZhenYingKeZhiUI));
    game.kezhiView = kezhiView;
})(game || (game = {}));
