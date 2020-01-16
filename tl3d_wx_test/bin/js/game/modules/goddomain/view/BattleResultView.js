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
    /** 战斗结果界面 */
    var BattleSettlementView = /** @class */ (function (_super) {
        __extends(BattleSettlementView, _super);
        function BattleSettlementView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        BattleSettlementView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.myTeam.renderHandler = new Handler(this, this.itemRender);
            this.enemyTeam.renderHandler = new Handler(this, this.itemRender);
        };
        BattleSettlementView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, false);
            this.initView();
        };
        BattleSettlementView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.myTeam.array = null;
            this.enemyTeam.array = null;
        };
        BattleSettlementView.prototype.initView = function () {
            if (this.dataSource) {
                if (this.dataSource.type == playState.VICTORY) {
                    AudioMgr.playSound("sound/victory.mp3");
                }
                else {
                    AudioMgr.playSound("sound/defeated.mp3");
                }
            }
            var data = this.dataSource;
            var info = data.copyVo;
            var copyvo = info.vo;
            var infoVo = copyvo.godDomainVo;
            this.bgPanel.showTitle(true, "zhandoubiaoxian/duizhanjieguo.png", true, true, true, null, this);
            var responsData = info.responseData;
            // 我是否在左边 
            var selfInLeft = false;
            var leftAry = [];
            var svrLeftInfo = infoVo.leftInfo;
            for (var i = 0; i < svrLeftInfo.length; i++) {
                var obj = svrLeftInfo[i];
                var count = responsData.waveResults[1] ? responsData.waveResults[1][i] : 0;
                obj.count = count;
                if (obj.playerId == App.hero.playerId) {
                    selfInLeft = true;
                }
                leftAry.push(obj);
            }
            var rightAry = [];
            var svrRightInfo = infoVo.rightInfo;
            for (var i = 0; i < svrRightInfo.length; i++) {
                var obj = svrRightInfo[i];
                var count = responsData.waveResults[2] ? responsData.waveResults[2][i] : 0;
                obj.count = count;
                rightAry.push(obj);
            }
            // 我方在上面
            this.myTeam.array = selfInLeft ? leftAry : rightAry;
            // 我方在下面
            this.enemyTeam.array = selfInLeft ? rightAry : leftAry;
            // 设置输赢 我方是否输赢
            data.type = (selfInLeft && responsData.winCamp == 1) || (!selfInLeft && responsData.winCamp == 2) ? playState.VICTORY : playState.FAILURE;
            var isSucc = data.type == playState.VICTORY;
            this.imgResultBg1.skin = isSucc ? SkinUtil.izsy_bg_succ : SkinUtil.izsy_bg_fail;
            this.imgResult1.skin = isSucc ? SkinUtil.lb_victory : SkinUtil.lb_failure;
            this.imgResultBg1.scaleY = isSucc ? 1 : -1;
            this.imgResultBg2.skin = isSucc ? SkinUtil.izsy_bg_fail : SkinUtil.izsy_bg_succ;
            this.imgResult2.skin = isSucc ? SkinUtil.lb_failure : SkinUtil.lb_victory;
            this.imgResultBg2.scaleY = isSucc ? 1 : -1;
        };
        /** 渲染成员数据 */
        BattleSettlementView.prototype.itemRender = function (cell, index) {
            var lbName = cell.getChildByName("lbName");
            var lbCount = cell.getChildByName("lbCount");
            var uihead = cell.getChildByName("ui_head");
            var info = cell.dataSource;
            lbName.text = info.name;
            lbCount.dataSource = info.count;
            lbCount.value = info.count + "";
            uihead.dataSource = new UserHeadVo(info.head, info.level, info.headFrame);
        };
        BattleSettlementView.prototype.close = function () {
            this.bgPanel.closeTitle();
            var curData = this.dataSource;
            var copyData = { type: curData.type, copyVo: curData.copyVo, vo: curData.vo };
            _super.prototype.close.call(this);
            UIMgr.showUI(UIConst.GodDm_BattleSettlementView, copyData);
        };
        return BattleSettlementView;
    }(ui.goddomain.BattleResultUI));
    game.BattleSettlementView = BattleSettlementView;
})(game || (game = {}));
