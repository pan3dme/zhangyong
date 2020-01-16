
module game {

    export class FogForestView extends ui.fogforest.FogForestUI {

        private _guanqiaLiat : ForestGuanqiaBox[];
        constructor() {
            super();
            this.isModelClose = false;
            this.group = UIConst.hud_group;
        }

        createChildren():void {
            super.createChildren();
            let stageW = Laya.stage.width;
            let stageH = Laya.stage.height;
            this._guanqiaLiat = [this.guanqia1,this.guanqia2,this.guanqia3];
            this.guanqia1.width = stageW;
            this.guanqia1.height = stageH/3;
            this.guanqia2.width = stageW;
            this.guanqia2.height = stageH/3;
            this.guanqia3.width = stageW;
            this.guanqia3.height = stageH/3;
            this.guanqia3.y = 0;
            this.guanqia2.y = this.guanqia3.y + this.guanqia3.height;
            this.guanqia1.y = this.guanqia2.y + this.guanqia2.height;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close(type?: string, showEffect?: boolean, sound?:boolean):void {
            super.close(type,showEffect,sound);
            for(let i = 0 ; i < this._guanqiaLiat.length ; i++){
                this._guanqiaLiat[i].dataSource = null;
            }
            this.boxRank.visible = false;
            this.awardUI.dataSource = null; 
            this.rankList.array = null;
        }
        onClosed():void {
            super.onClosed();
            UIMgr.hideUIByName(UIConst.SysTopView);
        }

        public initView(): void {
            let funList : BtnFuncVo[] = [
					{btnSkin:SkinUtil.btn_jiangli,redpointName:"forest_reward",callback:this.onBaoxiang.bind(this)},
					{btnSkin:SkinUtil.btn_rank,callback:this.showRankBox.bind(this)},
				];
			let resAry = [iface.tb_prop.resTypeKey.gold,iface.tb_prop.resTypeKey.diamond];
			UIUtil.showSysTopView({viewName:this.dialogInfo.uiname,resAry,funList,closeCallback:this.toClose.bind(this)});
            this.requestRankList();
            this.boxRank.visible = false;

            let model = FogForestModel.getInstance();
            this.awardUI.dataSource = model.getSpecialGuanqia();
            let guanqiaAry = model.getViewList();
            for(let i = 0 ; i < guanqiaAry.length ; i++){
                this._guanqiaLiat[i].dataSource = guanqiaAry[i];
            }
        }

        /** 请求排行并进行渲染 */
        private requestRankList(): void {
            this.rankList.array = null;
            let args = {};
            args[Protocol.game_rank_getRankList.args.rankType] = iface.tb_prop.rankTypeKey.forest;
            PLC.request(Protocol.game_rank_getRankList, args, ($data: any) => {
                if (!$data) return;
                this.rankList.repeatY = 3;
                for(let key in $data.rankList) {
                    this.rankList.itemRender = forestRankIR;
                    this.rankList.addItemAt([Number(key),$data.rankList[key]],Number(key)-1)
                }
            });
        }

        private toClose():void {
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW,tb.TB_function.TYPE_MAOXIAN));
        }

        private onOnekey():void {
            dispatchEvt(new FogForestEvent(FogForestEvent.ONE_KEY_PASS));
        }

        private onBaoxiang():void {
            dispatchEvt(new FogForestEvent(FogForestEvent.SHOW_REWARD_VIEW));
        }

        /** 显示或隐藏排行榜 */
        private showRankBox():void {
            if(this.boxRank.visible){
                this.boxRank.visible = false;
            }else{
                this.boxRank.visible = true;
            }
        }

    }
}