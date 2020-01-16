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
var common;
(function (common) {
    var ShowRole = /** @class */ (function (_super) {
        __extends(ShowRole, _super);
        function ShowRole() {
            var _this = _super.call(this) || this;
            _this.effList = [];
            _this._anis = [];
            _this.popupCenter = true;
            _this.list_stars_0.renderHandler = new Handler(_this, _this.onXingjiRender);
            _this.uiScene = new Base2dSceneLayer();
            _this.uiScene.setModelBox(_this, _this.img_level, _this.lab_name);
            _this.addChildAt(_this.uiScene, _this.numChildren - 2);
            _this.isModelClose = true;
            return _this;
        }
        Object.defineProperty(ShowRole.prototype, "godVo", {
            get: function () {
                return this.dataSource[0];
            },
            enumerable: true,
            configurable: true
        });
        ShowRole.prototype.onOpened = function () {
            var _this = this;
            _super.prototype.onOpened.call(this);
            if (!this.dataSource) {
                var vo = new GodItemVo(tb.TB_god.get_TB_godById(4107));
                vo.starLevel = 10;
                this.dataSource = [vo, UI_FLYTEXT.UPSTART];
            }
            this.img_zhezhao.on(Laya.Event.CLICK, this, this.onExit);
            this.uiScene.onShow();
            var god = this.godVo;
            var type = this.dataSource[1];
            this.lab_info.visible = false;
            this._lastTime = Date.now();
            this.drawListView(god);
            this.img_bgs.visible = this.imgBg.visible = this.list_stars_0.visible = type != UI_FLYTEXT.UPSTART;
            this.box_skill.visible = false;
            this.starList.visible = type == UI_FLYTEXT.UPSTART && this.godVo.starLevel <= 5;
            if (type == UI_FLYTEXT.UPSTART) {
                //升星
                this.playGodStarUpEffect();
                this.setModel(god.getModel());
            }
            else if (type == UI_FLYTEXT.AWAKEN) {
                //觉醒
                var before = god.tab_god.model;
                this.setModel(before);
                this.drawStar(god.getStar());
            }
            setTimeout(function () {
                _this.uiScene.addEffect(_this, 1000002, new tl3d.Vector3D(180, 0, -640), 3, 30, function ($particle) {
                    _this.roleRotation($particle, god, type);
                });
            }, 500);
        };
        ShowRole.prototype.drawListView = function ($vo) {
            this.lab_name.text = $vo.tab_god.name;
            // this.img_level.skin = SkinUtil.getQulitySkin($vo.tab_god.quality - 1);
        };
        ShowRole.prototype.drawStar = function ($star) {
            var star = $star >= 6 ? $star - 5 : $star;
            this.list_stars_0.repeatX = star;
            var tempStararry = new Array;
            for (var i = 0; i < star; i++) {
                tempStararry[i] = $star >= 6;
            }
            this.list_stars_0.dataSource = tempStararry;
            this.list_stars_0.x = 291 + (5 - star) * 29 / 2;
        };
        ShowRole.prototype.onXingjiRender = function (cell, index) {
            var data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
                cell.width = 29;
                cell.height = 31;
            }
            else
                cell.skin = SkinUtil.xingxing;
        };
        ShowRole.prototype.onClosed = function () {
            if (this.dataSource && this.dataSource[2])
                UIUtil.showRewardView(this.dataSource[2]);
            _super.prototype.onClosed.call(this);
            this.img_zhezhao.off(Laya.Event.CLICK, this, this.onExit);
            this._anis.forEach(function (vo) { return vo.destroy(); });
            this._anis.length = 0;
            this.uiScene.onExit();
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            this.onRemoveEffect();
        };
        ShowRole.prototype.onRemoveEffect = function () {
            for (var _i = 0, _a = this.effList; _i < _a.length; _i++) {
                var particle = _a[_i];
                this.uiScene.removeEffect(particle);
            }
            this.effList.length = 0;
        };
        ShowRole.prototype.onExit = function () {
            UIMgr.hideUIByName(UIConst.ShowRole);
        };
        ShowRole.prototype.roleRotation = function ($particle, $god, $type) {
            var _this = this;
            setTimeout(function () {
                _this.img_bgs.visible = true;
                _this.img_bgs.alpha = 0;
                Laya.Tween.to(_this.img_bgs, { alpha: $type != UI_FLYTEXT.UPSTART ? 1 : 0 }, 1000, null, Handler.create(_this, function () {
                    if ($type == UI_FLYTEXT.AWAKEN) {
                        _this.setModel($god.tab_god.awake_model);
                        _this.drawStar($god.getStar());
                    }
                    else if ($type == UI_FLYTEXT.UPSTART) {
                        _this.setModel($god.getModel());
                        _this.drawStar($god.getStar());
                        _this.showSkill($god);
                    }
                    Laya.Tween.to(_this.img_bgs, { alpha: 0 }, 1000, null, Handler.create(_this, function () {
                        _this.img_bgs.visible = false;
                    }));
                    if ($type != UI_FLYTEXT.UPSTART) {
                        _this.uiScene.addEffect(_this, 10000015, new tl3d.Vector3D(180, 0, -200), 7, -30, null, 180);
                        setTimeout(function () {
                            _this.lab_info.visible = true;
                        }, 500);
                    }
                    else {
                        _this.lab_info.visible = true;
                    }
                }));
            }, 500);
        };
        ShowRole.prototype.showSkill = function (god) {
            var starLv = god.getStar();
            var degree = god.degree;
            if (!god || starLv < 2)
                return;
            var curTemp = tb.TB_god_evolution.get_TB_god_evolutionById(starLv);
            var lastTemp = tb.TB_god_evolution.get_TB_god_evolutionById(starLv - 1);
            var idx = -1;
            var curLv = 0;
            var lastLv = 0;
            for (var i = 0; i < curTemp.evolution_effect.length; i++) {
                if (curTemp.evolution_effect[i] > lastTemp.evolution_effect[i]) {
                    idx = i;
                    curLv = curTemp.evolution_effect[i];
                    lastLv = lastTemp.evolution_effect[i];
                    break;
                }
            }
            if (idx == -1)
                return;
            var oldAllSkill = god.tab_god.getAllSkill(god.degree, god.getStar() - 1);
            var curAllSkill = god.jisuanjineng();
            if (!oldAllSkill || idx >= oldAllSkill.length)
                return;
            if (!curAllSkill || idx >= curAllSkill.length)
                return;
            this.box_skill.visible = true;
            var oldTbSkill = oldAllSkill[idx];
            var oldSkill = { skill: oldTbSkill, openDgLv: oldTbSkill.level, dgLv: lastLv, isShow: false, isShowlist: false };
            this.oldSkill.dataSource = oldSkill;
            var newTbSkill = curAllSkill[idx];
            var newSkill = { skill: newTbSkill, openDgLv: newTbSkill.level, dgLv: curLv, isShow: false, isShowlist: false };
            this.newSkill.dataSource = newSkill;
        };
        /**
         * 设置模型
         * @param model 模型id
         */
        ShowRole.prototype.setModel = function (model) {
            if (!this.uiScene) {
                return;
            }
            this.uiScene.addModelChar(model, 360, 850, 180);
        };
        /**升星特效播放 */
        ShowRole.prototype.playGodStarUpEffect = function () {
            var _this = this;
            this.effList.length = 0;
            var starLv = this.godVo.starLevel /*10*/;
            this._type = starLv > 5;
            var num = this._type ? starLv - 5 : starLv;
            if (starLv > 5) {
                var _loop_1 = function (i) {
                    Laya.timer.once(200 * (i + 1), this_1, function () {
                        var posx = 100 + (5 - num) * 21 + i * 42;
                        _this.uiScene.addEffect(_this, 10000024, new tl3d.Vector3D(posx, 0, -120), 3, 3, function (particle) {
                            if (!UIMgr.hasStage(UIConst.ShowRole)) {
                                _this.onRemoveEffect();
                                return;
                            }
                            _this.effList.push(particle);
                        }, 180);
                        if (i + 1 == num)
                            _this.uiScene.addEffect(_this, 10000014, new tl3d.Vector3D(180, 0, -200), 7, 3, null, 180);
                    });
                };
                var this_1 = this;
                for (var i = 0; i < num; i++) {
                    _loop_1(i);
                }
            }
            else {
                this.starList.repeatX = num;
                this.starList.x = 95 + (5 - this.starList.repeatX) * (225 - 150) / 2;
                this.starList.cells.forEach(function (cell, index) {
                    cell.red.visible = cell.glod.visible = false;
                    Laya.timer.once(200 * (index + 1), cell, function () {
                        _this._type ? cell.red.visible = true : cell.glod.visible = true;
                        _this._type ? cell.red.play(0, false) : cell.glod.play(0, false);
                        if (index + 1 == _this.starList.repeatX)
                            _this.uiScene.addEffect(_this, 10000014, new tl3d.Vector3D(180, 0, -200), 7, 3, null, 180);
                    });
                });
            }
        };
        return ShowRole;
    }(ui.prompt.RoleEffUI));
    common.ShowRole = ShowRole;
})(common || (common = {}));
