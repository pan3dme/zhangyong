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
    var BiYanLiGameState;
    (function (BiYanLiGameState) {
        BiYanLiGameState[BiYanLiGameState["BEFORE"] = 0] = "BEFORE";
        BiYanLiGameState[BiYanLiGameState["ONGOING"] = 1] = "ONGOING";
        BiYanLiGameState[BiYanLiGameState["END"] = 2] = "END";
    })(BiYanLiGameState = game.BiYanLiGameState || (game.BiYanLiGameState = {}));
    var biYanLiView = /** @class */ (function (_super) {
        __extends(biYanLiView, _super);
        function biYanLiView() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            //游戏难度：兑换几次
            _this._difficulty = 11;
            //交换速度
            _this._speed = 500;
            return _this;
        }
        biYanLiView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btn_start.on(Laya.Event.CLICK, this, this.onClick);
            this.ui_tong1.img_barrel.on(Laya.Event.CLICK, this, this.onClickBowie, [this.ui_tong1]);
            this.ui_tong2.img_barrel.on(Laya.Event.CLICK, this, this.onClickBowie, [this.ui_tong2]);
            this.ui_tong3.img_barrel.on(Laya.Event.CLICK, this, this.onClickBowie, [this.ui_tong3]);
        };
        biYanLiView.prototype.close = function () {
        };
        biYanLiView.prototype.initView = function () {
            var info = this.dataSource;
            if (!info) {
                logerror("比眼力获取不到数据");
                return;
            }
            this._gamestate = BiYanLiGameState.BEFORE;
            this.btn_start.visible = true;
            var tabvo = info.tbRisk;
            this.ui_tong1.dataSource = { id: 1, prop: tabvo.para[0] };
            this.ui_tong2.dataSource = { id: 2, prop: tabvo.para[1] };
            this.ui_tong3.dataSource = { id: 3, prop: tabvo.para[2] };
        };
        biYanLiView.prototype.onClickBowie = function (e) {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            if (this._gamestate == BiYanLiGameState.BEFORE)
                return;
            if (e.dataSource && e.curState == game.bowieState.CLOSE) {
                // logyhj("选中了：", e.dataSource.id);
                if (this._gamestate == BiYanLiGameState.ONGOING) {
                    if (info.isExpire()) {
                        showToast(LanMgr.getLan('', 10286));
                        return;
                    }
                    Dialog.manager.mouseEnabled = false;
                    // e.openEff();
                    this.ui_tong1.openEff();
                    this.ui_tong2.openEff();
                    this.ui_tong3.openEff();
                    //给服务端发送领奖
                    var args = {};
                    args[Protocol.game_risk_eyesightGuess.args.id] = e.dataSource.id;
                    args[Protocol.game_risk_eyesightGuess.args.riskKey] = info.key;
                    PLC.request(Protocol.game_risk_eyesightGuess, args, function ($data) {
                        if (!$data) {
                            Dialog.manager.mouseEnabled = true;
                            return;
                        }
                        info.setAnswer(Number(e.dataSource.id));
                        if ($data.delRiskKey) {
                            _this._model.delRiskInfo([$data.delRiskKey]);
                        }
                        Laya.timer.once(1000, _this, function () {
                            Dialog.manager.mouseEnabled = true;
                            var itemList = [];
                            UIUtil.getRewardItemVoList(itemList, $data.commonData, false, false);
                            var content = LanMgr.getLan("", 12467);
                            var vo = { title: LanMgr.getLan("", 12466), content: content, itemList: itemList, callBack: _this.toClose.bind(_this) };
                            UIMgr.showUI(UIConst.DFW_QiyuResultView, vo);
                        });
                    });
                    this._gamestate = BiYanLiGameState.END;
                }
            }
        };
        biYanLiView.prototype.toClose = function () {
            var info = this.dataSource;
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.DEL_QIYU_TAB), info ? info.key : null);
        };
        biYanLiView.prototype.onClick = function () {
            if (this._gamestate != BiYanLiGameState.BEFORE)
                return;
            this._gamestate = BiYanLiGameState.ONGOING;
            this._showcbflag = true;
            this.btn_start.visible = false;
            Dialog.manager.mouseEnabled = false;
            this.ui_tong1.openAndcloseEff(this.showcb.bind(this));
            this.ui_tong2.openAndcloseEff(this.showcb.bind(this));
            this.ui_tong3.openAndcloseEff(this.showcb.bind(this));
        };
        biYanLiView.prototype.showcb = function () {
            //如果三个桶都准备好了
            if (this.ui_tong1.curState == game.bowieState.CLOSE && this.ui_tong2.curState == game.bowieState.CLOSE && this.ui_tong3.curState == game.bowieState.CLOSE) {
                //标志位，控制方法多次执行
                if (!this._showcbflag)
                    return;
                this._showcbflag = false;
                this._changeNum = 0;
                this._speed = 500;
                //开始交换
                this.startChange();
            }
        };
        biYanLiView.prototype.startChange = function () {
            var _this = this;
            if (this._changeNum > this._difficulty) {
                // logyhj("交换完成!");
                Dialog.manager.mouseEnabled = true;
                return;
            }
            this.updateorder();
            this._changeNum++;
            var tag1 = random(3);
            var tag2 = (tag1 + 1) % 3;
            tag1 += 1;
            tag2 += 1;
            var tagui1 = this.getChildByName("ui_tong" + tag1);
            var tw1x = tagui1.x;
            var tw1y = tagui1.y;
            var tagui2 = this.getChildByName("ui_tong" + tag2);
            var tw2x = tagui2.x;
            var tw2y = tagui2.y;
            // let speed = this._changeNum * (-50) + 550
            // logyhj("move speed:", this._speed);
            Laya.Tween.to(tagui1, { x: tw2x, y: tw2y }, this._speed);
            Laya.Tween.to(tagui2, { x: tw1x, y: tw1y }, this._speed, null, Handler.create(this, function () {
                _this.startChange();
            }));
            this._speed = Math.floor(this._speed / 1.1);
        };
        biYanLiView.prototype.updateorder = function () {
            this.ui_tong1.zOrder = this.ui_tong1.y;
            this.ui_tong2.zOrder = this.ui_tong2.y;
            this.ui_tong3.zOrder = this.ui_tong3.y;
            this.updateZOrder();
        };
        return biYanLiView;
    }(ui.dafuweng.biYanLiViewUI));
    game.biYanLiView = biYanLiView;
})(game || (game = {}));
