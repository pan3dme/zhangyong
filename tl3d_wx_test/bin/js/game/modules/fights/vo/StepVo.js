var game;
(function (game) {
    var sStep = /** @class */ (function () {
        function sStep(step, skillId) {
            this.step = step;
            this.skillId = skillId;
        }
        return sStep;
    }());
    game.sStep = sStep;
})(game || (game = {}));
