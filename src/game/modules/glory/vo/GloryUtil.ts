module game {

    export class GloryUtil {


        constructor() {

        }

        /** 获取本周 某天某时某分 的时间戳 */
        static getFormatTime(week: number, hour: number, minu: number, second: number=0): number {
            let date = new Date();
            date.setTime(App.serverTime);
            date.setHours(0, 0, 0, 0);
            let curSecond = date.getTime() / 1000;
            let curWeek = date.getDay();
            curWeek = curWeek == WeekNum.Sun ? 7 : curWeek;
            let endDayTime = curWeek >= week ? (curSecond - (curWeek - week) * TimeConst.ONE_DAY_SEC) : (curSecond + (week - curWeek) * TimeConst.ONE_DAY_SEC);
            return endDayTime + hour * TimeConst.ONE_HOURS_SEC + minu * 60 + second;
        }

        /** 获取当前阶段 */
        static getCurGroup():number {
            // 为0表示已全部结束
            let curPhase = 0;
            let tbIns = TableData.getInstance();
            let tbData = (<ResTabelVo>tbIns.getTableByName(TableData.tb_honour)).data;
            for(let key in tbData) {
                let tbHonor = tbData[key] as tb.TB_honour;
                let sTime = GloryUtil.getFormatTime(Number(tbHonor.star_time[0]),Number(tbHonor.star_time[1]),Number(tbHonor.star_time[2]));
                let endTime = GloryUtil.getFormatTime(Number(tbHonor.end_time[0]),Number(tbHonor.end_time[1]),Number(tbHonor.end_time[2]));
                if(App.serverTimeSecond >= sTime && App.serverTimeSecond < endTime){
                    curPhase = tbHonor.ID;
                    break;
                }
            }
            if(curPhase == 0){
                curPhase = (<ResTabelVo>tbIns.getTableByName(TableData.tb_honour)).maxId;
            }
            return curPhase;
        }

        /** 根据阶段判断本服或者跨服 */
        static getHonorTypeByGroup(group:number):number {
            let type = [GloryId.benfu_haixuan,GloryId.benfu_16t8,GloryId.benfu_8t4,GloryId.benfu_4t2,GloryId.benfu_juesai,GloryId.kuafu_haixuan].indexOf(group) != -1 ? GroupType.benfu : GroupType.kuafu;
            return type;
        }

        /** 获取阶段开始时间 */
        static getGroupStartTime(group:number):number {
            let tbHonor = tb.TB_honour.getItemById(group);
            return  GloryUtil.getFormatTime(Number(tbHonor.star_time[0]),Number(tbHonor.star_time[1]),Number(tbHonor.star_time[2]));
        }

        /** 获取阶段结束时间 */
        static getGroupEndTime(group:number):number {
            let tbHonor = tb.TB_honour.getItemById(group);
            return GloryUtil.getFormatTime(Number(tbHonor.end_time[0]),Number(tbHonor.end_time[1]),Number(tbHonor.end_time[2]));
        }

        /** 是否在押注时间内(战斗前5分钟不能投注) */
        static isInBetTime(group:number):boolean {
            let stime = GloryUtil.getGroupStartTime(group);
            let endTime = GloryUtil.getGroupEndTime(group);
            let tbSet = tb.TB_honour_set.getSet();
            return App.serverTimeSecond >= stime && App.serverTimeSecond < (endTime - tbSet.bet_endtime);
        }

        /** 是否海选赛 */
        static isHaixuan(group:number):boolean {
            let tbHonor = tb.TB_honour.getItemById(group);
            return tbHonor.ID == GloryId.benfu_haixuan || tbHonor.ID == GloryId.kuafu_haixuan;
        }

        /** 某阶段是否结束 */
        static isEndTime(group:number):boolean {
            let endTime = GloryUtil.getGroupEndTime(group);
            return App.serverTimeSecond >= endTime;
        }

        /** 是否在跨服 */
        static isInKuafu(group:number):boolean {
            return  [GloryId.kuafu_16t8,GloryId.kuafu_8t4,GloryId.kuafu_4t2,GloryId.kuafu_juesai].indexOf(group) != -1;
        }
    }
}