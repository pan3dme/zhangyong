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
    var CaiQuanState;
    (function (CaiQuanState) {
        CaiQuanState[CaiQuanState["BEFORE"] = 0] = "BEFORE";
        CaiQuanState[CaiQuanState["ONGOING"] = 1] = "ONGOING";
        CaiQuanState[CaiQuanState["ENDING"] = 2] = "ENDING";
    })(CaiQuanState = game.CaiQuanState || (game.CaiQuanState = {}));
    var caiQuanView = /** @class */ (function (_super) {
        __extends(caiQuanView, _super);
        function caiQuanView() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            _this.skins = ["tanxian/jiandao.png", "tanxian/shitou.png", "tanxian/bu.png"];
            _this.isModelClose = false;
            _this.btn_1.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_2.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_3.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        caiQuanView.prototype.close = function () {
        };
        caiQuanView.prototype.initView = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var list = ary2prop(info.tbRisk.para);
            this.list_reward.array = list;
            this.list_reward.width = list.length * 80 + this.list_reward.spaceX * (list.length - 1);
            this.setVis(true);
            this._state = CaiQuanState.BEFORE;
        };
        caiQuanView.prototype.onClick = function (e) {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            if (this._state != CaiQuanState.BEFORE)
                return;
            if (info.isExpire()) {
                showToast(LanMgr.getLan('', 10286));
                return;
            }
            this._state = CaiQuanState.ONGOING;
            DialogExt.manager.mouseEnabled = false;
            var tick = setTimeout(function () {
                DialogExt.manager.mouseEnabled = true;
            }, 5000);
            var args = {};
            args[Protocol.game_risk_fingerGuess.args.riskKey] = info.key;
            args[Protocol.game_risk_fingerGuess.args.id] = null;
            PLC.request(Protocol.game_risk_fingerGuess, args, function (res) {
                if (!res)
                    return;
                info.setAnswer(Number(e.target.name));
                clearTimeout(tick);
                if (res.delRiskKey) {
                    _this._model.delRiskInfo([res.delRiskKey]);
                }
                _this.result(res, Number(e.target.name));
            });
        };
        caiQuanView.prototype.result = function (res, selectId) {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            var tagselect = selectId;
            if (res.winType == iface.tb_prop.guessTypeKey.win) {
                tagselect = this.getTagId(selectId, true);
            }
            else if (res.winType == iface.tb_prop.guessTypeKey.loss) {
                tagselect = this.getTagId(selectId, false);
            }
            // logyhj("猜拳我的选择：", selectId, tagselect);
            this.setVis(false);
            this.btn_1.skin = this.skins[selectId - 1];
            this.btn_1.visible = this.btn_3.visible = true;
            this._loopNum = 0;
            this.btn_3.skin = this.skins[this._loopNum % 3];
            this._loopNum++;
            this.timer.loop(150, this, function () {
                // logyhj("执行计时器");
                if (_this._loopNum > 10) {
                    _this.timer.clearAll(_this);
                    _this.btn_3.skin = _this.skins[tagselect - 1];
                    setTimeout(function () {
                        _this._state = CaiQuanState.ENDING;
                        if (res.winType == iface.tb_prop.guessTypeKey.win || res.winType == iface.tb_prop.guessTypeKey.loss) {
                            var itemList = [];
                            UIUtil.getRewardItemVoList(itemList, res.commonData, false, false);
                            var content = res.winType == iface.tb_prop.guessTypeKey.win ? LanMgr.getLan("", 12463) : LanMgr.getLan("", 12464);
                            var vo = { title: LanMgr.getLan("", 12462), content: content, itemList: itemList, callBack: _this.toClose.bind(_this) };
                            UIMgr.showUI(UIConst.DFW_QiyuResultView, vo);
                        }
                        else {
                            _this._state = CaiQuanState.BEFORE;
                            showToast(LanMgr.getLan('', 10288));
                            _this.setVis(true);
                        }
                        DialogExt.manager.mouseEnabled = true;
                    }, 500);
                }
                else {
                    _this.btn_3.skin = _this.skins[_this._loopNum % 3];
                    _this._loopNum++;
                }
            });
        };
        caiQuanView.prototype.toClose = function () {
            var info = this.dataSource;
            dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.DEL_QIYU_TAB), info ? info.key : null);
        };
        caiQuanView.prototype.setVis = function (flag) {
            this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = flag;
            if (flag) {
                this.btn_1.skin = this.skins[0];
                this.btn_2.skin = this.skins[1];
                this.btn_3.skin = this.skins[2];
            }
            this.img_vs.visible = !flag;
        };
        caiQuanView.prototype.getTagId = function (select, victoryflag) {
            var settab = tb.TB_risk_set.getTabSet();
            for (var i = 0; i < settab.guess_fist.length; i++) {
                var item = settab.guess_fist[i];
                if (victoryflag) {
                    if (item[0] == select) {
                        return item[1];
                    }
                }
                else {
                    if (item[1] == select) {
                        return item[0];
                    }
                }
            }
            return select;
        };
        return caiQuanView;
    }(ui.dafuweng.caiQuanViewUI));
    game.caiQuanView = caiQuanView;
})(game || (game = {}));
