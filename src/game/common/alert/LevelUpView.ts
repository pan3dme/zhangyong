

module common {
    /** 升级界面 */
    export class LevelUpView extends ui.component.LevelUpUI {

        private _timeid: number = 0;
        constructor() {
            super();
            this.list_reward.visible = false;
            this._listRewardVo = new ListVo(this.list_reward);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, false);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, false);
            this.initView();
        }

        initView(): void {
            AudioMgr.playSound("sound/uplevel.mp3");
            this.isModelClose = false;
            this.clipLv.value = App.hero.level.toString();
            this.lbOldLv.text = game.HudModel.getInstance().oldUserLv + "";
            this.lbNewLv.text = App.hero.level.toString();
            this.updateReward();
        }

        //奖励
        private _listRewardVo:ListVo;
        private _efflist: common.EffectList;
        private updateReward():void{
            let roleT:tb.TB_role = tb.TB_role.get_TB_rolenById(App.hero.level-1);
            if (roleT && roleT.reward.length > 0){
                //有奖励
                this.bgPanel.bg.visible = true;
                this.box_reward.visible = true;
                let rewardArr:ItemVo[] = ary2prop(roleT.reward);
                for(let vo of rewardArr) {
                    vo.show = true;
                    vo.startAction = true;
                }
                this.list_reward.repeatX = rewardArr.length > 3 ? 3 : rewardArr.length;
                this.list_reward.width = this.list_reward.repeatX * 100 - 10;
                this.list_reward.height = rewardArr.length > 3 ? 150 : 90;
                this.list_reward.x = (Laya.stage.width - this.list_reward.width) / 2;
                this.list_reward.y = (Laya.stage.height - this.height)/2 + 283;

                this._listRewardVo.initData(this.list_reward);
                this._listRewardVo._dataSource = rewardArr;
                this._listRewardVo.setZorder(this.zOrder+1);
                this._listRewardVo.setWidth(this.list_reward.width);
                this._listRewardVo.setHeight(this.list_reward.height);
                this._listRewardVo.setPosition(this.list_reward.x, this.list_reward.y);
                
                // this.bgPanel.bg.height = 160 + this.list_reward.height;
                // this.height = this.bgPanel.bg.y + this.bgPanel.bg.height;
            }else{
                //无奖励
                // this.height = 90;
                // this.bgPanel.bg.visible = false;
                // this._efflist = null;
            }
            this.bgPanel.showTitle("zhandoubiaoxian/shengji.png", true, true, Handler.create(this, this.showTitleComplete), this);
        }

        private showTitleComplete():void{
            this._efflist = common.EffectList.showEffectList(this._listRewardVo);
            this.isModelClose = true;
        }

        public close() {
            super.close();
            this.bgPanel.closeTitle();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
                AudioMgr.playSound("sound/getreward.mp3");
            }
        }

        onClosed(): void {
            super.onClosed();
            clearTimeout(this._timeid);
            this.lbNotice.visible = false;
            this.isModelClose = false;
        }

    }
}