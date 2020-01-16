var game;
(function (game) {
    var GodDmInviteVo = /** @class */ (function () {
        function GodDmInviteVo() {
        }
        GodDmInviteVo.prototype.setSvo = function (svo) {
            this.svo = svo;
        };
        /** 是否已邀请 */
        GodDmInviteVo.prototype.isInvite = function () {
            return this.svo.inviteTime >= App.serverTimeSecond;
        };
        return GodDmInviteVo;
    }());
    game.GodDmInviteVo = GodDmInviteVo;
})(game || (game = {}));
