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
    var GloryMatchPlayerVo = /** @class */ (function (_super) {
        __extends(GloryMatchPlayerVo, _super);
        function GloryMatchPlayerVo() {
            var _this = _super.call(this) || this;
            _this.type = common.LinuepType.glory;
            return _this;
        }
        /** 设置数据 */
        GloryMatchPlayerVo.prototype.setData = function (id, name, force, head, level, headFrame) {
            this.playerId = id;
            this.name = name;
            this.force = force;
            this.head = head;
            this.level = level;
            this.headFrame = headFrame;
            this.headVo = new UserHeadVo(head, level, headFrame);
        };
        GloryMatchPlayerVo.prototype.setSvo = function (svo) {
            for (var key in svo) {
                this[key] = svo[key];
            }
            this.headVo = new UserHeadVo(this.head, this.level, this.headFrame);
        };
        /** 设置详细信息 */
        GloryMatchPlayerVo.prototype.setDetailInfo = function (guildName, lineupInfo) {
            this.guildName = guildName;
            _super.prototype.setLineupInfo.call(this, lineupInfo);
        };
        return GloryMatchPlayerVo;
    }(BaseFightVo));
    game.GloryMatchPlayerVo = GloryMatchPlayerVo;
})(game || (game = {}));
