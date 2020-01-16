var HtmlUtil = /** @class */ (function () {
    function HtmlUtil() {
    }
    /**
     * 转换html样式
     * @param text 文本内容
     * @param remove 是否移除html样式
     */
    HtmlUtil.convertHtmlText = function (text, remove) {
        if (remove === void 0) { remove = false; }
        return remove ? text.replace(RegConst.HTML_REG, "") : text;
    };
    return HtmlUtil;
}());
