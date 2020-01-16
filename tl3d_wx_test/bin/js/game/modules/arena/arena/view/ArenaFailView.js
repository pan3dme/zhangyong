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
    var ArenaFailView = /** @class */ (function (_super) {
        __extends(ArenaFailView, _super);
        function ArenaFailView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.channel.callback = function () {
                _this.dataSource['flag'] = true;
                if (!UIMgr.hasStage(UIConst.Main3DView)) {
                    UIMgr.showUI(UIConst.Main3DView);
                }
                _this.close();
            };
            return _this;
        }
        ArenaFailView.prototype.popup = function () {
            this.initView();
            _super.prototype.popup.call(this, false, false);
        };
        ArenaFailView.prototype.initView = function () {
            AudioMgr.playSound("sound/defeated.mp3");
            var data = this.dataSource.eventdata;
            this.lbrank.text = "" + data.rank;
            this.rewardList.array = data.getRewards();
            this.lbdoem.text = "(" + data.chgRank;
            this.hbox.refresh();
            this.lbdoem.visible = this.imgchg.visible = this.lbright.visible = data.chgRank != 0;
            if (this.rewardList.array && this.rewardList.array.length > 0) {
                this.box_reward.visible = true;
                this.box_force.y = this.box_reward.y + 80;
            }
            else {
                this.box_reward.visible = false;
                this.box_force.y = this.box_reward.y;
            }
            this.channel.y = this.box_force.y + 43;
            this.height = this.bgPanel.height = this.channel.y + this.channel.height + 40;
            this.lab_empty.y = this.height + 60;
            this.bgPanel.showTitle(false, "zhandoubiaoxian/shibai.png", false, true, false, null, this);
        };
        ArenaFailView.prototype.close = function () {
            _super.prototype.close.call(this);
            dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
        };
        return ArenaFailView;
    }(ui.arena.arena.ArenaFailUI));
    game.ArenaFailView = ArenaFailView;
})(game || (game = {}));
