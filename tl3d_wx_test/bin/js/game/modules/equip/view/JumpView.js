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
    var JumpView = /** @class */ (function (_super) {
        __extends(JumpView, _super);
        function JumpView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.addChildAt(_this.bg, 3);
            return _this;
        }
        JumpView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12439) };
            var data = this.dataSource;
            if (Array.isArray(this.dataSource)) {
                this.refreshByAry(data);
            }
            else {
                this.refreshData(data);
            }
        };
        JumpView.prototype.refreshData = function (id) {
            this.icon.visible = this.lab_name.visible = this.lab_num.visible = true;
            this.bg.y = 193;
            this.list_where.y = 211;
            var itemtab = tb.TB_item.get_TB_itemById(id);
            this.list_where.dataSource = itemtab.way_link;
            var vo = new ItemVo(id, 0, 0);
            this.icon.dataSource = vo;
            this.lab_name.text = itemtab.name;
            this.lab_num.text = LanMgr.getLan("", 12440, App.hero.getBagItemNum(id));
        };
        JumpView.prototype.refreshByAry = function (ary) {
            this.bg.y = 123;
            this.list_where.y = 131;
            this.icon.dataSource = null;
            this.icon.visible = this.lab_name.visible = this.lab_num.visible = false;
            this.list_where.dataSource = ary;
        };
        JumpView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
        };
        return JumpView;
    }(ui.equip.JumpViewUI));
    game.JumpView = JumpView;
    var GetItemRender = /** @class */ (function (_super) {
        __extends(GetItemRender, _super);
        function GetItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GetItemRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        GetItemRender.prototype.refreshData = function () {
            if (this._dataSource) {
                var sysopen = tb.TB_sys_open.get_TB_sys_openById(this._dataSource[0]);
                this.lab_name.text = sysopen.name;
                this.btn_goto.on(Laya.Event.CLICK, this, this.gotoView, [sysopen.ID]);
                this.img_di.on(Laya.Event.CLICK, this, this.gotoView, [sysopen.ID]);
            }
            else {
                this.lab_name.text = "";
                this.btn_goto.off(Laya.Event.CLICK, this, this.gotoView);
                this.img_di.off(Laya.Event.CLICK, this, this.gotoView);
            }
        };
        GetItemRender.prototype.gotoView = function (funId) {
            if (this.isBtnFunctiNotonOpen(funId))
                return;
            if (funId == ModuleConst.SHOP) {
                var uiPanel_1 = UIMgr.getUIByName(UIConst.Equip_JumpView);
                if (uiPanel_1) {
                    var good_1 = tb.TB_goods.get_TB_goods().find(function (vo) { return vo.item_id[0] == uiPanel_1.dataSource; });
                    if (good_1) {
                        var model_1 = game.ShopModel.getInstance();
                        model_1.requestShopList(good_1.type)
                            .then(function () {
                            var data = { item: good_1, arrlimit: model_1.getLimitNumById(good_1.type, good_1.ID) };
                            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_GOUMAI_PANEL), data);
                        });
                    }
                }
            }
            else {
                dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [funId]);
            }
            dispatchEvt(new game.EquipEvent(game.EquipEvent.CLOSE_JUMP_VIEW));
        };
        /**判断是否开启 */
        GetItemRender.prototype.isBtnFunctiNotonOpen = function (fundId) {
            var tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
            if (tbData && !App.IsSysOpen(fundId)) {
                showToast(tbData.prompt);
                return true;
            }
            return false;
        };
        return GetItemRender;
    }(ui.god.render.GetItemBoxUI));
    game.GetItemRender = GetItemRender;
})(game || (game = {}));
