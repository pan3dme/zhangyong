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
    /** 商队信息界面 */
    var CaravanInfoView = /** @class */ (function (_super) {
        __extends(CaravanInfoView, _super);
        function CaravanInfoView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        CaravanInfoView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CaravanInfoView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CaravanInfoView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnRob.off(Laya.Event.CLICK, this, this.onRob);
            this.linuepList.array = null;
            this.rewardList.array = null;
            this.bgPanel.dataSource = null;
        };
        CaravanInfoView.prototype.initView = function () {
            var info = this.dataSource;
            this.ui_head.dataSource = new UserHeadVo(info.svo.head, info.svo.level, info.svo.headFrame);
            this.lbName.text = info.svo.name;
            this.lbGuild.text = info.svo.guildName ? info.svo.guildName : LanMgr.getLan("", 10063);
            this.lbShenli.text = LanMgr.getLan("", 10117, info.svo.force);
            this.linuepList.array = info.getExistGods();
            this.lbRobCnt.text = LanMgr.getLan("", 12434, game.EscortModel.getInstance().getRobCount());
            this.rewardList.array = info.tbEscort.getRobList();
            this.btnRob.on(Laya.Event.CLICK, this, this.onRob);
            this.bgPanel.dataSource = { uiName: UIConst.CaravanInfoView, closeOnSide: this.isModelClose, title: info.tbEscort.name };
        };
        CaravanInfoView.prototype.onRob = function () {
            dispatchEvt(new game.EscortEvent(game.EscortEvent.ROBBED_GOODS, this.dataSource));
        };
        return CaravanInfoView;
    }(ui.escort.CaravanInfoUI));
    game.CaravanInfoView = CaravanInfoView;
})(game || (game = {}));
