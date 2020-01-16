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
    var ArenaRecordIR = /** @class */ (function (_super) {
        __extends(ArenaRecordIR, _super);
        function ArenaRecordIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ArenaRecordIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        ArenaRecordIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                this.lbname.text = data.name;
                this.lbtime.text = data.beforeTime();
                this.headbox.dataSource = new UserHeadVo(data.head, data.level, data.headFrame);
                this.lbtype.text = "" + (data.isChallenge() ? LanMgr.getLan("", 12540) : LanMgr.getLan("", 12541)) + (data.isWin ? LanMgr.getLan("", 12542) : LanMgr.getLan("", 12405));
                this.lbVal.color = data.isWin ? ColorConst.TASK_GREEN : ColorConst.RED;
                this.lbValPre.text = data.getChgValuePrev();
                var value = data.getChgValue();
                this.lbVal.text = value > 0 ? "+" + value : "" + value;
                this.imgrank.skin = data.getChangeTypeSkin();
                this.lbVal.event(Laya.Event.RESIZE);
                this.hbox.refresh();
                this.lbNone.visible = data.isNotChange();
                this.hbox.visible = !this.lbNone.visible;
                this.btnplay.visible = !data.isNpc();
                this.btnplay.on(Laya.Event.CLICK, this, this.onPlayback);
            }
            else {
                this.btnplay.off(Laya.Event.CLICK, this, this.onPlayback);
            }
        };
        /** 回放 */
        ArenaRecordIR.prototype.onPlayback = function () {
            var data = this.dataSource;
            if (data) {
                dispatchEvt(data.getEvent(), this.dataSource);
            }
        };
        return ArenaRecordIR;
    }(ui.arena.arena.render.ArenaRecordIRUI));
    game.ArenaRecordIR = ArenaRecordIR;
})(game || (game = {}));
