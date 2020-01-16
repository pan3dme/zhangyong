/*
* name;
*/
module common {

    export class CommonTitle5View extends ui.component.CommonTitle5UI{
        constructor(){
            super();
            this.btnClose.on(Laya.Event.CLICK,this,this.onClick);
            // this.setTitleVisible(false);
        }

        public set dataSource($value:IPanelOption) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():IPanelOption {
            return this._dataSource;
        }

		private refreshData() {
            let data = this.dataSource;
            if (data) {
                this.btnClose.visible = data.hasOwnProperty('closeOnButton') ? data.closeOnButton : true;
                this.closeByBlank.visible = data.hasOwnProperty('closeOnSide') ? data.closeOnSide : true;
                this.closeByBlank.bottom = data.hasOwnProperty('bottom') ? data.bottom : -60;
                let hasTitle = data.hasOwnProperty('title') ? (data.title && data.title!="") : false;
                this.lbTitle.text = hasTitle ? data.title : "";
                this.setTitleVisible(hasTitle);
            }else{
                this.setTitleVisible(false);
            }
        }

        /** 更新标题 */
        updateTitle(title:string):void {
            let data = this.dataSource;
            if(data){
                data.title = title;
            }
            this.lbTitle.text = title;
            this.setTitleVisible(title ? true : false);
        }
        
        setTitleVisible(visible:boolean):void {
            this.bgTitle.visible = this.lbTitle.visible = visible;
        }

        private onClick():void {
            if(this.dataSource && this.dataSource.uiName){
                UIMgr.hideUIByName(this.dataSource.uiName);
            }else{
                let dialog = <common.DialogExt>this.parent;
                if(dialog ){
                    dialog.close('buttonClose',true);
                }
            }
        }

    }

   
}