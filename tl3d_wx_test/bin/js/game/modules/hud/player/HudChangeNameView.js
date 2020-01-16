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
    var HudChangeNameView = /** @class */ (function (_super) {
        __extends(HudChangeNameView, _super);
        function HudChangeNameView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_queding.on(Laya.Event.CLICK, _this, _this.onChange);
            _this.lab_diamonds.text = tb.TB_game_set.get_TB_game_setById(1).modify_name_cost[1].toString();
            _this.bgPanel.dataSource = { uiName: UIConst.Hud_ChangeNameView, closeOnSide: _this.isModelClose, title: "修改昵称" };
            return _this;
        }
        HudChangeNameView.prototype.popup = function () {
            _super.prototype.popup.call(this);
        };
        HudChangeNameView.prototype.onChange = function () {
            var _this = this;
            if (!this.textInput.text || this.textInput.text == "") {
                showToast(LanMgr.getLan('', 10129));
            }
            else if (App.hero.diamond < tb.TB_game_set.get_TB_game_setById(1).modify_name_cost[1]) {
                showToast(LanMgr.getLan('', 10130));
            }
            else if (this.lengthCount()) {
                showToast(LanMgr.getLan('', 10068));
            }
            else if (this.haveBlockWord()) {
                showToast(LanMgr.getLan('', 10132));
            }
            else {
                var args = {};
                args[Protocol.game_common_changePlayerName.args.newName] = this.textInput.text;
                PLC.request(Protocol.game_common_changePlayerName, args, function ($data, $msg) {
                    if ($data) {
                        App.hero.name = $data.name;
                        dispatchEvt(new game.HudEvent(game.HudEvent.SET_NAME));
                        _this.close();
                    }
                });
            }
        };
        HudChangeNameView.prototype.lengthCount = function () {
            var len = 0;
            var str = this.textInput.text;
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f))
                    len++;
                else
                    len += 2;
            }
            return len > 12;
        };
        HudChangeNameView.prototype.haveBlockWord = function () {
            return false;
        };
        HudChangeNameView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.textInput.text = "";
        };
        return HudChangeNameView;
    }(ui.hud.player.ChangeNameUI));
    game.HudChangeNameView = HudChangeNameView;
})(game || (game = {}));
