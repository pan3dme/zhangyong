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
var common;
(function (common) {
    /** 升级界面 */
    var LevelUpView = /** @class */ (function (_super) {
        __extends(LevelUpView, _super);
        function LevelUpView() {
            var _this = _super.call(this) || this;
            _this._timeid = 0;
            _this.list_reward.visible = false;
            _this._listRewardVo = new ListVo(_this.list_reward);
            return _this;
        }
        LevelUpView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, false);
            this.initView();
        };
        LevelUpView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, false);
            this.initView();
        };
        LevelUpView.prototype.initView = function () {
            AudioMgr.playSound("sound/uplevel.mp3");
            this.isModelClose = false;
            this.clipLv.value = App.hero.level.toString();
            this.lbOldLv.text = game.HudModel.getInstance().oldUserLv + "";
            this.lbNewLv.text = App.hero.level.toString();
            this.updateReward();
        };
        LevelUpView.prototype.updateReward = function () {
            var roleT = tb.TB_role.get_TB_rolenById(App.hero.level - 1);
            if (roleT && roleT.reward.length > 0) {
                //有奖励
                this.bgPanel.bg.visible = true;
                this.box_reward.visible = true;
                var rewardArr = ary2prop(roleT.reward);
                for (var _i = 0, rewardArr_1 = rewardArr; _i < rewardArr_1.length; _i++) {
                    var vo = rewardArr_1[_i];
                    vo.show = true;
                    vo.startAction = true;
                }
                this.list_reward.repeatX = rewardArr.length > 3 ? 3 : rewardArr.length;
                this.list_reward.width = this.list_reward.repeatX * 100 - 10;
                this.list_reward.height = rewardArr.length > 3 ? 150 : 90;
                this.list_reward.x = (Laya.stage.width - this.list_reward.width) / 2;
                this.list_reward.y = (Laya.stage.height - this.height) / 2 + 283;
                this._listRewardVo.initData(this.list_reward);
                this._listRewardVo._dataSource = rewardArr;
                this._listRewardVo.setZorder(this.zOrder + 1);
                this._listRewardVo.setWidth(this.list_reward.width);
                this._listRewardVo.setHeight(this.list_reward.height);
                this._listRewardVo.setPosition(this.list_reward.x, this.list_reward.y);
                // this.bgPanel.bg.height = 160 + this.list_reward.height;
                // this.height = this.bgPanel.bg.y + this.bgPanel.bg.height;
            }
            else {
                //无奖励
                // this.height = 90;
                // this.bgPanel.bg.visible = false;
                // this._efflist = null;
            }
            this.bgPanel.showTitle("zhandoubiaoxian/shengji.png", true, true, Handler.create(this, this.showTitleComplete), this);
        };
        LevelUpView.prototype.showTitleComplete = function () {
            this._efflist = common.EffectList.showEffectList(this._listRewardVo);
            this.isModelClose = true;
        };
        LevelUpView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
                AudioMgr.playSound("sound/getreward.mp3");
            }
        };
        LevelUpView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            clearTimeout(this._timeid);
            this.lbNotice.visible = false;
            this.isModelClose = false;
        };
        return LevelUpView;
    }(ui.component.LevelUpUI));
    common.LevelUpView = LevelUpView;
})(common || (common = {}));
