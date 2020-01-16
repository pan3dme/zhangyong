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
    var IGodModelVo = /** @class */ (function () {
        function IGodModelVo() {
        }
        return IGodModelVo;
    }());
    game.IGodModelVo = IGodModelVo;
    var TabChangeModelView = /** @class */ (function (_super) {
        __extends(TabChangeModelView, _super);
        function TabChangeModelView() {
            return _super.call(this) || this;
        }
        TabChangeModelView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.listBtn.selectedIndex = -1;
            this.listBtn.selectHandler = new Handler(this, this.onSelectTab);
            this.listBtn.renderHandler = new Handler(this, this.onRenderTab);
            this.listBtn.array = ["初始", "觉醒", "时装"];
            this.listGod.array = null;
            this.listGod.selectedIndex = -1;
            this.listGod.selectHandler = new Handler(this, this.onSelectGod);
            this.listGod.renderHandler = new Handler(this, this.onRenderGod);
            this._uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this._uiScene);
            this._uiScene.setModelBox(this, this.lbName, this.boxRole);
            this.btnSure.on(Laya.Event.CLICK, this, this.onSure);
        };
        TabChangeModelView.prototype.close = function () {
            // super.close();
            this.listBtn.selectedIndex = -1;
            this.listGod.selectedIndex = -1;
            this.listGod.array = null;
            this._curSelectVo = null;
            Laya.timer.clearAll(this);
            this._uiScene.onExit();
        };
        TabChangeModelView.prototype.show = function () {
            // super.show();
            this.initView();
        };
        TabChangeModelView.prototype.initView = function () {
            if (!this._isInit) {
                this._isInit = true;
                this._originList = [];
                this._awakenList = [];
                this._skinList = [];
                var gods = tb.TB_god.get_TB_god();
                for (var _i = 0, gods_1 = gods; _i < gods_1.length; _i++) {
                    var tbGod = gods_1[_i];
                    var skinList = tbGod.getSkinList();
                    for (var _a = 0, skinList_1 = skinList; _a < skinList_1.length; _a++) {
                        var skinVo = skinList_1[_a];
                        if (skinVo.skinId == game.GodSkinType.origin) {
                            this._originList.push({ tbGod: tbGod, skinVo: skinVo });
                        }
                        else if (skinVo.skinId == game.GodSkinType.awaken) {
                            if (tbGod.isCanAwaken()) {
                                this._awakenList.push({ tbGod: tbGod, skinVo: skinVo });
                            }
                        }
                        else if (skinVo.isSpecialSkin()) {
                            this._skinList.push({ tbGod: tbGod, skinVo: skinVo });
                        }
                    }
                }
            }
            // 默认模型排序 按已解锁和未解锁排序
            this._originList.forEach(function (a, index) {
                a.sortNum = game.GodUtils.isActiveGod(a.tbGod.ID) ? (a.tbGod.ID - 1000000) : a.tbGod.ID;
            });
            this._originList.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            // 觉醒模型排序
            this._awakenList.forEach(function (a, index) {
                var isAwaken = App.hero.godAwakens.indexOf(a.tbGod.ID) != -1;
                a.sortNum = isAwaken ? (a.tbGod.ID - 1000000) : a.tbGod.ID;
            });
            this._awakenList.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            // 特殊时装排序
            this._skinList.forEach(function (a, index) {
                var isActivity = a.skinVo.isActivity(0, false) || a.skinVo.isCanActivity();
                a.sortNum = isActivity ? (a.tbGod.ID - 1000000) : a.tbGod.ID;
            });
            this._skinList.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            this._uiScene.onShow();
            // 选中已选模型tab
            var index = App.hero.showSkinId == game.GodSkinType.origin ? 0 : (App.hero.showSkinId == game.GodSkinType.awaken ? 1 : 2);
            this.listBtn.selectedIndex = index;
        };
        /** 选择标签页 */
        TabChangeModelView.prototype.onSelectTab = function (index) {
            if (index < 0)
                return;
            var list = index == 0 ? this._originList : (index == 1 ? this._awakenList : this._skinList);
            this.listGod.array = list;
            // 清除选中标识,不然会出现不能选同一个index
            this.listGod.selectedIndex = -1;
            // 打开界面默认选择当前展示模型
            if (!this._curSelectVo) {
                var selectedIndex = list.findIndex(function (vo) {
                    return vo.tbGod.ID == App.hero.showGodId && vo.skinVo.skinId == App.hero.showSkinId;
                });
                selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
                this._curSelectVo = list[selectedIndex];
                this.listGod.selectedIndex = selectedIndex;
            }
        };
        TabChangeModelView.prototype.onRenderTab = function (itemRender, index) {
            if (itemRender.dataSource) {
                itemRender.label = itemRender.dataSource;
                itemRender.skin = this.listBtn.selectedIndex == index ? SkinUtil.fenye_down : SkinUtil.fenye_up;
                itemRender.labelSize = this.listBtn.selectedIndex == index ? 24 : 22;
                itemRender.labelColors = this.listBtn.selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
                itemRender.labelBold = true;
            }
        };
        /** 选中 */
        TabChangeModelView.prototype.onSelectGod = function (index) {
            if (index < 0)
                return;
            // 模型
            var showVo = this.listGod.array[index];
            if (!showVo)
                return;
            this._curSelectVo = showVo;
            var tbGod = showVo.tbGod;
            var skinVo = showVo.skinVo;
            this.lbName.text = skinVo.getTitle();
            this.lbUnlock.text = skinVo.getCondition(false);
            var isAwaken = App.hero.godAwakens.indexOf(tbGod.ID) != -1;
            var isActivity = skinVo.isActivity(isAwaken ? tb.TB_god_set.get_TB_god_set().awake_section : 0, false);
            this.lbUnlock.color = isActivity ? ColorConst.GREEN : ColorConst.RED;
            this.btnSure.gray = !isActivity;
            this.btnSure.label = isActivity ? "更 换" : "未获得";
            this._uiScene.onShow();
            Laya.timer.once(300, this, this.delayShow, [skinVo.getModelId()]);
        };
        TabChangeModelView.prototype.onRenderGod = function (itemRender, index) {
            var showVo = itemRender.dataSource;
            if (showVo) {
                var tbGod = showVo.tbGod;
                var skinVo = showVo.skinVo;
                var imgSelected = itemRender.getChildByName("imgSelected");
                var imgIcon = itemRender.getChildByName("imgIcon");
                var imgZhezhao = itemRender.getChildByName("imgZhezhao");
                var imgDi = itemRender.getChildByName("imgDi");
                var imgGou = itemRender.getChildByName("imgGou");
                var lbDi = itemRender.getChildByName("lbDi");
                var lbName = itemRender.getChildByName("lbName");
                imgSelected.visible = showVo == this._curSelectVo;
                imgZhezhao.visible = imgGou.visible = tbGod.ID == App.hero.showGodId && skinVo.skinId == App.hero.showSkinId;
                imgIcon.skin = SkinUtil.getHeroIcon(tbGod.ID);
                lbName.text = skinVo.getName2();
                var isAwaken = App.hero.godAwakens.indexOf(tbGod.ID) != -1;
                var isActivity = skinVo.isActivity(isAwaken ? tb.TB_god_set.get_TB_god_set().awake_section : 0, false);
                imgDi.gray = imgIcon.gray = lbDi.gray = lbName.gray = !isActivity;
                if (!imgIcon.mask) {
                    UIUtil.createHeadMask(imgIcon, imgIcon.width / 2);
                }
                if (!imgZhezhao.mask) {
                    UIUtil.createHeadMask(imgZhezhao, imgZhezhao.width / 2);
                }
            }
            else {
            }
        };
        TabChangeModelView.prototype.onSure = function () {
            var _this = this;
            if (!this._curSelectVo)
                return;
            var tbGod = this._curSelectVo.tbGod;
            var skinVo = this._curSelectVo.skinVo;
            var isAwaken = App.hero.godAwakens.indexOf(tbGod.ID) != -1;
            var isActivity = skinVo.isActivity(isAwaken ? tb.TB_god_set.get_TB_god_set().awake_section : 0, false);
            if (App.hero.showGodId == tbGod.ID && skinVo.skinId == App.hero.showSkinId) {
                showToast(LanMgr.getLan("", 10433));
                return;
            }
            if (!isActivity) {
                showToast(LanMgr.getLan("", 10434));
                return;
            }
            var args = {};
            args[Protocol.game_common_setPlayerShow.args.godId] = tbGod.ID;
            args[Protocol.game_common_setPlayerShow.args.skinId] = skinVo.skinId;
            PLC.request(Protocol.game_common_setPlayerShow, args, function ($data, $msg) {
                if ($data) {
                    showToast(LanMgr.getLan("", 10435));
                    App.hero.showGodId = Number($data.showGodId);
                    App.hero.showSkinId = Number($data.showSkinId);
                    _this.listGod.refresh();
                    dispatchEvt(new game.HudEvent(game.HudEvent.SET_SHOW_GOD_MODEL));
                }
            });
        };
        /** 延迟展示模型（延迟主要为了定位） */
        TabChangeModelView.prototype.delayShow = function (modeid) {
            var point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            this._uiScene.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, point.y - Launch.offsetY, 180, 2.7);
            // this._uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        return TabChangeModelView;
    }(ui.hud.player.TabChangeHeroicModelUI));
    game.TabChangeModelView = TabChangeModelView;
})(game || (game = {}));
