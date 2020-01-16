

module game {

    export class MatchResultView extends ui.arena.match.MatchResultUI {

        constructor(){
            super();
            this.isModelClose = true;
        }

        createChildren():void {
			super.createChildren();
            this.isModelClose = true;
            this.lbSelfScore.autoSize = this.lbSelfChg.autoSize = true;
            this.lbTarScore.autoSize = this.lbTarChg.autoSize = true;
            this.rewardList.renderHandler = Handler.create(this,this.renderItem,null,false);
		}
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            let info: EnterFightVo = this.dataSource;
            let responseData = info ? info.responseData : {};
            let battleEndInfo : {selfChgScore,selfScore,tarChgScore,tarScore} = responseData['battleEndInfo'];
            let isWin = battleEndInfo.selfChgScore > 0;
            
            this.height = !isWin ? 700 : 520;
            this.lbBlank.y = !isWin ? 730 : 550;
            if (isWin) {
				AudioMgr.playSound("sound/victory.mp3");
			} else {
				AudioMgr.playSound("sound/defeated.mp3");
			}
            this.bgPanel.showTitle(isWin,(isWin?SkinUtil.title_shengli:SkinUtil.title_shibai), false, true, false, null,this);
			super.popup(closeOther, false);
			this.initView();
		}
        public close(){
			super.close();
            dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
		}
        public onClosed():void{
			super.onClosed();
            this.rewardList.array = null;
		}

        private _isTz:boolean = false;
        private initView():void {
            let info: EnterFightVo = this.dataSource;
            let copyvo: FightVo = info.vo;
			let matchVo = copyvo.arenaMatchVo;
			if (!matchVo) {
				logerror("fight result error");
				return;
			}
            let responseData = info.responseData;
            let battleEndInfo : {selfChgScore,selfScore,tarChgScore,tarScore} = responseData['battleEndInfo'];
            let isWin = battleEndInfo.selfChgScore > 0;
            let commonData = responseData['commonData'];
            let resAry = [];
            UIUtil.getRewardItemVoList(resAry,commonData)
            this.rewardList.array = resAry;
            this.selfHeadBox.dataSource = new UserHeadVo(App.hero.getHeadId(),App.hero.level,App.hero.headFrame);
            this.lbSelfName.text = App.hero.name;
            this.lbSelfScore.text = battleEndInfo.selfScore;
            this.lbSelfChg.text = battleEndInfo.selfChgScore > 0 ? `(+${battleEndInfo.selfChgScore})` : `(${battleEndInfo.selfChgScore})`;
            this.lbSelfChg.color = isWin ? "#40ff7c" : "#94b4e3"; 
            this.lbSelfScore.event(Laya.Event.RESIZE);

            this.tarHeadBox.dataSource = new UserHeadVo(matchVo.head,matchVo.level,matchVo.headFrame);
            this.lbTarName.text = matchVo.name;
            this.lbTarScore.text = battleEndInfo.tarScore;
            this.lbTarChg.text = battleEndInfo.tarChgScore > 0 ? `(+${battleEndInfo.tarChgScore})` : `(${battleEndInfo.tarChgScore})`;
            this.lbTarChg.color = isWin ? "#94b4e3" : "#40ff7c"; 
            this.lbTarScore.event(Laya.Event.RESIZE);
            this._isTz = false;
            this.channel.visible = this.imgForce.visible = !isWin;
            this.channel.callback = ()=>{
                this._isTz = true;
                this.close();
            };
        }

        private renderItem(cell:Laya.Box,index:number):void {
            let info = cell.dataSource as ItemVo;
            let lbName : Laya.Label = cell.getChildByName("lbName") as Laya.Label;
            let imgRes : Laya.Image = cell.getChildByName("imgRes") as Laya.Image;
            let lbValue : Laya.Label = cell.getChildByName("lbValue") as Laya.Label;
            if(info){
                let item = tb.TB_item.get_TB_itemById(info.id);
				lbName.text = LanMgr.getLan("",12546) + item.name;
				lbValue.text = "+" + info.count;
				imgRes.skin = SkinUtil.getCostSkin(item.ID);
            }
        }

    }
}