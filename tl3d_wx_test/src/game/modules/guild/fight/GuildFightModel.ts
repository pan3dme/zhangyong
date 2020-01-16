

module game {

    export class GuildFightModel {

        private static _instance: GuildFightModel;
		public static getInstance(): GuildFightModel {
			if (!GuildFightModel._instance) {
				GuildFightModel._instance = new GuildFightModel();
			}
			return GuildFightModel._instance;
		}
        public static GRADE_NAME : any = {1:"青铜",2:"白银",3:"铂金",4:"王者"};
		constructor() {
            
		}
        public static BLOOD_BASE = 10000;
        public fightThreadVo : GuildFightThread;
        /** 公会战开启时间 -- 开服第二周周天开启 */
        public openTime : number = 0;

        initModel():void {
            // 开服时间
            let openSvrDate = new Date(App.hero.openSvrTime*1000);
            openSvrDate.setHours(0,0,0,0);
            let time  = openSvrDate.getTime() / 1000;
            let week = openSvrDate.getDay();
            // 离开服第二周周天的天数
            this.openTime = week == WeekNum.Sun ? (time + 7 * 86400) : (time + (7-week+7) * 86400);
            this.myTeamVo = new GuildFightTeamVo(true);
            this.enemyTeamVo = new GuildFightTeamVo(false);
            this.fightThreadVo = new GuildFightThread();
            this.fightThreadVo.requestSeason().then(()=>{
                dispatchEvt(new GuildEvent(GuildEvent.UPDATE_WAR_REDPOINT));
            });
        }
        
        /** 报名时间 */
        public joinTime : number = 0;
        /** 报名的赛季结束时间 */
        public endTime : number = 0;
        /** 报名轮 -- 周一到周六表示第1-6轮 */
        public joinRound : number = 0;
        /** 赛季 */
        public season : number = 0;
        public maxGuildGrade : number = 0;   // 最高段位
        public updateSeason(data:any):void {
            if(data.hasOwnProperty('session')){
                this.season = data['session'];
            }
            if(data.hasOwnProperty('regTime')){
                this.joinTime = data['regTime'];
                this.joinRound = (new Date(this.joinTime*1000)).getDay();
                this.joinRound = this.joinRound == WeekNum.Sat ? WeekNum.Mon : this.joinRound;
                this.endTime = this.getEndTime(this.joinTime);
            }
            if(data.hasOwnProperty('maxGuildGrade')){
                this.maxGuildGrade = data['maxGuildGrade'];
            }
        }

        public myTeamVo : GuildFightTeamVo;
        public enemyTeamVo : GuildFightTeamVo;
        public matchType : number = -1;  // 表明 匹配类型（0：正常匹配，1：人数不足，2：轮空 3:未开始）
        /** 设置比赛数据  */
        setMatchInfo(data:any):void {
            if(!data) return;
            if(data.hasOwnProperty('myInfo')){
                this.myTeamVo.setTeamInfo(data['myInfo']);
            }
            if(data.hasOwnProperty('targetInfo')){
                this.enemyTeamVo.setTeamInfo(data['targetInfo']);
            }
            if(data.hasOwnProperty('matchType')){
                this.matchType = data['matchType'];
            }
            dispatchEvt(new GuildEvent(GuildEvent.UPDATE_MATCH_INFO));
        }
        clearMatchInfo():void{
            
        }


        // 是否报名
        public isJoin():boolean {
            return App.serverTimeSecond < this.endTime;
        }
        /** 第几轮 */
        public getCurRound():number{
            let curDate = new Date(App.serverTime);
            return curDate.getDay();
        }
        // 报名后是否正式比赛时间
        public isStart():boolean {
            if(!this.isInGameTime() || !this.isJoin()){
                return false;
            }
            let joinDate = new Date(this.joinTime);
            let joinHour = joinDate.getHours();
            let joinMinu = joinDate.getMinutes();
            let curDate = new Date(App.serverTime);
            let week = curDate.getDay();
            // 5点半之后是下一天才可以匹配，之前报名当天就可以匹配；
            return (joinHour*60 + joinMinu) >= 330 ? ((week-this.joinRound) > 0) : true;
        }
        
        
        /** 获取下次开赛剩余时间 */
        getNextStartTime():number {
            let joinDate = new Date(this.joinTime);
            let joinHour = joinDate.getHours();
            let joinMinu = joinDate.getMinutes();
            let curDate = new Date(App.serverTime);
            curDate.setHours(6,0,0,0);
            // 5点半之前当前6点就可以开始
            if( (joinHour*60 + joinMinu) < 330 ){
                return curDate.getTime()/1000;
            }else{
                return curDate.getTime()/1000 + 86400;
            }
        }
        
