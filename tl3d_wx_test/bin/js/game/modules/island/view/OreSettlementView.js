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
    var OreSettlementView = /** @class */ (function (_super) {
        __extends(OreSettlementView, _super);
        function OreSettlementView() {
            var _this = _super.call(this) || this;
            _this._mgr = game.IslandQueueMgr.getInstance();
            return _this;
        }
        OreSettlementView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.lbContent.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12004) };
        };
        OreSettlementView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        OreSettlementView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        OreSettlementView.prototype.close = function () {
            this.onConfirm(false);
        };
        OreSettlementView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
            this.bgPanel.dataSource = null;
            this.btnConfirm.off(Laya.Event.CLICK, this, this.onConfirm);
        };
        OreSettlementView.prototype.initView = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var title = info.recordVo && info.recordVo.isGoto ? LanMgr.getLan("", 12003) : (info.title ? info.title : LanMgr.getLan("", 12004));
            this.bgPanel.updateTitle(title);
            this.lbContent.text = info.content;
            this.btnConfirm.label = info.recordVo ? (info.recordVo.isGoto ? LanMgr.getLan("", 10042) : (info.recordVo.isHasReward() ? LanMgr.getLan("", 10041) : LanMgr.getLan("", 10038))) : LanMgr.getLan("", 10038);
            this.itemList.array = info.itemArray;
            this.itemList.y = this.lbContent.y + this.lbContent.height + 25;
            if (info.itemArray.length > 0) {
                this.listBg.visible = true;
                this.listBg.y = this.itemList.y - 10;
                this.btnConfirm.y = this.itemList.y + this.itemList.height + 30;
            }
            else {
                this.listBg.visible = false;
                this.btnConfirm.y = this.itemList.y + 30;
            }
            this.btnConfirm.on(Laya.Event.CLICK, this, this.onConfirm, [true]);
            this.bgPanel.height = this.height = this.btnConfirm.y + this.btnConfirm.height + 50;
        };
        /** 领取收益或者更新状态 */
        OreSettlementView.prototype.onConfirm = function (btnOperate) {
            var _this = this;
            var info = this.dataSource;
            if (!info.recordVo) {
                _super.prototype.close.call(this);
                return;
            }
            if (info.recordVo.isGoto) {
                // 点击前往，清除外界的提示记录列表
                if (btnOperate) {
                    this._mgr.clearRecords();
                    // 没有奖励的直接标记已读
                    if (!info.recordVo.isHasReward()) {
                        var arg = {};
                        arg[Protocol.game_mine_recordMineUpdateState.args.id] = info.recordVo.svo.recordId;
                        PLC.request(Protocol.game_mine_recordMineUpdateState, arg, function ($data) {
                            if (!$data)
                                return;
                            // 前往关闭界面closeEffect要用false快速关闭,这样进入神秘岛屿才能再次打开结算界面
                            _super.prototype.close.call(_this, "", false);
                            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_MAIN_VIEW));
                        });
                    }
                    else {
                        _super.prototype.close.call(this, "", false);
                        dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_MAIN_VIEW));
                    }
                }
                else {
                    // 没有奖励的直接标记已读
                    if (!info.recordVo.isHasReward()) {
                        this.doReadOperate();
                    }
                    else {
                        // 打开下一个记录需关闭界面以后才能打开下一个记录界面
                        var closeEffect = this._mgr.isHasRcord() ? false : true;
                        _super.prototype.close.call(this, "", closeEffect);
                        this._mgr.showNoticeView();
                    }
                }
            }
            else {
                if (info.recordVo.isHasReward()) {
                    this.doRewardOpera();
                }
                else {
                    this.doReadOperate();
                }
            }
        };
        /** 领取操作 */
        OreSettlementView.prototype.doRewardOpera = function () {
            var _this = this;
            var info = this.dataSource;
            // 打开下一个记录需关闭界面以后才能打开下一个记录界面
            var closeEffect = this._mgr.isHasRcord() ? false : true;
            var arg = {};
            arg[Protocol.game_mine_mineRecordGet.args.id] = info.recordVo.svo.recordId;
            PLC.request(Protocol.game_mine_mineRecordGet, arg, function ($data) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                _super.prototype.close.call(_this, "", closeEffect);
                _this._mgr.showNoticeView();
            });
        };
        /** 读操作 */
        OreSettlementView.prototype.doReadOperate = function () {
            var _this = this;
            var info = this.dataSource;
            // 打开下一个记录需关闭界面以后才能打开下一个记录界面
            var closeEffect = this._mgr.isHasRcord() ? false : true;
            var arg = {};
            arg[Protocol.game_mine_recordMineUpdateState.args.id] = info.recordVo.svo.recordId;
            PLC.request(Protocol.game_mine_recordMineUpdateState, arg, function ($data) {
                if (!$data)
                    return;
                _super.prototype.close.call(_this, "", closeEffect);
                _this._mgr.showNoticeView();
            });
        };
        return OreSettlementView;
    }(ui.island.OreSettlementUI));
    game.OreSettlementView = OreSettlementView;
})(game || (game = {}));
