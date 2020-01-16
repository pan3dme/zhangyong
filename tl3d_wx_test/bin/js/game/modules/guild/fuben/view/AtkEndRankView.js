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
    var AtkEndRankView = /** @class */ (function (_super) {
        __extends(AtkEndRankView, _super);
        function AtkEndRankView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.AtkEndRankView, closeOnSide: true, closeOnButton: true, title: "\u51FB\u6740\u6392\u884C" };
            return _this;
        }
        AtkEndRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        AtkEndRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        AtkEndRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        AtkEndRankView.prototype.initView = function () {
            this.rankList.array = null;
            this.updateView();
        };
        //伤害排行更新
        AtkEndRankView.prototype.updateView = function () {
            var _this = this;
            if (this._curGuanqia && this.dataSource && this.dataSource.tbCopy.ID == this._curGuanqia.tbCopy.ID && this._damageRankList) {
                this.renderDamaList();
                return;
            }
            this._curGuanqia = this.dataSource;
            var guanqia = this._curGuanqia;
            var arg = {};
            arg[Protocol.guild_guildCopy_copyInfo.args.id] = guanqia.tbCopy.ID;
            PLC.request(Protocol.guild_guildCopy_copyInfo, arg, function ($data) {
                if (!$data)
                    return;
                // 伤害排行
                var info = $data;
                var rankInfo = info.rankInfo ? info.rankInfo : {};
                _this._damageRankList = [];
                _this.lbRank.text = "";
                for (var key in rankInfo) {
                    var obj = {};
                    obj['type'] = 'DamageRank';
                    obj['rank'] = parseInt(key);
                    obj['playerId'] = rankInfo[key][0];
                    obj['name'] = rankInfo[key][1];
                    obj['head'] = rankInfo[key][2];
                    obj['level'] = rankInfo[key][3];
                    obj['force'] = Math.ceil(rankInfo[key][4]);
                    obj['headFrame'] = rankInfo[key][5];
                    obj['value'] = rankInfo[key][6];
                    _this._damageRankList.push(obj);
                    if (rankInfo[key][0] == App.hero.playerId) {
                        _this.lbRank.text = "我的排名:" + parseInt(key) + "    我的伤害:" + Math.round(obj['value']);
                    }
                }
                _this.renderDamaList();
            });
        };
        AtkEndRankView.prototype.renderDamaList = function () {
            var rankList = this._damageRankList ? this._damageRankList : [];
            this.rankList.array = rankList;
        };
        return AtkEndRankView;
    }(ui.guild.copy.atkEndRankUI));
    game.AtkEndRankView = AtkEndRankView;
})(game || (game = {}));
