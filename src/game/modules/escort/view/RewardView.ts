
module game { 

    export class RewardView extends ui.escort.EscortRewardUI{
        constructor() {
            super();
            this.isModelClose = false;
        }

        createChildren():void {
            super.createChildren();
        }
        
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close():void {
            super.close();
        }

        public onClosed():void {
            super.onClosed();
            this.bgPanel.dataSource = null;
            this.itemList.array = null;
            this.btnReward.off(Laya.Event.CLICK,this,this.onReward);
        }

        private initView():void {
            let tbEscort = tb.TB_escort.getItemById(this.dataSource);
            this.itemList.array = null;
            this.bgPanel.dataSource = {uiName:UIConst.EscortRewardView,closeOnSide:this.isModelClose,closeOnButton:false,title:LanMgr.getLan("",12431)};
            this.btnReward.on(Laya.Event.CLICK,this,this.onReward);
            this.ui_escort.dataSource = new CaravanGoodsVo(tbEscort);
            this.ui_escort.img_select.visible = false;
            /** 更新奖励信息 */
			PLC.request(Protocol.center_escort_getSelfInfo,null,($data)=>{
				if(!$data) {
                    this.itemList.array = tbEscort.getRewardList();
                }else{
                    let info : ICaravanInfoSVo = $data.escortInfo;
                    let allList = [];
                    tbEscort.escort_reward.forEach((ary: any[]) => {
                        let itemVo = new ItemVo(Number(ary[0]), Number(ary[1]));
                        let multiple = info.multiple > 1 ? info.multiple  : 1;
                        itemVo.count *= multiple;
                        if(info.robCount > 0 ){
                            let findVo = tbEscort.escort_loss ? tbEscort.escort_loss.find((vo)=>{
                                return vo[0] == ary[0];
                            }) : null;
                            if(findVo){
                                // 被抢也要翻倍
                                itemVo.count -= (findVo[1] * info.robCount * multiple);
                            }
                        }
                        allList.push(itemVo);
                    });
                    this.itemList.array = allList;
                }

                //布局
                let num:number = this.itemList.array ? this.itemList.array.length : 0;
                let listWidth:number = num > 0 ? (90+this.itemList.spaceX)*num : 0;
                if (listWidth > 548) listWidth = 548;
                this.itemList.x = (this.width - listWidth)/2;

			});
        }

        private onReward():void {
            dispatchEvt(new EscortEvent(EscortEvent.RECEIVE_AWARD));
        }

    }
}