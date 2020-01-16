

module game {

    export class GodDmThread {

        private _model : GodDomainModel;
        constructor() {
            this._model = GodDomainModel.getInstance();
        }
        private static _instance: GodDmThread;
        public static getInstance(): GodDmThread {
            if (!this._instance) {
                this._instance = new GodDmThread();
            }
            return this._instance;
        }

        /** 请求自己队伍信息 */
        requestMyTeamInfo(mask:boolean=true): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!App.IsSysOpen(ModuleConst.GOD_DOMAIN)) {
                    resolve();
                } else {
                    PLC.request(Protocol.friend_group_getGroupInfo, null, ($data) => {
                        if (!$data) return;
                        this._model.updateTeamInfo($data['myGroup'],$data['memberList']);
                        resolve();
                    },mask);
                }
            });
        }

        /** 创建队伍信息 */
        createTeam(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_group_groupCreate, null, ($data) => {
                    if (!$data) return;
                    let model = this._model;
                    model.updateTeamInfo($data['myGroup'],$data['memberList']);
                    model.oneKeyInviteCd = 0;
                    resolve();
                });
            });
        }
        /** 离开队伍 */
        leaveTeam(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_group_groupExit, null, ($data) => {
                    if (!$data) return;
                    this._model.updateTeamInfo($data['myGroup'],$data['memberList']);
                    resolve();
                });
            });
        }
        /** 队员：改变准备状态 */
        changePrepareState(info:GodDmMemberVo,state:number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_setState.args.state] = state;
                PLC.request(Protocol.friend_group_setState, args, ($data) => {
                    if (!$data) return;
                    if(info.isExist()){
                        info.svo.readyTime = $data["readyTime"];
                        info.svo.state = $data["setState"];
                    }
                    resolve();
                });
            });
        }

        // --------------------   队长操作 --------------------
        /** 改变队伍是否可以自动加入 */
        changeJoinState(autoJoin:number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_setJoin.args.autoJoin] = autoJoin;
                PLC.request(Protocol.friend_group_setJoin, args, ($data) => {
                    if (!$data) return;
                    this._model.myTeam.autoJoin = $data['autoJoin'];
                    resolve();
                });
            });
        }
        /** 移交队长 */
        appointCaptain(info:GodDmMemberVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_groupAppoint.args.playerId] = info.svo.playerId;
                PLC.request(Protocol.friend_group_groupAppoint, args, ($data) => {
                    if (!$data) return;
                    this._model.myTeam.appointMember($data["appointId"]);
                    let view = UIMgr.getUIByName(UIConst.GodDm_TeamView) as GodDmTeamView;
                    view.updateView();
                    view.checkState();
                    resolve();
                });
            });
        }
        /** 踢人 */
        kickoutMember(info:GodDmMemberVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_groupKick.args.playerId] = info.svo.playerId;
                PLC.request(Protocol.friend_group_groupKick, args, ($data) => {
                    if (!$data) return;
                    this._model.myTeam.removeMember($data["delMemberId"]);
                    let view = UIMgr.getUIByName(UIConst.GodDm_TeamView) as GodDmTeamView;
                    view.updateView();
                    resolve();
                });
            });
        }
        /** 对换位置 */
        swapMember(source:GodDmMemberVo,target:GodDmMemberVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_setPos.args.src_pos] = source.pos;
                args[Protocol.friend_group_setPos.args.dst_pos] = target.pos;
                PLC.request(Protocol.friend_group_setPos, args, ($data) => {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    this._model.myTeam.swapMember(source,target);
                    resolve();
                });
            });
        }
        /** 一键邀请 */
        oneKeyInvite(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_group_oneKeyInvite, null, ($data) => {
                    if (!$data) return;
                    let instance = this._model;
                    instance.myTeam.updateData($data['memberList']);
                    instance.oneKeyInviteCd = $data['oneKeyInviteCd'];
                    resolve();
                });
            });
        }

        // --------------------  在线所有队伍列表  --------------------
        private _teamRefreshTime : number = 0;
        /** 请求队伍列表信息 */
        requestTeamList(refresh:boolean=false): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // 刷新太频繁
                if(refresh && this._teamRefreshTime > 0 && (App.serverTime - this._teamRefreshTime < 1000)){
                    showToast(LanMgr.getLan("",11015));
                    return;
                }
                PLC.request(Protocol.friend_group_groupList, null, ($data) => {
                    if (!$data) return;
                    if(refresh){
                        this._teamRefreshTime = App.serverTime;
                    }
                    this._model.setTeamList($data['groupList']);
                    resolve();
                });
            });
        }
        /** 加入队伍 */
        joinTeam(info:GodDmTeamListVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_groupJoin.args.groupId] = info.svo.groupId;
                PLC.request(Protocol.friend_group_groupJoin, args, ($data) => {
                    if (!$data) {
                        resolve(false);
                        return;
                    }
                    let instance = this._model;
                    instance.updateTeamInfo($data['myGroup'],$data['memberList']);
                    if(instance.hasTeam()){
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                });
            });
        }

        // --------------------  可邀请的在线好友列表  --------------------
        private _inviteRefreshTime : number = 0;
        /** 获取邀请好友列表 */
        requestInviteList(refresh:boolean=false): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // 刷新太频繁
                if(refresh && this._inviteRefreshTime > 0 && (App.serverTime - this._inviteRefreshTime < 1000)){
                    showToast(LanMgr.getLan("",11015));
                    return;
                }
                PLC.request(Protocol.friend_group_inviteList, null, ($data) => {
                    if (!$data) return;
                    if(refresh){
                        this._inviteRefreshTime = App.serverTime;
                    }
                    this._model.setInviteList($data['inviteList']);
                    resolve();
                });
            });
        }
        /** 邀请好友 */
        inviteFriend(info:GodDmInviteVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let instance = this._model;
                if(instance.myTeam.getMemberByUId(info.svo.playerId)){
                    showToast(LanMgr.getLan("", 10383));
                    resolve();
                    return;
                }
                if(instance.myTeam.getMemberCount() >= 3){
                    showToast(LanMgr.getLan("", 10384));
                    resolve();
                    return;
                }
                let args = {};
                args[Protocol.friend_group_inviteFriend.args.playerId] = info.svo.playerId;
                PLC.request(Protocol.friend_group_inviteFriend, args, ($data) => {
                    if (!$data) return;
                    info.svo.inviteTime = App.serverTimeSecond;
                    resolve();
                });
            });
        }

        // --------------------   组队匹配 --------------------
        /** 展示队伍匹配界面 */
        public showTeamMatchView():void {
            let myTeam = this._model.myTeam;
            if(myTeam.getMemberCount() < 3){
                showToast(LanMgr.getLan("", 10385));
                return;
            }
            if(!myTeam.isAllReady()){
                showToast(LanMgr.getLan("", 10386));
                return;
            }
            this.startMatch().then(()=>{
                UIMgr.showUI(UIConst.GodDm_TeamMatchView);
                if(UIMgr.hasStage(UIConst.GodDm_TeamView)){
                    let view = UIMgr.getUIByName(UIConst.GodDm_TeamView) as GodDmTeamView;
                    view.stopTimeTick();
                }
            });
        }
        /** 开始匹配 */
        startMatch(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_group_startBattle, null, ($data) => {
                    if (!$data) return;
                    this._model.myTeam.regTime = $data['regTime'];
                    resolve();
                });
            });
        }
        /** 取消匹配 */
        cancelMatch(info:GodDmMemberVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let model = this._model;
                let args = {};
                args[Protocol.friend_group_cancelReg.args.regTime] = model.myTeam.regTime;
                PLC.request(Protocol.friend_group_cancelReg, args, ($data) => {
                    if (!$data) return;
                    // 取消匹配时，如果有战报了不能取消，要播放战报
                    if($data.battleReport){
                        resolve($data);
                    }else{
                        let myTeam = model.myTeam;
                        myTeam.regTime = 0;
                        if(!info.isCaptain()){
                            info.svo.readyTime = $data["readyTime"];
                            info.svo.state = $data["setState"];
                        }
                        resolve($data);
                    }
                });
            });
        }

        /** 离开组队界面弹窗 */
        leaveViewAlert():Promise<any>{
            return new Promise<any>((resolve, reject) => {
                // 激战神域在组队过程中离开界面需要弹出确认框
                if(UIMgr.hasStage(UIConst.GodDm_TeamView)){
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan(``,10481), 
                        confirmCb: () => {
                            this.leaveTeam().then(()=>{
                                UIMgr.hideUIByName(UIConst.GodDm_TeamView);
                                resolve();
                            });
                        }, parm: null
                    });
                }else{
                    resolve();
                }
            });
        }

        // --------------------   个人自动匹配 --------------------
        /** 自动匹配 */
        autoMatch(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_group_autoJoin, null, ($data) => {
                    if (!$data) return;
                    this._model.matchTime = $data['matchTime'];
                    resolve();
                });
            });
        }
        /** 取消自动匹配 */
        cancelAutoMatch(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_group_cancelJoin, null, ($data) => {
                    if (!$data) return;
                    let instance = this._model;
                    instance.matchTime = 0;
                    if($data.hasOwnProperty("myGroup")){
                        instance.updateTeamInfo($data['myGroup'],$data['memberList']);
                    }
                    resolve();
                });
            });
        }

        // --------------------   好友邀请组队 --------------------
        /** 显示邀请入队界面 */
        showInviteJoinView():void {
            PLC.request(Protocol.friend_group_getInviteList, null, ($data) => {
                if (!$data) return;
                if(UIMgr.hasStage(UIConst.FightViews)) return;
                let list : any[] = $data["inviteInfo"] ? $data["inviteInfo"] : [];
                if(list.length == 0) return;
                let lastInfo = list[list.length-1];
                if(UIMgr.hasStage(UIConst.GodDm_InviteJoinView)){
                    let view = UIMgr.getUIByName(UIConst.GodDm_InviteJoinView) as InviteJoinView;
                    view.dataSource = lastInfo;
                    view.initView();
                }else{
                    UIMgr.showUI(UIConst.GodDm_InviteJoinView,lastInfo);
                }
            });
        }
        /** 加入好友队伍 */
        joinInvite(playerId:string): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_acceptInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_group_acceptInvite, args, ($data) => {
                    if (!$data) return;
                    resolve();
                });
            });
        }
        /** 拒绝加入好友队伍 */
        refuseInvite(playerId:string): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_refuseInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_group_refuseInvite, args, ($data) => {
                    if (!$data) return;
                    // refuseInviteId
                    resolve();
                });
            });
        }
        /** 今天拒绝加入某好友队伍 */
        todayRefuseJoin(playerId:string,state:number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_group_setInvite.args.playerId] = playerId;
                args[Protocol.friend_group_setInvite.args.state] = state;
                PLC.request(Protocol.friend_group_setInvite, args, ($data) => {
                    if (!$data) return;
                    let state = $data['setInvite'][playerId];
                    resolve(state);
                });
            });
        }
        /** 提示被拒绝 */
        noticeRefuse():void {
            PLC.request(Protocol.friend_group_getRefuseInviteList, null, ($data) => {
                if (!$data) return;
                let list : any[] = $data["refuseInviteList"] ? $data["refuseInviteList"] : [];
                for(let name of list){
                    showToast(LanMgr.getLan("", 10276,name));
                }
            });
        }


    }
}