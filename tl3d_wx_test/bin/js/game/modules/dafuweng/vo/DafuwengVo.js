var game;
(function (game) {
    var DafuwengVo = /** @class */ (function () {
        function DafuwengVo(key, svo) {
            this.answerFlag = false; // 是否已回答
            this.key = key;
            this.svo = svo;
            this.tbRisk = tb.TB_risk.getTB_riskById(svo.riskId);
        }
        /** 设置答案 */
        DafuwengVo.prototype.setAnswer = function (val) {
            this.questValue = val;
            this.answerFlag = true;
        };
        /** 是否过期 */
        DafuwengVo.prototype.isExpire = function () {
            return App.serverTimeSecond >= this.svo.limitTime;
        };
        /** 是否有答案 */
        DafuwengVo.prototype.isHasAnswer = function () {
            return this.answerFlag;
        };
        /** 获取问题配置 */
        DafuwengVo.prototype.getQuestTb = function () {
            return tb.TB_question.getTB_questionById(this.svo.questId);
        };
        return DafuwengVo;
    }());
    game.DafuwengVo = DafuwengVo;
})(game || (game = {}));
