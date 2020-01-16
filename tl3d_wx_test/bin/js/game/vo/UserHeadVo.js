/*
* name;
*/
var UserHeadVo = /** @class */ (function () {
    function UserHeadVo(head, level, frame, guild) {
        if (frame === void 0) { frame = 0; }
        this._head = head;
        this._level = level;
        this._headFrame = frame || 0;
        this._guild = guild;
    }
    UserHeadVo.prototype.getStyle = function () {
        return 0;
    };
    UserHeadVo.prototype.getLevel = function () {
        return this._level ? this._level : 1;
    };
    UserHeadVo.prototype.getQulity = function () {
        return "";
    };
    UserHeadVo.prototype.getIconUrl = function () {
        if (this._guild)
            return SkinUtil.getGuildHeadIconById(this._head);
        return SkinUtil.getHeroIcon(this._head);
    };
    /** 获取特殊头像框  */
    UserHeadVo.prototype.getFrame = function () {
        if (this._guild)
            return null;
        return this._headFrame > 0 ? SkinUtil.getHeadFrame(this._headFrame) : null;
    };
    /** 获取等级框 */
    UserHeadVo.prototype.getImgLv = function () {
        if (this._guild)
            return SkinUtil.default_lv_frame;
        return this._headFrame > 0 ? SkinUtil.getLvFrame(this._headFrame) : SkinUtil.default_lv_frame;
    };
    UserHeadVo.prototype.setLevel = function (val) {
        this._level = val;
    };
    UserHeadVo.prototype.setHead = function (val) {
        this._head = val;
    };
    UserHeadVo.prototype.setHeadFrame = function (val) {
        this._headFrame = val;
    };
    return UserHeadVo;
}());
