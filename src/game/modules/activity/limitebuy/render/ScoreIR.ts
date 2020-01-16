
module game {
    export class ScoreIR extends ui.activity.limitebuy.render.ScoreIRUI {
        constructor() {
            super();
        }

        public set dataSource($value: tb.TB_summon_box) {
            this._dataSource = $value;
            this.refreshData();
        }
        public get dataSource(): tb.TB_summon_box{
            return this._dataSource;
        }

        public refreshData(): void {
            let info = this.dataSource;
            if(info) {
                let model = LimiteBuyModel.getInstance();
                //这里要进行判断是否已领取
                if (model.isReward(info.ID)) {
                    this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4,true);
                    this.img_guang.visible = false;
                    this.img_redpoint.visible = false;
                    Laya.timer.clearAll(this);
                } else {
                    if(model.isCanReward(info.ID)) {
                        this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4,false);
                        this.img_guang.visible = true;
                        this.img_redpoint.visible = true;
                        Laya.timer.loop(50, this, this.guangxiao);
                    } else {
                        this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4,false);
                        this.img_guang.visible = false;
                        this.img_redpoint.visible = false;
                        Laya.timer.clearAll(this);
                    }
                }
                this.lb_costscore.text = info.score + '';
            } else {
                this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4,true);
                this.img_guang.visible = false;
                this.lb_costscore.text = "";
                Laya.timer.clearAll(this);
            }
        }

        private guangxiao(): void {
            this.img_guang.rotation += 5;
        }
    }
}