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
    var fuseView = /** @class */ (function (_super) {
        __extends(fuseView, _super);
        function fuseView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list_info.renderHandler = new Handler(_this, _this.onRender);
            return _this;
        }
        fuseView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.bgPanel.dataSource = { uiName: UIConst.God_fuseView, closeOnSide: this.isModelClose };
            this.lab_nowlv.text = this.dataSource.fuseLevel + LanMgr.getLan("", 10031);
            this.list_info.dataSource = tb.TB_fusion_soul.get_TB_fusion_soul().slice(1, 5);
        };
        /**
         * 渲染属性
         * @param itemRender
         * @param index
         */
        fuseView.prototype.onRender = function (itemRender, index) {
            var godVo = this.dataSource;
            var itemData = itemRender.dataSource;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(itemData.ID - 1);
            var lv = itemRender.getChildByName("lab_lv");
            var add = itemRender.getChildByName("lab_add");
            var tiaojian = itemRender.getChildByName("lab_tiaojian");
            var shangxian = itemRender.getChildByName("lab_shangxian");
            lv.text = LanMgr.getLan("", 12179) + itemData.ID;
            add.text = LanMgr.getLan("", 12348) + itemData.special_attr[0][1];
            tiaojian.text = LanMgr.getLan("", 12349, fusiontab.break_limit);
            shangxian.text = LanMgr.getLan("", 12350) + "\uFF1A" + LanMgr.getLan("", 12351) + "\uFF1A" + itemData.attr_max[0][1] + " " + LanMgr.getLan("", 12352) + "\uFF1A" + itemData.attr_max[1][1] + " " + LanMgr.getLan("", 12353) + "\uFF1A" + itemData.attr_max[2][1];
            tiaojian.visible = itemData.break_limit == 0 ? false : true;
            add.color = shangxian.color = lv.color = godVo.fuseLevel >= itemData.ID ? "#13b222" : ColorConst.normalFont;
            tiaojian.color = godVo.starLevel >= fusiontab.break_limit ? "#13b222" : ColorConst.normalFont;
        };
        fuseView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
        };
        return fuseView;
    }(ui.god.RonghunLvInfoUI));
    game.fuseView = fuseView;
})(game || (game = {}));
