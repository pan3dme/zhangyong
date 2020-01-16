/**
* name 
*/
module game {
    export class GuanQiaInfoView extends ui.guaji.GuanQiaInfoUI {
        private _model: GuajiModel;
        constructor() {
            super();
            this.isModelClose = true;
        }

        private _curGuanQiaVo:GuaJiGuanqiaVo;
        public popup() {
            super.popup();
            
            this.btn_guaji.on(Laya.Event.CLICK, this, this.onClickBtn);
            this._curGuanQiaVo = this.dataSource;
            this.bgPanel.dataSource = {uiName:UIConst.GuanQiaInfoView,closeOnSide:this.isModelClose,title:this._curGuanQiaVo.tbCopyInfo.name};

            this.updateInfo();
        }

        private updateInfo():void{
            if (!this._curGuanQiaVo) return;
            //怪物
            let enemyArr:tb.TB_monster[] = this._curGuanQiaVo.tbCopyInfo.getMonsters();
            this.list_enemy.array = enemyArr;
            this.list_enemy.repeatX = enemyArr.length;
            this.list_enemy.x = (this.width - this.list_enemy.width)/2;

            //奖励
            let rewardArr:ItemVo[] = this._curGuanQiaVo.tbCopyInfo.getRewardShowItems();
            this.list_reward.array = rewardArr;
            if (rewardArr.length > 5){
                this.list_reward.width = 552;
            }else{
                let speacx:number = 12;
                let itemwidth:number = 90;
                this.list_reward.width = (speacx+itemwidth)*rewardArr.length - speacx;
            }
            this.list_reward.x = (this.width - this.list_reward.width)/2;

            if (this._curGuanQiaVo.isPass || this._curGuanQiaVo.isNext()){
                this.btn_guaji.gray = false;
                this.btn_guaji.label = "挂机";
            }else{
                this.btn_guaji.gray = true;
                this.btn_guaji.label = "未通关";
            }
        }



        private onClickBtn():void{
            if (this._curGuanQiaVo.isPass  || this._curGuanQiaVo.isNext()){
                let model = GuajiModel.getInstance();
                let zhangjievo:ZhangjieVo = model.getZhangjie(this._curGuanQiaVo.chapterId);
                model.currentZhangjie = zhangjievo;
                UIMgr.showUI(UIConst.GuajiView);
                dispatchEvt(new GuajiEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT));
                UIMgr.hideUIByName(UIConst.GuanQiaNewView);
                UIMgr.showUI(UIConst.OpenChapterView, {type:OpenChapterView.TYPE_GUAJI, isnew:false, infovo:zhangjievo});
                this.close();
            }else{

            }
        }

    

        public close(): void {
            super.close("", false);

            this.btn_guaji.off(Laya.Event.CLICK, this, this.onClickBtn);
            this.bgPanel.dataSource = null;
            this.list_enemy.array = null;
            this.list_reward.array = null;
            this._curGuanQiaVo = null;
        }
     
    }
}