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
    var TowerGuanqiaView = /** @class */ (function (_super) {
        __extends(TowerGuanqiaView, _super);
        function TowerGuanqiaView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.SLT_GuanqiaView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12127) };
            _this.btnChallenge.on(Laya.Event.CLICK, _this, _this.onChallenge);
            return _this;
        }
        TowerGuanqiaView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerGuanqiaView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TowerGuanqiaView.prototype.initView = function () {
            this._tbCopyInfo = this.dataSource;
            var copyInfo = this._tbCopyInfo;
            this.lbTitle.text = LanMgr.getLan('', 10019) + copyInfo.name;
            var isOpen = true;
            //条件
            var power = copyInfo.getConditionVal(CopyConditionType.power);
            if (App.hero.force < power) {
                this.lab_condition.text = LanMgr.getLan("", 12128, power);
                isOpen = false;
            }
            else {
                var tbCopy = tb.TB_copy.get_TB_copyById(copyInfo.area);
                var guanka = game.TowerModel.getInstance().getGuanqiaModelVo(tbCopy.sub_type).getGuanqiaVo(copyInfo.ID);
                if (App.hero.level < guanka.getOpenLevel()) {
                    //等级未达到
                    this.lab_condition.text = LanMgr.getLan("", 12129, guanka.getOpenLevel());
                    isOpen = false;
                }
                else {
                    this.lab_condition.text = "";
                }
            }
            var list = copyInfo.getRewardItems();
            this.listReward.array = list;
            this.listReward.width = 100 * list.length + (list.length - 1) * this.listReward.spaceX;
            var copyType = tb.TB_copy.get_TB_copyById(copyInfo.area).type;
            var monsters = copyType == iface.tb_prop.copyTypeKey.underground ? copyInfo.getIconMonster() : copyInfo.getIconMonster();
            this.lineupUI.dataSource = { lineupGods: monsters, shenqiAry: [], showShenli: false, title: LanMgr.getLan("", 10020) };
            this.height = isOpen ? 810 : 830;
        };
        TowerGuanqiaView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._tbCopyInfo = null;
            this.lineupUI.dataSource = null;
            this.listReward.array = null;
        };
        TowerGuanqiaView.prototype.onChallenge = function () {
            if (!this._tbCopyInfo)
                return;
            var tbCopy = tb.TB_copy.get_TB_copyById(this._tbCopyInfo.area);
            if (tbCopy.type == iface.tb_prop.copyTypeKey.tower) {
                dispatchEvt(new game.TowerEvent(game.TowerEvent.CHALLENGE_GUANQIA, this._tbCopyInfo));
            }
            UIMgr.hideUIByName(UIConst.SLT_GuanqiaView);
        };
        TowerGuanqiaView.prototype.getCopyInfo = function () {
            return this._tbCopyInfo || this.dataSource;
        };
        return TowerGuanqiaView;
    }(ui.tower.GuanqiaViewUI));
    game.TowerGuanqiaView = TowerGuanqiaView;
})(game || (game = {}));
