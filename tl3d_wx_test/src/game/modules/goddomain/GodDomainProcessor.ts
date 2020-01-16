

module game {

    export class GodDomainProcessor extends tl3d.Processor {

        private _model : GodDomainModel;
        private _thread : GodDmThread;
        constructor() {
            super();
            this._model = GodDomainModel.getInstance();
            this._thread = GodDmThread.getInstance();
        }
        public getName(): string {
            return "GodDomainProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GodDomainEvent(GodDomainEvent.SHOW_GODDOMAIN_VIEW),
                new GodDomainEvent(GodDomainEvent.SHOW_AUTO_MATCH_VIEW),
                new GodDomainEvent(GodDomainEvent.SHOW_RANK_VIEW),
                new GodDomainEvent(GodDomainEvent.SHOW_SHOP_VIEW),
                new GodDomainEvent(GodDomainEvent.SHOW_TEAM_LIST),
                new GodDomainEvent(GodDomainEvent.SHOW_RULE_VIEW),
                new GodDomainEvent(GodDomainEvent.SHOW_BUY_VIEW),
                new GodDomainEvent(GodDomainEvent.CREATE_TEAM_VIEW),
                new GodDomainEvent(GodDomainEvent.JOIN_TEAM),
                new GodDomainEvent(GodDomainEvent.SHOW_BONUS_RULE),
                new GodDomainEvent(GodDomainEvent.SHOW_CHAT_VIEW),
                new GodDomainEvent(GodDomainEvent.START_BATTLE),
                new GodDomainEvent(GodDomainEvent.ONEKEY_INVITE),
                new GodDomainEvent(GodDomainEvent.LEAVE_TEAM),
                new GodDomainEvent(GodDomainEvent.SHOW_INVITE_VIEW),
                new GodDomainEvent(GodDomainEvent.SHOW_PLAYER_INFO),
                new ChatEvent(ChatEvent.ADD_GROUP_CHAT),
                new HudEvent(HudEvent.SET_NAME),
                new HudEvent(HudEvent.UPDATE_POWER),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof GodDomainEvent) {
                switch ($event.type) {
                    case GodDomainEvent.SHOW_GODDOMAIN_VIEW:
                        this.showGoddmView($event.data);
                        break;
                    case GodDomainEvent.SHOW_AUTO_MATCH_VIEW:
                        this.showAutoMatchView();
                        break;
                    case GodDomainEvent.SHOW_RANK_VIEW:
                        this.showRankView();
                        break;
                    case GodDomainEvent.SHOW_SHOP_VIEW:
                        this.showShopView();
                        break;
                    case GodDomainEvent.SHOW_TEAM_LIST:
                        this.showTeamList();
                        break;
                    case GodDomainEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case GodDomainEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case GodDomainEvent.CREATE_TEAM_VIEW:
                        this.createTeamView();
                        break;
                    case GodDomainEvent.JOIN_TEAM:
                        this.joinTeam($event.data);
                        break;
                    case GodDomainEvent.SHOW_BONUS_RULE:
                        this.showBonusRule();
                        break;
                    case GodDomainEvent.SHOW_CHAT_VIEW:
                        this.showChatView();
                        break;
                    case GodDomainEvent.START_BATTLE:
                        this.startBattle($event.data);
                        break;
                    case GodDomainEvent.ONEKEY_INVITE:
                        this.onekeyInvite();
                        break;
                    case GodDomainEvent.LEAVE_TEAM:
                        this.levelTeam();
                        break;
                    case GodDomainEvent.SHOW_INVITE_VIEW:
                        this.showInviteView();
                        break;
                    case GodDomainEvent.SHOW_PLAYER_INFO:
                        this.showPlayerInfo($event.data);
                        break;
                }
            } else if($event instanceof ChatEvent){
                switch ($event.type) {
                    case ChatEvent.ADD_GROUP_CHAT:
                        this.addGroupChat($event.data);
                        break;
                }
            } else if($event instanceof HudEvent){
                switch ($event.type) {
                    case HudEvent.SET_NAME:
                        this.updateName();
                        break;
                    case HudEvent.UPDATE_POWER:
                        this.updateForce();
                        break;
                }
            }
        }
        

