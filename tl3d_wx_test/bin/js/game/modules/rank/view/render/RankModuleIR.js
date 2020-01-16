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
    var RankModuleIR = /** @class */ (function (_super) {
        __extends(RankModuleIR, _super);
        function RankModuleIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RankModuleIR.prototype, "dataSource", {
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
        RankModuleIR.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                var model_1 = game.RankModel.getInstance();
                var names = game.RankModel.getInstance().arrRankListName.find(function (vo) { return vo[2] == model_1.curRankType; });
                this.redPoint.setRedPointName(names[1]);
                this.ui_view.dataSource = { rank: data.king + 1 };
                if (!data.hasOwnProperty("name")) {
                    this.box_info.visible = false;
                    this.lab_empty.visible = true;
                    return;
                }
                this.box_info.visible = true;
                this.lab_empty.visible = false;
                //公会
                this.lab_guildName.text = "公会：" + (data.guildName ? data.guildName == "" ? LanMgr.getLan("无", -1) : data.guildName : LanMgr.getLan("无", -1));
                //是否可以膜拜
                var can = App.hero.worshipInfo[names[2]] ? true : false;
                //
                var valueName = LanMgr.getLan(names[3], -1);
                this.lab_name.text = data.name;
                this.ui_headBox.dataSource = new UserHeadVo(data.head, data.level, data.headFrame, data instanceof game.GuildRankListVo);
                //进行排序
                //判断是否是公会
                if (model_1.curRankType == 4) {
                    this.ui_headBox.off(Laya.Event.CLICK, this, this.onClick);
                    this.lab_name.text = '会长：' + data.name;
                    this.lab_name.y = 70;
                    this.lab_guildName.y = 35;
                }
                else {
                    this.ui_headBox.on(Laya.Event.CLICK, this, this.onClick);
                    this.lab_name.y = 35;
                    this.lab_guildName.y = 70;
                }
                //第一名
                if (data.king == 0) {
                    this.lab_value1.text = valueName + "：" + data.value;
                    this.btn_wordShip.on(Laya.Event.CLICK, this, this.wordShip);
                    this.btn_wordShip.selected = this.btn_wordShip.disabled = can;
                    this.btn_wordShip.label = can ? LanMgr.getLan("已膜拜", -1) : LanMgr.getLan("膜拜", -1);
                    //判断是否是公会
                    if (model_1.curRankType == 4) {
                        this.lab_guildName.y = 20;
                        this.lab_name.y = 50;
                        this.lab_value1.y = 80;
                    }
                    else {
                        this.lab_name.y = 20;
                        this.lab_guildName.y = 50;
                        this.lab_value1.y = 80;
                    }
                }
                else {
                    //被膜拜遮盖的具体数值
                    this.lab_value2.text = valueName;
                    this.lab_value22.text = data.value;
                    this.btn_wordShip.off(Laya.Event.CLICK, this, this.wordShip);
                }
                //右边数值的显示
                // this.lab_value2.visible = this.lab_value22.visible = data.king != 0;
                //按钮和左边值1的显示状态
                // this.lab_value1.visible = data.king == 0;
                this.lab_value2.visible = this.lab_value22.visible = true;
                this.lab_value1.visible = false;
                this.btn_wordShip.visible = false;
            }
            else {
                this.btn_wordShip.off(Laya.Event.CLICK, this, this.wordShip);
                this.redPoint.onDispose();
            }
        };
        RankModuleIR.prototype.updateBtn = function () {
            var data = this.dataSource;
            if (data.king == 0) {
                this.btn_wordShip.visible = false;
            }
        };
        RankModuleIR.prototype.wordShip = function () {
            dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RANKINGLIST_IS_WORKSHIP));
        };
        RankModuleIR.prototype.onClick = function () {
            if (this.dataSource) {
                UIUtil.showPlayerLineupInfo(this.dataSource.playerId);
            }
        };
        return RankModuleIR;
    }(ui.rank.render.RankIRUI));
    game.RankModuleIR = RankModuleIR;
})(game || (game = {}));
