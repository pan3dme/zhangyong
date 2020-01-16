var game;
(function (game) {
    /** 晋级类型 */
    var GuildUpGradeType;
    (function (GuildUpGradeType) {
        GuildUpGradeType[GuildUpGradeType["none"] = 0] = "none";
        GuildUpGradeType[GuildUpGradeType["up"] = 1] = "up";
        GuildUpGradeType[GuildUpGradeType["keep"] = 2] = "keep";
        GuildUpGradeType[GuildUpGradeType["down"] = 3] = "down"; // 降级
    })(GuildUpGradeType = game.GuildUpGradeType || (game.GuildUpGradeType = {}));
})(game || (game = {}));
