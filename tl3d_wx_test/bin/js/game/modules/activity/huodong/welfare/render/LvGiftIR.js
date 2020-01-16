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
    var LvGiftIR = /** @class */ (function (_super) {
        __extends(LvGiftIR, _super);
        function LvGiftIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(LvGiftIR.prototype, "dataSource", {
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
        LvGiftIR.prototype.refreshData = function () {
            var $data = this._dataSource;
            if ($data) {
                var arrAwerad = new Array();
                for (var i in $data.reward) {
                    arrAwerad.push(new ItemVo($data.reward[i][0], $data.reward[i][1]));
                }
                this.list_item.dataSource = arrAwerad;
                var levelBool = App.hero.level < $data.level;
                this.btn_lingqu.on(Laya.Event.CLICK, this, this.linquDengjiLiBao);
                var lingquBool = $data.ID in App.hero.welfare.levelGiftPack;
                this.img_already.visible = App.hero.welfare.totalLoginDay >= $data.ID;
                this.lab_level.text = $data.level + LanMgr.getLan("级奖励:", -1);
                this.btn_lingqu.skin = "comp/button/btn_qianwang.png";
                this.btn_lingqu.labelStrokeColor = "#538901";
                if (levelBool) {
                    this.btn_lingqu.label = LanMgr.getLan("未达到", -1);
                }
                else {
                    this.btn_lingqu.label = LanMgr.getLan("领取", -1);
                }
                this.btn_lingqu.disabled = levelBool;
                this.img_already.visible = lingquBool;
                this.btn_lingqu.visible = !this.img_already.visible;
            }
            else {
                this.btn_lingqu.off(Laya.Event.CLICK, this, this.linquDengjiLiBao);
            }
        };
        /**领取等级礼包 */
        LvGiftIR.prototype.linquDengjiLiBao = function () {
            var _this = this;
            var args = {};
            args[Protocol.game_welfare_levelGiftPack.args.id] = this._dataSource.ID;
            PLC.request(Protocol.game_welfare_levelGiftPack, args, function ($data, msg) {
                if (!$data)
                    return;
                _this.img_already.visible = true;
                _this.btn_lingqu.visible = false;
                UIUtil.showRewardView($data.commonData);
                if (UIMgr.hasStage(UIConst.WelfareView)) {
                    var ui_1 = UIMgr.getUIByName(UIConst.WelfareView);
                    ui_1.initDengjiView();
                }
            });
        };
        return LvGiftIR;
    }(ui.activity.huodong.welfare.render.DengjilibaoRenderUI));
    game.LvGiftIR = LvGiftIR;
})(game || (game = {}));
