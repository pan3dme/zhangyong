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
/*
* name;
*/
var game;
(function (game) {
    var RechargeSuccView = /** @class */ (function (_super) {
        __extends(RechargeSuccView, _super);
        function RechargeSuccView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.list.visible = false;
            _this.listVo = new ListVo(_this.list);
            _this.btnComfirnm.on(Laya.Event.CLICK, _this, _this.close);
            return _this;
        }
        RechargeSuccView.prototype.popup = function () {
            var rechargeId = this.dataSource;
            this._data = tb.TB_recharge.get_TB_rechargeById(rechargeId);
            if (!this._data || this._data.recharge_type > 1) {
                this.height = 310;
            }
            else {
                this.height = 310 + 140;
            }
            _super.prototype.popup.call(this);
            this.initView();
        };
        RechargeSuccView.prototype.initView = function () {
            var rechargeId = this.dataSource;
            this._addScore = this._data.recharge_count * 10;
            this.box_yueka.visible = this._data.recharge_type == 0;
            this.box_zhonshen.visible = this._data.recharge_type == 1;
            var firstRecharge = App.hero.welfare.goodsRechargeCount[rechargeId] == 1;
            this.box_extra.visible = !this.box_yueka.visible && !this.box_zhonshen.visible;
            this.lab_score.text = Snums(this._data.recharge_count * 10);
            this.lab_diamonds.text = Snums(this._data.recharge_count * 10);
            this.lab_extra.text = firstRecharge ? (this._data.recharge_count * 10).toString() : this._data.extra_reward.toString();
            this.initItem();
        };
        RechargeSuccView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            // this.initView();
            this.eff_guang.play();
        };
        RechargeSuccView.prototype.initItem = function () {
            this.imgLeft.visible = this.imgRight.visible = this.lab_gift_title.visible = false;
            if (!this._data || this._data.recharge_type > 1)
                return;
            var temp = tb.TB_month_card.getTbMonthCardById(this._data.ID);
            var allItem = ary2prop(temp.item_gift);
            for (var key in allItem) {
                allItem[key].show = true;
                allItem[key].startAction = true;
            }
            this.imgLeft.visible = this.imgRight.visible = this.lab_gift_title.visible = true;
            this.list.repeatX = allItem.length > 4 ? 4 : allItem.length;
            this.list.width = this.list.repeatX * 100 + (allItem.length - 1) * this.list.spaceX;
            this.list.height = 100;
            this.list.y = this.y + 247;
            this.list.x = Laya.stage.width / 2 - this.list.width / 2;
            this.listVo.initData(this.list);
            this.listVo._dataSource = allItem;
            // this.listVo.itemRender = common.ItemBox2;
            this.listVo.setZorder(this.zOrder);
            this.listVo.setWidth(this.list.width);
            this.listVo.setHeight(this.list.height);
            var tag = this.localToGlobal(new Laya.Point(0, 247));
            this.listVo.setPosition(this.list.x, tag.y + 15);
            this._efflist = common.EffectList.showEffectList(this.listVo);
        };
        RechargeSuccView.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.dataSource && this.dataSource.callback) {
                this.dataSource.callback.call(null);
            }
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
                AudioMgr.playSound("sound/getreward.mp3");
            }
            this.eff_guang.stop();
        };
        RechargeSuccView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.height = 310;
            this.imgLeft.visible = this.imgRight.visible = this.lab_gift_title.visible = false;
            game.ChongzhiModel.getInstance().arrPop();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list.array = null;
        };
        return RechargeSuccView;
    }(ui.activity.chongzhi.RechargeSuccUI));
    game.RechargeSuccView = RechargeSuccView;
})(game || (game = {}));
