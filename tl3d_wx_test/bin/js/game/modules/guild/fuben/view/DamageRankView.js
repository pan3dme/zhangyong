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
    var DamageRankView = /** @class */ (function (_super) {
        __extends(DamageRankView, _super);
        function DamageRankView() {
            var _this = _super.call(this) || this;
            _this.damagerankinfo = "";
            _this.guildrankinfo = "";
            _this.isModelClose = true;
            _this.rewardList.array = tb.TB_arena_new.get_TB_arena_new();
            _this.tab.selectHandler = new Handler(_this, _this.onTabSelect);
            _this.bgPanel.dataSource = { uiName: UIConst.DamageRankView, closeOnSide: true, closeOnButton: true, title: "\u516C\u4F1A\u526F\u672C\u6392\u884C" };
            return _this;
        }
        DamageRankView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        DamageRankView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        DamageRankView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tab.selectedIndex = -1;
            this._damageRankList = null;
            this._guildRankList = null;
        };
        DamageRankView.prototype.initView = function () {
            this.resetText();
            this.tab.selectedIndex = 0;
        };
        //伤害排行更新
        DamageRankView.prototype.updateView = function () {
            var _this = this;
            if (this._curGuanqia && this.dataSource && this.dataSource.tbCopy.ID == this._curGuanqia.tbCopy.ID && this._damageRankList) {
                this.renderDamaList();
                return;
            }
            this.lbRank.text = this.damagerankinfo;
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
                    if (obj['playerId'] == App.hero.playerId) {
                        _this.damagerankinfo = "我的排名:" + parseInt(key) + "    我的伤害:" + Math.round(obj['value']);
                    }
                }
                _this.renderDamaList();
            });
        };
        DamageRankView.prototype.renderDamaList = function () {
            var rankList = this._damageRankList ? this._damageRankList : [];
            this.rankList.array = rankList;
            this.lbRank.text = this.damagerankinfo;
            this.lab_empty.visible = !rankList || rankList.length == 0;
        };
        DamageRankView.prototype.onTabSelect = function (index) {
            this.viewstack.selectedIndex = index;
            if (index == 0) {
                this.updateView();
            }
            else {
                this.updateGuild();
            }
        };
        DamageRankView.prototype.updateGuild = function () {
            var _this = this;
            if (!this._guildRankList) {
                this.lbRank.text = this.guildrankinfo;
                //公会排行
                PLC.request(Protocol.guild_guild_copyRankList, null, function ($data) {
                    if (!$data)
                        return;
                    _this._guildRankList = [];
                    var copyList = $data.copyRankList ? $data.copyRankList : [];
                    for (var i = 0; i < copyList.length; i++) {
                        var obj = copyList[i];
                        obj['type'] = 'GuildRank';
                        obj['rank'] = i + 1;
                        var tbCopy = tb.TB_guild_copy.getItemnById(obj.copyId);
                        obj['desc'] = tbCopy ? tbCopy.getName() : "无";
                        _this._guildRankList.push(obj);
                    }
                    var guanqia = game.GuildCopyModel.getInstance().getGuanqiaById($data.rankValue);
                    if (guanqia) {
                        _this.guildrankinfo = "我的排名:" + ($data.myRank || 0) + "    最高关卡:" + guanqia.getName();
                    }
                    _this.renderGuildList();
                });
            }
            this.renderGuildList();
        };
        DamageRankView.prototype.renderGuildList = function () {
            var copyList = this._guildRankList ? this._guildRankList : [];
            this.rewardList.array = copyList;
            this.lbRank.text = this.guildrankinfo;
            this.lab_empty.visible = !copyList || copyList.length == 0;
        };
        DamageRankView.prototype.resetText = function () {
            this.damagerankinfo = "我的排名:无    我的伤害:0";
            this.guildrankinfo = "我的排名:无    最高关卡:无";
        };
        return DamageRankView;
    }(ui.guild.copy.DamageRankUI));
    game.DamageRankView = DamageRankView;
})(game || (game = {}));
