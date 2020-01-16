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
    var FogForestView = /** @class */ (function (_super) {
        __extends(FogForestView, _super);
        function FogForestView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.group = UIConst.hud_group;
            return _this;
        }
        FogForestView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var stageW = Laya.stage.width;
            var stageH = Laya.stage.height;
            this._guanqiaLiat = [this.guanqia1, this.guanqia2, this.guanqia3];
            this.guanqia1.width = stageW;
            this.guanqia1.height = stageH / 3;
            this.guanqia2.width = stageW;
            this.guanqia2.height = stageH / 3;
            this.guanqia3.width = stageW;
            this.guanqia3.height = stageH / 3;
            this.guanqia3.y = 0;
            this.guanqia2.y = this.guanqia3.y + this.guanqia3.height;
            this.guanqia1.y = this.guanqia2.y + this.guanqia2.height;
        };
        FogForestView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        FogForestView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        FogForestView.prototype.close = function (type, showEffect, sound) {
            _super.prototype.close.call(this, type, showEffect, sound);
            for (var i = 0; i < this._guanqiaLiat.length; i++) {
                this._guanqiaLiat[i].dataSource = null;
            }
            this.boxRank.visible = false;
            this.awardUI.dataSource = null;
            this.rankList.array = null;
        };
        FogForestView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        FogForestView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_jiangli, redpointName: "forest_reward", callback: this.onBaoxiang.bind(this) },
                { btnSkin: SkinUtil.btn_rank, callback: this.showRankBox.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.toClose.bind(this) });
            this.requestRankList();
            this.boxRank.visible = false;
            var model = game.FogForestModel.getInstance();
            this.awardUI.dataSource = model.getSpecialGuanqia();
            var guanqiaAry = model.getViewList();
            for (var i = 0; i < guanqiaAry.length; i++) {
                this._guanqiaLiat[i].dataSource = guanqiaAry[i];
            }
        };
        /** 请求排行并进行渲染 */
        FogForestView.prototype.requestRankList = function () {
            var _this = this;
            this.rankList.array = null;
            var args = {};
            args[Protocol.game_rank_getRankList.args.rankType] = iface.tb_prop.rankTypeKey.forest;
            PLC.request(Protocol.game_rank_getRankList, args, function ($data) {
                if (!$data)
                    return;
                _this.rankList.repeatY = 3;
                for (var key in $data.rankList) {
                    _this.rankList.itemRender = game.forestRankIR;
                    _this.rankList.addItemAt([Number(key), $data.rankList[key]], Number(key) - 1);
                }
            });
        };
        FogForestView.prototype.toClose = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_MAOXIAN));
        };
        FogForestView.prototype.onOnekey = function () {
            dispatchEvt(new game.FogForestEvent(game.FogForestEvent.ONE_KEY_PASS));
        };
        FogForestView.prototype.onBaoxiang = function () {
            dispatchEvt(new game.FogForestEvent(game.FogForestEvent.SHOW_REWARD_VIEW));
        };
        /** 显示或隐藏排行榜 */
        FogForestView.prototype.showRankBox = function () {
            if (this.boxRank.visible) {
                this.boxRank.visible = false;
            }
            else {
                this.boxRank.visible = true;
            }
        };
        return FogForestView;
    }(ui.fogforest.FogForestUI));
    game.FogForestView = FogForestView;
})(game || (game = {}));
