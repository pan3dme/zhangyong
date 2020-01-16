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
    var CreateRoleView = /** @class */ (function (_super) {
        __extends(CreateRoleView, _super);
        function CreateRoleView() {
            var _this = _super.call(this) || this;
            _this.popupCenter = true;
            _this.btn_ok.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_random.on(Laya.Event.CLICK, _this, _this.onRandom);
            _this.edit_name.text = tb.TB_random_name.getRandomName(Math.random() < 0.5 ? 0 : 1);
            return _this;
        }
        CreateRoleView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            if (!DialogExt.manager.mouseEnabled) {
                DialogExt.manager.mouseEnabled = true;
            }
        };
        CreateRoleView.prototype.onClick = function () {
            var _this = this;
            var obj = checkUserName(this.edit_name.text);
            if (obj.state != 3) {
                if (obj.strlen > 12) {
                    showToast(LanMgr.getLan('', 10068));
                    return;
                }
                else if (obj.strlen < 1) {
                    showToast(LanMgr.getLan('', 10012));
                    return;
                }
                //发送请求
                var args = {};
                args[Protocol.game_common_changePlayerData.args.name] = this.edit_name.text;
                args[Protocol.game_common_changePlayerData.args.sex] = 0;
                PLC.request(Protocol.game_common_changePlayerData, args, function ($data) {
                    if (!$data)
                        return;
                    App.hero.name = $data.name;
                    App.hero.sex = $data.sex;
                    App.hero.isNewPlayer = 1;
                    App.hero.updateSelfHead();
                    //sdk数据上报
                    BingoSDK.gameReport("enterGame", App.hero.uid, App.hero.name, 'HOODINN', window.platform.serverInfo.serverId, { level: App.hero.level, vipLevel: App.hero.vip, score: 0, isNew: 1, shareRole: 0 });
                    dispatchEvt(new game.HudEvent(game.HudEvent.SET_NAME));
                    _this.close();
                });
            }
            else {
                showToast(LanMgr.getLan('', 10069));
                return;
            }
        };
        CreateRoleView.prototype.onRandom = function (e) {
            AudioMgr.playSound();
            this.edit_name.text = tb.TB_random_name.getRandomName(Math.random() < 0.5 ? 0 : 1);
        };
        CreateRoleView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            game.GuideManager.startInit();
        };
        return CreateRoleView;
    }(ui.login.CreateRoleUI));
    game.CreateRoleView = CreateRoleView;
})(game || (game = {}));
