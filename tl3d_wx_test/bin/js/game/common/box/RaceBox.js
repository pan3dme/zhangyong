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
var common;
(function (common) {
    var RaceBox = /** @class */ (function (_super) {
        __extends(RaceBox, _super);
        function RaceBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RaceBox.prototype, "dataSource", {
            set: function (data) {
                this._dataSource = data;
                if (data != null) {
                    this.img_race.skin = SkinUtil.getGodBigRaceSkin(data);
                }
            },
            enumerable: true,
            configurable: true
        });
        return RaceBox;
    }(ui.box.RaceBoxUI));
    common.RaceBox = RaceBox;
})(common || (common = {}));
