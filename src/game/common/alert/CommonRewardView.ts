

module common {
    export interface IRewardOption {
        itemList: ItemVo[];
        isPreview: boolean;
        zorder: number;
        callback?:Function;
    }

    export class CommonRewardView extends ui.component.CommonRewardBoxUI {
        private _rewardOpt: IRewardOption;
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
            this.zOrder = this._rewardOpt.zorder;
            let dataList = this._rewardOpt.itemList;
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
            this.listVo.setZorder(this._rewardOpt.zorder);
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
            // 需要在super.onClosed之前
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            super.onClosed();
            this.list.array = null;
            this._rewardOpt = null;
            if(UIUtil.vipData) {
                UIUtil.showVipupPanel(UIUtil.vipData);
                UIUtil.vipData = null;
            }
        }
    }
}