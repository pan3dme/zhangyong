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
    var bowieState;
    (function (bowieState) {
        bowieState[bowieState["CLOSE"] = 0] = "CLOSE";
        bowieState[bowieState["OPEN"] = 1] = "OPEN";
    })(bowieState = game.bowieState || (game.bowieState = {}));
    var bowieIR = /** @class */ (function (_super) {
        __extends(bowieIR, _super);
        function bowieIR() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            return _this;
        }
        Object.defineProperty(bowieIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        bowieIR.prototype.initView = function () {
            Laya.Tween.clearAll(this);
            Laya.Tween.clearAll(this.img_barrel);
            if (this.dataSource) {
                this.ui_prop.dataSource = new ItemVo(this.dataSource.prop[0], this.dataSource.prop[1]);
                //初始化位置
                this.img_barrel.y = 0;
                this.img_barrel.alpha = 1;
                this.curState = bowieState.CLOSE;
            }
            else {
            }
        };
        bowieIR.prototype.openAndcloseEff = function (cb) {
            var _this = this;
            this.openEff(function () {
                setTimeout(function () {
                    _this.closeEff(function () {
                        if (cb) {
                            cb();
                        }
                    });
                }, 1000);
            });
        };
        bowieIR.prototype.openEff = function (cb) {
            var _this = this;
            if (this.dataSource) {
                Laya.Tween.to(this.img_barrel, { y: -93, alpha: 0.7 }, 600, null, Handler.create(this, function () {
                    _this.curState = bowieState.OPEN;
                    // logyhj("打开完回调");
                    if (cb) {
                        cb();
                    }
                }));
            }
        };
        bowieIR.prototype.closeEff = function (cb) {
            var _this = this;
            if (this.dataSource) {
                Laya.Tween.to(this.img_barrel, { y: 0, alpha: 1 }, 600, null, Handler.create(this, function () {
                    _this.curState = bowieState.CLOSE;
                    // logyhj("关闭完回调");
                    if (cb) {
                        cb();
                    }
                }));
            }
        };
        return bowieIR;
    }(ui.dafuweng.yanliBoxIRUI));
    game.bowieIR = bowieIR;
})(game || (game = {}));
