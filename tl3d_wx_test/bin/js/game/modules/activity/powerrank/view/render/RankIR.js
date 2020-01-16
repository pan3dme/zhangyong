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
    var PrRankIR = /** @class */ (function (_super) {
        __extends(PrRankIR, _super);
        function PrRankIR() {
            var _this = _super.call(this) || this;
            _this.starlist.renderHandler = new Handler(_this, _this.onStarRender);
            return _this;
        }
        Object.defineProperty(PrRankIR.prototype, "dataSource", {
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
        PrRankIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                //排名
                if (info.index < 3) {
                    this.lb_rank.visible = false;
                    this.img_rank.visible = true;
                    this.img_rank.skin = SkinUtil.getRankingSkin(info.index);
                }
                else {
                    this.lb_rank.visible = true;
                    this.img_rank.visible = false;
                    this.lb_rank.text = info.rank;
                }
                if (info.hasPerson) {
                    //有人
                    this.ui_head.visible = true;
                    var data = new UserHeadVo(info.head, info.level, info.headFrame, false);
                    this.ui_head.dataSource = data;
                    this.lb_name.text = info.name;
                    this.lab_type.text = info.getTitle();
                    this.lb_power.text = info.getValueDesc();
                    if (info.id == game.PrRankVo.ID_SHENLING) {
                        this.lab_god.text = info.getShenLingName();
                        this.lb_guild.text = "";
                        this.starlist.visible = true;
                        var tempStararry = new Array;
                        var num = info.power > 5 ? info.power - 5 : info.power;
                        for (var i = 0; i < num; i++) {
                            tempStararry[i] = info.power >= 6 ? true : false;
                        }
                        this.starlist.dataSource = tempStararry;
                        // this.starlist.x = 50 + (this.starlist.width - this.starlist.width/num)/2;
                    }
                    else {
                        this.lab_god.text = "";
                        this.lb_guild.text = !info.guild || info.guild == "" ? LanMgr.getLan("", 12084) : info.guild;
                        this.starlist.visible = false;
                    }
                    this.ui_head.on(Laya.Event.CLICK, this, this.onShowInfo);
                }
                else {
                    //空
                    this.ui_head.visible = false;
                    this.lab_god.text = LanMgr.getLan("", 12508);
                    this.lb_name.text = "";
                    this.lb_guild.text = "";
                    this.lb_power.text = info.getConditionDesc();
                    this.lab_type.text = info.getConditionTitle();
                    this.starlist.visible = false;
                    this.starlist.dataSource = null;
                    this.ui_head.off(Laya.Event.CLICK, this, this.onShowInfo);
                }
            }
            else {
                this.ui_head.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        };
        PrRankIR.prototype.onShowInfo = function () {
            var info = this.dataSource;
            if (info) {
                UIUtil.showPlayerLineupInfo(info.playerID);
            }
        };
        PrRankIR.prototype.onStarRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
            }
            else
                cell.skin = SkinUtil.xingxing;
        };
        return PrRankIR;
    }(ui.activity.powerrank.rankIRUI));
    game.PrRankIR = PrRankIR;
})(game || (game = {}));
