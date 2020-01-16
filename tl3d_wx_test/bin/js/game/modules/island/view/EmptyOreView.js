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
    var EmptyOreView = /** @class */ (function (_super) {
        __extends(EmptyOreView, _super);
        function EmptyOreView() {
            return _super.call(this) || this;
        }
        EmptyOreView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.lbGain.autoSize = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12210) };
            this.btnNext.on(Laya.Event.CLICK, this, this.onScroll, [true]);
            this.btnPrev.on(Laya.Event.CLICK, this, this.onScroll, [false]);
        };
        EmptyOreView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        EmptyOreView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        EmptyOreView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this.btnOccupy.off(Laya.Event.CLICK, this, this.onOccupy);
        };
        EmptyOreView.prototype.initView = function () {
            var info = this.dataSource;
            this.bgPanel.updateTitle(info.tbOre.name);
            this.lbGain.text = LanMgr.getLan('', 10191, info.tbOre.reward[1]);
            this.lbMinu.text = "/" + Math.floor(info.tbOre.interval / 60) + LanMgr.getLan("", 12090);
            this.lbGain.x = this.width / 2 - (this.lbGain.width + 145) / 2;
            this.imgGain.skin = SkinUtil.getCostSkin(info.tbOre.reward[0]);
            this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            this.lbMinu.x = this.imgGain.x + this.imgGain.width + 5;
            this.itemList.array = info.tbOre.getRateList();
            var occupyTime = info.getAllOccupyTime();
            this.pgRes.value = (info.tbOre.max_time - occupyTime) / info.tbOre.max_time;
            this.lbPercent.text = Math.floor((info.tbOre.max_time - occupyTime) / info.tbOre.max_time * 100) + "%";
            this.btnOccupy.on(Laya.Event.CLICK, this, this.onOccupy);
        };
        EmptyOreView.prototype.onOccupy = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.OCCUPY_ORE, this.dataSource));
        };
        EmptyOreView.prototype.onScroll = function (next) {
            if (next) {
                this.itemList.scrollBar.value += 300;
            }
            else {
                this.itemList.scrollBar.value -= 300;
            }
        };
        return EmptyOreView;
    }(ui.island.EmptyOreUI));
    game.EmptyOreView = EmptyOreView;
})(game || (game = {}));
