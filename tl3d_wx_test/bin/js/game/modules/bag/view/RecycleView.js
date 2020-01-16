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
    var RecycleView = /** @class */ (function (_super) {
        __extends(RecycleView, _super);
        function RecycleView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_recycle.on(Laya.Event.CLICK, _this, _this.onRecycle);
            _this.btn_white.on(Laya.Event.CLICK, _this, _this.onChoose, [QualityConst.WHITE]);
            _this.btn_green.on(Laya.Event.CLICK, _this, _this.onChoose, [QualityConst.GREEN]);
            _this.btn_blue.on(Laya.Event.CLICK, _this, _this.onChoose, [QualityConst.BLUE]);
            _this.btn_purple.on(Laya.Event.CLICK, _this, _this.onChoose, [QualityConst.PURPLE]);
            _this.bgPanel.dataSource = { uiName: UIConst.Bag_RecycleView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12591) };
            _this._model = game.BagModel.getInstance();
            return _this;
        }
        /**
         * 关闭批量出售界面
         */
        RecycleView.prototype.close = function () {
            _super.prototype.close.call(this, "", true);
            this.list_equips.array = null;
        };
        /**
         * 展示符文
         */
        RecycleView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, true);
            this.init();
        };
        RecycleView.prototype.init = function () {
            this.equchange();
            this.pingzhi();
            this.changImg();
            //特殊处理 有白色和绿色的装备，默认勾选
            this.chooseItem(QualityConst.WHITE);
            this.chooseItem(QualityConst.GREEN);
            this._clickflag = true;
        };
        RecycleView.prototype.chooseItem = function (itemnum) {
            if (this._numAry[itemnum - 1] > 0) {
                var selimg = this["img_" + itemnum];
                if (!selimg.visible) {
                    this.onChoose(itemnum);
                }
            }
        };
        RecycleView.prototype.equchange = function () {
            this.list_equips.array = this._model.getEquList();
        };
        /**
         * 点击出售
         */
        RecycleView.prototype.onRecycle = function () {
            var _this = this;
            if (!this._clickflag) {
                showToast(LanMgr.getLan("", 11012));
                return;
            }
            this._clickflag = false;
            Laya.timer.once(200, this, function () {
                _this._clickflag = true;
            });
            var recycleAry = new Array;
            for (var i = 0; i < this.list_equips.array.length; i++) {
                var element = this.list_equips.array[i];
                if (element.selected) {
                    recycleAry.push(element);
                }
            }
            if (recycleAry.length <= 0) {
                showToast(LanMgr.getLan("", 11011));
                return;
            }
            dispatchEvt(new game.BagEvent(game.BagEvent.FENJIE_EQUIPS), recycleAry);
        };
        RecycleView.prototype.pingzhi = function () {
            this._numAry = game.BagModel.getInstance().countQuality(this.list_equips.array);
            this.showQualityNum(this._numAry);
        };
        /**
         * 选择品质个数
         * @param arry
         */
        RecycleView.prototype.showQualityNum = function (arry) {
            this.btn_white.label = "X" + arry[0];
            this.btn_green.label = "X" + arry[1];
            this.btn_blue.label = "X" + arry[2];
            this.btn_purple.label = "X" + arry[3];
        };
        /**
         * 点击选择品质按钮
         * @param num
         */
        RecycleView.prototype.onChoose = function (quality) {
            if (this._numAry.length > 0 && this._numAry[quality - 1] > 0) {
                var selimg = this["img_" + quality];
                selimg.visible = !selimg.visible;
                for (var i = 0; i < this.list_equips.array.length; i++) {
                    var element = this.list_equips.array[i];
                    if (element.quality == quality && element.selected != selimg.visible) {
                        element.selected = selimg.visible;
                        this.list_equips.setItem(i, element);
                    }
                }
            }
            else {
                showToast(LanMgr.getLan("", 11013));
            }
        };
        RecycleView.prototype.changImg = function () {
            var white = 0;
            var green = 0;
            var blue = 0;
            var purple = 0;
            for (var i = 0; i < this.list_equips.array.length; i++) {
                var element = this.list_equips.array[i];
                if (element.selected) {
                    if (element.quality == QualityConst.WHITE) {
                        white++;
                    }
                    else if (element.quality == QualityConst.GREEN) {
                        green++;
                    }
                    else if (element.quality == QualityConst.BLUE) {
                        blue++;
                    }
                    else if (element.quality == QualityConst.PURPLE) {
                        purple++;
                    }
                }
            }
            this.img_1.visible = this._numAry && white != 0 && this._numAry.length > 0 && this._numAry[0] == white;
            this.img_2.visible = this._numAry && green != 0 && this._numAry.length > 0 && this._numAry[1] == green;
            this.img_3.visible = this._numAry && blue != 0 && this._numAry.length > 0 && this._numAry[2] == blue;
            this.img_4.visible = this._numAry && purple != 0 && this._numAry.length > 0 && this._numAry[3] == purple;
        };
        return RecycleView;
    }(ui.bag.RecycleUI));
    game.RecycleView = RecycleView;
})(game || (game = {}));
