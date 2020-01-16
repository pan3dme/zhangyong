
module game {

    export class GloryModel {

        constructor() {

        }
        private static _instance: GloryModel;
        public static getInstance(): GloryModel {
            if (!this._instance) {
                this._instance = new GloryModel();
            }
            return this._instance;
        }
        /** 战报 */
        public reportDataDic : any = {};
        /** 测试数据 */
        testChange():void {
            let tbset = tb.TB_honour_set.getSet();
            tbset.match_interval = 20;
            tbset.bet_startime = 30;
            tbset.bet_endtime = 30;

            let date = new Date();
            date.setTime(App.serverTime);
            let curWeek = date.getDay();
            curWeek = curWeek == WeekNum.Sun ? 7 : curWeek;
            let hour = date.getHours();
            let minu = date.getMinutes();
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_honour)).data;
            let lastTb : tb.TB_honour;
			for(let key in tbData) {
				let tbHonor = tbData[key] as tb.TB_honour;
                if(tbHonor.ID == 1 || tbHonor.ID == 6){
                        minu += 2;
                }else{
                    minu += 2;
                }
                tbHonor.star_time = lastTb ? [...lastTb.end_time] : [1,0,0];
                tbHonor.end_time = [curWeek,hour,minu];
                // 间隔30秒发一次,共发两次
                tbHonor.notice_time = lastTb ? [[curWeek,hour,tbHonor.star_time[2]+0.5],[curWeek,hour,tbHonor.star_time[2]+1]] : [[curWeek,hour,minu-1],[curWeek,hour,minu-0.5]];
                lastTb = tbHonor;
			}
            loghgy("测试：更改荣耀之战表数据",tbData);
            this.serverPhase = 1;
            this.initModel();
            this.endJoinTime = this.startGameTime - 60;
        }

        public requestThread : GloryThread;
        /** 是否打开过界面 */
        public isHasShow : boolean = false;
        /** 报名截止时间 */
        public endJoinTime: number = 0;
        /** 开赛时间 */
        public startGameTime : number = 0;
        initModel(): void {
            this.requestThread = new GloryThread();
            this.curPhase = 0;
            this._curMatchDic[GroupType.benfu] = new MatchGroupListVo(GroupType.benfu);
            this._curMatchDic[GroupType.kuafu] = new MatchGroupListVo(GroupType.kuafu);
            this._lastMatchDic[GroupType.benfu] = new MatchGroupListVo(GroupType.benfu);
            this._lastMatchDic[GroupType.kuafu] = new MatchGroupListVo(GroupType.kuafu);
            this.updateTime();
            this.updateCurGroup();
            GloryNoticeMgr.getInstance().startRun();
        }

        /** 更新时间 */
        public updateTime():void {
            // 报名截止时间
            let timeAry = tb.TB_honour_set.getSet().apply_endtime;
            this.endJoinTime = GloryUtil.getFormatTime(Number(timeAry[0]),Number(timeAry[1]),Number(timeAry[2]));
            // 开赛时间
            let tbHonor = tb.TB_honour.getItemById(1);
            timeAry = tbHonor.end_time;
            this.startGameTime = GloryUtil.getFormatTime(Number(timeAry[0]),Number(timeAry[1]),Number(timeAry[2]));
        }

        /** 当前赛季 */
        public season : number = 0;
        /** 当前阶段 */ 
        public curPhase : number = 0;
        public serverPhase : number = 0;    // 服务器的当前阶段：为0表示未开启荣耀之战，大于0表示开启的阶段
        /** 更新赛季信息 */        
        public updateSeason(data:any):void {
            if(data.hasOwnProperty('session')){
                this.season = data['session'];
            }
            if(data.hasOwnProperty("stage")){
                this.serverPhase = data["stage"];
            }
            this.updateCurGroup();
        }
        public updateServerPhase():void {
            this.serverPhase = App.hero.kuafuHonourStage || App.hero.honourStage;
        }
        /** 更新当前阶段 */
        updateCurGroup():number {
            if( this.curPhase <= 0 || App.serverTimeSecond >= GloryUtil.getGroupEndTime(this.curPhase)){
                this.curPhase = GloryUtil.getCurGroup();
            }
            return this.curPhase;
        }
        /** 每周一0点更新 */
        weekRest():void {
            this.updateTime();
            this.updateCurGroup();
            for(let key in this._curMatchDic){
                let vo = this.getGroupListVo(Number(key));
                if(vo){
                    vo.initData();
                }
            }
            this.serverPhase = 0;
            GloryNoticeMgr.getInstance().startRun();
        }

        // ================== 当前赛程 =================
        private _curMatchDic : any = {};   // 当前赛季数据
        /** 设置比赛数据  */
        setMatchInfo(type:number,group:number,data:any):void {
            if(!data) return;
            let listVo : MatchGroupListVo = this._curMatchDic[type];
            listVo.setCurGroup(group);
            listVo.isLastMatch = false;
            listVo.updateMatchList(data["playerPos"],data['baseInfo'],data["winPos"],data["betInfo"]);
        }
        /** 获取列表 通过 本服或者跨服区别 */
        getGroupListVo(type:number):MatchGroupListVo{
            return this._curMatchDic[type];
        }
        /** 获取列表 通过阶段 */
        getGroupListVoByGroup(group:number):MatchGroupListVo{
            let type = GloryUtil.getHonorTypeByGroup(group);
            return this._curMatchDic[type];
        }


        /** 是否已报名 */
        public isJoin(): boolean {
            return App.serverTimeSecond < App.hero.copyInfo.honourWarRegTime;
        }
        /** 是否在报名阶段 */
        public isInJoinTime():boolean{
            return App.serverTimeSecond < this.endJoinTime;
        }
        /** 是否比赛时间段中 */
        public isInGameTime():boolean {
            return App.serverTimeSecond >= this.startGameTime;
        }
        
        // ================== 我的比赛 =================
        private _myMatchList : MatchGroupVo[];
        setMyMatchList(myList:IGloryMatchGroupSVo[]):void {  
            this._myMatchList = [];
            for(let svo of myList){
                if(svo.leftId && svo.rightId){
                    let groupVo = new MatchGroupVo();
                    groupVo.setGroupInfo(svo);
                    groupVo.isMyMatch = true;
                    this._myMatchList.push(groupVo);
                }
            }
            this._myMatchList.sort((a,b)=>{
                return a.sortNum - b.sortNum;
            });
        }
        getMyMatchList():MatchGroupVo[]{
            return this._myMatchList ? this._myMatchList : [];
        }

        // ================== 上届回顾 =================
        private _lastMatchDic : any = {};    // 上届赛季数据
        //设置列表
        setLastList(type:number,group:number,data:any):void {
            if(!data) return;
            let listVo : MatchGroupListVo = this._lastMatchDic[type];
            listVo.setCurGroup(group);
            listVo.isLastMatch = true;
            listVo.updateMatchList(data["playerPos"],data['baseInfo'],data["winPos"],data["betInfo"]);
        }
        /** 获取列表 */
        getLastListVo(type:number):MatchGroupListVo{
            return this._lastMatchDic[type];
        }
        // ================== 上届榜单前三名 =================
        private _lastRankList : common.IPlayerLinuepInfo[];
        getLastRankList():common.IPlayerLinuepInfo[]{
            return this._lastRankList ? this._lastRankList : [];
        }
        setLastRankList(matchList:any[]):void {
            if(!matchList) return;
            this._lastRankList = [];
            for(let i = 0 ; i < matchList.length ; i++){
                let ary = matchList[i];
                // name,force,showGodId,showSkinId,playerId,head,headFrame,sex,level,guildName,lineupInfo
                let vo : common.IPlayerLinuepInfo = {rank:i+1,name:ary[0],force:ary[1],showGodId:ary[2], showSkinId:ary[3],playerId:ary[4],head:ary[5],headFrame:ary[6],sex:ary[7],level:ary[8],guildName:ary[9],
                    getLineupGods: function () {
                    let godArr = [];
                    for (let obj of ary[10][0]) {
                        if (!obj) {
                            godArr.push(null);
                            continue;
                        }
                        let tbGod = tb.TB_god.get_TB_godById(obj[0]);
                        let godVo = new GodItemVo(tbGod);
                        godVo.starLevel = obj[1];
                        godVo.level = obj[2];
                        godVo.dataType = 1;
                        if (obj[3]) {
                            godVo.iSeverAttri = map2ary(obj[3]);
                        }
                        godArr.push(godVo);
                    }
                    return godArr;
                },
                getShenqiAry: function () {
                    return ary[10][1];
                }
            };
                this._lastRankList.push(vo);
            }
        }

        /** 是否可报名 */
        isCanJoin():boolean {
            return this.isOpen() && !this.isJoin() && this.isInJoinTime();
        }
        /** 是否开启 */
        isOpen():boolean {
            return App.IsSysOpen(ModuleConst.GLORY_FIGHT);
        }
        /** 押注提示 */
        getBetNotice():string{
            let stime = tb.TB_honour_set.getSet().bet_endtime;
            return stime >= 60 ? LanMgr.getLan(``,10337,Math.ceil(stime/60)) : LanMgr.getLan(``,10338,stime);
        }
        
       
    }
}