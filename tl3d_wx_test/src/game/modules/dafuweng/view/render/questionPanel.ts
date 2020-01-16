module game {
    export class questionPanel extends ui.dafuweng.questionPanelUI {

        private _model: DafuwengModel;
        constructor() {
            super();
            this.isModelClose = false;
            this.btn_result1.on(Laya.Event.CLICK, this, this.onCommit);
            this.btn_result2.on(Laya.Event.CLICK, this, this.onCommit);
            this._model = DafuwengModel.getInstance();
        }

        public close() {
            // super.close();
            this.lab_question.text = '';
            this.btn_result1.label = '';
            this.btn_result2.label = '';
        }

        public initView() {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            let tbRisk = info.tbRisk;
            if (tbRisk.type == RiskType.QUESTION) {
                this.img_right.visible = this.img_wrong.visible = false;
                this.btn_result1.disabled = this.btn_result2.disabled = false;
                let questiontab = info.getQuestTb();
                this.lab_question.text = questiontab.question;
                this.btn_result1.label = questiontab.left_option;
                this.btn_result2.label = questiontab.right_option;

                let list = ary2prop(questiontab.correct_reward);
                this.list_reward.array = list;
                this.list_reward.width = list.length * 80 + this.list_reward.spaceX * (list.length - 1);
            }

        }

        // private refreshResult(localId: number) {
        //     this.img_right.visible = this.img_wrong.visible = false;
        //     this.btn_result1.disabled = this.btn_result2.disabled = this._model.hasQuestion(localId);
        //     if (this._model.hasQuestion(localId)) {
        //         //该问题已回答过
        //         let questiontab = this.getQuestionTab(localId);
        //         let myAnswer = this._model.getQuestionAnswer(localId);
        //         this.img_wrong.visible = questiontab.correct_option != Number(myAnswer);
        //         this.img_right.visible = true;
        //         this.img_right.y = questiontab.correct_option == 1 ? 160 : 221;
        //         this.img_wrong.y = questiontab.correct_option == 1 ? 221 : 160;
        //     }
        // }

        private onCommit(e: Laya.Event) {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            if (info.tbRisk.type != RiskType.QUESTION) return;
            if(info.isExpire()) {
                showToast(LanMgr.getLan('', 10286));
                return;
            }
            let arg = {};
            arg[Protocol.game_risk_answer.args.riskKey] = info.key;
            arg[Protocol.game_risk_answer.args.id] = Number(e.target.name);
            PLC.request(Protocol.game_risk_answer, arg, ($data) => {
                if (!$data) return;
                info.setAnswer(Number(e.target.name));
                // logyhj("答题结果:", $data);
                if ($data.delRiskKey) {
                    this._model.delRiskInfo([$data.delRiskKey]);
                }
                let itemList = [];
                UIUtil.getRewardItemVoList(itemList, $data.commonData,false,false);
                let content = $data.commonData ? LanMgr.getLan("",12455) : LanMgr.getLan("",12456);
                let vo : QiyuResultVo = {title:LanMgr.getLan("",12454),content,itemList,callBack:this.toClose.bind(this)};
                UIMgr.showUI(UIConst.DFW_QiyuResultView,vo);
            });
            
        }

        private toClose():void {
            let info = this.dataSource as DafuwengVo;
            dispatchEvt(new DafuwengEvent(DafuwengEvent.DEL_QIYU_TAB),info?info.key:null);
        }
        
    }
}