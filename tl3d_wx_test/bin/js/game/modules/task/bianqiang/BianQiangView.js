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
    var BianQiangView = /** @class */ (function (_super) {
        __extends(BianQiangView, _super);
        function BianQiangView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.BianQiangView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12149) };
            return _this;
        }
        BianQiangView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        BianQiangView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        BianQiangView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnClose.off(Laya.Event.CLICK, this, this.close);
            tl3d.ModuleEventManager.removeEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.onReresh, this);
        };
        /** 初始化界面 */
        BianQiangView.prototype.initView = function () {
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
            this.tabBar.selectHandler = new Laya.Handler(this, this.onTabSel);
            this.tabBar.selectedIndex = this.dataSource ? parseInt(this.dataSource) : 0;
            this.onTabSel(this.tabBar.selectedIndex);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.onReresh, this);
        };
        /** tab切换 0:变强 1：挑战 */
        BianQiangView.prototype.onTabSel = function (index) {
            this.viewStack.selectedIndex = index;
            if (index == 0) {
                this.BianQiangList.array = this.getBianQiangList();
            }
            else if (index == 1) {
                this.challengeList.array = game.BianQiangModel.getInstance().filterChallengeTask();
            }
        };
        //获取变强列表
        BianQiangView.prototype.getBianQiangList = function () {
            var arr = tb.TB_growth_guide.getGrowthGuideList();
            var need = [];
            for (var i = 0; i < arr.length; i++) {
                if (this.isOpenSys(arr[i].link)) {
                    need.push(arr[i]);
                }
            }
            return need;
        };
        //是否开启
        BianQiangView.prototype.isOpenSys = function (link) {
            if (!link || !Array.isArray(link) || link.length < 1)
                return false;
            var sysID = link[0];
            var param1 = link[1];
            var param2 = link[2];
            var tbSys = tb.TB_sys_open.get_TB_sys_openById(parseInt(sysID));
            /** 判断系统是否开启 */
            if (tbSys && !App.IsSysOpen(tbSys.ID)) {
                return false;
            }
            return true;
        };
        /** 刷新列表 -- 顺序改变 */
        BianQiangView.prototype.resetTaskList = function () {
            if (this.viewStack.selectedIndex == 1) {
                this.challengeList.array = game.BianQiangModel.getInstance().filterChallengeTask();
            }
        };
        /** 任务数据更新 */
        BianQiangView.prototype.onReresh = function () {
            if (this.viewStack.selectedIndex == 1) {
                this.challengeList.refresh();
            }
        };
        return BianQiangView;
    }(ui.task.bianqiang.BianQiangUI));
    game.BianQiangView = BianQiangView;
})(game || (game = {}));
