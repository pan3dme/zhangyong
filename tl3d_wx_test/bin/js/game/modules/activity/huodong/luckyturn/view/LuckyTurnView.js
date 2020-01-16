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
    var LuckyTurnView = /** @class */ (function (_super) {
        __extends(LuckyTurnView, _super);
        function LuckyTurnView() {
            var _this = _super.call(this) || this;
            _this._turnTypeArr = [TURNTABLE.GOD, TURNTABLE.EQUIP, TURNTABLE.TREASURE];
            //消耗
            _this._isFree = false;
            _this._isCanOne = false;
            _this._isCanTen = false;
            //剩余时间
            _this._remainTimeS = 0;
            _this._curTimeMs = 0;
            _this.Number = 0;
            _this._turnStartAng = 0;
            _this._turnTotalAng = 0;
            _this._turnStartTime = 0;
            _this._isPlayTurnAni = false;
            _this._xxSpeed = 0; //休闲动画速度
            _this._xxEndTime = 0;
            _this._isPlayXXAni = false;
            _this.isModelClose = true;
            _this.bgPanel.box_Content.addChild(_this.img_bg);
            return _this;
        }
        LuckyTurnView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        Object.defineProperty(LuckyTurnView.prototype, "tabIdx", {
            get: function () {
                return this.tab.selectedIndex;
            },
            enumerable: true,
            configurable: true
        });
        LuckyTurnView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.LuckyTurnView, closeOnSide: false, closeOnButton: false, title: "幸运转盘" };
            this.tab.selectHandler = Handler.create(this, this.onTab, null, false);
            this.tab.array = this._turnTypeArr;
            this.lab_title.visible = this.lab_title1.visible = App.serverTimeSecond <= (App.hero.openSvrTime + 7 * TimeConst.ONE_DAY_SEC);
            Laya.timer.loop(1, this, this.update);
            this.img_one.on(Laya.Event.CLICK, this, this.onCLickBuy, [0]);
            this.img_ten.on(Laya.Event.CLICK, this, this.onCLickBuy, [1]);
            this.img_record.on(Laya.Event.CLICK, this, this.onClickRecord);
            this.img_sw_box.on(Laya.Event.CLICK, this, this.onClickTreasure);
            this.chk_jump.on(Laya.Event.CHANGE, this, this.onJump);
            for (var i = 0; i < 4; i++) {
                this["ui_equip_item_" + i].on(Laya.Event.CLICK, this, this.onClickEquipReward, [i]);
            }
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateCost, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateCost, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_GOD_VALUE_CHANGE, this.onGodValueChange, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_EQUIP_VALUE_CHANGE, this.onEquipValueChange, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_TREASURE_VALUE_CHANGE, this.onTreasureValueChange, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_EQUIP_REWARD_CHANGE, this.updateEquipReward, this);
            this.updateTab();
            this.update();
            this.chk_jump.selected = LuckyTurnView.IS_JUMP;
            this.ani_point.play();
            this.isModelClose = true;
        };
        LuckyTurnView.prototype.onGodValueChange = function () {
            if (this._curType == TURNTABLE.GOD) {
                this.updateProgress();
            }
        };
        LuckyTurnView.prototype.onEquipValueChange = function () {
            if (this._curType == TURNTABLE.EQUIP) {
                this.updateProgress();
                this.updateEquipReward();
            }
        };
        LuckyTurnView.prototype.onTreasureValueChange = function () {
            if (this._curType == TURNTABLE.TREASURE) {
                this.updateProgress();
                this.updateTreasureBox();
            }
        };
        LuckyTurnView.prototype.updateTab = function () {
            this.initTab();
            if (this._firstType == -1) {
                this.close();
                return;
            }
            this.onTab(this._firstType);
        };
        LuckyTurnView.prototype.initTab = function () {
            this._firstType = -1;
            var idx = 0;
            for (var i = 0; i < this.tab.cells.length; i++) {
                var type = this._turnTypeArr[i];
                var id = game.HuodongModel.getLuckIdByType(type);
                if (id > 0) {
                    this.tab.addChild(this.tab.cells[i]);
                    this.tab.cells[i].x = idx * 123;
                    idx++;
                    if (this._firstType == -1) {
                        this._firstType = i;
                    }
                }
                else {
                    this.tab.removeChild(this.tab.cells[i]);
                }
            }
        };
        LuckyTurnView.prototype.onTab = function (index) {
            if (this._isPlayTurnAni)
                return;
            this.tab.selectedIndex = index;
            if (index < 0 || index >= this.tab.cells.length)
                return;
            for (var i = 0; i < this.tab.cells.length; i++) {
                var element = this.tab.cells[i];
                var selectItem = element.getChildByName("selectBox");
                selectItem.visible = index == i;
                if (selectItem.visible) {
                    selectItem.play(0, true);
                }
            }
            this._curType = this._turnTypeArr[index];
            var id;
            switch (this._curType) {
                case TURNTABLE.GOD: //神灵
                    id = App.hero.welfare.luckGodId;
                    this._curTimeTemp = tb.TB_luck_god_time.get_TB_luck_god_timeById(id);
                    this._curRewardTemp = tb.TB_luck_god.get_TB_luck_god('type', id + "");
                    break;
                case TURNTABLE.EQUIP: //装备
                    id = App.hero.welfare.luckEquipId;
                    this._curTimeTemp = tb.TB_luck_equip_time.get_TB_luck_equip_timeById(id);
                    this._curRewardTemp = tb.TB_luck_equip.get_TB_luck_equip('type', id + "");
                    break;
                case TURNTABLE.TREASURE: //圣物
                    id = App.hero.welfare.luckTreasureId;
                    this._curTimeTemp = tb.TB_luck_treasure_time.getTempById(id);
                    this._curRewardTemp = tb.TB_luck_treasure.get_TB_luck_Treasure('type', id + "");
                    break;
            }
            this.updateTurnItem();
            this.updateCost();
            this.updateRemainTime();
            this.updateTabView();
        };
        //心跳
        LuckyTurnView.prototype.update = function () {
            if (this._remainTimeS > 0) {
                this.updateRemainTimeStr();
            }
            this.updateAction();
        };
        //转盘物品
        LuckyTurnView.prototype.updateTurnItem = function () {
            if (!this._curRewardTemp || this._curRewardTemp.length < LuckyTurnView.TURN_ITEM_NUM)
                return;
            this._curRewardTemp.sort(function (a, b) {
                return a.location - b.location;
            });
            for (var i = 0; i < this._curRewardTemp.length; i++) {
                var itemUI = this["ui_item_" + i];
                if (!itemUI) {
                    break;
                }
                var data = this._curRewardTemp[i];
                var itemvo = new ItemVo(data.item[0], data.item[1]);
                itemvo.isShowEff = data.is_show_effect == 1;
                itemUI.dataSource = itemvo;
            }
        };
        LuckyTurnView.prototype.updateCost = function () {
            if (!this._curTimeTemp)
                return;
            var freeCount = game.HuodongModel.getLuckFreeCount(this._curType);
            var diamond = App.hero.diamond;
            this.ui_red.setRedPointName(game.HuodongModel.LuckRedNames[this._curType]);
            if (freeCount > 0) {
                //免费
                this._isFree = true;
                this.lab_cost_one.text = "免费";
                this.lab_cost_one.color = "#ffffff";
                this.lab_cost_one.stroke = 4;
                this.img_cost_one.visible = false;
            }
            else {
                this._isFree = false;
                var cost_1 = this._curTimeTemp.buy_cost[0];
                this.lab_cost_one.text = cost_1 + "";
                this.img_cost_one.visible = true;
                if (diamond < this._curTimeTemp.buy_cost[0]) {
                    //钱不够
                    this.lab_cost_one.color = "#ff0000";
                    this.lab_cost_one.stroke = 0;
                    this._isCanOne = false;
                }
                else {
                    this.lab_cost_one.color = "#ffffff";
                    this.lab_cost_one.stroke = 4;
                    this._isCanOne = true;
                }
            }
            //十次
            var cost = this._curTimeTemp.buy_cost[1];
            this.lab_cost_ten.text = cost + "";
            if (diamond < cost) {
                this.lab_cost_ten.color = "#ff0000";
                this.lab_cost_ten.stroke = 0;
                this._isCanTen = false;
            }
            else {
                this.lab_cost_ten.color = "#ffffff";
                this.lab_cost_ten.stroke = 4;
                this._isCanTen = true;
            }
        };
        LuckyTurnView.prototype.updateRemainTime = function () {
            if (!this._curTimeTemp)
                return;
            this._remainTimeS = game.HuodongModel.getRemainTimeByTemp(this._curTimeTemp.type, this._curTimeTemp.time);
            this._curTimeMs = Laya.timer.currTimer;
            this.updateRemainTimeStr(true);
        };
        LuckyTurnView.prototype.updateRemainTimeStr = function (force) {
            if (force === void 0) { force = false; }
            var nextTime = Laya.timer.currTimer;
            var cha = nextTime - this._curTimeMs;
            if (force || cha >= 1000) {
                this._remainTimeS -= cha / 1000;
                this._curTimeMs = nextTime;
                if (this._remainTimeS <= 0) {
                    this.lab_time.text = LanMgr.getLan("该活动已结束", -1);
                }
                else {
                    this.lab_time.text = LanMgr.getLan("剩余:{0}", -1, activityTime(this._remainTimeS, 0));
                }
            }
        };
        //更新
        LuckyTurnView.prototype.updateTabView = function () {
            if (!this._curTimeTemp)
                return;
            this.clearTabView();
            switch (this._curType) {
                case TURNTABLE.GOD: //神灵
                    this.lab_god.visible = true;
                    this.lab_luck_title.text = "幸运值";
                    this.lab_title.text = "整只传说英雄概率翻倍";
                    break;
                case TURNTABLE.EQUIP: //装备
                    this.box_equip.visible = true;
                    this.lab_luck_title.text = "幸运值";
                    this._equipMaxValue = 0;
                    this._equipRewards = tb.TB_luck_equip_reward.get_TB_luck_equip_reward("type", this._curTimeTemp.ID);
                    for (var i = 0; i < 10; i++) {
                        var item = this["ui_equip_item_" + i];
                        if (!item) {
                            break;
                        }
                        if (this._equipRewards[i]) {
                            var itemvo = new ItemVo(this._equipRewards[i].reward[0][0], this._equipRewards[i].reward[0][1]);
                            itemvo.show = false;
                            item.dataSource = itemvo;
                            //获取最大幸运值
                            if (this._equipRewards[i].lucky > this._equipMaxValue) {
                                this._equipMaxValue = this._equipRewards[i].lucky;
                            }
                        }
                    }
                    this.lab_title.text = "橙装概率翻倍";
                    break;
                case TURNTABLE.TREASURE:
                    this.box_sw.visible = true;
                    this.lab_luck_title.text = "充能";
                    this.lab_title.text = "红色圣物概率翻倍";
                    break;
            }
            var tw = this.lab_title.width + this.lab_title1.width + 5;
            this.lab_title1.x = (this.width - tw) / 2;
            this.lab_title.x = this.lab_title1.x + this.lab_title1.width + 5;
            this.updateProgress();
            this.updateEquipReward();
            this.updateTreasureBox();
        };
        LuckyTurnView.prototype.updateProgress = function () {
            if (!this._curTimeTemp)
                return;
            var curVal = 0;
            var maxVal = 0;
            switch (this._curType) {
                case TURNTABLE.GOD:
                    curVal = App.hero.welfare.luckGodNum;
                    maxVal = this._curTimeTemp.luck_reward[0];
                    break;
                case TURNTABLE.EQUIP:
                    curVal = App.hero.welfare.luckEquipNum;
                    maxVal = this._equipMaxValue;
                    break;
                case TURNTABLE.TREASURE:
                    maxVal = this._curTimeTemp.luck_value;
                    curVal = App.hero.welfare.luckTreasureNum;
                    break;
            }
            if (this._curType == TURNTABLE.EQUIP) {
                this.lab_luck_val.text = "";
            }
            else {
                this.lab_luck_val.text = curVal + "/" + maxVal;
            }
            this.pro_luck.value = curVal / maxVal;
        };
        LuckyTurnView.prototype.updateEquipReward = function () {
            if (!this._equipRewards)
                return;
            for (var i = 0; i < 4; i++) {
                var hasR = App.hero.welfare.luckEquipAward && App.hero.welfare.luckEquipAward[this._equipRewards[i].ID] != null;
                this["img_equip_receive_" + i].visible = hasR;
                this["img_equip_light_" + i].visible = !hasR && this._equipRewards[i].lucky <= this.pro_luck.value * this._equipMaxValue;
            }
        };
        LuckyTurnView.prototype.updateTreasureBox = function () {
            var _this = this;
            if (this._curType != TURNTABLE.TREASURE)
                return;
            if (this.pro_luck.value >= 1) {
                this.ani_sw_eff.visible = true;
                this.ani_sw_eff.loadAnimation(ResConst.anim_baoxiang, Handler.create(null, function () {
                    _this.ani_sw_eff.play(0, true);
                }), ResConst.atlas_baoxiang);
            }
            else {
                this.ani_sw_eff.visible = false;
                this.ani_sw_eff.stop();
            }
            this.img_sw_box.skin = "comp/flag/task_baoxiang4.png";
        };
        LuckyTurnView.prototype.clearTabView = function () {
            this.box_equip.visible = false;
            this.box_sw.visible = false;
            this.lab_god.visible = false;
            for (var i = 0; i < 10; i++) {
                var item = this["ui_equip_item_" + i];
                if (!item) {
                    break;
                }
                item.dataSource = null;
            }
            this.ani_sw_eff.visible = false;
            this.ani_sw_eff.stop();
            this._equipRewards = null;
        };
        //记录
        LuckyTurnView.prototype.onClickRecord = function (index) {
            UIMgr.showUI(UIConst.LuckRecordView, this._curType);
        };
        LuckyTurnView.prototype.onCLickBuy = function (index) {
            var _this = this;
            if (this._isPlayTurnAni)
                return;
            if (this._remainTimeS <= 0)
                return;
            var count = 0;
            if (index == 0) {
                //一次
                if (!this._isFree && !this._isCanOne) {
                    showToast(LanMgr.getLan("", 10005));
                    return;
                }
                count = 1;
            }
            else {
                if (!this._isCanTen) {
                    showToast(LanMgr.getLan("", 10005));
                    return;
                }
                count = 10;
            }
            var args = {
                "_0": this._curTimeTemp.ID,
                "_1": count
            };
            var protocol;
            switch (this._curType) {
                case TURNTABLE.GOD:
                    protocol = Protocol.game_luck_buyluckGod;
                    break;
                case TURNTABLE.EQUIP:
                    protocol = Protocol.game_luck_buyluckEquip;
                    break;
                case TURNTABLE.TREASURE:
                    protocol = Protocol.game_luck_buyluckTreasure;
                    break;
            }
            PLC.request(protocol, args, function ($data, $msg) {
                if (!$data)
                    return;
                if ($msg && $msg.length > 0) {
                    showToast($msg);
                }
                else {
                    _this.startAction($data, $msg);
                }
            });
        };
        LuckyTurnView.prototype.onClickEquipReward = function (index, e) {
            if (!this._equipRewards || !this._equipRewards[index])
                return;
            if (!this["img_equip_light_" + index].visible) {
                UIUtil.showTip(this["ui_equip_item_" + index].dataSource);
                return;
            }
            if (this._remainTimeS <= 0)
                return;
            var args = {};
            args[Protocol.game_activity_getLevelFundReward.args.id] = this._equipRewards[index].ID;
            PLC.request(Protocol.game_luck_getluckEquipAward, args, function ($data, $msg) {
                if (!$data)
                    return;
                // this.LuckyTurnView.turnView.refreshRewardList();
                UIUtil.showRewardView($data.commonData);
            });
        };
        LuckyTurnView.prototype.onClickTreasure = function () {
            var _this = this;
            if (!this._curTimeTemp)
                return;
            if (this.pro_luck.value < 1) {
                var list = [];
                list.push(new ItemVo(this._curTimeTemp.luck_reward[0], this._curTimeTemp.luck_reward[1]));
                UIMgr.showUI(UIConst.ManyItemsTip, { data: list });
                return;
            }
            if (this._remainTimeS <= 0)
                return;
            this.img_sw_box.skin = "comp/flag/task_baoxiang444.png";
            Laya.timer.once(100, this, function () {
                var args = {};
                args[Protocol.game_luck_getluckTreasureAward.args.id] = _this._curTimeTemp.ID;
                PLC.request(Protocol.game_luck_getluckTreasureAward, args, function ($data, $msg) {
                    if (!$data)
                        return;
                    UIUtil.showRewardView($data.commonData);
                });
            });
        };
        LuckyTurnView.prototype.onJump = function () {
            LuckyTurnView.IS_JUMP = this.chk_jump.selected;
        };
        LuckyTurnView.prototype.startAction = function (data, msg) {
            var _this = this;
            this._serverData = data;
            var tbdata;
            switch (this._curType) {
                case TURNTABLE.GOD:
                    if (data.luckGodIds && data.luckGodIds.length > 0) {
                        tbdata = tb.TB_luck_god.get_TB_luck_godById(data.luckGodIds[0]);
                        this._ids = data.luckGodIds;
                    }
                    break;
                case TURNTABLE.EQUIP:
                    if (data.luckEquipIds && data.luckEquipIds.length > 0) {
                        tbdata = tb.TB_luck_equip.get_TB_luck_equipById(data.luckEquipIds[0]);
                        this._ids = data.luckEquipIds;
                    }
                    break;
                case TURNTABLE.TREASURE:
                    if (data.luckTreasureIds && data.luckTreasureIds.length > 0) {
                        tbdata = tb.TB_luck_treasure.getTempById(data.luckTreasureIds[0]);
                        this._ids = data.luckTreasureIds;
                    }
                    break;
            }
            if (!tbdata)
                return;
            var endAng = -45 * (tbdata.location - 1) - 22.5 + 2160;
            if (LuckyTurnView.IS_JUMP) {
                this.box_turn.rotation = endAng;
                this._turnStartTime = Laya.timer.currTimer - LuckyTurnView.TURN_WEEK_TIME;
                this._isPlayXXAni = false;
                if (this._serverData) {
                    Laya.timer.once(100, this, function () {
                        // UIUtil.showRewardView(this._serverData.commonData);
                        // HuodongModel.getRewards()
                        _this.showQuickPage(_this._curType, _this._ids);
                    });
                }
            }
            else {
                this.startTurnAni(endAng);
                UIMgr.hideUIByName(UIConst.TurnRewardView);
            }
        };
        LuckyTurnView.prototype.showQuickPage = function (type, ids) {
            var itemlist = [];
            for (var i = 0; i < ids.length; i++) {
                switch (type) {
                    case TURNTABLE.GOD:
                        var temp = tb.TB_luck_god.get_TB_luck_godById(ids[i]);
                        itemlist.push(new ItemVo(temp.item[0], temp.item[1]));
                        break;
                    case TURNTABLE.EQUIP:
                        var equiptemp = tb.TB_luck_equip.get_TB_luck_equipById(ids[i]);
                        itemlist.push(new ItemVo(equiptemp.item[0], equiptemp.item[1]));
                        break;
                    case TURNTABLE.TREASURE:
                        var treasuretemp = tb.TB_luck_treasure.getTempById(ids[i]);
                        itemlist.push(new ItemVo(treasuretemp.item[0], treasuretemp.item[1]));
                        break;
                }
            }
            if (UIMgr.hasStage(UIConst.TurnRewardView)) {
                var uiPanel = UIMgr.getUIByName(UIConst.TurnRewardView);
                uiPanel.dataSource = { type: type, items: itemlist };
                uiPanel.initView();
            }
            else {
                UIMgr.showUI(UIConst.TurnRewardView, { type: type, items: itemlist });
            }
        };
        LuckyTurnView.prototype.updateAction = function () {
            var curT = Laya.timer.currTimer;
            this.updateTurnAni(curT);
            if (!this._isPlayXXAni && curT >= this._turnStartTime + LuckyTurnView.TURN_WEEK_TIME + 2000) {
                this.startXXAni();
            }
            this.updateXXANI(curT);
        };
        LuckyTurnView.prototype.startTurnAni = function (endAng) {
            this._turnStartAng = this.box_turn.rotation % 360;
            this._turnTotalAng = endAng - this._turnStartAng;
            this._turnStartTime = Laya.timer.currTimer;
            this._isPlayTurnAni = true;
            this.isModelClose = false;
            this.endXXAni();
        };
        LuckyTurnView.prototype.updateTurnAni = function (curT) {
            var _this = this;
            if (!this._isPlayTurnAni)
                return;
            var ang = this.getTurnAngle(this._turnStartAng, this._turnTotalAng, curT - this._turnStartTime, LuckyTurnView.TURN_WEEK_TIME);
            this.box_turn.rotation = ang % 360;
            if (curT >= this._turnStartTime + LuckyTurnView.TURN_WEEK_TIME) {
                this.endTurnAni();
                if (this._serverData) {
                    Laya.timer.once(100, this, function () {
                        // UIUtil.showRewardView(this._serverData.commonData);
                        _this.showQuickPage(_this._curType, _this._ids);
                    });
                }
            }
        };
        LuckyTurnView.prototype.getTurnAngle = function (startAngle, TurnAngle, curTime, totalTime) {
            if (curTime >= totalTime)
                return startAngle + TurnAngle;
            var t = curTime / totalTime - 1;
            return -TurnAngle * (t * t * t * t - 1) + startAngle;
        };
        LuckyTurnView.prototype.endTurnAni = function () {
            this._isPlayTurnAni = false;
            this.isModelClose = true;
        };
        LuckyTurnView.prototype.startXXAni = function () {
            this._isPlayXXAni = true;
            this._xxEndTime = 0;
        };
        LuckyTurnView.prototype.updateXXANI = function (curT) {
            if (!this._isPlayXXAni)
                return;
            if (curT <= this._xxEndTime) {
                //旋转
                this.box_turn.rotation += this._xxSpeed;
            }
            else if (curT > this._xxEndTime + LuckyTurnView.XX_ANI_STOP_TIME) {
                //过了停顿时间，又要开始旋转
                var rand = Math.random();
                this._xxSpeed = (rand > 0.7 ? -1 : 1) * LuckyTurnView.XX_ANI_SPEED;
                this._xxEndTime = curT + LuckyTurnView.XX_ANI_WEEK_TIME;
            }
            else {
                //停顿时，啥事情也不做
            }
        };
        //结束休闲动画
        LuckyTurnView.prototype.endXXAni = function () {
            this._isPlayXXAni = false;
        };
        LuckyTurnView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.endTurnAni();
            this.endXXAni();
            Laya.timer.clearAll(this);
            this.img_one.off(Laya.Event.CLICK, this, this.onCLickBuy);
            this.img_ten.off(Laya.Event.CLICK, this, this.onCLickBuy);
            this.img_record.off(Laya.Event.CLICK, this, this.onClickRecord);
            this.img_sw_box.off(Laya.Event.CLICK, this, this.onClickTreasure);
            this.chk_jump.off(Laya.Event.CHANGE, this, this.onJump);
            for (var i = 0; i < 4; i++) {
                this["ui_equip_item_" + i].off(Laya.Event.CLICK, this, this.onClickEquipReward);
            }
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateCost, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateCost, this);
            tl3d.ModuleEventManager.removeEvent(game.HuodongEvent.LUCK_GOD_VALUE_CHANGE, this.onGodValueChange, this);
            tl3d.ModuleEventManager.removeEvent(game.HuodongEvent.LUCK_EQUIP_VALUE_CHANGE, this.onEquipValueChange, this);
            tl3d.ModuleEventManager.removeEvent(game.HuodongEvent.LUCK_TREASURE_VALUE_CHANGE, this.onTreasureValueChange, this);
            tl3d.ModuleEventManager.removeEvent(game.HuodongEvent.LUCK_EQUIP_REWARD_CHANGE, this.updateEquipReward, this);
        };
        LuckyTurnView.TURN_ITEM_NUM = 8; //转盘奖励物品8个
        LuckyTurnView.IS_JUMP = false; //是否跳过动画
        LuckyTurnView.TURN_WEEK_TIME = 6000;
        //开始休闲动画
        LuckyTurnView.XX_ANI_STOP_TIME = 1000; //休闲动画停顿时间（ms）
        LuckyTurnView.XX_ANI_WEEK_TIME = 7800; //休闲动画周期时间(ms)
        LuckyTurnView.XX_ANI_SPEED = 0.1; //休闲动画速度
        return LuckyTurnView;
    }(ui.activity.huodong.luckyturn.luckyturnUI));
    game.LuckyTurnView = LuckyTurnView;
})(game || (game = {}));
