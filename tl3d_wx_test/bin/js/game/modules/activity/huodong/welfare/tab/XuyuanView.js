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
    var XuyuanView = /** @class */ (function (_super) {
        __extends(XuyuanView, _super);
        function XuyuanView() {
            var _this = _super.call(this) || this;
            /**光效 */
            // private _effect: LightBox;
            /**当前许愿次数 */
            // private _wishNumbers: number = 0;
            /**当前免费次数 */
            // private _wishfreeNumbers: number = 0;
            _this._IS_JUMP = false;
            _this._turnStartAng = 0;
            _this._turnTotalAng = 0;
            _this._turnStartTime = 0;
            _this._isPlayTurnAni = false;
            _this._xxSpeed = 0; //休闲动画速度
            _this._xxEndTime = 0;
            _this._isPlayXXAni = false;
            _this.initData();
            return _this;
        }
        XuyuanView.prototype.onAdd = function () {
            this.initView();
        };
        XuyuanView.prototype.onExit = function () {
            this.close();
        };
        XuyuanView.prototype.initView = function () {
            this.CalculationTimeDifference();
            this.img_one.on(Laya.Event.CLICK, this, this.onXuyuan, [0]);
            this.img_ten.on(Laya.Event.CLICK, this, this.onXuyuan, [1]);
            this.chk_jump.on(Laya.Event.CHANGE, this, this.onJump);
            this.chk_jump.selected = this._IS_JUMP;
            this.btn_tip.on(Laya.Event.CLICK, this, this.onClickTip);
            Laya.timer.loop(1000, this, this.CalculationTimeDifference);
            // this.label_diamonds.text = "X" + tb.TB_wish_set.get_TB_wish_set().cost_diamond;
            // this._wishNumbers = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum) - App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishMaxNum];
            // this._wishfreeNumbers = App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] ? App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] : 0;
            // this.resUpdate();
            this.setwishNums();
            Laya.timer.loop(1, this, this.updateAction);
        };
        XuyuanView.prototype.onJump = function () {
            this._IS_JUMP = this.chk_jump.selected;
        };
        //许愿数据
        XuyuanView.prototype.initData = function () {
            var tbdata = game.HuodongModel.getBoxTb(TURNTABLE.WISH);
            tbdata.sort(function (a, b) { return a.location - b.location; });
            for (var i = 0; i < tbdata.length; i++) {
                var item = this["item" + i];
                if (item) {
                    var itemvo = new ItemVo(tbdata[i].item[0], tbdata[i].item[1]);
                    itemvo.isShowEff = tbdata[i].is_show_effect == 1;
                    item.dataSource = itemvo;
                }
            }
        };
        /**文字、ui刷新 */
        // private resUpdate(): void {
        // 	this.lab_free.visible = this._wishfreeNumbers != 1;
        // 	this.img_diamonds.visible = this._wishfreeNumbers == 1;
        // 	this.label_freetime.visible = this._wishfreeNumbers == 1;
        // 	this.label_diamonds.visible = this._wishfreeNumbers == 1;
        // 	this.lab_cost_title.visible = this._wishfreeNumbers == 1;
        // 	this.label_vowcount.text = LanMgr.getLan("今日许愿次数：", -1) + this._wishNumbers.toString() + "/" + App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum);
        // }
        XuyuanView.prototype.updateCost = function () {
            var tbWishSet = tb.TB_wish_set.get_TB_wish_set();
            var diamond = App.hero.diamond;
            var cost = tbWishSet.cost_diamond;
            if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishFreeNum) < tbWishSet.free_num) {
                //免费
                this.lab_cost_one.text = "免费";
                this.lab_cost_one.color = "#ffffff";
                this.lab_cost_one.stroke = 4;
                this.img_cost_one.visible = false;
                this.lab_cost_one.x = 41;
            }
            else {
                this.lab_cost_one.x = 59;
                this.lab_cost_one.text = cost + "";
                this.img_cost_one.visible = true;
                if (diamond < cost) {
                    //钱不够
                    this.lab_cost_one.color = "#ff0000";
                    this.lab_cost_one.stroke = 0;
                }
                else {
                    this.lab_cost_one.color = "#ffffff";
                    this.lab_cost_one.stroke = 4;
                }
            }
            //十次
            var count = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum);
            count = count == 0 ? 10 : Math.min(count, 10);
            cost *= count;
            this.lab_cost_ten.text = cost + "";
            this.lab_morenum.text = num2ChiNum(count) + "次";
            if (diamond < cost) {
                this.lab_cost_ten.color = "#ff0000";
                this.lab_cost_ten.stroke = 0;
            }
            else {
                this.lab_cost_ten.color = "#ffffff";
                this.lab_cost_ten.stroke = 4;
            }
        };
        /**许愿 */
        XuyuanView.prototype.onXuyuan = function (index) {
            if (this._isPlayTurnAni)
                return;
            var tbWishSet = tb.TB_wish_set.get_TB_wish_set();
            var maxUpNum = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum);
            if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum) >= maxUpNum) {
                showToast(LanMgr.getLan("", 10222));
                return;
            }
            var diamond = App.hero.diamond;
            var count = 0;
            var canPlay = true;
            var cost = tbWishSet.cost_diamond;
            if (index == 0) {
                //一次
                if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishFreeNum) >= tbWishSet.free_num) {
                    //免费次数完了
                    canPlay = cost <= diamond;
                }
                count = 1;
            }
            else {
                count = maxUpNum - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum);
                count = Math.min(count, 10);
                canPlay = (cost * count) <= diamond;
            }
            if (canPlay) {
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.MAKE_PROMISE_SUCCESS), { count: count });
            }
            else {
                showToast(LanMgr.getLan("", 10005));
            }
            // if (App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] === tbWishSet.free_num) {
            // 	if (App.hero.diamond < tb.TB_wish_set.get_TB_wish_set().cost_diamond) {
            // 		showToast(LanMgr.getLan("", 10005));
            // 		dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
            // 		return;
            // 	}
            // }
            // if (this._hint && App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] === tbWishSet.free_num) {
            // 	let img = HtmlUtil.convertHtmlText(`<img style='padding:-10px 0 0 0;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img>`);
            // 	common.TishiView.showTishi({
            // 		text: LanMgr.getLan(`是否消耗` + img + `X${tbWishSet.cost_diamond} 进行一次许愿？`), confirmCb: (hintvisible) => {
            // 			dispatchEvt(new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS), { hintvisible: hintvisible });
            // 		}, parm: null
            // 	});
            // } else {
            // 	dispatchEvt(new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS), { hintvisible: null });
            // }
        };
        XuyuanView.prototype.removeMask = function () {
            game.GuideMask.hide();
        };
        XuyuanView.prototype.addMask = function () {
            game.GuideMask.show(this.box_center, game.DirectionType.none, "", true, function () {
            }, 0, false);
        };
        XuyuanView.prototype.startAction = function (data, msg) {
            this._serverData = data;
            if (this._IS_JUMP) {
                this.showReward();
                return;
            }
            var tbdata = tb.TB_wish.get_TB_wishById(data.wishId[0]);
            // this._effect.startTurn(data, msg, tbdata.location - 1, () => { this.btn_xuyuan.selected = false; })
            var endAng = -45 * (tbdata.location - 1) - 22.5 + 2160;
            this.startTurnAni(endAng);
            if (UIMgr.hasStage(UIConst.TurnRewardView))
                UIMgr.hideUIByName(UIConst.TurnRewardView);
        };
        XuyuanView.prototype.updateAction = function () {
            var curT = Laya.timer.currTimer;
            this.updateTurnAni(curT);
            if (!this._isPlayXXAni && curT >= this._turnStartTime + XuyuanView.TURN_WEEK_TIME + 2000) {
                this.startXXAni();
            }
            this.updateXXANI(curT);
        };
        XuyuanView.prototype.startTurnAni = function (endAng) {
            this._turnStartAng = this.itemBoxs.rotation % 360;
            this._turnTotalAng = endAng - this._turnStartAng;
            this._turnStartTime = Laya.timer.currTimer;
            this._isPlayTurnAni = true;
            this.endXXAni();
            this.addMask();
        };
        XuyuanView.prototype.updateTurnAni = function (curT) {
            if (!this._isPlayTurnAni)
                return;
            var ang = this.getTurnAngle(this._turnStartAng, this._turnTotalAng, curT - this._turnStartTime, XuyuanView.TURN_WEEK_TIME);
            this.itemBoxs.rotation = ang % 360;
            if (curT >= this._turnStartTime + XuyuanView.TURN_WEEK_TIME) {
                this.endTurnAni();
                this.showReward();
            }
        };
        XuyuanView.prototype.showReward = function () {
            if (this._serverData) {
                // this.timer.callLater(this, () => {
                var rewardObj = game.HuodongModel.getRewards(TURNTABLE.WISH, this._serverData.wishId);
                if (UIMgr.hasStage(UIConst.TurnRewardView)) {
                    var uiPanel = UIMgr.getUIByName(UIConst.TurnRewardView);
                    uiPanel.dataSource = { type: TURNTABLE.WISH, items: rewardObj.data };
                    uiPanel.initView();
                }
                else {
                    UIMgr.showUI(UIConst.TurnRewardView, { type: TURNTABLE.WISH, items: rewardObj.data });
                }
                // })
            }
        };
        XuyuanView.prototype.getTurnAngle = function (startAngle, TurnAngle, curTime, totalTime) {
            if (curTime >= totalTime)
                return startAngle + TurnAngle;
            var t = curTime / totalTime - 1;
            return -TurnAngle * (t * t * t * t - 1) + startAngle;
        };
        XuyuanView.prototype.endTurnAni = function () {
            this._isPlayTurnAni = false;
            this.removeMask();
        };
        XuyuanView.prototype.startXXAni = function () {
            this._isPlayXXAni = true;
            this._xxEndTime = 0;
        };
        XuyuanView.prototype.updateXXANI = function (curT) {
            if (!this._isPlayXXAni)
                return;
            if (curT <= this._xxEndTime) {
                //旋转
                this.itemBoxs.rotation += this._xxSpeed;
            }
            else if (curT > this._xxEndTime + XuyuanView.XX_ANI_STOP_TIME) {
                //过了停顿时间，又要开始旋转
                var rand = Math.random();
                this._xxSpeed = (rand > 0.7 ? -1 : 1) * XuyuanView.XX_ANI_SPEED;
                this._xxEndTime = curT + XuyuanView.XX_ANI_WEEK_TIME;
            }
            else {
                //停顿时，啥事情也不做
            }
        };
        //结束休闲动画
        XuyuanView.prototype.endXXAni = function () {
            this._isPlayXXAni = false;
        };
        //许愿剩余次数
        XuyuanView.prototype.setwishNums = function () {
            this.updateCost();
            this.label_vowcount.text = LanMgr.getLan("今日许愿次数：", -1) + App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum) + "/" + App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum);
        };
        /**实时更新当前时间与固定点时差 */
        XuyuanView.prototype.CalculationTimeDifference = function () {
            var date = new Date(App.serverTimeSecond * 1000);
            var Hour = date.getHours() * 3600;
            var min = date.getMinutes() * 60;
            var sec = date.getSeconds();
            var dateTime = Hour + min + sec;
            var value = TimeConst.ONE_DAY_SEC - dateTime;
            var text = StringToTime(value.toString());
            this.label_freetime.text = LanMgr.getLan("下次免费时间 : {0}", -1, text);
        };
        XuyuanView.prototype.onClickTip = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20004));
        };
        XuyuanView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btn_tip.off(Laya.Event.CLICK, this, this.onClickTip);
            this.chk_jump.off(Laya.Event.CHANGE, this, this.onJump);
            this.img_one.off(Laya.Event.CLICK, this, this.onXuyuan);
            this.img_ten.off(Laya.Event.CLICK, this, this.onXuyuan);
            Laya.timer.clear(this, this.CalculationTimeDifference);
            Laya.timer.clearAll(this);
            this.endTurnAni();
            this.endXXAni();
            this._serverData = null;
        };
        XuyuanView.TURN_WEEK_TIME = 6000;
        //开始休闲动画
        XuyuanView.XX_ANI_STOP_TIME = 1000; //休闲动画停顿时间（ms）
        XuyuanView.XX_ANI_WEEK_TIME = 7800; //休闲动画周期时间(ms)
        XuyuanView.XX_ANI_SPEED = 0.1; //休闲动画速度
        return XuyuanView;
    }(ui.activity.huodong.welfare.tab.XuyuanUI));
    game.XuyuanView = XuyuanView;
})(game || (game = {}));
