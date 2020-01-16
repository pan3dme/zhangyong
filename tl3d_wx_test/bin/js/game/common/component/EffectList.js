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
var common;
(function (common) {
    var EffectList = /** @class */ (function (_super) {
        __extends(EffectList, _super);
        function EffectList() {
            var _this = _super.call(this) || this;
            _this.startEnd = false;
            _this.index = 0;
            _this.zOrder = UI_DEPATH_VALUE.TOP + 5;
            _this.mouseThrough = true;
            _this.name = 'EffectList';
            _this.isIgnore = true;
            _this.close = null;
            return _this;
        }
        /**把需要弹出的提示压到数组 */
        EffectList.showEffectList = function (listVo) {
            if (listVo._dataSource.length <= 0)
                return null;
            var efflist = Laya.Pool.getItemByClass('EffectList', common.EffectList);
            efflist.initView(listVo);
            Dialog.manager.addChild(efflist);
            return efflist;
        };
        EffectList.updateEffectShow = function () {
            for (var _i = 0, _a = Dialog.manager._childs; _i < _a.length; _i++) {
                var dialog = _a[_i];
                if (dialog.name == 'EffectList') {
                    if (!this.viewIsShow(UIConst.FightGuildCopyResultView) &&
                        !this.viewIsShow(UIConst.CommonRewardView) &&
                        !this.viewIsShow(UIConst.FightVictory) &&
                        !this.viewIsShow(UIConst.GuajiVictory) &&
                        !this.viewIsShow(UIConst.Topup_GiftSuccView) &&
                        !this.viewIsShow(UIConst.Topup_SuccView) &&
                        !this.viewIsShow(UIConst.LevelUpView) &&
                        !this.viewIsShow(UIConst.ShowRewardItem) &&
                        !this.viewIsShow(UIConst.DFW_QiyuResultView) &&
                        !this.viewIsShow(UIConst.GuildCopySweepResultView)) {
                        var effectList = dialog;
                        effectList.stratEndAction();
                    }
                }
            }
        };
        EffectList.prototype.initView = function (listVo) {
            this.listVo = listVo;
            if (!this.list_item) {
                this.list_item = new Laya.List();
                this.list_item.itemRender = common.ItemBox;
                this.list_item.vScrollBarSkin = "";
                this.addChild(this.list_item);
            }
            this.list_item.height = listVo._height ? listVo._height : 200;
            this.list_item.x = listVo._x;
            this.zOrder = listVo.Zorder;
            this.list_item.spaceX = listVo._spaceX;
            this.list_item.spaceY = listVo._spaceY;
            this.list_item.repeatX = listVo._repeatX;
            this.list_item.y = listVo._y;
            this.list_item.array = this.setVoToItemVo(listVo._dataSource);
            if (listVo._width)
                this.list_item.width = listVo._width;
            else
                this.list_item.width = null;
            this.height = this.list_item.height;
            this.width = this.list_item.width;
            this.startEnd = false;
            this.index = 0;
            Laya.timer.loop(150, this, this.itemBoxStartAction);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.SCREEN_SIZE_CHNAGE, this._onResize, this);
        };
        EffectList.prototype._onResize = function () {
            this.x = Launch.offsetX;
            this.y = Launch.offsetY;
        };
        EffectList.prototype.setVoToItemVo = function (data) {
            for (var i in data) {
                if (data[i] instanceof EquipItemVo) {
                    data[i].startAction = true;
                    data[i].templateId = null;
                    data[i].show = true;
                }
            }
            return data;
        };
        EffectList.viewIsShow = function (uiConst) {
            return UIMgr.hasStage(uiConst);
        };
        /**逐个飞物品格子 */
        EffectList.prototype.itemBoxStartAction = function () {
            if (!this.list_item || !this.list_item.array)
                return;
            if (this.index == this.list_item.array.length) {
                Laya.timer.clear(this, this.itemBoxStartAction);
                return;
            }
            var itemBox = this.list_item.getCell(this.index);
            if (itemBox) {
                this.index++;
                if (itemBox.dataSource) {
                    itemBox.visible = true;
                    itemBox.dataSource.startAction = false;
                    Laya.Tween.to(itemBox, { scaleX: 1, scaleY: 1 }, 150);
                }
                else {
                    itemBox.visible = false;
                }
            }
        };
        EffectList.prototype.isStartEndAction = function () {
            return !this.list_item || this.list_item.length == 0;
        };
        /**开始结束动画 */
        EffectList.prototype.stratEndAction = function () {
            if (this.isStartEndAction())
                return;
            Laya.timer.clear(this, this.itemBoxStartAction);
            this.list_item.scrollTo(0);
            this.list_item.width = 999;
            this.list_item.height = 800;
            // this.list_item.mouseEnabled = false;
            this.index = this.list_item.length;
            for (var i = 0; i < this.index; i++) {
                var itemBox = this.list_item.getCell(i);
                Laya.Tween.clearTween(itemBox);
                if (itemBox) {
                    itemBox.scale(1, 1);
                    itemBox.visible = true;
                    itemBox.dataSource.startAction = false;
                }
            }
            this.itemBoxEndAction();
            var speed = this.index >= 6 ? 50 : 100;
            Laya.timer.loop(speed, this, this.itemBoxEndAction);
            tl3d.ModuleEventManager.removeEvent(game.HudEvent.SCREEN_SIZE_CHNAGE, this._onResize, this);
        };
        /**回到背包 */
        EffectList.prototype.itemBoxEndAction = function () {
            var _this = this;
            if (this.index < 0) {
                Laya.timer.clear(this, this.itemBoxEndAction);
                return;
            }
            this.index--;
            var uiPanel = UIMgr.getUIByName(UIConst.HudView);
            var pos = this.list_item.globalToLocal(uiPanel.getBtnPos(uiPanel.btn_bag));
            var isEnd = this.index <= 0;
            var itemBox = this.list_item.getCell(this.index);
            if (itemBox) {
                BezierTween.clear(itemBox);
                itemBox.scale(1, 1);
                BezierTween.to(itemBox, 500, [{ x: itemBox.x, y: itemBox.y }, { x: pos.x, y: pos.y }], { scaleX: 0.5, scaleY: 0.5 }, null, new Handler(this, function () {
                    itemBox.visible = false;
                    if (isEnd) {
                        _this.list_item.array = null;
                        _this.removeSelf();
                        // Dialog.manager.removeChild(this);
                        Laya.Pool.recover('EffectList', _this);
                    }
                }));
            }
        };
        return EffectList;
    }(common.DialogExt));
    common.EffectList = EffectList;
})(common || (common = {}));
