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
    var GodDoorTabDoor = /** @class */ (function (_super) {
        __extends(GodDoorTabDoor, _super);
        function GodDoorTabDoor() {
            var _this = _super.call(this) || this;
            _this._isClickZH = false;
            _this._hasbgEff = false;
            _this._hasRewardEff = false;
            _this._lastType = 1;
            _this.posMap = [
                { pos: [289, 376], scale: 1, alpha: 1, zoder: 3 },
                { pos: [494, 213], scale: 0.7, alpha: 0.7, zoder: 2 },
                { pos: [285, 112], scale: 0.7, alpha: 0.5, zoder: 0 },
                { pos: [82, 213], scale: 0.7, alpha: 0.7, zoder: 1 }
            ];
            _this.uiBottomScene = new Base2dSceneLayerExt();
            _this.addChildAt(_this.uiBottomScene, 1);
            _this.uiTopScene = new Base2dSceneLayerExt();
            _this.addChildAt(_this.uiTopScene, 3);
            _this.btn_left.on(Laya.Event.CLICK, _this, _this.onLeft);
            _this.btn_right.on(Laya.Event.CLICK, _this, _this.onRight);
            _this.boxbtn_right.on(Laya.Event.CLICK, _this, _this.onRight);
            _this.boxbtn_left.on(Laya.Event.CLICK, _this, _this.onLeft);
            _this.boxbtn_top.on(Laya.Event.CLICK, _this, _this.onTop);
            _this.btn_shop.on(Laya.Event.CLICK, _this, _this.onShop);
            _this.btn_kaiqi.on(Laya.Event.CLICK, _this, _this.onOpen);
            _this.lbXiangqing.on(Laya.Event.CLICK, _this, _this.onYulan);
            return _this;
        }
        GodDoorTabDoor.prototype.init = function () {
            this._clicktype = true;
            this.buildState();
            this.addBgEff();
        };
        GodDoorTabDoor.prototype.onOpen = function () {
            if (!this._clicktype) {
                return;
            }
            if (this._isClickZH || this._hasRewardEff) {
                return;
            }
            dispatchEvt(new game.GodDoorEvent(game.GodDoorEvent.OPEN_DOOR_EVENT), this["img_" + this._lastType].dataSource);
            this.openDoorEvent(this["img_" + this._lastType].dataSource);
        };
        GodDoorTabDoor.prototype.openDoorEvent = function ($data) {
            var _this = this;
            if ($data.cost[1] > App.hero.getBagItemNum(CostTypeKey.shenjiemiyao)) {
                showToast(LanMgr.getLan("", Lans.cost, CostTypeKey.shenjiemiyao));
                return;
            }
            this._isClickZH = true;
            var args = {};
            args[Protocol.game_god_doorEmploy.args.race] = $data.ID;
            PLC.request(Protocol.game_god_doorEmploy, args, function ($sdata) {
                _this._isClickZH = false;
                if (!$sdata)
                    return;
                _this.addRewardEff();
                Laya.timer.once(600, _this, function () {
                    _this.removeRewardEff();
                    UIUtil.showRewardView($sdata.commonData);
                });
                dispatchEvt(new game.GodDoorEvent(game.GodDoorEvent.KAIQI_SUCCESS));
            });
        };
        GodDoorTabDoor.prototype.close = function () {
            Laya.timer.clearAll(this);
            this.removeBgEff();
            this.removeRewardEff();
            this.uiBottomScene.onExit();
            this.uiTopScene.onExit();
            Laya.Tween.clearAll(this.img_1);
            Laya.Tween.clearAll(this.img_2);
            Laya.Tween.clearAll(this.img_3);
            Laya.Tween.clearAll(this.img_4);
            clearTimeout(this._timeout);
        };
        GodDoorTabDoor.prototype.addBgEff = function () {
            var _this = this;
            if (this._hasbgEff)
                return;
            this._hasbgEff = true;
            this.uiBottomScene.addEffect(this, 10000020, new tl3d.Vector3D(180, 0, -480), 2.5, 0, function ($particle) {
                _this._bgEff = $particle;
                if (!_this._hasbgEff) {
                    _this.removeBgEff();
                }
            });
        };
        //移除背景特效
        GodDoorTabDoor.prototype.removeBgEff = function () {
            this._hasbgEff = false;
            if (this._bgEff) {
                this.uiBottomScene.removeEffect(this._bgEff);
                this._bgEff = null;
            }
        };
        GodDoorTabDoor.prototype.addRewardEff = function () {
            var _this = this;
            if (this._hasRewardEff)
                return;
            this._hasRewardEff = true;
            this.uiTopScene.addEffect(this, 10000021, new tl3d.Vector3D(180, 0, -480), 2.5, 0, function ($particle) {
                _this._rewardEff = $particle;
                if (!_this._hasRewardEff) {
                    _this.removeRewardEff();
                }
            });
        };
        //移除获得物品特效
        GodDoorTabDoor.prototype.removeRewardEff = function () {
            this._hasRewardEff = false;
            if (this._rewardEff) {
                this.uiTopScene.removeEffect(this._rewardEff);
                this._rewardEff = null;
            }
        };
        GodDoorTabDoor.prototype.onTop = function () {
            var _this = this;
            if (!this._clicktype) {
                return;
            }
            clearTimeout(this._timeout);
            this.turnBuild(this._lastType + 1);
            this._timeout = setTimeout(function () {
                _this.turnBuild(_this._lastType + 1);
            }, 500);
        };
        GodDoorTabDoor.prototype.onShop = function () {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.shenjie);
        };
        GodDoorTabDoor.prototype.onLeft = function () {
            if (!this._clicktype) {
                return;
            }
            clearTimeout(this._timeout);
            this.turnBuild(this._lastType - 1);
        };
        GodDoorTabDoor.prototype.onRight = function () {
            if (!this._clicktype) {
                return;
            }
            clearTimeout(this._timeout);
            this.turnBuild(this._lastType + 1);
        };
        GodDoorTabDoor.prototype.turnBuild = function (ntype) {
            this.removeBgEff();
            this._clicktype = false;
            var nid = ntype % this.posMap.length;
            this._lastType = nid == 0 ? 4 : nid;
            this.buildState(true);
        };
        GodDoorTabDoor.prototype.buildState = function (isturn) {
            var _this = this;
            if (isturn === void 0) { isturn = false; }
            //阵营数量
            var len = this.posMap.length;
            var tablist = tb.TB_divinity_door.get_TB_divinity_door();
            var _loop_1 = function () {
                var curid = (len + tablist[i].ID - this_1._lastType) % len;
                var tempimg = this_1["img_" + tablist[i].ID];
                if (curid == 0) {
                    this_1.img_teamtag.skin = SkinUtil.getGodRaceSkin2(this_1._lastType);
                    this_1.lab_cost.text = "X" + tablist[i].cost[1];
                    // this.lab_teamname.text = SkinUtil.teamName[this._lastType];
                    // this.btn_kaiqi.label = "X" + tablist[i].cost[1] + "召唤";
                }
                Laya.Tween.clearTween(tempimg);
                if (isturn) {
                    Laya.Tween.to(tempimg, { alpha: this_1.posMap[curid].alpha, x: this_1.posMap[curid].pos[0], y: this_1.posMap[curid].pos[1], scaleX: this_1.posMap[curid].scale, scaleY: this_1.posMap[curid].scale }, 500, null, Handler.create(this_1, function () {
                        tempimg.zOrder = _this.posMap[curid].zoder;
                    }));
                }
                else {
                    tempimg.dataSource = tablist[i];
                    tempimg.pos(this_1.posMap[curid].pos[0], this_1.posMap[curid].pos[1]);
                    tempimg.scale(this_1.posMap[curid].scale, this_1.posMap[curid].scale);
                    tempimg.alpha = this_1.posMap[curid].alpha;
                    tempimg.zOrder = this_1.posMap[curid].zoder;
                }
            };
            var this_1 = this;
            for (var i = 0; i < tablist.length; i++) {
                _loop_1();
            }
            dispatchEvt(new game.GodDoorEvent(game.GodDoorEvent.TURN_BUILD_OK));
            if (isturn) {
                setTimeout(function () {
                    _this._clicktype = true;
                    _this.addBgEff();
                }, 500);
            }
        };
        GodDoorTabDoor.prototype.getLastType = function () {
            return this._lastType;
        };
        GodDoorTabDoor.prototype.onYulan = function () {
            UIMgr.showUI(UIConst.GodDoor_JiangliView, this._lastType);
        };
        return GodDoorTabDoor;
    }(ui.goddoor.render.TabDoorUI));
    game.GodDoorTabDoor = GodDoorTabDoor;
})(game || (game = {}));
