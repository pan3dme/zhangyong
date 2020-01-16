module game {
    export enum BiYanLiGameState {
        BEFORE, ONGOING, END
    }

    export class biYanLiView extends ui.dafuweng.biYanLiViewUI {
        private _model = DafuwengModel.getInstance();
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this.btn_start.on(Laya.Event.CLICK, this, this.onClick);
            this.ui_tong1.img_barrel.on(Laya.Event.CLICK, this, this.onClickBowie,[this.ui_tong1]);
            this.ui_tong2.img_barrel.on(Laya.Event.CLICK, this, this.onClickBowie,[this.ui_tong2]);
            this.ui_tong3.img_barrel.on(Laya.Event.CLICK, this, this.onClickBowie,[this.ui_tong3]);
        }

        public close():void {

        }

        private _gamestate: number;
        public initView() {
            let info = this.dataSource as DafuwengVo;
            if (!info) {
                logerror("比眼力获取不到数据");
                return;
            }
            this._gamestate = BiYanLiGameState.BEFORE;
            this.btn_start.visible = true;
            let tabvo: tb.TB_risk = info.tbRisk;
            this.ui_tong1.dataSource = { id: 1, prop: tabvo.para[0] };
            this.ui_tong2.dataSource = { id: 2, prop: tabvo.para[1] };
            this.ui_tong3.dataSource = { id: 3, prop: tabvo.para[2] };
        }

        public onClickBowie(e: bowieIR) {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            if (this._gamestate == BiYanLiGameState.BEFORE) return;
            if (e.dataSource && e.curState == bowieState.CLOSE) {
                // logyhj("选中了：", e.dataSource.id);
                if (this._gamestate == BiYanLiGameState.ONGOING) {
                    if(info.isExpire()) {
                        showToast(LanMgr.getLan('', 10286));
                        return;
                    }
                    Dialog.manager.mouseEnabled = false;
                    // e.openEff();
                    this.ui_tong1.openEff();
                    this.ui_tong2.openEff();
                    this.ui_tong3.openEff();
                    //给服务端发送领奖
                    let args = {};
                    args[Protocol.game_risk_eyesightGuess.args.id] = e.dataSource.id;
                    args[Protocol.game_risk_eyesightGuess.args.riskKey] = info.key;
                    PLC.request(Protocol.game_risk_eyesightGuess, args, ($data) => {
                        if (!$data) {
                            Dialog.manager.mouseEnabled = true;
                            return;
                        }
                        info.setAnswer(Number(e.dataSource.id));
                        if ($data.delRiskKey) {
                            this._model.delRiskInfo([$data.delRiskKey]);
                        }
                        Laya.timer.once(1000,this,()=>{
                            Dialog.manager.mouseEnabled = true;
                            let itemList = [];
                            UIUtil.getRewardItemVoList(itemList, $data.commonData,false,false);
                            let content = LanMgr.getLan("",12467);
                            let vo : QiyuResultVo = {title:LanMgr.getLan("",12466),content,itemList,callBack:this.toClose.bind(this)};
                            UIMgr.showUI(UIConst.DFW_QiyuResultView,vo);
                        });
                    });
                    this._gamestate = BiYanLiGameState.END;
                }
            }
        }

        private toClose():void {
            let info = this.dataSource as DafuwengVo;
            dispatchEvt(new DafuwengEvent(DafuwengEvent.DEL_QIYU_TAB),info?info.key:null);
        }

        private onClick() {
            if (this._gamestate != BiYanLiGameState.BEFORE) return;
            this._gamestate = BiYanLiGameState.ONGOING;
            this._showcbflag = true;
            this.btn_start.visible = false;
            Dialog.manager.mouseEnabled = false;
            this.ui_tong1.openAndcloseEff(this.showcb.bind(this));
            this.ui_tong2.openAndcloseEff(this.showcb.bind(this));
            this.ui_tong3.openAndcloseEff(this.showcb.bind(this));
        }
        //游戏难度：兑换几次
        private _difficulty: number = 11;
        //交换速度
        private _speed: number = 500;
        private _showcbflag: boolean;
        private _changeNum: number;
        private showcb() {
            //如果三个桶都准备好了
            if (this.ui_tong1.curState == bowieState.CLOSE && this.ui_tong2.curState == bowieState.CLOSE && this.ui_tong3.curState == bowieState.CLOSE) {
                //标志位，控制方法多次执行
                if (!this._showcbflag) return;
                this._showcbflag = false;
                this._changeNum = 0;
                this._speed = 500;
                //开始交换
                this.startChange();
            }
        }

        private startChange() {
            if (this._changeNum > this._difficulty) {
                // logyhj("交换完成!");
                Dialog.manager.mouseEnabled = true;
                return;
            }
            this.updateorder();
            this._changeNum++;
            let tag1 = random(3);
            let tag2 = (tag1 + 1) % 3;
            tag1 += 1;
            tag2 += 1;

            let tagui1 = this.getChildByName("ui_tong" + tag1) as bowieIR;
            let tw1x = tagui1.x;
            let tw1y = tagui1.y;

            let tagui2 = this.getChildByName("ui_tong" + tag2) as bowieIR;
            let tw2x = tagui2.x;
            let tw2y = tagui2.y;

            // let speed = this._changeNum * (-50) + 550
            // logyhj("move speed:", this._speed);
            Laya.Tween.to(tagui1, { x: tw2x, y: tw2y }, this._speed)
            Laya.Tween.to(tagui2, { x: tw1x, y: tw1y }, this._speed, null, Handler.create(this, () => {
                this.startChange();
            }))
            this._speed = Math.floor(this._speed / 1.1);
        }

        private updateorder() {
            this.ui_tong1.zOrder = this.ui_tong1.y
            this.ui_tong2.zOrder = this.ui_tong2.y
            this.ui_tong3.zOrder = this.ui_tong3.y
            this.updateZOrder();
        }
    }
}