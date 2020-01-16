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
    var DafuwengView = /** @class */ (function (_super) {
        __extends(DafuwengView, _super);
        function DafuwengView() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            _this._speed = 4;
            // this.width = Laya.stage.width;
            // this.height = Laya.stage.height;
            _this.group = UIConst.hud_group;
            _this.img_viewport.viewport = new laya.maths.Rectangle(0, 0, Laya.stage.width, 1280);
            _this.uiScene = new game.DafuwengExtSceneLayer();
            _this.uiScene.scene.changeBloodManager(new BloodManagerExt);
            _this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.ADVENTURE);
            _this.img_bg.loadImage(SkinUtil.getSysMapSkin(ModuleConst.ADVENTURE), undefined, undefined, undefined, undefined, Handler.create(_this, function () {
                _this._init = true;
            }));
            // let wh = SkinUtil.getSysMapWH();
            // this.img_bg.width = wh[0];
            // this.img_bg.height = wh[1];
            _this.img_bg.addChild(_this.uiScene);
            _this.uiScene.setPosition(_this.img_bg.x - 643, _this.img_bg.y - 640);
            _this._resetflag = false;
            _this._secondMoveFlag = false;
            //监听
            _this.img_bg.on(Laya.Event.MOUSE_DOWN, _this, _this.mouseDown);
            _this.img_bg.on(Laya.Event.MOUSE_UP, _this, _this.mouseUp);
            _this.img_bg.on(Laya.Event.MOUSE_OUT, _this, _this.mouseUp);
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this.btn_play.on(Laya.Event.CLICK, _this, _this.onPlay);
            _this.btnQiyu.on(Laya.Event.CLICK, _this, _this.onShowQiyu);
            _this.btn_rule.on(Laya.Event.CLICK, _this, _this.onRule);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, _this.setNum, _this);
            _this.checkBox.selected = _this._model.TEN_SELECT;
            _this.checkBox.on(Laya.Event.CHANGE, _this, _this.onCheckbox);
            _this.img_index.zOrder = 1000000;
            return _this;
        }
        DafuwengView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            // 顶部
            this.box_top.width = w;
            var isFull = GameUtil.isFullScreen();
            this.box_top.height = isFull ? (134 + game.HudModel.TOP_ADD_HEIGHT) : 134;
            this.box_reward.y = isFull ? (65 + game.HudModel.TOP_ADD_HEIGHT) : 65;
            this.btnQiyu.y = isFull ? (80 + game.HudModel.TOP_ADD_HEIGHT) : 80;
        };
        DafuwengView.prototype.onRule = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(40002));
        };
        DafuwengView.prototype.onShowQiyu = function () {
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.SHOW_QIYU_VIEW));
        };
        DafuwengView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        DafuwengView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        DafuwengView.prototype.close = function () {
            _super.prototype.close.call(this);
            this._resetflag = false;
            this._secondMoveFlag = false;
            this.clearAllProp();
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateRes, this);
            this.btnQiyu.onExist();
            this.resList.array = null;
            this.uiScene.onExit();
            this._char = null;
            this._shaizi = null;
            this.ui_special_reward.dataSource = null;
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.FIGHT]);
        };
        DafuwengView.prototype.initView = function () {
            var _this = this;
            this.checkBox.selected = this._model.TEN_SELECT;
            this._resetflag = false;
            this._secondMoveFlag = false;
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateRes, this);
            this.resList.array = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            this.resList.width = 150 * this.resList.array.length + (this.resList.array.length - 1) * this.resList.spaceX;
            this.updateRes();
            this.setNum();
            this.creatStart();
            //特殊奖励
            var riskset = tb.TB_risk_set.getTabSet();
            this.ui_special_reward.dataSource = new ItemVo(riskset.circle_reward[0][0], riskset.circle_reward[0][1]);
            this._localpoint = this._model.curRiskId;
            var tab = tb.TB_risk.getTB_riskById(this._localpoint);
            //点上限最好配成表
            var nextid = (this._localpoint + 1) % game.DafuwengModel.STEP_COUNT;
            var nexttab = tb.TB_risk.getTB_riskById(nextid);
            //转向
            var $nmr = new tl3d.Vector2D(tab.coordinate[0], tab.coordinate[1]).sub(new tl3d.Vector2D(nexttab.coordinate[0], nexttab.coordinate[1]));
            //右：+90 左： -90
            this._char = this.uiScene.addModelChar(String(1004), tab.coordinate[0], tab.coordinate[1], 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI, 0.9);
            this._char.shadow = true;
            this._shaizi = this.uiScene.addModelChar(String(100006), 360, 850, 180, 2.7);
            this._shaizi.shadow = false;
            this.removeShaizi();
            this._char.movetocb = function () {
                _this.charMoveFun();
            };
            this._char.moveingFun = function (local) {
                _this.moveToCurLocal(local.x);
            };
            this.initPropByEff();
            this.btnQiyu.onShow();
        };
        /** 设置数量 */
        DafuwengView.prototype.setNum = function () {
            var settab = tb.TB_risk_set.getTabSet();
            var cost = this.checkBox.selected ? (settab.once_cost[1] * 10) : settab.once_cost[1];
            var ownNum = App.hero.getBagItemNum(settab.once_cost[0]);
            this.lbNum.text = "" + Snums(ownNum);
            this.lbNum.color = ownNum >= cost ? "#ffffff" : "#ff0000";
            this.lbCostNum.text = "/" + cost;
            this.boxNum.refresh();
        };
        DafuwengView.prototype.charMoveFun = function () {
            var _this = this;
            this.setStartVisable();
            var curTab = tb.TB_risk.getTB_riskById(this._localpoint);
            // 不一样有两种情况： 1、踩到前进或者后退  2、十次探险,跨过终点
            if (this._localpoint != this._model.curRiskId) {
                //踩到前进或者后退
                if (curTab.type == game.RiskType.OUT) {
                    //角色移动
                    var opt_1 = Number(curTab.para[0][0]);
                    var oldid_1 = this._localpoint;
                    setTimeout(function () {
                        _this.moveChar(oldid_1, opt_1);
                    }, 300);
                    showToast(opt_1 > 0 ? LanMgr.getLan("", 10282, opt_1) : LanMgr.getLan("", 10283, opt_1));
                    if (this._propObj.hasOwnProperty(curTab.ID)) {
                        this._propObj[curTab.ID].removeSelf();
                        delete this._propObj[curTab.ID];
                    }
                }
                else {
                    var oldid_2 = this._localpoint;
                    if (this._secondMoveFlag) {
                        var num_1 = this._model.curRiskId - this._localpoint;
                        this._secondMoveFlag = false;
                        setTimeout(function () {
                            _this.moveChar(oldid_2, num_1);
                        }, 1000);
                    }
                    else {
                        logerror("大富翁数据异常", this._localpoint, this._model.curRiskId);
                    }
                }
            }
            else {
                this._lockflag = false;
                this.mouseEnabled = true;
                var riskList_1 = (this._commondata ? this._commondata['riskList'] : []) || [];
                UIUtil.showRewardView(this._commondata, function () {
                    //奇遇动画
                    if (riskList_1.length > 0) {
                        var targetPos = _this.btnQiyu.localToGlobal(new Laya.Point(0, 0));
                        if (!_this._qiyuAnim) {
                            _this._qiyuAnim = new game.QiyuAnimView();
                        }
                        _this._qiyuAnim.startAnim(riskList_1, targetPos, null, function () {
                            _this.btnQiyu.playAnim2();
                        });
                    }
                });
                this._commondata = null;
                //隐藏走过的标志物
                var riskIds = this._model.riskIds;
                for (var _i = 0, riskIds_1 = riskIds; _i < riskIds_1.length; _i++) {
                    var id = riskIds_1[_i];
                    if (this._propObj.hasOwnProperty(id)) {
                        this._propObj[id].removeSelf();
                        delete this._propObj[id];
                    }
                }
            }
            if (this._resetflag) {
                //如果跨圈，就重置，并给跨圈奖励
                this.initPropByEff();
                this._resetflag = false;
            }
        };
        DafuwengView.prototype.creatStart = function () {
            if (this._startUI) {
                return;
            }
            var startTab = tb.TB_risk.getTB_riskById(0);
            this._startUI = new game.startIR();
            this._startUI.x = startTab.item_coordinate[0];
            this._startUI.y = startTab.item_coordinate[1];
            this._startUI.dataSource = startTab;
            this._startUI.zOrder = this._startUI.y;
            this.box_itemspr.addChild(this._startUI);
            this.setStartVisable();
        };
        DafuwengView.prototype.setStartVisable = function () {
            this._startUI.visible = this._model.curRiskId != 0;
            if (this.img_index.visible) {
                Laya.Tween.clearAll(this.img_index);
                this.img_index.visible = false;
            }
        };
        DafuwengView.prototype.onPlay = function () {
            var _this = this;
            var count = this.checkBox.selected ? 10 : 1;
            //道具判断
            var settab = tb.TB_risk_set.getTabSet();
            var ownNum = App.hero.getBagItemNum(settab.once_cost[0]);
            var costNum = settab.once_cost[1] * count;
            if (costNum > ownNum) {
                showToast(LanMgr.getLan('', 10284));
                return;
            }
            if (this._lockflag) {
                return;
            }
            AudioMgr.playSound("sound/touzi.mp3");
            this.mouseEnabled = false;
            this._lockflag = true;
            var args = {};
            args[Protocol.game_risk_rollDice.args.count] = count;
            PLC.request(Protocol.game_risk_rollDice, args, function ($data) {
                if (!$data) {
                    _this.mouseEnabled = true;
                    return;
                }
                _this._char.runspeed = count == 1 ? 3 : 9;
                // logyhj("摇色子结果:", $data);
                _this._commondata = $data.commonData || {};
                var oldid = _this._localpoint;
                _this._model.curRiskId = $data.curRiskId;
                _this._model.riskIds = $data.riskIds;
                if ($data.hasOwnProperty('addRiskInfo')) {
                    _this._commondata['riskList'] = _this._model.addRiskInfo($data['addRiskInfo']);
                }
                dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.PLAY_SUCCESS));
                var diceNum = $data.diceNum;
                if (count == 1) {
                    _this.playShaizi(diceNum);
                    setTimeout(function () {
                        _this.removeShaizi();
                        if ($data.hasOwnProperty('clearQuestIds')) {
                            //过圈重置标志更新
                            _this._resetflag = true;
                        }
                        //角色移动
                        _this.moveChar(oldid, diceNum);
                    }, 2450);
                }
                else {
                    if ($data.hasOwnProperty('clearQuestIds')) {
                        //过圈重置标志更新
                        _this._resetflag = true;
                        // 需要第二次走动
                        if (_this._model.curRiskId > 0) {
                            _this._secondMoveFlag = true;
                        }
                    }
                    else {
                        diceNum = _this._model.curRiskId - _this._localpoint;
                    }
                    //角色移动
                    _this.moveChar(oldid, diceNum);
                }
            });
        };
        DafuwengView.prototype.playShaizi = function (diceNum) {
            if (this._shaizi) {
                this._shaizi.visible = true;
                this._shaizi.set2dPos(360 - this.img_bg.x + 643, 850);
                this._shaizi.play(String(diceNum), 1);
            }
        };
        DafuwengView.prototype.removeShaizi = function () {
            if (this._shaizi) {
                this._shaizi.play(tl3d.CharAction.STANAD, 1);
                this._shaizi.visible = false;
            }
        };
        /**
         *
         * @param oldId 起始点
         * @param riskNum 步数
         */
        DafuwengView.prototype.moveChar = function (oldId, riskNum) {
            var _this = this;
            //先将bg移动中央
            if (!this._char)
                return;
            this.moveBg(this._char.get2dPos().x, function () {
                var newId = oldId + riskNum;
                if (_this._resetflag) {
                    newId = game.DafuwengModel.STEP_COUNT;
                }
                var tab = tb.TB_risk.getTB_riskById(newId % game.DafuwengModel.STEP_COUNT);
                if (!_this.img_index.visible) {
                    //目标点的标志
                    _this.img_index.x = tab.item_coordinate[0];
                    _this.img_index.y = tab.item_coordinate[1] - 80;
                    _this.img_index.visible = true;
                    UIUtil.loop(_this.img_index, _this.img_index.x, _this.img_index.y, 1000, 30, TweenDirection.down);
                }
                var v2ds = [];
                //记录下路径点 正向走和逆向走
                var flag = oldId > newId;
                var i = (oldId + 1);
                if (flag) {
                    i = (oldId - 1);
                }
                for (i; flag ? i >= newId : i <= newId; flag ? i-- : i++) {
                    tab = tb.TB_risk.getTB_riskById(i % game.DafuwengModel.STEP_COUNT);
                    if (tab) {
                        v2ds.push(new tl3d.Vector2D(tab.coordinate[0], tab.coordinate[1]));
                    }
                }
                _this._char.moveTomorepos(v2ds);
                _this._localpoint = newId % game.DafuwengModel.STEP_COUNT;
            });
        };
        DafuwengView.prototype.getPosX = function (tx) {
            var vw = Laya.stage.width;
            tx = -(tx - vw / 2);
            if (tx < (vw - this.img_bg.width)) {
                tx = vw - this.img_bg.width;
            }
            if (tx > -Launch.offsetX) {
                tx = -Launch.offsetX;
            }
            return tx + 643;
        };
        DafuwengView.prototype.moveToCurLocal = function (tx) {
            var posx = this.getPosX(tx);
            if ((this.img_bg.x) != posx) {
                //需要移动
                this.img_bg.x = posx;
                this.uiScene.setPosition(this.img_bg.x - 643, this.img_bg.y - 640);
            }
        };
        DafuwengView.prototype.moveBg = function (tx, cb) {
            var _this = this;
            var posx = this.getPosX(tx);
            if ((this.img_bg.x) != posx) {
                //需要移动
                var time = this._speed * Math.abs(posx - this.img_bg.x);
                // logyhj("时间：", time);
                Laya.Tween.to(this.img_bg, {
                    "x": posx, update: new Laya.Handler(this, function () {
                        _this.uiScene.setPosition(_this.img_bg.x - 643, _this.img_bg.y - 640);
                    })
                }, time, null, new Laya.Handler(this, function () {
                    if (cb) {
                        cb();
                    }
                }));
            }
            else {
                if (cb) {
                    cb();
                }
            }
        };
        /** 更新资源 */
        DafuwengView.prototype.updateRes = function () {
            this.resList.refresh();
        };
        /**
         * 鼠标按下拖动地图
         * @param e
         */
        DafuwengView.prototype.mouseDown = function (e) {
            this.downX = this.mLastMouseX = this.img_bg.mouseX;
            this.downY = this.mLastMouseY = this.img_bg.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        /**
         * 拖动
         * @param e
         */
        DafuwengView.prototype.mouseMove = function (e) {
            var diffx = (this.img_bg.mouseX - this.mLastMouseX);
            this.img_bg.x += diffx;
            var vw = Laya.stage.width;
            if (this.img_bg.x < (vw - this.img_bg.width - Launch.offsetX + 643)) {
                this.img_bg.x = vw - this.img_bg.width - Launch.offsetX + 643;
            }
            if (this.img_bg.x > -Launch.offsetX + 643) {
                this.img_bg.x = -Launch.offsetX + 643;
            }
            this.uiScene.setPosition(this.img_bg.x - 643, this.img_bg.y - 640);
        };
        DafuwengView.prototype.mouseUp = function () {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        DafuwengView.prototype.initComplete = function () {
            var _this = this;
            this.box_itemspr.updateZOrder();
            if (!this._char)
                return;
            this.moveBg(this._char.get2dPos().x, function () {
                // 有跨圈时,还没走完,还是需要禁掉页面的
                if (_this._localpoint == _this._model.curRiskId) {
                    _this.mouseEnabled = true;
                }
            });
        };
        DafuwengView.prototype.initPropByEff = function () {
            var _this = this;
            if (!this._propObj) {
                this._propObj = {};
            }
            this._riskList = tb.TB_risk.get_TB_risk();
            if (!this._init) {
                this.fastCreateNodes();
                return;
            }
            this.mouseEnabled = false;
            this._ware = 0;
            this._itemnum = 0;
            this.img_bg.scale(3, 3);
            Laya.Tween.to(this.img_bg, { scaleX: 1, scaleY: 1 }, 300);
            setTimeout(function () {
                _this.createNodes();
            }, 200);
        };
        DafuwengView.prototype.fastCreateNodes = function () {
            for (var i = 0; i < this._riskList.length; i++) {
                var element = this._riskList[i];
                if (element.type != game.RiskType.EMPTY && this._model.riskIds.indexOf(element.ID) == -1) {
                    //如果没踩过，需要显示此格子的物品  || 如果已经踩过这个位置,且这个位置是当前踩的问答题。则依然显示。
                    if (!this._propObj.hasOwnProperty(element.ID)) {
                        var ui_1 = this.createNode(element);
                        ui_1.y = ui_1.dataSource.item_coordinate[1];
                        this.box_itemspr.addChild(ui_1);
                        this._propObj[element.ID] = ui_1;
                        if (ui_1.ani1) {
                            ui_1.ani1.play();
                        }
                    }
                }
            }
        };
        DafuwengView.prototype.createNodes = function () {
            if (!this._riskList || this._riskList.length <= 0) {
                this.initComplete();
                return;
            }
            var element = this._riskList.shift();
            if (element.type != game.RiskType.EMPTY) {
                //如果没踩过，需要显示此格子的物品  || 如果已经踩过这个位置,且这个位置是当前踩的问答题。则依然显示。
                // if ((this._model.riskIds.indexOf(element.ID) == -1) || (element.type == RiskType.QUESTION && element.ID == this._model.curRiskId)) {
                if (this._model.riskIds.indexOf(element.ID) == -1) {
                    var ui_2;
                    if (!this._propObj.hasOwnProperty(element.ID)) {
                        ui_2 = this.createNode(element);
                        this.box_itemspr.addChild(ui_2);
                        this._propObj[element.ID] = ui_2;
                    }
                    else {
                        ui_2 = this._propObj[element.ID];
                    }
                    this.downTween(ui_2);
                    this._itemnum++;
                    if (this._itemnum > 10) {
                        this._ware++;
                        this._itemnum = 0;
                        this.timer.once(60, this, this.createNodes);
                        return;
                    }
                    else {
                        this.createNodes();
                    }
                }
                else {
                    this.createNodes();
                }
            }
            else {
                this.createNodes();
            }
        };
        DafuwengView.prototype.downTween = function (ui) {
            var tagY = ui.dataSource.item_coordinate[1];
            ui.y = tagY - 600;
            var downTime = 600 - this._ware * 150;
            // logyhj("掉落时间：", downTime, this._ware);
            Laya.Tween.to(ui, { y: tagY }, downTime, Laya.Ease.sineIn, new Handler(this, function () {
                if (ui.ani1) {
                    ui.ani1.play();
                }
            }));
        };
        DafuwengView.prototype.clearAllProp = function () {
            for (var key in this._propObj) {
                if (this._propObj.hasOwnProperty(key)) {
                    var element = this._propObj[key];
                    element.dataSource = null;
                    element.removeSelf();
                }
            }
            this._propObj = null;
        };
        DafuwengView.prototype.createNode = function (item) {
            var ui;
            switch (item.type) {
                case game.RiskType.PROP:
                    //道具
                    if (item.para[0][0] == iface.tb_prop.resTypeKey.gold || item.para[0][0] == iface.tb_prop.resTypeKey.diamond) {
                        ui = new game.diamondIR();
                    }
                    else {
                        ui = new game.propIR();
                        ui.scale(0.8, 0.8);
                    }
                    break;
                case game.RiskType.OUT:
                    //前进后退
                    ui = new game.goAndOutIR();
                    break;
                case game.RiskType.QUESTION:
                    //问答
                    ui = new game.questionIR();
                    break;
                case game.RiskType.BOX:
                    //宝箱
                    ui = new game.boxIR();
                    break;
                case game.RiskType.CAIQUAN: //猜拳
                case game.RiskType.CAIDAXIAO: //猜大小
                case game.RiskType.BIYANLI: //比眼力
                    ui = new game.biYanLiIR();
                    break;
                default:
                    ui = new game.boxIR();
                    break;
            }
            ui.x = item.item_coordinate[0];
            // ui.y = item.item_coordinate[1] - 600;
            ui.zOrder = item.item_coordinate[1];
            ui.dataSource = item;
            return ui;
        };
        DafuwengView.prototype.onCheckbox = function () {
            this._model.TEN_SELECT = this.checkBox.selected;
            this.setNum();
        };
        return DafuwengView;
    }(ui.dafuweng.dafuwengViewUI));
    game.DafuwengView = DafuwengView;
})(game || (game = {}));
