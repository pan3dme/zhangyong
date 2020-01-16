/**
* name 
*/
module game {
    export class TlInfoIR extends ui.activity.timelimitactivity.HuodongRenderUI {
        constructor() {
            super();
            this.btn_receive.on(Laya.Event.CLICK, this, this.onClick);
        }

        private onClick($e: Laya.Event) {
            let clicktag = $e.target as Laya.Button;
            let clickdata = clicktag.dataSource;
            if (clicktag.gray) {
                if (clicktag.label == LanMgr.getLan("",12557)) {
                    showToast(LanMgr.getLan("", 10095));
                }
                if (clicktag.label == LanMgr.getLan("",12603)) {
                    if (clickdata.endtime <= App.getServerTime()) {
                        showToast(LanMgr.getLan("", 10224));
                    } else if (clickdata.condValue <= clickdata.rewardCount) {
                        showToast(LanMgr.getLan("", 10097));
                    } else {
                        showToast(LanMgr.getLan("", 10234));
                    }
                }
                if (clicktag.label.indexOf("￥") != -1) {
                    //前往购买
                    showToast(LanMgr.getLan("", 10126));
                }
                return;
            }

            if (clicktag.label == LanMgr.getLan("", 10090)) {
                showToast(LanMgr.getLan("", 10096));
                return;
            }

            if (clicktag.label == LanMgr.getLan("",12603)) {
                UIMgr.showUI(UIConst.ExchangeItemView, clickdata);
                return;
            }

            let tab: tb.TB_operate_activity = tb.TB_operate_activity.get_TB_operate_activityById(clickdata.id);
            if (clicktag.label == LanMgr.getLan("",12604)) {
                if (tab.way_link) {
                    logdebug('限时活动跳转:', tab.way_link);
                    dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, tab.way_link));
                }
                return;
            }