        /** 打开界面 */
        private showGoddmView(data:any):void {
            this._thread.requestMyTeamInfo().then(()=>{
                if(this._model.hasTeam()){
                    if(UIMgr.hasStage(UIConst.GodDm_TeamView)){
                        this.teamView.show(false,false);
                    }else{
                        UIMgr.showUI(UIConst.GodDm_TeamView);
                    }
                }else{
                    if(UIMgr.hasStage(UIConst.GodDomainView)){
                        this.domainView.show(false,false);
                    }else{
                        UIMgr.showUI(UIConst.GodDomainView);
                    }
                }
            });
        }
        /** 打开自动匹配界面界面 */
        private showAutoMatchView():void {
            if(!this._model.isInDoubleTime()){
                let cost = tb.TB_fight_goddomain_set.getSet().double_prompt;
                common.AlertBox.showAlert({
                    text: cost, confirmCb: () => {
                        this._thread.autoMatch().then(()=>{
                            UIMgr.showUI(UIConst.GodDm_AutoMatchView);
                        });
                    }, parm: null
                });
            }else{
                this._thread.autoMatch().then(()=>{
                    UIMgr.showUI(UIConst.GodDm_AutoMatchView);
                });
            }
        }

        /** 打开排名界面 */
        private showRankView():void {
            UIMgr.showUI(UIConst.GodDm_RankView);
        }
        /** 打开商城界面 */
        private showShopView():void {
            dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.godDm);
        }
        /** 打开队伍列表界面 */
        private showTeamList():void {
            this._thread.requestTeamList().then(()=>{
                UIMgr.showUI(UIConst.GodDm_TeamListView);
            });
        }
        /** 打开规则界面 */
        private showRuleView():void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20017));
        }
        /** 打开加成规则界面 */
        private showBonusRule():void {
            PLC.request(Protocol.friend_group_getRewardAddInfo,null,($data)=>{
                if (!$data) return;
                let addBonus = $data['rewardAddInfo'];
                let bonus = tb.TB_fight_goddomain_set.getSet().team_bonus;
                UIUtil.showCommonTipView( LanMgr.getLanArr(20016,[],...addBonus,...bonus));
            });
        }
        /** 打开聊天界面 */
        private showChatView():void {
            dispatchEvt(new ChatEvent(ChatEvent.SHOW_CHAT_PANEL),[OpenType.godDm,iface.tb_prop.chatChannelTypeKey.group]);
        }
        /** 打开邀请界面 */
        private showInviteView():void {
            this._thread.requestInviteList().then(()=>{
                UIMgr.showUI(UIConst.GodDm_InviteView);
            });
        }
        /** 打开购买界面 */
        private showBuyView():void {
            if(!UIUtil.checkLimitEnough(iface.tb_prop.limitTypeKey.buyGodDmRewardNum,iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum)){
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {type:common.BuyBattleCountView.TYPE_GODDOMAIN, callback:(num:number)=>{
				let arg = {};
				arg[Protocol.game_common_buyGodDomainRewardNum.args.count] = num;
				PLC.request(Protocol.game_common_buyGodDomainRewardNum,arg,($data)=>{
                        if (!$data) return;
                    });
			}});
        }
        /** 创建队伍界面 */
        private createTeamView():void {
            if(!this._model.isInDoubleTime()){
                let cost = tb.TB_fight_goddomain_set.getSet().double_prompt;
                common.AlertBox.showAlert({
                    text: cost, confirmCb: () => {
                        this._thread.createTeam().then(()=>{
                            UIMgr.showUI(UIConst.GodDm_TeamView);
                            UIMgr.hideUIByName(UIConst.GodDm_TeamListView);
                        });
                    }, parm: null
                });
            }else{
                this._thread.createTeam().then(()=>{
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                    UIMgr.hideUIByName(UIConst.GodDm_TeamListView);
                });
            }
        }
        /** 加入队伍 */
        private joinTeam(info:GodDmTeamListVo):void {
            if(this._model.hasTeam()){
                showToast(LanMgr.getLan("", 10377));
                return;
            }
            if(info.svo.memberNum >= 3){
                showToast(LanMgr.getLan("", 10378));
                let view = UIMgr.getUIByName(UIConst.GodDm_TeamListView) as TeamListView;
                if(view){
                    view.onRefresh();
                }
                return;
            }
            this._thread.joinTeam(info).then((success:boolean)=>{
                if(success){
                    UIMgr.hideUIByName(UIConst.GodDm_TeamListView);
                    UIMgr.showUI(UIConst.GodDm_TeamView);
                }else{
                    let view = UIMgr.getUIByName(UIConst.GodDm_TeamListView) as TeamListView;
                    if(view){
                        view.onRefresh();
                    }
                }
            });
        }
        /** 开始战斗 */
        private startBattle(force:boolean):void {
            if(force || App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) > 0){
                this._thread.showTeamMatchView();
            }else {
                common.AlertBox.showAlert({
                    text: LanMgr.getLan("", 10482), 
                    confirmCb: () => {
                        this._thread.showTeamMatchView();
                    }, parm: null
                });
            }
        }
        
        /** 一键邀请 */
        private onekeyInvite():void {
            if(this._model.myTeam.isAllRealPerson()){
                showToast(LanMgr.getLan("", 10379));
                return;
            }
            let cd = this._model.oneKeyInviteCd;
            if(cd > 0 && App.serverTimeSecond < cd){
                showToast(LanMgr.getLan("", 10380,Math.ceil(cd-App.serverTimeSecond)));
                return;
            }
            this._thread.oneKeyInvite().then(()=>{
                this.teamView.updateView();
            });
        }
        /** 离开队伍 */
        private levelTeam():void {
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10481), 
                confirmCb: () => {
                    this._thread.leaveTeam().then(()=>{
                        UIMgr.showUI(UIConst.GodDomainView);
                    });
                }, parm: null
            });
        }
        /** 显示玩家信息界面 */
        private showPlayerInfo(info:GodDmMemberVo):void {
            let event = new GodDomainEvent(GodDomainEvent.SHOW_GODDOMAIN_VIEW);
            let clientVo = {};
            if(info.isRobot()){
                clientVo['name'] = info.svo.name;
                clientVo['guildName'] = info.svo.guildName;
            }
            dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_INFO_VIEW),{playerId:info.svo.playerId,event,clientVo});
        }

        /** 新增聊天消息 */
        private addGroupChat(chatList:ChatInfoVo[]):void {
            if(UIMgr.hasStage(UIConst.GodDm_TeamView)){
                this.teamView.addNewChats(chatList);
            }
        }
        /** 更新名称 */
        private updateName():void {
            let memberVo = this._model.myTeam.getSelfInfo();
            if(memberVo && memberVo.isExist()){
                memberVo.svo.name = App.hero.name;
            }
            if(UIMgr.hasStage(UIConst.GodDm_TeamView)){
                this.teamView.refreshMemberItem(App.hero.playerId);
            }
            if(UIMgr.hasStage(UIConst.GodDomainView)){
                this.domainView.updateName();
            }
        }
        /** 更新战斗力 */
        private updateForce():void {
            if(UIMgr.hasStage(UIConst.GodDomainView)){
                this.domainView.updateForce();
            }
        }

        get domainView():GodDomainView {
            return UIMgr.getUIByName(UIConst.GodDomainView);
        }
        get teamView():GodDmTeamView {
            return UIMgr.getUIByName(UIConst.GodDm_TeamView);
        }
    }
}