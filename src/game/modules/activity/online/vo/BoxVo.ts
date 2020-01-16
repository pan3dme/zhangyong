module game {
    export class BoxVo {
        public id: number;
        public tab: tb.TB_online;
        public needtime: number;

        /** 是否可领取 */
        public canReceive(): boolean {
            //已经在线的秒数
            let lastTime = App.getServerTime() - App.hero.onlineEndTime;
            lastTime += App.hero.totalOnlineTime;
            if (lastTime >= this.needtime) {
                //可以领取
                return true;
            }
            return false;
        }

        /** 是否已领取 */
        public isReceive(): boolean {
            if (App.hero.welfare.hasOwnProperty("onlineTimeAward")) {
                return App.hero.welfare.onlineTimeAward.hasOwnProperty(this.tab.ID) ? (App.hero.welfare.onlineTimeAward[this.tab.ID] == 1) : false;
            } else {
                return false;
            }
        }

        /** 红点判断 */
        public onRedPoint(): boolean {
            return this.canReceive() && !this.isReceive();
        }

        /** 倒计时时间 */
        public onTime(): string {
            //已经在线的秒数
            let lastTime = App.getServerTime() - App.hero.onlineEndTime;
            lastTime += App.hero.totalOnlineTime;
            if (lastTime >= this.needtime) {
                //可以领取
                return "";
            }
            return GameUtil.toCountdown(Math.floor(this.needtime - lastTime), "mm:ss", 2);
        }
    }
}