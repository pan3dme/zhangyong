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
var common;
(function (common) {
    var CheatView = /** @class */ (function (_super) {
        __extends(CheatView, _super);
        function CheatView() {
            var _this = _super.call(this) || this;
            _this.prevX = 0;
            _this.prevY = 0;
            _this.isModelClose = true;
            _this.chk_cam.on(Laya.Event.CLICK, _this, _this.onCam);
            _this.btn1.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btn2.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btn3.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btn4.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btn5.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnAddGod.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnAddItem.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnAddMail.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnCmd.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnDelItem.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnJishiRef.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnLv.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnPassTower.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnReset.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.btnGuide.on(Laya.Event.CLICK, _this, _this.onGm);
            _this.bgPanel.dataSource = { uiName: UIConst.CheatView, closeOnSide: _this.isModelClose, closeOnButton: true };
            var ary = tb.TB_item.get_TB_item();
            ary = ary.filter(function (item) {
                return item.type != 5 && item.type != 6;
            });
            var labels = [];
            for (var i = 0; i < ary.length; i++) {
                labels.push(ary[i].name);
            }
            _this.itemCombo.labels = labels.join(',');
            _this.itemCombo.selectHandler = new Handler(_this, _this.onSelectItem);
            // this.lbContent.autoSize = true;
            _this.lbContent.on(Laya.Event.MOUSE_DOWN, _this, _this.startScrollText);
            return _this;
        }
        CheatView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        CheatView.prototype.onGm = function (event) {
            var _this = this;
            var target = event.target;
            var content = "";
            var errorMsg = "";
            if (target == this.btn1 || target == this.btn2 || target == this.btn5) {
                content = target.label;
            }
            else if (target == this.btn3 || target == this.btn4) {
                content = target.name;
            }
            else if (target == this.btnAddItem) {
                if (!this.lbAddID.text) {
                    errorMsg = "物品id不能为空";
                }
                else if (!this.lbAddNum.text) {
                    errorMsg = "物品数量不能为空";
                }
                content = "@additem " + this.lbAddID.text + " " + this.lbAddNum.text;
            }
            else if (target == this.btnDelItem) {
                if (!this.lbDelId.text) {
                    errorMsg = "物品id不能为空";
                }
                else if (!this.lbDelNum.text) {
                    errorMsg = "物品数量不能为空";
                }
                content = "@costitem " + this.lbDelId.text + " " + this.lbDelNum.text;
            }
            else if (target == this.btnLv) {
                if (!this.lbLv.text) {
                    errorMsg = "等级不能为空";
                }
                content = "@\u7B49\u7EA7 " + this.lbLv.text;
            }
            else if (target == this.btnAddMail) {
                if (!this.lbMailID.text) {
                    errorMsg = "邮件id不能为空";
                }
                content = "@\u90AE\u4EF6 " + this.lbMailID.text;
            }
            else if (target == this.btnJishiRef) {
                if (!this.lbJishi.text) {
                    errorMsg = "集市刷新时间不能为空";
                }
                content = "@\u96C6\u5E02\u5237\u65B0\u65F6\u95F4 " + this.lbJishi.text;
            }
            else if (target == this.btnAddGod) {
                if (!this.lbGodID.text) {
                    errorMsg = "英雄id不能为空";
                }
                var tbGod = tb.TB_god.get_TB_godById(Number(this.lbGodID.text));
                if (!tbGod) {
                    showToast(LanMgr.getLan('', 10210));
                    return;
                }
                // else if(!this.lbGodQua.text){
                // 	errorMsg = "英雄星级不能为空";
                // }else if(!this.lbGodLv.text){
                // 	errorMsg = "英雄等级不能为空";
                // }
                content = "@addgod " + this.lbGodID.text + " " + this.lbGodQua.text + " " + this.lbGodLv.text;
            }
            else if (target == this.btnPassTower) {
                if (!this.lbTowerId.text) {
                    errorMsg = "副本id不能为空";
                }
                content = "@tower " + this.lbTowerId.text;
            }
            else if (target == this.btnReset) {
                content = "@\u91CD\u7F6E " + this.resetCombo.selectedIndex;
            }
            else if (target == this.btnCmd) {
                content = "" + this.lbCmd.text;
            }
            else if (target == this.btnGuide) {
                var index = this.guideCombo.selectedIndex;
                if (index == 0) {
                    game.GuideManager.allPass();
                }
                else if (index == 1) {
                    game.GuideWeakManager.allPass();
                }
                return;
            }
            if (errorMsg && errorMsg != "") {
                // showToast('gm格式错误：' + errorMsg);
                logdebug('gm格式错误：', content, errorMsg);
                return;
            }
            logdebug('gm命令：', content);
            var arg = {};
            arg[Protocol.game_gm_command.args.content] = content;
            PLC.request(Protocol.game_gm_command, arg, function (res) {
                if (res && res.content) {
                    _this.lbContent.text = res.content;
                    _this.lbContent.event(Laya.Event.RESIZE);
                }
                if (content == "@清空聊天CD") {
                    game.ChatModel.getInstance().clearCdTime();
                }
                if (content == "@center重置 1") {
                    game.GuildHelpModel.getInstance().clearCrossDayData();
                }
                if (content == "@honour 0") {
                    App.hero.copyInfo.honourWarRegTime = 0;
                }
                if (content == "@honour 1") {
                    game.GloryModel.getInstance().testChange();
                }
                if (res && res.roleLevel) {
                    App.hero.level = res.roleLevel;
                    App.hero.exp = 0;
                    dispatchEvt(new game.ResEvent(game.ResEvent.ROLE_LEVEL_CHANGE));
                    dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
                }
                if (res && res.battleReport) {
                    logyhj("开始战斗：", res.battleReport);
                    var copyvo = new game.FightVo();
                    copyvo.copyType = CopyType.test;
                    var page = new game.ServerPage();
                    page.initPage(res.battleReport.reportData);
                    page.result = playState.VICTORY; //左方胜利就为胜
                    copyvo.fightPageControl = page;
                    var enterVo = { vo: copyvo, responseData: res.battleReport.reportData };
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
                }
            });
        };
        CheatView.prototype.onSelectItem = function (index) {
            var label = this.itemCombo.selectedLabel;
            var tbItem = tb.TB_item.get_TB_item("name", label);
            if (tbItem && tbItem.length > 0) {
                this.lbAddID.text = tbItem[0].ID + "";
                this.lbDelId.text = tbItem[0].ID + "";
            }
        };
        /* 开始滚动文本 */
        CheatView.prototype.startScrollText = function (e) {
            this.prevX = this.lbContent.mouseX;
            this.prevY = this.lbContent.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        };
        /* 停止滚动文本 */
        CheatView.prototype.finishScrollText = function (e) {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        };
        /* 鼠标滚动文本 */
        CheatView.prototype.scrollText = function (e) {
            var nowX = this.lbContent.mouseX;
            var nowY = this.lbContent.mouseY;
            this.lbContent.textField.scrollX += this.prevX - nowX;
            this.lbContent.textField.scrollY += this.prevY - nowY;
            this.prevX = nowX;
            this.prevY = nowY;
        };
        //是否显示相机参数
        CheatView.prototype.onCam = function () {
            game.FightView.chkCam = this.chk_cam.selected;
            if (game.FightView.chkCam) {
                ExtConfig.LOG_LEVEL = 999;
            }
        };
        return CheatView;
    }(ui.hud.view.CheatUI));
    common.CheatView = CheatView;
})(common || (common = {}));
