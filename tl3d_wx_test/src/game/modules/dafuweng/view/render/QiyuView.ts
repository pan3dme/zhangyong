module game {
    export class QiyuView extends ui.dafuweng.QiyuViewUI {

        private _viewMap : any;
        private _shaizi: DafuwengChar;
        public uiScene: DafuwengExtSceneLayer;
        private _model : DafuwengModel;
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this._model = DafuwengModel.getInstance();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.isModelClose = false;
            this._viewMap = {};
            this.listTab.array = null;
            this.listTab.selectHandler = new Handler(this,this.onSelect);
            this.listTab.selectedIndex = -1;
            this.btnLeft.on(Laya.Event.CLICK,this,this.onLeft);
            this.btnRight.on(Laya.Event.CLICK,this,this.onRight);
            this.imgBg.on(Laya.Event.CLICK,this,this.close);

            this.uiScene = new DafuwengExtSceneLayer();
            this.addChild(this.uiScene);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public close(): void {
            super.close();
            this.listTab.array = null;
            this.listTab.selectedIndex = -1;
            this._shaizi = null;
            this.uiScene.onExit();
            for(let type in this._viewMap) {
                let view = this._viewMap[type] as Laya.Component;
                if(GameUtil.isFunction(view['close'])) {
                    view['close']();
                }
            }
            Dialog.manager.mouseEnabled = true;
        }

        private initView(): void {
            this._shaizi = this.uiScene.addModelChar(String(100006), 360, 720, 180, 2.7);
            this._shaizi.shadow = false;
            this.removeShaizi();

            let qiyuList = this._model.getRiskList(true);
            this.listTab.array = [...qiyuList];
            this.listTab.selectedIndex = 0;
            this.uiScene.onShow();
        }

        /** 删除分页 -- （删除过期或已答的，没必要只删除当前分页） */
        public delTab(key:any):void {
            let qiyuList = this._model.getRiskList(true);
            this.listTab.array = [...qiyuList];
            if(qiyuList.length > 0) {
                let index = this.listTab.selectedIndex;
                if(index > 0) {
                    this.listTab.selectedIndex = index - 1;
                }else{
                    this.listTab.selectedIndex = -1;
                    this.listTab.selectedIndex = index;
                }
            }else{
                this.close();
            }
        }

        private onSelect(index:number):void {
            if(index == -1) return;
            let vo = this.listTab.getItem(index) as DafuwengVo;
            if(!vo) return;
            let view = this.getView(vo.tbRisk.type);
            view.dataSource = vo;
            this.boxContent.height = view.height;
            this.boxContent.removeChildren();
            this.boxContent.addChild(view);
            if(GameUtil.isFunction(view['initView'])) {
                view['initView']();
            }
        }

        private onLeft():void {
            this.listTab.scrollTo(this.listTab.selectedIndex-1);
        }
        private onRight():void {
            this.listTab.scrollTo(this.listTab.selectedIndex+1);
        }

        public caiDaXiaoResult(data) {
            DialogExt.manager.mouseEnabled = false;
            if (data.sdata.winType) {
                //结果存在
                let ids = data.selectId % 2
                if (data.sdata.winType == iface.tb_prop.guessTypeKey.loss) {
                    ids = (data.selectId + 1) % 2
                }
                let tbset = tb.TB_risk_set.getTabSet();
                //根据输赢，在指定区间，随机出塞子点数
                let num = utils.random(tbset.guess_size[ids][0], tbset.guess_size[ids][1]);
                this.playShaizi(num);
                setTimeout(() => {
                    this.removeShaizi();
                    if (data.sdata.winType == iface.tb_prop.guessTypeKey.win || data.sdata.winType == iface.tb_prop.guessTypeKey.loss) {
                        let itemList = [];
                        UIUtil.getRewardItemVoList(itemList, data.sdata.commonData,false,false);
                        let content = data.sdata.winType == iface.tb_prop.guessTypeKey.win ? LanMgr.getLan("",12458) : LanMgr.getLan("",12459);
                        let vo : QiyuResultVo = {title:LanMgr.getLan("",12457),content,itemList,callBack:this.delTab.bind(this)};
                        UIMgr.showUI(UIConst.DFW_QiyuResultView,vo);
                    }
                    DialogExt.manager.mouseEnabled = true;
                }, 2450);
            }
        }

        private playShaizi(diceNum: number) {
            if (this._shaizi) {
                this._shaizi.visible = true;
                // this._shaizi.set2dPos(360 - this.img_bg.x + 643, 850);
                this._shaizi.play(String(diceNum), 1);
            }
        }

        private removeShaizi() {
            if (this._shaizi) {
                this._shaizi.play(tl3d.CharAction.STANAD, 1);
                this._shaizi.visible = false;
            }
        }

        private getView(type:number):Laya.Component {
            if(!this._viewMap[type]) {
                let view : Laya.Component;
                if (type == RiskType.QUESTION) {
                    view = new questionPanel();
                } else if (type == RiskType.CAIDAXIAO) {
                    view = new caiDaXiaoView();
                } else if (type == RiskType.CAIQUAN) {
                    view = new caiQuanView();
                } else if (type == RiskType.BIYANLI) {
                    view = new biYanLiView();
                }
                view.centerX = 0;
                this._viewMap[type] = view;
            }
            return this._viewMap[type];
        }
    }
}