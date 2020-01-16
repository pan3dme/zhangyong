module game {
    export enum CaiQuanState {
        BEFORE, ONGOING, ENDING
    }
    export class caiQuanView extends ui.dafuweng.caiQuanViewUI {
        private _model = DafuwengModel.getInstance();
        constructor() {
            super();
            this.isModelClose = false;
            this.btn_1.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_2.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_3.on(Laya.Event.CLICK, this, this.onClick);
        }

        public close():void {

        }

        public initView() {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            let list = ary2prop(info.tbRisk.para);
            this.list_reward.array =list
            this.list_reward.width = list.length * 80 + this.list_reward.spaceX * (list.length - 1);

            this.setVis(true);

            this._state = CaiQuanState.BEFORE;

        }

        private _state: number;
        private onClick(e: Laya.Event) {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            if (this._state != CaiQuanState.BEFORE) return;
            if(info.isExpire()) {
                showToast(LanMgr.getLan('', 10286));
                return;
            }
            this._state = CaiQuanState.ONGOING;
            DialogExt.manager.mouseEnabled = false;
            let tick = setTimeout(() => {
                DialogExt.manager.mouseEnabled = true;
            }, 5000);
            let args = {};
            args[Protocol.game_risk_fingerGuess.args.riskKey] = info.key;
            args[Protocol.game_risk_fingerGuess.args.id] = null;
            PLC.request(Protocol.game_risk_fingerGuess, args, (res) => {
                if (!res) return;
                info.setAnswer(Number(e.target.name));
                clearTimeout(tick);
                if (res.delRiskKey) {
                    this._model.delRiskInfo([res.delRiskKey]);
                }
                this.result(res, Number(e.target.name));
            });
        }

        private _loopNum: number;
        private skins = ["tanxian/jiandao.png", "tanxian/shitou.png", "tanxian/bu.png"];
        private result(res, selectId: number) {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            let tagselect = selectId;
            if (res.winType == iface.tb_prop.guessTypeKey.win) {
                tagselect = this.getTagId(selectId, true);
            } else if (res.winType == iface.tb_prop.guessTypeKey.loss) {
                tagselect = this.getTagId(selectId, false);
            }

            // logyhj("猜拳我的选择：", selectId, tagselect);

            this.setVis(false);

            this.btn_1.skin = this.skins[selectId - 1];
            this.btn_1.visible = this.btn_3.visible = true;

            this._loopNum = 0;
            this.btn_3.skin = this.skins[this._loopNum % 3];
            this._loopNum++;
            this.timer.loop(150, this, () => {
                // logyhj("执行计时器");
                if (this._loopNum > 10) {
                    this.timer.clearAll(this);
                    this.btn_3.skin = this.skins[tagselect - 1];
                    setTimeout(() => {
                        this._state = CaiQuanState.ENDING;
                        if (res.winType == iface.tb_prop.guessTypeKey.win || res.winType == iface.tb_prop.guessTypeKey.loss) {
                            let itemList = [];
                            UIUtil.getRewardItemVoList(itemList, res.commonData,false,false);
                            let content = res.winType == iface.tb_prop.guessTypeKey.win ? LanMgr.getLan("",12463) : LanMgr.getLan("",12464);
                            let vo : QiyuResultVo = {title:LanMgr.getLan("",12462),content,itemList,callBack:this.toClose.bind(this)};
                            UIMgr.showUI(UIConst.DFW_QiyuResultView,vo);
                        } else {
                            this._state = CaiQuanState.BEFORE;
                            showToast(LanMgr.getLan('', 10288));
                            this.setVis(true);
                        }
                        DialogExt.manager.mouseEnabled = true;
                    }, 500);
                } else {
                    this.btn_3.skin = this.skins[this._loopNum % 3];
                    this._loopNum++;
                }
            });
        }

        private toClose():void {
            let info = this.dataSource as DafuwengVo;
            dispatchEvt(new DafuwengEvent(DafuwengEvent.DEL_QIYU_TAB),info?info.key:null);
        }

        private setVis(flag: boolean) {
            this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = flag;
            if (flag) {
                this.btn_1.skin = this.skins[0];
                this.btn_2.skin = this.skins[1];
                this.btn_3.skin = this.skins[2];
            }

            this.img_vs.visible = !flag;
        }

        private getTagId(select: number, victoryflag: boolean): number {
            let settab = tb.TB_risk_set.getTabSet();
            for (let i = 0; i < settab.guess_fist.length; i++) {
                var item = settab.guess_fist[i];
                if (victoryflag) {
                    if (item[0] == select) {
                        return item[1];
                    }
                } else {
                    if (item[1] == select) {
                        return item[0];
                    }
                }
            }
            return select;
        }
    }
}