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
    var GloryFightResultView = /** @class */ (function (_super) {
        __extends(GloryFightResultView, _super);
        // private _isOpen:boolean;
        function GloryFightResultView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.closeEffect = null;
            _this.btnClose.on(Laya.Event.CLICK, _this, _this.close);
            _this.btnReplay.on(Laya.Event.CLICK, _this, _this.onPlay);
            return _this;
        }
        GloryFightResultView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.initView();
        };
        GloryFightResultView.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.initView();
        };
        GloryFightResultView.prototype.initView = function () {
            this._again = false;
            // this._isOpen = true;
            // if (this.dataSource) {
            // 	if (this.dataSource.type == playState.VICTORY) {
            // 		AudioManager.playSound("sound/victory.mp3");
            // 	} else {
            // 		AudioManager.playSound("sound/defeated.mp3");
            // 	}
            // }
            var $sdata = this.dataSource;
            var copyvo = $sdata.vo;
            var infoVo = copyvo.copyType == CopyType.glory ? copyvo.gloryMatchVo : null;
            if (!infoVo) {
                logerror("result error");
                return;
            }
            // AudioMgr.playSound("sound/victory.mp3");
            this.bgPanel.showTitle(true, "zhandoubiaoxian/duizhanjieguo.png", true, true, true, null, this);
            var isLeftWin = infoVo.isLeftWin();
            this.lbName1.text = infoVo.lUser.name;
            this.clip_force1.dataSource = infoVo.lUser.force;
            this.clip_force1.value = String(infoVo.lUser.force);
            this.headBox1.dataSource = infoVo.lUser.headVo;
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
            this.lbName2.text = infoVo.rUser.name;
            this.clip_force2.dataSource = infoVo.rUser.force;
            this.clip_force2.value = String(infoVo.rUser.force);
            this.headBox2.dataSource = infoVo.rUser.headVo;
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
        GloryFightResultView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        GloryFightResultView.prototype.close = function () {
            if (!this._again)
                dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
        };
        GloryFightResultView.prototype.onPlay = function () {
            this._again = true;
            // this._isOpen = false;
            var ndata = this.copyData();
            this.close();
            dispatchEvt(new game.FightsEvent(game.FightsEvent.REPLAY_GAME_EVENT), ndata);
        };
        GloryFightResultView.prototype.copyData = function () {
            var data = this.dataSource;
            //重新设置战报读取指针
            data.vo.fightPageControl.initState();
            return data;
        };
        return GloryFightResultView;
    }(ui.fight.GloryFightResultUI));
    game.GloryFightResultView = GloryFightResultView;
})(game || (game = {}));
