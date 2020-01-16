var game;
(function (game) {
    var BuzhenItemVo = /** @class */ (function () {
        function BuzhenItemVo() {
        }
        return BuzhenItemVo;
    }());
    game.BuzhenItemVo = BuzhenItemVo;
    var BuzhenListItemVo = /** @class */ (function () {
        function BuzhenListItemVo(vo, linuepType) {
            this.showBlood = false; // 是否显示血条
            this.hp = 0; // 当前血量
            this.totalHp = 0; // 总血量
            this.canGray = false; // 是否可以置灰
            this.godVo = vo;
            this.linuepType = linuepType;
        }
        return BuzhenListItemVo;
    }());
    game.BuzhenListItemVo = BuzhenListItemVo;
})(game || (game = {}));
