/**
* name 
*/
module game{
	export class GodCultureView extends ui.god.GodCultureUI{

        private _curSelect : number;
        private _godIdList : string[];
		constructor(){
			super();
			this.isModelClose = true;
		}

        createChildren():void {
            super.createChildren();
            this.btnClose.on(Laya.Event.CLICK,this,this.onClick);
            this.btnLeft.on(Laya.Event.CLICK,this,this.onChange,[-1]);
            this.btnRight.on(Laya.Event.CLICK,this,this.onChange,[1]);
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.godView.height = h;
        }

		public popup() {
			super.popup();
			this.initView();
            this.godView.toOpen();
		}

        public close():void {
			super.close();
			this.godView.toClose();
		}

        private initView():void {
            let dataAry : any[] = this.dataSource;
            this._curSelect = dataAry[0] || 0;
            this._godIdList = dataAry[1] || [];
            let godVo = App.hero.getGodVoById(this._godIdList[this._curSelect]);
            if(godVo) {
                this.godView.curVo = godVo;
                this.godView.tabList.selectedIndex = 0;
                this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHENLING,godVo.tab_god.race_type);
            }
            this.godView.btnChange.visible = this.godView.btn_gh.visible = this.godView.btnBuzhen.visible = false;
            this.updateBtn();
        }

        private onChange(num:number):void {
            this._curSelect += num;
            let godVo = App.hero.getGodVoById(this._godIdList[this._curSelect]);
            if(godVo){
                let tabIndex = this.godView.tabList.selectedIndex;
                this.godView.curVo = godVo;
                this.godView.onSetIndex(tabIndex);
                this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHENLING,godVo.tab_god.race_type);
            }
            this.updateBtn();
        }
        private updateBtn():void{
            this.btnLeft.disabled = this._curSelect == 0;
            this.btnRight.disabled = this._curSelect == this._godIdList.length - 1;
        }

		/** 刷新当前神灵数据 */
        public refreshCurRole(godVo: GodItemVo) {
            if (!godVo || !this.godView.curVo) return;
            if(this.godView.curVo.uuid == godVo.uuid){
                this.godView.updateView();
                this.godView.refreshCurRole();
            }
        }

        private onClick():void {
            this.close();
        }

		get viewInfo():godTabInfoView {
            return this.godView.viewInfo;
        }
        get viewJuexing():godTabAwakeView {
            return this.godView.viewJuexing;
        }
        get viewStarup():godTabStarupView {
            return this.godView.viewStarup;
        }
        get viewRonghun():godTabfuseView {
            return this.godView.viewRonghun;
        }
	}
}