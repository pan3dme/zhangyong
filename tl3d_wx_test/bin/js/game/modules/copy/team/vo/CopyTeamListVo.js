var game;
(function (game) {
    var CopyTeamListVo = /** @class */ (function () {
        function CopyTeamListVo() {
            this.memberList = [];
            var item = null;
            for (var i = 1; i <= 3; i++) {
                this.memberList.push({ pos: i });
            }
        }
        CopyTeamListVo.prototype.setSvo = function (svo) {
            this.svo = svo;
            var item = null;
            for (var key in this.svo.memberInfo) {
                item = this.svo.memberInfo[key];
                this.memberList[item.pos - 1] = item;
            }
        };
        return CopyTeamListVo;
    }());
    game.CopyTeamListVo = CopyTeamListVo;
})(game || (game = {}));
