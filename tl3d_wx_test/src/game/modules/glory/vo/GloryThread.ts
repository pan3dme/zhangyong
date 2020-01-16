module game {

    export class GloryThread {

        constructor() {
        }

        /** 请求赛季信息 {session,regTime} */
        static requestSeason(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!App.IsSysOpen(ModuleConst.GLORY_FIGHT)) {
                    resolve();
                } else {
                    PLC.request(Protocol.center_honour_getHonourWarSession, null, ($data) => {
                        if (!$data) return;
                        let model = GloryModel.getInstance();
                        model.updateSeason($data.honourInfo);
                        model.setLastRankList($data.rankList);
                        resolve();
                    });
                }
            });
        }

        /** 请求匹配信息 */
        static requestMatchInfo(group: number,force:boolean=false): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let model = GloryModel.getInstance();
                if (!model.isInGameTime()) {
                    resolve(false);
                    return;
                }
                // 跨服海选阶段 显示本服决赛
                group = group == GloryId.kuafu_haixuan ? GloryId.benfu_juesai : group;
                let svrType = GloryUtil.getHonorTypeByGroup(group);
                let listVo = model.getGroupListVo(svrType);
                if (!force && !listVo.isNeedRequest(group)) {
                    resolve(true);
                    return;
                }
                let args = {};
                args[Protocol.center_honour_getSessionListInfo.args.type] = 0;
                args[Protocol.center_honour_getSessionListInfo.args.stage] = group;
                PLC.request(Protocol.center_honour_getSessionListInfo, args, ($data) => {
                    if(!$data) {
                        showToast(svrType == GroupType.benfu ? LanMgr.getLan(``,10344) : LanMgr.getLan(``,10345));
                        resolve(false);
                        return;
                    }
                    model.setMatchInfo(svrType,group,$data);
                    resolve(true);
                });
            });
        }

        /** 请求上届回顾对战列表 */
        static requestLastList(group:number): Promise<any> {
            return new Promise<any>((resolve) => {
                let model = GloryModel.getInstance();
                if (model.season <= 1) {
                    resolve();
                    return;
                }
                let type = GloryUtil.getHonorTypeByGroup(group);
                let listVo = model.getLastListVo(type);
                if (!listVo.isNeedRequest(group)) {
                    resolve();
                    return;
                }
                let args = {};
                args[Protocol.center_honour_getSessionListInfo.args.type] = 1;
                args[Protocol.center_honour_getSessionListInfo.args.stage] = group;
                PLC.request(Protocol.center_honour_getSessionListInfo, args, ($data) => {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    model.setLastList(type,group,$data);
                    resolve();
                });
            });
        }

        /** 请求选手对决信息 */
        static requestWarInfo(groupVo:MatchGroupListVo,group:number,pos:number):Promise<any>{
            return new Promise((resolve)=>{
                let model = GloryModel.getInstance();
                let season = groupVo.isLastMatch ? model.season-1 : model.season;
                let info = groupVo.getGroupWarInfo(season,group,pos);
                // 不存在 或者 上次请求时未结束，这次请求时间已结束  时需要重新请求
                if( !info || (!info.isHasResult() && info.isEndGroup()) ) {
                    let args = {};
                    args[Protocol.center_honour_getHonourWarInfo.args.stage] = group;
                    args[Protocol.center_honour_getHonourWarInfo.args.type] = groupVo.isLastMatch ? 1 : 0;
                    args[Protocol.center_honour_getHonourWarInfo.args.pos] = pos;
                    PLC.request(Protocol.center_honour_getHonourWarInfo, args, ($data) => {
                        if (!$data) return;
                        groupVo.pushGroupWarInfo($data["warInfo"]);
                        resolve(groupVo.getGroupWarInfo(season,group,pos));
                    });
                    return;
                }
                resolve(info);
            });
        }

        /** 请求阵容数据 */
        static requestUserLineup(userVo:GloryMatchPlayerVo):Promise<any>{
            return new Promise((resolve)=>{
                if(userVo.isHasLineup()){
                    resolve();
                    return;
                }else{
                    let args = {};
                    args[Protocol.center_honour_getHonourWarPlayerData.args.type] = userVo.isLastMatch ? 1 : 0;
                    args[Protocol.center_honour_getHonourWarPlayerData.args.stage] = userVo.stage;
                    args[Protocol.center_honour_getHonourWarPlayerData.args.pos] = userVo.pos;
                    args[Protocol. center_honour_getHonourWarPlayerData.args.playerId] = userVo.playerId;
                    PLC.request(Protocol. center_honour_getHonourWarPlayerData, args, ($data) => {
                        if (!$data) return;
                        let playerInfo = $data['playerInfo'];
                        userVo.setDetailInfo(playerInfo['guildName'],playerInfo['lineupInfo']);
                        resolve();
                    });
                }
            });
        }

        /** 请求阵容数据 */
        static requestLineup(groupVo:MatchGroupVo,isLeft:boolean):Promise<any>{
            return new Promise((resolve)=>{
                let info = isLeft ? groupVo.lUser : groupVo.rUser;
                if(info.isHasLineup()){
                    resolve();
                    return;
                }else{
                    let args = {};
                    args[Protocol.center_honour_getHonourWarPlayerInfo.args.stage] = groupVo.svo.stage;
                    args[Protocol.center_honour_getHonourWarPlayerInfo.args.recordId] = groupVo.svo.recordId;
                    args[Protocol.center_honour_getHonourWarPlayerInfo.args.playerId] = info.playerId;
                    PLC.request(Protocol.center_honour_getHonourWarPlayerInfo, args, ($data) => {
                        if (!$data) return;
                        let playerInfo = $data['playerInfo'];
                        info.setDetailInfo(playerInfo['guildName'],playerInfo['lineupInfo']);
                        resolve();
                    });
                }
            });
        }

        private static _rqGroup : number = -1; // 请求时，当时的比赛阶段，用来判断是否需要重新请求数据
        /** 请求我的比赛匹配列表 */
        static requestMyMatch(): Promise<any> {
            return new Promise<any>((resolve) => {
                let model = GloryModel.getInstance();
                let curPhase = model.updateCurGroup();
                if (this._rqGroup == curPhase) {
                    resolve();
                } else {
                    PLC.request(Protocol.center_honour_getHonourWarMyList, null, ($data) => {
                        if (!$data) {
                            resolve();
                            return;
                        }
                        this._rqGroup = curPhase;
                        model.setMyMatchList($data.myList);
                        resolve();
                    });
                }
            });
        }

    }
}