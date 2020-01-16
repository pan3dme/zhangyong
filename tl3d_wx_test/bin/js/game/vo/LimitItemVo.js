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
/**
 * 限时开启道具对象
 */
var LimitItemVo = /** @class */ (function (_super) {
    __extends(LimitItemVo, _super);
    function LimitItemVo(uuid, limitTime, id, count, type, star, extral, first) {
        var _this = _super.call(this, id, count, type, star, extral, first) || this;
        _this.limitTime = limitTime;
        _this.uuid = uuid;
        return _this;
    }
    return LimitItemVo;
}(ItemVo));
