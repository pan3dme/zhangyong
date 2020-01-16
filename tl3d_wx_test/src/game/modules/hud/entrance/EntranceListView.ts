
module game {

    export class EntranceListView extends ui.hud.entrance.EntranceListUI {
        private _mainFunction:tb.TB_function;
        private _functionList:tb.TB_function[];
        private static LastType:number = 100;
        constructor(){
            super();
			this.group = UIConst.hud_group;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed():void {
            super.onClosed();
            this._mainFunction = null;
            this._functionList = null;
            this.btnlist.array = null;
            UIMgr.hideUIByName(UIConst.SysTopView);
            Laya.timer.clearAll(this);
            this.btnlist.scrollBar.touchScrollEnable = true;
        }

        /** 初始化界面 */
        private initView():void {
            let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond];
            let titleName:string =  this.dialogInfo.uiname;
            UIUtil.showSysTopView({viewName:titleName,resAry,funList:null,closeCallback:this.toClose.bind(this)});
            let type:number = this.dataSource ? this.dataSource : EntranceListView.LastType;
            EntranceListView.LastType = type;
            this._mainFunction = tb.TB_function.getSet(type);
            this._functionList = tb.TB_function.getFunctionListByType(type);
            this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.WANFA,0,this._mainFunction.icon);
            this.btnlist.array = this._functionList;
            this.btnlist.visible = false;
            Laya.timer.frameOnce(1,this,()=>{
                this.btnlist.visible = true;
                UIUtil.listTween(this.btnlist,()=>{
                    if(GuideWeakManager.isExcuting()){
                        this.btnlist.scrollBar.touchScrollEnable = false;
                    }
                });
            });
        }

        /** 获取某个系统的IR */
        getIRBySysid(sysid:number):EntranceIR {
            let index = this.getIRIndex(sysid);
            return this.btnlist.getCell(index) as EntranceIR;
        }
        getIRIndex(sysid:number):number{
            return this._functionList.findIndex((tbObj)=>{
                return tbObj.system_id == sysid;
            });
        }
        toClose():void {
            UIMgr.showUI(UIConst.GuajiView);
        }

    }

}