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
    var EquipRecycleView = /** @class */ (function (_super) {
        __extends(EquipRecycleView, _super);
        function EquipRecycleView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this.btn_recycle.on(Laya.Event.CLICK, _this, _this.recycle);
            return _this;
        }
        EquipRecycleView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.lab_info.text = LanMgr.getLan("", 12592, this.dataSource.length);
            this.bgPanel.dataSource = { uiName: UIConst.Equip_Recycle, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12591) };
            var ary = game.EquipModel.getInstance().countReturnItem(this.dataSource);
            this.list_item.spaceX = ary.length >= 6 ? 6 : 15;
            this.list_item.array = ary;
            this.list_item.width = ary.length >= 6 ? 525 : (ary.length * 90 + (ary.length - 1) * this.list_item.spaceX);
        };
        EquipRecycleView.prototype.recycle = function () {
            var _this = this;
            var keyArry = new Array;
            for (var i = 0; i < this.dataSource.length; i++) {
                keyArry.push(Number(this.dataSource[i].uuid));
            }
            var args = {};
            args[Protocol.game_equip_recycle.args.equipKeys] = keyArry;
            PLC.request(Protocol.game_equip_recycle, args, function ($data, msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                UIMgr.hideUIByName(UIConst.EquipChangeView);
                _this.close();
            });
        };
        EquipRecycleView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.dataSource = null;
            this.list_item.array = null;
        };
        return EquipRecycleView;
    }(ui.equip.EquipRecycleUI));
    game.EquipRecycleView = EquipRecycleView;
})(game || (game = {}));
