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
    var GuaJiRewardView = /** @class */ (function (_super) {
        __extends(GuaJiRewardView, _super);
        function GuaJiRewardView() {
            var _this = _super.call(this) || this;
            //更新boss
            _this._BossModelInfo = {
                20004: [370, 650, 1.4, 500],
                20028: [370, 600, 0.7, 500],
                20024: [370, 700, 1.5, 300],
                20027: [370, 650, 0.7, 400],
                20002: [370, 650, 1.4, 400],
                20011: [370, 600, 0.6, 400],
                20005: [370, 750, 1.4, 400],
                20026: [370, 650, 0.7, 400],
                20036: [370, 800, 1.4, 340],
                20035: [370, 800, 1.4, 260],
                20006: [370, 800, 1.2, 500],
                20029: [370, 650, 1.2, 500],
                20034: [370, 800, 1.4, 300],
                20030: [370, 650, 0.7, 570],
                20025: [370, 900, 1.2, 240],
                20033: [370, 600, 0.7, 500],
            };
            _this.isModelClose = true;
            _this.uiPanel.dataSource = { uiName: UIConst.Lilian_RewardView, closeOnSide: _this.isModelClose, title: "通关奖励" };
            _this._uiScene = new Base2dSceneLayer();
            _this.box_scene.addChild(_this._uiScene);
            return _this;
        }
        /** 界面移除 */
        GuaJiRewardView.prototype.close = function () {
            _super.prototype.close.call(this);
            tl3d.ModuleEventManager.removeEvent(game.GuajiEvent.FUBEN_REWARD_CHANGE, this.updateView, this);
            tl3d.ModuleEventManager.removeEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.updateBtn, this);
            this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
            this.list.array = null;
            this._curTask = null;
            this._uiScene.onExit();
        };
        GuaJiRewardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuaJiRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 初始化界面 */
        GuaJiRewardView.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.GuajiEvent.FUBEN_REWARD_CHANGE, this.updateView, this);
            tl3d.ModuleEventManager.addEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.updateBtn, this);
            this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive);
            this._uiScene.onShow();
            this.updateView();
        };
        GuaJiRewardView.prototype.updateView = function () {
            var vo = null;
            if (this.dataSource) {
                vo = tb.TB_checkpoint_pass.getTabByTaskId(this.dataSource);
            }
            else {
                vo = this.getCurTaskVo();
            }
            if (vo && (this._curTask != vo || vo.ID == 60)) {
                this._curTask = vo;
                this._curCopyInfo = tb.TB_copy_info.get_TB_copy_infoById(vo.para);
                this._curBossTemp = this.getBoss(this._curCopyInfo);
                this.lab_desc.text = this._curTask.desc;
                this.updateReward();
                this.updateBtn();
                this.updateBoss();
            }
        };
        GuaJiRewardView.prototype.getCurTaskVo = function () {
            var data = TableData.getInstance().getTableByName(TableData.tb_checkpoint_pass).data;
            var lastkey;
            for (var key in data) {
                var id = data[key].ID;
                if (App.hero.mapBoxAwardIds.indexOf(id) == -1) {
                    return data[key];
                }
                lastkey = key;
            }
            return data[lastkey];
        };
        //获取boss
        GuaJiRewardView.prototype.getBoss = function (vo) {
            if (!vo)
                return null;
            var monsterTemps = vo.getMonsters();
            if (monsterTemps) {
                for (var i = 0; i < monsterTemps.length; i++) {
                    if (monsterTemps[i].type == 1 || monsterTemps[i].type == 2)
                        return monsterTemps[i];
                }
            }
            return null;
        };
        GuaJiRewardView.prototype.updateReward = function () {
            if (this._curTask) {
                this.list.array = ary2prop(this._curTask.reward);
                //布局
                var num = this.list.array ? this.list.array.length : 0;
                this.list.width = num * 100 + 10.5;
                var posx = (this.width - this.list.width) / 2;
                this.list.x = posx;
            }
            else {
                this.list.array = null;
            }
        };
        GuaJiRewardView.prototype.updateBtn = function () {
            this.btn_receive.visible = false;
            this.img_hasReceive.visible = false;
            this.lab_title.text = "";
            this.lab_cha.text = "";
            if (this._curTask) {
                this.lab_title.text = "" + this._curTask.name;
                if (App.hero.mapBoxAwardIds.indexOf(this._curTask.ID) != -1) {
                    this.img_hasReceive.visible = true;
                }
                else if (App.hero.isPassRuneCopyInfo(this._curCopyInfo.ID, this._curCopyInfo.getChapter())) {
                    this.btn_receive.visible = true;
                    this.btn_receive.label = LanMgr.getLan('', 10041);
                    this.btn_receive.disabled = false;
                    this.btn_receive.skin = SkinUtil.buttonGreen;
                    this.btn_receive.labelStrokeColor = ColorConst.GREEN_FILTER;
                }
                else {
                    var curzhangjie = game.GuajiModel.getInstance().getZhangjie(App.hero.copyUnlockId);
                    var curGuan = curzhangjie.getCurGuanqia();
                    var copyinfo = tb.TB_copy_info.get_TB_copy_infoById(this._curTask.para);
                    if (curGuan.tbCopyInfo.area_number == copyinfo.area_number) {
                        this.btn_receive.visible = true;
                        this.btn_receive.label = LanMgr.getLan('击杀', -1);
                        this.btn_receive.disabled = false;
                        this.btn_receive.skin = SkinUtil.buttonNormal;
                        this.btn_receive.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    }
                    else {
                        var num = copyinfo.area_number - curGuan.tbCopyInfo.area_number;
                        if (num < 0)
                            num += 10;
                        this.lab_cha.text = LanMgr.getLan("{0}关后可击杀", -1, num);
                        this.btn_receive.label = LanMgr.getLan('', 10045);
                        this.btn_receive.disabled = true;
                        this.btn_receive.skin = SkinUtil.buttonNormal;
                        this.btn_receive.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    }
                }
            }
        };
        GuaJiRewardView.prototype.updateBoss = function () {
            var _this = this;
            if (this._curBossTemp) {
                this.lab_boss_lv.text = LanMgr.getLan("LV.{0}", -1, this._curBossTemp.level);
                this.lab_boss_name.text = this._curBossTemp.name;
                //布局
                var allw = this.lab_boss_lv.width + this.lab_boss_name.width + 5;
                var labPosx = (this.width - allw) / 2;
                this.lab_boss_name.x = labPosx;
                this.lab_boss_lv.x = labPosx + this.lab_boss_name.width + 5;
                var modelid = this._curBossTemp.model.toString();
                var scale = this._curBossTemp.model_multiple * 0.7;
                var posx = 370;
                var posy = 650;
                var maskw = 300;
                if (this._BossModelInfo[modelid]) {
                    var info = this._BossModelInfo[modelid];
                    posx = info[0];
                    posy = info[1];
                    scale = info[2] * this._curBossTemp.model_multiple;
                    maskw = info[3];
                }
                this.img_mask.width = maskw;
                this.img_mask.centerX = modelid == "20036" ? -50 : 0;
                this._uiScene.addModelChar(modelid, posx, posy + 80, 180, scale);
                this.timer.once(500, this, function () {
                    if (_this._uiScene && _this._uiScene.sceneChar) {
                        _this._uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
                    }
                });
            }
            else {
                this.lab_boss_lv.text = "";
                this.lab_boss_name.text = "";
            }
        };
        GuaJiRewardView.prototype.onClickReceive = function () {
            if (!this._curTask)
                return;
            if (this.btn_receive.label == '击杀') {
                var model = game.GuajiModel.getInstance();
                var zhangjievo = model.getZhangjie(this._curCopyInfo.area);
                model.currentZhangjie = zhangjievo;
                if (this._curCopyInfo.is_enter) {
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.ENTER_FIGHT_EVENT), this._curCopyInfo.ID);
                }
                else {
                    UIMgr.showUI(UIConst.GuajiView);
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.UPDATE_ZHANGJIE_EVENT));
                }
                this.close();
                return;
            }
            // dispatchEvt(new TaskEvent(TaskEvent.RECEIVE_TASK_REWARD,this._curTask));
            var args = {};
            args[Protocol.game_copy_getMapBoxAward.args.id] = this._curTask.ID;
            PLC.request(Protocol.game_copy_getMapBoxAward, args, function ($data) {
                if (!$data)
                    return;
                if ($data && $data.commonData) {
                    UIUtil.showRewardView($data.commonData);
                }
                dispatchEvt(new game.TaskEvent(game.TaskEvent.REWARD_TASK_SUCCESS));
            });
        };
        return GuaJiRewardView;
    }(ui.guaji.GuaJiRewardUI));
    game.GuaJiRewardView = GuaJiRewardView;
})(game || (game = {}));
