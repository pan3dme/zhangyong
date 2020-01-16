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
    var TujianHeroView = /** @class */ (function (_super) {
        __extends(TujianHeroView, _super);
        function TujianHeroView() {
            var _this = _super.call(this) || this;
            /** 当前排序的英雄数组 */
            _this._arrTotalGods = [];
            /** 当前英雄所在数组索引 */
            _this._curGodsindex = 0;
            _this._pyGodId = 0;
            _this._pySoundUrl = "";
            _this.isModelClose = true;
            return _this;
        }
        TujianHeroView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.lab_name, this.lbType);
            this.skillList.array = null;
            this.skillList.mouseHandler = new Handler(this, this.onSkillClick);
            this.skillBox.visible = false;
            this.skillBox.dataSource = null;
            this.ui_star.starAlign = common.GodStarInfo.STAR_ALIGN_LEFT;
            this.btn_peiyin.on(Laya.Event.CLICK, this, this.onClickPeiYin);
            this.btn_lihui.on(Laya.Event.CLICK, this, this.onClickLiHui);
            this.btnZiliao.on(Laya.Event.CLICK, this, this.onLookInfo);
        };
        TujianHeroView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        TujianHeroView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        TujianHeroView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            this.uiScene.onExit();
            this._lastmodel = null;
            this.skillList.array = null;
            this.skillBox.visible = false;
            this.skillBox.dataSource = null;
            this._arrTotalGods = [];
            Laya.timer.clearAll(this);
            Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
        };
        TujianHeroView.prototype.init = function () {
            //监听
            this.btnPrev.on(Laya.Event.CLICK, this, this.onLeft);
            this.btnNext.on(Laya.Event.CLICK, this, this.onRight);
            this.btnClose.on(Laya.Event.CLICK, this, this.onFanHui);
            this.btnSkin.on(Laya.Event.CLICK, this, this.onSkin);
            Laya.stage.on(Laya.Event.CLICK, this, this.onClickStage);
            //模型界面开启
            this.uiScene.onShow();
            //3帧后更新
            this._curGodsindex = this.dataSource[0]; //图鉴数组计数
            this._arrTotalGods = this.dataSource[1]; //图鉴当前数组
            Laya.timer.frameOnce(3, this, this.updatedata, [this._curGodsindex, this._arrTotalGods]);
        };
        TujianHeroView.prototype.onLookInfo = function () {
            var tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
            if (!tbGod)
                return;
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_EVALUATION_PANEL), tbGod);
        };
        //配音和立绘
        TujianHeroView.prototype.onClickLiHui = function () {
            var tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
            if (!tbGod)
                return;
            if (tbGod && tbGod.paint != 0)
                UIMgr.showUI(UIConst.GodLiHuiView, tbGod);
        };
        TujianHeroView.prototype.onClickPeiYin = function () {
            var tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
            if (tbGod) {
                this.playPySound(tbGod.ID, "", true);
                if (this.uiScene.sceneChar) {
                    this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
                }
            }
        };
        /**更新英雄详细界面数据 */
        TujianHeroView.prototype.updatedata = function (index, array) {
            this.skillBox.visible = false;
            this.skillBox.dataSource = null;
            this._curGodsindex = index; //图鉴数组计数
            this._arrTotalGods = array; //图鉴当前数组
            //获得当前所选择的神灵
            var tbGod = array[index].godTemp;
            if (!tbGod)
                return;
            this.btn_lihui.visible = tbGod.paint > 0;
            this.lbDesc.text = "        " + tbGod.desc;
            this.imgRace.skin = SkinUtil.getGodBigRaceSkin(tbGod.race_type);
            var godLv = tb.TB_god_evolution.get_TB_god_evolutionById(array[index].starLv).level;
            this.lab_name.text = "Lv." + godLv + "  " + tbGod.name;
            this.lab_name.event(Laya.Event.RESIZE);
            this.lbType.text = LanMgr.godTypeName[tbGod.type];
            // 称谓及星级
            var star = array[index].starLv;
            this.ui_star.starLevel = star;
            this.ui_star.x = this.width / 2 - this.ui_star.getTotalStarWidth() / 2;
            var tempStararry = new Array;
            this.refreshModel(tbGod.model);
            this.btnPrev.gray = index == 0;
            this.btnNext.gray = index >= array.length - 1;
            this.playPySound(tbGod.ID);
            // 技能
            var ary = tbGod.getAllSkill(star, star);
            var list = [];
            for (var i in ary) {
                if (ary[i].type != 1) {
                    var openDgLv = tbGod.getSkillOpenDgLv(ary[i].ID) || 0;
                    list.push({ skill: ary[i], godId: tbGod.ID, openDgLv: openDgLv, dgLv: 10, index: i });
                }
            }
            this.skillList.array = list;
            //居中
            this.skillList.y = 148 + (4 - this.skillList.array.length) * 109 / 2;
        };
        TujianHeroView.prototype.onSkin = function () {
            var tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
            if (tbGod) {
                UIMgr.getInstance().showUI(UIConst.GodSkinView, [tbGod]);
            }
        };
        /** 点击技能 */
        TujianHeroView.prototype.onSkillClick = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var iRender = this.skillList.getCell(index);
                if (iRender && iRender.dataSource) {
                    this.skillBox.dataSource = iRender.dataSource;
                    this.skillBox.y = this.skillList.y + 48 + index * 96 + this.skillList.spaceY;
                    this.skillBox.visible = true;
                }
                else {
                    this.skillBox.dataSource = null;
                    this.skillBox.visible = false;
                }
            }
            else if (event.type == Laya.Event.MOUSE_UP || event.type == Laya.Event.MOUSE_OUT) {
                // this.skillBox.dataSource = null;
                // this.skillBox.visible = false;
            }
        };
        TujianHeroView.prototype.onClickStage = function (e) {
            if (e.target instanceof game.GodSkillItemIR)
                return;
            this.skillBox.dataSource = null;
            this.skillBox.visible = false;
        };
        /**
         * 刷新模型id
         * @param modeid 模型id
         */
        TujianHeroView.prototype.refreshModel = function (modeid) {
            if (this._lastmodel == modeid) {
                return;
            }
            this.uiScene.addModelChar(modeid, 360, 710, 180, 3);
            this._lastmodel = modeid;
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
        };
        TujianHeroView.prototype.playPySound = function (godid, url, force) {
            if (url === void 0) { url = ""; }
            if (force === void 0) { force = true; }
            if (!force && this._pyGodId == godid)
                return;
            this.stopPySound();
            this._pyGodId = godid;
            var filetype = Laya.Render.isConchApp ? "ogg" : "mp3";
            url = LanMgr.getLan("sound/god_peiyin/{0}/voice_{1}_dub.{2}", -1, filetype, godid, filetype);
            this._pySoundUrl = !url || url == "" ? "sound/godpeiyin.mp3" : url;
            AudioMgr.playSound(this._pySoundUrl);
        };
        TujianHeroView.prototype.stopPySound = function (godid) {
            if (godid === void 0) { godid = 0; }
            if (godid == 0 || this._pyGodId == godid) {
                AudioMgr.StopSound(this._pySoundUrl);
                this._pyGodId = 0;
            }
        };
        /**评价 */
        TujianHeroView.prototype.Showpingjia = function () {
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_EVALUATION_PANEL), this._arrTotalGods[this._curGodsindex].godTemp);
        };
        TujianHeroView.prototype.onLeft = function () {
            if (this.btnPrev.gray)
                return;
            game.TujianModel.getInstance().index--;
            this.updatedata(game.TujianModel.getInstance().index, this._arrTotalGods);
        };
        TujianHeroView.prototype.onRight = function () {
            if (this.btnNext.gray)
                return;
            game.TujianModel.getInstance().index++;
            this.updatedata(game.TujianModel.getInstance().index, this._arrTotalGods);
        };
        TujianHeroView.prototype.onFanHui = function () {
            this.close();
        };
        return TujianHeroView;
    }(ui.tujian.TujianHeroUI));
    game.TujianHeroView = TujianHeroView;
})(game || (game = {}));
