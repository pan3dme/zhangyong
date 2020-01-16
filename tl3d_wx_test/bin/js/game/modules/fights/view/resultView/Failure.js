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
    var Failure = /** @class */ (function (_super) {
        __extends(Failure, _super);
        function Failure() {
            var _this = _super.call(this) || this;
            // this.isModelClose=true;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this.closeEffect = null;
            _this.btn_again.on(Laya.Event.CLICK, _this, _this.onPlay);
            _this._tickFun = function () {
                _this.timeTick();
            };
            _this.channel.callback = _this.channelCb.bind(_this);
            return _this;
        }
        Failure.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bgPanel.bg.height = this.bgPanel.height - this.bgPanel.bg.y;
        };
        Failure.prototype.channelCb = function (jump) {
            if (jump && this.dataSource && this.dataSource.copyVo) {
                var enterVo = this.dataSource.copyVo;
                enterVo['flag'] = true;
            }
            this.close();
        };
        Failure.prototype.timeTick = function () {
            this.time--;
            if (this.time <= 0) {
                this.close();
            }
            this.lab_time.text = String(this.time);
        };
        Failure.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.bgPanel.showTitle(false, "zhandoubiaoxian/shibai.png", false, true, false, null, this);
            this.showbtn();
        };
        Failure.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this._again = false;
            AudioMgr.setPlayRate(1);
            AudioMgr.playSound("sound/defeated.mp3");
        };
        Failure.prototype.showbtn = function () {
            var copyvo = this.dataSource.copyVo.vo;
            this.lab_time.visible = this.lab_txt.visible = copyvo.copyType == iface.tb_prop.copyTypeKey.main;
            this.btn_again.visible = [CopyType.teamCopy, CopyType.jingji_npc, CopyType.yuanzhenCopy, CopyType.escort, CopyType.island, CopyType.guildFight].indexOf(copyvo.copyType) == -1;
            this.btn_close.x = !this.btn_again.visible ? 282 : 174;
            if (copyvo.copyType == iface.tb_prop.copyTypeKey.main) {
                this.time = 10;
                this.lab_time.text = String(this.time);
                this.timerLoop(1000, this, this._tickFun);
            }
            else if (copyvo.copyType == iface.tb_prop.copyTypeKey.rune) {
                //特殊处理。当大于某些关卡时，才显示下一关
                this.btn_again.visible = false;
                this.btn_close.x = 282;
                // if (copyvo.tab_copyinfo.ID <= tb.TB_copy_set.getCopySet().next_open) {
                // 	this.btn_again.visible = false;
                // 	this.btn_close.x = 282;
                // }
            }
            if (this.btn_again.visible) {
                this.btn_again.label = LanMgr.getLan("", 12571);
            }
        };
        Failure.prototype.copyData = function () {
            var data = this.dataSource.copyVo;
            //重新生成一份战报
            data.vo.fightPageControl = data.vo.fightPageControl.clonePage(data.vo);
            return data;
        };
        Failure.prototype.onPlay = function () {
            var _this = this;
            this._again = true;
            var ndata = this.copyData();
            var copyvo = ndata.vo;
            // if (copyvo.copyType == CopyType.dailycopy) {
            // 	Laya.timer.frameOnce(3, this, () => {
            // 		dispatchEvt(new DailyEvent(DailyEvent.CHALLENGE_BOSS_AGAIN), copyvo.dailyCopyInfo);
            // 	});
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
                    _this.close();
                });
                return;
            }
            // Laya.timer.frameOnce(3, this, () => {
            // 	dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), ndata);
            // });
            dispatchEvt(new game.FightsEvent(game.FightsEvent.REPLAY_GAME_EVENT), ndata);
            this.close();
        };
        Failure.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        Failure.prototype.close = function () {
            if (!this._again)
                dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
            this.clearTimer(this, this._tickFun);
        };
        return Failure;
    }(ui.fight.shibaiUI));
    game.Failure = Failure;
})(game || (game = {}));
