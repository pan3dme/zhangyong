
module game {

    export interface QiyuResultVo {
        title : string;
        content : string;
        itemList ?: ItemVo[];
        callBack ?: Function;
    }

    export class QiyuResultView extends ui.dafuweng.QiyuResultUI {

        private _resultVo : QiyuResultVo;
        // private listVo: ListVo;
        /**获得物品效果列表 */
        // private _efflist: common.EffectList;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.DFW_QiyuResultView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("",10536) };
            // this.listVo = new ListVo(this.listItem);
        }

        popup(closeOther?: boolean, showEffect?: boolean):void {
            this.initSize();
            super.popup(closeOther,showEffect);
            this.initView();
        }

        show(closeOther?: boolean, showEffect?: boolean):void {
            super.show(closeOther,showEffect);
        }

        close():void {
            super.close();
            if(this._resultVo && this._resultVo.callBack) {
                this._resultVo.callBack();
                this._resultVo.callBack = null;
            }
            this.listItem.array = null;
            this._resultVo = null;
            // if (this._efflist) {
            //     this._efflist.stratEndAction();
            //     this._efflist = null;
            // }
        }

        private initSize():void {
            this._resultVo = this.dataSource;
            let ary = this._resultVo.itemList || [];
            let isHasReward : boolean = ary.length > 0;
            this.height = isHasReward ? 400 : 300;
        }

        private initView():void {
            this.bgPanel.updateTitle(this._resultVo.title);
            this.lbTitle.text = this._resultVo.content;
            this.setList();
        }

        private setList():void {
            let ary = this._resultVo.itemList || [];
            let isHasReward : boolean = ary.length > 0;
            this.listItem.visible = isHasReward;
            // this._efflist = null;
            if(isHasReward) {
                this.listItem.array = ary;
                this.listItem.width = ary.length * 100 +  (ary.length - 1) * this.listItem.spaceX;

                // this.listVo.initData(this.listItem);
                // this.listVo._dataSource = ary;
                // this.listVo.setZorder(this.zOrder);
                // this.listVo.setWidth(this.listItem.width);
                // this.listVo.setHeight(this.listItem._height);
                // this.listVo.setPosition(this.listItem.x + (Laya.stage.width-this.width)/2, (Laya.stage.height-this.height)/2+this.listItem.y);
                // this._efflist = common.EffectList.showEffectList(this.listVo);
            }
        }
    }
}