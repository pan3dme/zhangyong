var tl3d;
(function (tl3d) {
    var SkillVo = /** @class */ (function () {
        function SkillVo() {
        }
        SkillVo.prototype.setData = function ($info) {
            this.keyAry = new Array;
            if (!$info) {
                //console.log("技能有错")
            }
            this.action = $info.action;
            this.skillname = $info.skillname;
            this.bloodTime = $info.blood;
            this.types = $info.type;
            if (this.types == SkillType.FixEffect) {
                this.keyAry = this.getFixEffect($info.data);
            }
            else if (this.types == SkillType.TrajectoryDynamicTarget || this.types == SkillType.TrajectoryDynamicPoint) {
                this.keyAry = this.getTrajectoryDynamicTarget($info.data);
            }
            if ($info.sound) {
                this.sound = new tl3d.SkillKeyVo;
                this.sound.frame = $info.sound.time * tl3d.Scene_data.frameTime;
                this.sound.url = $info.sound.name;
            }
            if ($info.shock) {
                this.shockAry = this.getShockAry($info.shock);
            }
        };
        SkillVo.prototype.getShockAry = function ($ary) {
            var keyAry = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var key = new tl3d.SkillShockVo();
                key.setData($ary[i]);
                keyAry.push(key);
            }
            return keyAry;
        };
        SkillVo.prototype.getFixEffect = function ($ary) {
            var keyAry = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var key = new tl3d.SkillFixEffectKeyVo();
                key.setData($ary[i]);
                keyAry.push(key);
            }
            return keyAry;
        };
        SkillVo.prototype.getTrajectoryDynamicTarget = function ($ary) {
            var keyAry = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var key = new tl3d.SkillTrajectoryTargetKeyVo();
                key.setData($ary[i]);
                keyAry.push(key);
            }
            return keyAry;
        };
        SkillVo.defaultBloodTime = 250;
        return SkillVo;
    }());
    tl3d.SkillVo = SkillVo;
    /**
     * 技能类型
     */
    var SkillType = /** @class */ (function () {
        function SkillType() {
        }
        SkillType.TrajectoryDynamicTarget = 1; //动态轨迹对象，线性运动
        SkillType.FixEffect = 4; //固定特效，添加固定位置
        SkillType.TrajectoryDynamicPoint = 3; //动态点，添加动态位置
        return SkillType;
    }());
    tl3d.SkillType = SkillType;
})(tl3d || (tl3d = {}));
