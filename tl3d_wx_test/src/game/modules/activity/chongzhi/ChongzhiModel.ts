/**
* name 
*/
module game {
    export class ChongzhiModel {
        /** 存要弹出弹窗的数组 */
        rechargeSuccLists: Array<number> = new Array();
        firstRechargeName: Array<Array<string>>;
        firstRechargeData: FirstRechargeData[];
        /** 上次关闭的时间 */
        lastCloseTime: number;

        constructor() {
            this.initFirstData();
            this.firstRechargeName = [["超值首充", "firstRechage_chaozhi"],
            ["豪华首充", "firstRechage_haohua"],
            ["至尊首充", "firstRechage_zhixun"]];
        }
        private static _instance: ChongzhiModel;
        public static getInstance(): ChongzhiModel {
            if (!this._instance) {
                this._instance = new ChongzhiModel();
            }
            return this._instance;
        }

        /** 是否真正支付 */
        public static isRealPay(plat):boolean {
            var typekey=iface.tb_prop.platformTypeKey;
            return [typekey.version,typekey.buddy,typekey.lezhong].indexOf(Number(plat)) != -1;
        }

        /**
         * 支付
         * @param payItem 充值表对应项
         */
        public static pay(item: tb.TB_recharge,succCallback:Function=null): void {
            let pid = Number(window.platform.pid);
            let args = {};
            var typekey=iface.tb_prop.platformTypeKey;
            if(pid == typekey.buddy) {
                let tmm = new Date().getTime();
                let time = Math.floor(tmm / 1000);
                let cpOrderId = String(tmm) + randomNum(5);
                let serverId = window.platform.serverInfo.serverId;
                let sign = hex_md5('cpOrderId=' + cpOrderId +
                    '&gameId=' + BingoSDK.gameId +
                    '&goodsId=' + item.ID +
                    '&goodsName=' + encodeURIComponent(item.desc) +
                    '&money=' + item.recharge_count +
                    '&role=' + App.hero.playerId +
                    '&server=' + serverId +
                    '&time=' + time +
                    '&uid=' + App.hero.puid +
                '&key=' + BingoSDK.payKey);
                args = {
                    gameId:BingoSDK.gameId,uid:App.hero.puid,server:serverId,role:App.hero.playerId,
                    goodsId:item.ID,goodsName:encodeURIComponent(item.desc),money:item.recharge_count,
                    cpOrderId,sign,time
                };
            }else if(pid == typekey.lezhong||pid==typekey.version) {
                let serverId = window.platform.serverInfo.serverId;
                args = {
                    money:item.recharge_count,goodsId:item.ID,goodsName:item.desc,goodsDesc:item.desc,
                    playerId:App.hero.playerId,playerName:App.hero.name,playerLevel:App.hero.level,serverId,serverName:""
                };
            }
            if(Object.keys(args).length > 0) {
                BingoSDK.pay(args, () => {
                    logdebug("充值成功！");
                    if(succCallback){
                        succCallback();
                    }
                });
                window.platform.reportInfo();
            }
        }


        initModel(): void {
        }

        /**初始化首充数据 */
        initFirstData(): void {
            let tbs = tb.TB_first_recharge.get_TB_first_recharge();
            this.firstRechargeData = tbs.map(vo => new FirstRechargeData(vo));
        }

        hasShouChongTip() {
            let data = this.firstRechargeData.findIndex(vo => !vo.isFinish());
            return data != -1;
        }

        /**打开界面显示的那一档 */
        getCurData(): FirstRechargeData {
            let aryData = this.firstRechargeData;
            let data = aryData.find(vo => !vo.isFinish());
            return data ? data : aryData[aryData.length - 1];
        }

        /**获得首充数据
         * @param id id
         */
        getDataById(id: number): FirstRechargeData {
            return this.firstRechargeData[id];
        }

        /**首充奖励是否全部领完 */
        isAllReward(): boolean {
            return !this.firstRechargeData.some(data => !data.isReward())
        }

        /** 充值的vip提升数据--客户端构造 */
        public chongzhiVipData : any = {};
        /** 存充值成功弹窗数据 */
        public arrPushBack(rechargeId: number) {
            let bool: boolean = this.rechargeSuccLists.length == 0;
            this.rechargeSuccLists.push(rechargeId);
            if (bool) this.showPanel(rechargeId);
        }

        /** 删充值成功弹窗数据 */
        public arrPop(): void {
            this.rechargeSuccLists.shift();
            if (this.rechargeSuccLists.length == 0) {
                this.showVipupPanel();
                return;
            }
            let data = this.rechargeSuccLists[0];
            this.showPanel(data);
        }

        /** 打开界面 */
        private showPanel(rechargeId: number): void {
            UIMgr.showUI(UIConst.Topup_SuccView, rechargeId);
        }

