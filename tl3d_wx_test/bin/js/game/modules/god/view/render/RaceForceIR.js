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
    var RaceForceIR = /** @class */ (function (_super) {
        __extends(RaceForceIR, _super);
        function RaceForceIR() {
            var _this = _super.call(this) || this;
            _this._sortNum = 0;
            return _this;
        }
        Object.defineProperty(RaceForceIR.prototype, "dataSource", {
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
        RaceForceIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info && info.halos && info.halos.length > 0) {
                var halos = info.halos;
                var firstTemp = halos[0];
                var raceType = firstTemp.raceType;
                this._sortNum = raceType + 1000;
                this.lab_title.text = LanMgr.RACE_FORCE_STR[raceType];
                var existIdx_1 = -1;
                for (var i = halos.length - 1; i >= 0; i--) {
                    if (info.godNum >= halos[i].godNum) {
                        existIdx_1 = i;
                        break;
                    }
                }
                if (existIdx_1 != -1) {
                    this._sortNum = firstTemp.type;
                }
                var ary = halos.map(function (vo, index) {
                    return { isActive: existIdx_1 == index, tbData: vo };
                });
                this.list_kezhi.array = ary;
                this.list_kezhi.repeatY = ary.length;
                this.height = this.img_bg.height = this.list_kezhi.y + this.list_kezhi.height + 15;
                this.img_icon.skin = SkinUtil.getGodBigRaceSkin(raceType);
                this.img_icon.gray = existIdx_1 == -1;
                this.visible = true;
            }
            else {
                this.list_kezhi.array = null;
                this.visible = false;
                this._sortNum = 0;
            }
        };
        Object.defineProperty(RaceForceIR.prototype, "sortnum", {
            get: function () {
                return this._sortNum;
            },
            enumerable: true,
            configurable: true
        });
        return RaceForceIR;
    }(ui.god.render.KeZhiForceBoxUI));
    game.RaceForceIR = RaceForceIR;
})(game || (game = {}));
