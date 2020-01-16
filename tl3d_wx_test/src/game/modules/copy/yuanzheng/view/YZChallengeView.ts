

module game {

    export class YZChallengeView extends ui.yuanzheng.ChallengeInfoViewUI{

        private _godItems : BuzhenGodIR[];
        constructor(){
            super();
            
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this._godItems = [];
			for (let i = 0; i < 6; i++) {
				let headBox = this[`godBox${i}`] as BuzhenGodIR; 
				headBox.on(Laya.Event.CLICK,this,this.onShowGodInfo);
				this._godItems.push(headBox)
			}
            this.bgPanel.dataSource = {uiName:UIConst.Yuanzheng_ChallengeView,closeOnSide:this.isModelClose, title:LanMgr.getLan("",12127)};
            this.btnChallenge.on(Laya.Event.CLICK,this,this.onChallenge);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this.rewardList.array = null;
            this.headBox.dataSource = null;
        }

        private initView(): void {
            let info : YZChallengeVo = this.dataSource;
            let reawrds = info.guanqiaVo.tbCopy.getRewardList();
            this.rewardList.array = reawrds;
            this.rewardList.width = reawrds.length * 100 + (reawrds.length - 1) * this.rewardList.spaceX;
            this.lbName.text = info.svo.name;
            this.lbShenli.text = Math.ceil(info.svo.force).toString();
            this.headBox.dataSource = info.headVo;
            let gods = info.getLineupGods();
            let buzhenVoList = gods.map((god)=>{
                if(god){
                    let itemVo = new BuzhenListItemVo(god,iface.tb_prop.lineupTypeKey.expedition);
                    itemVo.showBlood = true;
                    itemVo.hp = info.getEnemyGodHp(god.templateId);
                    itemVo.totalHp = info.getGodTotalHp(god.templateId);
                    return itemVo;
                }
                return null;
            });
            this.setLinueBox(buzhenVoList);
            // 神器
            let ary = info.getShenqiAry();
			let shenqiId = ary && ary.length > 0 ? ary[0] : 0;
            this.imgShenqi.visible = shenqiId > 0;
            if(shenqiId > 0){
                let tbShenqi = tb.TB_artifact.get_TB_artifactById(shenqiId);
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(tbShenqi.icon);
            }
        }

        /**设置阵容数据 */
		private setLinueBox(buzhenVoList:BuzhenListItemVo[]): void {
			let posAry = [];
            buzhenVoList = buzhenVoList ? buzhenVoList : [];
			for (let i = 0; i < 6; i++) {
				let headBox = this._godItems[i];
				let buzhenVo = buzhenVoList[i];
				if (buzhenVo && buzhenVo.godVo){
					headBox.dataSource = buzhenVo;
					headBox.visible = buzhenVo ? true : false;
					posAry.push(buzhenVo.godVo.tab_god.race_type);
				}else{
					headBox.visible = false;
					posAry.push(-1);
				}
			}
			this.guanghuanUI.initView(0,posAry);
		}

        private onShowGodInfo(event:Laya.Event):void {
            let headBox = event.target as BuzhenGodIR;
            if(headBox.dataSource) {
                let buzhenVo : BuzhenListItemVo = headBox.dataSource;
                let godVo = buzhenVo ? buzhenVo.godVo : null;
                if(buzhenVo && godVo){
                    UIUtil.showGodTip(godVo.templateId,{degree:godVo.degree,starLevel:godVo.starLevel,level:godVo.level});
                }
            }
        }

        private onChallenge():void {
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.GOTO_SET_LINUEP,this.dataSource));
        }
    }
}