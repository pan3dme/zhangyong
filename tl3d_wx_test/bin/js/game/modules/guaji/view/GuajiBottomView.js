/*
 * @Author: HuangGuoYong
 * @Date: 2018-09-28 19:23:47
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-03-14 20:35:37
 */
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
    var GuajiBottomView = /** @class */ (function (_super) {
        __extends(GuajiBottomView, _super);
        function GuajiBottomView() {
            var _this = _super.call(this) || this;
            _this._curCoinEffLv = 0;
            _this._hasLeftEff = false;
            _this.img_coinblock.mouseEnabled = false;
            _this.box_bxeff.on(Laya.Event.CLICK, _this, _this.onClickBX);
            _this.boxCoinClick.on(Laya.Event.CLICK, _this, _this.onClickBX);
            _this.uiScene = new Base2dSceneLayer();
            // this.box_coineff.addChild(this.uiScene);
            _this.addChild(_this.uiScene);
            _this.setScenePos();
            return _this;
        }
        GuajiBottomView.prototype.setScenePos = function () {
            this.uiScene.setPos(Launch.offsetX, Launch.offsetY + game.GuajiView.OffY);
        };
        GuajiBottomView.prototype.onExit = function () {
            this._enter = false;
            this._isOpenJT = false;
            this.lbTime.visible = false;
            this.pgTime.visible = false;
            this.box_effGuang.stop();
            this.anim_bomb.stop();
            this.anim_bomb.visible = false;
            Laya.timer.clearAll(this);
            if (this._coinEff) {
                this.uiScene.removeEffect(this._coinEff);
                this._coinEff = null;
            }
            this.removeLeftEff();
            this.stopBattleEff();
            this.uiScene.onExit();
        };
        GuajiBottomView.prototype.onEnter = function () {
            this._enter = true;
            this._isOpenJT = false;
            this._curCoinEffLv = 0;
            this.ani1.gotoAndStop(0);
            this.coinEff.gotoAndStop(0);
            this.box_coineff.visible = false;
            Laya.timer.loop(5000, this, this.updateCoinEff);
            this.updateCoinEff();
            this.box_effGuang.play(0, true, "normal");
            this.uiScene.onShow();
            this.updateInterval();
        };
        /** 更新定时器 */
        GuajiBottomView.prototype.updateInterval = function () {
            Laya.timer.clear(this, this.updateTime);
            // 挂机时间
            if (App.hero.lastGetAfkTime > 0) {
                this.lbTime.visible = true;
                this.pgTime.visible = true;
                Laya.timer.loop(61000, this, this.updateTime);
                this.updateTime();
            }
            else {
                this.lbTime.visible = false;
                this.pgTime.visible = false;
            }
        };
        /** 更新挂机时间 */
        GuajiBottomView.prototype.updateTime = function () {
            var time = App.serverTimeSecond - App.hero.lastGetAfkTime;
            time = time > 0 ? time : 0;
            var maxTime = game.GuajiModel.getInstance().getMaxOfflineTime();
            if (time >= maxTime) {
                this.lbTime.text = GameUtil.toCountdown(maxTime, "hh:mm");
                this.pgTime.value = 1;
                Laya.timer.clear(this, this.updateTime);
            }
            else {
                this.lbTime.text = GameUtil.toCountdown(time, "hh:mm");
                // 60秒之内进度空
                this.pgTime.value = time >= 60 ? (time / maxTime) : 0;
            }
        };
        /** 宝箱打开静态动画 */
        GuajiBottomView.prototype.bxOpenJTEff = function () {
            if (this._isOpenJT)
                return;
            this._isOpenJT = true;
            this.box_effGuang.play(0, true, "openJT");
        };
        /** 宝箱打开动态动画 */
        GuajiBottomView.prototype.bxOpenDTEff = function () {
            this._isOpenJT = false;
            this.box_effGuang.play(0, false, "openDT");
            this.anim_bomb.visible = true;
            this.anim_bomb.play(0, false);
            Laya.timer.frameOnce(10, this, this.openDTEnd);
        };
        GuajiBottomView.prototype.openDTEnd = function () {
            this.box_effGuang.play(0, true, "normal");
        };
        GuajiBottomView.prototype.updateCoinEff = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            if (this.box_coineff.visible && this.coinEff.isPlaying)
                return;
            var lv = this.getCoinEffLv();
            this.box_coineff1.visible = false;
            if (!force && this._curCoinEffLv == lv)
                return;
            this._curCoinEffLv = lv;
            this.box_coineff.visible = lv > 0;
            this.ani1.gotoAndStop(0);
            this.img_coinblock.skin = GuajiBottomView.CoinEffSkinArr[lv];
            var sizeAry = GuajiBottomView.SizeAry[lv] || [0, 0];
            this.boxCoinClick.width = sizeAry[0];
            this.boxCoinClick.height = sizeAry[1] - 30;
            Laya.timer.once(400, this, function () {
                _this.playCoinGuangEff(_this.box_coineff.visible, lv);
            });
        };
        GuajiBottomView.prototype.getCoinEffLv = function () {
            if (App.hero.lastGetAfkTime == 0)
                return 0;
            var time = App.serverTimeSecond - App.hero.lastGetAfkTime;
            if (time < 300) {
                return 0;
            }
            if (time < 600) {
                return 1;
            }
            if (time < 1800) {
                return 2;
            }
            return 3;
        };
        /** 点击宝箱 */
        GuajiBottomView.prototype.onClickBX = function () {
            //判断挂机时间于领取箱子的最小时间
            if (!game.GuajiModel.getInstance().isCanReceiveBX()) {
                showToast(LanMgr.getLan('', 10047));
                return;
            }
            dispatchEvt(new game.GuajiEvent(game.GuajiEvent.LINGQU_GUAJI_JIANGLI));
        };
        /** 播放特效：领取挂机奖励成功 */
        GuajiBottomView.prototype.afterRewardSucc = function () {
            var _this = this;
            if (this.box_coineff.visible) {
                if (this.parent) {
                    this.parent.addChild(this.box_coineff1);
                    this.box_coineff1.y = 107 + this.y;
                }
                this.box_coineff1.visible = true;
                this.coinEff.play(1, false);
                this.coinEff.once(Laya.Event.COMPLETE, this, this.updateCoinEff);
                Laya.timer.once(300, this, function () {
                    AudioMgr.playSound("sound/ui_gold.mp3");
                });
                this.ani1.play(1, false);
                this.addLeftEff();
                Laya.timer.once(1000, this, function () {
                    _this.removeLeftEff();
                });
                this.bxOpenDTEff();
            }
        };
        GuajiBottomView.prototype.playCoinGuangEff = function (play, lv) {
            var _this = this;
            if (lv >= 3) {
                // let targetPos = this.lbTime.localToGlobal(new Laya.Point(0, 0));
                // let pos = this.uiScene.get3dPos(targetPos.x, targetPos.y - 30);
                var v3 = this.uiScene.get3dPos(360, 930);
                this.uiScene.addEffect(this, 1000008, v3, 4, 30, function ($particle) {
                    if (_this._coinEff) {
                        _this.uiScene.removeEffect(_this._coinEff);
                    }
                    _this._coinEff = $particle;
                });
            }
            else {
                if (this._coinEff || !this._enter) {
                    this.uiScene.removeEffect(this._coinEff);
                    this._coinEff = null;
                }
            }
        };
        GuajiBottomView.prototype.addLeftEff = function () {
            var _this = this;
            if (this._hasLeftEff)
                return;
            this._hasLeftEff = true;
            var v3 = this.uiScene.get3dPos(360, 990);
            this.uiScene.addEffect(this, 10000025, v3, 4, 0, function ($particle) {
                _this._leftEff = $particle;
                if (!_this._hasLeftEff) {
                    _this.removeLeftEff();
                }
            });
        };
        //移除左边特效
        GuajiBottomView.prototype.removeLeftEff = function () {
            this._hasLeftEff = false;
            if (this._leftEff) {
                this.uiScene.removeEffect(this._leftEff);
                this._leftEff = null;
            }
        };
        /**
         * 播放挑战boss特效
         */
        GuajiBottomView.prototype.playBattleEff = function () {
            var _this = this;
            // let targetPos = this.btn_onplay.localToGlobal(new Laya.Point(0, 0));
            // let pos = this.uiScene.get3dPos(targetPos.x + (this.btn_onplay.width >> 1), targetPos.y + (this.btn_onplay.height >> 1));
            var v3 = this.uiScene.get3dPos(360, 990);
            this.uiScene.addEffect(this, 10000026, v3, 5, 0, function ($particle) {
                if (_this._battleEff) {
                    _this.uiScene.removeEffect($particle);
                    return;
                }
                _this._battleEff = $particle;
            });
        };
        GuajiBottomView.prototype.stopBattleEff = function () {
            if (this._battleEff) {
                this.uiScene.removeEffect(this._battleEff);
                this._battleEff = null;
            }
        };
        /** 金币图片 */
        GuajiBottomView.CoinEffSkinArr = ["", "guaji/jinbi1.png", "guaji/jinbi2.png", "guaji/jinbi3.png"];
        /** 金币图片宽高 */
        GuajiBottomView.SizeAry = [[0, 0], [313, 115], [549, 164], [689, 194]];
        return GuajiBottomView;
    }(ui.guaji.GuajiBottomUI));
    game.GuajiBottomView = GuajiBottomView;
})(game || (game = {}));
