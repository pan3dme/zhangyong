/*
* name;
*/
var GuildHeadVo = /** @class */ (function () {
    function GuildHeadVo(head, level) {
        this._head = head;
        this._level = level;
    }
    GuildHeadVo.prototype.getStyle = function () {
        return 1;
    };
    GuildHeadVo.prototype.getLevel = function () {
        return this._level ? this._level : 1;
    };
    GuildHeadVo.prototype.getQulity = function () {
        return "";
    };
    GuildHeadVo.prototype.getFrame = function () {
        return null;
    };
    /** 获取等级框 */
    GuildHeadVo.prototype.getImgLv = function () {
        return SkinUtil.default_lv_frame;
    };
    GuildHeadVo.prototype.getIconUrl = function () {
        return SkinUtil.getGuildHeadIconById(this._head);
    };
    return GuildHeadVo;
}());
