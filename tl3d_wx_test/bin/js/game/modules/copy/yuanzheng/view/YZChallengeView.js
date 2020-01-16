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
    var YZChallengeView = /** @class */ (function (_super) {
        __extends(YZChallengeView, _super);
        function YZChallengeView() {
            return _super.call(this) || this;
        }
        YZChallengeView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this._godItems = [];
            for (var i = 0; i < 6; i++) {
                var headBox = this["godBox" + i];
                headBox.on(Laya.Event.CLICK, this, this.onShowGodInfo);
                this._godItems.push(headBox);
            }
            this.bgPanel.dataSource = { uiName: UIConst.Yuanzheng_ChallengeView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12127) };
            this.btnChallenge.on(Laya.Event.CLICK, this, this.onChallenge);
        };
        YZChallengeView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        YZChallengeView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        YZChallengeView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rewardList.array = null;
            this.headBox.dataSource = null;
        };
        YZChallengeView.prototype.initView = function () {
            var info = this.dataSource;
            var reawrds = info.guanqiaVo.tbCopy.getRewardList();
            this.rewardList.array = reawrds;
            this.rewardList.width = reawrds.length * 100 + (reawrds.length - 1) * this.rewardList.spaceX;
            this.lbName.text = info.svo.name;
            this.lbShenli.text = Math.ceil(info.svo.force).toString();
            this.headBox.dataSource = info.headVo;
            var gods = info.getLineupGods();
            var buzhenVoList = gods.map(function (god) {
                if (god) {
                    var itemVo = new game.BuzhenListItemVo(god, iface.tb_prop.lineupTypeKey.expedition);
                    itemVo.showBlood = true;
                    itemVo.hp = info.getEnemyGodHp(god.templateId);
                    itemVo.totalHp = info.getGodTotalHp(god.templateId);
                    return itemVo;
                }
                return null;
            });
            this.setLinueBox(buzhenVoList);
            // 神器
            var ary = info.getShenqiAry();
            var shenqiId = ary && ary.length > 0 ? ary[0] : 0;
            this.imgShenqi.visible = shenqiId > 0;
            if (shenqiId > 0) {
                var tbShenqi = tb.TB_artifact.get_TB_artifactById(shenqiId);
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(tbShenqi.icon);
            }
        };
        /**设置阵容数据 */
        YZChallengeView.prototype.setLinueBox = function (buzhenVoList) {
            var posAry = [];
            buzhenVoList = buzhenVoList ? buzhenVoList : [];
            for (var i = 0; i < 6; i++) {
                var headBox = this._godItems[i];
                var buzhenVo = buzhenVoList[i];
                if (buzhenVo && buzhenVo.godVo) {
                    headBox.dataSource = buzhenVo;
                    headBox.visible = buzhenVo ? true : false;
                    posAry.push(buzhenVo.godVo.tab_god.race_type);
                }
                else {
                    headBox.visible = false;
                    posAry.push(-1);
                }
            }
            this.guanghuanUI.initView(0, posAry);
        };
        YZChallengeView.prototype.onShowGodInfo = function (event) {
            var headBox = event.target;
            if (headBox.dataSource) {
                var buzhenVo = headBox.dataSource;
                var godVo = buzhenVo ? buzhenVo.godVo : null;
                if (buzhenVo && godVo) {
                    UIUtil.showGodTip(godVo.templateId, { degree: godVo.degree, starLevel: godVo.starLevel, level: godVo.level });
                }
            }
        };
        YZChallengeView.prototype.onChallenge = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.GOTO_SET_LINUEP, this.dataSource));
        };
        return YZChallengeView;
    }(ui.yuanzheng.ChallengeInfoViewUI));
    game.YZChallengeView = YZChallengeView;
})(game || (game = {}));
