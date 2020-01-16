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
    var SelfOreView = /** @class */ (function (_super) {
        __extends(SelfOreView, _super);
        function SelfOreView() {
            return _super.call(this) || this;
        }
        SelfOreView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.lbGain.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12210) };
        };
        SelfOreView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        SelfOreView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        SelfOreView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this.btnExplain.off(Laya.Event.CLICK, this, this.onExplain);
        };
        SelfOreView.prototype.initView = function () {
            var info = this.dataSource;
            this.bgPanel.updateTitle(info.tbOre.name);
            var rewardNum = Number(info.getAward()[1]);
            if (rewardNum <= 0) {
                this.imgGain.visible = false;
                this.lbGain.text = LanMgr.getLan('', 10193, LanMgr.getLan("", 12209));
            }
            else {
                this.imgGain.visible = true;
                this.lbGain.text = LanMgr.getLan('', 10193, (rewardNum));
                this.imgGain.skin = SkinUtil.getCostSkin(info.getAward()[0]);
                this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            }
            var rewardList = info.getSpecialAward();
            if (rewardList && rewardList.length > 0) {
                this.itemList.array = rewardList;
                this.itemList.visible = true;
                this.lab_empty.visible = false;
            }
            else {
                this.itemList.visible = false;
                this.lab_empty.visible = true;
            }
            var occupyTime = info.getAllOccupyTime();
            this.pgRes.value = (info.tbOre.max_time - occupyTime) / info.tbOre.max_time;
            this.lbPercent.text = Math.floor((info.tbOre.max_time - occupyTime) / info.tbOre.max_time * 100) + "%";
            var minu = Math.ceil((info.tbOre.max_time - occupyTime) / 60);
            this.lbTime.text = LanMgr.getLan('', 10192, minu);
            this.btnExplain.on(Laya.Event.CLICK, this, this.onExplain);
        };
        SelfOreView.prototype.onExplain = function () {
            var info = this.dataSource;
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.OPEN_ORE_EXPLAIN, info.tbOre));
        };
        return SelfOreView;
    }(ui.island.SelfOreUI));
    game.SelfOreView = SelfOreView;
})(game || (game = {}));
