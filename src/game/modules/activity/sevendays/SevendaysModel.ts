/**
* name 
*/
module game {
    export class SevendaysModel {
        arrDays: Array<Array<string>>;
        arr2Days: Array<Array<string>>;
        arrImage: Array<Array<number>>;
        arrProJect: Array<Array<string>>;
        arrSevendaysTb: Array<Array<Array<SevenDaysData>>>;
        constructor() {
            this.initArr();
            this.arrImage = [[1, 11], [1, 11], [2, 22], [2, 22], [3, 33], [3, 33]];
            this.arrProJect = [[LanMgr.getLan("",12620), "today_fuli"], [LanMgr.getLan("",12621), "today_mubiao"], 
                                [LanMgr.getLan("",12622), "today_renwu"], [LanMgr.getLan("",12623), "today_qianggou"]
                            ];
            this.arrDays = [[this.getDay(1), "first_day"], [this.getDay(2), "second_day"], [this.getDay(3), "third_day"], 
                            [this.getDay(4), "forth_day"], [this.getDay(5), "fifth_day"], [this.getDay(6), "sixth_day"], [this.getDay(7), "seventh_day"]
                        ];
            this.arr2Days = [[this.getDay(8), "first_day"], [this.getDay(9), "second_day"], [this.getDay(10), "third_day"], 
                            [this.getDay(11), "forth_day"], [this.getDay(12), "fifth_day"], [this.getDay(13), "sixth_day"], [this.getDay(14), "seventh_day"]
                        ];
        }
        public getDay(day:number):string {
            return LanMgr.getLan("",12624,day);
        }

        private static _instance: SevendaysModel;
        public static getInstance(): SevendaysModel {
            if (!this._instance) {
                this._instance = new SevendaysModel();
            }
            return this._instance;
        }

        public initArr() {
            if (this.isOnActivityTime()) {
                this.initArrSevendaysTb();
            }
        }

        /**是否在活动时间 */
        isOnActivityTime(id?: number): boolean {
            let openid = tb.TB_sevendays_times.getActivityOpenId();
            // return (App.serverTime - App.hero.getCreateDayTiem()) / TimeConst.ONE_DAY_MILSEC < 7;
            if (id == undefined) {
                return openid != -1;
            } else {
                return openid == id;
            }
        }

        getArrProJect(day): Array<Array<string>> {
            let arr = JSON.parse(JSON.stringify(this.arrProJect));
            for (let i in arr) {
                arr[i][1] += day;
            }
            return arr;
        }

        /**
         * 更新某天某项排序
         * @param day 某天
         * @param item 某天的某项
         */
        UpdateSevendayByday(day: number, item: number) {
            if (this.arrSevendaysTb[day] && this.arrSevendaysTb[day][item]) {
                this.arrSevendaysTb[day][item].sort((a, b) => { return a.sortNum() - b.sortNum() })
            }
        }

        getRemainingTime(): string {
            let crt = Math.floor((App.serverTime - App.hero.getCreateDayTiem()) / TimeConst.ONE_DAY_MILSEC) + 1;
            let endtime = tb.TB_sevendays_times.getEndTime(crt);
            if (endtime == -1) {
                return LanMgr.getLan("",10224);
            }

            let curTime = new Date(App.serverTimeSecond).getTime();
            let sevenDayTime = this.getLoginDaysTime(endtime);
            if (curTime < sevenDayTime)
                return activityTime(sevenDayTime, curTime);
            else
                return LanMgr.getLan("",10224);
        }

        /** 获取创角的第几天登录的开始时间 0表示第一天*/
        getLoginDaysTime(day: number): number {
            let date = new Date(App.hero.createTime);
            date.setHours(0, 0, 0, 0);
            return date.getTime() / 1000 + (day * TimeConst.ONE_DAY_SEC);
        }


