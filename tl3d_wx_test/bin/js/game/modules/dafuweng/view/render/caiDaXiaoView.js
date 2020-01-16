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
    var caiDaXiaoView = /** @class */ (function (_super) {
        __extends(caiDaXiaoView, _super);
        function caiDaXiaoView() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            _this.isModelClose = false;
            _this.btn_small.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_big.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        caiDaXiaoView.prototype.close = function () {
            this.setVisible(true);
        };
        caiDaXiaoView.prototype.initView = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var list = ary2prop(info.tbRisk.para);
            this.list_reward.dataSource = list;
            this.list_reward.width = list.length * 80 + this.list_reward.spaceX * (list.length - 1);
            var settab = tb.TB_risk_set.getTabSet();
            this.img_icon0.skin = SkinUtil.getCostSkin(settab.guess_size_cost[0][0]);
            this.img_icon1.skin = SkinUtil.getCostSkin(settab.guess_size_cost[0][0]);
            this.lab_cost0.text = Snums(settab.guess_size_cost[0][1]);
            this.lab_cost1.text = Snums(settab.guess_size_cost[0][1]);
            this.setVisible(true);
        };
        caiDaXiaoView.prototype.setVisible = function (visi) {
            this.btn_small.visible = this.img_icon0.visible = this.lab_cost0.visible = visi;
            this.btn_big.visible = this.img_icon1.visible = this.lab_cost1.visible = visi;
            this.imgSaizi.visible = visi;
        };
        caiDaXiaoView.prototype.onClick = function (e) {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            if (info.isExpire()) {
                showToast(LanMgr.getLan('', 10286));
                return;
            }
            var settab = tb.TB_risk_set.getTabSet();
            if (App.getResNum(settab.guess_size_cost[0][0]) < settab.guess_size_cost[0][1]) {
                showToast(LanMgr.getLan('', 10287));
                return;
            }
            var args = {};
            args[Protocol.game_risk_sizeGuess.args.riskKey] = info.key;
            args[Protocol.game_risk_sizeGuess.args.id] = null;
            PLC.request(Protocol.game_risk_sizeGuess, args, function (res) {
                if (!res)
                    return;
                _this.setVisible(false);
                info.setAnswer(Number(e.target.name));
                if (res.delRiskKey) {
                    _this._model.delRiskInfo([res.delRiskKey]);
                }
                dispatchEvt(new game.DafuwengEvent(game.DafuwengEvent.CLICK_CAIDAXIAO), { sdata: res, selectId: Number(e.target.name), key: info.key });
            });
        };
        return caiDaXiaoView;
    }(ui.dafuweng.caiDaXiaoViewUI));
    game.caiDaXiaoView = caiDaXiaoView;
})(game || (game = {}));
