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
    var TujianHeadIR = /** @class */ (function (_super) {
        __extends(TujianHeadIR, _super);
        function TujianHeadIR() {
            var _this = _super.call(this) || this;
            _this.headIcon.on(Laya.Event.CLICK, _this, _this.onHead);
            return _this;
        }
        Object.defineProperty(TujianHeadIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        TujianHeadIR.prototype.refreshData = function () {
            if (this._dataSource) {
                var godtab = tb.TB_god.get_TB_godById(this._dataSource[0]);
                var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(this._dataSource[1]);
                var realDegree = this._dataSource[1] <= 5 ? this._dataSource[1] : 6;
                var obj = { templateId: godtab.ID, starLevel: this._dataSource[1], level: evotab.level, skill: godtab.skill, degree: realDegree };
                var godData = new GodItemVo(obj);
                godData.levelStr = "";
                godData.level = 0;
                this.lab_name.text = godtab.name;
                this.headIcon.visible = true;
                this.headIcon.dataSource = godData;
                this.godInfoData = godData;
            }
            else {
                this.headIcon.visible = false;
                this.headIcon.dataSource = null;
            }
        };
        TujianHeadIR.prototype.onHead = function () {
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), this.godInfoData);
        };
        return TujianHeadIR;
    }(ui.tujian.render.TuijianIRUI));
    game.TujianHeadIR = TujianHeadIR;
    var YeqianIR = /** @class */ (function (_super) {
        __extends(YeqianIR, _super);
        function YeqianIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(YeqianIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        YeqianIR.prototype.refreshData = function () {
            if (!this._dataSource)
                return;
        };
        return YeqianIR;
    }(ui.tujian.render.YeqianIRUI));
    game.YeqianIR = YeqianIR;
})(game || (game = {}));
