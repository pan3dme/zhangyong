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
    var ChestItemRender = /** @class */ (function (_super) {
        __extends(ChestItemRender, _super);
        function ChestItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChestItemRender.prototype, "dataSource", {
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
        ChestItemRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.bg.skin = SkinUtil.getGuildGradeBg(info.grade);
                if (info.name) {
                    var itemVo = new ItemVo(iface.tb_prop.resTypeKey.guildDonate, info.num);
                    this.itemBox.dataSource = itemVo;
                    this.lbItemName.stroke = this.lbName.stroke = 2;
                    if (info.grade == game.GuildGrade.bojin) {
                        this.lbItemName.strokeColor = this.lbName.strokeColor = "#bc5305";
                    }
                    else if (info.grade == game.GuildGrade.wangzhe) {
                        this.lbItemName.strokeColor = this.lbName.strokeColor = "#d34d24";
                    }
                    else {
                        this.lbItemName.strokeColor = this.lbName.strokeColor = "#374873";
                    }
                    this.lbItemName.text = itemVo.getName();
                    this.lbName.text = info.name;
                    this.itemBox.visible = this.lbName.visible = this.lbItemName.visible = true;
                    this.icon.visible = false;
                }
                else {
                    this.itemBox.visible = this.lbName.visible = this.lbItemName.visible = false;
                    this.icon.visible = true;
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        ChestItemRender.prototype.onClick = function () {
            var _this = this;
            var info = this.dataSource;
            if (info && !info.name) {
                var model = game.GuildFightModel.getInstance();
                if (model.maxGuildGrade < info.grade) {
                    showToast(LanMgr.getLan("", 10399, game.GuildFightModel.GRADE_NAME[info.grade]));
                    return;
                }
                if (model.isRewardByGrade(info.grade)) {
                    showToast(LanMgr.getLan("", 10400));
                    return;
                }
                var args = {};
                args[Protocol.game_guild_getGuildWarBoxReward.args.grade] = info.grade;
                args[Protocol.game_guild_getGuildWarBoxReward.args.pos] = info.index;
                PLC.request(Protocol.game_guild_getGuildWarBoxReward, args, function ($data) {
                    if (!$data)
                        return;
                    if ($data.hasOwnProperty('modifyBoxAwardCount')) {
                        App.hero.guildWarAwardCount = $data['modifyBoxAwardCount'];
                    }
                    UIUtil.showRewardView($data.commonData);
                    var modifyObj = $data.modifyBoxList[info.index];
                    if (modifyObj) {
                        info.name = modifyObj.name;
                        info.num = modifyObj.num;
                    }
                    _this.refreshData();
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.REWARD_CHEST_SUCCESS));
                });
            }
        };
        return ChestItemRender;
    }(ui.guild.fight.render.ChestItemRenderUI));
    game.ChestItemRender = ChestItemRender;
})(game || (game = {}));
