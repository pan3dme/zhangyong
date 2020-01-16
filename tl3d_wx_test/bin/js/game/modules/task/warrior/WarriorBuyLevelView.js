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
    var WarriorBuyLevelView = /** @class */ (function (_super) {
        __extends(WarriorBuyLevelView, _super);
        function WarriorBuyLevelView() {
            var _this = _super.call(this) || this;
            /**购买数量 */
            _this._buyNum = 1;
            /**最大可购买数量 */
            _this._buymaxnum = 0;
            /**当前购买总价 */
            _this._buysumMoney = 0;
            return _this;
        }
        WarriorBuyLevelView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.WarriorBuyLevelView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12137) };
            this.addChild(this.bgPanel.btnClose);
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btnAddOne, this.btnAddTen, this.btnDelOne, this.btnDelTen, this.lbLv);
            this.btnBuy.on(Laya.Event.CLICK, this, this.onBuy);
        };
        WarriorBuyLevelView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        WarriorBuyLevelView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        WarriorBuyLevelView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listReward.array = null;
        };
        WarriorBuyLevelView.prototype.initView = function () {
            var model = game.WarriorProveModel.getInstance();
            this._buymaxnum = model.maxLevel - App.hero.tasks.warriorLevel;
            this._buyNum = 1;
            this._counterBar.setInitData(this._buyNum, this._buymaxnum, this.setBuyLv.bind(this));
            this.setBuyLv();
        };
        /** 设置购买等级 */
        WarriorBuyLevelView.prototype.setBuyLv = function () {
            var model = game.WarriorProveModel.getInstance();
            var curCycle = model.curTabCycle;
            if (!curCycle)
                return;
            this._buyNum = this._counterBar.getCurNum();
            var toLv = App.hero.tasks.warriorLevel + this._buyNum;
            this.lbLv.text = this._buyNum.toString();
            this._buysumMoney = this._buyNum * curCycle.buy_cost;
            //购买总价文本
            this.lbCost.text = "X" + Snums(this._buysumMoney);
            this.lbCost.color = App.hero.diamond >= this._buysumMoney ? ColorConst.normalFont : ColorConst.RED;
            this.lbBuyDesc.text = LanMgr.getLan("", 12138, this._buyNum, toLv);
            this.lbDesc.text = LanMgr.getLan("", 12139, toLv);
            var rewardDic = {};
            for (var i = App.hero.tasks.warriorLevel + 1; i <= toLv; i++) {
                var vo = model.getWarriorVoByLv(i);
                if (!vo)
                    continue;
                var items = vo.tbData.getRewardItems();
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var itemVo = items_1[_i];
                    if (!rewardDic.hasOwnProperty(itemVo.id)) {
                        rewardDic[itemVo.id] = 0;
                    }
                    rewardDic[itemVo.id] += itemVo.count;
                }
                if (model.isUnlockJinjie()) {
                    var specialItems = vo.tbData.getSpecialItems();
                    for (var _a = 0, specialItems_1 = specialItems; _a < specialItems_1.length; _a++) {
                        var itemVo = specialItems_1[_a];
                        if (!rewardDic.hasOwnProperty(itemVo.id)) {
                            rewardDic[itemVo.id] = 0;
                        }
                        rewardDic[itemVo.id] += itemVo.count;
                    }
                }
            }
            var itemList = [];
            for (var id in rewardDic) {
                itemList.push(new ItemVo(Number(id), rewardDic[id]));
            }
            this.listReward.array = itemList;
            this.boxEmpty.visible = itemList.length == 0;
            this.listReward.width = itemList.length >= 5 ? 480 : (itemList.length * 100 + (itemList.length - 1) * this.listReward.spaceX);
        };
        WarriorBuyLevelView.prototype.onBuy = function () {
            var _this = this;
            //判断货币是否足够
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, this._buysumMoney)) {
                return;
            }
            var args = {};
            args[Protocol.game_task_buyWarriorLevel.args.level] = this._buyNum;
            PLC.request(Protocol.game_task_buyWarriorLevel, args, function ($data) {
                if (!$data)
                    return;
                showToast(LanMgr.getLan('', 10455));
                _this.close();
            });
        };
        return WarriorBuyLevelView;
    }(ui.task.warrior.WarriorBuyLevelUI));
    game.WarriorBuyLevelView = WarriorBuyLevelView;
})(game || (game = {}));
