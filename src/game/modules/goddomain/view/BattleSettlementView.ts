module game{
    /** 战斗结算界面 */
	export class BattleSettlement extends ui.goddomain.BattleSettlementUI{
		constructor(){
			super();
			this.isModelClose = true;
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            let data : {type,copyVo,vo} = this.dataSource;
            let isWin = data.type == playState.VICTORY;
            if (isWin){
                 this.bgPanel.showTitle(true,"zhandoubiaoxian/shengli.png", true, true, true, null, this);
            }else{
                 this.bgPanel.showTitle(false,"zhandoubiaoxian/shibai.png",false,true,false, null, this);
            }
            this.bgPanel.height = isWin ? 541 : 726;
            this.height = isWin ? 525 : 710;
            this.closeByBlank.y = isWin ? 540 : 723;
            this.channel.visible = this.imgForce.visible = false;
            super.popup(closeOther,false);
            this.initView();
            this.channel.callback = ()=>{
                this.close();
            };
            this.bgPanel.bg.height = this.height - this.bgPanel.bg.y;	
		}

        createChildren():void {
            super.createChildren();
            this.rewardList.renderHandler = new Handler(this,this.itemRender);
        }

		private initView():void{
			let data : {type,copyVo,vo} = this.dataSource;
            let info: EnterFightVo = data.copyVo;
			// let copyvo: modulefights.FightVo = info.vo;
            let succ = data.type == playState.VICTORY;
			// let infoVo: modulegoddomain.MyTeamInfoVo = copyvo.godDomainVo;
            this.lbCount.text = `奖励次数：${App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum)}次`;
            let responseData : {leftInfo:any[],rightInfo:any[],waveResults:any[],itemData:any[],winCamp:number,mvpInfo:any,scoreInfo:number[]} = info.responseData;
            if(responseData){
                this.rewardList.array = responseData.itemData;
                let mvpInfo : {name,head,level,force,headFrame} = responseData.mvpInfo;
                this.headBox.dataSource = new UserHeadVo(mvpInfo.head,mvpInfo.level,mvpInfo.headFrame);
                this.lbMVP.text = mvpInfo.name;
                this.lbForce.value = mvpInfo.force+"";
                let score = responseData.scoreInfo[0] - responseData.scoreInfo[1];
                this.lbScore.text = `神域积分：${score} +${responseData.scoreInfo[1]}`;
                this.lbScore.y = this.rewardList.y + responseData.itemData.length * 42 + 10;
                this.lbCount.y = this.lbScore.y + 40;
                if (this.channel.visible){
                    this.imgForce.y = this.lbCount.y + 34;
                    this.channel.y = this.imgForce.y + 33;
                    this.height = this.bgPanel.height = this.channel.y + this.channel.height + 40;
                    
                }else{
                    this.height = this.bgPanel.height = this.lbCount.y + 60;
                }
            }else{
                this.rewardList.array = null;
                this.headBox.dataSource = null;
                this.lbMVP.text = this.lbForce.value = this.lbScore.text = "";
            }
        }

        private itemRender(cell:Laya.Box,index:number):void {
            let info : any[] = cell.dataSource;;
            let imgRes : Laya.Image = cell.getChildByName("imgRes") as Laya.Image;
            let lbValue : Laya.Label = cell.getChildByName("lbValue") as Laya.Label;
            let lbExtral : Laya.Label = cell.getChildByName("lbExtral") as Laya.Label;
            if(info){
                let id = Number(info[0]);
                let item = tb.TB_item.get_TB_itemById(id);
                let count = info[1];
                // 只有神域币有加成
                let percent = item.ID == iface.tb_prop.resTypeKey.godDomain ? (GodDomainModel.getInstance().myTeam.rewardAdd/100) : 1;
                let initCount = Math.round(count/percent);
                let addCount = count - initCount;
				// lbName.text = `获得${item.name}：`;
				lbValue.text = "+" + initCount;
                lbExtral.text = addCount > 0 ? `+${addCount}(${LanMgr.getLan("",12326,GodDomainModel.getInstance().myTeam.rewardAdd-100)})` : "";
                lbValue.event(Laya.Event.RESIZE);
                lbExtral.event(Laya.Event.RESIZE);
				imgRes.skin = SkinUtil.getCostSkin(item.ID);
            }
        }

        public onClosed(): void {
			super.onClosed();
			this.rewardList.array = null;
		}
        
        public close(){
			dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
			super.close();
		}
    }
}