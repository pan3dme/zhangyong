

module game {
    /** 商队护送主界面 */
    export class EscortMainView extends ui.escort.EscortMainUI {

        private _model : EscortModel;
        constructor() {
            super();
            this.isModelClose = true;
            this.group = UIConst.hud_group;
        }

        createChildren(): void {
            super.createChildren();
            this._model = EscortModel.getInstance();
            this.itemPanel.hScrollBarSkin = "";
            this.bgImg.skin = SkinUtil.getSysMapSkin(ModuleConst.CARAVAN_ESCORT);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
            this._model.requestCaravanList().then(()=>{
                this.startRun();
            });
        }

        public close():void {
            super.close();
            Laya.timer.clearAll(this);
            this.list_quality.array = null;
            this._model.caravanList.length = 0;
            for(let item of this.bgImg._childs){
                if(item instanceof CaravanIR){
                    item.onRemove();
                }
            }
             this.btnEscort.off(Laya.Event.CLICK,this,this.onEscort);
            this.lbFinish.off(Laya.Event.CLICK,this,this.onFinish);
            this.btn_orange.off(Laya.Event.CLICK, this, this.onOnekey);
            this.btn_refresh.off(Laya.Event.CLICK, this, this.onRefresh);

            UIMgr.hideUIByName(UIConst.SysTopView);
        }

        public onClosed(): void {
            super.onClosed();
        }

