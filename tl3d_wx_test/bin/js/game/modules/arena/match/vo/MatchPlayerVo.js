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
    var MatchPlayerVo = /** @class */ (function (_super) {
        __extends(MatchPlayerVo, _super);
        function MatchPlayerVo(svo, index) {
            var _this = _super.call(this) || this;
            _this.headVo = new UserHeadVo(0, 0);
            _this.setSvo(svo);
            _this.index = index;
            return _this;
        }
        /** 设置基本信息 */
        MatchPlayerVo.prototype.setSvo = function (svo) {
            // 刷新玩家新需清除阵容数据
            if (this.playerId != svo.playerId) {
                _super.prototype.clearLineupInfo.call(this);
            }
            this.playerId = svo.playerId;
            this.name = svo.name;
            this.sex = svo.sex;
            this.level = svo.level;
            this.force = svo.forceNum;
            this.score = svo.score;
            this.head = svo.head;
            this.headFrame = svo.headFrame;
            this.guildName = svo.guildName;
            this.headVo.setLevel(svo.level);
            this.headVo.setHead(svo.head);
            this.headVo.setHeadFrame(svo.headFrame);
            if (svo.defInfo) {
                _super.prototype.setLineupInfo.call(this, svo.defInfo);
            }
        };
        /** 设置详细信息 */
        MatchPlayerVo.prototype.setDetailData = function (defInfo) {
            _super.prototype.setLineupInfo.call(this, defInfo);
        };
        /** 是否机器人 */
        MatchPlayerVo.prototype.isRobot = function () {
            return !this.playerId || this.playerId == "";
        };
        MatchPlayerVo.prototype.isRecord = function () {
            return false;
        };
        MatchPlayerVo.prototype.getForce = function () {
            //非回放时，目标值为自己战力
            return App.hero.force;
        };
        MatchPlayerVo.prototype.getTagForce = function () {
            //非回放时，目标值为对方战力
            return this.force;
        };
        return MatchPlayerVo;
    }(BaseFightVo));
    game.MatchPlayerVo = MatchPlayerVo;
})(game || (game = {}));
