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
    var TreasueTujianIR = /** @class */ (function (_super) {
        __extends(TreasueTujianIR, _super);
        function TreasueTujianIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TreasueTujianIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        TreasueTujianIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.itemBox.dataSource = info;
                this.imgMask.visible = App.hero.treasureBooks.indexOf(info.templateId) == -1;
            }
            else {
                this.itemBox.dataSource = null;
            }
        };
        return TreasueTujianIR;
    }(ui.god.treasure.render.TujianIRUI));
    game.TreasueTujianIR = TreasueTujianIR;
})(game || (game = {}));
