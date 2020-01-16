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
    var TuijianView = /** @class */ (function (_super) {
        __extends(TuijianView, _super);
        function TuijianView() {
            var _this = _super.call(this) || this;
            _this.curTabIdx = -1;
            _this.curYeqianIdx = -1;
            _this.list_buttons.selectHandler = new Handler(_this, _this.onSelectTab);
            _this.list_buttons.renderHandler = new Handler(_this, _this.onRenderTab);
            _this.list_yeqian.selectHandler = new Handler(_this, _this.onSelectYeqian);
            _this.list_yeqian.renderHandler = new Handler(_this, _this.onRenderYeqian);
            _this.panel_info.vScrollBarSkin = "";
            return _this;
        }
        TuijianView.prototype.onShow = function () {
            this.btn_left.on(Laya.Event.CLICK, this, this.onChange, [true]);
            this.btn_right.on(Laya.Event.CLICK, this, this.onChange, [false]);
            this.list_buttons.dataSource = game.TujianModel.getInstance().tabNames;
            this.list_buttons.selectedIndex = 0;
            this.onSelectTab(0);
        };
        TuijianView.prototype.onExit = function () {
            this.btn_left.off(Laya.Event.CLICK, this, this.onChange);
            this.btn_right.off(Laya.Event.CLICK, this, this.onChange);
            this.list_yeqian.dataSource = null;
            this.lab_info.text = "";
            this.lab_location.text = "";
        };
        /**
         * 选择标签页
         * @param index
         */
        TuijianView.prototype.onSelectTab = function (index) {
            if (index == -1)
                return;
            this.lbName.text = game.TujianModel.getInstance().tabNames[index];
            this.curTabIdx = index;
            var dataAry = game.TujianModel.getInstance().yeqianData[index];
            this.list_yeqian.dataSource = dataAry;
            var len = dataAry.length;
            this.list_yeqian.repeatX = len;
            this.list_yeqian.width = len * 20 + (len - 1) * this.list_yeqian.spaceX;
            this.list_yeqian.selectedIndex = 0;
            this.onSelectYeqian(0);
        };
        /**
         * 选择页签
         * @param index
         */
        TuijianView.prototype.onSelectYeqian = function (index) {
            if (index == -1)
                return;
            this.curYeqianIdx = index;
            this.refreshTabData(index);
        };
        TuijianView.prototype.refreshTabData = function (index) {
            var squadtab = tb.TB_recommend_squad.get_TB_recommend_squadById((index + 1) + (this.curTabIdx + 1) * 10);
            var nexttab = tb.TB_recommend_squad.get_TB_recommend_squadById((index + 2) + (this.curTabIdx + 1) * 10);
            // this.btn_left.gray = this.btn_left.disabled = index==0?true:false;
            // this.btn_right.gray = this.btn_right.disabled = !nexttab?true:false;
            this.btn_left.visible = index == 0 ? false : true;
            this.btn_right.visible = !nexttab ? false : true;
            this.lab_info.text = squadtab.desc;
            this.lab_location.text = squadtab.location;
            for (var i = 0; i < 6; i++) {
                this["ui_Item" + i].dataSource = squadtab.god[i];
            }
            this.panel_info.refresh();
        };
        TuijianView.prototype.onRenderTab = function (itemRender, index) {
            itemRender.label = itemRender.dataSource;
            itemRender.skin = index == this.curTabIdx ? SkinUtil.fenye_down : SkinUtil.fenye_up;
            // itemRender.selected = index == this.curTabIdx;
            itemRender.labelSize = this.list_buttons.selectedIndex == index ? 24 : 22;
            itemRender.labelColors = this.list_buttons.selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
            itemRender.labelBold = true;
        };
        TuijianView.prototype.onRenderYeqian = function (itemRender, index) {
            itemRender.img_yellow.visible = index == this.curYeqianIdx;
        };
        /**
         * 点击左右按钮
         * @param left
         */
        TuijianView.prototype.onChange = function (left) {
            if (left) {
                this.list_yeqian.selectedIndex = this.curYeqianIdx - 1;
            }
            else {
                this.list_yeqian.selectedIndex = this.curYeqianIdx + 1;
            }
        };
        return TuijianView;
    }(ui.tujian.TuijianViewUI));
    game.TuijianView = TuijianView;
})(game || (game = {}));
