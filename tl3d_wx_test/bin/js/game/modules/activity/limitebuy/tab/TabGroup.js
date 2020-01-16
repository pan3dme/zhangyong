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
    var TabGroup = /** @class */ (function (_super) {
        __extends(TabGroup, _super);
        function TabGroup() {
            var _this = _super.call(this) || this;
            _this.list_item.selectHandler = new Handler(_this, _this.onSelect);
            _this.btn_buy.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        Object.defineProperty(TabGroup.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initData();
            },
            enumerable: true,
            configurable: true
        });
        TabGroup.prototype.initData = function () {
            var info = this.dataSource;
            if (!info) {
                this.list_item.selectedIndex = -1;
                return;
            }
            var list = [];
            for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
                var obj = info_1[_i];
                // let item = new ItemVo(obj.tbGroup.item[0], obj.getBuyNum());
                var item = new ItemVo(obj.tbGroup.item[0], obj.tbGroup.item[1]);
                item.show = false;
                list.push(item);
            }
            this.list_item.array = list;
            if (this.list_item.selectedIndex < 0) {
                this.list_item.selectedIndex = 0;
            }
            this.onSelect(this.list_item.selectedIndex);
            Laya.timer.loop(60000, this, this.Timer);
        };
        TabGroup.prototype.onSelect = function (index) {
            if (index < 0)
                return;
            this.list_item.selectedIndex = index;
            this._curIndex = index;
            var info = this.dataSource[index];
            if (!info)
                return;
            this.lb_time.text = info.getRemainTime(); //剩余时间
            this.lb_buy.text = LanMgr.getLan("今日可购买{0}次", -1, info.getRemainNum()); //今日可购买次数
            this.lb_allbuy.text = LanMgr.getLan("全服已购买{0}次", -1, info.getAllBuyNum()); //总的购买次数
            this.lb_cost.text = info.getCurZheKouList()[0] + ''; //价格显示
            this.list_zhekou.array = info.getZheKouList(); //折扣列表
            //使用遮罩进度条
            var value = info.getAllBuyNum() / info.tbGroup.total_buy_num[info.tbGroup.total_buy_num.length - 1];
            this.pg_zhekou.value = value;
            // this.view_item.dataSource = new ItemVo(info.tbGroup.item[0], info.getBuyNum());
            this.view_item.dataSource = new ItemVo(info.tbGroup.item[0], info.tbGroup.item[1]);
        };
        /** 计时器，计算剩余时间 */
        TabGroup.prototype.Timer = function () {
            var info = this.dataSource[this._curIndex];
            this.lb_time.text = info.getRemainTime();
        };
        /** 购买 */
        TabGroup.prototype.onClick = function () {
            dispatchEvt(new game.LimiteBuyEvent(game.LimiteBuyEvent.LIMITEGROUP_BUY), this.dataSource[this._curIndex]);
        };
        return TabGroup;
    }(ui.activity.limitebuy.tab.TabGroupUI));
    game.TabGroup = TabGroup;
})(game || (game = {}));
