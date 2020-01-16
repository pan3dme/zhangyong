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
    /** 报名界面 */
    var GloryWaitView = /** @class */ (function (_super) {
        __extends(GloryWaitView, _super);
        function GloryWaitView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        GloryWaitView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GloryModel.getInstance();
            this._itemList = [];
            for (var i = 1; i <= 3; i++) {
                var rankIR = new game.gloryLastRankPropIR(this["boxRank" + i]);
                this._itemList.push(rankIR);
            }
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GLORY_FIGHT, 0);
        };
        GloryWaitView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GloryWaitView.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.timer.clear(this, this.updateTime);
            for (var _i = 0, _a = this._itemList; _i < _a.length; _i++) {
                var item = _a[_i];
                item.dataSource = null;
            }
        };
        GloryWaitView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        GloryWaitView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onAward.bind(this) },
                { btnSkin: SkinUtil.btn_record, callback: this.onRecord.bind(this) },
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.honour];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, funList: funList, resAry: resAry, closeCallback: this.onFanHui.bind(this) });
            var model = this._model;
            // let isJoin = model.isJoin();
            if (model.isInGameTime()) {
                this.lbTime.text = "";
            }
            else {
                this.updateTime();
                Laya.timer.clear(this, this.updateTime);
                Laya.timer.loop(1000, this, this.updateTime);
            }
            this.updateBtn();
            this.btnJoin.on(Laya.Event.CLICK, this, this.onJoin);
            this.btnLast.on(Laya.Event.CLICK, this, this.onLast);
            // 设置上届排行信息
            var rankList = model.getLastRankList();
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dataSource = rankList[i];
            }
            this.btnLast.visible = model.season > 1;
            this.btnJoin.centerX = this.btnLast.visible ? 100 : 0;
            if (!model.isHasShow) {
                model.isHasShow = true;
                dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_REDPOINT));
            }
        };
        /** 更新时间 */
        GloryWaitView.prototype.updateTime = function () {
            var model = this._model;
            var endJoinTime = model.endJoinTime;
            var startTime = model.startGameTime;
            var curTime = App.serverTimeSecond;
            // && !model.isJoin()
            if (curTime < endJoinTime) {
                this.lbTime.text = LanMgr.getLan("", 12391) + GameUtil.getTimeStr(endJoinTime - curTime);
                ;
            }
            else if (curTime < startTime) {
                this.lbTime.text = LanMgr.getLan("", 12392) + GameUtil.getTimeStr((startTime - curTime));
            }
            else {
                this.lbTime.text = "";
                Laya.timer.clear(this, this.updateTime);
                dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW));
            }
        };
        /** 更新按钮状态 */
        GloryWaitView.prototype.updateBtn = function () {
            var model = this._model;
            var isJoin = model.isJoin();
            var canotJoin = !model.isInJoinTime();
            this.btnJoin.disabled = isJoin || canotJoin;
            this.btnJoin.label = isJoin ? LanMgr.getLan("", 12281) : (canotJoin ? LanMgr.getLan("", 12390) : LanMgr.getLan("", 12284));
        };
        /** 报名 */
        GloryWaitView.prototype.onJoin = function () {
            var _this = this;
            var model = this._model;
            if (!model.isInJoinTime()) {
                showToast(LanMgr.getLan("", 10342));
                return;
            }
            if (model.isJoin()) {
                showToast(LanMgr.getLan("", 10343));
                return;
            }
            PLC.request(Protocol.game_honour_reg, null, function ($data) {
                if (!$data)
                    return;
                App.hero.copyInfo.honourWarRegTime = $data['regTime'];
                _this.updateBtn();
                dispatchEvt(new game.GloryEvent(game.GloryEvent.JOIN_SUCCESS));
            });
        };
        /** 上届回顾 */
        GloryWaitView.prototype.onLast = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_LAST_REVIEW));
        };
        GloryWaitView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_KUAFU));
        };
        /** 奖励 */
        GloryWaitView.prototype.onAward = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_AWARD_VIEW));
        };
        /** 规则 */
        GloryWaitView.prototype.onRule = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_RULE_VIEW));
        };
        /** 商店 */
        GloryWaitView.prototype.onShop = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_SHOP_VIEW));
        };
        GloryWaitView.prototype.onRecord = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_RECORD_VIEW));
        };
        return GloryWaitView;
    }(ui.glory.GloryWaitUI));
    game.GloryWaitView = GloryWaitView;
})(game || (game = {}));
