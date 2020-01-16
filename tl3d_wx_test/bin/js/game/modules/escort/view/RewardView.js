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
    var RewardView = /** @class */ (function (_super) {
        __extends(RewardView, _super);
        function RewardView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            return _this;
        }
        RewardView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RewardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        RewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        RewardView.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        RewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.itemList.array = null;
            this.btnReward.off(Laya.Event.CLICK, this, this.onReward);
        };
        RewardView.prototype.initView = function () {
            var _this = this;
            var tbEscort = tb.TB_escort.getItemById(this.dataSource);
            this.itemList.array = null;
            this.bgPanel.dataSource = { uiName: UIConst.EscortRewardView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12431) };
            this.btnReward.on(Laya.Event.CLICK, this, this.onReward);
            this.ui_escort.dataSource = new game.CaravanGoodsVo(tbEscort);
            this.ui_escort.img_select.visible = false;
            /** 更新奖励信息 */
            PLC.request(Protocol.center_escort_getSelfInfo, null, function ($data) {
                if (!$data) {
                    _this.itemList.array = tbEscort.getRewardList();
                }
                else {
                    var info_1 = $data.escortInfo;
                    var allList_1 = [];
                    tbEscort.escort_reward.forEach(function (ary) {
                        var itemVo = new ItemVo(Number(ary[0]), Number(ary[1]));
                        var multiple = info_1.multiple > 1 ? info_1.multiple : 1;
                        itemVo.count *= multiple;
                        if (info_1.robCount > 0) {
                            var findVo = tbEscort.escort_loss ? tbEscort.escort_loss.find(function (vo) {
                                return vo[0] == ary[0];
                            }) : null;
                            if (findVo) {
                                // 被抢也要翻倍
                                itemVo.count -= (findVo[1] * info_1.robCount * multiple);
                            }
                        }
                        allList_1.push(itemVo);
                    });
                    _this.itemList.array = allList_1;
                }
                //布局
                var num = _this.itemList.array ? _this.itemList.array.length : 0;
                var listWidth = num > 0 ? (90 + _this.itemList.spaceX) * num : 0;
                if (listWidth > 548)
                    listWidth = 548;
                _this.itemList.x = (_this.width - listWidth) / 2;
            });
        };
        RewardView.prototype.onReward = function () {
            dispatchEvt(new game.EscortEvent(game.EscortEvent.RECEIVE_AWARD));
        };
        return RewardView;
    }(ui.escort.EscortRewardUI));
    game.RewardView = RewardView;
})(game || (game = {}));
