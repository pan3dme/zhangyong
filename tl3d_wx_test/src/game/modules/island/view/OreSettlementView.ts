
module game {

    export class OreSettlementView extends ui.island.OreSettlementUI {

        private _mgr : IslandQueueMgr;
        constructor() {
            super();
            this._mgr = IslandQueueMgr.getInstance();
        }
        createChildren():void {
            super.createChildren();
            this.lbContent.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = {closeOnSide:this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12004)};
        }
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }
        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        close():void {
            this.onConfirm(false);
        }
        public onClosed(): void {
            super.onClosed();
            this.itemList.array = null;
            this.bgPanel.dataSource = null;
            this.btnConfirm.off(Laya.Event.CLICK, this, this.onConfirm);
        }

        private initView(): void {
            let info: IOreSettlementVo = this.dataSource;
            if(!info) return;
            let title = info.recordVo && info.recordVo.isGoto ? LanMgr.getLan("",12003) : (info.title ? info.title : LanMgr.getLan("",12004));
            this.bgPanel.updateTitle(title);
            this.lbContent.text = info.content;
            this.btnConfirm.label = info.recordVo ? (info.recordVo.isGoto ? LanMgr.getLan("",10042) : ( info.recordVo.isHasReward() ? LanMgr.getLan("",10041) : LanMgr.getLan("",10038) )) : LanMgr.getLan("",10038);
            this.itemList.array = info.itemArray;
            this.itemList.y = this.lbContent.y + this.lbContent.height + 25;
            if(info.itemArray.length > 0){
                this.listBg.visible = true;
                this.listBg.y = this.itemList.y - 10;
                this.btnConfirm.y = this.itemList.y + this.itemList.height + 30;
            }else{
                this.listBg.visible = false;
                this.btnConfirm.y = this.itemList.y + 30;
            }
            this.btnConfirm.on(Laya.Event.CLICK, this, this.onConfirm,[true]);
            this.bgPanel.height = this.height = this.btnConfirm.y + this.btnConfirm.height + 50;
        }

        /** 领取收益或者更新状态 */
        private onConfirm(btnOperate:boolean):void {
            let info = this.dataSource as IOreSettlementVo;
            if(!info.recordVo){
                super.close();
                return;
            }
            if(info.recordVo.isGoto){
                // 点击前往，清除外界的提示记录列表
                if(btnOperate){
                    this._mgr.clearRecords();
                    // 没有奖励的直接标记已读
                    if(!info.recordVo.isHasReward()){
                        let arg = {};
                        arg[Protocol.game_mine_recordMineUpdateState.args.id] = info.recordVo.svo.recordId;
                        PLC.request(Protocol.game_mine_recordMineUpdateState,arg,($data)=>{
                            if (!$data) return;
                            // 前往关闭界面closeEffect要用false快速关闭,这样进入神秘岛屿才能再次打开结算界面
                            super.close("",false);
                            dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_MAIN_VIEW));
                        });
                    }else{
                        super.close("",false);
                        dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_MAIN_VIEW));
                    }
                    
                }else{
                    // 没有奖励的直接标记已读
                    if(!info.recordVo.isHasReward()){
                        this.doReadOperate();
                    }else{
                        // 打开下一个记录需关闭界面以后才能打开下一个记录界面
                        let closeEffect : boolean = this._mgr.isHasRcord() ? false : true;
                        super.close("",closeEffect);
                        this._mgr.showNoticeView();
                    }
                }
            }else{
                if(info.recordVo.isHasReward()){
                    this.doRewardOpera();
                }else{
                    this.doReadOperate();
                }
            }
        }

        /** 领取操作 */
        private doRewardOpera():void {
            let info = this.dataSource as IOreSettlementVo;
            // 打开下一个记录需关闭界面以后才能打开下一个记录界面
            let closeEffect : boolean = this._mgr.isHasRcord() ? false : true;
            let arg = {};
            arg[Protocol.game_mine_mineRecordGet.args.id] = info.recordVo.svo.recordId;
            PLC.request(Protocol.game_mine_mineRecordGet,arg,($data)=>{
                if (!$data) return;
                UIUtil.showRewardView($data.commonData);
                super.close("",closeEffect);
                this._mgr.showNoticeView();
            });
        }

        /** 读操作 */
        private doReadOperate():void {
            let info = this.dataSource as IOreSettlementVo;
            // 打开下一个记录需关闭界面以后才能打开下一个记录界面
            let closeEffect : boolean = this._mgr.isHasRcord() ? false : true;
            let arg = {};
            arg[Protocol.game_mine_recordMineUpdateState.args.id] = info.recordVo.svo.recordId;
            PLC.request(Protocol.game_mine_recordMineUpdateState,arg,($data)=>{
                if (!$data) return;
                super.close("",closeEffect);
                this._mgr.showNoticeView();
            });
        }

    }
    /** 结算数据 */
    export interface IOreSettlementVo {
        title?: string;
        content: string;
        itemArray: ItemVo[];
        recordVo ?: IslandRecordVo;
    }
}