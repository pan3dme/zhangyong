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
    var QiyuResultView = /** @class */ (function (_super) {
        __extends(QiyuResultView, _super);
        // private listVo: ListVo;
        /**获得物品效果列表 */
        // private _efflist: common.EffectList;
        function QiyuResultView() {
            return _super.call(this) || this;
        }
        QiyuResultView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.DFW_QiyuResultView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 10536) };
            // this.listVo = new ListVo(this.listItem);
        };
        QiyuResultView.prototype.popup = function (closeOther, showEffect) {
            this.initSize();
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        QiyuResultView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
        };
        QiyuResultView.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this._resultVo && this._resultVo.callBack) {
                this._resultVo.callBack();
                this._resultVo.callBack = null;
            }
            this.listItem.array = null;
            this._resultVo = null;
            // if (this._efflist) {
            //     this._efflist.stratEndAction();
            //     this._efflist = null;
            // }
        };
        QiyuResultView.prototype.initSize = function () {
            this._resultVo = this.dataSource;
            var ary = this._resultVo.itemList || [];
            var isHasReward = ary.length > 0;
            this.height = isHasReward ? 400 : 300;
        };
        QiyuResultView.prototype.initView = function () {
            this.bgPanel.updateTitle(this._resultVo.title);
            this.lbTitle.text = this._resultVo.content;
            this.setList();
        };
        QiyuResultView.prototype.setList = function () {
            var ary = this._resultVo.itemList || [];
            var isHasReward = ary.length > 0;
            this.listItem.visible = isHasReward;
            // this._efflist = null;
            if (isHasReward) {
                this.listItem.array = ary;
                this.listItem.width = ary.length * 100 + (ary.length - 1) * this.listItem.spaceX;
                // this.listVo.initData(this.listItem);
                // this.listVo._dataSource = ary;
                // this.listVo.setZorder(this.zOrder);
                // this.listVo.setWidth(this.listItem.width);
                // this.listVo.setHeight(this.listItem._height);
                // this.listVo.setPosition(this.listItem.x + (Laya.stage.width-this.width)/2, (Laya.stage.height-this.height)/2+this.listItem.y);
                // this._efflist = common.EffectList.showEffectList(this.listVo);
            }
        };
        return QiyuResultView;
    }(ui.dafuweng.QiyuResultUI));
    game.QiyuResultView = QiyuResultView;
})(game || (game = {}));
