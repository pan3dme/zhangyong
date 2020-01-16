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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var YZHelpView = /** @class */ (function (_super) {
        __extends(YZHelpView, _super);
        function YZHelpView() {
            return _super.call(this) || this;
        }
        YZHelpView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.Yuanzheng_RewardView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12471) };
            this.tabbar.selectedIndex = -1;
            this.tabbar.selectHandler = new Handler(this, this.onSelect);
            this.listHelpFriend.array = null;
            this.listHelpMe.array = null;
            this._model = game.YuanzhengModel.getInstance();
        };
        YZHelpView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        YZHelpView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        YZHelpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabbar.selectedIndex = -1;
            this.listHelpFriend.array = null;
            this.listHelpMe.array = null;
            this.godList = null;
        };
        YZHelpView.prototype.initView = function () {
            this.tabbar.selectedIndex = 0;
        };
        YZHelpView.prototype.onSelect = function (index) {
            var _this = this;
            if (index < 0)
                return;
            var helpMe = index == 0;
            this.lbCount.visible = this.lbHelpMeDesc.visible = this.listHelpMe.visible = helpMe;
            this.lbHelpFriendDesc.visible = this.listHelpFriend.visible = !helpMe;
            this.boxEmpty.visible = helpMe;
            if (helpMe) {
                this._model.requestHelpMeList().then(function () {
                    _this.renderHelpMe();
                });
            }
            else {
                this._model.requestDispatchList().then(function () {
                    _this.renderHelpFriend();
                });
            }
        };
        YZHelpView.prototype.renderHelpMe = function () {
            var model = this._model;
            var list = model.getHelpMeList();
            ;
            this.listHelpMe.array = list;
            this.boxEmpty.visible = list.length == 0;
            this.lbHelpMeDesc.text = LanMgr.getLan("", 12473, tb.TB_copy_set.getCopySet().hire_fight_percent);
            this.lbCount.text = LanMgr.getLan("", 12472, model.getHireCount(), tb.TB_copy_set.getCopySet().hire_num);
        };
        YZHelpView.prototype.renderHelpFriend = function () {
            var _this = this;
            if (!this.godList) {
                // 显示神力前20且等级大于30级的英雄
                this.godList = [];
                var godAry = __spreadArrays(App.hero.getGodArr());
                godAry.sort(function (a, b) {
                    return b.getShenli() - a.getShenli();
                });
                this.godList = godAry.filter(function (vo, index) {
                    return index < 20 && vo.level >= game.YuanzhengModel.SHANGZHEN_LEVEL && !_this._model.isDispatch(vo.uuid);
                });
                var model = this._model;
                for (var _i = 0, _a = model.getMyDispatchList(); _i < _a.length; _i++) {
                    var vo = _a[_i];
                    this.godList.unshift(vo.godVo);
                }
            }
            this.listHelpFriend.array = this.godList;
            this.boxEmpty.visible = false;
        };
        return YZHelpView;
    }(ui.yuanzheng.HelpViewUI));
    game.YZHelpView = YZHelpView;
})(game || (game = {}));
