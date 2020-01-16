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
/**
* name
*/
var game;
(function (game) {
    var ZhaohuanResultView = /** @class */ (function (_super) {
        __extends(ZhaohuanResultView, _super);
        function ZhaohuanResultView() {
            var _this = _super.call(this) || this;
            _this._ui = UIMgr.getInstance();
            /**抽卡特效播放完毕 */
            _this._isShowModel = false;
            _this._hasModelEff = false;
            /** 添加卡牌 */
            _this._cardModels = [];
            _this.btn_leftpage.on(Laya.Event.CLICK, _this, function () {
                // let num = this._curIdx - 1;
                // if (num < 0) num = this.box_ten.array.length - 1;
                // this.box_ten.selectedIndex = num;
            });
            _this.btn_rightpage.on(Laya.Event.CLICK, _this, function () {
                // let num = (this._curIdx + 1) % (this.box_ten.array.length);
                // this.box_ten.selectedIndex = num;
            });
            _this.uiScene = new Base2dSceneLayer();
            _this.addChildAt(_this.uiScene, 1);
            _this.uiScene.setModelBox(_this, _this.list_stars, _this.lab_name);
            // this.box_ten.selectHandler = new Handler(this, this.onSelect);
            _this.list_stars.renderHandler = new Handler(_this, _this.onRenderStar);
            // this.box_ten.selectEnable = true;
            // this.box_ten.selectedIndex = -1;
            _this.btn_sure.on(Laya.Event.CLICK, _this, _this.close);
            _this.btn_again.on(Laya.Event.CLICK, _this, _this.onAgain);
            _this.img_tipbg.on(Laya.Event.CLICK, _this, function () {
                if (_this.lab_txt.visible) {
                    _this.close();
                }
            });
            _this.img_tipbg.skin = SkinUtil.getSysMapSkin(ModuleConst.SUMMON, 1);
            return _this;
            // this.ani_item.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);
            // this.ani_item2.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);
        }
        ZhaohuanResultView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._uiGodItem = [];
            for (var i = 0; i < 10; i++) {
                this._uiGodItem[i] = this["ui_god_" + i];
                this._uiGodItem[i].visible = false;
            }
        };
        ZhaohuanResultView.prototype.popup = function () {
            this.uiScene.onExit();
            _super.prototype.popup.call(this, false, false);
        };
        ZhaohuanResultView.prototype.show = function () {
            this.uiScene.onExit();
            _super.prototype.show.call(this, false, false);
        };
        ZhaohuanResultView.prototype.onOpened = function () {
            var _this = this;
            _super.prototype.onOpened.call(this);
            this.chk_jump.on(Laya.Event.CHANGE, this, this.onChkJump);
            this.initView();
            if (this._particle || game.ZhaohuanModel.getInstance().jumpAni) {
                // logyhj("存在特效");
                this.onEffComplete();
            }
            else {
                setTimeout(function () {
                    // let pointX = Laya.stage.width >> 2;
                    //加载抽卡动画
                    _this.uiScene.addEffect(_this, 1000001, new tl3d.Vector3D(180, 0, -750), 3.5, 30, function ($particle) {
                        _this._particle = $particle;
                        _this._particle.addEventListener(tl3d.BaseEvent.COMPLETE, _this.onEffComplete, _this);
                    }, 0, 0, false, 0.9);
                }, 200);
            }
            this.on(Laya.Event.CLICK, this, this.onClickHideModel);
        };
        /**初始化界面*/
        ZhaohuanResultView.prototype.initView = function () {
            this.uiScene.onShow();
            this.box_btn.visible = false;
            this.lab_txt.visible = false;
            // this.box_ten.visible = false;
            // this.box_ten.array = null;
            // this.box_ten.selectedIndex = -1;
            this.hideUiGodItem();
            this.clearCardModel();
            this.btn_rightpage.visible = this.btn_leftpage.visible = false;
            this.img_starbg.visible = false;
            this.list_stars.visible = false;
            this.box_box.visible = false;
            this.box_eff.visible = false;
            this.img_rewardbg.visible = this.img_reward.visible = false;
            this.chk_jump.selected = game.ZhaohuanModel.getInstance().jumpAni;
        };
        ZhaohuanResultView.prototype.removeEff = function () {
            if (this._particle) {
                this._particle.removeEventListener(tl3d.BaseEvent.COMPLETE, this.onEffComplete, this);
                this.uiScene.removeEffect(this._particle);
                this._particle = null;
            }
        };
        ZhaohuanResultView.prototype.onEffComplete = function () {
            if (!this._particle && !game.ZhaohuanModel.getInstance().jumpAni)
                return;
            this.removeEff();
            AudioMgr.playSound("sound/zhaohuanSucc.mp3");
            this.box_eff.visible = true;
            //十连抽显示
            var dataary = this.dataSource.godlist;
            if (game.ZhaohuanModel.getInstance().jumpAni) {
                for (var i = 0; i < dataary.length; i++) {
                    this.showGodItem(i, dataary[i]);
                }
                if (dataary.length > 1) {
                    this._uiGodItem[0].x = 160;
                    this._uiGodItem[0].y = 100;
                }
                else {
                    this._uiGodItem[0].x = 335;
                    this._uiGodItem[0].y = 320;
                }
                this.endEff();
                return;
            }
            if (dataary.length > 1) { //10连抽
                dataary.sort(function (a, b) {
                    // if (b.tab_god.quality == a.tab_god.quality) {
                    // 	return b.getStar() - a.getStar();
                    // } else {
                    // 	return b.tab_god.quality - a.tab_god.quality;
                    // }
                    var rand = Math.floor(Math.random() * 4) - 2;
                    return rand;
                });
                // var godVo = this.dataSource.godlist[0];
                // this._isShowModel = godVo.getStar() >= 4;
                this._isShowModel = false;
                this._uiGodItem[0].x = 160;
                this._uiGodItem[0].y = 100;
                if (!this._isShowModel) {
                    for (var i = 0; i < this._uiGodItem.length; i++) {
                        var card = this._uiGodItem[i];
                        this.addCardModel(card.x + this.box_eff.x - 2, card.y + this.box_eff.y + 106);
                    }
                }
                this.uiScene.timespeed1 = 1.2;
                // this.btn_rightpage.visible = this.btn_leftpage.visible = true;
                // this.ani_item.visible = this.ani_item2.visible = false;
                this._totalnum = dataary.length;
                this._effnum = 0;
                this._effidx = 0;
                // this.box_btn.y = 900;
                Laya.timer.callLater(this, this.playEff);
            }
            else {
                // this.endEff();
                // // this.box_btn.y = 1018;
                // let godVo = this.dataSource.godlist[0];
                // this.drawListView(godVo.tab_god, godVo);
                this.uiScene.timespeed1 = 1.2;
                var card = this._uiGodItem[0];
                card.x = 335;
                card.y = 320;
                this._isShowModel = false;
                this.addCardModel(card.x + this.box_eff.x - 2, card.y + this.box_eff.y + 106);
                this._totalnum = 1;
                this._effnum = 0;
                Laya.timer.callLater(this, this.playEff);
            }
        };
        ZhaohuanResultView.prototype.endEff = function () {
            if (this.dataSource.reward) {
                var reward = this.dataSource.reward[iface.tb_prop.resTypeKey.legendChip];
                if (reward) {
                    this.img_reward.visible = this.img_rewardbg.visible = true;
                    this.lab_rewardnum.text = "x " + reward;
                    this.img_reward.y = this.img_rewardbg.y = this.box_eff.visible ? 220 : 350;
                }
            }
            this.uiScene.timespeed1 = 0;
            this._curIdx = 0;
            this.box_box.y = 0;
            if (!this.box_eff.visible)
                this.addModelEff();
            this.img_starbg.visible = true;
            this.setBtn();
        };
        ZhaohuanResultView.prototype.addModelEff = function () {
            var _this = this;
            if (this._hasModelEff)
                return;
            this._hasModelEff = true;
            this.uiScene.addEffect(this, 1000005, new tl3d.Vector3D(180, 0, -630), 1.5, 30, function ($particle) {
                _this._modelEff = $particle;
                if (!_this._hasModelEff) {
                    _this.removeModelEff();
                }
            });
        };
        //移除模型特效
        ZhaohuanResultView.prototype.removeModelEff = function () {
            this._hasModelEff = false;
            if (this._modelEff) {
                this.uiScene.removeEffect(this._modelEff);
                this._modelEff = null;
            }
        };
        ZhaohuanResultView.prototype.playEff = function () {
            var _this = this;
            if (this._effnum >= this._totalnum && !this._isShowModel) {
                this.endEff();
                return;
            }
            // let fanpaiui = this.ani_item;
            // if (this._effnum % 2 == 1) {
            // 	fanpaiui = this.ani_item2;
            // }
            // if (fanpaiui.visible && fanpaiui.isPlaying) {
            // 	this.onAniComplete();
            // }
            var godVo = this.dataSource.godlist[this._effnum];
            if (this._isShowModel) {
                if (godVo.getStar() >= 4) {
                    this.showModel(this._effnum);
                }
                else {
                    this._effnum = 0;
                    this._isShowModel = false;
                    for (var i = 0; i < this._uiGodItem.length; i++) {
                        var card = this._uiGodItem[i];
                        this.addCardModel(card.x + this.box_eff.x - 2, card.y + this.box_eff.y + 106);
                    }
                    this.playEff();
                    return;
                }
                // fanpaiui.visible = false;
                // this.onAniComplete();
            }
            else {
                // fanpaiui.visible = true;
                // let cell = this.box_ten.getCell(this._effnum)
                // fanpaiui.x = this.box_ten.x + cell.x + 45;
                // fanpaiui.y = this.box_ten.y + cell.y + 47;
                // fanpaiui.play(0, false);
                this.playCardModelTurn(this._effnum);
                Laya.timer.once(240, this, function (idx, godvoD) {
                    _this.showGodItem(idx, godvoD);
                }, [this._effnum, godVo]);
                clearTimeout(this._efftag);
                this._efftag = setTimeout(function () {
                    _this.playEff();
                }, 250);
            }
            this._effnum++;
        };
        ZhaohuanResultView.prototype.onAniComplete = function () {
            // let cell = this.box_ten.getCell(this._effidx);
            // cell.visible = true;
            // this._effidx++;
            // logyhj("this._effnum:", this._effnum, cell.visible);
        };
        ZhaohuanResultView.prototype.setBtn = function () {
            var _this = this;
            var tab = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            var obj = game.ZhaohuanModel.getInstance().curObj;
            if (obj.type != -1) {
                var has = 0;
                var need = 0;
                if (obj.type == game.ZHAOHUAN.GENERAL) {
                    has = App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu);
                    this.img_skin.skin = SkinUtil.putong;
                    need = obj.isOne ? 1 : 10;
                }
                if (obj.type == game.ZHAOHUAN.FRIENDSHIP) {
                    has = App.hero.friend;
                    need = obj.isOne ? tab.friend_cost : (tab.friend_cost * 10);
                    this.img_skin.skin = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.friend);
                }
                if (obj.type == game.ZHAOHUAN.DIAMOND) {
                    var middlebooknum = App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu);
                    var tab_1 = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
                    var oneimgurl = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond);
                    has = App.hero.diamond;
                    need = obj.isOne ? tab_1.zuanshi_once : tab_1.zuanshi_ten;
                    if (obj.isOne) {
                        if (middlebooknum >= tab_1.zuanshi_once_priority[1]) {
                            has = middlebooknum;
                            oneimgurl = SkinUtil.danchou;
                            need = tab_1.zuanshi_once_priority[1];
                        }
                    }
                    else {
                        if (middlebooknum >= tab_1.zuanshi_ten_priority[1]) {
                            has = middlebooknum;
                            oneimgurl = SkinUtil.danchou;
                            need = tab_1.zuanshi_ten_priority[1];
                        }
                    }
                    this.img_skin.skin = oneimgurl;
                }
                if (obj.type == game.ZHAOHUAN.LEGEND) {
                    this.img_skin.skin = SkinUtil.chuanshuo;
                    has = App.hero.legendChip;
                    need = tab.special_employ[1];
                }
                // this.box_cost.x = 402 - (12 * (has.length - 2 + need.length - 2)) / 2
                this.btn_again.label = obj.type == game.ZHAOHUAN.LEGEND ? LanMgr.getLan("", 12106) : obj.isOne ? LanMgr.getLan("", 12106) : LanMgr.getLan("", 12107);
                this.lab_has.color = Number(has) >= Number(need) ? ColorConst.WHITE : "#f62e08";
                this.lab_has.stroke = Number(has) >= Number(need) ? 0 : 2;
                this.lab_has.text = Snums(Number(has));
                this.lab_need.text = " / " + need;
                this.lab_has.event(Laya.Event.RESIZE);
                this.box_btn.timerOnce(300, this, function () {
                    _this.box_btn.visible = true;
                    dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_BTN_VISIBLE_TRUE));
                });
            }
            else {
                this.lab_txt.timerOnce(1000, this, function () {
                    _this.lab_txt.visible = true;
                    dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_BTN_VISIBLE_TRUE));
                });
            }
        };
        /**再来一次 */
        ZhaohuanResultView.prototype.onAgain = function () {
            var _this = this;
            var obj = game.ZhaohuanModel.getInstance().curObj;
            var newGodNum = obj.isOne ? 1 : 10;
            if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= game.GodUtils.getGodsNum() + newGodNum) {
                var alertStr = LanMgr.getLan("", 10226);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: function () {
                        _this.close();
                        dispatchEvt(new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW));
                    }
                });
                return;
            }
            dispatchEvt(new game.SummonEvent(game.SummonEvent.SEND_ZHAOHUAN), { isOne: obj.isOne, type: obj.type, again: 1 });
        };
        ZhaohuanResultView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            this._curIdx = index;
            var godVo = this.dataSource.godlist[this._curIdx];
            var tabgod = godVo.tab_god;
            this.drawListView(tabgod, godVo);
        };
        //显示模型
        ZhaohuanResultView.prototype.showModel = function (index) {
            this.box_eff.visible = false;
            var godVo = this.dataSource.godlist[index];
            var tabgod = godVo.tab_god;
            this.drawListView(tabgod, godVo);
            this.addModelEff();
        };
        ZhaohuanResultView.prototype.clearModel = function () {
            this.box_eff.visible = true;
            this.box_box.visible = false;
            this.uiScene.clearSceneChar();
            this.removeModelEff();
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
        };
        ZhaohuanResultView.prototype.onClickHideModel = function () {
            if (this.box_box.visible) {
                this.clearModel();
                this.playEff();
            }
        };
        ZhaohuanResultView.prototype.drawListView = function (tabgod, godVo) {
            var _this = this;
            this.lab_name.text = tabgod.name;
            // 星级
            var starNum = godVo.starLevel >= 6 ? godVo.starLevel - 5 : godVo.starLevel;
            var tempStararry = new Array;
            for (var i = 0; i < starNum; i++) {
                tempStararry[i] = godVo.starLevel >= 6;
            }
            this.list_stars.array = tempStararry;
            // this.list_stars.x = this.width/2 - (30 + tempStararry.length * 30 + this.list_stars.spaceX * (tempStararry.length - 1));
            this.list_stars.width = (30 + tempStararry.length * 30 + this.list_stars.spaceX * (tempStararry.length - 1));
            // 大于5星
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            this.list_stars.visible = false;
            if (godVo.starLevel >= 5) {
                Laya.timer.once(1000, this, function () {
                    var cells = _this.list_stars.cells;
                    cells.forEach(function (cell, index) {
                        cell.visible = false;
                    });
                    _this.list_stars.visible = true;
                    for (var i = 0; i < cells.length; i++) {
                        Laya.timer.once(i * 200, _this, function (cell, index) {
                            cell.scale(2, 2);
                            cell.visible = true;
                            Laya.Tween.to(cell, { scaleX: 1, scaleY: 1 }, 200);
                        }, [cells[i], i]);
                    }
                });
            }
            else {
                this.list_stars.visible = true;
            }
            //召唤光效
            this.setModel(tabgod.model);
            this.uiScene.sceneChar.alpha = 0;
            Laya.Tween.to(this.uiScene.sceneChar, { alpha: 1 }, 2000);
        };
        /**
         * 设置模型
         * @param model 模型id
         */
        ZhaohuanResultView.prototype.setModel = function (model) {
            this.box_box.visible = true;
            this.uiScene.addModelChar(model, 360, 900);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
        };
        ZhaohuanResultView.prototype.onRenderStar = function (cell, index) {
            if (index > this.list_stars.array.length)
                return;
            cell.scale(1, 1);
            var data = this.list_stars.array[index];
            if (data) {
                cell.skin = SkinUtil.superXing;
            }
            else {
                cell.skin = SkinUtil.xingxing;
            }
        };
        ZhaohuanResultView.prototype.isCanClose = function () {
            return this.box_btn.visible || this.lab_txt.visible;
        };
        ZhaohuanResultView.prototype.showGodItem = function (index, godvo) {
            if (!this._uiGodItem)
                return;
            if (index < 0 || index >= this._uiGodItem.length)
                return;
            this._uiGodItem[index].dataSource = godvo;
            this._uiGodItem[index].visible = godvo != null;
        };
        ZhaohuanResultView.prototype.hideUiGodItem = function () {
            if (this._uiGodItem) {
                for (var i = 0; i < this._uiGodItem.length; i++) {
                    var godui = this._uiGodItem[i];
                    if (godui) {
                        godui.visible = false;
                        godui.dataSource = null;
                    }
                }
            }
        };
        ZhaohuanResultView.prototype.addCardModel = function (postionx, postiony, rotate, scale) {
            if (rotate === void 0) { rotate = 180; }
            if (scale === void 0) { scale = 1.1; }
            var sceneChar = new GameUIChar();
            this.uiScene.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl("100002"));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.set2dPos(postionx, postiony);
            sceneChar.scale = scale;
            this._cardModels.push(sceneChar);
        };
        ZhaohuanResultView.prototype.playCardModelTurn = function (index) {
            var _this = this;
            if (index === void 0) { index = -1; }
            if (!this._cardModels || this._cardModels.length == 0)
                return;
            if (index < 0 || index >= this._cardModels.length) {
                //全部播放
                this._cardModels.forEach(function (card, index) {
                    _this.charPlaySkill(card, function () {
                        _this.uiScene.removeModelChar(card);
                    });
                });
            }
            else {
                var card_1 = this._cardModels[index];
                this.charPlaySkill(card_1, function () {
                    _this.uiScene.removeModelChar(card_1);
                });
            }
        };
        ZhaohuanResultView.prototype.clearCardModel = function () {
            if (!this._cardModels || this._cardModels.length == 0)
                return;
            for (var i = 0; i < this._cardModels.length; i++) {
                var card = this._cardModels[i];
                this.uiScene.removeModelChar(card);
            }
            this._cardModels = [];
        };
        ZhaohuanResultView.prototype.charPlaySkill = function ($char, $cb) {
            var _this = this;
            if ($cb === void 0) { $cb = null; }
            this._guajiskill = this.uiScene.scene.skillMgr.getSkill(getSkillUrl("100002"), "skill_01", function () {
                _this.charPlaySkill($char, $cb);
            });
            if (!this._guajiskill.keyAry) {
                return;
            }
            if (this._guajiskill) {
                this._guajiskill.reset();
                this._guajiskill.isDeath = false;
            }
            if (!$char || !$char.onStage) {
                return;
            }
            this._guajiskill.configFixEffect($char, $cb);
            this._guajiskill.needShock = false;
            this.uiScene.scene.skillMgr.playSkill(this._guajiskill);
        };
        //跳过动画
        ZhaohuanResultView.prototype.onChkJump = function () {
            game.ZhaohuanModel.getInstance().jumpAni = this.chk_jump.selected;
        };
        ZhaohuanResultView.prototype.close = function () {
            _super.prototype.close.call(this, "", false);
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            this.chk_jump.off(Laya.Event.CHANGE, this, this.onChkJump);
            var scenechar = this.uiScene.sceneChar;
            if (scenechar) {
                if (scenechar.alpha < 1)
                    scenechar.alpha = 1;
                Laya.Tween.clearTween(scenechar);
            }
            this.removeEff();
            this.uiScene.onExit();
        };
        ZhaohuanResultView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this, type);
            this.box_btn.visible = false;
            this.lab_txt.visible = false;
            this.off(Laya.Event.CLICK, this, this.onClickHideModel);
            this.clearModel();
            this.removeModelEff();
            clearTimeout(this._efftag);
            this.clearCardModel();
            // this.ani_item.stop();
            // this.ani_item2.stop();
            // this.box_ten.array = null;
            // this.box_ten.selectedIndex = -1;
        };
        return ZhaohuanResultView;
    }(ui.zhaohuan.ResultUI));
    game.ZhaohuanResultView = ZhaohuanResultView;
})(game || (game = {}));
