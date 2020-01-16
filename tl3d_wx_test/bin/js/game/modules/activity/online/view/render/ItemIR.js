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
    var ItemIR = /** @class */ (function (_super) {
        __extends(ItemIR, _super);
        function ItemIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemIR.prototype, "dataSource", {
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
        ItemIR.prototype.refreshData = function (item) {
            if (item) {
                this.ui_item.gray = this.img_receivebg.visible = item.isReceive();
                this.ui_item.dataSource = new ItemVo(item.tab.reward[0], item.tab.reward[1]);
                if (game.OnlineModel.curId == item.id) {
                    this.lab_time.text = item.onTime();
                }
                else {
                    this.lab_time.text = this.ui_item.gray ? "" : item.canReceive() ? LanMgr.getLan("", 12242) : item.tab.time + LanMgr.getLan("", 10027);
                }
                this.lab_time.color = item.canReceive() ? "#ffe10a" : "#ffffff";
                this.anim_select.visible = (item.canReceive() && !item.isReceive());
                this.anim_select.play();
                this.img_guang.visible = item.onRedPoint();
                if (this.img_guang.visible) {
                    this.img_guang.frameLoop(5, this, this.onLoop);
                    this.on(Laya.Event.CLICK, this, this.onClick);
                    this.ui_item.mouseEnabled = false;
                }
                else {
                    this.img_guang.clearTimer(this, this.onLoop);
                    this.off(Laya.Event.CLICK, this, this.onClick);
                    this.ui_item.mouseEnabled = true;
                }
            }
            else {
                this.anim_select.gotoAndStop(0);
                this.ui_item.dataSource = null;
                this.img_guang.clearTimer(this, this.onLoop);
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        ItemIR.prototype.onLoop = function () {
            this.img_guang.rotation++;
        };
        ItemIR.prototype.onClick = function () {
            dispatchEvt(new game.OnlineEvent(game.OnlineEvent.SEND_RECEIVE_EVENT), { id: this.dataSource.id, tabid: this.dataSource.tab.ID });
        };
        return ItemIR;
    }(ui.activity.online.itemIRUI));
    game.ItemIR = ItemIR;
})(game || (game = {}));
