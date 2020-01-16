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
    var ArenaResultView = /** @class */ (function (_super) {
        __extends(ArenaResultView, _super);
        function ArenaResultView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.closeEffect = null;
            _this.btnClose.on(Laya.Event.CLICK, _this, _this.close);
            _this.btnReplay.on(Laya.Event.CLICK, _this, _this.onPlay);
            return _this;
        }
        ArenaResultView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.initView();
        };
        ArenaResultView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.initView();
        };
        ArenaResultView.prototype.initView = function () {
            this._again = false;
            var $sdata = this.dataSource;
            var copyvo = $sdata.vo;
            var infoVo = copyvo.copyType == CopyType.arenaMatch ? copyvo.arenaMatchVo : copyvo.arenaReportVo.arenaRecordVo;
            if (!infoVo) {
                logerror("result error");
                return;
            }
            this.bgPanel.showTitle(true, "zhandoubiaoxian/duizhanjieguo.png", true, true, true, null, this);
            var myInfo = App.hero;
            var isLeftWin = infoVo.isWin;
            this.lbName1.text = myInfo.name;
            this.clip_force1.visible = this.img_flag1.visible = this.img_flag11.visible = false;
            this.headBox1.dataSource = new UserHeadVo(myInfo.getHeadId(), myInfo.level, myInfo.headFrame);
            if (isLeftWin) {
                this.bg1.skin = "zhandoubiaoxian/hongse.png";
                this.lbResult1.skin = "zhandoubiaoxian/sheng.png";
                this.bg1.scaleY = 1;
            }
            else {
                this.bg1.skin = "zhandoubiaoxian/lanse.png";
                this.lbResult1.skin = "zhandoubiaoxian/bai.png";
                this.bg1.scaleY = -1;
            }
            this.lbName2.text = infoVo.name;
            this.clip_force2.visible = this.img_flag2.visible = this.img_flag22.visible = false;
            this.headBox2.dataSource = new UserHeadVo(infoVo.head, infoVo.level, infoVo.headFrame);
            if (!isLeftWin) {
                this.bg2.skin = "zhandoubiaoxian/hongse.png";
                this.lbResult2.skin = "zhandoubiaoxian/sheng.png";
                this.bg2.scaleY = -1;
            }
            else {
                this.bg2.skin = "zhandoubiaoxian/lanse.png";
                this.lbResult2.skin = "zhandoubiaoxian/bai.png";
                this.bg2.scaleY = 1;
            }
        };
        ArenaResultView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        ArenaResultView.prototype.close = function () {
            if (!this._again)
                dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
        };
        ArenaResultView.prototype.onPlay = function () {
            this._again = true;
            var ndata = this.copyData();
            this.close();
            // Laya.timer.frameOnce(3, this, () => {
            // 	dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), ndata);
            // });
            dispatchEvt(new game.FightsEvent(game.FightsEvent.REPLAY_GAME_EVENT), ndata);
        };
        ArenaResultView.prototype.copyData = function () {
            // let sdata: EnterFightVo = this.dataSource;
            // let copyvo: FightVo = sdata.vo;
            // let nVo: FightVo = new FightVo;
            // nVo.copyType = copyvo.copyType;
            // nVo.arenaMatchVo = copyvo.arenaMatchVo;
            // nVo.arenaReportVo = copyvo.arenaReportVo;
            // nVo.fightPageControl = copyvo.fightPageControl.clonePage(nVo);
            // let data: EnterFightVo = { vo: nVo, event: sdata.event, eventdata:sdata.eventdata };
            // return data;
            var data = this.dataSource;
            //��������ս����ȡָ��
            data.vo.fightPageControl.initState();
            return data;
        };
        return ArenaResultView;
    }(ui.fight.GloryFightResultUI));
    game.ArenaResultView = ArenaResultView;
})(game || (game = {}));
