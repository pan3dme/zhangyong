/**
* name 
*/
module game {
    export class XiangouLibaoView extends ui.activity.huodong.welfare.tab.XianGouLibaoUI {
        private _curType: number;
        constructor() {
            super();
        }

        public onEnter(type: number): void {
            this._curType = type;
            this.initView();
            Laya.timer.callLater(this, () => {
                UIUtil.playListEff(this.listLibao.cells);
            });
        }
        public onExit() {
            this.close();
            UIUtil.clearListEff(this.listLibao.cells);
        }
        public close(): void {
            this._curType = 0;
            Laya.timer.clearAll(this);
        }

        private _endTime: number;
        public initView() {
            if ([WelfareType.dayLibao, WelfareType.weekLibao, WelfareType.monthLibao].indexOf(this._curType) == -1) return;
            let dataAry = [];
            let date = new Date();
            date.setTime(App.serverTime);
            if (this._curType == WelfareType.dayLibao) {
                dataAry = tb.TB_daily_recharge.getAllTB();
                date.setDate(date.getDate() + 1);
                date.setHours(0, 0, 0, 0);
                this._endTime = date.getTime() / 1000;
            } else if (this._curType == WelfareType.weekLibao) {
                dataAry = tb.TB_week_recharge.getAllTB();
                let week = date.getDay();
                let addDay = week == WeekNum.Sun ? 1 : (7 - week + 1);
                date.setDate(date.getDate() + addDay);
                date.setHours(0, 0, 0, 0);
                this._endTime = date.getTime() / 1000;
            } else if (this._curType == WelfareType.monthLibao) {
                dataAry = tb.TB_month_recharge.getAllTB();
                date.setMonth(date.getMonth() + 1);
                date.setDate(1);
                date.setHours(0, 0, 0, 0);
                this._endTime = date.getTime() / 1000;
            }
            this.listLibao.array = dataAry;
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        }


        private updateTime(): void {
            let time = Math.ceil(this._endTime - App.serverTimeSecond);
            if (time > 0) {
                let day = Math.floor(time / TimeConst.ONE_DAY_SEC);
                time = time - day * TimeConst.ONE_DAY_SEC;
                let hours = Math.floor(time / TimeConst.ONE_HOURS_SEC);
                time = time - hours * TimeConst.ONE_HOURS_SEC;
                let mini = Math.ceil(time / 60);
                this.lbTime.text = day > 0 ? `倒计时：${day}天${hours}时` : `倒计时：${hours}时${mini}分`;
            } else {
                this.lbTime.text = `倒计时：0时0分`;
                Laya.timer.clearAll(this);
            }

            this.img_time.x = this.lbTime.x - 25;
        }
    }
}