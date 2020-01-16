

module game {

    export class YZBaoxiangIR extends ui.yuanzheng.BaoxiangIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():YZGuanqiaVo {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
            if(info) {
                this.icon.skin = SkinUtil.getTaskBaoxiang(4,info.isReward());
                this.ani_jiangli.visible = info.isCanReward();
                if(info.isCanReward()){
                    this.ani_jiangli.loadAnimation(ResConst.anim_baoxiang,Handler.create(null,()=>{
                        this.ani_jiangli.play(0, true);
                    }),ResConst.atlas_baoxiang);
                    this.ani1.play(0,true);
                }else{
                    this.ani_jiangli.stop();
                    this.ani1.stop();
                }
                this.on(Laya.Event.CLICK,this,this.onClick);
            }else {
                this.ani_jiangli.stop();
                this.ani1.stop();
                this.off(Laya.Event.CLICK,this,this.onClick);
            }
        }
        
        private onClick():void {
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.GUANQIA_REWARD,this));
        }
    }
}