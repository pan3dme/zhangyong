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
var game;
(function (game) {
    /** 商队信息 */
    var CaravanInfoVo = /** @class */ (function (_super) {
        __extends(CaravanInfoVo, _super);
        function CaravanInfoVo(svo) {
            var _this = _super.call(this) || this;
            _this.svo = svo;
            _this.tbEscort = tb.TB_escort.getItemById(svo.tradeId);
            return _this;
        }
        /** 设置详细信息 */
        CaravanInfoVo.prototype.setDetailInfo = function (info) {
            this.svo.guildName = info.guildName;
            this.svo.robCount = info.robCount;
            this.svo.multiple = info.multiple;
            this.svo.force = info.force;
            this.svo.head = info.head;
            this.svo.level = info.level;
            if (!this.svo.lineupInfo) {
                this.svo.lineupInfo = info.lineupInfo;
                _super.prototype.setLineupInfo.call(this, info.lineupInfo);
            }
        };
        return CaravanInfoVo;
    }(BaseFightVo));
    game.CaravanInfoVo = CaravanInfoVo;
})(game || (game = {}));
