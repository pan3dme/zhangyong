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
    var RewardSelectView = /** @class */ (function (_super) {
        __extends(RewardSelectView, _super);
        function RewardSelectView() {
            var _this = _super.call(this) || this;
            _this.num = 1;
            _this.count = 0;
            _this._selectIdx = -1;
            //数量
            _this._curNum = 1;
            _this._maxNum = 1;
            return _this;
        }
        RewardSelectView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.RewardSelectView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12510) };
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btn_add, this.btn_add_ten, this.btn_del, this.btn_del_ten, this.lab_num);
        };
        RewardSelectView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        RewardSelectView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        RewardSelectView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            this.btn_queding.off(Laya.Event.CLICK, this, this.onclick);
            this._itemVo = null;
            this._tbOptional = null;
        };
        RewardSelectView.prototype.initView = function () {
            //创建监听
            this.btn_queding.on(Laya.Event.CLICK, this, this.onclick);
            this.list_reward.renderHandler = new Handler(this, this.onItemRender);
            this._itemVo = this.dataSource;
            if (!this._itemVo) {
                this.close();
                return;
            }
            this._curNum = 1;
            this._selectIdx = -1;
            this._tbOptional = tb.TB_optional.get_TB_ById(this._itemVo.using[1]);
            this.list_reward.array = ary2prop(this._tbOptional.option);
            this.list_reward.repeatX = this.list_reward.array.length > 5 ? 5 : this.list_reward.array.length;
            if (this.list_reward.repeatX == 2) {
                this.list_reward.spaceX = 100;
            }
            else if (this.list_reward.repeatX == 3) {
                this.list_reward.spaceX = 40;
            }
            else {
                this.list_reward.spaceX = 5;
            }
            this.list_reward.width = this.list_reward.repeatX > 4 ? 640 : (this.list_reward.repeatX * (149 + this.list_reward.spaceX) - this.list_reward.spaceX);
            this.list_reward.x = (this.width - this.list_reward.width) / 2;
            this.onChkItem(this._selectIdx);
            this._maxNum = this._itemVo.getNum();
            this._counterBar.setInitData(this._curNum, this._maxNum, this.updateRewardNum.bind(this));
            this.updateRewardNum();
        };
        RewardSelectView.prototype.updateRewardNum = function () {
            this._curNum = this._counterBar.getCurNum();
            this.lab_num.text = this._curNum.toFixed(0);
        };
        RewardSelectView.prototype.onclick = function (e) {
            switch (e.currentTarget) {
                case this.btn_queding: //确定
                    if (this._curNum < 1)
                        return;
                    if (this._selectIdx == -1) {
                        showToast(LanMgr.getLan("", 10249));
                        return;
                    }
                    var args = {};
                    args[Protocol.game_item_useItem.args.itemId] = this._itemVo.id;
                    args[Protocol.game_item_useItem.args.count] = this._curNum;
                    args[Protocol.game_item_useItem.args.optionId] = this._selectIdx;
                    PLC.request(Protocol.game_item_useItem, args, function ($data, $msg) {
                        if (!$data)
                            return;
                        UIUtil.showRewardView($data.commonData);
                        dispatchEvt(new game.BagEvent(game.BagEvent.USE_ITEM_SUCCESS));
                        UIMgr.hideUIByName(UIConst.RewardSelectView);
                    });
                    break;
            }
        };
        RewardSelectView.prototype.onItemRender = function (cell, index) {
            if (!cell)
                return;
            cell.img_chk.on(Laya.Event.CLICK, this, this.onChkItem, [index]);
            var itemvo = cell.dataSource;
            var temp = tb.TB_item.get_TB_itemById(itemvo.id);
            cell.ui_item.dataSource = itemvo;
            cell.lab_name.text = itemvo.getName();
            cell.lab_name.color = ItemVo.ITEM_QUALITY_COLORS[temp.quality];
        };
        RewardSelectView.prototype.onChkItem = function (index) {
            if (this._selectIdx == index) {
                this._selectIdx = -1;
            }
            else {
                this._selectIdx = index;
            }
            for (var i = 0; i < this.list_reward.cells.length; i++) {
                var cell = this.list_reward.cells[i];
                cell.img_chk.selected = i == this._selectIdx;
            }
        };
        return RewardSelectView;
    }(ui.bag.RewardSelectUI));
    game.RewardSelectView = RewardSelectView;
})(game || (game = {}));
