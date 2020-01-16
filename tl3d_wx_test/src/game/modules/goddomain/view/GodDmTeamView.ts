module game{


	export class GodDmTeamView extends ui.goddomain.TeamUI{

		private _memberItems : GodDmMemberIR[];
		private _model : GodDomainModel;
		private _thread : GodDmThread;
		constructor(){
			super();
			this.group = UIConst.hud_group;
		}

		createChildren():void {
			super.createChildren();
			this._thread = GodDmThread.getInstance();
			this._model = GodDomainModel.getInstance();
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GOD_DOMAIN);
		}

		setSize(w:number,h:number):void {
            super.setSize(w,h);
			this.item_0.y = this.item_1.y = this.item_2.y = (h-this.item_0.height)/2 + 40;
			this._memberItems = [this.item_0,this.item_1,this.item_2];
			for(let item of this._memberItems){
				item.uiPos = new Laya.Point(item.x,item.y);
				item.initData();
			}
        }

		public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
			Laya.timer.clearAll(this);
			this.menuUI.onClosed();
			tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateRewardCount,this);
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE,this.updateCoin,this);
			this.btnAdd.off(Laya.Event.CLICK,this,this.onClick);
			this.btnBonus.off(Laya.Event.CLICK,this,this.onClick);
			this.btnChat.off(Laya.Event.CLICK,this,this.onClick);
			this.btnFight.off(Laya.Event.CLICK,this,this.onOperation);
			this.btnInvite.off(Laya.Event.CLICK,this,this.onClick);
			this.btnLeave.off(Laya.Event.CLICK,this,this.onClick);
			this.checkBox.off(Laya.Event.CHANGE,this,this.onChange);
			this.clearMemberList();
			ChatThread.getInstance().stopRequest();
			UIMgr.hideUIByName(UIConst.ChatView);
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		private initView():void{
			let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_shop,callback:this.onShop.bind(this)},
					{btnSkin:SkinUtil.btn_buzhen,callback:this.onBuzhen.bind(this)},
					{btnSkin:SkinUtil.btn_rank,callback:this.onRank.bind(this)},
					{btnSkin:SkinUtil.btn_team,callback:this.onTeam.bind(this)}
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond,iface.tb_prop.resTypeKey.godDomain];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onLeave.bind(this)});
			this.clearMemberList();
			if(this._model.myTeam.isCaptain()){
				for(let item of this._memberItems){
					item.on(Laya.Event.CLICK, this, this.onItemClick);
					item.on(Laya.Event.MOUSE_UP, this, this.onItemClick);
					item.on(Laya.Event.MOUSE_DOWN, this, this.onItemClick);
					item.on(Laya.Event.MOUSE_OUT, this, this.onItemClick);
					item.on(Laya.Event.MOUSE_MOVE, this, this.onItemClick);
				}
			}else{
				for(let item of this._memberItems){
					item.on(Laya.Event.CLICK, this, this.onItemClick);
				}
			}
			this.menuUI.onClosed();
			this.updateView();
			this.checkState();
			this.updateRewardCount();
			this.updateListTick();
			this.btnAdd.on(Laya.Event.CLICK,this,this.onClick);
			this.btnBonus.on(Laya.Event.CLICK,this,this.onClick);
			this.btnChat.on(Laya.Event.CLICK,this,this.onClick);
			this.btnFight.on(Laya.Event.CLICK,this,this.onOperation);
			this.btnInvite.on(Laya.Event.CLICK,this,this.onClick);
			this.btnLeave.on(Laya.Event.CLICK,this,this.onClick);
			this.checkBox.on(Laya.Event.CHANGE,this,this.onChange);
			tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateRewardCount,this);
			ChatThread.getInstance().startAutoRequest(iface.tb_prop.chatChannelTypeKey.all);
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE,this.updateCoin,this);
            this.updateCoin();
        }
		/** 更新界面 */
		public updateView():void {
			let myTeam = this._model.myTeam;
			let list = myTeam.getMemberList();
			for(let i = 0 ; i < 3 ; i++){
				this._memberItems[i].dataSource = list[i];
			}
			let isCaptain = myTeam.isCaptain();
			this.lbBonus.text = LanMgr.getLan("",12323,myTeam.rewardAdd-100);
			this.checkBox.visible = isCaptain;
			this.checkBox.selected = myTeam.isAutoJoin();
			this.btnInvite.visible = isCaptain;
		}
		/** 检测当前自己的状态 */
		public checkState():void {
			let self = this._model.myTeam.getSelfInfo();
			let isCaptain = self.isCaptain();
			this.btnFight.label = isCaptain ? LanMgr.getLan("",12320) : (self.isReady() ? LanMgr.getLan("",12321) : LanMgr.getLan("",12322));
			this.updateTimeTick();
		}

		private updateCoin():void {
            this.lbScore.text = "神域积分：" + this._model.score;
            this.lbCoin.text = "神域币：" + App.hero.godDomain;
        }

		/** 开始定时刷新界面数据 */
        updateListTick(time:number=3000):void {
            Laya.timer.clear(this,this.intervalRefresh);
            Laya.timer.loop(time,this,this.intervalRefresh);
        }
		/** 定时刷新 */
        private intervalRefresh():void {
            this._thread.requestMyTeamInfo(false).then(()=>{
				// 由于异步的，所以界面关闭后会走进来
				if(!UIMgr.hasStage(UIConst.GodDm_TeamView)){
					return;
				}
				if(this._model.hasTeam()){
					let myTeam = this._model.myTeam;
					//  开始匹配 不刷新列表
					if(myTeam.regTime > 0){
						Laya.timer.clear(this,this.intervalRefresh);
						UIMgr.showUI(UIConst.GodDm_TeamMatchView);
					}else {
						this.updateView();
						if(myTeam.isChange || myTeam.autoStartTime > 0){
							this.checkState();
						}
						this.menuUI.checkExist();
					}
				}else{
					showToast(LanMgr.getLan("", 10381));
					UIMgr.showUI(UIConst.GodDomainView);
				}
			});
        }
		/** 更新时间定时器 */
		private updateTimeTick():void {
			Laya.timer.clear(this,this.updateAutoTime);
			Laya.timer.loop(1000,this,this.updateAutoTime);
			this.updateAutoTime();
		}
		public stopTimeTick():void {
			this.lbPrompt.text = LanMgr.getLan("", 10483);
			Laya.timer.clear(this,this.updateAutoTime);
		}
		/** 检测队员准备时间 */
		private updateAutoTime():void {
			let team = this._model.myTeam;
			let self = team.getSelfInfo();
			if(self.isCaptain()){
				this.lbPrompt.visible = true;
				if(team.isAllReady() && team.autoStartTime > 0){
					let time = Math.ceil(team.autoStartTime - App.serverTimeSecond);
					if(time > 0){
						this.lbPrompt.text = LanMgr.getLan("",12319,time);
					}else{
						Laya.timer.clear(this,this.updateAutoTime);
						this.lbPrompt.text = LanMgr.getLan("",12318);
						dispatchEvt(new GodDomainEvent(GodDomainEvent.START_BATTLE),true);
					}
				}else{
					Laya.timer.clear(this,this.updateAutoTime);
					this.lbPrompt.text = LanMgr.getLan("",12318);
				}
			}else{
				if(self.isReady()){
					Laya.timer.clear(this,this.updateAutoTime);
					this.lbPrompt.visible = false;
				}else{
					this.lbPrompt.visible = true;
					let time = Math.ceil(self.svo.readyTime - App.serverTimeSecond);
					if(time > 0){
						this.lbPrompt.text = LanMgr.getLan("",12317,time);
					}else{
						Laya.timer.clear(this,this.updateAutoTime);
						this.lbPrompt.text = LanMgr.getLan("",12317,0);
						this._thread.changePrepareState(self,iface.tb_prop.groupStateTypeKey.yes).then(()=>{
							this.checkState();
							this.lbPrompt.visible = !self.isReady();
						});
					}
				}
			}
		}

		private _clickPoint : Laya.Point;
		/** 拖拽 */
		private onItemClick(e: Laya.Event) {
            let memberItem: GodDmMemberIR = <GodDmMemberIR>e.currentTarget;
			let info = memberItem.dataSource;
			if(!info || !info.isExist()) return;
            if (e.type == Laya.Event.MOUSE_DOWN) {
				this._clickPoint = new Laya.Point(e.stageX,e.stageY);
                this.setChildIndex(memberItem, this.numChildren - 1);
                memberItem.startDrag(new Laya.Rectangle(0, 0, Laya.stage.width-200, Laya.stage.height-470));
				memberItem.startMove();
            } else if (e.type == Laya.Event.MOUSE_UP) {
                memberItem.stopDrag();
				// 没移动过不触发
				if(this._clickPoint && this._clickPoint.x == e.stageX && this._clickPoint.y == e.stageY ){
					return;
				}
                // 目标 -- 移动ui中点的是否在目标内
				let targetItem = this._memberItems.find((item)=>{
					return item.isInInitArea(memberItem.x+100,memberItem.y+195);
				});
				// 落在其他正确位置
				if(targetItem && targetItem != memberItem){
					this._thread.swapMember(info,targetItem.dataSource).then((succ)=>{
						memberItem.stopMove();
						this.updateView();
					});
				}else{
					memberItem.stopMove();
				}
			} else if(e.type == Laya.Event.MOUSE_OUT) {
				// 移开舞台会不触发MOUSE_UP事件，所以需要监听MOUSE_OUT。
				memberItem.stopDrag();
				memberItem.stopMove();
			} else if(e.type == Laya.Event.MOUSE_MOVE) {
				this.menuUI.onClosed();
				memberItem.clearChat();
			} else if(e.type == Laya.Event.CLICK){
				// 点击自己无用
				if(info.isSelf()){
					this.menuUI.onClosed();
					return;
				}
				// 移动过不触发
				if(this._clickPoint && (this._clickPoint.x != e.stageX || this._clickPoint.y != e.stageY) ){
					this.menuUI.onClosed();
					return;
				}
				let self = this._model.myTeam.getSelfInfo();
				if(self.isCaptain()){
					this.menuUI.show({point:new Laya.Point(e.stageX,e.stageY),info});
				}else{
					dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_PLAYER_INFO),info);
				}
			}
		}

		/** 更新奖励次数 */
		private updateRewardCount():void {
			this.lbCount.text = `奖励次数：${App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum)}次`;
		}
		
		private onClick(event:Laya.Event):void {
			let target = event.target;
			if(target == this.btnAdd){
				dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_BUY_VIEW));
			}else if(target == this.btnBonus){
				dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_BONUS_RULE));
			}else if(target == this.btnChat){
				dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_CHAT_VIEW));
			}else if(target == this.btnInvite){
				dispatchEvt(new GodDomainEvent(GodDomainEvent.ONEKEY_INVITE));
			}else if(target == this.btnLeave){
				dispatchEvt(new GodDomainEvent(GodDomainEvent.LEAVE_TEAM));
			}
		}
		/** 战斗、准备（取消） */
		private onOperation():void {
			let self = this._model.myTeam.getSelfInfo();
			if(self.isCaptain()){
				dispatchEvt(new GodDomainEvent(GodDomainEvent.START_BATTLE));
			}else{
				let thread = this._thread;
				let state = self.svo.state == iface.tb_prop.groupStateTypeKey.yes ? iface.tb_prop.groupStateTypeKey.no : iface.tb_prop.groupStateTypeKey.yes;
				if(state == iface.tb_prop.groupStateTypeKey.yes){
					if(App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) <= 0){
						common.AlertBox.showAlert({
							text: LanMgr.getLan(``,10505), 
							confirmCb: () => {
								thread.changePrepareState(self,state).then(()=>{
									this.checkState();
									this.refreshMemberItem(App.hero.playerId);
								});
							}, parm: null
						});
					}else{
						thread.changePrepareState(self,state).then(()=>{
								this.checkState();
								this.refreshMemberItem(App.hero.playerId);
							});
					}
				}else{
					thread.changePrepareState(self,state).then(()=>{
						this.checkState();
					});
				}
			}
		}
		/** 刷新  */
		public refreshMemberItem(playerId:string):void {
			let member = this._memberItems.find((item)=>{
				return item.dataSource && item.dataSource.isExist() && item.dataSource.svo.playerId == playerId;
			});
			if(member){
				member.refreshData();
			}
		}
		/** 设置自动加入 */
		private onChange():void {
			let self = this._model.myTeam.getSelfInfo();
			if(self.isCaptain() && this.checkBox.visible){
				let autoJoin = this.checkBox.selected ? iface.tb_prop.groupJoinTypeKey.yes : iface.tb_prop.groupJoinTypeKey.no;
				this._thread.changeJoinState(autoJoin).then(()=>{
					this.checkBox.selected = this._model.myTeam.isAutoJoin();
				});
			}
		}

		/** 对话 */
		addNewChats(chatList:ChatInfoVo[]):void {
			if(!chatList || chatList.length ==0) return;
			for(let chatVo of chatList){
				let member = this._memberItems.find((item)=>{
					return item.dataSource && item.dataSource.isExist() && item.dataSource.svo.playerId == chatVo.svo.senderId;
				});
				if(member){
					member.addChat(chatVo);
				}
			}
		}

		private clearMemberList():void {
			for(let item of this._memberItems){
				item.off(Laya.Event.MOUSE_UP, this, this.onItemClick);
				item.off(Laya.Event.MOUSE_DOWN, this, this.onItemClick);
				item.off(Laya.Event.MOUSE_OUT, this, this.onItemClick);
				item.off(Laya.Event.MOUSE_MOVE, this, this.onItemClick);
				item.off(Laya.Event.CLICK, this, this.onItemClick);
				item.dataSource = null;
			}
		}
		private onRank(event:Laya.Event):void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_RANK_VIEW));
        }
		private onShop():void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_SHOP_VIEW));
		}
		private onBuzhen():void {
			dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
		}
		private onTeam():void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_TEAM_LIST));
		}
		private onLeave():void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.LEAVE_TEAM));
		}
    }
}