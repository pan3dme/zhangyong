
module game {

	export class MatchView extends ui.arena.match.MatchMainUI {

        private _boxItems: common.BaoxiangBox[]
        private _model : MatchModel;
        constructor(){
            super();
            this.group = UIConst.hud_group;
        }

        createChildren():void {
			super.createChildren();
            this._model = MatchModel.getInstance();
			this._boxItems = [];
            let boxAry = this._model.getBoxList();
            let len = boxAry.length;
            let boxW = this.box.width;
            for (let i = 0; i < len; i++) {
                let box = new common.BaoxiangBox();
                box.anchorX = 0.5;
                box.x = (boxAry[i].getCount() / this._model.maxTbCount) * boxW;
                box.y -= 20;
                this.box.addChild(box);
                this._boxItems.push(box);
            }
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.MATCH_FIGHT);
            this.btnAdd.on(Laya.Event.CLICK,this,this.onClick);
            this.btnRefresh.on(Laya.Event.CLICK,this,this.onClick);
		}
        public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}
        public onClosed():void{
			super.onClosed();
            for(let item of this._boxItems){
                item.dataSource = null;
            }
            this.matchList.array = null;
            Laya.timer.clearAll(this);
            tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateSYCount,this);
            UIMgr.hideUIByName(UIConst.SysTopView);
		}
        /** 初始化界面 */
        private initView():void {
            let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_rule,callback:this.onRule.bind(this)},
					{btnSkin:SkinUtil.btn_jiangli,callback:this.onAward.bind(this)},
					{btnSkin:SkinUtil.btn_rank,callback:this.onRank.bind(this)},
					{btnSkin:SkinUtil.btn_record,callback:this.onRecord.bind(this)},
				];
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.onFanHui.bind(this)});
            this.updateBox();
            this.lbName.text = App.hero.name;
            this.lbScore.text = LanMgr.getLan("",12543) + "：" + this._model.score;
            this.lbGrade.text = LanMgr.getLan("",12544) + "：" + this._model.getGradeName(this._model.score);
            this.lbCount.text = LanMgr.getLan("",12540) + this._model.challengeCount + LanMgr.getLan("",12108);
            this.refreshList();
            this.updateSYCount();
            this.resetRefreshInterval();
            this.resetMatchInterval();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateSYCount,this);
        }

        /** 更新宝箱 */
        updateBox():void {
            let model = this._model;
            let boxList = model.getBoxList();
            for(let i = 0 , len = this._boxItems.length ; i < len ; i++){
                this._boxItems[i].dataSource = boxList[i];
            }
            this.imgPb.value = (model.challengeCount / model.maxTbCount);
        }

        /** 刷新列表 */
        refreshList():void {
            this.matchList.array = this._model.getMatchList();
        }

        /** 重置本轮倒计时 */
        public resetMatchInterval():void {
            Laya.timer.clear(this,this.updateMatchTime);
            Laya.timer.loop(1000,this,this.updateMatchTime);
            this.updateMatchTime();
        }
        /** 更新倒计时 */
        private updateMatchTime():void {
            let time = this._model.roundEndTime - App.serverTimeSecond;
            if(time > 0){
                this.lbTime.text = LanMgr.getLan("",12545) + GameUtil.getTimeStr(time);
            }else{
                this._model.updateEndTime();
            }
        }

        /** 重置定时器 */
        public resetRefreshInterval():void {
            Laya.timer.clear(this,this.updateRefreshTime);
            let time = App.serverTimeSecond - this._model.lastRefreshTime;
            if(time < tb.TB_match_set.getSet().refresh_interval){
                Laya.timer.loop(1000,this,this.updateRefreshTime);
                this.updateRefreshTime();
            }else{
                this.btnRefresh.label = LanMgr.getLan("",10172);
                this.btnRefresh.gray = false;
            }
        }
        /** 更新倒计时 */
        private updateRefreshTime():void {
            let time = App.serverTimeSecond - this._model.lastRefreshTime;
            let second = Math.ceil(tb.TB_match_set.getSet().refresh_interval - time);
            if(second > 0){
                this.btnRefresh.label = second + LanMgr.getLan("",12093);
                this.btnRefresh.gray = true;
            }else{
                this.btnRefresh.label = LanMgr.getLan("",10172);
                this.btnRefresh.gray = false;
                Laya.timer.clear(this,this.updateRefreshTime);
            }
        }

        /** 更新剩余数量 */
        updateSYCount():void {
            this.lbSYCount.text = LanMgr.getLan("",10081,App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.matchNum));
        }

        private onClick(event:Laya.Event):void {
            let btn = event.target;
            if(btn == this.btnAdd){
                dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_BUY_VIEW));
            }else if(btn == this.btnRefresh){
                if(this.btnRefresh.gray) {
                    showToast(LanMgr.getLan("",11015));
                    return;
                }
                dispatchEvt(new ArenaEvent(ArenaEvent.REFRESH_MATCH_LIST));
            }
        }
        private onRule():void {
            dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_NOTICE_VIEW));
        }
        private onAward():void {
            dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_AWARD_VIEW));
        }
        private onRank():void {
            dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_RANK_VIEW));
        }
        private onRecord():void {
            dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_RECORD_VIEW));
        }

        private onFanHui():void{
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_KUAFU));
        }
    }

}