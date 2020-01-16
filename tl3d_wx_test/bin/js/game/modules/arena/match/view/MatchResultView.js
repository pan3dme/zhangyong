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
    var MatchResultView = /** @class */ (function (_super) {
        __extends(MatchResultView, _super);
        function MatchResultView() {
            var _this = _super.call(this) || this;
            _this._isTz = false;
            _this.isModelClose = true;
            return _this;
        }
        MatchResultView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.lbSelfScore.autoSize = this.lbSelfChg.autoSize = true;
            this.lbTarScore.autoSize = this.lbTarChg.autoSize = true;
            this.rewardList.renderHandler = Handler.create(this, this.renderItem, null, false);
        };
        MatchResultView.prototype.popup = function (closeOther, showEffect) {
            var info = this.dataSource;
            var responseData = info ? info.responseData : {};
            var battleEndInfo = responseData['battleEndInfo'];
            var isWin = battleEndInfo.selfChgScore > 0;
            this.height = !isWin ? 700 : 520;
            this.lbBlank.y = !isWin ? 730 : 550;
            if (isWin) {
                AudioMgr.playSound("sound/victory.mp3");
            }
            else {
                AudioMgr.playSound("sound/defeated.mp3");
            }
            this.bgPanel.showTitle(isWin, (isWin ? SkinUtil.title_shengli : SkinUtil.title_shibai), false, true, false, null, this);
            _super.prototype.popup.call(this, closeOther, false);
            this.initView();
        };
        MatchResultView.prototype.close = function () {
            _super.prototype.close.call(this);
            dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
        };
        MatchResultView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rewardList.array = null;
        };
        MatchResultView.prototype.initView = function () {
            var _this = this;
            var info = this.dataSource;
            var copyvo = info.vo;
            var matchVo = copyvo.arenaMatchVo;
            if (!matchVo) {
                logerror("fight result error");
                return;
            }
            var responseData = info.responseData;
            var battleEndInfo = responseData['battleEndInfo'];
            var isWin = battleEndInfo.selfChgScore > 0;
            var commonData = responseData['commonData'];
            var resAry = [];
            UIUtil.getRewardItemVoList(resAry, commonData);
            this.rewardList.array = resAry;
            this.selfHeadBox.dataSource = new UserHeadVo(App.hero.getHeadId(), App.hero.level, App.hero.headFrame);
            this.lbSelfName.text = App.hero.name;
            this.lbSelfScore.text = battleEndInfo.selfScore;
            this.lbSelfChg.text = battleEndInfo.selfChgScore > 0 ? "(+" + battleEndInfo.selfChgScore + ")" : "(" + battleEndInfo.selfChgScore + ")";
            this.lbSelfChg.color = isWin ? "#40ff7c" : "#94b4e3";
            this.lbSelfScore.event(Laya.Event.RESIZE);
            this.tarHeadBox.dataSource = new UserHeadVo(matchVo.head, matchVo.level, matchVo.headFrame);
            this.lbTarName.text = matchVo.name;
            this.lbTarScore.text = battleEndInfo.tarScore;
            this.lbTarChg.text = battleEndInfo.tarChgScore > 0 ? "(+" + battleEndInfo.tarChgScore + ")" : "(" + battleEndInfo.tarChgScore + ")";
            this.lbTarChg.color = isWin ? "#94b4e3" : "#40ff7c";
            this.lbTarScore.event(Laya.Event.RESIZE);
            this._isTz = false;
            this.channel.visible = this.imgForce.visible = !isWin;
            this.channel.callback = function () {
                _this._isTz = true;
                _this.close();
            };
        };
        MatchResultView.prototype.renderItem = function (cell, index) {
            var info = cell.dataSource;
            var lbName = cell.getChildByName("lbName");
            var imgRes = cell.getChildByName("imgRes");
            var lbValue = cell.getChildByName("lbValue");
            if (info) {
                var item = tb.TB_item.get_TB_itemById(info.id);
                lbName.text = LanMgr.getLan("", 12546) + item.name;
                lbValue.text = "+" + info.count;
                imgRes.skin = SkinUtil.getCostSkin(item.ID);
            }
        };
        return MatchResultView;
    }(ui.arena.match.MatchResultUI));
    game.MatchResultView = MatchResultView;
})(game || (game = {}));
