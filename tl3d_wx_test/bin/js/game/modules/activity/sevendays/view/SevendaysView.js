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
    var SevendaysView = /** @class */ (function (_super) {
        __extends(SevendaysView, _super);
        function SevendaysView() {
            var _this = _super.call(this) || this;
            _this.selectTodayNum = 0;
            _this.selectDaysNum = 0;
            _this.list_today.selectHandler = new Handler(_this, _this.onListTodaysSelect);
            _this.list_today.renderHandler = new Handler(_this, _this.onListTodaysRender);
            _this.list_days.selectHandler = new Handler(_this, _this.onListDaysSelect);
            _this.list_days.renderHandler = new Handler(_this, _this.onListDaysRender);
            _this.btn_sevenDay.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.SevendaysView, closeOnSide: _this.isModelClose, closeOnButton: true };
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        SevendaysView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            var model = game.SevendaysModel.getInstance();
            var arrDays;
            this.list_days.selectedIndex = -1;
            var openid = tb.TB_sevendays_times.getActivityOpenId();
            if (openid == 2) {
                arrDays = JSON.parse(JSON.stringify(model.arr2Days));
                this.btn_sevenDay.skin = "huodong/qingdian714/14tian.png";
                this.img_ani.skin = "huodong/qingdian714/14tian.png";
            }
            else {
                arrDays = JSON.parse(JSON.stringify(model.arrDays));
                this.btn_sevenDay.skin = "huodong/qingdian714/haidisi.png";
                this.img_ani.skin = "huodong/qingdian714/haidisi.png";
            }
            this.btn_sevenDay.dataSource = arrDays.pop();
            this.list_days.dataSource = arrDays;
            this.playEff();
            Laya.timer.loop(3500, this, this.playEff);
            this.init();
        };
        SevendaysView.prototype.playEff = function () {
            this.ani1.play(0, false);
            this.startAnim();
        };
        SevendaysView.prototype.init = function () {
            this._curOpenId = tb.TB_sevendays_times.getActivityOpenId();
            this.img_title.skin = this._curOpenId == 1 ? "huodong/qingdian714/qirikuanghuan.png" : "huodong/qingdian714/banyueqingdian.png";
            var crt = Math.floor((App.serverTime - App.hero.getCreateDayTiem()) / TimeConst.ONE_DAY_MILSEC) + 1;
            var idx = tb.TB_sevendays_times.getIdx(crt);
            this.selectDaysNum = idx != -1 ? idx : 0;
            if (this.selectDaysNum != 6)
                this.list_days.selectedIndex = this.selectDaysNum;
            this.initView(this.selectDaysNum);
            this.refreshProgressBar();
            this.list_days.refresh();
        };
        SevendaysView.prototype.initView = function (day) {
            var model = game.SevendaysModel.getInstance();
            this.list_today.dataSource = model.getArrProJect(day);
            this.lab_finish.text = model.getFinishTaskNum() + "个";
            // this.lab_endTime.text = model.getRemainingTime();
            this.dataSource = model.arrSevendaysTb[day];
            model.UpdateSevendayByday(day, this.selectTodayNum);
            this.list_item.dataSource = this.dataSource[this.selectTodayNum];
            this.onListTodaysSelect(this.selectTodayNum);
            Laya.timer.clear(this, this.setEndTime);
            Laya.timer.loop(1000, this, this.setEndTime);
        };
        SevendaysView.prototype.setEndTime = function () {
            var model = game.SevendaysModel.getInstance();
            this.lab_endTime.text = LanMgr.getLan("", 12172, model.getRemainingTime());
            var openid = tb.TB_sevendays_times.getActivityOpenId();
            if (this._curOpenId != openid) {
                //跨天了或者结束了
                if (openid != -1) {
                    model.initArr();
                    this.init();
                    this.initExtList();
                }
                dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT));
            }
        };
        SevendaysView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initExtList();
        };
        SevendaysView.prototype.initExtList = function () {
            if (!this._boxItems) {
                this._boxItems = [];
            }
            var boxAry = game.SevendaysModel.getInstance().getSevendaysExtList();
            var len = boxAry.length;
            for (var i = 0; i < len; i++) {
                if (this._boxItems[i]) {
                    this._boxItems[i].dataSource = boxAry[i];
                }
                else {
                    var box = new game.TaskBaoxiangIR();
                    box.dataSource = boxAry[i];
                    box.x = (565 / len) * (i + 1) - 40;
                    box.y -= 30;
                    box.scale(0.8, 0.8);
                    this.boxLiveness.addChild(box);
                    this._boxItems.push(box);
                }
            }
        };
        SevendaysView.prototype.startAnim = function () {
            for (var _i = 0, _a = this._boxItems; _i < _a.length; _i++) {
                var box = _a[_i];
                box.startAni();
            }
        };
        SevendaysView.prototype.refreshProgressBar = function () {
            var model = game.SevendaysModel.getInstance();
            var arr = model.getSevendaysExtList()[model.getSevendaysExtList().length - 1];
            this.progressBar.value = model.getFinishTaskNum() / arr.tbReward.need_num;
        };
        /** 刷新活跃度数据 */
        SevendaysView.prototype.refreshLiveness = function () {
            for (var _i = 0, _a = this._boxItems; _i < _a.length; _i++) {
                var box = _a[_i];
                box.refreshView();
            }
            this.refreshProgressBar();
        };
        SevendaysView.prototype.onClick = function () {
            if (this.selectDaysNum == 6)
                return;
            this.list_days.cells[this.selectDaysNum].btn_tab.selected = false;
            // this.btn_sevenDay.selected = false;
            this.list_days.selection = null;
            this.selectDaysNum = 6;
            this.initView(6);
        };
        SevendaysView.prototype.onListDaysSelect = function (index) {
            if (index == -1)
                return;
            this.selectDaysNum = index;
            this.initView(this.selectDaysNum);
        };
        SevendaysView.prototype.onListDaysRender = function (cell, $index) {
            // this.btn_sevenDay.selected = this.selectDaysNum != 6;
            cell.btn_tab.selected = $index != this.selectDaysNum;
        };
        SevendaysView.prototype.onListTodaysSelect = function (index) {
            if (index == -1)
                return;
            this.selectTodayNum = index;
            this.list_item.dataSource = this.dataSource[this.selectTodayNum];
            if (index == 3) {
                var cell = this.list_today.getCell(index);
                cell.refreshData(this.list_today.array[index]);
                game.RedPointManager.removeRule(cell.redpoint.redpointName);
                cell.redpoint.visible = false;
                cell.redpoint.onDispose();
            }
        };
        SevendaysView.prototype.onListTodaysRender = function ($cell, $index) {
            $cell.btn_tab.selected = $index == this.selectTodayNum;
        };
        SevendaysView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.ani1.stop();
        };
        return SevendaysView;
    }(ui.activity.sevendays.sevendaysUI));
    game.SevendaysView = SevendaysView;
})(game || (game = {}));
