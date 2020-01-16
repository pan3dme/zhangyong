

module game {

    export interface SysTopVo {
        viewName : string;
        closeCallback : Function;
        funList : BtnFuncVo[];
        resAry : number[];
    }

    export interface BtnFuncVo {
        btnId ?: number;
        btnSkin : string;
        callback : Function;
        redpointName ?: string;
        text ?: any;
    }
    export enum BtnFuncId {
        reviveHero = 1,     // 复活英雄
        recoverHero = 2,    // 恢复英雄生命
    }
    
    export class SysTopView extends ui.hud.view.SysTopUI {

        private _resList : SysTopResIR[];
		constructor() {
			super();
            this.isModelClose = false;
            this.mouseThrough = true;
		}

        createChildren():void {
            super.createChildren();
            this.btnClose.on(Laya.Event.CLICK,this,this.onClick);
            this.boxFogforest.visible = false;
            this.box_island.visible = false;
            this._resList = [];
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
			// 顶部
			this.boxTop.height = GameUtil.isFullScreen() ? (134+HudModel.TOP_ADD_HEIGHT) : 134;
        }

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
            this.initView();
		}
        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
            this.initView();
		}

		public close() {
			super.close();
			this.btnList.array = null;
            this.imgSys.skin = null;
            Laya.timer.clear(this, this.updateIslandTime);
            tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateRes, this);
            tl3d.ModuleEventManager.removeEvent(HudEvent.UPDATE_SYS_TOP_BTN_INFO, this.updateBtnIr, this);
            tl3d.ModuleEventManager.removeEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateIslandCount, this);
            this.btnOneKey.off(Laya.Event.CLICK, this, this.onOnekey);
            this.clearResList();
            // 打开
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if(view){
                view.setVisible(true);
            }
		}

		private initView() {
            // 优化操作，减少渲染
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if(view){
                 view.setVisible(false);
            }
            let info : SysTopVo = this.dataSource;
            this.btnList.array = info.funList;
            let skin = SkinUtil.getSysTitle(info.viewName);
            if(skin && skin != "") {
                this.imgSys.skin = SkinUtil.getSysTitle(info.viewName);
                this.imgSys.visible = this.bgTitle.visible = true;
            }else{
                this.imgSys.visible = this.bgTitle.visible = false;
            }
            info.resAry = info.resAry || [];
            let len = info.resAry.length;
            this.clearResList();
            for(let i = 0 ; i < len ; i++){
                let itemIr = new SysTopResIR();
                itemIr.y = GameUtil.isFullScreen() ? (5+HudModel.TOP_ADD_HEIGHT) : 5;
                itemIr.dataSource = info.resAry[i];
                this.boxTop.addChild(itemIr);
                this._resList.push(itemIr);
            }
            this.layoutList();

            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateRes, this);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_SYS_TOP_BTN_INFO, this.updateBtnIr, this);
            this.updateRes();
            this.boxFogforest.visible = false;
            this.box_island.visible = false;
            if(info.viewName == UIConst.FogForestView) {
                this.boxFogforest.visible = true;
                this.btnOneKey.on(Laya.Event.CLICK, this, this.onOnekey);
                this.updateFogforest();
            }else if (info.viewName == UIConst.IslandView || info.viewName == UIConst.OreMapView){
                this.box_island.visible = true;
                this.btn_island_add.on(Laya.Event.CLICK, this, this.onClickIslandBtn);
                tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateIslandCount, this);
                Laya.timer.loop(1000, this, this.updateIslandTime);
                this.updateIsland();
            }
		}
        /** 布局 */
        private layoutList():void {
            let allWidth = 0;
            let len = this._resList.length;
            for(let itemir of this._resList){
                allWidth += itemir.width;
            }
            // 前后间距算间隔
            // let spaceX = (this.width - allWidth - 60)/(len-1);
            // spaceX = spaceX < 0 ? 0 : spaceX;
            // 固定间隔20
            let spaceX = 20
            if(spaceX > 0){
                allWidth += spaceX * (len - 1);
            }
            let startX = (this.width - allWidth)/2;
            for(let i = 0 ; i < len ; i++){
                let itemir = this._resList[i];
                itemir.x = startX;
                startX = itemir.x + itemir.width + spaceX;
            }
        }

        /** 更新资源 */
        private updateRes():void {
            for(let itemir of this._resList) {
                itemir.refreshView();
            }
        }

        /** 更新按钮信息 支持更新多个*/
        private updateBtnIr(event:HudEvent):void {
            let ary : {btnId,text}[] = event.data || [];
            for(let info of ary){
                let btnIr = this.getSysTopBtnIR(info.btnId);
                if(btnIr) {
                    let btnInfo = btnIr.dataSource;
                    for(let key in info) {
                        btnInfo[key] = info[key];
                    }
                    btnIr.refreshView();
                }
            }
        }
        /** 获取按钮 */
        private getSysTopBtnIR(id):SysTopBtnIR {
            if(!id) return null;
            let ary = this.btnList.cells || [];
            return ary.find((item:SysTopBtnIR)=>{
                return item && item.dataSource && item.dataSource.btnId == id; 
            });
        }

        private onClick():void {
            let info : SysTopVo = this.dataSource;
            if(info){
                if( GameUtil.isFunction(info.closeCallback)){
                    info.closeCallback();
                }
            }
        }

        clearResList():void {
            for(let itemir of this._resList){
                itemir.dataSource = null;
                itemir.removeSelf();
            }
            this._resList.length = 0;
        }


        // =============== 迷雾森林 ==================
        /** 迷雾森林 */
        public updateFogforest():void {
            this.lbGuanqia.text = LanMgr.getLan('', 10184, App.hero.forestMaxFloor);
        }
        private onOnekey():void {
            dispatchEvt(new FogForestEvent(FogForestEvent.ONE_KEY_PASS));
        }

        // =============== 神秘岛屿 ==================
        private updateIsland():void{
            this.updateIslandCount();
            this.updateIslandTime();
        }

        /** 更新时间 */
        private updateIslandTime(): void {
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum);
            let maxCnt = tb.TB_island_set.getSet().plunder_max;
            if (count >= maxCnt) {
                this.lab_island_refresh.visible = false;
            } else {
                this.lab_island_refresh.visible = true;
                let replyTime = tb.TB_island_set.getSet().reply_time;
                let time = replyTime - (App.serverTimeSecond - App.hero.mineRobReplyTime);
                this.lab_island_refresh.text = LanMgr.getLan('', 10186, GameUtil.toCountdown(time, "mm:ss", 2));
            }
            this.lab_island_rob.text = `可掠夺:${count}次`;
        }
        /** 更新数量 */
        public updateIslandCount(): void {
            this.lab_island_rob.text = `可掠夺:${App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum)}次`;
            this.lab_island_occupy.text = `可占领:${IslandModel.getInstance().getOccupyCount()}次`;
        }

        private onClickIslandBtn():void{
            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_BUY_VIEW));
        }
    }
}