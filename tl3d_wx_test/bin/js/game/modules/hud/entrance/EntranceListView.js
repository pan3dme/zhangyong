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
    var EntranceListView = /** @class */ (function (_super) {
        __extends(EntranceListView, _super);
        function EntranceListView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        EntranceListView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        EntranceListView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        EntranceListView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._mainFunction = null;
            this._functionList = null;
            this.btnlist.array = null;
            UIMgr.hideUIByName(UIConst.SysTopView);
            Laya.timer.clearAll(this);
            this.btnlist.scrollBar.touchScrollEnable = true;
        };
        /** 初始化界面 */
        EntranceListView.prototype.initView = function () {
            var _this = this;
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            var titleName = this.dialogInfo.uiname;
            UIUtil.showSysTopView({ viewName: titleName, resAry: resAry, funList: null, closeCallback: this.toClose.bind(this) });
            var type = this.dataSource ? this.dataSource : EntranceListView.LastType;
            EntranceListView.LastType = type;
            this._mainFunction = tb.TB_function.getSet(type);
            this._functionList = tb.TB_function.getFunctionListByType(type);
            this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.WANFA, 0, this._mainFunction.icon);
            this.btnlist.array = this._functionList;
            this.btnlist.visible = false;
            Laya.timer.frameOnce(1, this, function () {
                _this.btnlist.visible = true;
                UIUtil.listTween(_this.btnlist, function () {
                    if (game.GuideWeakManager.isExcuting()) {
                        _this.btnlist.scrollBar.touchScrollEnable = false;
                    }
                });
            });
        };
        /** 获取某个系统的IR */
        EntranceListView.prototype.getIRBySysid = function (sysid) {
            var index = this.getIRIndex(sysid);
            return this.btnlist.getCell(index);
        };
        EntranceListView.prototype.getIRIndex = function (sysid) {
            return this._functionList.findIndex(function (tbObj) {
                return tbObj.system_id == sysid;
            });
        };
        EntranceListView.prototype.toClose = function () {
            UIMgr.showUI(UIConst.GuajiView);
        };
        EntranceListView.LastType = 100;
        return EntranceListView;
    }(ui.hud.entrance.EntranceListUI));
    game.EntranceListView = EntranceListView;
})(game || (game = {}));
