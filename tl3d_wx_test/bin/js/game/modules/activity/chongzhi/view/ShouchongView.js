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
    var ShouchongView = /** @class */ (function (_super) {
        __extends(ShouchongView, _super);
        function ShouchongView() {
            var _this = _super.call(this) || this;
            _this._listItems = [];
            _this.tabBar.selectHandler = new Laya.Handler(_this, _this.onTabSelect);
            _this.isModelClose = true;
            _this._listItems[0] = _this.listitem_0;
            _this._listItems[1] = _this.listitem_1;
            _this._listItems[2] = _this.listitem_2;
            _this._model = game.ChongzhiModel.getInstance();
            return _this;
        }
        Object.defineProperty(ShouchongView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
            },
            enumerable: true,
            configurable: true
        });
        ShouchongView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
            this.initAllReward();
        };
        ShouchongView.prototype.initView = function () {
            var data = this._model.getCurData();
            var Idx = data.tb.ID;
            this.onTabSelect(Idx - 1);
            if (this._listItems) {
                for (var i = 0; i < this._listItems.length; i++) {
                    this._listItems[i].btnsure.on(Laya.Event.CLICK, this, this.onSure);
                }
            }
            for (var i = 0; i < 3; i++) {
                this.listitem_1["equip" + i].on(Laya.Event.CLICK, this, this.onClickEquip, [i]);
            }
            dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CLOSE_SHOUCHONG_TIPS));
        };
        ShouchongView.prototype.onTabSelect = function (index) {
            if (index == -1)
                return;
            if (index < 0 || index > 2)
                index = 0;
            this._selectTabNum = index;
            this.tabBar.selectedIndex = index;
            this.viewStack.selectedIndex = index;
            this._listItems[index].visible = true;
            this.setViewData(index);
        };
        ShouchongView.prototype.initAllReward = function () {
            var alldata = this._model.firstRechargeData;
            for (var i = 0; i < alldata.length; i++) {
                this._listItems[i].list_item.dataSource = alldata[i].allrewards;
                if (alldata[i].tb.show_type == 2) {
                    this._equipList = alldata[i].tb.show.map(function (item) {
                        var equip = new EquipItemVo(tb.TB_item.get_TB_itemById(item[0]));
                        equip.show = true;
                        return equip;
                    });
                }
            }
            // this.rewardList.array = data.show.map((item) => {
            // 	let equip = new EquipItemVo(tb.TB_item.get_TB_itemById(item[0]))
            // 	equip.show = true;
            // 	return equip
            // });
        };
        ShouchongView.prototype.updateView = function () {
            this.setViewData(this._selectTabNum);
        };
        /**切换Tab改变数据 */
        ShouchongView.prototype.setViewData = function (index, data) {
            if (!data)
                data = this._model.getDataById(index);
            this.dataSource = data;
            var tbData = data.tb;
            var view = this._listItems[index];
            view.img_gou0.visible = data.rewards[0].isReward();
            view.img_gou1.visible = data.rewards[1].isReward();
            view.img_gou2.visible = data.rewards[2].isReward();
            //充值金额
            view.lab_chong.text = "已充值:" + App.hero.welfare.rechargeSum;
            view.imgRp.visible = false;
            //按钮
            if (data.canReward()) {
                view.imgRp.visible = true;
                view.btnsure.gray = false;
                view.btnsure.label = "领取";
                view.btnsure.skin = "shouchong/shouchong02.png";
                view.btnsure.labelColors = "#137d47";
            }
            else if (data.isReward()) {
                view.btnsure.gray = true;
                view.btnsure.label = "已领取";
                view.btnsure.skin = "shouchong/shouchong02.png";
                view.btnsure.labelColors = "#137d47";
            }
            else if (data.isAfterRewardday()) {
                view.btnsure.gray = true;
                view.btnsure.label = "明日领取";
                view.btnsure.skin = "shouchong/shouchong02.png";
                view.btnsure.labelColors = "#137d47";
            }
            else {
                //去充值
                view.btnsure.gray = false;
                view.btnsure.label = "前往充值";
                view.btnsure.skin = "shouchong/shouchong01.png";
                view.btnsure.labelColors = "#ad4606";
            }
        };
        ShouchongView.prototype.onClickEquip = function (index) {
            if (!this._equipList || !this._equipList[index])
                return;
            UIUtil.showTip(this._equipList[index]);
        };
        ShouchongView.prototype.onSure = function () {
            var view = this._listItems[this._selectTabNum];
            var str = view.btnsure.label;
            switch (str) {
                case "\u9886\u53D6":
                    this.send();
                    break;
                case "\u524D\u5F80\u5145\u503C":
                    this.recharge();
                    break;
                case "\u5DF2\u9886\u53D6":
                    showToast(LanMgr.getLan("", 10215));
                    break;
                case "\u660E\u65E5\u9886\u53D6":
                    showToast(LanMgr.getLan("", 10216));
                    break;
            }
        };
        /**领奖 */
        ShouchongView.prototype.send = function () {
            var data = this.dataSource;
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.GET_FIRSTRECHARGE_REWARD), { id: data.tb.ID, day: data.getCanReardId() });
        };
        /**充值 */
        ShouchongView.prototype.recharge = function () {
            this.close();
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
        };
        ShouchongView.prototype.lookGod = function () {
            var model = this.dataSource.tb.show[0][0];
            var godtab = tb.TB_god.get_TB_godById(model);
            var realDegree = 5;
            var obj = { templateId: godtab.ID, starLevel: 5, level: 100, skill: godtab.skill, degree: realDegree };
            var godData = new GodItemVo(obj);
            godData.tab_god = godtab;
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
        };
        ShouchongView.prototype.lookAwakenGod = function () {
            var godtab = tb.TB_god.get_TB_godById(3101);
            var realDegree = 5;
            var obj = { templateId: godtab.ID, starLevel: 5, level: 100, skill: godtab.skill, degree: realDegree };
            var godData = new GodItemVo(obj);
            godData.tab_god = godtab;
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
        };
        ShouchongView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        //关闭面板
        ShouchongView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabBar.selectedIndex = -1;
            this.viewStack.selectedIndex = -1;
            if (this._listItems) {
                for (var i = 0; i < this._listItems.length; i++) {
                    this._listItems[i].btnsure.off(Laya.Event.CLICK, this, this.onSure);
                }
            }
            for (var i = 0; i < 3; i++) {
                this.listitem_1["equip" + i].off(Laya.Event.CLICK, this, this.onClickEquip, [i]);
            }
        };
        return ShouchongView;
    }(ui.activity.shouchong.ShouchongUI));
    game.ShouchongView = ShouchongView;
})(game || (game = {}));
