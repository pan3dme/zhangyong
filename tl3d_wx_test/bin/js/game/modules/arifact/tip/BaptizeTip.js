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
    var BaptizeTip = /** @class */ (function (_super) {
        __extends(BaptizeTip, _super);
        function BaptizeTip() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Artifact_BaptizeTip, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12530) };
            return _this;
        }
        BaptizeTip.prototype.popup = function () {
            _super.prototype.popup.call(this);
            var baptizeLv = App.hero.artifactBaptizeLv;
            var baptizeExp = App.hero.artifactBaptizeExp;
            this.lab_Lv.text = LanMgr.getLan("", 12531, baptizeLv);
            this.lab_Exp.text = LanMgr.getLan("", 12532) + ("\uFF1A" + baptizeExp + "/" + tb.TB_artifact_baptize.get_TB_artifact_baptizeById(baptizeLv).exp);
        };
        BaptizeTip.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.lab_Lv.text = "";
            this.lab_Exp.text = "";
        };
        return BaptizeTip;
    }(ui.artifact.tip.BaptizeTipUI));
    game.BaptizeTip = BaptizeTip;
})(game || (game = {}));
