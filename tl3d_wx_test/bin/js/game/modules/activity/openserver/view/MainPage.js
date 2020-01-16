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
    var OsMainPage = /** @class */ (function (_super) {
        __extends(OsMainPage, _super);
        function OsMainPage() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list_tab.selectHandler = new Handler(_this, _this.onTabSelect);
            _this.list_tab.renderHandler = new Handler(_this, _this.onTabRender);
            _this.model = game.OpenserverModel.getInstance();
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            return _this;
        }
        OsMainPage.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        OsMainPage.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        OsMainPage.prototype.init = function () {
            this._selectTabNum = -1;
            this.list_tab.array = this.model.getList();
            this.list_tab.selectedIndex = 0;
            this.list_tab.scrollTo(0);
            this.onLoop();
            this.lab_time.timerLoop(10000, this, this.onLoop);
        };
        OsMainPage.prototype.onLoop = function () {
            if (this.model.needtime()) {
                this.lab_time.text = this.model.onTime();
                this.list_tab.refresh();
            }
            else {
                this.lab_time.text = LanMgr.getLan("", 11010);
                this.lab_time.clearTimer(this, this.onLoop);
            }
        };
        OsMainPage.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        /**
         * 接收tab数据
         */
        OsMainPage.prototype.onData = function (vo) {
            this.ui_tab.dataSource = vo;
        };
        OsMainPage.prototype.onTabSelect = function ($index) {
            if ($index == -1)
                return;
            if (this._selectTabNum == $index)
                return;
            var vo = this.list_tab.array[$index];
            if (!vo.isopen()) {
                showToast(LanMgr.getLan("", 10143));
                return;
            }
            this._selectTabNum = $index;
            this.onData(vo);
            this.list_tab.selectedIndex = -1;
        };
        OsMainPage.prototype.onTabRender = function ($cell, $index) {
            $cell.btn_tab.selected = $index == this._selectTabNum;
        };
        OsMainPage.prototype.updateTab = function () {
            var vo = this.list_tab.array[this._selectTabNum];
            this.onData(vo);
        };
        OsMainPage.prototype.close = function () {
            _super.prototype.close.call(this);
            this._selectTabNum = -1;
            this.ui_tab.dataSource = null;
            this.ui_tab.closePanel();
            this.lab_time.clearTimer(this, this.onLoop);
        };
        OsMainPage.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return OsMainPage;
    }(ui.activity.openserver.mainPageUI));
    game.OsMainPage = OsMainPage;
})(game || (game = {}));
