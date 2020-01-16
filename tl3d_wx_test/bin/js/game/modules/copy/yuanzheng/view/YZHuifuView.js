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
    var YZHuifuView = /** @class */ (function (_super) {
        __extends(YZHuifuView, _super);
        function YZHuifuView() {
            var _this = _super.call(this) || this;
            /** 选择计数 */
            _this._curIdx = -1;
            _this.isModelClose = true;
            return _this;
        }
        YZHuifuView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.godList.mouseHandler = new Handler(this, this.onSelect);
        };
        YZHuifuView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        YZHuifuView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        YZHuifuView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.godList.array = null;
            this.bgPanel.dataSource = null;
            this.btnUse.off(Laya.Event.CLICK, this, this.onUse);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateCount, this);
        };
        YZHuifuView.prototype.initView = function () {
            var str = this.dataSource == iface.tb_prop.expeditionOpTypeKey.recover ? LanMgr.getLan("", 12469) : LanMgr.getLan("", 12470);
            this.bgPanel.dataSource = { uiName: UIConst.Yuanzheng_RecoveryView, closeOnSide: this.isModelClose, title: str };
            this.btnUse.on(Laya.Event.CLICK, this, this.onUse);
            this._curIdx = -1;
            var type = this.dataSource;
            var model = game.YuanzhengModel.getInstance();
            var godAry = model.getGodsByRecoveryType(type);
            this.godList.array = godAry.map(function (god) {
                var itemVo = new game.BuzhenListItemVo(god, iface.tb_prop.lineupTypeKey.expedition);
                if (type == iface.tb_prop.expeditionOpTypeKey.recover) {
                    itemVo.showBlood = true;
                    itemVo.hp = model.getGodHp(god.uuid);
                    itemVo.totalHp = Math.ceil(god.getPropertyValue(1));
                }
                return itemVo;
            });
            this.updateCount();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateCount, this);
        };
        YZHuifuView.prototype.delItem = function () {
            //先将引用计数制空,再加载
            var itemRender = this.godList.getCell(this._curIdx);
            itemRender.chk_select.visible = false;
            this.godList.deleteItem(this._curIdx);
            this.godList.refresh();
            this._curIdx = -1;
        };
        /** 更新药水数量 */
        YZHuifuView.prototype.updateCount = function () {
            var type = this.dataSource;
            if (type == iface.tb_prop.expeditionOpTypeKey.recover) {
                //回复
                this.lbDesc.text = LanMgr.getLan('', 10118);
                this.lbCount.text = App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui).toString();
                this.costIcon.skin = SkinUtil.getCostSkin(CostTypeKey.huifu_yaoshui);
            }
            else {
                //复活
                this.lbDesc.text = LanMgr.getLan('', 10119);
                this.lbCount.text = App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui).toString();
                this.costIcon.skin = SkinUtil.getCostSkin(CostTypeKey.fuhuo_yaoshui);
            }
        };
        YZHuifuView.prototype.onSelect = function (e, index) {
            if (e.type == Laya.Event.CLICK) {
                if (this._curIdx == -1) {
                    this._curIdx = index;
                    var itemRender = this.godList.getCell(index);
                    itemRender.chk_select.visible = true;
                    return;
                }
                if (this._curIdx == index) {
                    this._curIdx = -1;
                    var itemRender = this.godList.getCell(index);
                    itemRender.chk_select.visible = false;
                }
                else {
                    var itemRender1 = this.godList.getCell(this._curIdx);
                    itemRender1.chk_select.visible = false;
                    var itemRender2 = this.godList.getCell(index);
                    itemRender2.chk_select.visible = true;
                    this._curIdx = index;
                }
            }
        };
        YZHuifuView.prototype.onUse = function () {
            var type = this.dataSource;
            if (this._curIdx == -1) {
                showToast(LanMgr.getLan('', (type == iface.tb_prop.expeditionOpTypeKey.recover ? 10110 : 10111)));
                return;
            }
            var itemVo = this.godList.getCell(this._curIdx).dataSource;
            var godVo = itemVo ? itemVo.godVo : null;
            if (!godVo) {
                showToast(LanMgr.getLan('', (type == iface.tb_prop.expeditionOpTypeKey.recover ? 10110 : 10111)));
                return;
            }
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.RECOVERY_GOD, { type: type, godVo: godVo }));
        };
        return YZHuifuView;
    }(ui.yuanzheng.HuifuViewUI));
    game.YZHuifuView = YZHuifuView;
})(game || (game = {}));
