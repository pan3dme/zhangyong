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
    var FirstGuideView = /** @class */ (function (_super) {
        __extends(FirstGuideView, _super);
        function FirstGuideView() {
            var _this = _super.call(this) || this;
            _this.skillKey = ["1010110", "300060", "300010", "400030"];
            _this.scene = new game.MoiveScene();
            _this.addChildAt(_this.scene, 0);
            _this.img_bg.width = Laya.stage.width;
            _this.img_bg.height = Laya.stage.height;
            // this.list_skillmodel.visible = false;
            // this.list_skillmodel.mouseThrough = false;
            // this.list_skillmodel.selectHandler = new Handler(this, this.onSelect);
            // this.list_skillmodel.selectEnable = true;
            _this.ani1.on(Laya.UIEvent.COMPLETE, _this, _this.onAniComplete);
            _this.img_bg.on(Laya.Event.CLICK, _this, _this.onEndClick);
            return _this;
        }
        FirstGuideView.prototype.onEndClick = function () {
            if (this.lab_info.visible) {
                this.endterGame();
            }
        };
        Object.defineProperty(FirstGuideView.prototype, "loadcomplete", {
            set: function (value) {
                this._loadcomplete = value;
                if (value && this._anicomplete) {
                    // if (value && this._anicomplete && Browser.onPC) {
                    this.startFight();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 加载引导中所需资源
        */
        FirstGuideView.prototype.LoadGuideModel = function () {
            var _this = this;
            if (!this.scene.gameScene) {
                return;
            }
            this.guideResVis(true);
            this.startGuide();
            var models = [3106, 20012, 3101, 4103];
            var effary = [888888, 1029, 1024, 1000003];
            var uiMgr = UIMgr.getInstance();
            LoadeQueue.getInstance().loadAll(this.scene.gameScene, this.skillKey, models, effary, "scene012", function (value, type) {
                var txId = type == 0 ? 10545 : type == 1 ? 10546 : type == 2 ? 10547 : type == 3 ? 10548 : -1;
                var str = LanMgr.getLan("", txId);
                uiMgr.loadingProcess(value, str);
            }, function () {
                uiMgr.hideLoading();
                _this.loadcomplete = true;
                _this.scene.initRoles();
                _this.scene.refreshEnemy(1, 2);
            });
            //todo  等战斗开始再加载潘多拉
            //2008
        };
        FirstGuideView.prototype.guideResVis = function (flag) {
            this.img_pic1.visible = this.img_pic2.visible = this.img_pic3.visible = this.box_info1.visible = this.box_info2.visible = this.box_info3.visible = this.box_info4.visible = flag;
            this.img_bg.visible = flag;
        };
        FirstGuideView.prototype.preLoadSkill = function () {
            for (var i = 0; i < this.skillKey.length; i++) {
                this.scene.gameScene.scene.skillMgr.preLoadSkill(getSkillUrl(this.skillKey[i]));
            }
        };
        /**
         * 开始黑幕引导
         */
        FirstGuideView.prototype.startGuide = function () {
            this.ani1.play(0, false);
        };
        FirstGuideView.prototype.onAniComplete = function () {
            var _this = this;
            this._anicomplete = true;
            // if (!Browser.onPC) {
            //     this.loadcomplete = true;
            // }
            setTimeout(function () {
                _this.lab_info.visible = true;
                _this._autoenter = setTimeout(function () {
                    _this.endterGame();
                }, 3000);
            }, 1000);
        };
        FirstGuideView.prototype.endterGame = function () {
            clearTimeout(this._autoenter);
            this.lab_info.visible = false;
            // if (!Browser.onPC) {
            //     this.close();
            //     DialogExt.manager.mouseEnabled = false;
            //     dispatchEvt(new LoginLoadEvent(LoginLoadEvent.ENTERHUD_EVENT), 9);
            //     UIMgr.showUI(UIConst.CreateRoleView, null, false);
            //     return;
            // }
            this.guideResVis(false);
            if (this._loadcomplete) {
                this.startFight();
            }
            else {
                UIMgr.getInstance().showLoading();
            }
        };
        FirstGuideView.prototype.startFight = function () {
            if (!this._fightstart) {
                this.initFight();
            }
        };
        FirstGuideView.prototype.initFight = function () {
            var _this = this;
            this._fightstart = true;
            // this.scene.initCam();
            this.scene.initCam(this.scene.dxc_initBossCamparm);
            setTimeout(function () {
                _this.scene.tweenCam(5, function () {
                    _this.fightNext(0);
                    game.GuideManager.startFightGuide();
                    //这里开始加载下一步资源
                    dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.LOADHUD_EVENT), true);
                });
            }, 500);
        };
        FirstGuideView.prototype.fightNext = function ($stepId) {
            var _this = this;
            if ($stepId >= this.scene.stepAry.length - 1) {
                //完成所有
                setTimeout(function () {
                    _this.close();
                    _this.scene.gameScene.scene.skillMgr.shock.clearShock();
                    dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.ENTERHUD_EVENT), _this.scene.stepAry.length + 1);
                }, 100);
                return;
            }
            this.scene.nextStep($stepId);
        };
        FirstGuideView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this._fightstart = false;
            //强制设置1倍数
            this.lab_info.visible = false;
            this.scene.gameScene.timespeed1 = 0.3;
            AudioMgr.setPlayRate(1.3);
            this.loadcomplete = false;
            this._anicomplete = false;
            // if (Browser.onPC) {
            this.LoadGuideModel();
            // } else {
            //     this.guideResVis(true);
            //     this.startGuide();
            // }
        };
        FirstGuideView.prototype.setBossBlood = function ($bloodnum) {
            var _this = this;
            var num = $bloodnum / 100;
            var nwidth = 538 * num;
            if (!this.box_blood.visible && $bloodnum > 0) {
                this.box_blood.visible = true;
                this.img_blood.width = nwidth;
                this.img_pross.width = nwidth;
                this._bossblood = $bloodnum;
                return;
            }
            Laya.Tween.clearTween(this.img_blood);
            Laya.Tween.clearTween(this.img_pross);
            if (this._bossblood < $bloodnum) {
                //回血
                this.img_pross.width = nwidth;
                Laya.Tween.to(this.img_blood, { width: nwidth }, 500, null, Laya.Handler.create(this, function () {
                    _this.box_blood.visible = $bloodnum > 0;
                }));
            }
            else if (this._bossblood > $bloodnum) {
                //掉血
                this.img_blood.width = nwidth;
                Laya.Tween.to(this.img_pross, { width: nwidth }, 500, null, Laya.Handler.create(this, function () {
                    _this.box_blood.visible = $bloodnum > 0;
                }));
            }
            this._bossblood = $bloodnum;
        };
        FirstGuideView.prototype.show = function () {
            _super.prototype.show.call(this);
        };
        FirstGuideView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            AudioMgr.setPlayRate(1);
            clearTimeout(this._autoenter);
            this.scene.gameScene.timespeed1 = 0;
            // this.off(Laya.Event.CLICK, this, this.onClick);
        };
        return FirstGuideView;
    }(ui.firstguide.FirstGuideUI));
    game.FirstGuideView = FirstGuideView;
})(game || (game = {}));
