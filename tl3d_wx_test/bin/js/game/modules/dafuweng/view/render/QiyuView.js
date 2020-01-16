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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var QiyuView = /** @class */ (function (_super) {
        __extends(QiyuView, _super);
        function QiyuView() {
            return _super.call(this) || this;
        }
        QiyuView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.DafuwengModel.getInstance();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.isModelClose = false;
            this._viewMap = {};
            this.listTab.array = null;
            this.listTab.selectHandler = new Handler(this, this.onSelect);
            this.listTab.selectedIndex = -1;
            this.btnLeft.on(Laya.Event.CLICK, this, this.onLeft);
            this.btnRight.on(Laya.Event.CLICK, this, this.onRight);
            this.imgBg.on(Laya.Event.CLICK, this, this.close);
            this.uiScene = new game.DafuwengExtSceneLayer();
            this.addChild(this.uiScene);
        };
        QiyuView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        QiyuView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        QiyuView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.listTab.array = null;
            this.listTab.selectedIndex = -1;
            this._shaizi = null;
            this.uiScene.onExit();
            for (var type in this._viewMap) {
                var view = this._viewMap[type];
                if (GameUtil.isFunction(view['close'])) {
                    view['close']();
                }
            }
            Dialog.manager.mouseEnabled = true;
        };
        QiyuView.prototype.initView = function () {
            this._shaizi = this.uiScene.addModelChar(String(100006), 360, 720, 180, 2.7);
            this._shaizi.shadow = false;
            this.removeShaizi();
            var qiyuList = this._model.getRiskList(true);
            this.listTab.array = __spreadArrays(qiyuList);
            this.listTab.selectedIndex = 0;
            this.uiScene.onShow();
        };
        /** 删除分页 -- （删除过期或已答的，没必要只删除当前分页） */
        QiyuView.prototype.delTab = function (key) {
            var qiyuList = this._model.getRiskList(true);
            this.listTab.array = __spreadArrays(qiyuList);
            if (qiyuList.length > 0) {
                var index = this.listTab.selectedIndex;
                if (index > 0) {
                    this.listTab.selectedIndex = index - 1;
                }
                else {
                    this.listTab.selectedIndex = -1;
                    this.listTab.selectedIndex = index;
                }
            }
            else {
                this.close();
            }
        };
        QiyuView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            var vo = this.listTab.getItem(index);
            if (!vo)
                return;
            var view = this.getView(vo.tbRisk.type);
            view.dataSource = vo;
            this.boxContent.height = view.height;
            this.boxContent.removeChildren();
            this.boxContent.addChild(view);
            if (GameUtil.isFunction(view['initView'])) {
                view['initView']();
            }
        };
        QiyuView.prototype.onLeft = function () {
            this.listTab.scrollTo(this.listTab.selectedIndex - 1);
        };
        QiyuView.prototype.onRight = function () {
            this.listTab.scrollTo(this.listTab.selectedIndex + 1);
        };
        QiyuView.prototype.caiDaXiaoResult = function (data) {
            var _this = this;
            DialogExt.manager.mouseEnabled = false;
            if (data.sdata.winType) {
                //结果存在
                var ids = data.selectId % 2;
                if (data.sdata.winType == iface.tb_prop.guessTypeKey.loss) {
                    ids = (data.selectId + 1) % 2;
                }
                var tbset = tb.TB_risk_set.getTabSet();
                //根据输赢，在指定区间，随机出塞子点数
                var num = utils.random(tbset.guess_size[ids][0], tbset.guess_size[ids][1]);
                this.playShaizi(num);
                setTimeout(function () {
                    _this.removeShaizi();
                    if (data.sdata.winType == iface.tb_prop.guessTypeKey.win || data.sdata.winType == iface.tb_prop.guessTypeKey.loss) {
                        var itemList = [];
                        UIUtil.getRewardItemVoList(itemList, data.sdata.commonData, false, false);
                        var content = data.sdata.winType == iface.tb_prop.guessTypeKey.win ? LanMgr.getLan("", 12458) : LanMgr.getLan("", 12459);
                        var vo = { title: LanMgr.getLan("", 12457), content: content, itemList: itemList, callBack: _this.delTab.bind(_this) };
                        UIMgr.showUI(UIConst.DFW_QiyuResultView, vo);
                    }
                    DialogExt.manager.mouseEnabled = true;
                }, 2450);
            }
        };
        QiyuView.prototype.playShaizi = function (diceNum) {
            if (this._shaizi) {
                this._shaizi.visible = true;
                // this._shaizi.set2dPos(360 - this.img_bg.x + 643, 850);
                this._shaizi.play(String(diceNum), 1);
            }
        };
        QiyuView.prototype.removeShaizi = function () {
            if (this._shaizi) {
                this._shaizi.play(tl3d.CharAction.STANAD, 1);
                this._shaizi.visible = false;
            }
        };
        QiyuView.prototype.getView = function (type) {
            if (!this._viewMap[type]) {
                var view = void 0;
                if (type == game.RiskType.QUESTION) {
                    view = new game.questionPanel();
                }
                else if (type == game.RiskType.CAIDAXIAO) {
                    view = new game.caiDaXiaoView();
                }
                else if (type == game.RiskType.CAIQUAN) {
                    view = new game.caiQuanView();
                }
                else if (type == game.RiskType.BIYANLI) {
                    view = new game.biYanLiView();
                }
                view.centerX = 0;
                this._viewMap[type] = view;
            }
            return this._viewMap[type];
        };
        return QiyuView;
    }(ui.dafuweng.QiyuViewUI));
    game.QiyuView = QiyuView;
})(game || (game = {}));
