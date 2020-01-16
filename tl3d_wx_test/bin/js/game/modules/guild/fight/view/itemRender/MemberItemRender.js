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
    var MemberItemRender = /** @class */ (function (_super) {
        __extends(MemberItemRender, _super);
        function MemberItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MemberItemRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        MemberItemRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info.svo.name;
                this.boxUser.dataSource = info.headVo;
                this.godList.array = info.getExistGods();
                this.lbForce.text = LanMgr.getLan('', 10117, info.svo.force);
                this.lbScore.text = info.svo.integral.toString();
                var ary = [];
                for (var i = 1; i <= tb.TB_guild_war_set.getSet().atk_num; i++) {
                    var url = info.svo.atkCount >= i ? SkinUtil.jian_liang : SkinUtil.jian_an;
                    ary.push(url);
                }
                this.atkList.array = ary;
                ary = [];
                for (var i = 1; i <= tb.TB_guild_war_set.getSet().life_num; i++) {
                    var url = info.svo.lifeNum >= i ? SkinUtil.aixin_liang : SkinUtil.aixin_an;
                    ary.push(url);
                }
                this.lifeList.array = ary;
                var curHp = info.getLineupCurHp();
                var totalHp = info.getLineupTotalHp();
                this.lbBlood.text = totalHp <= 0 ? "0%" : Math.ceil((curHp / totalHp) * 100) + "%";
                this.pgBlood.value = totalHp <= 0 ? 0 : (curHp / totalHp);
                if (info.isMyTeam) {
                    this.btnChallenge.visible = false;
                }
                else {
                    this.btnChallenge.visible = true;
                    this.btnChallenge.label = info.isDead() ? "已击败" : "挑战";
                    this.btnChallenge.disabled = info.isDead();
                }
                this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
            }
            else {
                this.godList.array = null;
                this.lifeList.array = null;
                this.atkList.array = null;
                this.btnChallenge.off(Laya.Event.CLICK, this, this.onChallenge);
            }
        };
        MemberItemRender.prototype.onChallenge = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.CHALLENGE_ENEMY, this.dataSource));
        };
        return MemberItemRender;
    }(ui.guild.fight.render.GuildFightRenderUI));
    game.MemberItemRender = MemberItemRender;
})(game || (game = {}));