        getFinishTaskNum(): number {
            let num = 0;
            let openid = tb.TB_sevendays_times.getActivityOpenId();
            if (openid != -1) {
                let tab;
                for (let i in App.hero.welfare.sevendayInfo) {
                    tab = tb.TB_activity_sevendays.get_TB_operate_activityById(Number(i));
                    if (tab && openid == tab.time_type) {
                        if (App.hero.welfare.sevendayInfo[i].rewardCount > 0) {
                            num++;
                        }
                    }
                }
            }
            return num;
        }

        // getHeroValue(data:tb.TB_activity_sevendays): number {
        //     switch (data.type) {
        //         //let activityTypeKey : {rechargeSum:1,consumeSum:2,singleRecharge:3,dailyRecharge:4,giftPacks:5,exchange:6,loginSum:7,arenaSum:8,goundSum:9,loginday:10,runeCopy:11,friendPoint:12,sellItem:13,towerCopy:14,godEmploy:15,arenaScore:16,hasLevelGod:17,mainCopy:18,getStarGod:19,getStarAccessory:20,getStarEquip:21,playerLevel:22,godAwaken:23},
        //         //let activityType : {"1":'累计充值',"2":'累计消费',"3":'单笔充值',"4":'每日充值',"5":'超值礼包',"6":'兑换活动',"7":'累计登陆',"8":'竞技场挑战',"9":'地下城挑战',"10":'登陆可领取',"11":'通关作战副本第X关',"12":'赠送好友X次友情点',"13":'出售道具',"14":'试练塔达到第X关',"15":'进行X次高级召唤',"16":'竞技场最高积分达到X分',"17":'拥有X个达到X等级的英雄',"18":'远征通关第X关',"19":'获得X个Y星英雄',"20":'获得X件Y品质的饰品',"21":'获得X件Y品质的装备',"22":'玩家等级达到X级',"23":'觉醒X次英雄'},
        //         case iface.tb_prop.activityTypeKey.loginday://LanMgr.getLan("今日登陆可领取：", -1)
        //             return 0;
        //         case iface.tb_prop.activityTypeKey.playerLevel://LanMgr.getLan('玩家等级达到{0}级({1}/{0})：', -1, data.value, )
        //             return App.hero.level;
        //         case iface.tb_prop.activityTypeKey.rechargeSum://LanMgr.getLan(`累计充值{0}元({1}/{0})：`, -1, data.value, )
        //             return App.hero.welfare.rechargeSum;
        //         case iface.tb_prop.activityTypeKey.getStarGod://LanMgr.getLan(`获得{0}个5星英雄({1}/{0})：`, -1, data.value, )
        //             return App.hero.getGodsByCondition('star', 5);
        //         case iface.tb_prop.activityTypeKey.getStarAccessory://LanMgr.getLan(`获得{0}件紫色饰品({1}/{0})：`, -1, data.value, )
        //             return App.hero.getEquipsOrAccByQuality('Acces', 4);
        //         case iface.tb_prop.activityTypeKey.getStarEquip://LanMgr.getLan(`获得{0}件紫色装备({1}/{0})：`, -1, data.value, )
        //             return App.hero.getEquipsOrAccByQuality('Equip', 4);
        //         case iface.tb_prop.activityTypeKey.hasLevelGod://LanMgr.getLan(`拥有{0}个达到n级的英雄({1}/{0})：`, -1, data.value, )
        //             return App.hero.getGodsByCondition('level', 5);
        //         case iface.tb_prop.activityTypeKey.consumeSum:LanMgr.getLan(`累计消费{0}元({1}/{0})：`, -1, data.value, )
        //             return App.hero.welfare.sevendayInfo[data.ID].condCount;
        //         case iface.tb_prop.activityTypeKey.singleRecharge://LanMgr.getLan(`单笔充值{0}元({1}/{0})：`, -1, data.value, )
        //             return App.hero.welfare.sevendayInfo[data.ID].condCount;
        //         case iface.tb_prop.activityTypeKey.friendPoint:
        //             return LanMgr.getLan(`赠送好友{0}次友情点({1}/{0})：`, -1, data.value, );
        //         case iface.tb_prop.activityTypeKey.dailyRecharge:
        //             return LanMgr.getLan(`累计充值任意金额{0}元({1}/{0})：`, -1, data.value, App.hero.welfare.sevendayInfo[data.ID].condCount);
        //     }
        //     return ;
        // }

