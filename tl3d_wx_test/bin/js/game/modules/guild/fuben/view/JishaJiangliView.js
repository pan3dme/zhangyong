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
    var JishaJiangliView = /** @class */ (function (_super) {
        __extends(JishaJiangliView, _super);
        function JishaJiangliView() {
            var _this = _super.call(this) || this;
            _this.rewardList.array = null;
            _this.rankList.array = null;
            return _this;
        }
        JishaJiangliView.prototype.onEnter = function (guanqia) {
            var _this = this;
            if (!guanqia || this._copyVo)
                return;
            if (!this._copyVo) {
                this._copyVo = new game.GuildChallengeVo();
                this._copyVo.setGuanqiaVo(guanqia);
                var arg = {};
                arg[Protocol.guild_guildCopy_copyInfo.args.id] = guanqia.tbCopy.ID;
                PLC.request(Protocol.guild_guildCopy_copyInfo, arg, function ($data) {
                    if (!$data)
                        return;
                    _this._copyVo.setSvo($data);
                    _this.renderView();
                });
            }
            else {
                this.renderView();
            }
        };
        JishaJiangliView.prototype.renderView = function () {
            if (!this._copyVo)
                return;
            var rewards = this._copyVo.guanqiaVo.getRewardList();
            this.rewardList.array = rewards;
            this.rewardList.width = rewards.length * (90 + this.rewardList.spaceX);
            this.rankList.array = this._copyVo.guanqiaVo.getRankList();
            if (this._copyVo.svo) {
                var rank = this._copyVo.getSelfRank();
                var rankText = rank == 0 ? LanMgr.getLan('', 10028) : LanMgr.getLan('', 10029, this._copyVo.getSelfRank());
                this.lbDesc.text = LanMgr.getLan('', 10080, this._copyVo.svo.totalDamage) + "     " + rankText;
            }
        };
        JishaJiangliView.prototype.onExit = function () {
            this._copyVo = null;
            this.rewardList.array = null;
            this.rankList.array = null;
        };
        return JishaJiangliView;
    }(ui.guild.copy.JishaJiangliUI));
    game.JishaJiangliView = JishaJiangliView;
})(game || (game = {}));
