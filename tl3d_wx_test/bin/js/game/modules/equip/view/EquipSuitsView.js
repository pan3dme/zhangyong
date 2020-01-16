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
    var EquipSuitsView = /** @class */ (function (_super) {
        __extends(EquipSuitsView, _super);
        function EquipSuitsView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnButton: true, closeOnSide: _this.isModelClose, title: "" };
            _this.itemList.renderHandler = new Handler(_this, _this.itemRender);
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        EquipSuitsView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        EquipSuitsView.prototype.initView = function () {
            var ary = this.dataSource;
            var quality = ary[0];
            var num = ary[1];
            var model = game.EquipModel.getInstance();
            var title = LanMgr.qualityColor[quality] + LanMgr.getLan("", 12597);
            this.lbName.text = title + "\uFF08" + num + "/4\uFF09\uFF1A";
            this.bgPanel.updateTitle(title);
            var list = tb.TB_equip_suit.getSuitByQuality(quality);
            list = list.map(function (tbSuit) {
                var title = LanMgr.getLan("", 12598, LanMgr.numChinese[tbSuit.ID % 10]) + "：";
                var ary = tbSuit.suit_percent;
                var val = ary[1] == 0 ? ary[2] : ary[2] * 100 + "%";
                var ct = iface.tb_prop.attrType[ary[0]] + "+" + val;
                return { content: title + ct, enough: num >= tbSuit.ID % 10 };
            });
            this.itemList.array = list;
        };
        EquipSuitsView.prototype.itemRender = function (lable, index) {
            var data = lable.dataSource;
            lable.text = data["content"];
            lable.color = data["enough"] ? "#319c28" : "#45290a";
        };
        EquipSuitsView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.itemList.array = null;
        };
        return EquipSuitsView;
    }(ui.equip.EquipSuitUI));
    game.EquipSuitsView = EquipSuitsView;
})(game || (game = {}));
