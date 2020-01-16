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
    var SevenDayIR = /** @class */ (function (_super) {
        __extends(SevenDayIR, _super);
        function SevenDayIR() {
            var _this = _super.call(this) || this;
            _this.btn_lingqu.on(Laya.Event.CLICK, _this, _this.getGigft);
            return _this;
        }
        Object.defineProperty(SevenDayIR.prototype, "dataSource", {
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
        SevenDayIR.prototype.refreshData = function () {
            var $data = this._dataSource;
            if ($data) {
                var arrAwerad = new Array();
                for (var i in $data.reward) {
                    arrAwerad.push(new ItemVo($data.reward[i][0], $data.reward[i][1]));
                }
                this.list_item.dataSource = arrAwerad;
                var dayBool = App.hero.welfare.totalLoginDay >= $data.ID;
                this.lab_level.text = $data.ID + LanMgr.getLan("日礼包:", -1);
                this.btn_lingqu.disabled = App.hero.welfare.totalLoginDay < $data.ID;
                this.btn_lingqu.label = dayBool ? LanMgr.getLan("领取", -1) : LanMgr.getLan("未达到", -1);
                this.img_already.visible = $data.ID in App.hero.welfare.loginGiftPack;
                this.btn_lingqu.visible = !this.img_already.visible;
            }
            else {
            }
        };
        /**领取登录礼包 */
        SevenDayIR.prototype.getGigft = function () {
            var _this = this;
            var args = {};
            args[Protocol.game_welfare_loginGiftPack.args.id] = this._dataSource.ID;
            PLC.request(Protocol.game_welfare_loginGiftPack, args, function ($data, msg) {
                logdebug($data);
                if (!$data)
                    return;
                _this.img_already.visible = true;
                _this.btn_lingqu.visible = false;
                UIUtil.showRewardView($data.commonData);
            });
        };
        return SevenDayIR;
    }(ui.activity.huodong.welfare.render.DengjilibaoRenderUI));
    game.SevenDayIR = SevenDayIR;
})(game || (game = {}));
