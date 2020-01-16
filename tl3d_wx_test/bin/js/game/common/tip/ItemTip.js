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
var common;
(function (common) {
    var ItemTip = /** @class */ (function (_super) {
        __extends(ItemTip, _super);
        function ItemTip() {
            var _this = _super.call(this) || this;
            _this.prevX = 0;
            _this.prevY = 0;
            _this.isModelClose = true;
            _this.lab_desc.on(Laya.Event.MOUSE_DOWN, _this, _this.startScrollText);
            return _this;
        }
        ItemTip.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        ItemTip.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        ItemTip.prototype.init = function () {
            var $data = this.dataSource;
            var vo = new ItemVo($data.ID || $data.id, $data.getNum());
            vo.show = false;
            this.ui_Itembox.dataSource = vo;
            var item = tb.TB_item.get_TB_itemById($data.ID || $data.id);
            this.lab_name.text = item.name;
            // this.lab_num.text = $data.getNum().toString() != 0 ? Snums($data.getNum()) : LanMgr.getLan("未知",-1);
            this.lab_num.text = Snums(App.hero.getBagItemNum(vo.id.toString())) + "";
            this.lab_desc.text = item.desc;
            this.lab_way.text = item.way;
        };
        /* 开始滚动文本 */
        ItemTip.prototype.startScrollText = function (e) {
            this.prevX = this.lab_desc.mouseX;
            this.prevY = this.lab_desc.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        };
        /* 停止滚动文本 */
        ItemTip.prototype.finishScrollText = function (e) {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        };
        /* 鼠标滚动文本 */
        ItemTip.prototype.scrollText = function (e) {
            var nowX = this.lab_desc.mouseX;
            var nowY = this.lab_desc.mouseY;
            this.lab_desc.textField.scrollX += this.prevX - nowX;
            this.lab_desc.textField.scrollY += this.prevY - nowY;
            this.prevX = nowX;
            this.prevY = nowY;
        };
        ItemTip.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        return ItemTip;
    }(ui.component.ItemTipUI));
    common.ItemTip = ItemTip;
})(common || (common = {}));
