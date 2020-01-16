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
    var MasterView = /** @class */ (function (_super) {
        __extends(MasterView, _super);
        function MasterView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        MasterView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.bgPanel.dataSource = { uiName: UIConst.Equip_MasterView, closeOnSide: this.isModelClose };
            var data = this.dataSource[0];
            var type = this.dataSource[1];
            this.bgPanel.updateTitle(type == EquipTabType.strength ? LanMgr.getLan("", 12595) : LanMgr.getLan("", 12596));
            var str = type == EquipTabType.strength ? LanMgr.getLan("", 10304) : LanMgr.getLan("", 10305);
            // 当前级
            var nowlevel = type == EquipTabType.strength ? data.countMasterLevel() : data.refineMasterLevel();
            if (nowlevel == 0) {
                this.lab_masterName.text = LanMgr.getLan("", 12593, str);
            }
            else {
                this.lab_masterName.text = LanMgr.getLan("", 12594, str, nowlevel);
            }
            var now = type == EquipTabType.strength ? tb.TB_strength_suit.get_TB_strength_suitById(nowlevel) : tb.TB_refine_suit.get_TB_refine_suitById(nowlevel);
            var next = type == EquipTabType.strength ? tb.TB_strength_suit.get_TB_strength_suitById(nowlevel + 1) : tb.TB_refine_suit.get_TB_refine_suitById(nowlevel + 1);
            var ary = [];
            if (!now) {
                now = type == EquipTabType.strength ? new tb.TB_strength_suit() : new tb.TB_refine_suit();
                now.ID = 0;
                now.level = 0;
                now.attr = [[1, 0], [2, 0], [3, 0]];
            }
            ary.push(now);
            if (next) {
                ary.push(next);
                this.list_levelInfo.array = ary;
                this.list_levelInfo.width = 550;
                this.imgArrow.visible = true;
            }
            else {
                this.list_levelInfo.array = ary;
                this.list_levelInfo.width = 232;
                this.imgArrow.visible = false;
            }
            Laya.timer.frameOnce(3, this, this.delayRender);
        };
        MasterView.prototype.delayRender = function () {
            for (var i = 0; i < this.list_levelInfo.cells.length; i++) {
                var item = this.list_levelInfo.cells[i];
                item && item.refreshData(i == 0);
            }
        };
        MasterView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.timer.clearAll(this);
            this.list_levelInfo.array = null;
            this.bgPanel.dataSource = null;
        };
        return MasterView;
    }(ui.equip.EquipMasterUI));
    game.MasterView = MasterView;
    var MasterItemRender = /** @class */ (function (_super) {
        __extends(MasterItemRender, _super);
        function MasterItemRender() {
            var _this = _super.call(this) || this;
            _this.list_attr.renderHandler = new Handler(_this, _this.onAttrRender);
            return _this;
        }
        Object.defineProperty(MasterItemRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        MasterItemRender.prototype.initView = function () {
            var tbSuit = this.dataSource;
            if (this._dataSource) {
                if (tbSuit instanceof tb.TB_strength_suit) {
                    this.lab_masterLv.text = LanMgr.getLan("", 12435, tbSuit.ID);
                    this.lab_need.text = LanMgr.getLan("", 12437, tbSuit.level);
                    this.lab_need.visible = tbSuit.ID > 0;
                    this.list_attr.array = tbSuit.attr;
                }
                else if (tbSuit instanceof tb.TB_refine_suit) {
                    this.lab_masterLv.text = LanMgr.getLan("", 12436, tbSuit.ID);
                    this.lab_need.text = LanMgr.getLan("", 12438, tbSuit.level);
                    this.lab_need.visible = tbSuit.ID > 0;
                    this.list_attr.array = tbSuit.attr;
                }
            }
            else {
                this.list_attr.array = null;
            }
        };
        MasterItemRender.prototype.onAttrRender = function (item, index) {
            var data = item.dataSource;
            if (data) {
                var type = data[0];
                var num = data[1];
                item.text = iface.tb_prop.attrType[type] + "：+" + num;
            }
        };
        MasterItemRender.prototype.refreshData = function (isNow) {
            for (var i = 0; i < this.list_attr.cells.length; i++) {
                var item = this.list_attr.cells[i];
                // item.color = isNow ? "#45290a":"#ebb868";
            }
        };
        return MasterItemRender;
    }(ui.equip.MasterRenderUI));
    game.MasterItemRender = MasterItemRender;
})(game || (game = {}));
