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
var tl3d;
(function (tl3d) {
    var SkillData = /** @class */ (function (_super) {
        __extends(SkillData, _super);
        function SkillData(skillMgr) {
            var _this = _super.call(this) || this;
            //一个角色的一组技能
            _this.srcList = new Array();
            _this.skillMgr = skillMgr;
            return _this;
        }
        SkillData.prototype.addSrcSkill = function ($skill) {
            this.srcList.push($skill);
        };
        SkillData.prototype.destory = function () {
            for (var i = 0; i < this.srcList.length; i++) {
                var skill = this.srcList[i];
                skill.destory();
                this.skillMgr.gcSkill(skill);
            }
        };
        //列表中的对象全部播放完并且都没有使用才可以释放
        SkillData.prototype.testDestory = function () {
            for (var i = 0; i < this.srcList.length; i++) {
                var skill = this.srcList[i];
                if (!(skill.isDeath && skill.idleTime >= tl3d.ResCount.GCTime)) {
                    return false;
                }
            }
            return true;
        };
        return SkillData;
    }(tl3d.ResCount));
    tl3d.SkillData = SkillData;
})(tl3d || (tl3d = {}));
