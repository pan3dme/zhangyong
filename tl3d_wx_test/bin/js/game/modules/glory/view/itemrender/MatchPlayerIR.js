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
    var gloryMatchPlayerIR = /** @class */ (function (_super) {
        __extends(gloryMatchPlayerIR, _super);
        function gloryMatchPlayerIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(gloryMatchPlayerIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initViewe();
            },
            enumerable: true,
            configurable: true
        });
        gloryMatchPlayerIR.prototype.initViewe = function () {
            var info = this.dataSource;
            if (info) {
                this.lbGroup.text = info.getGroupName();
                // 左边
                this.headBox1.dataSource = info.lUser.headVo;
                this.lbName1.text = info.lUser.name;
                this.lbForce1.text = info.lUser.force + "";
                // 右边
                this.headBox2.dataSource = info.rUser.headVo;
                this.lbName2.text = info.rUser.name;
                this.lbForce2.text = info.rUser.force + "";
                this.updateView();
                this.updateBet();
                this.btnPlayback.on(Laya.Event.CLICK, this, this.onPlay);
                this.btnYazhu1.on(Laya.Event.CLICK, this, this.onYazhu1);
                this.btnYazhu2.on(Laya.Event.CLICK, this, this.onYazhu2);
                this.headBox1.on(Laya.Event.CLICK, this, this.onLeft);
                this.headBox2.on(Laya.Event.CLICK, this, this.onRight);
            }
            else {
                this.btnPlayback.off(Laya.Event.CLICK, this, this.onPlay);
                this.btnYazhu1.off(Laya.Event.CLICK, this, this.onYazhu1);
                this.btnYazhu2.off(Laya.Event.CLICK, this, this.onYazhu2);
                this.headBox1.off(Laya.Event.CLICK, this, this.onLeft);
                this.headBox2.off(Laya.Event.CLICK, this, this.onRight);
            }
        };
        /** 更新胜负 */
        gloryMatchPlayerIR.prototype.updateView = function () {
            var info = this.dataSource;
            if (info) {
                var isEnd = info.isEndGroup();
                this.imgResult1.visible = this.imgResult2.visible = this.lbResult1.visible = this.lbResult2.visible = isEnd;
                this.imgResult1.disabled = info.svo.winner == 2;
                this.imgResult2.disabled = info.svo.winner == 1;
                this.btnPlayback.visible = isEnd;
                this.lbResult1.text = info.svo.winner == 1 ? LanMgr.getLan("", 12404) : LanMgr.getLan("", 12405);
                this.lbResult2.text = info.svo.winner == 2 ? LanMgr.getLan("", 12404) : LanMgr.getLan("", 12405);
            }
        };
        /** 更新押注情况 */
        gloryMatchPlayerIR.prototype.updateBet = function () {
            var info = this.dataSource;
            if (info) {
                // 是否结束
                if (info.isEndGroup()) {
                    this.btnYazhu1.visible = this.btnYazhu2.visible = false;
                    this.lbYazhu1.visible = this.lbYazhu2.visible = false;
                    if (info.svo.betId == 1) {
                        this.lbYazhu1.visible = true;
                        this.lbYazhu1.text = info.svo.winner == 1 ? LanMgr.getLan("", 12406) : LanMgr.getLan("", 12407);
                    }
                    else if (info.svo.betId == 2) {
                        this.lbYazhu2.visible = true;
                        this.lbYazhu2.text = info.svo.winner == 2 ? LanMgr.getLan("", 12406) : LanMgr.getLan("", 12407);
                    }
                }
                else {
                    this.btnYazhu1.disabled = this.btnYazhu2.disabled = false;
                    this.btnYazhu1.visible = this.btnYazhu2.visible = true;
                    this.lbYazhu1.visible = this.lbYazhu2.visible = false;
                    if (info.svo.betId == 1) {
                        this.btnYazhu1.label = LanMgr.getLan("", 12408);
                        this.btnYazhu1.disabled = true;
                        this.btnYazhu2.visible = false;
                    }
                    else if (info.svo.betId == 2) {
                        this.btnYazhu2.label = LanMgr.getLan("", 12408);
                        this.btnYazhu2.disabled = true;
                        this.btnYazhu1.visible = false;
                    }
                    else {
                        if (info.isInBetTime()) {
                            this.btnYazhu1.label = this.btnYazhu2.label = LanMgr.getLan("", 12409);
                        }
                        else {
                            this.btnYazhu1.visible = this.btnYazhu2.visible = false;
                        }
                    }
                }
            }
        };
        /** 回放 */
        gloryMatchPlayerIR.prototype.onPlay = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_PLAYBACK), this.dataSource);
        };
        /** 押注左边 */
        gloryMatchPlayerIR.prototype.onYazhu1 = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.BET_PLAYER), [true, this]);
        };
        /** 押注右边 */
        gloryMatchPlayerIR.prototype.onYazhu2 = function () {
            dispatchEvt(new game.GloryEvent(game.GloryEvent.BET_PLAYER), [false, this]);
        };
        /** 显示左边玩家阵容 */
        gloryMatchPlayerIR.prototype.onLeft = function () {
            var info = this.dataSource;
            if (info && info.lUser) {
                game.GloryThread.requestLineup(info, true).then(function () {
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_LINEUP_VIEW), info.lUser);
                });
            }
        };
        /** 显示右边玩家阵容 */
        gloryMatchPlayerIR.prototype.onRight = function () {
            var info = this.dataSource;
            if (info && info.rUser) {
                game.GloryThread.requestLineup(info, false).then(function () {
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_LINEUP_VIEW), info.rUser);
                });
            }
        };
        return gloryMatchPlayerIR;
    }(ui.glory.iRender.MatchPlayerIRUI));
    game.gloryMatchPlayerIR = gloryMatchPlayerIR;
})(game || (game = {}));
