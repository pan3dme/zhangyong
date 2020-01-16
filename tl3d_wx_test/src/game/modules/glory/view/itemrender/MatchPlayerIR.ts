
module game{
	export class gloryMatchPlayerIR extends ui.glory.iRender.MatchPlayerIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: MatchGroupVo) {
			this._dataSource = $value;
			this.initViewe();
		}

		public get dataSource():MatchGroupVo {
			return this._dataSource;
		}

		public initViewe() {
			let info = this.dataSource;
			if(info){
				this.lbGroup.text = info.getGroupName();
				// 左边
				this.headBox1.dataSource = info.lUser.headVo;
				this.lbName1.text = info.lUser.name;
				this.lbForce1.text = info.lUser.force + "";
				// 右边
				this.headBox2.dataSource = info.rUser.headVo;
				this.lbName2.text = info.rUser.name;
				this.lbForce2.text = info.rUser.force + "";
				this.updateView();
				this.updateBet();
				this.btnPlayback.on(Laya.Event.CLICK,this,this.onPlay);
				this.btnYazhu1.on(Laya.Event.CLICK,this,this.onYazhu1);
				this.btnYazhu2.on(Laya.Event.CLICK,this,this.onYazhu2);
				this.headBox1.on(Laya.Event.CLICK,this,this.onLeft);
				this.headBox2.on(Laya.Event.CLICK,this,this.onRight);
			} else{
				this.btnPlayback.off(Laya.Event.CLICK,this,this.onPlay);
				this.btnYazhu1.off(Laya.Event.CLICK,this,this.onYazhu1);
				this.btnYazhu2.off(Laya.Event.CLICK,this,this.onYazhu2);
				this.headBox1.off(Laya.Event.CLICK,this,this.onLeft);
				this.headBox2.off(Laya.Event.CLICK,this,this.onRight);
			}
		}
		/** 更新胜负 */
		public updateView():void {
			let info = this.dataSource;
			if(info){
				let isEnd = info.isEndGroup();
				this.imgResult1.visible = this.imgResult2.visible = this.lbResult1.visible = this.lbResult2.visible = isEnd;
				this.imgResult1.disabled = info.svo.winner == 2;
				this.imgResult2.disabled = info.svo.winner == 1;
				this.btnPlayback.visible = isEnd;
				this.lbResult1.text = info.svo.winner == 1 ? LanMgr.getLan("",12404) : LanMgr.getLan("",12405);
				this.lbResult2.text = info.svo.winner == 2 ? LanMgr.getLan("",12404) : LanMgr.getLan("",12405);
			}
		}
		/** 更新押注情况 */
		public updateBet():void {
			let info = this.dataSource;
			if(info){
				// 是否结束
				if(info.isEndGroup()){
					this.btnYazhu1.visible = this.btnYazhu2.visible = false;
					this.lbYazhu1.visible = this.lbYazhu2.visible = false;
					if(info.svo.betId == 1){
						this.lbYazhu1.visible = true;
						this.lbYazhu1.text = info.svo.winner == 1 ? LanMgr.getLan("",12406) : LanMgr.getLan("",12407);
					}else if(info.svo.betId == 2){
						this.lbYazhu2.visible = true;
						this.lbYazhu2.text = info.svo.winner == 2 ? LanMgr.getLan("",12406) : LanMgr.getLan("",12407);
					}
				}else{
					this.btnYazhu1.disabled = this.btnYazhu2.disabled = false;
					this.btnYazhu1.visible = this.btnYazhu2.visible = true;
					this.lbYazhu1.visible = this.lbYazhu2.visible = false;
					if(info.svo.betId == 1){
						this.btnYazhu1.label = LanMgr.getLan("",12408);
						this.btnYazhu1.disabled = true;
						this.btnYazhu2.visible = false;
					}else if(info.svo.betId == 2){
						this.btnYazhu2.label = LanMgr.getLan("",12408);
						this.btnYazhu2.disabled = true;
						this.btnYazhu1.visible = false;
					}else{
						if(info.isInBetTime()) {
							this.btnYazhu1.label = this.btnYazhu2.label = LanMgr.getLan("",12409);
						}else{
							this.btnYazhu1.visible = this.btnYazhu2.visible = false;
						}
					}
				}
			}
		}
		/** 回放 */
		private onPlay():void {
			dispatchEvt(new GloryEvent(GloryEvent.SHOW_PLAYBACK),this.dataSource);
		}
		/** 押注左边 */
		private onYazhu1():void {
			dispatchEvt(new GloryEvent(GloryEvent.BET_PLAYER),[true,this]);
		}
		/** 押注右边 */
		private onYazhu2():void {
			dispatchEvt(new GloryEvent(GloryEvent.BET_PLAYER),[false,this]);
		}
		/** 显示左边玩家阵容 */
		private onLeft():void {
			let info = this.dataSource;
			if(info && info.lUser){
				GloryThread.requestLineup(info,true).then(()=>{
					dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_LINEUP_VIEW),info.lUser);
				});
			}
		}
		/** 显示右边玩家阵容 */
		private onRight():void {
			let info = this.dataSource;
			if(info && info.rUser){
				GloryThread.requestLineup(info,false).then(()=>{
					dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_LINEUP_VIEW),info.rUser);
				});
			}
		}

	}
}