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
    var PlayerOreView = /** @class */ (function (_super) {
        __extends(PlayerOreView, _super);
        function PlayerOreView() {
            return _super.call(this) || this;
        }
        PlayerOreView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.lbGain.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12210) };
        };
        PlayerOreView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        PlayerOreView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        PlayerOreView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            // this.linuepList.array = null;
            this.btnExplain.off(Laya.Event.CLICK, this, this.onExplain);
            this.btnOccupy.off(Laya.Event.CLICK, this, this.onOccupy);
            this.btnRob.off(Laya.Event.CLICK, this, this.onRob);
        };
        PlayerOreView.prototype.initView = function () {
            var info = this.dataSource;
            this.bgPanel.updateTitle(info.tbOre.name);
            this.headBox.dataSource = info.getHeadVo();
            this.lbName.text = info.svo.playerName;
            // this.lbForce.text = info.svo.force + "";
            this.lbGuild.text = LanMgr.getLan("", 12083) + (info.svo.guildName ? info.svo.guildName : LanMgr.getLan("", 12084));
            // this.linuepList.array = info.getExistGods();
            var award = info.getRobAward();
            this.lbGain.text = info.svo.robCount >= tb.TB_island_set.getSet().plunder_max_num ? 0 : award[1].toString();
            this.imgGain.skin = SkinUtil.getCostSkin(award[0]);
            this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            this.itemList.array = info.tbOre.getLossList();
            var occupyTime = info.getAllOccupyTime();
            this.pgRes.value = (info.tbOre.max_time - occupyTime) / info.tbOre.max_time;
            this.lbResPerc.text = Math.floor((info.tbOre.max_time - occupyTime) / info.tbOre.max_time * 100) + "%";
            this.btnExplain.on(Laya.Event.CLICK, this, this.onExplain);
            this.btnOccupy.on(Laya.Event.CLICK, this, this.onOccupy);
            this.btnRob.on(Laya.Event.CLICK, this, this.onRob);
            this.lineupUI.dataSource = { lineupGods: info.getLineupGods(), shenqiAry: info.getShenqiAry(), showShenli: true, force: info.svo.force, userLevel: info.svo.level, title: "" };
        };
        PlayerOreView.prototype.onExplain = function () {
            var info = this.dataSource;
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.OPEN_ORE_EXPLAIN, info.tbOre));
        };
        /** 占领 */
        PlayerOreView.prototype.onOccupy = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.OCCUPY_ORE, this.dataSource));
        };
        /** 掠夺 */
        PlayerOreView.prototype.onRob = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.ROB_ORE, this.dataSource));
        };
        return PlayerOreView;
    }(ui.island.PlayerOreUI));
    game.PlayerOreView = PlayerOreView;
})(game || (game = {}));
