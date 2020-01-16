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
    var EnchantTip = /** @class */ (function (_super) {
        __extends(EnchantTip, _super);
        function EnchantTip() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Artifact_EnchantTip, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12525) };
            return _this;
        }
        EnchantTip.prototype.popup = function () {
            _super.prototype.popup.call(this);
            var starLV = App.hero.artifactStarLv;
            this.lab_explain.text = LanMgr.getLan("", 12526);
            this.lab_lv.text = LanMgr.getLan("", 12529, starLV);
            this.lab_tips.text = LanMgr.getLan("", 12527);
            var $obj = TableData.getInstance().getTableByName(TableData.tb_artifact_enchant);
            for (var $key in $obj.data) {
                var id = $obj.data[$key].ID;
                if (id < 2)
                    continue;
                var lab = id <= starLV ? this.lab_details : this.lab_details_no;
                lab.text += "" + id + LanMgr.getLan("", 12528) + "\uFF1A";
                var specialArr = $obj.data[$key].enchant_special;
                for (var j in specialArr) {
                    if (Number(j) > 0 && Number(j) < 2)
                        lab.text += ",";
                    lab.text += LanMgr.attrName[specialArr[j][0]] + "+";
                    lab.text += specialArr[j][0] > 4 ? Math.floor(specialArr[j][2] * 100) + "%" : "" + specialArr[j][2];
                    if (Number(j) > 0 && Number(j) < 2 && specialArr.length >= 3)
                        lab.text += "\n";
                }
                lab.text += "\n";
            }
            var str = this.lab_details.text;
            this.lab_details.text = str.substring(0, str.length - 1);
            this.lab_details_no.y = this.lab_details.y + this.lab_details.height;
        };
        EnchantTip.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.lab_details.text = "";
            this.lab_details_no.text = "";
        };
        return EnchantTip;
    }(ui.artifact.tip.EnchantTipUI));
    game.EnchantTip = EnchantTip;
})(game || (game = {}));
