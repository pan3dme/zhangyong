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
    var GuildHelpView = /** @class */ (function (_super) {
        __extends(GuildHelpView, _super);
        function GuildHelpView() {
            return _super.call(this) || this;
        }
        GuildHelpView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GuildHelpModel.getInstance();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "公会救援" };
            this.tabbar.selectedIndex = -1;
            this.tabbar.selectHandler = new Handler(this, this.onSelect);
            this.tabbar.onSelectBefore = this.onSelectBefore.bind(this);
            this.myHelpUI.btnAskHelp.on(Laya.Event.CLICK, this, this.onAskHelp);
            this.myHelpUI.imgBaoxiang.on(Laya.Event.CLICK, this, this.onBaoxiang);
            this.myHelpUI.listHelp.array = null;
            this.othersHelpUI.listHelp.array = null;
        };
        GuildHelpView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildHelpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabbar.selectedIndex = -1;
            this.clearOthersUI();
            this.clearMyUI();
            Laya.timer.clearAll(this);
        };
        GuildHelpView.prototype.initView = function () {
            var index = this.dataSource || 0;
            this.tabbar.selectedIndex = index;
        };
        GuildHelpView.prototype.onSelectBefore = function (index, callback) {
            if (index == 0) {
                this._model.requestMyHelpList().then(function () {
                    callback();
                });
            }
            else if (index == 1) {
                this._model.requestOthersHelpList().then(function () {
                    callback();
                });
            }
            else {
                callback();
            }
        };
        GuildHelpView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            index == 0 ? this.initMyHelpUI() : this.initOthersHelpUI();
        };
        // -------------  我的求助  -------------
        /** 初始化我的求援界面 */
        GuildHelpView.prototype.initMyHelpUI = function () {
            this.clearOthersUI();
            this.updateMyListSimple();
            this.updateBaoxiangState();
            this.updateInterval();
        };
        GuildHelpView.prototype.updateInterval = function () {
            var model = this._model;
            // 没有全部完成才需要定时刷新数据
            Laya.timer.clear(this, this.intervalReuqestMy);
            if (model.getAskHelpNum() > 0 && !model.isAllFinish()) {
                Laya.timer.loop(10000, this, this.intervalReuqestMy);
            }
        };
        /** 定时请求 -- 简易更新列表 */
        GuildHelpView.prototype.intervalReuqestMy = function () {
            var _this = this;
            this._model.requestMyHelpList()
                .then(function () {
                _this.updateMyListSimple();
            });
        };
        /** 更新宝箱状态 */
        GuildHelpView.prototype.updateBaoxiangState = function () {
            var model = this._model;
            var ui = this.myHelpUI;
            if (model.isCanRewardBX()) {
                ui.animBX.play(0, true);
                ui.animGuang.visible = true;
                ui.animGuang.play(0, true);
            }
            else {
                ui.animGuang.visible = false;
                ui.animGuang.gotoAndStop(0);
                ui.animBX.gotoAndStop(0);
            }
            ui.imgBaoxiang.skin = model.isReawrdBX() ? SkinUtil.help_bx_open : SkinUtil.help_bx_noopen;
        };
        /** 简易更新列表 -- 只更新列表及次数 */
        GuildHelpView.prototype.updateMyListSimple = function () {
            var model = this._model;
            var ui = this.myHelpUI;
            ui.lbNum.text = "\u4ECA\u65E5\u6C42\u63F4\u5B8C\u6210\u6B21\u6570\uFF08" + model.getRewardFinishNum() + "/" + tb.TB_guild_set.getSet().daily_help_num + "\uFF09";
            ui.listHelp.array = model.getMyHelps();
        };
        GuildHelpView.prototype.onAskHelp = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SEND_CHAT_HELP));
        };
        GuildHelpView.prototype.onBaoxiang = function () {
            dispatchEvt(new game.GuildEvent(game.GuildEvent.HELP_CLICK_BAOXIANG));
        };
        GuildHelpView.prototype.clearMyUI = function () {
            var ui = this.myHelpUI;
            ui.listHelp.array = null;
            ui.animGuang.visible = false;
            ui.animGuang.gotoAndStop(0);
            ui.animBX.gotoAndStop(0);
            Laya.timer.clear(this, this.intervalReuqestMy);
        };
        // -------------  公会成员的求助  -------------
        GuildHelpView.prototype.initOthersHelpUI = function () {
            this.clearMyUI();
            this.updateOtherHelpUI();
            Laya.timer.clear(this, this.intervalRequestOthers);
            Laya.timer.loop(10000, this, this.intervalRequestOthers);
        };
        /** 定时请求公会援助列表 */
        GuildHelpView.prototype.intervalRequestOthers = function () {
            var _this = this;
            this._model.requestOthersHelpList()
                .then(function () {
                _this.updateOtherHelpUI();
            });
        };
        /** 更新公会援助 */
        GuildHelpView.prototype.updateOtherHelpUI = function () {
            var model = this._model;
            var ui = this.othersHelpUI;
            ui.lbNum.text = model.isFreeHelp() ? "\u514D\u8D39\u63F4\u52A9\u6B21\u6570\uFF1A" + model.getFreeHelpNum() : "\u94BB\u77F3\u63F4\u52A9\u6B21\u6570\uFF1A" + model.getCostNum();
            var list = model.getOthersHelp();
            ui.listHelp.array = list;
            ui.boxEmpty.visible = list.length == 0;
            ui.listHelp.visible = list.length > 0;
        };
        /** 清除工会援助UI数据 */
        GuildHelpView.prototype.clearOthersUI = function () {
            var ui = this.othersHelpUI;
            ui.listHelp.array = null;
            Laya.timer.clear(this, this.intervalRequestOthers);
        };
        return GuildHelpView;
    }(ui.guild.help.HelpMainViewUI));
    game.GuildHelpView = GuildHelpView;
})(game || (game = {}));
