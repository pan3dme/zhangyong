

module game {

    export class BossIR extends ui.boss.BossIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.initView();
		}

		public get dataSource():BossInfoVo {
			return this._dataSource;
		}

        initView():void {
            let data = this.dataSource;
            if(data){
                this.imgQuality.skin = SkinUtil.getWorldBossQuality(data.quality);
                this.imgHead.skin = SkinUtil.getMonsterCircleIcon(data.tbMonster.icon);
                this.lbLevel.text = LanMgr.getLan('',10157,data.tbBoss.boss_level.toString());
                this.updateBlood();
                // this.imgBlood.gray = this.imgQuality.gray = 
                this.imgHead.gray = !data.isOpen() || data.isDead();
                this.imgSuo.visible = !data.isOpen();
                this.imgDi.gray = !data.isOpen();
                this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                	this.ani_select.play();
            	}), ResConst.atlas_circle_select);
			}else{
                this.ani_select.gotoAndStop(0);
                this.ani1.gotoAndStop(0);
			}
        }
        /** 更新boss信息 */
        public updateBlood():void {
            let data = this.dataSource;
            if(data){
                this.updateBtn();
            }
        }
        /** 更新按钮状态:倒计时 */
        public updateBtn():void {
            let data = this.dataSource;
            if(data){
                this.lbTime.visible = false;
                // this.imgDi.gray = false;
                if(data.isOpen()){
                    let isDead = data.isDead();
                    if(isDead || data.getBossHp() <= 0){
                        // this.imgBlood.skin = "shijieboss/chongsheng.png";
                        // this.imgBlood.mask = null;
                        // this.imgDi.gray = true;
                        this.lbTime.visible = true;
                        let time = data.svo.bossReviveTime - App.serverTimeSecond;
                        time = time <= 0 ? 0 : time;
                        let mint = Math.ceil(time/60);
                        this.lbTime.text = GameUtil.toCountdown(time,"hh:mm:ss");
                        if(time <=0){
                            BossModel.getInstance().requestBossInfo();
                        }
                    }else{
                        this.renderBlood(data);
                    }
                }else{
                     this.renderBlood(data);
                }
            }
        }

        private renderBlood(data:BossInfoVo):void {
            // this.imgBlood.skin = "shijieboss/xuetiao.png";
            // let mask : Laya.Sprite = this.imgBlood.mask;
            // if(!this.imgBlood.mask){
            //     mask = new Laya.Sprite();
            //     this.imgBlood.mask = mask;
            // }
            // let curHp = data.getBossHp();
            // let totalHp = data.getBossTotalHp();
            // let angle = 0;
            // if(curHp>=totalHp){
            //     // 满血显示 -90度跟270一致，会不显示血条
            //     angle = -89.9;
            // }else{
            //     // 需求的扇形是从 -90 到 270表示一个圈
            //     angle = 360 - Math.ceil((curHp/totalHp) * 360) - 90;
            // }
            // mask.graphics.clear();
            // mask.graphics.drawPie(57, 60, 60,angle, 270,"#ffffff");
        }

        // private onShowInfo():void {
        //     let data = this.dataSource;
        //     if(data){
        //         dispatchEvt(new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL),data.tbMonster);
        //     }
        // }
    }
}