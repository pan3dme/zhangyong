module game{
    export class ExchangeGoldView extends ui.hud.view.ExchangeGoldUI
    {
        /**角色场景 */
		public uiScene: Base2dSceneLayer;
        constructor()
        {
            super();
            this.isModelClose = true;
            this.uiScene = new Base2dSceneLayer();
            this.addChild(this.uiScene);
        }
        
        /** 打开交换金币界面 */
        public show(closeOther?: boolean, showEffect?: boolean): void 
        {
            super.show(closeOther, showEffect);
            this.initView();
        }

        /** 打开交换金币界面 */
        public popup()
        {
            super.popup();
            this.initView();
            this.isModelClose = true;
        }

        public close():void{
            super.close();
            Laya.timer.clearAll(this);
            this.removeEff();
        }

        /** 关闭交换金币界面 */
        public onClosed(): void
        {
            super.onClosed();
            this.ani1.stop();
            this.btn_Duihuan.off(Laya.Event.CLICK, this, this.onExchangeGold);
        }

        /** 初始化界面 */
        private initView()
        {
            this.btn_Duihuan.on(Laya.Event.CLICK, this, this.onExchangeGold);
            //更新数据
            this.updateData();
            this.playEff();

            this.img_bx.skin = "jinbiduihuan/jinbiduihuan02.png";
            this.ani1.play(1, true);
        }

        /** 更新数据 */
        public updateData()
        {
            // 获取玩家已买次数 
            let count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyNum);
            // 获取玩家已买免费次数 
            let freecount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyFreeNum);
            // 可用次数 用总次数减去已买次数
            this.lbCiShu.text =  LanMgr.getLan("",12215) + '  :  ' + (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum) - count - freecount);
            // 获取到第n + 1次的数据(diamond,gold)
            let tbExchangeData = tb.TB_gold_exchange.getDataById(count + 1);
            if(tbExchangeData){
                this.lbGold.text = LanMgr.getLan("",12214) + "  :  " + tbExchangeData.gold;
                if (freecount >= tb.TB_exchange_set.getSet().daily_free){
                    this.lab_consume.text = "X" + tbExchangeData.diamond;
                    this.box_consume.centerX = 0;
                    this.box_consume.visible = true;
                    this.btn_Duihuan.disabled = false;
                    this.btn_Duihuan.label = LanMgr.getLan("",12212);
                }else{
                    //免费
                    this.box_consume.visible = false;
                    this.btn_Duihuan.disabled = false;
                    this.btn_Duihuan.label = LanMgr.getLan("",10511);
                }
                
            }else{
                this.lbGold.text = LanMgr.getLan("",12214) + "  :   0" ;
                this.box_consume.visible = false;
                this.btn_Duihuan.disabled = true;
                this.btn_Duihuan.label = LanMgr.getLan("",12212);
            }

            
        }  

        private _particle: tl3d.CombineParticle
		public playEff() {
			if (this._particle) return;
			this.uiScene.addEffect(this, 1000008, new tl3d.Vector3D(185, 0, -480), 4, 30, ($particle) => {
				this._particle = $particle;
			});
		}

		public removeEff() {
			if (this._particle) {
				this.uiScene.removeEffect(this._particle);
				this._particle = null;
			}
		}      

        /** 按下交换金币按键 */
        private onExchangeGold()
        {
            //总次数
            let totalCount = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum);
            //玩家已交换次数
            let curCount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyNum);
            //玩家已交换次数
            let freecount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyFreeNum);
            

            //次数不足
            if(totalCount - curCount - freecount <= 0)
            {
                showToast(LanMgr.getLan('', 10082));
                return;
            }

            if (freecount >= tb.TB_exchange_set.getSet().daily_free){
                //没有免费次数
                // 获取第n + 1次的数据
                let tbExchangeData = tb.TB_gold_exchange.getDataById(curCount + 1);
                //钻石不足
                if(App.hero.diamond < tbExchangeData.diamond)
                {
                    showToast(LanMgr.getLan('', 10005));
                    dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
                    return;
                }
            }
            
            this.btn_Duihuan.disabled = true;
            this.btn_Duihuan.label = LanMgr.getLan("",12213);
            this.isModelClose = false;
            
            //资源充足请求
            //请求
            PLC.request(Protocol.game_shop_goldBuy, {}, ($data)=>
            {   if (!$data) return;
                this.img_bx.skin = "jinbiduihuan/jinbiduihuan03.png";
                this.ani1.stop();
                 Laya.timer.once(500, this, this.showReward, [$data]);
                //  this.updateData();
                 dispatchEvt(new HudEvent(HudEvent.EXCHANGE_GOLD_CHANGE));
            });
        }

        private showReward($data):void{
            let self = this;
            this.updateData();
            this.isModelClose = true;
            UIUtil.showRewardView($data.commonData, ()=>{
                self.img_bx.skin = "jinbiduihuan/jinbiduihuan02.png";
                self.ani1.play(self.ani1.index, true);
            }, false, UI_DEPATH.TOP);
        }

       

    }
}