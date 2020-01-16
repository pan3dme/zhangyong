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
    var MainPage = /** @class */ (function (_super) {
        __extends(MainPage, _super);
        function MainPage() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.PowerRank, closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12633) };
            _this.list_tab.selectHandler = new Handler(_this, _this.onTabSelect);
            _this.list_tab.renderHandler = new Handler(_this, _this.onTabRender);
            return _this;
        }
        MainPage.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        MainPage.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        MainPage.prototype.init = function () {
            this.list_tab.dataSource = this.getTabList();
            this.setSelectTabNum(~~this.list_tab.dataSource.findIndex(function (vo) { return vo[2].ID == game.PowerrankModel.getInstance().curRankID; }));
            Laya.timer.clearAll(this);
            var time = App.getServerTime() % TimeConst.ONE_DAY_SEC;
            time += 10; //过天延迟10秒刷新
            Laya.timer.once(time * 1000, this, this.init);
        };
        //获取列表
        MainPage.prototype.getTabList = function () {
            var list = [];
            var tempData = TableData.getInstance().getTableByName(TableData.tb_rank_type).data;
            for (var key in tempData) {
                if (tempData[key]) {
                    var temp = tempData[key];
                    var time = App.getServerTime() - App.getOpenServerTime();
                    if (temp.isShowActivityBtn(time)) {
                        var obj = [];
                        obj[0] = this.getTabName(temp.ID);
                        obj[1] = "shenjie" + temp.ID;
                        obj[2] = temp;
                        list.push(obj);
                    }
                }
            }
            //排序
            list.sort(function (a, b) {
                return b[2].time[0] - a[2].time[0];
            });
            return list;
        };
        MainPage.prototype.getTabName = function (id) {
            switch (id) {
                case game.PrRankVo.ID_FUBEN:
                    return LanMgr.getLan("", 12634);
                case game.PrRankVo.ID_LEVEL:
                    return LanMgr.getLan("", 12635);
                case game.PrRankVo.ID_SHENLING:
                    return LanMgr.getLan("", 12636);
                case game.PrRankVo.ID_SHILIAN:
                    return LanMgr.getLan("", 12183);
                case game.PrRankVo.ID_ZHANLI:
                    return LanMgr.getLan("", 12637);
                default:
                    return "";
            }
        };
        MainPage.prototype.setSelectTabNum = function (value) {
            this.list_tab.selectedIndex = value;
            this.list_tab.refresh();
        };
        MainPage.prototype.onTabSelect = function (index) {
            if (index < 0)
                return;
            dispatchEvt(new game.PowerrankEvent(game.PowerrankEvent.SHOW_VIEW_EVENT), this.list_tab.dataSource[index][2].ID);
        };
        MainPage.prototype.onTabRender = function ($cell, $index) {
            $cell.btn_tab.selected = $index == this.list_tab.selectedIndex;
        };
        //更新数据
        MainPage.prototype.updateData = function (data) {
            this.mainview.dataSource = data;
            this.mainview.init();
        };
        MainPage.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.updateData(this.dataSource);
        };
        MainPage.prototype.close = function () {
            _super.prototype.close.call(this);
            this.mainview.close();
        };
        MainPage.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.mainview.close();
            game.PowerrankModel.getInstance().rankingList = {};
            Laya.timer.clearAll(this);
        };
        return MainPage;
    }(ui.activity.powerrank.mainPageUI));
    game.MainPage = MainPage;
})(game || (game = {}));
