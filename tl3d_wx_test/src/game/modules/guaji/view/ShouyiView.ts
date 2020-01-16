/**
* name 
*/
module game {
    export class ShouyiView extends ui.guaji.ShouyiUI {
        constructor() {
            super();
            this.mouseEnabled = true;
            this.isModelClose = true;
            this.list_reward.array = null;

        }
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, false);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, false);
            // this.ani_coin.showEff(this);
            this.initView();
        }


        public initView(): void {
            let info: { lastTime, data } = this.dataSource;
            if(!info) return;
            this.bgPanel.dataSource = { title: "comp/title/guajishouyi.png" };
            let maxlev = GuajiModel.getInstance().getMaxLev();
            let curCopy = tb.TB_copy_info.get_TB_copy_infoById(maxlev);
            this.lbExp.text = curCopy ? `+${curCopy.role_exp_speed}/m` : `+0/m`;
            this.lbGold.text = curCopy ? `+${curCopy.gold_speed}/m` : `+0/m`;
            this.lbHunshi.text = curCopy ? `+${curCopy.exp_speed}/m` : `+0/m`;
            //离线收益
            let allItem: ItemVo[] = [];
            //挂机收益
            if (info.data.commonData.addBagItems) {
                let addBagItems: any = info.data.commonData.addBagItems;
                for (let key in addBagItems) {
                    let num: number = addBagItems[key];
                    let id: number = Number(key);
                    allItem.push(new ItemVo(id, num));
                }
            }
            if (info.data.commonData.addResource) {
                let addResource: any = info.data.commonData.addResource;
                for (let key in addResource) {
                    let num: number = addResource[key];
                    let id: number = Number(key);
                    allItem.push(new ItemVo(id, num));
                }
            }

            if (info.data.commonData.addEquips) {
                let addEquips: any = info.data.commonData.addEquips;
                //统计装备数量
                let equips: Object = {};
                for (let key in addEquips) {
                    let id: number = Number(addEquips[key].templateId);
                    equips[id] = !equips[id] ? 1 : equips[id] + 1;
                }
                for (let key in equips) {
                    allItem.push(new ItemVo(parseInt(key), equips[key]));
                }
            }

            let time = App.getServerTime() - info.lastTime;
            let maxtime = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime);
            time = Math.min(maxtime, time);
            this.lab_time.text = tl3d.TimeUtil.getDiffTime2(time);
            this.list_reward.array = allItem;
        }



        onClosed(): void {
            super.onClosed();
            // this.ani_coin.closeEff();
            this.bgPanel.dataSource = null;
            this.list_reward.array = null;
        }

    }
}