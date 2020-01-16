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
    var OnlineMainPage = /** @class */ (function (_super) {
        __extends(OnlineMainPage, _super);
        function OnlineMainPage() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        OnlineMainPage.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        OnlineMainPage.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        OnlineMainPage.prototype.init = function () {
            game.OnlineModel.curId = 999;
            this._lastid = -1;
            var ary = game.OnlineModel.getInstance().getList();
            for (var i = 0; i < ary.length; i++) {
                var itemvo = ary[i];
                if (!itemvo.canReceive()) {
                    game.OnlineModel.curId = Math.min(game.OnlineModel.curId, itemvo.id);
                }
            }
            this.list_item.renderHandler = Handler.create(this, this.onItemRender, null, false);
            this.list_item.dataSource = ary;
            this.tickLoop();
        };
        OnlineMainPage.prototype.onItemRender = function (cell, index) {
            cell.anim_select.scale(0.9, 0.9);
        };
        /** 是否需要计时器刷新 */
        OnlineMainPage.prototype.needTick = function () {
            var listdata = this.list_item.dataSource;
            for (var i = 0; i < listdata.length; i++) {
                if (!listdata[i].canReceive()) {
                    return true;
                }
            }
            return false;
        };
        OnlineMainPage.prototype.tickLoop = function () {
            if (this.needTick()) {
                this.timerLoop(1000, this, this.onLoop);
            }
            else {
                game.OnlineModel.curId = 999;
                this.clearTimer(this, this.onLoop);
            }
        };
        OnlineMainPage.prototype.onLoop = function () {
            var nid = -1;
            //找出最近的一个需要倒计时的容器，并刷新
            var listdata = this.list_item.dataSource;
            for (var i = 0; i < listdata.length; i++) {
                if (!listdata[i].canReceive()) {
                    nid = i;
                    if (game.OnlineModel.curId != i)
                        game.OnlineModel.curId = i;
                    this.list_item.setItem(i, listdata[i]);
                    break;
                }
            }
            //如果切换到下一个容器，则需要刷新上一个容器一次
            if (nid != this._lastid) {
                if (this._lastid == -1) {
                    this._lastid = nid;
                }
                else {
                    this.updateLast();
                    this._lastid = nid;
                }
            }
            this.tickLoop();
        };
        OnlineMainPage.prototype.updateLast = function () {
            if (this._lastid != -1) {
                this.list_item.setItem(this._lastid, this.list_item.dataSource[this._lastid]);
            }
        };
        OnlineMainPage.prototype.updateItem = function (id) {
            this.list_item.setItem(id, this.list_item.dataSource[id]);
        };
        OnlineMainPage.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (this.list_item.renderHandler) {
                this.list_item.renderHandler.recover();
                this.list_item.renderHandler = null;
            }
            this.list_item.dataSource = null;
            this.clearTimer(this, this.onLoop);
        };
        return OnlineMainPage;
    }(ui.activity.online.mainPageUI));
    game.OnlineMainPage = OnlineMainPage;
})(game || (game = {}));
