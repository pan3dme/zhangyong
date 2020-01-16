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
    var UseView = /** @class */ (function (_super) {
        __extends(UseView, _super);
        function UseView() {
            var _this = _super.call(this) || this;
            _this.num = 1;
            _this.total = 0; // 总数
            _this.btn_quxiao.on(Laya.Event.CLICK, _this, _this.close);
            _this.btn_queding.on(Laya.Event.CLICK, _this, _this.onQueding);
            return _this;
        }
        UseView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.Bag_UseView, closeOnSide: this.isModelClose };
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btn_add, this.btn_addTen, this.btn_del, this.btn_delTen, this.lab_num);
        };
        UseView.prototype.close = function () {
            _super.prototype.close.call(this, "", true);
            this.bgPanel.dataSource = null;
        };
        UseView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, true);
            var itemtab = tb.TB_item.get_TB_itemById(this.dataSource.id);
            // if (this.dataSource.type == 6) {
            // 	this.lab_type.text = LanMgr.getLan("合成数量：", -1)
            // 	this.bgPanel.updateTitle("合成");
            // } else{
            // 	this.lab_type.text = LanMgr.getLan("使用数量：", -1)
            // 	this.bgPanel.updateTitle("使用");
            // }
            this.img_icon.skin = SkinUtil.getItemIcon(itemtab);
            this.img_quality.skin = SkinUtil.getBoxQulityIcon(itemtab.quality);
            this.lab_name.text = itemtab.name;
            this.lab_count.text = String(this.dataSource.count);
            this.lab_info.text = "(" + itemtab.desc + ")";
            this.vo = this.dataSource;
            if (this.dataSource.type == 6) {
                iface.tb_prop.itemTypeKey.chip;
                this.total = Math.floor(this.dataSource.count / itemtab.using_effect[1]);
            }
            else {
                this.total = this.dataSource.count;
            }
            this.num = 1;
            this._counterBar.setInitData(this.num, this.total, this.updateCount.bind(this));
            this.updateCount();
        };
        UseView.prototype.updateCount = function () {
            this.num = this._counterBar.getCurNum();
            this.lab_num.text = this.num.toString();
        };
        /**
         * 确定使用
         */
        UseView.prototype.onQueding = function () {
            var _this = this;
            if (this.dataSource.type_name == LanMgr.getLan("", 12509)) {
                if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= game.GodUtils.getGodsNum() + this.num) {
                    var alertStr = LanMgr.getLan("", 10226);
                    common.AlertBox.showAlert({
                        text: alertStr, confirmCb: function () {
                            _this.close();
                            dispatchEvt(new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW));
                        }
                    });
                    return;
                }
            }
            var $evt = new game.BagEvent(game.BagEvent.USE_MANY_ITEM);
            $evt.data = new Array();
            $evt.data[0] = this.vo;
            $evt.data[1] = this.num;
            dispatchEvt($evt);
        };
        return UseView;
    }(ui.bag.UseUI));
    game.UseView = UseView;
})(game || (game = {}));
