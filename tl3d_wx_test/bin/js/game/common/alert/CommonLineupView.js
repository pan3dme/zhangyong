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
var common;
(function (common) {
    var CommonLineupView = /** @class */ (function (_super) {
        __extends(CommonLineupView, _super);
        function CommonLineupView() {
            return _super.call(this) || this;
        }
        CommonLineupView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._godItems = [];
            for (var i = 0; i < 6; i++) {
                var headBox = this["godBox" + i];
                headBox.ui_head.mouseEnabled = false;
                headBox.on(Laya.Event.CLICK, this, this.onShowGodInfo);
                this._godItems.push(headBox);
            }
        };
        Object.defineProperty(CommonLineupView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                if (v) {
                    this.initView();
                }
                else {
                    this.onExit();
                }
            },
            enumerable: true,
            configurable: true
        });
        CommonLineupView.prototype.initView = function () {
            var info = this.dataSource;
            info.userLevel = info.userLevel || 999;
            this.setLinueBox();
            var ary = info.shenqiAry;
            var shenqiId = ary && ary.length > 0 ? ary[0] : 0;
            this.imgShenqi.visible = shenqiId > 0;
            if (shenqiId > 0) {
                var tbShenqi = tb.TB_artifact.get_TB_artifactById(shenqiId);
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(tbShenqi.icon);
            }
            this.lbShenli.visible = this.imgShenli.visible = info.showShenli;
            this.lbTitle.visible = !info.showShenli;
            this.lbShenli.text = info.force + "";
            this.lbTitle.text = info.title;
        };
        /**设置阵容数据 */
        CommonLineupView.prototype.setLinueBox = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var lineupAry = info.lineupGods || [];
            var posAry = [];
            var tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            for (var i = 0; i < 6; i++) {
                var godVo = lineupAry[i];
                var headBox = this._godItems[i];
                var lbPos = this["lbPos" + i];
                var lbLock = this["lbLock" + i];
                var imgLock = this["imgLock" + i];
                var isUnloc = tabgameset.lineup[i] <= info.userLevel;
                lbPos.visible = isUnloc && !godVo;
                lbLock.visible = imgLock.visible = !isUnloc;
                lbLock.text = tabgameset.lineup[i] + "\u7EA7\u5F00\u542F";
                lbPos.text = i < 2 ? "前排" : "后排";
                if (godVo instanceof GodItemVo) {
                    headBox.dataSource = godVo;
                    headBox.visible = godVo ? true : false;
                    posAry.push(godVo.tab_god.race_type);
                }
                else if (godVo instanceof tb.TB_monster) {
                    headBox.dataSource = godVo;
                    headBox.visible = godVo ? true : false;
                    posAry.push(godVo.race_type);
                }
                else {
                    headBox.visible = false;
                    posAry.push(-1);
                }
            }
            this.guanghuanUI.initView(0, posAry);
        };
        CommonLineupView.prototype.clearGodList = function () {
            for (var i = 0; i < this._godItems.length; i++) {
                var godui = this._godItems[i];
                godui.dataSource = null;
            }
        };
        /** 显示神灵信息 */
        CommonLineupView.prototype.onShowGodInfo = function (event) {
            var headBox = event.currentTarget;
            if (headBox && headBox.dataSource) {
                dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), headBox.dataSource);
            }
        };
        CommonLineupView.prototype.onExit = function () {
            this.guanghuanUI.onExit();
            this.clearGodList();
            this._dataSource = null;
        };
        return CommonLineupView;
    }(ui.god.CommonLineupViewUI));
    common.CommonLineupView = CommonLineupView;
})(common || (common = {}));