        /** 是否比赛时间段中 -- 每周一到每周六6:00-22:00为比赛期 */
        public isInGameTime():boolean {
            let date = new Date(App.serverTime);
            let week = date.getDay();
            let hour = date.getHours();
            return week > WeekNum.Sun && hour >= tb.TB_guild_war_set.getSet().star_time && hour < tb.TB_guild_war_set.getSet().end_time;
        }
        /** 是否是休息时间 -- 每周一到周六22:00-6:00为休息期 (不包括周一六点前)*/
        public isRestTime():boolean {
            let date = new Date(App.serverTime);
            let week = date.getDay();
            let hour = date.getHours();
            if(week == WeekNum.Mon){
                return hour >= tb.TB_guild_war_set.getSet().end_time;
            }else if(week > WeekNum.Sun){
                return hour < tb.TB_guild_war_set.getSet().star_time ||  hour >= tb.TB_guild_war_set.getSet().end_time;
            }
            return false;
        }
        /** 是否赛季结束时间：休赛期 -- 每周日0点-24点：公会战休赛期，也是下个赛季报名期  */
        public isEndTime():boolean {
            let date = new Date(App.serverTime);
            let week = date.getDay();
            let hour = date.getHours();
            // + 周一六点前
            return week == WeekNum.Sun || (week == WeekNum.Mon && hour < tb.TB_guild_war_set.getSet().star_time);
        }
        
        /** 返回晋级类型 */
        public getUpgradeType(tbDan:tb.TB_dan,rank:number):number{
            if(!tbDan) return GuildUpGradeType.none;
            let rankList = tbDan.result;
            if(!rankList || rankList.length <= 0) return GuildUpGradeType.none;
            if(tbDan.ID == GuildGrade.qingtong){
                    return rank >= rankList[0][0] && rank <= rankList[0][1] ? GuildUpGradeType.up : GuildUpGradeType.keep;
            }else if(tbDan.ID == GuildGrade.wangzhe){
                return GuildUpGradeType.none;
            }else{
                if(rank >= rankList[0][0] && rank <= rankList[0][1]){
                    return GuildUpGradeType.up;
                }else if(rank >= rankList[1][0] && rank <= rankList[1][1]){
                    return GuildUpGradeType.keep;
                }else{
                    return GuildUpGradeType.down;
                }
            }
        }
        /** 获取结束时间(周日00:00结束时间) */
        getEndTime(joinTime:number):number {
            if(joinTime <= 0) return 0;
            let date = new Date();
            date.setTime(joinTime*1000);
            date.setHours(0,0,0,0);
            let week = date.getDay();
            return week == WeekNum.Sat ? ( date.getTime()/1000 + 8*86400) : ( date.getTime()/1000 + (7-week)*86400);
        }

        /** 是否领取过段位宝箱 */
        isRewardByGrade(grade:number):boolean {
            let num = App.hero.guildWarAwardCount[grade];
            return !isNaN(num) && num > 0;
        }
        /** 是否有挑战次数 */
        isHasChallengeCount():boolean {
            if(!this.isOpenGuildWar()) return false;
            if(!this.isStart()) return false;
            let self = this.myTeamVo.getMember(App.hero.playerId);
            return self ? self.svo.atkCount > 0 : false;
        }
        public canRewardRp : boolean = false;
        /** 是否可领取 */
        isCanReward():boolean {
            if(!this.isOpenGuildWar()) return false;
            if(this.canRewardRp) return true;
            let grades = [GuildGrade.baiyin,GuildGrade.bojin,GuildGrade.wangzhe];
            for(let grade of grades) {
                if(this.maxGuildGrade >= grade && !this.isRewardByGrade(grade)){
                    return true;
                }
            }
            return false;
        }

        /** 是否可报名 1. 会长和副会长所在公会可报名（公会30级人数大于10个）2.周六不能报名*/
        isCanJoin():boolean {
            if(!this.isOpenGuildWar()) return false;
            let date = new Date(App.serverTime);
            if(date.getDay() == WeekNum.Sat){
                return false;
            }
            let guildInfo = GuildModel.getInstance().guildInfo;
            if(!guildInfo) return false;
            let tbset = tb.TB_guild_war_set.getSet();
            return guildInfo.job == iface.tb_prop.guildJobTypeKey.president && guildInfo.level >= tbset.role_level && guildInfo.num >= tbset.guild_player_num && !this.isJoin();
        }
        /** 是否开启公会战 */
        isOpenGuildWar():boolean {
            return GuildModel.getInstance().isHasGuild() && App.serverTimeSecond >= this.openTime;
        }
    }
}