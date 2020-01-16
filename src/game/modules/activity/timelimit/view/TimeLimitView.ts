module game {
    export class TimeLimitView extends ui.activity.timelimitactivity.TimeLimitActivityUI {
        private _model = TimelimitModel.getInstance();
        private _xianshiItem: ItemVo;
        private _xianshiIR: game.xianshiIR;
        constructor() {
            super();
            // this.group = UIConst.hud_group;
            // this.btn_add.on(Laya.Event.CLICK, this, this.add);
            // this.btn_max.on(Laya.Event.CLICK, this, this.max);
            // this.btn_buy.on(Laya.Event.CLICK, this, this.buy);
            // this.btn_red.on(Laya.Event.CLICK, this, this.red);
            this.isModelClose = true;
            this.list_tab.selectHandler = new Handler(this, this.onTabSelect);
            this.list_tab.renderHandler = new Handler(this, this.onTabRender);
            this.lab_time.autoSize = true;
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;

            this.btn_add_zuanshi.on(Laya.Event.CLICK, this, this.onclick);
            this.btn_addgold.on(Laya.Event.CLICK, this, this.onclick);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        public onOpened() {
            super.onOpened();
        }

        private init() {
            this.img_bg.height = this.height - 365;
            this.list_item.height = Math.min(this.height - 651, 781);
            this.setTab(this._model.getTabMap())
            this.onTabSelect(0)
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.onItemChange, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
        }

        public setTab($tabmap) {
            this.list_tab.dataSource = map2ary($tabmap);
            this.list_tab.selectedIndex = 0;
            this.list_tab.array.length > 5;
        }


        /** 更新资源 (页面显示该商店所需要的资源图标 + 玩家拥有数目)*/
        private onUpdateRes(): void {
            let curTab = this.list_tab.dataSource[this._selectTabNum][0];
            let link = this.list_tab.dataSource[this._selectTabNum][1].link || 0;//页签
            this.lab_has2.visible = [TimelimitModel.ACTIVITY_OPENBUY_ID].indexOf(curTab) != -1;
            this.box_cost.visible = true;
            this.boxRes.width = 471;
            //玩家拥有的币种数量(都进行容错判断下)
            if ((curTab == 99) || link == iface.tb_prop.operateActivityTypeKey.exchange) {
                let sdata = this._model.getTabActivity(curTab);
                if (sdata && sdata[0]) {
                    this._xianshiItem = TimelimitModel.getChangeItem(sdata[0].tbActivity.time_index);
                }
                if (this._xianshiItem) {
                    this.imgCost.skin = SkinUtil.getExchangeConsume(this._xianshiItem.id);
                    this.lbNum.text = App.hero.getBagItemNum(this._xianshiItem.id) + "";
                }
            } else {
                this.lbNum.text = '';
                this.box_cost.visible = false;
                this.boxRes.width = 312;
            }
            this.lab_zuanshi.text = Snums(App.hero.diamond);
            this.lab_money.text = Snums(App.hero.gold);
        }


        private _selectTabNum: number;
        private onTabSelect($index: number) {
            if (this._selectTabNum == $index) return;
            this._selectTabNum = $index;
            this.showSelectTab(true);
        }

        private onTabRender($cell: TlTabIR, $index: number) {
            // $cell.btn_tab.selected = $index == this._selectTabNum;
            $cell.selectBox.selected = $index == this._selectTabNum;
        }

        private hideXianshi() {
            if (this._xianshiIR && this._xianshiIR.parent) {
                this._xianshiIR.onExit();
                this._xianshiIR.removeSelf();
            }
        }

        private onItemChange(): void {
            if (this.list_tab.dataSource[this._selectTabNum] && this.list_tab.dataSource[this._selectTabNum][1].link == iface.tb_prop.operateActivityTypeKey.exchange) {
                //兑换
                this.refreshExchangeSort();
                this.updateList();
            }

            this.onUpdateRes();
        }

        private refreshExchangeSort(): void {
            let sdata = this._model.getTabActivity(this.list_tab.array[this._selectTabNum][0]);
            if (sdata) {
                for (let i: number = 0; i < sdata.length; i++) {
                    sdata[i].sort();
                }
            }
        }

        public showSelectTab(showeff: boolean) {
            if (!this.list_tab.array || !this.list_tab.array[this._selectTabNum]) return;
            // this.lab_has2.text = App.hero.getBagItemNum(302).toString();
            let curTab = this.list_tab.dataSource[this._selectTabNum][0];
            let link = this.list_tab.dataSource[this._selectTabNum][1].link;//页签
            this.lab_time.text = this.getTimeLab();
            this.imgShalou.x = this.lab_time.x - 25;
            this.hideXianshi();
            if (curTab == 99) {
                if (!this._xianshiIR) {
                    this._xianshiIR = new game.xianshiIR;
                    this._xianshiIR.centerX = 0;
                    this._xianshiIR.y = 294;
                }
                this.addChildAt(this._xianshiIR, 1);
                this._xianshiIR.onAdd(this.lab_time.text);
            }

            this.onUpdateRes();

            // this.box_xianshi.visible = curTab == 99;
            this.box_chongzhi.visible = curTab != 99 && curTab != TimelimitModel.ACTIVITY_JIJIN_ID;
            if (this.box_chongzhi.visible) {
                if (link == iface.tb_prop.operateActivityTypeKey.exchange) {
                    this.refreshExchangeSort();

                    this.redPointStateOpt();
                    // TimelimitModel.IS_CLICK_EXCHANGE = true;
                }
                this.updateList();

                this.img_title.skin = "huoyuehuodong/timeActTitle" + link + ".png";

                if (curTab == TimelimitModel.ACTIVITY_OPENBUY_ID) {
                    //特殊处理开服团购
                    this.setRechargePlayerNum(0);
                    this.lab_info.text = LanMgr.getLan('', 20020);
                    this.updateList();
                    this.lab_has2.x = 18;
                } else {
                    this.lab_info.text = "      " + tb.TB_activity_time.getTabInfo(curTab);
                    this.lab_has2.x = 54;
                }
            }
            this.timerLoop(5000, this, this.timeTick);

            if (showeff) {
                Laya.timer.callLater(this, () => {
                    UIUtil.playListEff(this.list_item.cells);
                });
            }
        }

        private redPointStateOpt() {
            let sdata = this._model.getTabActivity(this.list_tab.array[this._selectTabNum][0]);
            for (var key in sdata) {
                let vo: OperateActivityVo = sdata[key]
                if (!vo.redopt && vo.exchangeIsComplete() && !vo.isOverdue()) {
                    vo.redopt = true;

                    // dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), vo.tbActivity.time_index);
                }
            }
        }

        /**
         * 设置全服首充人数
         */
        public setRechargePlayerNum(playerNum: number) {
            let curTab = this.list_tab.dataSource[this._selectTabNum][0];
            if (curTab == TimelimitModel.ACTIVITY_OPENBUY_ID) {
                this.lab_has2.text = LanMgr.getLan("",12556,0);

                PLC.request(Protocol.game_activity_getRechargePlayerNum, null, ($data, $msg) => {
                    if (!$data) return;
                    this.lab_has2.text = LanMgr.getLan("",12556,$data.rechargePlayerNum);
                    App.hero.rechargePlayerNum = Number($data.rechargePlayerNum);
                })
            }
        }

        private timeTick() {
            this.lab_time.text = this.getTimeLab();
            this.imgShalou.x = this.lab_time.x - 25;
            if (this._xianshiIR && this._xianshiIR.parent) {
                this._xianshiIR.setTime(this.lab_time.text);
            }
            this.list_item.refresh();
        }


        /** 按照可领取，未完成，已领取排序 */
        public updateList(): void {
            if (!this.list_tab.array || !this.list_tab.array[this._selectTabNum]) return;
            let sdata = this._model.getTabActivity(this.list_tab.array[this._selectTabNum][0]);
            if (!sdata[0].sortNum) {
                this.list_item.dataSource = sdata;
                return;
            }
            this.list_item.dataSource = null;
            //先排序再赋值
            let list = sdata.sort((a, b) => {
                return a.sortNum - b.sortNum;
            });
            this.list_item.dataSource = list;
        }

        public close(): void {
            super.close();
            dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, [ModuleConst.MAIN]));
        }

        public onClosed() {
            super.onClosed();
            this._selectTabNum = -1;
            this.hideXianshi();
            this.btnClose.off(Laya.Event.CLICK, this, this.close);
            this.clearTimer(this, this.timeTick);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.onItemChange, this);
            tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
            // TimelimitModel.IS_CLICK_EXCHANGE = false;

            this._xianshiItem = null;
        }

        private getTimeLab(): string {
            let str: string = "";
            let activity = this.list_tab.dataSource[this._selectTabNum][1];
            if (App.getServerTime() >= activity.endTime) {
                //已结束
                if (App.getServerTime() >= activity.rewardTime) {
                    //已关闭
                    str = LanMgr.getLan("",12557);
                    this.clearTimer(this, this.timeTick);
                } else {
                    //领取时间
                    str = LanMgr.getLan("",12558,activityTime(activity.rewardTime, App.getServerTime()));
                }
            } else {
                //未结束
                str = LanMgr.getLan("",12555) + activityTime(activity.rewardTime, App.getServerTime());
            }
            return str;
        }


        private onclick(e: Laya.Event): void {
            switch (e.currentTarget) {
                case this.btn_add_zuanshi:
                    dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
                case this.btn_addgold:
                    UIMgr.showUI(UIConst.ExchangeGoldView);
                    break;
            }
        }



    }
}