        private initView(): void {
            let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)},
					{btnSkin:SkinUtil.btn_record,redpointName:"escort_record",callback:this.onRecord.bind(this)},
                    {btnSkin:SkinUtil.btn_jiangli,callback:this.onReward.bind(this)},
				];
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onFanHui.bind(this)});
            
            this.btnEscort.on(Laya.Event.CLICK,this,this.onEscort);
            this.lbFinish.on(Laya.Event.CLICK,this,this.onFinish);
            this.btn_orange.on(Laya.Event.CLICK, this, this.onOnekey);
            this.btn_refresh.on(Laya.Event.CLICK, this, this.onRefresh);

            this.updateCount();
            this.refreshInterval();
            this.showReward();
            

        }
        /** 请求商队列表 */
        private requestList():void {
            let model = this._model;
            model.requestCaravanList().then(()=>{
                if(model.caravanList.length > 0){
                    this.startRun();
                }else{
                    Laya.timer.once(20000,this,this.requestList);
                }
            });
        }

        /** 开始动画 */
        private startRun():void {
            let list = this._model.getCaravanList();
            if(list.length > 0){
                this.intetvalAnim(list);
            }else{
                Laya.timer.once(20000,this,this.requestList);
            }
        }
        /** 间隔运动 */
        private intetvalAnim(list:CaravanInfoVo[]):void {
            if(list.length > 0){
                let info = list.shift();
                this.addCaravan(info);
                Laya.timer.once(800,this,this.intetvalAnim,[list]);
            }else{
                // 8秒之后差不多走完开始下一批
                Laya.timer.once(8000,this,this.startRun);
            }
        }
        /** 添加商队 */
        public addCaravan(info:CaravanInfoVo):void {
            let index = this.bgImg._childs.findIndex((item)=>{
                return item instanceof CaravanIR && item.dataSource && item.dataSource.svo.playerId == info.svo.playerId;
            });
            if(index == -1){
                let item = this._model.getItemRender();
                let miny = this.height - 845;
                let maxy = this.box_husong.visible ? this.box_husong.y : this.box_husonging.y
                item.setStartPositon(maxy,miny);
                item.dataSource = info;
                this.bgImg.addChild(item);
            }
        }

        /** 显示护送奖励界面 */
        public showReward():void {
            let model = this._model;
            if(model.endTime <= 0) {
                Laya.timer.clear(this,this.showReward);
                return;
            }
            if(model.endTime <= App.serverTimeSecond) {
                Laya.timer.clear(this,this.showReward);
                UIMgr.showUI(UIConst.EscortRewardView,model.escortId);
                // 移除自己
                let selfItem : CaravanIR = this.bgImg._childs.find((item)=>{
                    return item instanceof CaravanIR && item.dataSource && item.dataSource.svo.playerId == App.hero.playerId;
                });
                if(selfItem){
                    selfItem.onRemove();
                }
            }else{
                Laya.timer.loop(1000,this,this.showReward);
            }
        }

        /** 更新数量 */
        public updateCount():void {
            let model = this._model;
            this.lbEscortCnt.text = LanMgr.getLan('',12432,model.getEscortCount());
            this.lbRobCnt.text = LanMgr.getLan('',12433,model.getRobCount());
        }
        /** 更新护送剩余时间 */
        public refreshInterval():void {
            let model = this._model;
            if(model.endTime > App.serverTimeSecond) {
                this.box_husonging.visible = true;
                this.box_husong.visible = false;
                Laya.timer.loop(1000,this, this.updateTime);
                this.updateTime();
                this.list_quality.array = null;
                Laya.timer.clear(this, this.loopSelecteGoods);
            }else{
                this.box_husonging.visible = false;
                this.box_husong.visible = true;
                this._inAnim = false;
                Laya.timer.clear(this, this.updateTime);
                this.list_quality.array = model.getGoodsList();
                this.updateCost();
            }
        }

        //护送中---------------------------------------------------------------
        private updateTime():void {
            let time = this._model.endTime - App.serverTimeSecond;
            if(time > 0){
                this.lbTime.text = GameUtil.toCountdown(time, "mm:ss");
                this.pro_husong.value = time/tb.TB_escort_set.getSet().escort_time;
            }else{
                this.refreshInterval();
            }
        }

        //还未护送---------------------------------------------------------------
        /** 更新消耗 */
        updateCost(): void {
            let model = this._model;
            if (!this.box_husong.visible) return;
            let cost1 = model.getRefreshCost();
            this.img_refresh_cost.skin = SkinUtil.getCostSkin(cost1[0]);
            let cost2 = model.getOneKeyCost();
            this.img_orange_cost.skin = SkinUtil.getCostSkin(cost2[0]);
            //判断总数
            if(cost1[0] == iface.tb_prop.resTypeKey.diamond) { 
                this.lab_refresh_cost.text = cost1[1];
            } else {
                this.lab_refresh_cost.text = App.hero.getBagItemNum(cost1[0]) + "/" + cost1[1];
            }
            if(cost2[0] == iface.tb_prop.resTypeKey.diamond) {
                this.lab_orange_cost.text = cost2[1];
            } else {
                this.lab_orange_cost.text = App.hero.getBagItemNum(cost2[0]) + "/" + cost2[1];
            }          
        }

        /** 选择货物 */
        private _curIdx: number;
        private _toIdx: number;
        private _ringNum: number = 0;
        private _time: number = 50;
        private _inAnim: boolean = false;
        public startAnim(escortId: number): void {
            if (!this.box_husong.visible) return;
            this._curIdx = this.list_quality.cells.findIndex((item: EscortCircleIR) => {
                return !item.img_select.visible;
            });
            this._curIdx = this._curIdx < 0 ? 0 : this._curIdx;
            this._toIdx = this.list_quality.cells.findIndex((item: EscortCircleIR) => {
                return item && item.dataSource && item.dataSource.tbEscort.ID == escortId;
            });
            if (this._toIdx < 0) return;
            this._ringNum = 0;
            this._time = 60;
            this._inAnim = true;
            this.startInterval();
        }
        private startInterval(): void {
            Laya.timer.clear(this, this.loopSelecteGoods);
            Laya.timer.loop(this._time, this, this.loopSelecteGoods);
        }
        private loopSelecteGoods(): void {
            let lastIdx = this._curIdx;
            this._curIdx++;
            let len = this.list_quality.array.length;
            if (this._curIdx >= len) {
                lastIdx = len - 1;
                this._curIdx = 0;
            }
            // 七圈之后停止
            if (this._ringNum == 4 && this._curIdx == this._toIdx) {
                this._inAnim = false;
                Laya.timer.clear(this, this.loopSelecteGoods);
                dispatchEvt(new EscortEvent(EscortEvent.ANIMATION_END));
            }
            (this.list_quality.getCell(lastIdx) as EscortCircleIR).img_select.visible = true;
            (this.list_quality.getCell(this._curIdx) as EscortCircleIR).img_select.visible = false;

            if (this._curIdx >= len - 1) {
                this._ringNum++;
            }
            if (this._ringNum == 2 && this._curIdx == len - 1) {
                this._time = 60;
                this.startInterval();
                return;
            }
            if (this._ringNum == 3 && this._curIdx == len - 1) {
                this._time = 125;
                this.startInterval();
                return;
            }
        }

        /** 选中获取 */
        selectItem(escortId:number):void {
            if (!this.box_husong.visible) return;
            let curItem = this.list_quality.cells.find((item: EscortCircleIR) => {
                return !item.img_select.visible;
            });
            if(curItem){
                (curItem as EscortCircleIR).img_select.visible = true;
            }
            let toItem = this.list_quality.cells.find((item: EscortCircleIR) => {
                return item.dataSource && item.dataSource.tbEscort.ID == escortId;
            });
            if(toItem){
                (toItem as EscortCircleIR).img_select.visible = false;
            }
        }

        /** 刷新品质 */
        private onRefresh(): void {
            if (this._inAnim) {
                showToast(LanMgr.getLan('', 10170));
                return;
            }
            dispatchEvt(new EscortEvent(EscortEvent.REFRESH_GOODS));
        }

        /** 一键刷橙 */
        private onOnekey(): void {
            if (this._inAnim) {
                showToast(LanMgr.getLan('', 10170));
                return;
            }
            dispatchEvt(new EscortEvent(EscortEvent.ONEKEY_REFRESH_GOODS));
        }

        /** 护送 */
        private onEscort(): void {
            if (this._inAnim) {
                showToast(LanMgr.getLan('', 10170));
                return;
            }
            dispatchEvt(new EscortEvent(EscortEvent.ESCORT_GOODS));
        }

        /** 快速完成 */
        private onFinish():void {
            let cost = tb.TB_escort_set.getSet().complete_cost;
            let text = LanMgr.getLan('', 10307,cost[1]) + `<img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(cost[0])}' ></img>` + LanMgr.getLan('', 10308);
            common.AlertBox.showAlert({
                text: text, confirmCb: () => {
                    dispatchEvt(new EscortEvent(EscortEvent.QUICK_FINISH));
                }, parm: null
            });
        }

        /** 规则 */
        private onRule():void {
            dispatchEvt(new EscortEvent(EscortEvent.SHOW_RULE_VIEW));
        }
        /** 记录 */
        private onRecord():void {
            dispatchEvt(new EscortEvent(EscortEvent.SHOW_RECORD_VIEW));
        }
        /** 奖励 */
        private onReward():void {
            UIMgr.showUI(UIConst.EscortView);
        }
        private onFanHui():void{
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_LILIAN));
        }

        
        

        

    }
}