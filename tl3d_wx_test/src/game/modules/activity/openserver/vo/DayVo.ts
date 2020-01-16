module game {
    export class DayVo {
        public id:number;
        public tab:tb.TB_openservice;
        /**
         * 是否已开放
         */
        public isopen(){
            var now = App.serverTime;
			var createTimeStamp = App.hero.getCreateDayTiem();
			var startTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * (this.id - 1);
			return startTime <= now;
        }
        
        /**
         * 是否在购买时间内
         */
        public canBuy(){
            var now = App.serverTime;
			var createTimeStamp = App.hero.getCreateDayTiem();
			var startTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * (this.id - 1);
			var endTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * OpenserverModel.getInstance().allday;
			return (startTime <= now && endTime > now);
        }

        /**
         * 是否已购买
         */
        public isbuy():boolean{
            let welfare = App.hero.welfare;
            if(welfare.hasOwnProperty("doneOpenGifts") && welfare.doneOpenGifts.indexOf(this.id) != -1){
                return true;
            }
            // if(this.isReceive()){
            //     return true;
            // }
            return false;
        }

        /**
         * 是否已领取奖励
         */
        public isReceive():boolean{
            return this.isbuy();
        }
    }
}