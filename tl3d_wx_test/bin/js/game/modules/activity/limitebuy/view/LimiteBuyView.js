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
    var LimiteBuyView = /** @class */ (function (_super) {
        __extends(LimiteBuyView, _super);
        function LimiteBuyView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: "限时热购" };
            _this.list_tab.selectHandler = new Handler(_this, _this.onTabSelect);
            return _this;
        }
        LimiteBuyView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        LimiteBuyView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        LimiteBuyView.prototype.close = function (type, showEffect, sound) {
            this.list_tab.array = null;
            if (this._view_summon) {
                this._view_summon.uiScene.onExit();
                this._view_summon.dataSource = null;
                Laya.timer.clearAll(this._view_summon);
            }
            if (this._view_group) {
                Laya.timer.clearAll(this._view_group);
                this._view_group.dataSource = null;
            }
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        LimiteBuyView.prototype.initView = function () {
            this._tabTypes = [];
            var model = game.LimiteBuyModel.getInstance();
            //这个判断是判断哪些活动开启，冗余
            if (model.isOpenLimiteSummon()) {
                if (model.isOpenLimiteGroup()) {
                    // 两个切换图标
                    this._tabTypes = [game.LimiteBuyType.summon, game.LimiteBuyType.group];
                    this.list_tab.array = this._tabTypes;
                    // this.list_tab.repeatX = 2;
                }
                else {
                    this._tabTypes = [game.LimiteBuyType.summon];
                    this.list_tab.array = this._tabTypes;
                    // this.list_tab.repeatX = 1;
                }
            }
            else {
                if (model.isOpenLimiteGroup()) {
                    this._tabTypes = [game.LimiteBuyType.group];
                    this.list_tab.array = this._tabTypes;
                    // this.list_tab.repeatX = 1;
                }
                else {
                    this.list_tab.array = null;
                    if (UIMgr.getUIByName(UIConst.LimiteBuyView)) {
                        UIMgr.hideUIByName(UIConst.LimiteBuyView);
                        showToast(LanMgr.getLan('', 10223));
                    }
                }
            }
            this.list_tab.selectedIndex = 0;
            this.onTabSelect(0);
        };
        //限时活动切换
        LimiteBuyView.prototype.onTabSelect = function (index) {
            if (index == -1)
                return;
            if (!this._tabTypes || this._tabTypes.length == 0)
                return;
            var type = this._tabTypes[index];
            //构建页面数据
            var model = game.LimiteBuyModel.getInstance();
            if (this._view_summon) {
                this._view_summon.removeSelf();
            }
            if (this._view_group) {
                this._view_group.removeSelf();
            }
            if (type == game.LimiteBuyType.summon) {
                if (!this._view_summon) {
                    this._view_summon = new game.TabSummon();
                    this._view_summon.x = 31;
                    this._view_summon.y = 228;
                }
                this.setViewSummonData(model.getCurSummonList());
                this.addChild(this._view_summon);
                model.Lim_Summon_Rp = false;
            }
            else if (type == game.LimiteBuyType.group) {
                if (!this._view_group) {
                    this._view_group = new game.TabGroup();
                    this._view_group.x = 19;
                    this._view_group.y = 229;
                }
                this.setViewGroupData(model.getCurGroupList());
                this.addChild(this._view_group);
                model.Lim_Group_Rp = false;
            }
            else {
                UIMgr.hideUIByName(UIConst.LimiteBuyView);
            }
            this.list_tab.refresh();
            dispatchEvt(new game.LimiteBuyEvent(game.LimiteBuyEvent.UPDATE_RP));
        };
        LimiteBuyView.prototype.setViewGroupData = function (data) {
            if (this._view_group) {
                this._view_group.dataSource = data;
            }
        };
        LimiteBuyView.prototype.setViewSummonData = function (data) {
            if (this._view_summon) {
                this._view_summon.dataSource = data;
            }
        };
        return LimiteBuyView;
    }(ui.activity.limitebuy.LimiteBuyUI));
    game.LimiteBuyView = LimiteBuyView;
})(game || (game = {}));
