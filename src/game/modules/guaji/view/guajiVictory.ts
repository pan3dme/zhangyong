module game {
    export class guajiVictory extends ui.fight.shengliUI {

        constructor() {
            super();
            this.isModelClose = true;
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.list_item.array = [];
            this.listVo = new ListVo(this.list_item);
            this.listVo.setPosition(this.list_item.x + Launch.offsetX, 500 + Launch.offsetY);
            this._tickFun = () => {
                this.timeTick();
            }
        }

        private timeTick() {
            this.time--;
            if (this.time <= 0) {
                this.close();
            }
            this.lab_time.text = String(this.time);
        }

        private _tickFun: Function;
        private time: number;
        listVo: ListVo;
        ary: Array<inface.IItemData> = new Array;
        public popup() {
            super.popup(false, false);
             this.bgPanel.showTitle(true,"zhandoubiaoxian/shengli.png", true, true, true, Handler.create(this, this.showTitleComplete), this);
            this.lbDesc.visible = this.chk_next.visible = this.btn_again.visible = false;
            let $sdata = this.dataSource.vo;
            if ($sdata && $sdata.commonData)
                UIUtil.getRewardItemVoList(this.ary, $sdata.commonData);
            if ($sdata && $sdata.firstData)
                UIUtil.getRewardItemVoList(this.ary, $sdata.firstData, true);

            this.listVo._dataSource = this.list_item.array = this.ary;
			this.list_item.AutoLayout(this.width);
            this.listVo.setHeight(200);
            this.listVo.setPosition(this.list_item.x + (Laya.stage.width-this.width)/2, (Laya.stage.height-this.height)/2+this.list_item.y);
			this.listVo._height = this.list_item.height;
			


            this.time = 6;
            this.lab_empty.visible = this.ary.length <= 0;
            this.box_title.visible = !this.lab_empty.visible;

            // this.lab_txt.y = this.lab_time.y = 491;
            this.btn_close.x = 282 ;
            // this.lab_txt.visible = this.lab_time.visible = false;
        }

        private showTitleComplete():void{
            this._efflist = common.EffectList.showEffectList(this.listVo);
            this._tickFun();
            Laya.timer.loop(1000, this, this._tickFun);
            AudioMgr.playSound("sound/victory.mp3");
        }

        public onOpened() {
            super.onOpened();
            
            
        }

        private _efflist: common.EffectList;
        public close(): void {
            super.close();
            this.bgPanel.closeTitle();
            if (this._efflist) {
                this._efflist.stratEndAction();
                this._efflist = null;
            }
            this.list_item.array = null;
            if (this.listVo._dataSource) {
                this.listVo._dataSource.length = 0;
            }
            Laya.timer.clear(this, this._tickFun);
        }

        public onClosed() {
            super.onClosed();
            if(UIMgr.hasStage(UIConst.GuajiView)) {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                view.delayShowBossTips();
            }
        }
    }
}