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
    var guajiVictory = /** @class */ (function (_super) {
        __extends(guajiVictory, _super);
        function guajiVictory() {
            var _this = _super.call(this) || this;
            _this.ary = new Array;
            _this.isModelClose = true;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this.list_item.array = [];
            _this.listVo = new ListVo(_this.list_item);
            _this.listVo.setPosition(_this.list_item.x + Launch.offsetX, 500 + Launch.offsetY);
            _this._tickFun = function () {
                _this.timeTick();
            };
            return _this;
        }
        guajiVictory.prototype.timeTick = function () {
            this.time--;
            if (this.time <= 0) {
                this.close();
            }
            this.lab_time.text = String(this.time);
        };
        guajiVictory.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.bgPanel.showTitle(true, "zhandoubiaoxian/shengli.png", true, true, true, Handler.create(this, this.showTitleComplete), this);
            this.lbDesc.visible = this.chk_next.visible = this.btn_again.visible = false;
            var $sdata = this.dataSource.vo;
            if ($sdata && $sdata.commonData)
                UIUtil.getRewardItemVoList(this.ary, $sdata.commonData);
            if ($sdata && $sdata.firstData)
                UIUtil.getRewardItemVoList(this.ary, $sdata.firstData, true);
            this.listVo._dataSource = this.list_item.array = this.ary;
            this.list_item.AutoLayout(this.width);
            this.listVo.setHeight(200);
            this.listVo.setPosition(this.list_item.x + (Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2 + this.list_item.y);
            this.listVo._height = this.list_item.height;
            this.time = 6;
            this.lab_empty.visible = this.ary.length <= 0;
            this.box_title.visible = !this.lab_empty.visible;
            // this.lab_txt.y = this.lab_time.y = 491;
            this.btn_close.x = 282;
            // this.lab_txt.visible = this.lab_time.visible = false;
        };
        guajiVictory.prototype.showTitleComplete = function () {
            this._efflist = common.EffectList.showEffectList(this.listVo);
            this._tickFun();
            Laya.timer.loop(1000, this, this._tickFun);
            AudioMgr.playSound("sound/victory.mp3");
        };
        guajiVictory.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        guajiVictory.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list_item.array = null;
            if (this.listVo._dataSource) {
                this.listVo._dataSource.length = 0;
            }
            Laya.timer.clear(this, this._tickFun);
        };
        guajiVictory.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (UIMgr.hasStage(UIConst.GuajiView)) {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                view.delayShowBossTips();
            }
        };
        return guajiVictory;
    }(ui.fight.shengliUI));
    game.guajiVictory = guajiVictory;
})(game || (game = {}));
