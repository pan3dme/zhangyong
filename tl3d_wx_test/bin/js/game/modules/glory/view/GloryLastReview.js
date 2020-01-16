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
    /** 上届回顾 */
    var GloryLastReview = /** @class */ (function (_super) {
        __extends(GloryLastReview, _super);
        function GloryLastReview() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        GloryLastReview.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._tabBar = new common.CustomTabBar();
            this._tabBar.buttons = [this.btnBenfu, this.btnKuafu];
            this._tabBar.selectHandler = new Handler(this, this.selectTab);
            this._tabBar.selectedIndex = -1;
            this.btnBenjie.on(Laya.Event.CLICK, this, this.onBenjie);
        };
        GloryLastReview.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GloryLastReview.prototype.close = function () {
            _super.prototype.close.call(this);
            this._tabBar.selectedIndex = -1;
            this.listView.dataSource = null;
        };
        GloryLastReview.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        GloryLastReview.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onAward.bind(this) },
                { btnSkin: SkinUtil.btn_record, callback: this.onRecord.bind(this) },
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.honour];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            var ary = this.dataSource;
            var index = 1;
            if (Array.isArray(ary) && ary.length > 0) {
                index = ary[0];
            }
            this._tabBar.selectedIndex = index;
        };
        /** 选择 */
        GloryLastReview.prototype.selectTab = function (index) {
            var _this = this;
            if (index == -1)
                return;
            var model = game.GloryModel.getInstance();
            if (index == 0) {
                game.GloryThread.requestLastList(game.GloryId.benfu_juesai).then(function () {
                    var groupVo = model.getLastListVo(game.GroupType.benfu);
                    if (groupVo.getMatchList().length <= 0) {
                        showToast(LanMgr.getLan("", 10333));
                        _this._tabBar.selectedIndex = 1;
                        return;
                    }
                    _this.listView.show(groupVo);
                });
            }
            else {
                var groupVo = model.getLastListVo(game.GroupType.kuafu);
                this.listView.show(groupVo);
            }
        };
        GloryLastReview.prototype.onBenjie = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW));
        };
        GloryLastReview.prototype.onFanHui = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW));
        };
        /** 奖励 */
        GloryLastReview.prototype.onAward = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_AWARD_VIEW));
        };
        /** 规则 */
        GloryLastReview.prototype.onRule = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_RULE_VIEW));
        };
        /** 商店 */
        GloryLastReview.prototype.onShop = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_SHOP_VIEW));
        };
        GloryLastReview.prototype.onRecord = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_RECORD_VIEW));
        };
        return GloryLastReview;
    }(ui.glory.LastReviewUI));
    game.GloryLastReview = GloryLastReview;
})(game || (game = {}));
