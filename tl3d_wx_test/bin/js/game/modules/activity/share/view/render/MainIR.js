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
    var ShareMainIR = /** @class */ (function (_super) {
        __extends(ShareMainIR, _super);
        function ShareMainIR() {
            var _this = _super.call(this) || this;
            _this.btn_recive.on(Laya.Event.CLICK, _this, _this.onRecive);
            return _this;
        }
        ShareMainIR.prototype.onRecive = function () {
            if (this.btn_recive.gray) {
                //未达成
                showToast(this.btn_recive.label);
            }
            else {
                dispatchEvt(new game.ShareEvent(game.ShareEvent.SEND_RECIVE_REWARD), { id: this._dataSource.id, tabid: this._dataSource.tab.ID });
            }
        };
        Object.defineProperty(ShareMainIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        ShareMainIR.prototype.refreshData = function (item) {
            if (item) {
                var num = item.tab.type == 1 ? game.ShareModel.todayNum() : game.ShareModel.totalNum();
                var canrecive = num >= item.tab.share_num;
                this.list_reward.array = ary2prop(item.tab.reward);
                // this.lab_title.text = LanMgr.getLan(item.tab.desc, -1, item.tab.share_num, num);
                var tempStr = FormatStr(item.tab.desc, [item.tab.share_num, num]);
                var ary = tempStr.split("(");
                this.lab_title.text = ary[0];
                this.lbProgress.text = "(" + ary[1];
                this.lbProgress.color = canrecive ? "#40fe00" : "#f76768";
                this.btn_recive.skin = canrecive && !item.recive ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
                this.btn_recive.labelStrokeColor = canrecive && !item.recive ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
                this.btn_recive.label = item.recive ? LanMgr.getLan("", 10043) : canrecive ? LanMgr.getLan("", 10476) : LanMgr.getLan("", 11009);
                this.btn_recive.gray = !canrecive || item.recive;
                this.btn_recive.selected = this.btn_recive.gray;
                this.redpoint.setRedPointName("shareActivity" + item.tab.ID);
            }
            else {
                this.list_reward.array = [];
                this.lab_title.text = "";
                this.btn_recive.skin = null;
                this.redpoint.onDispose();
            }
        };
        return ShareMainIR;
    }(ui.activity.share.mainIRUI));
    game.ShareMainIR = ShareMainIR;
})(game || (game = {}));
