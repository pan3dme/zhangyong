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
    /** 荣誉殿堂 */
    var HonorHallView = /** @class */ (function (_super) {
        __extends(HonorHallView, _super);
        function HonorHallView() {
            var _this = _super.call(this) || this;
            /** 是否请求中 */
            _this._requestFlag = false;
            _this.group = UIConst.hud_group;
            return _this;
        }
        HonorHallView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._itemList = [];
            for (var i = 0; i < 3; i++) {
                this._itemList.push(this["item" + i]);
            }
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GLORY_FIGHT);
        };
        HonorHallView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        HonorHallView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        HonorHallView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            for (var _i = 0, _a = this._itemList; _i < _a.length; _i++) {
                var item = _a[_i];
                item.dataSource = null;
            }
            this._requestFlag = false;
            this.btnPrev.off(Laya.Event.CLICK, this, this.onPrev);
            this.btnNext.off(Laya.Event.CLICK, this, this.onNext);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        HonorHallView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, redpointName: "guild_war_award", callback: this.onBaoxiang.bind(this) },
                { btnSkin: SkinUtil.btn_saiji, callback: this.onSaiji.bind(this) },
                { btnSkin: SkinUtil.btn_huiyuan, callback: this.onHuiyuan.bind(this) },
                { btnSkin: SkinUtil.btn_glory_hall, callback: this.onHall.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.guildDonate];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onReturn.bind(this) });
            var model = game.GuildFightModel.getInstance();
            this._curSeason = model.season - 1;
            this._curSeason = this._curSeason <= 0 ? 1 : this._curSeason;
            for (var i = 0; i < 3; i++) {
                var item = this._itemList[i];
                var obj = { guildRank: (i + 1) };
                item.dataSource = obj;
            }
            this.btnPrev.on(Laya.Event.CLICK, this, this.onPrev);
            this.btnNext.on(Laya.Event.CLICK, this, this.onNext);
            this.updateBtn();
            if (this._curSeason != model.season) {
                this.requestList();
            }
        };
        HonorHallView.prototype.requestList = function () {
            var _this = this;
            this._requestFlag = true;
            if (game.GuildFightModel.getInstance().season > this._curSeason) {
                var args = {};
                args[Protocol.guild_guildWar_getSessionRankList.args.session] = this._curSeason;
                PLC.request(Protocol.guild_guildWar_getSessionRankList, args, function ($data) {
                    if (!$data) {
                        _this.renderList(null);
                        return;
                    }
                    _this._requestFlag = false;
                    var ary = $data.sessionRankList;
                    ary.sort(function (a, b) {
                        return a.guildRank - b.guildRank;
                    });
                    _this.renderList(ary);
                });
            }
            else {
                this.renderList(null);
            }
        };
        HonorHallView.prototype.renderList = function (list) {
            for (var i = 0; i < 3; i++) {
                var item = this._itemList[i];
                item.dataSource = list && list.length > i ? list[i] : { guildRank: (i + 1) };
            }
            this._requestFlag = false;
        };
        HonorHallView.prototype.onPrev = function () {
            if (this._requestFlag)
                return;
            this._curSeason--;
            this.updateBtn();
            this.requestList();
        };
        HonorHallView.prototype.onNext = function () {
            if (this._requestFlag)
                return;
            this._curSeason++;
            this.updateBtn();
            this.requestList();
        };
        /** 更新按钮状态 */
        HonorHallView.prototype.updateBtn = function () {
            this.lbName.text = LanMgr.getLan('S{0}赛季', -1, this._curSeason);
            this.btnNext.disabled = this._curSeason >= game.GuildFightModel.getInstance().season;
            this.btnPrev.disabled = this._curSeason <= 1;
        };
        HonorHallView.prototype.onReturn = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_BATTLE_VIEW));
        };
        HonorHallView.prototype.onBaoxiang = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GRADE_CHEST_VIEW));
        };
        HonorHallView.prototype.onHall = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_HONOR_HALL_VIEW));
        };
        HonorHallView.prototype.onSaiji = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_SEASON_AWARD_VIEW));
        };
        HonorHallView.prototype.onRule = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_FIGHT_RULE_VIEW));
        };
        HonorHallView.prototype.onHuiyuan = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_PERSON_RANK_VIEW));
        };
        return HonorHallView;
    }(ui.guild.fight.HonorHallUI));
    game.HonorHallView = HonorHallView;
})(game || (game = {}));
