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
    /** 战斗结算界面 */
    var BattleSettlement = /** @class */ (function (_super) {
        __extends(BattleSettlement, _super);
        function BattleSettlement() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        BattleSettlement.prototype.popup = function (closeOther, showEffect) {
            var _this = this;
            var data = this.dataSource;
            var isWin = data.type == playState.VICTORY;
            if (isWin) {
                this.bgPanel.showTitle(true, "zhandoubiaoxian/shengli.png", true, true, true, null, this);
            }
            else {
                this.bgPanel.showTitle(false, "zhandoubiaoxian/shibai.png", false, true, false, null, this);
            }
            this.bgPanel.height = isWin ? 541 : 726;
            this.height = isWin ? 525 : 710;
            this.closeByBlank.y = isWin ? 540 : 723;
            this.channel.visible = this.imgForce.visible = false;
            _super.prototype.popup.call(this, closeOther, false);
            this.initView();
            this.channel.callback = function () {
                _this.close();
            };
            this.bgPanel.bg.height = this.height - this.bgPanel.bg.y;
        };
        BattleSettlement.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.rewardList.renderHandler = new Handler(this, this.itemRender);
        };
        BattleSettlement.prototype.initView = function () {
            var data = this.dataSource;
            var info = data.copyVo;
            // let copyvo: modulefights.FightVo = info.vo;
            var succ = data.type == playState.VICTORY;
            // let infoVo: modulegoddomain.MyTeamInfoVo = copyvo.godDomainVo;
            this.lbCount.text = "\u5956\u52B1\u6B21\u6570\uFF1A" + App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) + "\u6B21";
            var responseData = info.responseData;
            if (responseData) {
                this.rewardList.array = responseData.itemData;
                var mvpInfo = responseData.mvpInfo;
                this.headBox.dataSource = new UserHeadVo(mvpInfo.head, mvpInfo.level, mvpInfo.headFrame);
                this.lbMVP.text = mvpInfo.name;
                this.lbForce.value = mvpInfo.force + "";
                var score = responseData.scoreInfo[0] - responseData.scoreInfo[1];
                this.lbScore.text = "\u795E\u57DF\u79EF\u5206\uFF1A" + score + " +" + responseData.scoreInfo[1];
                this.lbScore.y = this.rewardList.y + responseData.itemData.length * 42 + 10;
                this.lbCount.y = this.lbScore.y + 40;
                if (this.channel.visible) {
                    this.imgForce.y = this.lbCount.y + 34;
                    this.channel.y = this.imgForce.y + 33;
                    this.height = this.bgPanel.height = this.channel.y + this.channel.height + 40;
                }
                else {
                    this.height = this.bgPanel.height = this.lbCount.y + 60;
                }
            }
            else {
                this.rewardList.array = null;
                this.headBox.dataSource = null;
                this.lbMVP.text = this.lbForce.value = this.lbScore.text = "";
            }
        };
        BattleSettlement.prototype.itemRender = function (cell, index) {
            var info = cell.dataSource;
            ;
            var imgRes = cell.getChildByName("imgRes");
            var lbValue = cell.getChildByName("lbValue");
            var lbExtral = cell.getChildByName("lbExtral");
            if (info) {
                var id = Number(info[0]);
                var item = tb.TB_item.get_TB_itemById(id);
                var count = info[1];
                // 只有神域币有加成
                var percent = item.ID == iface.tb_prop.resTypeKey.godDomain ? (game.GodDomainModel.getInstance().myTeam.rewardAdd / 100) : 1;
                var initCount = Math.round(count / percent);
                var addCount = count - initCount;
                // lbName.text = `获得${item.name}：`;
                lbValue.text = "+" + initCount;
                lbExtral.text = addCount > 0 ? "+" + addCount + "(" + LanMgr.getLan("", 12326, game.GodDomainModel.getInstance().myTeam.rewardAdd - 100) + ")" : "";
                lbValue.event(Laya.Event.RESIZE);
                lbExtral.event(Laya.Event.RESIZE);
                imgRes.skin = SkinUtil.getCostSkin(item.ID);
            }
        };
        BattleSettlement.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rewardList.array = null;
        };
        BattleSettlement.prototype.close = function () {
            dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
            _super.prototype.close.call(this);
        };
        return BattleSettlement;
    }(ui.goddomain.BattleSettlementUI));
    game.BattleSettlement = BattleSettlement;
})(game || (game = {}));