        /** 打开vip提升界面 */
        showVipupPanel():void {
            if(this.chongzhiVipData && Object.keys(this.chongzhiVipData).length > 0) {
                UIUtil.showVipupPanel(this.chongzhiVipData)
                this.chongzhiVipData = null;
            }
        }

        /** 首充礼包红点 */
        canRedPoint(id: number) {
            let data = this.firstRechargeData[id];
            if (!!data) return data.canReward();
            return false;
        }

        /** 可以购买的特权礼包数组 */
        private _tequanArr: Array<number> = [];
        /** 该id的等级礼包是否可以购买 */
        isVisibleByid(id: number): boolean {
            this.isEnoughBuyTequan();
            return this._tequanArr.findIndex((vo) => {
                return vo == id;
            }) != -1;
        }

        /** 是否足够货币购买等级特权礼包 */
        isEnoughBuyTequan(): boolean {
            //保存已购买的vip等级礼包数组
            this._tequanArr = [];
            for (let i = 0; i <= App.hero.vip; i++) {
                if (App.hero.welfare.privilegeGiftPack[i]) continue;
                if (this.isEnoughBuyTequanById(i)) {
                    this._tequanArr.push(i);
                }
            }
            if (this._tequanArr.length > 0) return true;
            return false;
        }
        /** 是否足够货币购买指定等级特权礼包 */
        isEnoughBuyTequanById(id: number): boolean {
            let tbVip = tb.TB_vip.get_TB_vipById(id);
            if (tbVip) {
                if (App.isEnough(iface.tb_prop.resTypeKey.diamond, tbVip.now_price)) return true;
            }
            return false;
        }

        /** 特权主红点规则 */
        tequanRedPoint(): boolean {
            return this.isEnoughBuyTequan();
        }
    }

    /**首充数据 */
    export class FirstRechargeData {
        rewards: FirstIRData[];
        tb: tb.TB_first_recharge;
        allrewards: ItemVo[];
        constructor(tb: tb.TB_first_recharge) {
            this.tb = tb;
            this.rewards = this.initReward();
            this.allrewards = [];
            for (let i: number = 0; i < this.rewards.length; i++) {
                this.allrewards = this.allrewards.concat(this.rewards[i].reward);
            }
        }

        /**奖励 */
        initReward(): FirstIRData[] {
            let ary = [];
            let tb = this.tb;
            let id = tb.ID;
            let recharNum = tb.recharge_count;
            for (let day = 1; day < 4; day++) {
                let reward = tb[`reward_${day}`].map(vo => new ItemVo(vo[0], vo[1]));
                ary.push(new FirstIRData(id, day, recharNum, reward));
            }
            return ary;
        }

        /**是否完成*/
        isFinish(): boolean {
            return App.hero.welfare.rechargeSum >= this.tb.recharge_count;
        }

        /**是否已领奖 */
        isReward(): boolean {
            return !this.rewards.some(vo => !vo.isReward());
        }

        /**是否可领奖 */
        canReward(): boolean {
            return this.getCanReardId() != 99;
        }

        /**红点 */
        redPoint(): boolean {
            return !this.rewards[0].isReward();
        }

        /**当前领奖day */
        getCanReardId(): number {
            let data = this.rewards.find(reward => reward.canReward())
            return data ? data.day : 99;
        }

        /**明日再来 */
        isAfterRewardday(): boolean {
            return this.isFinish() && this.getCanReardId() == 99 && !this.isReward();
        }

    }

    /**首充奖励数据 */
    export class FirstIRData {
        id: number;
        day: number;
        reward: ItemVo[];
        recharNum: number;
        constructor(id, day, recharNum, reward) {
            this.id = id;
            this.day = day;
            this.reward = reward;
            this.recharNum = recharNum;
        }

        getRewardId(): number {
            return this.id * 10 + this.day;
        }

        getRechargeTime(): number {
            let time = App.hero.welfare.firstRechargeTime[this.id];
            if (!!time) {
                let date = new Date(time * 1000);
                date.setHours(0, 0, 0, 0);
                return Math.ceil((Date.now() - date.getTime()) / TimeConst.ONE_DAY_MILSEC);
            }
            return null
        }

        /**是否达到领取时间 */
        isOutTime(): boolean {
            let time = this.getRechargeTime();
            return time && time >= this.day;
        }

        /**是否达到充值数目 */
        isRechargeCount(): boolean {
            return App.hero.welfare.rechargeSum >= this.recharNum;
        }

        /**是否已完成 */
        isFinish(): boolean {
            return this.isRechargeCount() && this.isOutTime();
        }

        /**是否已领取 */
        isReward(): boolean {
            let key = this.getRewardId();
            return App.hero.welfare.firstRecharge[key] ? App.hero.welfare.firstRecharge[key] == 1 : false;
                
        }

        /**是否可领取 */
        canReward(): boolean {
            return this.isFinish() && !this.isReward();
        }
    }
}