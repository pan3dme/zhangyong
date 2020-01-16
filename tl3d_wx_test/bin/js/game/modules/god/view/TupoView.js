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
    var TupoView = /** @class */ (function (_super) {
        __extends(TupoView, _super);
        function TupoView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list_attr.renderHandler = new Handler(_this, _this.onRender);
            return _this;
        }
        TupoView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.bgPanel.dataSource = { uiName: UIConst.God_TupoView, closeOnSide: this.isModelClose, title: "comp/title/tupochengg.png" };
            var godVo = this.dataSource;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel - 1);
            var nexttab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            var dataAry = new Array();
            dataAry.push(fusiontab);
            dataAry.push(nexttab);
            this.list_attr.dataSource = dataAry;
        };
        /**
         * 渲染属性
         * @param itemRender
         * @param index
         */
        TupoView.prototype.onRender = function (itemRender, index) {
            var lv = itemRender.getChildByName("lab_lv");
            var add = itemRender.getChildByName("lab_add");
            var tili = itemRender.getChildByName("lab_tili");
            var gongji = itemRender.getChildByName("lab_gongji");
            var fangyu = itemRender.getChildByName("lab_fangyu");
            lv.text = LanMgr.getLan("", 12179) + ("\uFF1A" + itemRender.dataSource.ID) + LanMgr.getLan("", 10031);
            add.text = "\u901F\u5EA6\uFF1A+" + itemRender.dataSource.special_attr[0][1];
            tili.text = LanMgr.getLan("", 12335) + ("\uFF1A" + itemRender.dataSource.attr_max[0][1]);
            gongji.text = LanMgr.getLan("", 12336) + ("\uFF1A" + itemRender.dataSource.attr_max[1][1]);
            fangyu.text = LanMgr.getLan("", 12337) + ("\uFF1A" + itemRender.dataSource.attr_max[2][1]);
            add.color = gongji.color = fangyu.color = tili.color = lv.color = this.dataSource.fuseLevel == itemRender.dataSource.ID ? "#13b222" : ColorConst.normalFont;
        };
        TupoView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
        };
        return TupoView;
    }(ui.god.TupoUI));
    game.TupoView = TupoView;
})(game || (game = {}));
