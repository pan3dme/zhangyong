
module game {

    export class DafuwengVo {

        public key : number;
        public svo : IRiskSvo;
        public tbRisk : tb.TB_risk;

        public questValue : number;	            // 问题回答 猜拳：1剪刀2石头3布，猜大小0小1大，问答1左2右
        public answerFlag : boolean = false;    // 是否已回答
        constructor(key:number,svo:IRiskSvo){
            this.key = key;
            this.svo = svo;
            this.tbRisk = tb.TB_risk.getTB_riskById(svo.riskId);
        }
        /** 设置答案 */
        setAnswer(val:number):void {
            this.questValue = val;
            this.answerFlag = true;
        }

        /** 是否过期 */
        isExpire():boolean {
            return App.serverTimeSecond >= this.svo.limitTime;
        }

        /** 是否有答案 */
        isHasAnswer():boolean {
            return this.answerFlag;
        }

        /** 获取问题配置 */
        getQuestTb():tb.TB_question {
            return tb.TB_question.getTB_questionById(this.svo.questId);
        }

    }
}