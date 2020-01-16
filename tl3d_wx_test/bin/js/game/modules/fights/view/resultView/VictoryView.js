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
    var VictoryView = /** @class */ (function (_super) {
        __extends(VictoryView, _super);
        function VictoryView() {
            var _this = _super.call(this) || this;
            _this.ary = new Array;
            _this._nextcd = 0;
            _this.closeEffect = null;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this.btn_again.on(Laya.Event.CLICK, _this, _this.onPlay);
            _this.list_item.array = [];
            _this.listVo = new ListVo(_this.list_item);
            _this.listVo.setPosition(_this.list_item.x + Launch.offsetX, 500 + Launch.offsetY);
            return _this;
        }
        VictoryView.prototype.popup = function () {
            // this._isOpen = true;
            this.box_content.visible = false;
            this.bgPanel.showTitle(true, "zhandoubiaoxian/shengli.png", true, true, true, Handler.create(this, this.showTitleComplete));
            var copyvo = this.dataSource.copyVo.vo;
            var $sdata = this.dataSource.vo;
            if (copyvo.copyType == CopyType.teamCopy) {
                if ($sdata && $sdata.extReward)
                    this.ary = $sdata.extReward;
            }
            else {
                if ($sdata && $sdata.commonData)
                    UIUtil.getRewardItemVoList(this.ary, $sdata.commonData);
                if ($sdata && $sdata.firstData)
                    UIUtil.getRewardItemVoList(this.ary, $sdata.firstData, true);
            }
            var hasAward = this.ary.length > 0;
            this.box_title.visible = this.imgXian.visible = hasAward;
            this.lab_empty.visible = !this.box_title.visible;
            if (hasAward) {
                this.btn_close.y = this.btn_again.y = 366;
                this.height = 500;
            }
            else {
                this.btn_close.y = this.btn_again.y = 196;
                this.height = 330;
            }
            this.showbtn(hasAward);
            this.listVo._dataSource = this.list_item.array = this.ary;
            this.list_item.AutoLayout(this.width);
            this.listVo.setHeight(200);
            this.listVo.setPosition(this.list_item.x + (Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2 + this.list_item.y);
            this.listVo._height = this.list_item.height;
            // this._efflist = common.EffectList.showEffectList(this.listVo);
            // this._onceAgain = false;
            this.mouseEnabled = true;
            this.chk_next.on(Laya.Event.CHANGE, this, this.onChkChange);
            _super.prototype.popup.call(this, false, false);
        };
        VictoryView.prototype.showTitleComplete = function () {
            this.box_content.visible = true;
            this._efflist = common.EffectList.showEffectList(this.listVo);
        };
        VictoryView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.again = false;
            AudioMgr.setPlayRate(1);
            AudioMgr.playSound("sound/victory.mp3");
        };
        VictoryView.prototype.showbtn = function (hasAward) {
            if (hasAward === void 0) { hasAward = false; }
            var copyvo = this.dataSource.copyVo.vo;
            this.lab_time.visible = this.lab_txt.visible = copyvo.copyType == iface.tb_prop.copyTypeKey.main;
            var showAgain = [CopyType.teamCopy, iface.tb_prop.copyTypeKey.main, CopyType.jingji_npc, CopyType.qiecuo, CopyType.escort, CopyType.island, CopyType.guildFight].indexOf(copyvo.copyType) == -1;
            this.btn_close.x = !showAgain ? 282 : 174;
            this.btn_again.visible = showAgain;
            this.btn_again.gray = false;
            this.lbDesc.text = "";
            this.chk_next.visible = false;
            switch (copyvo.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                    this.btn_close.x = 282;
                    this.btn_again.visible = false;
                    break;
                case iface.tb_prop.copyTypeKey.underground:
                    this.btn_again.label = LanMgr.getLan("", 12571);
                    break;
                case CopyType.dailycopy:
                    this.btn_close.x = 282;
                    this.btn_again.visible = false;
                    break;
                case iface.tb_prop.copyTypeKey.tower:
                    var tab = tb.TB_copy_info.get_TB_copy_infoById(copyvo.tab_copyinfo.next);
                    this.btn_again.label = LanMgr.getLan("", 12572);
                    if (copyvo.tab_copyinfo.area_number % 10 == 0) {
                        this.btn_close.x = 282;
                        this.btn_again.visible = false;
                    }
                    else
                        this.dataSource.copyVo.vo.tab_copyinfo = tab;
                    break;
                case CopyType.island:
                    this.lbDesc.text = hasAward ? copyvo.islandOreInfo.getFightDesc() : "";
                    break;
                case CopyType.fogForest:
                    //判断是否是最后一关
                    if (copyvo.forestGuanqia.isLast()) {
                        this.btn_close.x = 282;
                        this.btn_again.visible = false;
                    }
                    else {
                        copyvo.forestGuanqia = new game.ForestGuanqiaVo(tb.TB_forest.getItemById(copyvo.forestGuanqia.tbForest.ID + 1));
                        if (App.hero.force >= copyvo.forestGuanqia.tbForest.need_power) {
                            this.chk_next.visible = true;
                            this.chk_next.selected = game.FogForestModel.getInstance().autoNext;
                            this.onChkChange();
                        }
                        this.btn_again.label = LanMgr.getLan("", 12572);
                    }
                    break;
                case CopyType.teamCopy:
                    this.lbDesc.text = (this.dataSource.vo && !this.dataSource.vo.commonData && this.dataSource.vo.extReward) ? LanMgr.getLan('', 10202) : "";
                    break;
                case CopyType.yuanzhenCopy:
                    if (game.YuanzhengModel.getInstance().isAllFinish()) {
                        this.btn_close.x = 282;
                        this.btn_again.visible = false;
                    }
                    else {
                        this.btn_again.visible = true;
                        this.btn_again.label = LanMgr.getLan("", 12572);
                    }
                    break;
                default:
                    this.lbDesc.text = "";
                    this.btn_again.label = LanMgr.getLan("", 12572);
                    break;
            }
            var hh = 500;
            if (!this.lab_time.visible && !this.chk_next.visible && !this.lab_txt.visible) {
                hh = this.btn_again.y + this.btn_again.height + 30;
            }
            else {
                hh = this.chk_next.y + this.chk_next.height + 20;
            }
            this.height = this.bgPanel.height = hh;
            this.bgPanel.bg.height = hh - this.bgPanel.bg.y;
        };
        VictoryView.prototype.onChkChange = function () {
            game.FogForestModel.getInstance().autoNext = this.chk_next.selected;
            if (this.chk_next.selected) {
                this._nextcd = game.FogForestModel.AUTO_NEXXT_CD;
                Laya.timer.loop(1000, this, this.updateNextCD, [1]);
                this.updateNextCD();
            }
            else {
                Laya.timer.clear(this, this.updateNextCD);
                this.chk_next.label = LanMgr.getLan("", 12573);
            }
        };
        VictoryView.prototype.updateNextCD = function (time) {
            if (time === void 0) { time = 0; }
            this._nextcd -= time;
            this.chk_next.label = LanMgr.getLan("", 12574, this._nextcd);
            if (this._nextcd <= 0) {
                this.startPlay();
            }
        };
        VictoryView.prototype.qianzhi = function ($nextId) {
            var flag = true;
            var nexttab = tb.TB_copy_info.get_TB_copy_infoById($nextId);
            var openvo = copymodule.CopyUtils.copyOpen(nexttab.precondition, game.GuajiModel.getInstance().getMaxLev());
            return openvo.isopen;
        };
        VictoryView.prototype.copyData = function () {
            var data = this.dataSource.copyVo;
            //重新生成一份战报
            data.vo.fightPageControl = data.vo.fightPageControl.clonePage(data.vo);
            return data;
        };
        VictoryView.prototype.isOpen = function () {
            var copyvo = this.dataSource.copyVo.vo;
            switch (copyvo.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.tower:
                    var maxLev = copyvo.copyType == iface.tb_prop.copyTypeKey.tower ? game.TowerModel.getInstance().getMaxCopyId() : game.GuajiModel.getInstance().getMaxLev();
                    var openVo = copymodule.CopyUtils.copyOpen(copyvo.tab_copyinfo.precondition, maxLev);
                    if (!openVo.isopen) {
                        showToast(openVo.info);
                    }
                    return openVo.isopen;
                case CopyType.fogForest:
                    var isopen = copyvo.forestGuanqia.tbForest.need_power <= App.hero.force;
                    if (!isopen) {
                        showToast(LanMgr.getLan("", 11004, copyvo.forestGuanqia.tbForest.need_power));
                    }
                    return isopen;
            }
        };
        // private _onceAgain: boolean;
        VictoryView.prototype.onPlay = function () {
            if (this.btn_again.gray) {
                showToast(LanMgr.getLan('', 10046));
                return;
            }
            var copyvo = this.dataSource.copyVo.vo;
            if (copyvo.copyType == CopyType.yuanzhenCopy) {
                // 下一关：弹出布阵界面
                PLC.request(Protocol.game_expedition_getChallengerInfo, null, function ($data) {
                    if (!$data)
                        return;
                    game.YuanzhengModel.getInstance().updateData($data.challengerInfo);
                    dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.expedition);
                });
                return;
            }
            if (this.btn_again.label == LanMgr.getLan("", 12572)) {
                //开放判断
                if (this.isOpen()) {
                    this.startPlay();
                }
            }
            else {
                this.startPlay();
            }
        };
        VictoryView.prototype.startPlay = function () {
            this.again = true;
            var ndata = this.copyData();
            var copyvo = ndata.vo;
            // this._onceAgain = true;
            this.close();
            //每日副本没有再来一次，如果需要，则要判断完进入条件后，满足条件，再跳转
            // if (copyvo.copyType == CopyType.dailycopy) {
            // 	// Laya.timer.frameOnce(3, this, () => {
            // 		dispatchEvt(new DailyEvent(DailyEvent.CHALLENGE_BOSS_AGAIN), copyvo.dailyCopyInfo);
            // 	// });
            // 	return;
            // }
            if (copyvo.copyType == iface.tb_prop.copyTypeKey.tower) {
                var playid = copyvo.tab_copyinfo.ID;
                var ptl = Protocol.game_copy_settleTowerCopy;
                var arg = {};
                arg[ptl.args.copyId] = playid;
                arg[ptl.args.isWin] = copyvo.fightPageControl.result == playState.VICTORY;
                PLC.request(ptl, arg, function ($data, $msg) {
                    if (!$data)
                        return;
                    ndata.vo.resultData = $data;
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.REPLAY_GAME_EVENT), ndata);
                });
                return;
            }
            // Laya.timer.frameOnce(3, this, () => {
            // 	dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), ndata);
            // });
            dispatchEvt(new game.FightsEvent(game.FightsEvent.REPLAY_GAME_EVENT), ndata);
        };
        VictoryView.prototype.close = function () {
            if (!this.again)
                dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
            Laya.timer.clear(this, this.updateNextCD);
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list_item.array = null;
            if (this.listVo._dataSource) {
                this.listVo._dataSource.length = 0;
            }
            this.chk_next.off(Laya.Event.CHANGE, this, this.onChkChange);
        };
        VictoryView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return VictoryView;
    }(ui.fight.shengliUI));
    game.VictoryView = VictoryView;
})(game || (game = {}));
