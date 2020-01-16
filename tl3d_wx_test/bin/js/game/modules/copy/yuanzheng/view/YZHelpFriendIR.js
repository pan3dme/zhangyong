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
    /** 支援好友 */
    var YZHelpFriendIR = /** @class */ (function (_super) {
        __extends(YZHelpFriendIR, _super);
        function YZHelpFriendIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(YZHelpFriendIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        YZHelpFriendIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = info;
                this.lbName.text = info.tab_god.name + "   " + LanMgr.godTypeName[info.tab_god.type];
                this.lbForce.text = LanMgr.getLan("", 10117, info.svrForce > 0 ? info.svrForce : info.getShenli());
                ;
                var isPaiq = !info.uuid || game.YuanzhengModel.getInstance().isDispatch(info.uuid);
                this.btnSelect.visible = !isPaiq;
                this.lbYipaiqian.visible = isPaiq;
                this.btnSelect.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.btnSelect.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        YZHelpFriendIR.prototype.onClick = function () {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            if (game.YuanzhengModel.getInstance().getDispatchNum() > 0) {
                showToast(LanMgr.getLan("", 10277));
                return;
            }
            var args = {};
            args[Protocol.friend_friendHelp_createFriendHelp.args.godId] = info.uuid;
            PLC.request(Protocol.friend_friendHelp_createFriendHelp, args, function (sdata, msg) {
                if (!sdata) {
                    return;
                }
                showToast(LanMgr.getLan("", 10278));
                var vo = game.YuanzhengModel.getInstance().addDispatchInfo(sdata['addHelpGodId'], sdata['addFriendHelp']);
                _this.dataSource = vo.godVo;
                _this.refreshView();
                if (UIMgr.hasStage(UIConst.Yuanzheng_HelpView)) {
                    var view = UIMgr.getUIByName(UIConst.Yuanzheng_HelpView);
                    view.godList = null;
                }
            });
        };
        return YZHelpFriendIR;
    }(ui.yuanzheng.HelpFriendIRUI));
    game.YZHelpFriendIR = YZHelpFriendIR;
})(game || (game = {}));
