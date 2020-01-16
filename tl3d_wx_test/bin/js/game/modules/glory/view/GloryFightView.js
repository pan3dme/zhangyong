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
    /** 匹配界面 */
    var GloryFightView = /** @class */ (function (_super) {
        __extends(GloryFightView, _super);
        function GloryFightView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        GloryFightView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GloryModel.getInstance();
            this._tabBar = new common.CustomTabBar();
            this._tabBar.buttons = [this.btnBenfu, this.btnKuafu];
            this._tabBar.selectHandler = new Handler(this, this.selectTab);
            this._tabBar.selectedIndex = -1;
            this.btnLast.on(Laya.Event.CLICK, this, this.onShangjie);
        };
        GloryFightView.prototype.close = function () {
            _super.prototype.close.call(this);
            this._tabBar.selectedIndex = -1;
            this.listView.dataSource = null;
            Laya.timer.clearAll(this);
        };
        GloryFightView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        GloryFightView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            var funList = [
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onAward.bind(this) },
                { btnSkin: SkinUtil.btn_record, callback: this.onRecord.bind(this) },
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) }
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.honour];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            var model = this._model;
            this.lbTime.visible = this.lbNotice.visible = false;
            var curPhase = model.updateCurGroup();
            var index = game.GloryUtil.isInKuafu(curPhase) ? 1 : 0;
            var ary = this.dataSource;
            if (Array.isArray(ary) && ary.length > 0) {
                index = ary[0];
            }
            this._tabBar.selectedIndex = index;
            this.btnLast.visible = model.season > 1;
            if (!model.isHasShow) {
                model.isHasShow = true;
                dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_REDPOINT));
            }
        };
        /** 选择 */
        GloryFightView.prototype.selectTab = function (index) {
            var _this = this;
            if (index == -1)
                return;
            var model = this._model;
            var groupVo;
            // 当前阶段
            var curPhase = model.updateCurGroup();
            var isInKuafu = game.GloryUtil.isInKuafu(curPhase);
            // 选择本服时，如果当前为跨服或者跨服海选时 获取本服决赛数据
            if (index == 0) {
                curPhase = isInKuafu || curPhase == game.GloryId.kuafu_haixuan ? game.GloryId.benfu_juesai : curPhase;
                groupVo = model.getGroupListVoByGroup(curPhase);
            }
            else {
                if (!isInKuafu) {
                    showToast(LanMgr.getLan("", 10341));
                    this._tabBar.selectedIndex = 0;
                    return;
                }
                groupVo = model.getGroupListVoByGroup(curPhase);
            }
            if (groupVo.isNeedRequest(curPhase)) {
                game.GloryThread.requestMatchInfo(curPhase).then(function (isSuccess) {
                    if (isSuccess) {
                        _this.updateView(groupVo);
                    }
                    else {
                        // 切换回去
                        _this._tabBar.selectedIndex = _this._tabBar.selectedIndex == 0 ? 1 : 0;
                    }
                });
            }
            else {
                this.updateView(groupVo);
            }
        };
        /** 更新界面 */
        GloryFightView.prototype.updateView = function (listVo) {
            this._listVo = listVo;
            this.listView.show(listVo);
            this.updateLoop();
        };
        GloryFightView.prototype.updateLoop = function () {
            var listVo = this._listVo;
            if (!listVo)
                return;
            var index = this._tabBar.selectedIndex;
            var model = this._model;
            this.lbTime.visible = this.lbNotice.visible = false;
            Laya.timer.clearAll(this);
            var curGroup = model.updateCurGroup();
            var isInKuafu = game.GloryUtil.isInKuafu(curGroup);
            // 查看本服对决列表时
            if (index == 0 && !isInKuafu) {
                this._endTime = game.GloryUtil.getGroupEndTime(curGroup);
                this._endBetTime = this._endTime - tb.TB_honour_set.getSet().bet_endtime;
                this._endBetTime = App.serverTimeSecond >= this._endBetTime ? 0 : this._endBetTime;
                // 本服对决已结束
                if (curGroup == game.GloryId.kuafu_haixuan) {
                    this.lbTime.visible = this.lbNotice.visible = true;
                    this.lbNotice.text = LanMgr.getLan("", 12393);
                    Laya.timer.loop(1000, this, this.updateShowTime);
                    this.updateShowTime();
                }
                else {
                    this.lbTime.visible = this.lbNotice.visible = true;
                    this.lbNotice.text = model.getBetNotice();
                    Laya.timer.loop(1000, this, this.updateEndTime);
                    this.updateEndTime();
                }
            }
            else if (index == 1) {
                // 跨服决赛阶段已结束
                if (curGroup == game.GloryId.kuafu_juesai && App.serverTimeSecond >= game.GloryUtil.getGroupEndTime(curGroup)) {
                    this._endTime = game.GloryUtil.getFormatTime(7, 23, 59, 59) + 1;
                    this.lbTime.visible = this.lbNotice.visible = true;
                    this.lbNotice.text = LanMgr.getLan("", 12394);
                    Laya.timer.loop(1000, this, this.updateShowTime);
                    this.updateShowTime();
                }
                else {
                    this.lbTime.visible = this.lbNotice.visible = true;
                    this.lbNotice.text = model.getBetNotice();
                    this._endTime = game.GloryUtil.getGroupEndTime(curGroup);
                    this._endBetTime = this._endTime - tb.TB_honour_set.getSet().bet_endtime;
                    this._endBetTime = App.serverTimeSecond >= this._endBetTime ? 0 : this._endBetTime;
                    Laya.timer.loop(1000, this, this.updateEndTime);
                    this.updateEndTime();
                }
            }
        };
        /** 更新结束倒计时 */
        GloryFightView.prototype.updateEndTime = function () {
            var _this = this;
            if (!this._listVo)
                return;
            var group = this._listVo.curGroup;
            var time = this._endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = "" + LanMgr.getLan("", 12395) + GameUtil.toCountdown(time, "hh:mm:ss");
                if (this._endBetTime > 0 && App.serverTimeSecond >= this._endBetTime) {
                    this._endBetTime = 0;
                    this.listView.renderBtnState();
                }
            }
            else {
                Laya.timer.clearAll(this);
                this.lbTime.text = "";
                // 本服决赛或者跨服决赛时，请求时当前阶段的对决结果，否则请求的是下一个阶段的数据
                var nextGroup_1 = group == game.GloryId.benfu_juesai || group == game.GloryId.kuafu_juesai ? group : group + 1;
                //时间到更新胜负情况
                game.GloryThread.requestMatchInfo(nextGroup_1, true).then(function (isSuccess) {
                    if (isSuccess) {
                        _this.updateView(_this._model.getGroupListVoByGroup(nextGroup_1));
                    }
                });
            }
        };
        /** 更新显示倒计时 跨服海选赛及跨服决赛结束时显示 */
        GloryFightView.prototype.updateShowTime = function () {
            var _this = this;
            var listVo = this._listVo;
            if (!listVo)
                return;
            var model = this._model;
            var group = model.curPhase;
            var time = this._endTime - App.serverTimeSecond;
            if (time > 0) {
                this.lbTime.text = (group == game.GloryId.kuafu_haixuan ? LanMgr.getLan("", 12396) : LanMgr.getLan("", 12391)) + GameUtil.toCountdown(time, "hh:mm:ss");
            }
            else {
                Laya.timer.clearAll(this);
                this.lbTime.text = "";
                if (group == game.GloryId.kuafu_haixuan) {
                    game.GloryThread.requestMatchInfo(game.GloryId.kuafu_16t8, true).then(function (isSuccess) {
                        if (isSuccess) {
                            _this._tabBar.selectedIndex = 1;
                        }
                    });
                }
                else {
                    // 跨服决赛下轮倒计时完 转到到报名界面
                    model.weekRest();
                    dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW));
                }
            }
        };
        /** 更新列表 */
        GloryFightView.prototype.updateList = function () {
            if (!this._listVo)
                return;
            this.listView.show(this._listVo);
        };
        /** 上届回顾 */
        GloryFightView.prototype.onShangjie = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_LAST_REVIEW));
        };
        GloryFightView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_KUAFU));
        };
        /** 奖励 */
        GloryFightView.prototype.onAward = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_AWARD_VIEW));
        };
        /** 规则 */
        GloryFightView.prototype.onRule = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_RULE_VIEW));
        };
        /** 商店 */
        GloryFightView.prototype.onShop = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_SHOP_VIEW));
        };
        GloryFightView.prototype.onRecord = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_RECORD_VIEW));
        };
        return GloryFightView;
    }(ui.glory.GloryFightUI));
    game.GloryFightView = GloryFightView;
})(game || (game = {}));
