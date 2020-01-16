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
    var GuanQiaInfoView = /** @class */ (function (_super) {
        __extends(GuanQiaInfoView, _super);
        function GuanQiaInfoView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GuanQiaInfoView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.btn_guaji.on(Laya.Event.CLICK, this, this.onClickBtn);
            this._curGuanQiaVo = this.dataSource;
            this.bgPanel.dataSource = { uiName: UIConst.GuanQiaInfoView, closeOnSide: this.isModelClose, title: this._curGuanQiaVo.tbCopyInfo.name };
            this.updateInfo();
        };
        GuanQiaInfoView.prototype.updateInfo = function () {
            if (!this._curGuanQiaVo)
                return;
            //怪物
            var enemyArr = this._curGuanQiaVo.tbCopyInfo.getMonsters();
            this.list_enemy.array = enemyArr;
            this.list_enemy.repeatX = enemyArr.length;
            this.list_enemy.x = (this.width - this.list_enemy.width) / 2;
            //奖励
            var rewardArr = this._curGuanQiaVo.tbCopyInfo.getRewardShowItems();
            this.list_reward.array = rewardArr;
            if (rewardArr.length > 5) {
                this.list_reward.width = 552;
            }
            else {
                var speacx = 12;
                var itemwidth = 90;
                this.list_reward.width = (speacx + itemwidth) * rewardArr.length - speacx;
            }
            this.list_reward.x = (this.width - this.list_reward.width) / 2;
            if (this._curGuanQiaVo.isPass || this._curGuanQiaVo.isNext()) {
                this.btn_guaji.gray = false;
                this.btn_guaji.label = "挂机";
            }
            else {
                this.btn_guaji.gray = true;
                this.btn_guaji.label = "未通关";
            }
        };
        GuanQiaInfoView.prototype.onClickBtn = function () {
            if (this._curGuanQiaVo.isPass || this._curGuanQiaVo.isNext()) {
                var model = game.GuajiModel.getInstance();
                var zhangjievo = model.getZhangjie(this._curGuanQiaVo.chapterId);
                model.currentZhangjie = zhangjievo;
                UIMgr.showUI(UIConst.GuajiView);
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.UPDATE_ZHANGJIE_EVENT));
                UIMgr.hideUIByName(UIConst.GuanQiaNewView);
                UIMgr.showUI(UIConst.OpenChapterView, { type: game.OpenChapterView.TYPE_GUAJI, isnew: false, infovo: zhangjievo });
                this.close();
            }
            else {
            }
        };
        GuanQiaInfoView.prototype.close = function () {
            _super.prototype.close.call(this, "", false);
            this.btn_guaji.off(Laya.Event.CLICK, this, this.onClickBtn);
            this.bgPanel.dataSource = null;
            this.list_enemy.array = null;
            this.list_reward.array = null;
            this._curGuanQiaVo = null;
        };
        return GuanQiaInfoView;
    }(ui.guaji.GuanQiaInfoUI));
    game.GuanQiaInfoView = GuanQiaInfoView;
})(game || (game = {}));
