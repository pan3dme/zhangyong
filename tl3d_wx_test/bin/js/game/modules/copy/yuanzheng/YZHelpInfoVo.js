var game;
(function (game) {
    var YZHelpInfoVo = /** @class */ (function () {
        function YZHelpInfoVo(svo) {
            this.svo = svo;
            var godInfo = svo.godInfo;
            this.force = godInfo[0];
            var obj = godInfo[1];
            var tbGod = tb.TB_god.get_TB_godById(obj[0]);
            var godVo = new GodItemVo(tbGod);
            // [templateId, starLv, level, attrs, degree, awakenLv, skinId]
            godVo.starLevel = obj[1];
            godVo.level = obj[2];
            godVo.degree = obj[4];
            godVo.dataType = 1;
            if (obj[3]) {
                godVo.iSeverAttri = map2ary(obj[3]);
            }
            this.godVo = godVo;
            this.godVo.svrForce = this.force;
            this.godVo.dataType = 1;
        }
        /** 是否已雇佣 */
        YZHelpInfoVo.prototype.isHire = function () {
            return this.svo.isHire;
        };
        /** 是否超过我方最高神力英雄的120% */
        YZHelpInfoVo.prototype.isOverForce = function () {
            var maxForce = game.GodModel.getInstance().getMaxForce();
            return this.force > (maxForce * tb.TB_copy_set.getCopySet().hire_fight_percent / 100);
        };
        return YZHelpInfoVo;
    }());
    game.YZHelpInfoVo = YZHelpInfoVo;
})(game || (game = {}));
