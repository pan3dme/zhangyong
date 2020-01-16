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
/**
* name
*/
var game;
(function (game) {
    var RealNameView = /** @class */ (function (_super) {
        __extends(RealNameView, _super);
        function RealNameView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.RealNameView, closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12625) };
            _this.btnSure.on(Laya.Event.CLICK, _this, _this.onClick);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.ISCERTIFICATION_EVENT, _this.refresh, _this);
            return _this;
        }
        RealNameView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        RealNameView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        RealNameView.prototype.init = function () {
            this.btnSure.gray = this.btnSure.selected = App.hero.welfare.autonymAwardNum == 1;
            this.btnSure.label = (App.hero.welfare.autonymAwardNum == 0 && App.hero.isCertification == 0) ? LanMgr.getLan("", 12626) : App.hero.welfare.autonymAwardNum == 1 ? LanMgr.getLan("", 10043) : LanMgr.getLan("", 12627);
            this.itemList.dataSource = tb.TB_activity_set.getTabSet().autonym_rewrad.map(function (vo) { return new ItemVo(vo[0], vo[1]); });
            listAtCenter(this.itemList, 319, 3, this.itemList.dataSource.length);
        };
        RealNameView.prototype.refresh = function () {
            this.init();
        };
        RealNameView.prototype.onClick = function () {
            var _this = this;
            logyhj("实名认证结果：%d %d", App.hero.isCertification, App.hero.isIndulge, App.hero.welfare.autonymAwardNum);
            if (App.hero.welfare.autonymAwardNum == 0 && App.hero.isCertification == 0) {
                BingoSDK.doExtraAction("realNameAuth", function (result) {
                    logyhj("实名认证结果回调");
                    // result.code     //0 成功
                    // result.message //错误描述
                    // result.data.status  // 0: 未认证，1: 认证成年 2：认证未成年
                    // result.data.gameTime //玩家游戏时间，目前QQ大厅返回，用于防成迷
                    if (result.code == 0) {
                        game.RealNameModel.RealNameOpt(result.data.status);
                    }
                    else {
                        showToast(result.message);
                    }
                });
            }
            else if (App.hero.welfare.autonymAwardNum == 0) {
                PLC.request(Protocol.game_welfare_getAutonymAward, null, function ($data, $msg) {
                    if (!$data)
                        return;
                    _this.btnSure.label = LanMgr.getLan("", 10043);
                    UIUtil.showRewardView($data['commonData']);
                    _this.btnSure.gray = _this.btnSure.selected = true;
                    dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
                });
            }
            else {
                showToast(LanMgr.getLan("", 10228));
            }
        };
        return RealNameView;
    }(ui.activity.realName.realNameUI));
    game.RealNameView = RealNameView;
})(game || (game = {}));
