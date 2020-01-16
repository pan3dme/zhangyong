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
    var GuildCopyResultView = /** @class */ (function (_super) {
        __extends(GuildCopyResultView, _super);
        function GuildCopyResultView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.closeEffect = null;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            return _this;
        }
        GuildCopyResultView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.initView();
            /** 判断是否弹出防沉迷验证 */
            //sendDispatchEvent(new moduleindulge.IndulgeEvent(moduleindulge.IndulgeEvent.SHOW_FANG_PANEL), moduleindulge.IndulgeType.tishi_YanZheng);
        };
        GuildCopyResultView.prototype.initView = function () {
            this._again = false;
            if (this.dataSource) {
                AudioMgr.setPlayRate(1);
                if (this.dataSource.type == playState.VICTORY || this.dataSource.copyVo.vo.copyType == CopyType.worldboss) {
                    AudioMgr.playSound("sound/victory.mp3");
                }
                else {
                    AudioMgr.playSound("sound/defeated.mp3");
                }
            }
            this.bgPanel.showTitle(true, "zhandoubiaoxian/huodejianli.png", true, true, true, Handler.create(this, this.showTitleComplete), this);
            var $sdata = this.dataSource;
            var copyvo = $sdata.copyVo.vo;
            var infoVo;
            if (copyvo.copyType == CopyType.guildCopy) {
                infoVo = copyvo.guildGuanqiaVo;
            }
            else if (copyvo.copyType == CopyType.worldboss) {
                infoVo = copyvo.worldBossInfo;
            }
            this.lbRank.text = LanMgr.getLan('', 10029, infoVo.getRank());
            this.lbDamage.text = LanMgr.getLan('', 10086, infoVo.getCurDamage());
            this.lbTotalDamage.text = LanMgr.getLan('', 10087, infoVo.getTotalDamage());
            var ary = new Array;
            if (infoVo.battleEndData.commonData)
                UIUtil.getRewardItemVoList(ary, infoVo.battleEndData.commonData);
            if (infoVo.battleEndData.firstData)
                UIUtil.getRewardItemVoList(ary, infoVo.battleEndData.firstData, true);
            this._listVo = new ListVo(this.rewardList);
            var listY = ((Laya.stage.height - this.height) >> 1) + this.rewardList.y;
            this.rewardList.AutoLayout(this.width, ary);
            this._listVo.setHeight(100);
            this._listVo.setPosition(this.rewardList.x + Launch.offsetX, listY);
            this._listVo._dataSource = ary;
            this.btn_again.on(Laya.Event.CLICK, this, this.onClickAgain);
            this.btn_again.visible = false;
            switch (copyvo.copyType) {
                case CopyType.guildCopy: //公会副本
                    this.btn_close.x = 290;
                    break;
                case CopyType.worldboss: //世界boss
                    this.btn_close.x = 172;
                    this.btn_again.visible = true;
                    break;
            }
        };
        GuildCopyResultView.prototype.showTitleComplete = function () {
            this._efflist = common.EffectList.showEffectList(this._listVo);
        };
        GuildCopyResultView.prototype.close = function () {
            if (!this._again)
                dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
            _super.prototype.close.call(this);
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
        };
        GuildCopyResultView.prototype.onClickAgain = function () {
            // this._again = false;
            var copyvo = this.dataSource.copyVo.vo;
            var infoVo = copyvo.worldBossInfo;
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            var maxCnt = tb.TB_boss_set.getSet().max_time;
            if (count < 1) {
                showToast(LanMgr.getLan("", 10105));
                dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_BUY_VIEW));
                return;
            }
            this.close();
            dispatchEvt(new game.BossEvent(game.BossEvent.CHALLENGE_BOSS, infoVo));
        };
        GuildCopyResultView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.closeTitle();
            this.btn_again.off(Laya.Event.CLICK, this, this.onClickAgain);
            this.rewardList.array = null;
        };
        return GuildCopyResultView;
    }(ui.fight.FightGuildCopyResultUI));
    game.GuildCopyResultView = GuildCopyResultView;
})(game || (game = {}));
