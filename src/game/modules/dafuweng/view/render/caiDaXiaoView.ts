module game {
    export class caiDaXiaoView extends ui.dafuweng.caiDaXiaoViewUI {

        
        private _model = DafuwengModel.getInstance();
        constructor() {
            super();
            this.isModelClose = false;
            this.btn_small.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_big.on(Laya.Event.CLICK, this, this.onClick);
        }

        public close():void {
            this.setVisible(true);
        }

        public initView() {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            let list = ary2prop(info.tbRisk.para);
            this.list_reward.dataSource = list;
             this.list_reward.width = list.length * 80 + this.list_reward.spaceX * (list.length - 1);

            let settab = tb.TB_risk_set.getTabSet();
            this.img_icon0.skin = SkinUtil.getCostSkin(settab.guess_size_cost[0][0]);
            this.img_icon1.skin = SkinUtil.getCostSkin(settab.guess_size_cost[0][0]);
            this.lab_cost0.text = Snums(settab.guess_size_cost[0][1]);
            this.lab_cost1.text = Snums(settab.guess_size_cost[0][1]);
            this.setVisible(true);
        }
        
        private setVisible(visi:boolean):void {
            this.btn_small.visible = this.img_icon0.visible =  this.lab_cost0.visible = visi;
            this.btn_big.visible = this.img_icon1.visible = this.lab_cost1.visible = visi;
            this.imgSaizi.visible = visi;
        }

        private onClick(e: Laya.Event) {
            let info = this.dataSource as DafuwengVo;
            if (!info) return;
            if(info.isExpire()) {
                showToast(LanMgr.getLan('', 10286));
                return;
            }
            let settab = tb.TB_risk_set.getTabSet();
            if (App.getResNum(settab.guess_size_cost[0][0]) < settab.guess_size_cost[0][1]) {
                showToast(LanMgr.getLan('', 10287));
                return;
            }
            let args = {};
            args[Protocol.game_risk_sizeGuess.args.riskKey] = info.key;
            args[Protocol.game_risk_sizeGuess.args.id] = null;
            PLC.request(Protocol.game_risk_sizeGuess, args, (res) => {
                if (!res) return;
                this.setVisible(false);
                info.setAnswer(Number(e.target.name));
                if (res.delRiskKey) {
                    this._model.delRiskInfo([res.delRiskKey]);
                }
                dispatchEvt(new DafuwengEvent(DafuwengEvent.CLICK_CAIDAXIAO), { sdata: res, selectId: Number(e.target.name),key:info.key });
            });
        }


    }
}