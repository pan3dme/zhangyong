

module game {

    export class WarriorIR extends ui.task.itemrender.WarriorIRUI {
		constructor() {
			super();
			this.listSpecail.renderHandler = new Handler(this,this.onRenderSpecial);
			this.listReward.renderHandler = new Handler(this,this.onRenderCommon);
		}

		public set dataSource($value:WarriorProveVo) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():WarriorProveVo {
			return this._dataSource;
		}

		public refreshView() {
            let info = this.dataSource;
			if (info) {
                this.lbLv.text = info.tbData.level + "";
                let commonItems = info.tbData.getRewardItems();
                this.listReward.array = commonItems;
                let specialItems = info.tbData.getSpecialItems();
                this.listSpecail.array = specialItems;
                this.btnLingqu.disabled = false;
                let isFinish = info.isFinish();
                let isCanRewardCom = info.isCanRewardCommon();
                let isCanRewardJj = info.isCanRewardJinjie();
                let isUnlock = WarriorProveModel.getInstance().isUnlockJinjie();
                if(isFinish){
                    if(isCanRewardCom){
                        this.btnLingqu.label = LanMgr.getLan("",10041);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor=ColorConst.GREEN_FILTER;
                    }else if(isCanRewardJj){
                        this.btnLingqu.label = commonItems.length == 0 ? LanMgr.getLan("",10041) : LanMgr.getLan("",12001);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor=ColorConst.GREEN_FILTER;
                    }else{
                        if(isUnlock){
                            this.btnLingqu.label = LanMgr.getLan("",10043);
                            this.btnLingqu.skin = SkinUtil.buttonNormal;
                            this.btnLingqu.labelStrokeColor=ColorConst.ORANGE_FILTER;
                            this.btnLingqu.disabled = true;
                        }else{
                            this.btnLingqu.label = commonItems.length == 0 ? LanMgr.getLan("",10041) : LanMgr.getLan("",12001);
                            this.btnLingqu.skin = SkinUtil.buttonNormal;
                            this.btnLingqu.labelStrokeColor=ColorConst.ORANGE_FILTER;
                        }
                    }
                }else{
                    this.btnLingqu.label = LanMgr.getLan("",10045);
                    this.btnLingqu.skin = SkinUtil.buttonNormal;
                    this.btnLingqu.labelStrokeColor=ColorConst.ORANGE_FILTER;
                }
                this.imgRedpoint.visible = info.isCanReward();
                this.btnLingqu.on(Laya.Event.CLICK,this,this.onClick);
			}else{
                this.listReward.array = null;
                this.listSpecail.array = null;
                this.btnLingqu.off(Laya.Event.CLICK,this,this.onClick);
            }
		}

        /** 进阶奖励渲染 */
		private onRenderSpecial(cell:Laya.Box,index:number):void {
            let info = this.dataSource;
            if(!cell || !info) return;
            let itemVo = this.listSpecail.getItem(index);
            let itemBox = cell.getChildByName("itemBox") as common.ItemBox2;
            let imgZhezhao = cell.getChildByName("imgZhezhao") as Laya.Image;
            let imgSuo = cell.getChildByName("imgSuo") as Laya.Image;
            let imgGouxuan = cell.getChildByName("imgGouxuan") as Laya.Image;
            if(itemVo){
                let isUnlock = WarriorProveModel.getInstance().isUnlockJinjie();
                let isReward = info.isHasRewardJinjie();
                itemBox.dataSource = itemVo;
                imgSuo.visible = !isUnlock;
                imgGouxuan.visible = isReward;
                imgZhezhao.visible = !isUnlock || isReward;
            }else{
                itemBox.dataSource = null;
            }
        }   
        /** 普通奖励渲染 */
		private onRenderCommon(cell:Laya.Box,index:number):void {
            let info = this.dataSource;
            if(!cell || !info) return;
            let itemVo = this.listReward.getItem(index);
            let itemBox = cell.getChildByName("itemBox") as common.ItemBox2;
            let imgZhezhao = cell.getChildByName("imgZhezhao") as Laya.Image;
            let imgGouxuan = cell.getChildByName("imgGouxuan") as Laya.Image;
            if(itemVo){
                itemBox.dataSource = itemVo;
                imgGouxuan.visible = imgZhezhao.visible = info.isHasRewardCommon();
            }else{
                itemBox.dataSource = null;
            }
        }

        /** 领取奖励 */
        private onClick():void {
            let info = this.dataSource;
			if (info) {
				dispatchEvt(new TaskEvent(TaskEvent.TO_REWARD_LEVEL),this);
			}
        }
        
	}
}