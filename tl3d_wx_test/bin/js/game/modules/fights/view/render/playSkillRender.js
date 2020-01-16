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
    var playSkillRender = /** @class */ (function (_super) {
        __extends(playSkillRender, _super);
        function playSkillRender() {
            return _super.call(this) || this;
        }
        playSkillRender.prototype.setData = function (team, icon, name) {
            this.img_bg1.skin = team == battle.BatteConsts.BATTLE_CAMPATK ? SkinUtil.wofangjinengdi : SkinUtil.difangjinengdi;
            this.img_bg2.skin = team == battle.BatteConsts.BATTLE_CAMPATK ? SkinUtil.wofangjinengGX : SkinUtil.difangjinengGX;
            this.img_icon.skin = SkinUtil.getHeadIcon(icon);
            this.img_icon.x = team == battle.BatteConsts.BATTLE_CAMPATK ? 82 : 271;
            this.lab_name.text = name;
            this.lab_name.strokeColor = team == battle.BatteConsts.BATTLE_CAMPATK ? "#003481" : "#810000";
            this.lab_name.x = team == battle.BatteConsts.BATTLE_CAMPATK ? 137 : 82;
            // this.lab_name.align = team == battle.BatteConsts.BATTLE_CAMPATK?"left":"right"
            this.clearTimer(this, this.playEnd);
            this.ani2.stop();
            this.ani1.stop();
            this.ani1.play(0, false);
            this.timerOnce(1500, this, this.playEnd);
        };
        playSkillRender.prototype.playEnd = function () {
            this.ani2.play(0, false);
        };
        return playSkillRender;
    }(ui.fight.box.playSkillBoxUI));
    game.playSkillRender = playSkillRender;
})(game || (game = {}));
