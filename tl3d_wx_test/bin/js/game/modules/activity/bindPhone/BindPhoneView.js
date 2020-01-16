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
    var BindPhoneView = /** @class */ (function (_super) {
        __extends(BindPhoneView, _super);
        function BindPhoneView() {
            var _this = _super.call(this) || this;
            _this.btn_recive.on(Laya.Event.CLICK, _this, _this.onRecive);
            return _this;
        }
        BindPhoneView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
        };
        BindPhoneView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        BindPhoneView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateView, this);
            this.bgPanel.dataSource = null;
        };
        BindPhoneView.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateView, this);
            this.bgPanel.dataSource = { title: "yunyingxuqiu/bangdingshouji.png" };
            this.updateView();
        };
        BindPhoneView.prototype.updateView = function () {
            var tabset = tb.TB_activity_set.getTabSet();
            var list = ary2prop(tabset.phone_bind_reward);
            this.list_reward.array = list;
            this.list_reward.width = list.length * 100 + (list.length - 1) * this.list_reward.spaceX;
            this.refreshState();
        };
        BindPhoneView.prototype.refreshState = function () {
            //绑定状态
            var bindok = App.hero.bindPhone == 1;
            //领取状态
            var receiveok = App.hero.bindMobileAward != 0;
            var canreceiveFlag = bindok && !receiveok;
            this.btn_recive.skin = canreceiveFlag ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_recive.labelStrokeColor = canreceiveFlag ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
            this.btn_recive.label = receiveok ? "已领取" : bindok ? "领取" : "立即绑定";
            this.btn_recive.gray = receiveok;
            this.btn_recive.selected = this.btn_recive.gray;
        };
        BindPhoneView.prototype.onRecive = function () {
            var _this = this;
            //领取状态
            var receiveok = App.hero.bindMobileAward != 0;
            if (receiveok) {
                showToast(LanMgr.getLan('', 10043));
                return;
            }
            //绑定状态
            var bindok = App.hero.bindPhone == 1;
            if (!bindok) {
            }
            //领奖励
            PLC.request(Protocol.game_welfare_getBindMobileAward, null, function ($data, $msg) {
                if (!$data)
                    return;
                App.hero.bindMobileAward = $data.bindMobileAward;
                _this.refreshState();
                UIUtil.showRewardView($data.commonData);
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.BIND_PHONE_EVENT));
            });
        };
        return BindPhoneView;
    }(ui.activity.bindPhone.BindPhoneUI));
    game.BindPhoneView = BindPhoneView;
})(game || (game = {}));
