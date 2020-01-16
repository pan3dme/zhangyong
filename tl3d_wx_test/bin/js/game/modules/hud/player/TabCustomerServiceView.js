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
    var TabCustomerServiceView = /** @class */ (function (_super) {
        __extends(TabCustomerServiceView, _super);
        function TabCustomerServiceView() {
            return _super.call(this) || this;
        }
        TabCustomerServiceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.cbBug.selected = true;
            this.cbTips.selected = false;
            this.cbBug.on(Laya.Event.CLICK, this, this.onBugSelc);
            this.cbTips.on(Laya.Event.CLICK, this, this.onTipSelc);
            this.lbFankui.on(Laya.Event.INPUT, this, this.onLabelChg);
            this.btn_sure.on(Laya.Event.CLICK, this, this.onFankuiSure);
        };
        TabCustomerServiceView.prototype.close = function () {
            // super.close();
        };
        TabCustomerServiceView.prototype.show = function () {
            // super.show();
            this.initView();
        };
        TabCustomerServiceView.prototype.initView = function () {
        };
        TabCustomerServiceView.prototype.onBugSelc = function (event) {
            this.cbBug.selected = true;
            this.cbTips.selected = false;
        };
        TabCustomerServiceView.prototype.onTipSelc = function (event) {
            this.cbBug.selected = false;
            this.cbTips.selected = true;
        };
        /** 内容变化 */
        TabCustomerServiceView.prototype.onLabelChg = function () {
            if (this.lbFankui.text.length > 200) {
                showToast(LanMgr.getLan("", 10436));
                this.lbFankui.text = this.lbFankui.text.slice(0, 200);
            }
        };
        /** 提交反馈 */
        TabCustomerServiceView.prototype.onFankuiSure = function () {
            var _this = this;
            var ct = this.lbFankui.text.trim();
            if (!ct || ct == "") {
                showToast(LanMgr.getLan("", 10437));
                return;
            }
            if (3 - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.userQuestionNum) <= 0) {
                showToast(LanMgr.getLan("", 10438));
                return;
            }
            var args = {};
            args[Protocol.game_api_userQuestion.args.content] = ct;
            args[Protocol.game_api_userQuestion.args.type] = this.cbBug.selected ? 1 : 2;
            PLC.request(Protocol.game_api_userQuestion, args, function (data, msg) {
                if (!data) {
                    showToast(LanMgr.getLan("", 10439));
                    return;
                }
                showToast(LanMgr.getLan("", 10484));
                _this.lbFankui.text = "";
                //进入游戏
                var hero = App.hero;
                var sinfo = window.platform.serverInfo;
                BingoSDK.gameReport("kf", hero.playerId, hero.accountName, sinfo.serverId, sinfo.srv_name, { level: hero.level, vip: hero.vip, charge: hero.welfare.rechargeSum });
            });
        };
        return TabCustomerServiceView;
    }(ui.hud.player.TabCustomerServiceUI));
    game.TabCustomerServiceView = TabCustomerServiceView;
})(game || (game = {}));
