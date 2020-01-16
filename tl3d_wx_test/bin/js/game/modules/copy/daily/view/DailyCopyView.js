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
    var DailyCopyView = /** @class */ (function (_super) {
        __extends(DailyCopyView, _super);
        function DailyCopyView() {
            var _this = _super.call(this) || this;
            _this._overPlusTypeKey = [iface.tb_prop.overplusTypeKey.dailyCopyNum1, iface.tb_prop.overplusTypeKey.dailyCopyNum2, iface.tb_prop.overplusTypeKey.dailyCopyNum3];
            _this.isModelClose = true;
            return _this;
        }
        DailyCopyView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bgPanel.addChildAt(this.img_bg, 3);
        };
        DailyCopyView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        DailyCopyView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        DailyCopyView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        DailyCopyView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.btnBuy.off(Laya.Event.CLICK, this, this.onClick);
            this.list.array = null;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateCount, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateCount, this);
        };
        /** 初始化界面 */
        DailyCopyView.prototype.initView = function () {
            //监听
            this.btnBuy.on(Laya.Event.CLICK, this, this.onClick);
            //当前选择的副本
            this._curType = this.dataSource ? this.dataSource : iface.tb_prop.dailyCopyTypeKey.gold;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: game.DailyCopyModel.COPY_NAME[this._curType] };
            //更新界面
            this.updateView();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateCount, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateCount, this);
        };
        DailyCopyView.prototype.updateView = function () {
            var list = game.DailyCopyModel.getInstance().getCopyListByType(this._curType);
            if (!list || list.length <= 0)
                return;
            this.list.array = list;
            this.updateCount();
            var idx = this.getMaxOpenIndex(list);
            this.list.scrollTo(idx - 3);
        };
        DailyCopyView.prototype.getMaxOpenIndex = function (list) {
            if (!list || list.length == 0)
                return 0;
            var idx = 0;
            for (var i = 0; i < list.length; i++) {
                if (list[i].isLvLimit()) {
                    return idx;
                }
                idx = i;
            }
            return idx;
        };
        /** 更新数量 */
        DailyCopyView.prototype.updateCount = function () {
            var count = App.hero.getOverplusValue(this._overPlusTypeKey[this._curType - 1]);
            if (count <= 0) {
                //购买次数
                var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum);
                var limitType = game.DailyCopyModel.getInstance().getLimitType(this._curType);
                count = total - App.hero.getlimitValue(limitType);
                this.lbCount.text = LanMgr.getLan('可购买次数:{0}', -1, count);
            }
            else {
                //剩余次数
                this.lbCount.text = LanMgr.getLan('', 10081, count);
            }
        };
        /** 按钮点击 */
        DailyCopyView.prototype.onClick = function (event) {
            var target = event.target;
            switch (target) {
                case this.btnBuy:
                    var list = game.DailyCopyModel.getInstance().getCopyListByType(this._curType);
                    dispatchEvt(new game.DailyEvent(game.DailyEvent.SHOW_BUY_VIEW, list[0].type));
                    break;
            }
        };
        return DailyCopyView;
    }(ui.dailycopy.DailyCopyUI));
    game.DailyCopyView = DailyCopyView;
})(game || (game = {}));
