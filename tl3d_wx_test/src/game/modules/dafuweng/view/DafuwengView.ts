module game {
    export class DafuwengView extends ui.dafuweng.dafuwengViewUI {

        public downX: number;
        public downY: number;
        public mLastMouseX: number;
        public mLastMouseY: number;

        /**角色场景 */
        public uiScene: DafuwengExtSceneLayer;
        private _char: DafuwengChar;
        private _shaizi: DafuwengChar;
        private _model: DafuwengModel = DafuwengModel.getInstance();
        private _qiyuAnim: QiyuAnimView;
        private _init: boolean;
        constructor() {
            super();
            // this.width = Laya.stage.width;
            // this.height = Laya.stage.height;
            this.group = UIConst.hud_group;
            this.img_viewport.viewport = new laya.maths.Rectangle(0, 0, Laya.stage.width, 1280);
            this.uiScene = new DafuwengExtSceneLayer();
            this.uiScene.scene.changeBloodManager(new BloodManagerExt);

            this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.ADVENTURE);

            this.img_bg.loadImage(SkinUtil.getSysMapSkin(ModuleConst.ADVENTURE), undefined, undefined, undefined, undefined, Handler.create(this, () => {
                this._init = true;
            }));
            // let wh = SkinUtil.getSysMapWH();
            // this.img_bg.width = wh[0];
            // this.img_bg.height = wh[1];

            this.img_bg.addChild(this.uiScene);
            this.uiScene.setPosition(this.img_bg.x - 643, this.img_bg.y - 640);
            this._resetflag = false;
            this._secondMoveFlag = false;
            //监听
            this.img_bg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.img_bg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.img_bg.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.btn_play.on(Laya.Event.CLICK, this, this.onPlay);
            this.btnQiyu.on(Laya.Event.CLICK, this, this.onShowQiyu);
            this.btn_rule.on(Laya.Event.CLICK, this, this.onRule);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.setNum, this);
            this.checkBox.selected = this._model.TEN_SELECT;
            this.checkBox.on(Laya.Event.CHANGE, this, this.onCheckbox);
            this.img_index.zOrder = 1000000;
        }

        setSize(w: number, h: number): void {
            super.setSize(w, h);
            // 顶部
            this.box_top.width = w;
            let isFull = GameUtil.isFullScreen();
            this.box_top.height = isFull ? (134 + HudModel.TOP_ADD_HEIGHT) : 134;
            this.box_reward.y = isFull ? (65 + HudModel.TOP_ADD_HEIGHT) : 65;
            this.btnQiyu.y = isFull ? (80 + HudModel.TOP_ADD_HEIGHT) : 80;
        }

        private onRule(): void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(40002));
        }
        private onShowQiyu(): void {
            dispatchEvt(new DafuwengEvent(DafuwengEvent.SHOW_QIYU_VIEW));
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close() {
            super.close();
            this._resetflag = false;
            this._secondMoveFlag = false;
            this.clearAllProp();
            tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.updateRes, this);
            this.btnQiyu.onExist();
            this.resList.array = null;
            this.uiScene.onExit();
            this._char = null;
            this._shaizi = null;
            this.ui_special_reward.dataSource = null;
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.FIGHT]);
        }

        initView() {
            this.checkBox.selected = this._model.TEN_SELECT;
            this._resetflag = false;
            this._secondMoveFlag = false;
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateRes, this);
            this.resList.array = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            this.resList.width = 150 * this.resList.array.length + (this.resList.array.length - 1) * this.resList.spaceX;
            this.updateRes();
            this.setNum();
            this.creatStart();
            //特殊奖励
            let riskset: tb.TB_risk_set = tb.TB_risk_set.getTabSet();
            this.ui_special_reward.dataSource = new ItemVo(riskset.circle_reward[0][0], riskset.circle_reward[0][1]);

            this._localpoint = this._model.curRiskId;
            let tab = tb.TB_risk.getTB_riskById(this._localpoint);
            //点上限最好配成表
            let nextid = (this._localpoint + 1) % DafuwengModel.STEP_COUNT;
            let nexttab = tb.TB_risk.getTB_riskById(nextid);

            //转向
            var $nmr: tl3d.Vector2D = new tl3d.Vector2D(tab.coordinate[0], tab.coordinate[1]).sub(new tl3d.Vector2D(nexttab.coordinate[0], nexttab.coordinate[1]));
            //右：+90 左： -90
            this._char = this.uiScene.addModelChar(String(1004), tab.coordinate[0], tab.coordinate[1], 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI, 0.9);
            this._char.shadow = true;

            this._shaizi = this.uiScene.addModelChar(String(100006), 360, 850, 180, 2.7);
            this._shaizi.shadow = false;
            this.removeShaizi();

            this._char.movetocb = () => {
                this.charMoveFun();
            }

            this._char.moveingFun = (local: tl3d.Vector2D) => {
                this.moveToCurLocal(local.x);
            }
            this.initPropByEff();
            this.btnQiyu.onShow();
        }
        /** 设置数量 */
        private setNum() {
            let settab = tb.TB_risk_set.getTabSet();
            let cost = this.checkBox.selected ? (settab.once_cost[1] * 10) : settab.once_cost[1];
            let ownNum = App.hero.getBagItemNum(settab.once_cost[0]);
            this.lbNum.text = `${Snums(ownNum)}`;
            this.lbNum.color = ownNum >= cost ? "#ffffff" : "#ff0000";
            this.lbCostNum.text = `/${cost}`;
            this.boxNum.refresh();
        }

        private charMoveFun() {
            this.setStartVisable();
            let curTab = tb.TB_risk.getTB_riskById(this._localpoint);
            // 不一样有两种情况： 1、踩到前进或者后退  2、十次探险,跨过终点
            if (this._localpoint != this._model.curRiskId) {
                //踩到前进或者后退
                if (curTab.type == RiskType.OUT) {
                    //角色移动
                    let opt = Number(curTab.para[0][0]);
                    let oldid = this._localpoint;
                    setTimeout(() => {
                        this.moveChar(oldid, opt);
                    }, 300);
                    showToast(opt > 0 ? LanMgr.getLan("", 10282,opt) : LanMgr.getLan("", 10283,opt));
                    if (this._propObj.hasOwnProperty(curTab.ID)) {
                        this._propObj[curTab.ID].removeSelf();
                        delete this._propObj[curTab.ID];
                    }
                } else {
                    let oldid = this._localpoint;
                    if (this._secondMoveFlag) {
                        let num = this._model.curRiskId - this._localpoint;
                        this._secondMoveFlag = false;
                        setTimeout(() => {
                            this.moveChar(oldid, num);
                        }, 1000);
                    } else {
                        logerror("大富翁数据异常", this._localpoint, this._model.curRiskId);
                    }
                }
            } else {
                this._lockflag = false;
                this.mouseEnabled = true;
                let riskList = (this._commondata ? this._commondata['riskList'] : []) || [];
                UIUtil.showRewardView(this._commondata, () => {
                    //奇遇动画
                    if (riskList.length > 0) {
                        let targetPos = this.btnQiyu.localToGlobal(new Laya.Point(0, 0));
                        if (!this._qiyuAnim) {
                            this._qiyuAnim = new QiyuAnimView();
                        }
                        this._qiyuAnim.startAnim(riskList, targetPos, null, () => {
                            this.btnQiyu.playAnim2();
                        });
                    }
                });
                this._commondata = null;

                //隐藏走过的标志物
                let riskIds = this._model.riskIds;
                for (let id of riskIds) {
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
        }

        private _startUI: startIR;
        private creatStart() {
            if (this._startUI) {
                return;
            }
            let startTab = tb.TB_risk.getTB_riskById(0);
            this._startUI = new startIR();
            this._startUI.x = startTab.item_coordinate[0];
            this._startUI.y = startTab.item_coordinate[1];
            this._startUI.dataSource = startTab;
            this._startUI.zOrder = this._startUI.y;
            this.box_itemspr.addChild(this._startUI);
            this.setStartVisable();
        }

        private setStartVisable() {
            this._startUI.visible = this._model.curRiskId != 0;
            if (this.img_index.visible) {
                Laya.Tween.clearAll(this.img_index);
                this.img_index.visible = false;
            }
        }

        //客户端表现用的当前点
        private _localpoint: number;
        private _commondata: any;
        private _lockflag: boolean;
        // 是否重新一轮
        private _resetflag: boolean;
        // 第二次移动 
        private _secondMoveFlag: boolean;
        private onPlay() {
            let count: number = this.checkBox.selected ? 10 : 1;
            //道具判断
            let settab = tb.TB_risk_set.getTabSet();
            let ownNum: number = App.hero.getBagItemNum(settab.once_cost[0]);
            let costNum = settab.once_cost[1] * count;
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
            let args = {};
            args[Protocol.game_risk_rollDice.args.count] = count;
            PLC.request(Protocol.game_risk_rollDice, args, ($data) => {
                if (!$data) {
                    this.mouseEnabled = true;
                    return;
                }
                this._char.runspeed = count == 1 ? 3 : 9;
                // logyhj("摇色子结果:", $data);
                this._commondata = $data.commonData || {};
                let oldid = this._localpoint;
                this._model.curRiskId = $data.curRiskId;
                this._model.riskIds = $data.riskIds;
                if ($data.hasOwnProperty('addRiskInfo')) {
                    this._commondata['riskList'] = this._model.addRiskInfo($data['addRiskInfo']);
                }
                dispatchEvt(new DafuwengEvent(DafuwengEvent.PLAY_SUCCESS));
                let diceNum = $data.diceNum;
                if (count == 1) {
                    this.playShaizi(diceNum);
                    setTimeout(() => {
                        this.removeShaizi();
                        if ($data.hasOwnProperty('clearQuestIds')) {
                            //过圈重置标志更新
                            this._resetflag = true;
                        }
                        //角色移动
                        this.moveChar(oldid, diceNum);
                    }, 2450);
                } else {
                    if ($data.hasOwnProperty('clearQuestIds')) {
                        //过圈重置标志更新
                        this._resetflag = true;
                        // 需要第二次走动
                        if (this._model.curRiskId > 0) {
                            this._secondMoveFlag = true;
                        }
                    } else {
                        diceNum = this._model.curRiskId - this._localpoint;
                    }
                    //角色移动
                    this.moveChar(oldid, diceNum);
                }
            });
        }

        private playShaizi(diceNum: number) {
            if (this._shaizi) {
                this._shaizi.visible = true;
                this._shaizi.set2dPos(360 - this.img_bg.x + 643, 850);
                this._shaizi.play(String(diceNum), 1);
            }
        }

        private removeShaizi() {
            if (this._shaizi) {
                this._shaizi.play(tl3d.CharAction.STANAD, 1);
                this._shaizi.visible = false;
            }
        }

        /**
         * 
         * @param oldId 起始点
         * @param riskNum 步数
         */
        private moveChar(oldId: number, riskNum: number) {
            //先将bg移动中央
            if (!this._char) return;
            this.moveBg(this._char.get2dPos().x, () => {
                let newId = oldId + riskNum;
                if (this._resetflag) {
                    newId = DafuwengModel.STEP_COUNT;
                }
                let tab = tb.TB_risk.getTB_riskById(newId % DafuwengModel.STEP_COUNT);
                if (!this.img_index.visible) {
                    //目标点的标志
                    this.img_index.x = tab.item_coordinate[0];
                    this.img_index.y = tab.item_coordinate[1] - 80;
                    this.img_index.visible = true;
                    UIUtil.loop(this.img_index, this.img_index.x, this.img_index.y, 1000, 30, TweenDirection.down);
                }

                let v2ds = [];
                //记录下路径点 正向走和逆向走
                let flag: boolean = oldId > newId;
                let i = (oldId + 1);
                if (flag) {
                    i = (oldId - 1);
                }
                for (i; flag ? i >= newId : i <= newId; flag ? i-- : i++) {
                    tab = tb.TB_risk.getTB_riskById(i % DafuwengModel.STEP_COUNT);
                    if (tab) {
                        v2ds.push(new tl3d.Vector2D(tab.coordinate[0], tab.coordinate[1]));
                    }
                }

                this._char.moveTomorepos(v2ds);
                this._localpoint = newId % DafuwengModel.STEP_COUNT;
            });
        }

        private getPosX(tx: number) {
            let vw = Laya.stage.width;
            tx = -(tx - vw / 2);
            if (tx < (vw - this.img_bg.width)) {
                tx = vw - this.img_bg.width;
            }
            if (tx > -Launch.offsetX) {
                tx = -Launch.offsetX;
            }
            return tx + 643;
        }

        private moveToCurLocal(tx: number) {
            let posx = this.getPosX(tx);
            if ((this.img_bg.x) != posx) {
                //需要移动
                this.img_bg.x = posx;
                this.uiScene.setPosition(this.img_bg.x - 643, this.img_bg.y - 640);
            }
        }

        private _speed: number = 4
        private moveBg(tx: number, cb: Function) {
            let posx = this.getPosX(tx);
            if ((this.img_bg.x) != posx) {
                //需要移动
                let time = this._speed * Math.abs(posx - this.img_bg.x);
                // logyhj("时间：", time);
                Laya.Tween.to(this.img_bg, {
                    "x": posx, update: new Laya.Handler(this, () => {
                        this.uiScene.setPosition(this.img_bg.x - 643, this.img_bg.y - 640);
                    })
                }, time, null, new Laya.Handler(this, () => {
                    if (cb) {
                        cb();
                    }
                }));
            } else {
                if (cb) {
                    cb();
                }
            }
        }



        /** 更新资源 */
        private updateRes(): void {
            this.resList.refresh();
        }


        /**
		 * 鼠标按下拖动地图
		 * @param e 
		 */
        private mouseDown(e: Laya.Event): void {
            this.downX = this.mLastMouseX = this.img_bg.mouseX;
            this.downY = this.mLastMouseY = this.img_bg.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

		/**
		 * 拖动
		 * @param e 
		 */
        private mouseMove(e: Laya.Event): void {
            let diffx = (this.img_bg.mouseX - this.mLastMouseX);
            this.img_bg.x += diffx;

            let vw = Laya.stage.width;
            if (this.img_bg.x < (vw - this.img_bg.width - Launch.offsetX + 643)) {
                this.img_bg.x = vw - this.img_bg.width - Launch.offsetX + 643;
            }
            if (this.img_bg.x > -Launch.offsetX + 643) {
                this.img_bg.x = -Launch.offsetX + 643;
            }

            this.uiScene.setPosition(this.img_bg.x - 643, this.img_bg.y - 640);
        }

        private mouseUp(): void {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

        private initComplete() {
            this.box_itemspr.updateZOrder();
            if (!this._char) return;
            this.moveBg(this._char.get2dPos().x, () => {
                // 有跨圈时,还没走完,还是需要禁掉页面的
                if (this._localpoint == this._model.curRiskId) {
                    this.mouseEnabled = true;
                }
            });
        }

        private initPropByEff() {
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
            setTimeout(() => {
                this.createNodes();
            }, 200);
        }

        private fastCreateNodes() {
            for (var i = 0; i < this._riskList.length; i++) {
                var element = this._riskList[i];
                if (element.type != RiskType.EMPTY && this._model.riskIds.indexOf(element.ID) == -1) {
                    //如果没踩过，需要显示此格子的物品  || 如果已经踩过这个位置,且这个位置是当前踩的问答题。则依然显示。
                    if (!this._propObj.hasOwnProperty(element.ID)) {
                        let ui = this.createNode(element);
                        ui.y = ui.dataSource.item_coordinate[1];
                        this.box_itemspr.addChild(ui);
                        this._propObj[element.ID] = ui;
                        if (ui.ani1) {
                            ui.ani1.play();
                        }
                    }
                }
            }
        }

        private _riskList: tb.TB_risk[];
        private _propObj: Object
        private _ware: number;
        private _itemnum: number;
        private createNodes() {
            if (!this._riskList || this._riskList.length <= 0) {
                this.initComplete();
                return;
            }
            let element = this._riskList.shift();
            if (element.type != RiskType.EMPTY) {
                //如果没踩过，需要显示此格子的物品  || 如果已经踩过这个位置,且这个位置是当前踩的问答题。则依然显示。
                // if ((this._model.riskIds.indexOf(element.ID) == -1) || (element.type == RiskType.QUESTION && element.ID == this._model.curRiskId)) {
                if (this._model.riskIds.indexOf(element.ID) == -1) {
                    let ui;
                    if (!this._propObj.hasOwnProperty(element.ID)) {
                        ui = this.createNode(element);
                        this.box_itemspr.addChild(ui);
                        this._propObj[element.ID] = ui;
                    } else {
                        ui = this._propObj[element.ID];
                    }
                    this.downTween(ui);
                    this._itemnum++;

                    if (this._itemnum > 10) {
                        this._ware++;
                        this._itemnum = 0;
                        this.timer.once(60, this, this.createNodes);
                        return;
                    } else {
                        this.createNodes();
                    }
                } else {
                    this.createNodes();
                }
            } else {
                this.createNodes();
            }
        }

        private downTween(ui) {
            let tagY = ui.dataSource.item_coordinate[1];
            ui.y = tagY - 600;
            let downTime = 600 - this._ware * 150;
            // logyhj("掉落时间：", downTime, this._ware);
            Laya.Tween.to(ui, { y: tagY }, downTime, Laya.Ease.sineIn, new Handler(this, () => {
                if (ui.ani1) {
                    ui.ani1.play();
                }
            }));
        }

        private clearAllProp() {
            for (var key in this._propObj) {
                if (this._propObj.hasOwnProperty(key)) {
                    var element = this._propObj[key];
                    element.dataSource = null;
                    element.removeSelf();
                }
            }
            this._propObj = null;
        }

        private createNode(item: tb.TB_risk) {
            let ui: any;
            switch (item.type) {
                case RiskType.PROP:
                    //道具
                    if (item.para[0][0] == iface.tb_prop.resTypeKey.gold || item.para[0][0] == iface.tb_prop.resTypeKey.diamond) {
                        ui = new diamondIR();
                    } else {
                        ui = new propIR();
                        ui.scale(0.8, 0.8);
                    }
                    break;
                case RiskType.OUT:
                    //前进后退
                    ui = new goAndOutIR();
                    break;
                case RiskType.QUESTION:
                    //问答
                    ui = new questionIR();
                    break;
                case RiskType.BOX:
                    //宝箱
                    ui = new boxIR();
                    break;
                case RiskType.CAIQUAN: //猜拳
                case RiskType.CAIDAXIAO://猜大小
                case RiskType.BIYANLI://比眼力
                    ui = new biYanLiIR();
                    break;
                default:
                    ui = new boxIR();
                    break;
            }


            ui.x = item.item_coordinate[0];
            // ui.y = item.item_coordinate[1] - 600;
            ui.zOrder = item.item_coordinate[1];
            ui.dataSource = item;
            return ui;
        }

        private onCheckbox(): void {
            this._model.TEN_SELECT = this.checkBox.selected;
            this.setNum();
        }

    }
}