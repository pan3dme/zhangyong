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
    var TlTabIR = /** @class */ (function (_super) {
        __extends(TlTabIR, _super);
        function TlTabIR() {
            var _this = _super.call(this) || this;
            _this._isSelect = false;
            return _this;
        }
        Object.defineProperty(TlTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        TlTabIR.prototype.refreshData = function (item) {
            //item[0] 为表中的time_index字段
            if (item) {
                var link = item[1].link;
                if (item[0] != 99 && item[0] < game.TimelimitModel.ACTIVITY_JIJIN_ID) {
                    this.btn_tab.skin = SkinUtil.getTabBtnSkin("tabicon" + link);
                    this.redpoint.setRedPointName("timeActivity" + item[0]);
                }
                else {
                    this.btn_tab.skin = SkinUtil.getTabBtnSkin("tabicon" + item[0]);
                    if (item[0] >= game.TimelimitModel.ACTIVITY_JIJIN_ID) {
                        this.redpoint.setRedPointName("timeActivity" + item[0]);
                    }
                }
            }
            else {
                this.redpoint.onDispose();
            }
        };
        TlTabIR.prototype.setSelect = function (val) {
            if (this._isSelect == val)
                return;
            this._isSelect = val;
            this.selectBox.selected = val;
            // if (this._isSelect){
            // 	this.img_tab.skin = "comp/bg/naniu2.png";
            // 	this.lab_name.color = "#ffeecc";
            // 	this.lab_name.stroke = 4;
            // 	this.lab_name.strokeColor = "#4c260d";
            // }else{
            // 	this.img_tab.skin = "comp/bg/anniu.png";
            // 	this.lab_name.color = "#4c260d";
            // 	this.lab_name.stroke = 0;
            // }
        };
        return TlTabIR;
    }(ui.box.TabIR2UI));
    game.TlTabIR = TlTabIR;
})(game || (game = {}));
