module game {
    export class OpenServerGiftVo {
        private _timeTemp:tb.TB_gift_time;
        private _giftList:tb.TB_openservice_gift[];

        private _startTime:number = 0;
        private _endTime:number = Number.MAX_VALUE;
        constructor(time:tb.TB_gift_time){
            this._timeTemp = time;
            this._giftList = [];

            this.analysisTime();
        }

        //解析活动时间
        private analysisTime():void{
            switch(this._timeTemp.type){
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    let openTime:number = App.getOpenServerTime();
                    this._startTime = openTime + (this._timeTemp.time[0]-1)*TimeConst.ONE_DAY_SEC;
                    this._endTime = openTime + this._timeTemp.time[1]*TimeConst.ONE_DAY_SEC;
                    break;
            }
        }

        //添加活动
        public addGift(gifttemp:tb.TB_openservice_gift):void{
            if (!gifttemp) return;
            this._giftList.push(gifttemp);
        }

        //开始时间
        public getStartTime():number{
            return this._startTime;
        }

        //结束时间
        public getEndTime():number{
            return this._endTime;
        }

        //是否在活动时间内
        public isActivityTime():boolean{
            let curTime:number = App.getServerTime();
            return this._startTime < curTime && curTime <= this._endTime;
        }

        //获取剩余时间
        public getRemainTime():number{
            if (!this.isActivityTime()) return 0;
            let curTime:number = App.getServerTime();
            return this._endTime - curTime;
        }

        //获取礼包列表
        public getGiftList():tb.TB_openservice_gift[]{
            return this._giftList;
        }



    }
}