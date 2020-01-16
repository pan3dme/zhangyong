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
    var ArenaRecordView = /** @class */ (function (_super) {
        __extends(ArenaRecordView, _super);
        function ArenaRecordView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12539) };
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        ArenaRecordView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        ArenaRecordView.prototype.initView = function () {
            this.recordList.array = this.dataSource;
            this.lab_norecord.visible = !this.dataSource || this.dataSource.length == 0;
        };
        ArenaRecordView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.recordList.array = null;
        };
        return ArenaRecordView;
    }(ui.arena.arena.ArenaRecordUI));
    game.ArenaRecordView = ArenaRecordView;
})(game || (game = {}));
