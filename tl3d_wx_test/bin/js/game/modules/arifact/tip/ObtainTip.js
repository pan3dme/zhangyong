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
    var ObtainTip = /** @class */ (function (_super) {
        __extends(ObtainTip, _super);
        function ObtainTip() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this.initHtmlText();
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Artifact_ObtainTip, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12523) };
            return _this;
        }
        ObtainTip.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        ObtainTip.prototype.initView = function () {
            var model = game.ArtifactModel.getInstance();
            var attrTxt = "";
            var data = game.ArtifactModel.getArtObtain();
            var obtainNum = model.getUnlockArtifactNum();
            this.lbhas.text = LanMgr.getLan("", 12515, obtainNum);
            var tbs = tb.TB_artifact_obtain.get_TB_artifact_obtain();
            for (var key in tbs) {
                var color = ~~tbs[key].ID <= obtainNum ? ColorConst.TASK_GREEN : ColorConst.normalFont;
                attrTxt += "<span style='color:" + color + ";'>" + tbs[key].ID + LanMgr.getLan("", 12524) + "\uFF1A</span>";
                for (var v in tbs[key].attr) {
                    var attr = tbs[key].attr[v];
                    var name_1 = LanMgr.attrName[attr[0]];
                    var value = Number(attr[2]) >= 1 ? "+" + attr[2] : "+" + attr[2] * 100 + "%";
                    attrTxt += "<span style='color:" + color + ";'>" + (name_1 + value) + "</span>" + "<span></span>&nbsp;";
                    if (~~v == 2 && tbs[key].attr.length > 3)
                        attrTxt += "<br/>" + "<span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                }
                attrTxt += "<br/><br/><br/>";
            }
            this._htmlText.innerHTML = attrTxt;
        };
        ObtainTip.prototype.initHtmlText = function () {
            this._htmlText.style.fontSize = this.lab_details.fontSize;
            this._htmlText.style.leading = this.lab_details.leading;
            this._htmlText.style.color = ColorConst.GRAY;
            this._htmlText.style.width = this.width;
            this._htmlText.style.valign = "center";
            this._htmlText.y = this.lab_details.y + 10;
            this._htmlText.x = this.lab_details.x - 25;
            this._htmlText.style.wordWrap = true;
            this.addChild(this._htmlText);
        };
        ObtainTip.prototype.onClosed = function () {
        };
        return ObtainTip;
    }(ui.artifact.tip.ObtainTipUI));
    game.ObtainTip = ObtainTip;
})(game || (game = {}));
