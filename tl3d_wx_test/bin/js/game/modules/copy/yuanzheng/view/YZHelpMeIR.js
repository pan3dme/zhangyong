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
    var YZHelpMeIR = /** @class */ (function (_super) {
        __extends(YZHelpMeIR, _super);
        function YZHelpMeIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(YZHelpMeIR.prototype, "dataSource", {
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
        YZHelpMeIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = info.godVo;
                var tbGod = info.godVo.tab_god;
                this.lbName.text = tbGod.name + "   " + LanMgr.godTypeName[tbGod.type];
                this.lbForce.text = LanMgr.getLan("", 10117, info.force);
                this.lbFried.text = LanMgr.getLan("", 12474) + info.svo.name;
                this.lbYiguyong.visible = info.isHire();
                var isOver = info.isOverForce();
                this.lbLimit.visible = !info.isHire() && isOver;
                this.btnGuyong.visible = !info.isHire() && !isOver;
                this.btnGuyong.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.btnGuyong.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        YZHelpMeIR.prototype.onClick = function () {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            var model = game.YuanzhengModel.getInstance();
            var maxCount = tb.TB_copy_set.getCopySet().hire_num;
            if (model.getHireCount() >= maxCount) {
                showToast(LanMgr.getLan("", 10279, maxCount));
                return;
            }
            var args = {};
            args[Protocol.friend_friendHelp_hireFriendHelp.args.helpId] = info.svo.helpId;
            PLC.request(Protocol.friend_friendHelp_hireFriendHelp, args, function (sdata, msg) {
                if (!sdata) {
                    return;
                }
                showToast(LanMgr.getLan("", 10280));
                info.svo.isHire = true;
                model.addHireInfo(sdata['addFriendHelpList']);
                _this.refreshView();
                if (UIMgr.hasStage(UIConst.Yuanzheng_HelpView)) {
                    var view = UIMgr.getUIByName(UIConst.Yuanzheng_HelpView);
                    view.renderHelpMe();
                }
            });
        };
        return YZHelpMeIR;
    }(ui.yuanzheng.HelpMeIRUI));
    game.YZHelpMeIR = YZHelpMeIR;
})(game || (game = {}));
