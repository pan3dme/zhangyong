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
    var GuildCopyView = /** @class */ (function (_super) {
        __extends(GuildCopyView, _super);
        function GuildCopyView() {
            var _this = _super.call(this) || this;
            /** 开始的索引 */
            _this._startIdx = 0;
            return _this;
        }
        GuildCopyView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.GuildCopyView, closeOnSide: this.isModelClose, title: "公会副本" };
            this._model = game.GuildCopyModel.getInstance();
            this._itemList = [];
            for (var i = 1; i <= 3; i++) {
                this._itemList.push(this['item' + i]);
            }
            this.uiScene = new Base2dSceneLayer();
            this.topBox.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.topBox, this.lab_name);
            this.bgPanel.box_Content.addChild(this.img_bg);
            this.btnPrev.on(Laya.Event.CLICK, this, this.onClick);
            this.btnNext.on(Laya.Event.CLICK, this, this.onClick);
            this.btnRank.on(Laya.Event.CLICK, this, this.onClick);
            this.btnRule.on(Laya.Event.CLICK, this, this.onClick);
            this.btnReward.on(Laya.Event.CLICK, this, this.onClick);
            this.btnChallenge.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_sweep.on(Laya.Event.CLICK, this, this.onClick);
            this.btnBuy.on(Laya.Event.CLICK, this, this.onClick);
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].on(Laya.Event.CLICK, this, this.onClickGuanqia);
            }
        };
        GuildCopyView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildCopyView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildCopyView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this, type, showEffect, sound);
            this.uiScene.onExit();
            Laya.timer.clear(this, this.delayShow);
            this._curGuanqia = null;
            this._startIdx = 0;
            this._modeid = 0;
        };
        GuildCopyView.prototype.initView = function () {
            this.uiScene.onShow();
            this._startIdx = this._model.getCurCopyIdx();
            this.updateChapterData(this._startIdx);
            this.updateCount();
        };
        GuildCopyView.prototype.updateChapterData = function (startIdx) {
            var allList = this._model.getCopyList();
            var len = allList.length;
            this.btnPrev.disabled = startIdx == 0;
            this.btnNext.disabled = startIdx >= len - 3;
            // 不合法
            if (startIdx < 0 || startIdx > len - 3) {
                return;
            }
            this._startIdx = startIdx;
            var list = allList.slice(startIdx, startIdx + 3);
            // 第一次初始化当前关卡不存在时，查找当前可挑战关卡否则最后一关
            if (!this._curGuanqia) {
                this._curGuanqia = list.find(function (vo) {
                    return vo.isCurrent();
                }) || list[list.length - 1];
            }
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dataSource = list[i];
            }
            if (this._curGuanqia) {
                this.renderGuanqia(this._curGuanqia);
            }
        };
        /** 渲染关卡数据 */
        GuildCopyView.prototype.renderGuanqia = function (guanqia) {
            var _this = this;
            this._curGuanqia = guanqia;
            for (var i = 0; i < this._itemList.length; i++) {
                var itemInfo = this._itemList[i].dataSource;
                this._itemList[i].setSelected(itemInfo == guanqia);
            }
            if (this._curGuanqia && this._curGuanqia.isCurrent()) {
                this.btnChallenge.label = LanMgr.getLan('', 10093);
                this.btn_sweep.visible = true;
                this.btnChallenge.x = 378;
            }
            else {
                this.btnChallenge.label = LanMgr.getLan('', 10094);
                this.btn_sweep.visible = false;
                this.btnChallenge.x = 258;
            }
            if (this._curGuanqia) {
                var monsterT = tb.TB_monster.get_TB_monsterById(this._curGuanqia.tbCopy.getMonterId());
                this.lab_name.text = LanMgr.getLan("{0}Lv{1}", -1, monsterT.name, monsterT.level);
            }
            else {
                this.lab_name.text = "";
            }
            this.btn_sweep.removeChild(this.ui_red_sweep);
            this._curGuanqia && this._curGuanqia.isCurrent() ? this.btnChallenge.addChild(this.btn_red) : this.btnChallenge.removeChild(this.btn_red);
            Laya.timer.once(200, this, this.delayShow.bind(this));
            if (this._curGuanqia.isCurrent()) {
                var info_1 = game.GuildCopyModel.getInstance().copyChallengeVo;
                info_1.setGuanqiaVo(guanqia);
                var arg = {};
                arg[Protocol.guild_guildCopy_copyInfo.args.id] = guanqia.tbCopy.ID;
                PLC.request(Protocol.guild_guildCopy_copyInfo, arg, function ($data) {
                    if ($data) {
                        info_1.setSvo($data);
                        var curBlood = info_1.getMonstersRestBlood();
                        _this.lbBlood.text = curBlood + "/" + info_1.getMonstersBlood();
                        _this.pbBlood.value = curBlood / info_1.getMonstersBlood();
                        // 兼容boss被工会成员打掉
                        var guildInfo = game.GuildModel.getInstance().guildInfo;
                        if (guildInfo && $data.hasOwnProperty("copyId") && $data["copyId"]) {
                            guildInfo.copyId = $data["copyId"];
                        }
                        if (_this._curGuanqia && _this._curGuanqia.isCurrent()) {
                            _this.btnChallenge.label = LanMgr.getLan('', 10093);
                            _this.btn_sweep.visible = true;
                            _this.btnChallenge.x = 378;
                            _this.btnChallenge.addChild(_this.btn_red);
                            if (info_1.isKillMonsters(App.hero.playerId)) {
                                _this.btn_sweep.addChild(_this.ui_red_sweep);
                            }
                            else {
                                _this.btn_sweep.removeChild(_this.ui_red_sweep);
                            }
                        }
                        else {
                            _this.btnChallenge.label = LanMgr.getLan('', 10094);
                            _this.btn_sweep.visible = false;
                            _this.btnChallenge.x = 258;
                            _this.btnChallenge.removeChild(_this.btn_red);
                            _this.btn_sweep.removeChild(_this.ui_red_sweep);
                        }
                    }
                    else {
                        _this.grayGuanqia();
                        // 数据不匹配说明被打了
                        game.GuildModel.getInstance().checkGuildExist(true);
                    }
                });
            }
            else {
                this.grayGuanqia();
            }
        };
        GuildCopyView.prototype.updateGuanQiaInfo = function (guanqia) {
            if (!guanqia || !this._curGuanqia || guanqia.tbCopy.ID != this._curGuanqia.tbCopy.ID)
                return;
            for (var _i = 0, _a = this._itemList; _i < _a.length; _i++) {
                var guanqia_1 = _a[_i];
                guanqia_1.refreshData();
            }
            this.renderGuanqia(guanqia);
            this.updateCount();
        };
        /** 点击关卡 */
        GuildCopyView.prototype.onClickGuanqia = function (event) {
            var itemRender = event.currentTarget;
            var vo = itemRender.dataSource;
            if (!vo.isPass() && !vo.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            this.renderGuanqia(vo);
        };
        /** 按钮点击 */
        GuildCopyView.prototype.onClick = function (event) {
            var target = event.target;
            var modle = game.GuildCopyModel.getInstance();
            switch (target) {
                case this.btnNext:
                    var allList = this._model.getCopyList();
                    if (this._startIdx < allList.length - 3) {
                        this.updateChapterData(this._startIdx + 1);
                    }
                    break;
                case this.btnPrev:
                    if (this._startIdx > 0) {
                        this.updateChapterData(this._startIdx - 1);
                    }
                    break;
                case this.btnRank:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_COPY_RANK, this._curGuanqia));
                    break;
                case this.btnRule:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_COPY_RULE));
                    break;
                case this.btnReward:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_COPY_TONGGUAN_REWARD, this._curGuanqia));
                    break;
                case this.btnBuy:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_CHALLENGE_NUM_BUY));
                    break;
                case this.btnChallenge:
                    if (!this._curGuanqia)
                        return;
                    if (this._curGuanqia.isCurrent()) {
                        var info = modle.copyChallengeVo;
                        if (info.svo) {
                            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUANQIA_FIGHT, modle.copyChallengeVo));
                        }
                    }
                    else {
                        dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_ATKEND_RANK, this._curGuanqia));
                    }
                    break;
                case this.btn_sweep: //扫荡
                    if (!this._curGuanqia)
                        return;
                    if (this._curGuanqia.isCurrent()) {
                        var info = modle.copyChallengeVo;
                        if (info.svo) {
                            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_COPY_SWEEP, info));
                        }
                    }
                    break;
            }
        };
        GuildCopyView.prototype.updateCount = function () {
            this.lbNum.text = LanMgr.getLan('', 10081, " " + App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum));
        };
        GuildCopyView.prototype.grayGuanqia = function () {
            this.lbBlood.text = 0 + "/" + (this._curGuanqia ? this._curGuanqia.monster.getPropValByType(1) : 0);
            this.pbBlood.value = 0;
            this.btnChallenge.label = LanMgr.getLan('', 10094);
            this.btnChallenge.removeChild(this.btn_red);
            this.btn_sweep.removeChild(this.ui_red_sweep);
        };
        GuildCopyView.prototype.delayShow = function () {
            if (!this._curGuanqia || this._curGuanqia.tbCopy.model == this._modeid)
                return;
            var point = this.lab_name.localToGlobal(new Laya.Point(0, 0));
            this._modeid = this._curGuanqia.tbCopy.model;
            this.uiScene.addModelChar(this._modeid + "", point.x + this.lab_name.width / 2 - Launch.offsetX, point.y - 50 - Launch.offsetY, 180, 1.8);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        return GuildCopyView;
    }(ui.guild.copy.GuildCopyUI));
    game.GuildCopyView = GuildCopyView;
})(game || (game = {}));
