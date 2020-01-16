module game {
    export class CopyTeamRewardIR extends ui.teamcopy.render.RewardIRUI {
        constructor() {
            super();
            this.btnLingqu.on(Laya.Event.CLICK,this,this.onLingqu);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():CopyRewardVo {
            return this._dataSource;
        }

        public refreshData() {
            let info = this.dataSource;
            if (info) {
                this.lbTitle.text = info.tbData.desc;
                this.listReward.array = info.tbData.getRewardItems();
                let isFinish = info.isFinish();
				let isReward = info.isReward();
                if(isReward){
                    this.btnLingqu.visible = false;
                    this.lbYilingqu.visible = true;
                }else{
                    this.btnLingqu.visible = true;
                    this.lbYilingqu.visible = false;
                    if(isFinish){
                        this.btnLingqu.label = LanMgr.getLan("",10041);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor=ColorConst.GREEN_FILTER;
                    }else{
                        this.btnLingqu.label = LanMgr.getLan("",10045);
                        this.btnLingqu.skin = SkinUtil.buttonNormal;
                        this.btnLingqu.labelStrokeColor=ColorConst.ORANGE_FILTER;
                    }
                }
                this.imgRedpoint.visible = isFinish && !isReward;
            } else {
                this.listReward.array = null;
            }
        }

        private onLingqu() {
            let info = this.dataSource;
            if(!info)return;
            if(info.isCanReward()) {
                let args = {};
                args[Protocol.friend_groupCopy_getChapterAward.args.id] = info.tbData.ID;
                PLC.request(Protocol.friend_groupCopy_getChapterAward, args, (data: any) => {
                    if (!data) return;
                    if(data.addChapterAward){
                        CopyTeamModel.getInstance().groupCopyChapterAward.push(data.addChapterAward);
                    }
                    if(UIMgr.hasStage(UIConst.CopyTeamRewardView)){
                        let view = UIMgr.getUIByName(UIConst.CopyTeamRewardView) as CopyTeamRewardView;
                        view.initView();
                    }
                    UIUtil.showRewardView(data.commonData);
                    dispatchEvt(new CopyTeamEvent(CopyTeamEvent.REWARD_SUCC));
                });
            }
        }

       
    }
}