            if (clicktag.label == LanMgr.getLan("",12605)) {
                dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, [ModuleConst.CHONGZHI]));
                return;
            }

            if (clicktag.label.indexOf("￥") != -1) {
                //前往购买
                // showToast("如需福利请联系商务");
                this.chongzhi(clickdata);
                return;
            }

            if (clickdata.id == TimelimitModel.ACTIVITY_OPENBUY_ID) {
                let args = {};
                args[Protocol.game_activity_getOpenSvrGroupBuyAward.args.id] = clickdata.tbActivity.ID;
                PLC.request(Protocol.game_activity_getOpenSvrGroupBuyAward, args, ($data: any) => {
                    if ($data) {
                        clickdata.modifyData($data);
                        UIUtil.showRewardView($data.commonData);
                        dispatchEvt(new TimelimitEvent(TimelimitEvent.GROUP_RED_EVENT));
                    }
                    clickdata.sort();
                    let timeLimView = UIMgr.getUIByName(UIConst.TimeLimitView) as TimeLimitView;
                    timeLimView.updateList();
                })
                return;
            }

            let args = {};
            args[Protocol.game_activity_getActivityReward.args.id] = clickdata.id;
            args[Protocol.game_activity_getActivityReward.args.num] = 1;
            PLC.request(Protocol.game_activity_getActivityReward, args, ($data: any, msg: any) => {
                if ($data) {
                    clickdata.modifyData($data);
                    UIUtil.showRewardView($data.commonData);
                    dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), tab.time_index);
                }
                this.refreshData(clickdata);
                let timeLimView = UIMgr.getUIByName(UIConst.TimeLimitView) as TimeLimitView;
                timeLimView.updateList();
            })
        }

        private chongzhi(item: OperateActivityVo) {
            let payid = item.getChongZhiIndex();
            if (payid == -1) {
                logerror("充值id异常", payid);
                return;
            }
            let pid = Number(window.platform.pid); 
            if (ChongzhiModel.isRealPay(pid)) {
                let rechargeitem = tb.TB_recharge.get_TB_rechargeById(payid);
                ChongzhiModel.pay(rechargeitem);
            } else {
                UIUtil.payDebug(payid);
            }
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        //竞技场 每日充值 累计消费 地下城 累计登陆 累计充值等
        private GoundSunKey = [
            iface.tb_prop.operateActivityTypeKey.arenaSum,
            iface.tb_prop.operateActivityTypeKey.dailyRecharge,
            iface.tb_prop.operateActivityTypeKey.dailyConsumeSum,
            iface.tb_prop.operateActivityTypeKey.consumeSum,
            iface.tb_prop.operateActivityTypeKey.goundSum,
            iface.tb_prop.operateActivityTypeKey.dailyCopy,
            iface.tb_prop.operateActivityTypeKey.expeditionMax,
            iface.tb_prop.operateActivityTypeKey.mineOccupyNum,
            iface.tb_prop.operateActivityTypeKey.escortCount,
            iface.tb_prop.operateActivityTypeKey.robCount,
            iface.tb_prop.operateActivityTypeKey.mineRobNum,
            iface.tb_prop.operateActivityTypeKey.guildCopy,
            iface.tb_prop.operateActivityTypeKey.advtDispatch,
            iface.tb_prop.operateActivityTypeKey.employ,
            iface.tb_prop.operateActivityTypeKey.door,
            iface.tb_prop.operateActivityTypeKey.runeCopy,
            iface.tb_prop.operateActivityTypeKey.worldBoss,
            iface.tb_prop.operateActivityTypeKey.loginSum,
            iface.tb_prop.operateActivityTypeKey.rechargeSum,
            iface.tb_prop.operateActivityTypeKey.dailyRechargeSum,
        ];

        private refreshData(item: any) {
            if (item) {
                this.img_bg1.visible = this.lab_times.visible = this.img_bg2.visible = this.ui_duihuan.visible = this.lab_title.visible = this.btn_receive.visible = true;
                if (item.id == TimelimitModel.ACTIVITY_OPENBUY_ID) {
                    this.drawGroupRecharge(item);
                    return;
                }
                let tab: tb.TB_operate_activity = tb.TB_operate_activity.get_TB_operate_activityById(item.id);
                // operateActivityTypeKey : {rechargeSum:1,consumeSum:2,singleRecharge:3,dailyRecharge:4,giftPacks:5,exchange:6,loginSum:7,arenaSum:8,goundSum:9,dailyCopy:10,worldBoss:11,expeditionMax:12,mineOccupyNum:13,mineRobNum:14,escortCount:15,robCount:16,advtDispatch:17,guildCopy:18,door:19,employ:20,runeCopy:21},
                // operateActivityType : {"1":'累计充值',"2":'累计消费',"3":'单笔充值',"4":'每日充值',"5":'超值礼包',"6":'兑换活动',"7":'累计登陆',"8":'竞技场挑战',"9":'地下城挑战',"10":'每日副本次数（完成才计算）',"11":'世界BOSS挑战次数',"12":'失落遗迹最高关卡',"13":'神秘宝藏占领次数（成功才计数）',"14":'神秘宝藏掠夺次数（不管胜负）',"15":'护送商队次数',"16":'掠夺商队次数（不管胜负）',"17":'探险次数',"18":'公会副本挑战次数',"19":'神界之门开启次数',"20":'钻石召唤次数',"21":'历练完成次数（成功才计数）'},

                //根据tb_operate_activity的type字段去渲染render
                this.lab_times.color = "#fff9b7";
                this.lab_times.align = 'right';
                this.imgYilingqu.visible = false;
                if (this.GoundSunKey.indexOf(tab.type) != -1) {
                    this.drawGoundSum(tab, item);
                } else if (tab.type == iface.tb_prop.operateActivityTypeKey.exchange) {
                    //兑换活动
                    this.drawExchange(tab, item);
                } else if (tab.type == iface.tb_prop.operateActivityTypeKey.giftPacks) {
                    //超值礼包
                    this.drawGiftPacks(tab, item);
                } else if (tab.type == iface.tb_prop.operateActivityTypeKey.singleRecharge) {
                    //单笔充值
                    this.drawSingleRecharge(tab, item);
                }
            }
        }

        private drawGroupRecharge(item: OperateActivityVo) {
            this.ui_duihuan.visible = this.img_bg2.visible = this.img_bg1.visible = false;
            this.lab_times.color = "#7e5336";
            this.lab_times.align = 'center';
            this.lab_title.text = item.getDesc();
            let ary: Array<ItemVo> = [];
            let rinfos = item.getRewardInfo();
            for (var i = 0; i < rinfos.length; i++) {
                ary.push(new ItemVo(rinfos[i][0], rinfos[i][1]));
            }
            this.list_reward.dataSource = ary;
            this.list_reward.x = 11;

            let isreceive: boolean = item.isReceive();
            let isOver: boolean = item.isOverdue();
            let isComp: boolean = item.isCanReward();

            this.btn_receive.dataSource = item;
            this.btn_receive.gray = isreceive || isOver;
            this.btn_receive.label = isreceive ? LanMgr.getLan("",10043) : isComp ? LanMgr.getLan("",10476) : isOver ? LanMgr.getLan("",12554) : LanMgr.getLan("",12605);
            this.imgYilingqu.visible = isreceive;
            this.lab_times.visible = !isreceive;
            this.btn_receive.visible = !isreceive;
            this.btn_receive.skin = (!isreceive && isComp) ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_receive.selected = this.btn_receive.gray;
            this.btn_receive.labelStrokeColor = !isreceive && isComp ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
            this.lab_times.text = LanMgr.getLan("",12606) + `${App.hero.welfare.openSvrRechargeSum}/${item.tbActivity.condition[0]}`;
            item.sort();

        }

        private drawSingleRecharge(tab: tb.TB_operate_activity, item: OperateActivityVo) {
            this.img_bg2.visible = this.ui_duihuan.visible = false
            this.lab_title.text = LanMgr.getLan(tab.desc, -1, item.getCondValue());
            let ary: Array<ItemVo> = [];
            let rinfos = item.getRewardInfo();
            for (var i = 0; i < rinfos.length; i++) {
                ary.push(new ItemVo(rinfos[i][0], rinfos[i][1]));
            }
            this.list_reward.dataSource = ary;
            this.list_reward.x = 11;

            let canNum = item.getOtherInfo()[0][1] - item.getRewardCount();
            this.lab_times.text = LanMgr.getLan("",12607,canNum);

            let isreceive: boolean = canNum <= 0;
            let isOver: boolean = item.endtime <= App.getServerTime();
            let isComp: boolean = item.getCondCount() > 0;

            this.btn_receive.dataSource = item;
            this.btn_receive.gray = isreceive || isOver;
            this.btn_receive.label = isreceive ? LanMgr.getLan("",10043) : isComp ? LanMgr.getLan("",10476) : isOver ? LanMgr.getLan("",12554) : LanMgr.getLan("",12604);
            this.imgYilingqu.visible = isreceive;
            this.btn_receive.visible = !isreceive;
            //设置排序计数，设置完DataSource后排序
            if (isreceive) {
                item.sortNum = 100000 + item.id;
            } else if (isComp) {
                item.sortNum = item.id;
            } else {
                item.sortNum = 1000 + item.id;
            }
            this.btn_receive.skin = (!isreceive && isComp) ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_receive.selected = this.btn_receive.gray;
            this.btn_receive.labelStrokeColor = !isreceive && isComp ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;

        }

        private drawExchange(tab: tb.TB_operate_activity, item: OperateActivityVo) {
            this.lab_title.visible = false;
            let ary: Array<ItemVo> = [];
            let rinfos = item.getRewardInfo();
            for (var i = 0; i < rinfos.length; i++) {
                ary.push(new ItemVo(rinfos[i][0], rinfos[i][1]));
            }
            this.list_reward.dataSource = ary;
            this.list_reward.x = 160;

            let costnum: number = App.hero.getBagItemNum(item.getOtherInfo()[0][0]);

            this.ui_duihuan.dataSource = new ItemVo(item.getOtherInfo()[0][0], item.getOtherInfo()[0][1]);
            let hasTims = item.getCondValue() - item.getRewardCount();
            this.lab_times.text =LanMgr.getLan("",12607,hasTims);

            this.btn_receive.label = item.endtime <= App.getServerTime() ? LanMgr.getLan("",12557) : LanMgr.getLan("",12603);
            this.btn_receive.gray = costnum < item.getOtherInfo()[0][1] || hasTims <= 0 || item.endtime <= App.getServerTime();
            //设置排序计数，设置完DataSource后排序
            // if(this.btn_receive.gray) {
            //     item.sortNum = item.id + 100000;
            // } else {
            //     item.sortNum = item.id;
            // }
            this.btn_receive.selected = this.btn_receive.gray;
            this.btn_receive.dataSource = item;
            this.btn_receive.skin = SkinUtil.buttonNormal;
            this.btn_receive.labelStrokeColor = ColorConst.ORANGE_FILTER;
        }

        private drawGiftPacks(tab: tb.TB_operate_activity, item: any) {
            this.lab_title.visible = this.img_bg2.visible = this.ui_duihuan.visible = false;
            let ary: Array<ItemVo> = [];
            let rinfos = item.getRewardInfo();
            for (var i = 0; i < rinfos.length; i++) {
                ary.push(new ItemVo(rinfos[i][0], rinfos[i][1]));
            }
            let isOver: boolean = item.endtime <= App.getServerTime();
            this.list_reward.dataSource = ary;
            this.list_reward.x = 11;
            this.btn_receive.gray = item.getOtherInfo()[0] <= item.rewardCount || isOver
            this.btn_receive.selected = this.btn_receive.gray;
            this.btn_receive.dataSource = item;
            this.btn_receive.label = isOver ? LanMgr.getLan("",12557) : "￥" + item.condValue;
            //设置排序计数，设置完DataSource后排序
            if (item.condCount > 0) {
                item.sortNum = item.id;
            } else if (this.btn_receive.gray) {
                item.sortNum = item.id + 100000;
            } else {
                item.sortNum = item.id + 1000;
            }
            this.lab_times.text = LanMgr.getLan("",12608,(item.getOtherInfo()[0] - item.rewardCount));
            this.btn_receive.skin = item.condCount > 0 ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_receive.labelStrokeColor = item.condCount > 0 ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
        }

        private drawGoundSum(tab: tb.TB_operate_activity, item: any) {
            this.img_bg1.visible = this.lab_times.visible = this.img_bg2.visible = this.ui_duihuan.visible = false;
            this.lab_title.text = LanMgr.getLan(tab.desc, -1, item.condValue, item.condCount);
            let ary: Array<ItemVo> = [];
            let rinfos = item.getRewardInfo();
            for (var i = 0; i < rinfos.length; i++) {
                ary.push(new ItemVo(rinfos[i][0], rinfos[i][1]));
            }
            this.list_reward.dataSource = ary;
            this.list_reward.x = 11;

            let isreceive: boolean = item.rewardCount != 0;
            let isOver: boolean = item.endtime <= App.getServerTime();
            let isComp: boolean = item.condCount >= item.condValue;
            if (isComp) this.lab_title.text = LanMgr.getLan(tab.desc, -1, item.condValue, item.condValue);
            this.btn_receive.dataSource = item;
            this.btn_receive.gray = isreceive || isOver;
            if (item.tbActivity.type == 2 || item.tbActivity.type == 7 || item.tbActivity.type == 23) {//累计消费类型 累计登陆类型无法前往
                this.btn_receive.label = isreceive ? LanMgr.getLan("",10043) : isComp ? LanMgr.getLan("",10476) : isOver ? LanMgr.getLan("",12554) : LanMgr.getLan("",10090);//2，7，23
            } else {
                this.btn_receive.label = isreceive ? LanMgr.getLan("",10043) : isComp ? LanMgr.getLan("",10476) : isOver ? LanMgr.getLan("",12554) : LanMgr.getLan("",12604);
            }
            this.imgYilingqu.visible = isreceive;
            this.btn_receive.visible = !isreceive;

            //设置排序计数，设置完DataSource后排序
            if (isreceive) {
                item.sortNum = item.id + 100000;
            } else if (isComp) {
                item.sortNum = item.id;
            } else {
                item.sortNum = item.id + 1000;
            }
            this.btn_receive.skin = (!isreceive && isComp) ? SkinUtil.buttonGreen : SkinUtil.buttonNormal;
            this.btn_receive.selected = this.btn_receive.gray;
            this.btn_receive.labelStrokeColor = (!isreceive && isComp) ? ColorConst.GREEN_FILTER : ColorConst.ORANGE_FILTER;
        }
    }
}
