

module common {
    export class ShowRewardView extends ui.component.CommonRewardBoxUI {
        private _rewardOpt: RewardInfoVo;
        constructor() {
            super();
            this.isModelClose = true;
            this.list.visible = false;
            this.listVo = new ListVo(this.list);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        listVo: ListVo;

        private initView(): void {
            this._rewardOpt = this.dataSource;
            let dataList = this._rewardOpt.rewardList;
            for (let key in dataList) {
                dataList[key].show = true;
                dataList[key].startAction = true;
            }

            // this.list.x = dataList.length > 6 ? 162 : 315;            
            this.imgBg.height = dataList.length > 4 ? 360 : 290;
            this.closeByBlank.y = dataList.length > 4 ? 359 : 289;

            this.list.repeatX = dataList.length > 4 ? 4 : dataList.length;

            this.list.width = this.list.repeatX * 100;
            this.list.height = dataList.length > 4 ? 220 : 100;

            this.list.y = dataList.length > 4 ? this.y - 48 : this.y - 35;
            this.list.x = ((Laya.stage.width / 2) - 45) - ((this.list.repeatX - 1) * ((90 + this.list.spaceX) / 2));

            this.listVo.initData(this.list);
            this.listVo._dataSource = dataList;
            this.listVo.setZorder(this.zOrder);
            this.listVo.setWidth(this.list.width);
            this.listVo.setHeight(this.list._height);
            this.listVo.setPosition(this.list.x, this.list.y);
            this._efflist = common.EffectList.showEffectList(this.listVo);
        }
        /**获得物品效果列表 */
        private _efflist: common.EffectList;
        public close() {
            super.close();
            if(this.dataSource && this.dataSource.callback){
                this.dataSource.callback.call(null);
            }
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            AudioMgr.playSound("sound/getreward.mp3");
        }

        public onClosed(): void {
            super.onClosed();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list.array = null;
            
            
            if (this._rewardOpt){
                if (this._rewardOpt.handler){
                    this._rewardOpt.handler.runWith([this._rewardOpt.type, this._rewardOpt.rewardList]);
                }
                Laya.Pool.recover("RewardInfoVo", this._rewardOpt);
            }
            this._rewardOpt = null;
            ShowRewardUtil.CheckRewardList();
        }
    }
}