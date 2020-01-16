var RegConst = /** @class */ (function () {
    function RegConst() {
    }
    /**手机表达式 */
    RegConst.TEL_REG = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    /** html样式 */
    RegConst.HTML_REG = /<\/?.+?\/?>/ig;
    /** 全部空格 */
    RegConst.EMPTY_ALL_REG = /\s+/g;
    return RegConst;
}());
