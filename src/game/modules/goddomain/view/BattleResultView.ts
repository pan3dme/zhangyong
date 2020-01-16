module game{
    /** 战斗结果界面 */
	export class BattleSettlementView extends ui.goddomain.BattleResultUI{
		constructor(){
			super();
			this.isModelClose = true;
		}

        createChildren():void {
            super.createChildren();
            this.myTeam.renderHandler = new Handler(this,this.itemRender);
            this.enemyTeam.renderHandler = new Handler(this,this.itemRender);
        }

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,false);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            this.myTeam.array = null;
            this.enemyTeam.array = null;
		}

		private initView():void{
			if (this.dataSource) {
				if (this.dataSource.type == playState.VICTORY) {
					AudioMgr.playSound("sound/victory.mp3");
				} else {
					AudioMgr.playSound("sound/defeated.mp3");
				}
			}
            let data : {type,copyVo,vo} = this.dataSource;
            let info: EnterFightVo = data.copyVo;
			let copyvo: game.FightVo = info.vo;
			let infoVo: game.GodDmMyTeamVo = copyvo.godDomainVo;
            this.bgPanel.showTitle(true,"zhandoubiaoxian/duizhanjieguo.png", true, true, true, null, this);
            let responsData : {leftInfo:any[],rightInfo:any[],waveResults:any[],itemData:any[],winCamp:number} = info.responseData;
            // 我是否在左边 
            let selfInLeft : boolean = false;
            let leftAry = [];
            let svrLeftInfo : IGodDomainFightSvo[] = infoVo.leftInfo;
            for(let i = 0 ; i < svrLeftInfo.length ; i++){
                let obj = svrLeftInfo[i];
                let count = responsData.waveResults[1] ? responsData.waveResults[1][i] : 0;
                obj.count = count;
                if(obj.playerId == App.hero.playerId){
                    selfInLeft = true;
                }
                leftAry.push(obj);
            }
            let rightAry = [];
            let svrRightInfo : IGodDomainFightSvo[] = infoVo.rightInfo;
            for(let i = 0 ; i < svrRightInfo.length ; i++){
                let obj = svrRightInfo[i];
                let count = responsData.waveResults[2] ? responsData.waveResults[2][i] : 0;
                obj.count = count;
                rightAry.push(obj);
            }
            // 我方在上面
            this.myTeam.array = selfInLeft ? leftAry : rightAry;
            // 我方在下面
            this.enemyTeam.array = selfInLeft ? rightAry : leftAry;
            // 设置输赢 我方是否输赢
            data.type = (selfInLeft && responsData.winCamp == 1) || (!selfInLeft && responsData.winCamp == 2) ? playState.VICTORY : playState.FAILURE;
            let isSucc : boolean = data.type == playState.VICTORY;
            this.imgResultBg1.skin = isSucc ? SkinUtil.izsy_bg_succ : SkinUtil.izsy_bg_fail;
            this.imgResult1.skin = isSucc ? SkinUtil.lb_victory : SkinUtil.lb_failure;
            this.imgResultBg1.scaleY = isSucc ? 1:-1;

            this.imgResultBg2.skin = isSucc ? SkinUtil.izsy_bg_fail : SkinUtil.izsy_bg_succ;
            this.imgResult2.skin = isSucc ? SkinUtil.lb_failure : SkinUtil.lb_victory;
            this.imgResultBg2.scaleY = isSucc ? 1:-1;
        }

        /** 渲染成员数据 */
        private itemRender(cell:Laya.Box,index:number):void {
            let lbName = cell.getChildByName("lbName") as Laya.Label;
            let lbCount = cell.getChildByName("lbCount") as Laya.FontClip;
            let uihead:common.UserHeadBox1 = cell.getChildByName("ui_head") as common.UserHeadBox1;
            let info : IGodDomainFightSvo = cell.dataSource;
            lbName.text = info.name;
            lbCount.dataSource = info.count;
            lbCount.value = info.count+"";
            uihead.dataSource = new UserHeadVo(info.head, info.level,info.headFrame);
        }
        
        public close(){
            this.bgPanel.closeTitle();
            let curData : {type,copyVo,vo} = this.dataSource;
            let copyData : {type,copyVo,vo} = {type:curData.type,copyVo:curData.copyVo,vo:curData.vo};
			super.close();
			UIMgr.showUI(UIConst.GodDm_BattleSettlementView,copyData);
		}
    }
}