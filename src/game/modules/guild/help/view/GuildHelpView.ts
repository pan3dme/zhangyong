
module game {

    export class GuildHelpView extends ui.guild.help.HelpMainViewUI {

        private _model : GuildHelpModel;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this._model = GuildHelpModel.getInstance();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:"公会救援" };	
            this.tabbar.selectedIndex = -1;
            this.tabbar.selectHandler = new Handler(this,this.onSelect);
            this.tabbar.onSelectBefore = this.onSelectBefore.bind(this);
            this.myHelpUI.btnAskHelp.on(Laya.Event.CLICK,this,this.onAskHelp);
            this.myHelpUI.imgBaoxiang.on(Laya.Event.CLICK,this,this.onBaoxiang);
            this.myHelpUI.listHelp.array = null;
            this.othersHelpUI.listHelp.array = null;
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

        public onClosed(): void {
            super.onClosed();
            this.tabbar.selectedIndex = -1;
            this.clearOthersUI();
            this.clearMyUI();
            Laya.timer.clearAll(this);
        }

        private initView(): void {
            let index = this.dataSource || 0;
            this.tabbar.selectedIndex = index;
        }

        private onSelectBefore(index:number,callback:Function):void {
            if(index == 0) {
                this._model.requestMyHelpList().then(()=>{
                    callback();
                });
            }else if(index == 1){
                this._model.requestOthersHelpList().then(()=>{
                    callback();
                });
            }else{
                callback();
            }
        }

        private onSelect(index:number):void {
            if(index == -1) return;
            this.viewStack.selectedIndex = index;
            index == 0 ? this.initMyHelpUI() : this.initOthersHelpUI();
        }

        // -------------  我的求助  -------------
        /** 初始化我的求援界面 */
        private initMyHelpUI():void {
            this.clearOthersUI();
            this.updateMyListSimple();
            this.updateBaoxiangState();
            this.updateInterval();
        }
        public updateInterval():void {
            let model = this._model;
            // 没有全部完成才需要定时刷新数据
            Laya.timer.clear(this,this.intervalReuqestMy);
            if(model.getAskHelpNum() > 0 && !model.isAllFinish()){
                Laya.timer.loop(10000,this,this.intervalReuqestMy);
            }
        }
        /** 定时请求 -- 简易更新列表 */
        private intervalReuqestMy():void {
            this._model.requestMyHelpList()
            .then(()=>{
                this.updateMyListSimple();
            });
        }
        /** 更新宝箱状态 */
        public updateBaoxiangState():void {
            let model = this._model;
            let ui = this.myHelpUI;
            if(model.isCanRewardBX()){
                ui.animBX.play(0,true);
                ui.animGuang.visible = true;
                ui.animGuang.play(0,true);
            }else{
                ui.animGuang.visible = false;
                ui.animGuang.gotoAndStop(0);
                ui.animBX.gotoAndStop(0);
            }
            ui.imgBaoxiang.skin = model.isReawrdBX() ? SkinUtil.help_bx_open : SkinUtil.help_bx_noopen;
        }
        /** 简易更新列表 -- 只更新列表及次数 */
        public updateMyListSimple():void {
            let model = this._model;
            let ui = this.myHelpUI;
            ui.lbNum.text = `今日求援完成次数（${model.getRewardFinishNum()}/${tb.TB_guild_set.getSet().daily_help_num}）`;
            ui.listHelp.array = model.getMyHelps();
        }
        
        private onAskHelp():void {
            dispatchEvt(new GuildEvent(GuildEvent.SEND_CHAT_HELP));
        }
        private onBaoxiang():void {
            dispatchEvt(new GuildEvent(GuildEvent.HELP_CLICK_BAOXIANG));
        }
        clearMyUI():void {
            let ui = this.myHelpUI;
            ui.listHelp.array = null;
            ui.animGuang.visible = false;
            ui.animGuang.gotoAndStop(0);
            ui.animBX.gotoAndStop(0);
            Laya.timer.clear(this,this.intervalReuqestMy);
        }

        // -------------  公会成员的求助  -------------
        private initOthersHelpUI():void {
            this.clearMyUI();
            this.updateOtherHelpUI();
            Laya.timer.clear(this,this.intervalRequestOthers);
            Laya.timer.loop(10000,this,this.intervalRequestOthers);
        }
        /** 定时请求公会援助列表 */
        private intervalRequestOthers():void {
            this._model.requestOthersHelpList()
            .then(()=>{
                this.updateOtherHelpUI();
            });
        }
        /** 更新公会援助 */
        public updateOtherHelpUI():void {
            let model = this._model;
            let ui = this.othersHelpUI;
            ui.lbNum.text = model.isFreeHelp() ? `免费援助次数：${model.getFreeHelpNum()}` : `钻石援助次数：${model.getCostNum()}`;
            let list = model.getOthersHelp();
            ui.listHelp.array = list;
            ui.boxEmpty.visible = list.length == 0;
            ui.listHelp.visible = list.length > 0;
        }
        /** 清除工会援助UI数据 */
        private clearOthersUI():void {
            let ui = this.othersHelpUI;
            ui.listHelp.array = null;
            Laya.timer.clear(this,this.intervalRequestOthers);
        }
    }
}