        // canGetReward(data: tb.TB_activity_sevendays): boolean {
        //     switch (data.type) {
        //         case iface.tb_prop.activityTypeKey.loginday:
        //             return true;
        //         case iface.tb_prop.activityTypeKey.playerLevel:
        //             return App.hero.level >= data.value;
        //         case iface.tb_prop.activityTypeKey.rechargeSum:
        //             return App.hero.welfare.rechargeSum >= data.value;
        //         case iface.tb_prop.activityTypeKey.getStarGod:
        //             return App.hero.getGodsByCondition('star', 5) >= data.value;
        //         case iface.tb_prop.activityTypeKey.hasLevelGod:
        //             return App.hero.getGodsByCondition('level', 5) >= data.value;
        //         case iface.tb_prop.activityTypeKey.getStarAccessory:
        //             return App.hero.getEquipsOrAccByQuality('Acces', 4) >= data.value;
        //         case iface.tb_prop.activityTypeKey.getStarEquip:
        //             return App.hero.getEquipsOrAccByQuality('Equip', 4) >= data.value;
        //         default:
        //             return App.hero.welfare.sevendayInfo[data.ID].condCount >= data.value;
        //     }
        // }

        //额外奖励列表
        getSevendaysExtList(): SevenDaysExtData[] {
            let sevenDaysExtList: SevenDaysExtData[] = [];
            let openid = tb.TB_sevendays_times.getActivityOpenId();
            if (openid != -1) {
                let tabs = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_sevendays_reward)).data;
                for (let id in tabs) {
                    if (tabs[id].type == openid) {
                        sevenDaysExtList.push(new SevenDaysExtData(tabs[id]));
                    }
                }
                sevenDaysExtList.sort((a, b) => {
                    return a.tbReward.ID - b.tbReward.ID;
                })
            }
            return sevenDaysExtList;
        }

        //奖励列表
        getSevendaysList(period: number, day: number): Array<Array<SevenDaysData>> {
            let data = tb.TB_activity_sevendays.get_TB_operate_activityByDay(period, day);
            let sevenDaysList: Array<Array<SevenDaysData>> = new Array;
            for (let id in data) {
                let arr: SevenDaysData[] = [];
                for (let i in data[id]) {
                    arr.push(new SevenDaysData(data[id][i]));
                }
                arr.sort((a, b) => { return a.sortNum() - b.sortNum() });
                sevenDaysList.push(arr);
            }
            return sevenDaysList;
        }

        private initArrSevendaysTb(): void {
            let openid = tb.TB_sevendays_times.getActivityOpenId();
            if (openid != -1) {
                this.arrSevendaysTb = new Array;
                for (let i = 1; i < 8; i++) {
                    this.arrSevendaysTb.push(this.getSevendaysList(openid, (7 * (openid - 1)) + i));
                }
            }
        }

        canRedPoint(day: number, id: number): boolean {
            if (!this.isOnActivityTime()) return false;
            if (!this.arrSevendaysTb || !this.arrSevendaysTb[day] || !this.arrSevendaysTb[day][id]) return false;
            let list = this.arrSevendaysTb[day][id];
            return list.some((vo: SevenDaysData) => {
                return vo.canReward() && App.serverTimeSecond >= this.getLoginDaysTime(vo.tbReward.day - 1);
            });
        }
    }

    /** 七日额外奖励数据 */
    export class SevenDaysExtData implements inface.IBaoxiangData {
        public tbReward: tb.TB_sevendays_reward;
        constructor(tb: tb.TB_sevendays_reward) {
            this.tbReward = tb;
        }

        /** 是否完成 */
        isFinish(): boolean {
            return SevendaysModel.getInstance().getFinishTaskNum() >= this.tbReward.need_num;
        }

        /** 是否已领取 */
        isReward(): boolean {
            return App.hero.welfare.sevendayExtraAward[this.tbReward.ID] ? true : false;
        }

        /**奖励 */
        getRewardList(): Array<ItemVo> {
            let arr = [];
            for (let i in this.tbReward.reward) {
                arr.push(new ItemVo(this.tbReward.reward[i][0], this.tbReward.reward[i][1]))
            }
            return arr;
        }

        /** 是否可领取 */
        isCanReward(): boolean {
            return this.isFinish() && !this.isReward();
        }

        /** 需要的次数 */
        getCount(): number {
            return this.tbReward.need_num;
        }

        getSkin(): string {
            return "";
        }

        getRewardSkin(): string {
            switch (this.getCount()) {
                case 18:
                case 22:
                    return SkinUtil.getTaskBaoxiang(1, this.isReward());
                case 36:
                case 45:
                    return SkinUtil.getTaskBaoxiang(1, this.isReward());
                case 54:
                case 67:
                    return SkinUtil.getTaskBaoxiang(2, this.isReward());
                case 72:
                case 90:
                    return SkinUtil.getTaskBaoxiang(2, this.isReward());
                case 112:
                case 90:
                    return SkinUtil.getTaskBaoxiang(3, this.isReward());
                default:
                    return SkinUtil.getTaskBaoxiang(4, this.isReward());
            }
        }

        getEvent(): tl3d.BaseEvent {
            return new SevendaysEvent(SevendaysEvent.DRAW_SEVENDAYS_REWARD);
        }

    }

    /** 七日奖励数据 */
    export class SevenDaysData {
        public tbReward: tb.TB_activity_sevendays;
        constructor(tb: tb.TB_activity_sevendays) {
            this.tbReward = tb;
        }

        /**排序 */
        sortNum(): number {
            if (!this.isFinish()) return 1;
            else if (this.canReward()) return 0
            else return 2;
        }

        isBuy(): boolean {
            return this.tbReward.type == iface.tb_prop.activityTypeKey.sellItem;
        }

        /** 是否已领取 */
        isReward(): boolean {
            return App.hero.welfare.sevendayInfo[this.tbReward.ID]
                && App.hero.welfare.sevendayInfo[this.tbReward.ID].rewardCount == 1;
        }

        /** 是否完成 */
        isFinish(): boolean {
            let sevendayInfo = App.hero.welfare.sevendayInfo[this.tbReward.ID];
            if (sevendayInfo) {
                if (this.tbReward.type == iface.tb_prop.activityTypeKey.arenaTopRank) {
                    return App.hero.welfare.sevendayInfo[this.tbReward.ID].condCount != 0 &&
                        App.hero.welfare.sevendayInfo[this.tbReward.ID].condCount <= this.tbReward.value;
                }
                return App.hero.welfare.sevendayInfo[this.tbReward.ID].condCount >= this.tbReward.value;
            }
            else return false;
        }

        /** 是否可领取 */
        canReward(): boolean {
            return (this.isFinish() || this.isBuy()) && !this.isReward();
        }

        /** 描述*/
        getDesc(): string {
            let value: any = this.tbReward.value;
            let condCount = App.hero.welfare.sevendayInfo[this.tbReward.ID]?App.hero.welfare.sevendayInfo[this.tbReward.ID].condCount:0;
            if (this.tbReward.type == iface.tb_prop.activityTypeKey.towerCopy) {
                value = tb.TB_copy_info.get_TB_copy_infoById(value).area_number;
                condCount = condCount == 0 ? 0 : tb.TB_copy_info.get_TB_copy_infoById(condCount).area_number;
            }
            return LanMgr.getLan(this.tbReward.desc, -1, Snums(condCount), Snums(value))
        }
    }
}