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
    var GuildCopySweepResultView = /** @class */ (function (_super) {
        __extends(GuildCopySweepResultView, _super);
        function GuildCopySweepResultView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.closeEffect = null;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            return _this;
        }
        // private _again:boolean;
        GuildCopySweepResultView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.initView();
        };
        GuildCopySweepResultView.prototype.initView = function () {
            // this._again = false;
            this.bgPanel.showTitle(true, "comp/title/saodangchenggong.png", true, true, true, Handler.create(this, this.showTitleComplete), this);
            AudioMgr.playSound("sound/victory.mp3");
            var copyvo = this.dataSource;
            var serverData = copyvo.battleEndData;
            this.lbRank.text = LanMgr.getLan('', 10029, copyvo.getRank());
            this.lbDamage.text = LanMgr.getLan('', 10086, copyvo.getCurDamage());
            this.lbTotalDamage.text = LanMgr.getLan('', 10087, copyvo.getTotalDamage());
            this.updateCount();
            var ary = new Array;
            if (serverData.commonData)
                UIUtil.getRewardItemVoList(ary, serverData.commonData);
            if (serverData.firstData)
                UIUtil.getRewardItemVoList(ary, serverData.firstData, true);
            this._listVo = new ListVo(this.rewardList);
            var listY = ((Laya.stage.height - this.height) >> 1) + this.rewardList.y;
            this.rewardList.AutoLayout(this.width, ary);
            this._listVo.setHeight(100);
            this._listVo.setPosition(this.rewardList.x + Launch.offsetX, listY);
            this._listVo._dataSource = ary;
            this.btn_again.visible = this.lab_count.visible = copyvo.getMonstersBlood() > copyvo.getTotalDamage();
            this.btn_close.x = this.btn_again.visible ? 172 : (this.width - this.btn_close.width) / 2;
            this.btn_again.on(Laya.Event.CLICK, this, this.onClickAgain);
        };
        GuildCopySweepResultView.prototype.updateCount = function () {
            this.lab_count.text = LanMgr.getLan('', 10081, App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum));
        };
        GuildCopySweepResultView.prototype.showTitleComplete = function () {
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this._efflist = common.EffectList.showEffectList(this._listVo);
        };
        GuildCopySweepResultView.prototype.close = function () {
            if (this.dataSource) {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
            }
            _super.prototype.close.call(this);
        };
        GuildCopySweepResultView.prototype.onClickAgain = function () {
            // this._again = true;
            if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) <= 0) {
                var num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
                if (num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)) {
                    showToast(LanMgr.getLan('', 10084));
                    return;
                }
                else {
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_CHALLENGE_NUM_BUY));
                    return;
                }
            }
            // this.close();
            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_COPY_SWEEP, this.dataSource));
        };
        GuildCopySweepResultView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.closeTitle();
            this.btn_again.off(Laya.Event.CLICK, this, this.onClickAgain);
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.rewardList.array = null;
        };
        return GuildCopySweepResultView;
    }(ui.guild.copy.GuildCopySweepResultUI));
    game.GuildCopySweepResultView = GuildCopySweepResultView;
})(game || (game = {}));
