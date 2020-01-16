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
    var WarriorIR = /** @class */ (function (_super) {
        __extends(WarriorIR, _super);
        function WarriorIR() {
            var _this = _super.call(this) || this;
            _this.listSpecail.renderHandler = new Handler(_this, _this.onRenderSpecial);
            _this.listReward.renderHandler = new Handler(_this, _this.onRenderCommon);
            return _this;
        }
        Object.defineProperty(WarriorIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        WarriorIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.lbLv.text = info.tbData.level + "";
                var commonItems = info.tbData.getRewardItems();
                this.listReward.array = commonItems;
                var specialItems = info.tbData.getSpecialItems();
                this.listSpecail.array = specialItems;
                this.btnLingqu.disabled = false;
                var isFinish = info.isFinish();
                var isCanRewardCom = info.isCanRewardCommon();
                var isCanRewardJj = info.isCanRewardJinjie();
                var isUnlock = game.WarriorProveModel.getInstance().isUnlockJinjie();
                if (isFinish) {
                    if (isCanRewardCom) {
                        this.btnLingqu.label = LanMgr.getLan("", 10041);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor = ColorConst.GREEN_FILTER;
                    }
                    else if (isCanRewardJj) {
                        this.btnLingqu.label = commonItems.length == 0 ? LanMgr.getLan("", 10041) : LanMgr.getLan("", 12001);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor = ColorConst.GREEN_FILTER;
                    }
                    else {
                        if (isUnlock) {
                            this.btnLingqu.label = LanMgr.getLan("", 10043);
                            this.btnLingqu.skin = SkinUtil.buttonNormal;
                            this.btnLingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                            this.btnLingqu.disabled = true;
                        }
                        else {
                            this.btnLingqu.label = commonItems.length == 0 ? LanMgr.getLan("", 10041) : LanMgr.getLan("", 12001);
                            this.btnLingqu.skin = SkinUtil.buttonNormal;
                            this.btnLingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                        }
                    }
                }
                else {
                    this.btnLingqu.label = LanMgr.getLan("", 10045);
                    this.btnLingqu.skin = SkinUtil.buttonNormal;
                    this.btnLingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                }
                this.imgRedpoint.visible = info.isCanReward();
                this.btnLingqu.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.listReward.array = null;
                this.listSpecail.array = null;
                this.btnLingqu.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        /** 进阶奖励渲染 */
        WarriorIR.prototype.onRenderSpecial = function (cell, index) {
            var info = this.dataSource;
            if (!cell || !info)
                return;
            var itemVo = this.listSpecail.getItem(index);
            var itemBox = cell.getChildByName("itemBox");
            var imgZhezhao = cell.getChildByName("imgZhezhao");
            var imgSuo = cell.getChildByName("imgSuo");
            var imgGouxuan = cell.getChildByName("imgGouxuan");
            if (itemVo) {
                var isUnlock = game.WarriorProveModel.getInstance().isUnlockJinjie();
                var isReward = info.isHasRewardJinjie();
                itemBox.dataSource = itemVo;
                imgSuo.visible = !isUnlock;
                imgGouxuan.visible = isReward;
                imgZhezhao.visible = !isUnlock || isReward;
            }
            else {
                itemBox.dataSource = null;
            }
        };
        /** 普通奖励渲染 */
        WarriorIR.prototype.onRenderCommon = function (cell, index) {
            var info = this.dataSource;
            if (!cell || !info)
                return;
            var itemVo = this.listReward.getItem(index);
            var itemBox = cell.getChildByName("itemBox");
            var imgZhezhao = cell.getChildByName("imgZhezhao");
            var imgGouxuan = cell.getChildByName("imgGouxuan");
            if (itemVo) {
                itemBox.dataSource = itemVo;
                imgGouxuan.visible = imgZhezhao.visible = info.isHasRewardCommon();
            }
            else {
                itemBox.dataSource = null;
            }
        };
        /** 领取奖励 */
        WarriorIR.prototype.onClick = function () {
            var info = this.dataSource;
            if (info) {
                dispatchEvt(new game.TaskEvent(game.TaskEvent.TO_REWARD_LEVEL), this);
            }
        };
        return WarriorIR;
    }(ui.task.itemrender.WarriorIRUI));
    game.WarriorIR = WarriorIR;
})(game || (game = {}));
