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
    var questionPanel = /** @class */ (function (_super) {
        __extends(questionPanel, _super);
        function questionPanel() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.btn_result1.on(Laya.Event.CLICK, _this, _this.onCommit);
            _this.btn_result2.on(Laya.Event.CLICK, _this, _this.onCommit);
            _this._model = game.DafuwengModel.getInstance();
            return _this;
        }
        questionPanel.prototype.close = function () {
            // super.close();
            this.lab_question.text = '';
            this.btn_result1.label = '';
            this.btn_result2.label = '';
        };
        questionPanel.prototype.initView = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var tbRisk = info.tbRisk;
            if (tbRisk.type == game.RiskType.QUESTION) {
                this.img_right.visible = this.img_wrong.visible = false;
                this.btn_result1.disabled = this.btn_result2.disabled = false;
                var questiontab = info.getQuestTb();
                this.lab_question.text = questiontab.question;
                this.btn_result1.label = questiontab.left_option;
                this.btn_result2.label = questiontab.right_option;
                var list = ary2prop(questiontab.correct_reward);
                this.list_reward.array = list;
                this.list_reward.width = list.length * 80 + this.list_reward.spaceX * (list.length - 1);
            }
        };
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
        questionPanel.prototype.onCommit = function (e) {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            if (info.tbRisk.type != game.RiskType.QUESTION)
                return;
            if (info.isExpire()) {
                showToast(LanMgr.getLan('', 10286));
                return;
            }
            var arg = {};
            arg[Protocol.game_risk_answer.args.riskKey] = info.key;
            arg[Protocol.game_risk_answer.args.id] = Number(e.target.name);
            PLC.request(Protocol.game_risk_answer, arg, function ($data) {
                if (!$data)
                    return;
                info.setAnswer(Number(e.target.name));
                // logyhj("答题结果:", $data);
                if ($data.delRiskKey) {
                    _this._model.delRiskInfo([$data.delRiskKey]);
                }
                var itemList = [];
                UIUtil.getRewardItemVoList(itemList, $data.commonData, false, false);
                var content = $data.commonData ? LanMgr.getLan("", 12455) : LanMgr.getLan("", 12456);
                var vo = { title: LanMgr.getLan("", 12454), content: content, itemList: itemList, callBack: _this.toClose.bind(_this) };
                UIMgr.showUI(UIConst.DFW_QiyuResultView, vo);
            });
        };
        questionPanel.prototype.toClose = function () {
            var info = this.dataSource;
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.DEL_QIYU_TAB), info ? info.key : null);
        };
        return questionPanel;
    }(ui.dafuweng.questionPanelUI));
    game.questionPanel = questionPanel;
})(game || (game = {}));
