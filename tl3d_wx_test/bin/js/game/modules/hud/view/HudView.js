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
/**Created by the LayaAirIDE*/
var game;
(function (game) {
    var HudItemVo = /** @class */ (function () {
        function HudItemVo() {
        }
        return HudItemVo;
    }());
    game.HudItemVo = HudItemVo;
    var Event = Laya.Event;
    var HudView = /** @class */ (function (_super) {
        __extends(HudView, _super);
        function HudView() {
            var _this = _super.call(this) || this;
            _this._ui = UIMgr.getInstance();
            /** 一级界面跳转过去，返回时回到上一个一级界面 */
            _this._returnUIlist = [UIConst.GuajiView, UIConst.God_MainView, UIConst.Main3DView];
            /** 打开一级界面时，隐藏hudView的玩家信息ui */
            _this._uiNameList = [UIConst.God_MainView, UIConst.EquipView, UIConst.ArtifactView];
            _this.mouseThrough = true;
            _this.btn_main.on(Laya.Event.CLICK, _this, _this.on3DMain);
            _this.btn_shenqi.on(Laya.Event.CLICK, _this, _this.onShenqi, [0, 0]);
            _this.btn_fight.on(Laya.Event.CLICK, _this, _this.onFight);
            _this.btn_god.on(Laya.Event.CLICK, _this, _this.onShenling, [-1]);
            _this.btn_equip.on(Laya.Event.CLICK, _this, _this.onEquip, [-1]);
            _this.btn_bag.on(Laya.Event.CLICK, _this, _this.onBag, [-1]);
            _this.btn_add_zuanshi.on(Laya.Event.CLICK, _this, _this.recharge);
            _this.btn_addgold.on(Laya.Event.CLICK, _this, _this.exchangeGold);
            _this.img_icon.on(Laya.Event.CLICK, _this, _this.onDetails);
            _this.box_vip.on(Laya.Event.CLICK, _this, _this.onVip);
            _this.btn_chat.on(Event.MOUSE_DOWN, _this, _this.onChat);
            _this.btn_chat.on(Event.MOUSE_UP, _this, _this.onChatUp);
            _this.btnPrivateChat.on(Laya.Event.CLICK, _this, _this.onShowPriChat);
            tl3d.ModuleEventManager.addEvent(game.ChatEvent.UPDATE_PRIVATE_CHAT, _this.updatePrivateChat, _this);
            _this._arrBtn = [_this.btn_main, _this.btn_god, _this.btn_equip, _this.btn_shenqi, _this.btn_bag, _this.btn_fight];
            UIUtil.createHeadMask(_this.img_icon, _this.img_icon.width / 2);
            _this.frameOnce(2, _this, function () {
                _this.img_select.x = _this.vbox_funs.x + _this.img0.x + ((_this.img0.width - _this.img_select.width) >> 1);
            });
            return _this;
        }
        /** hud屏幕适配 */
        HudView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            // 顶部
            this.box_top.width = w;
            this.box_top.height = GameUtil.isFullScreen() ? (123 + game.HudModel.TOP_ADD_HEIGHT) : 123;
            var helf = Launch.offsetX >> 1;
            this.vbox.space = 25 + helf;
            // 底部
            if (helf <= 60) {
                this.vbox_funs.space = 20 + helf / 2;
            }
            else {
                this.vbox_funs.space = 50;
            }
            this.img_bottom.width = w;
            this._chatPos = new Laya.Point(-1, -1);
            this._chatRect = new Laya.Rectangle(0, 0, w - 64, h - 64);
        };
        /** 设置visible */
        HudView.prototype.setVisible = function (show) {
            var oldVis = this.visible;
            this.visible = show;
            if (!show) {
                this.box_top.visible = false;
            }
            else {
                this.updatePrivateChat();
            }
        };
        /** 更新经验 */
        HudView.prototype.updateExp = function () {
            var roletab = tb.TB_role.get_TB_rolenById(App.hero.level);
            var tmpexp = App.hero.exp;
            var expvalue = 1;
            if (roletab.exp != 0) {
                expvalue = tmpexp / roletab.exp;
            }
            this.pro_exp.value = expvalue;
        };
        HudView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.onStageResize();
            this.setName();
            this.setHead();
            this.setHeadFrame();
            this.initView();
            this.updatePower(true);
            App.enterGame = true;
            this.updateShenjieRedpt();
            if (!UIMgr.hasStage(UIConst.SysTopView)) {
                this.visible = true;
            }
            this.startTopTween();
            this.updatePrivateChat();
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateExp, this);
            this.updateExp();
        };
        HudView.prototype.close = function () {
            _super.prototype.close.call(this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateExp, this);
        };
        HudView.prototype.getBtnPos = function (btn) {
            return btn.localToGlobal(new Laya.Point(10, 10));
        };
        HudView.prototype.setName = function () {
            this.lbl_name.text = App.hero.name.length > 12 ? LanMgr.getLan("", 12211) : App.hero.name;
        };
        //设置头像
        HudView.prototype.setHead = function () {
            this.img_icon.skin = App.hero.headIcon;
        };
        HudView.prototype.setHeadFrame = function () {
            this.imgHeadFrame.visible = App.hero.headFrame > 0;
            if (this.imgHeadFrame.visible) {
                this.imgHeadFrame.skin = SkinUtil.getHeadFrame(App.hero.headFrame);
            }
        };
        /**打开充值界面 */
        HudView.prototype.recharge = function () {
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
        };
        /**打开VIP特权界面*/
        HudView.prototype.onVip = function () {
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL), [1]);
        };
        /** 交换金币 */
        HudView.prototype.exchangeGold = function () {
            UIMgr.showUI(UIConst.ExchangeGoldView);
        };
        /**
         * 初始化界面信息
         */
        HudView.prototype.initView = function () {
            this.lab_money.text = Snums(App.hero.gold);
            this.lab_zuanshi.text = Snums(App.hero.diamond);
            this.lbl_level.text = App.hero.level.toString();
            this.setVip();
        };
        /** 更新战斗力 */
        HudView.prototype.updatePower = function ($init) {
            if ($init === void 0) { $init = false; }
            if ($init) {
                this.clip_xp.dataSource = App.hero.force;
                this.clip_xp.value = String(App.hero.force);
            }
            else {
                var newforce = App.hero.force;
                var oldforce = Number(this.clip_xp.dataSource);
                if (newforce == oldforce)
                    return;
                UIUtil.upPowerEff(oldforce, newforce);
                this.clip_xp.value = String(newforce);
                this.clip_xp.dataSource = newforce;
            }
        };
        //打开聊天
        HudView.prototype.onChat = function () {
            if (!game.GuideManager.isExecuteGuide()) {
                this.btn_chat.startDrag(this._chatRect);
            }
            Laya.Tween.clearAll(this.btn_chat);
            Laya.Tween.to(this.btn_chat, { alpha: 1 }, 500);
        };
        HudView.prototype.onChatUp = function () {
            var _this = this;
            setTimeout(function () {
                Laya.Tween.clearAll(_this.btn_chat);
                Laya.Tween.to(_this.btn_chat, { alpha: 0.65 }, 500);
            }, 3000);
            //没有拖动就是点击
            if ((this._chatPos.x == -1) || (this.btn_chat.x - this._chatPos.x === 0 && this.btn_chat.y - this._chatPos.y === 0)) {
                dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_CHAT_PANEL), [game.OpenType.common, iface.tb_prop.chatChannelTypeKey.all]);
            }
            this._chatPos.x = this.btn_chat.x;
            this._chatPos.y = this.btn_chat.y;
            this.btn_chat.stopDrag();
        };
        HudView.prototype.onDetails = function (e) {
            this._ui.showUI(UIConst.PlayerDetailsView);
        };
        HudView.prototype.setVip = function () {
            this.lbl_vip.value = App.hero.vip ? "V" + App.hero.vip.toString() : "V0";
        };
        HudView.prototype.on3DMain = function () {
            var _this = this;
            this.openAlert().then(function () {
                if (!UIMgr.hasStage(UIConst.Main3DView)) {
                    UIMgr.showUI(UIConst.Main3DView);
                }
                _this.img_select.x = _this.vbox_funs.x + _this.img0.x + ((_this.img0.width - _this.img_select.width) >> 1);
                // this.img_select.x = 32;
            });
        };
        /** 打开前的确认 */
        HudView.prototype.openAlert = function () {
            return game.GodDmThread.getInstance().leaveViewAlert();
        };
        //战斗
        HudView.prototype.onFight = function () {
            var _this = this;
            if (game.GodUtils.getGodsNum() <= 0) {
                showToast(LanMgr.getLan('', 10017));
                return;
            }
            this.openAlert().then(function () {
                _this.img_select.x = _this.vbox_funs.x + _this.img5.x + ((_this.img5.width - _this.img_select.width) >> 1);
                // this.img_select.x = 604;
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SHOW_GUAJI_PANEL));
            });
        };
        //英雄
        HudView.prototype.onShenling = function (tabIndex) {
            var _this = this;
            if (tabIndex === void 0) { tabIndex = -1; }
            if (game.GodUtils.getGodsNum() <= 0) {
                showToast(LanMgr.getLan('', 10017));
                return;
            }
            this.openAlert().then(function () {
                _this.img_select.x = _this.vbox_funs.x + _this.img1.x + ((_this.img1.width - _this.img_select.width) >> 1);
                // this.img_select.x = 154;
                dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_SHENGLING_PANEL), [-1, tabIndex]);
            });
        };
        // 装备
        HudView.prototype.onEquip = function (tabIndex) {
            var _this = this;
            if (tabIndex === void 0) { tabIndex = -1; }
            if (game.GodUtils.getGodsNum() <= 0) {
                showToast(LanMgr.getLan('', 10017));
                return;
            }
            this.openAlert().then(function () {
                _this.img_select.x = _this.vbox_funs.x + _this.img2.x + ((_this.img2.width - _this.img_select.width) >> 1);
                // this.img_select.x = 263;
                dispatchEvt(new game.EquipEvent(game.EquipEvent.SHOW_EQUIP_PANEL), [tabIndex]);
            });
        };
        //背包
        HudView.prototype.onBag = function (tabIndex) {
            var _this = this;
            if (tabIndex === void 0) { tabIndex = -1; }
            this.openAlert().then(function () {
                _this.img_select.x = _this.vbox_funs.x + _this.img4.x + ((_this.img4.width - _this.img_select.width) >> 1);
                // this.img_select.x = 481;
                dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.BEIBAO, tabIndex]);
            });
        };
        //神器
        HudView.prototype.onShenqi = function (index, id) {
            var _this = this;
            if (index === void 0) { index = 0; }
            if (id === void 0) { id = 0; }
            if (!App.IsSysOpen(ModuleConst.ARTIFACT)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.ARTIFACT);
                showToast(tbData.prompt);
                return;
            }
            this.openAlert().then(function () {
                _this.img_select.x = _this.vbox_funs.x + _this.img3.x + ((_this.img3.width - _this.img_select.width) >> 1);
                // this.img_select.x = 372;
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.SHOW_ARTIFACT_PANEL), [index, id]);
            });
        };
        /** 更新神界红点 ： 默认没设置红点名称 -- 通关2-10之后设置红点名称*/
        HudView.prototype.updateShenjieRedpt = function () {
            if ((!this.rpMain.redpointName || this.rpMain.redpointName == "") && game.GuajiModel.getInstance().isPassCopy(common.GlobalData.GUAJI_COPY_2_10)) {
                this.rpMain.setRedPointName("main_group");
            }
        };
        HudView.prototype.onDialogOnClosed = function (dialog) {
            if (this._returnUIlist.indexOf(dialog.name) != -1) {
                this._lastDialog = dialog.name;
            }
            else {
                this._lastDialog = null;
            }
        };
        HudView.prototype.onDialogOnOpened = function (dialog) {
            if (dialog.group == UIConst.hud_group) {
                var oldVisible = this.box_top.visible;
                var isHide = this._uiNameList.indexOf(dialog.name) != -1;
                this.box_top.visible = !isHide;
                if (!oldVisible && !isHide) {
                    this.startTopTween();
                }
                this.btn_chat.visible = [UIConst.Main3DView, UIConst.GuajiView].indexOf(dialog.name) != -1;
                this.updatePrivateChat();
            }
        };
        HudView.prototype.getLastDialog = function () {
            return this._lastDialog;
        };
        HudView.prototype.startTopTween = function () {
            UIUtil.boxUpDownTween(this.box_top, -this.box_top.height, 0, false, 310, 0.05);
        };
        /** 更新私聊按钮的显示 */
        HudView.prototype.updatePrivateChat = function () {
            var isIn = UIMgr.hasStage(UIConst.Main3DView) || UIMgr.hasStage(UIConst.GuajiView);
            if (isIn) {
                this.btnPrivateChat.visible = game.ChatModel.getInstance().hasNewPrivateChat();
            }
            else {
                this.btnPrivateChat.visible = false;
            }
        };
        HudView.prototype.onShowPriChat = function () {
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_PRIVATE_CHAT_VIEW));
        };
        return HudView;
    }(ui.hud.HudBoxUI));
    game.HudView = HudView;
})(game || (game = {}));
