module game {
    export class PrRankIR extends ui.activity.powerrank.rankIRUI {
        constructor() {
            super();
            this.starlist.renderHandler = new Handler(this, this.onStarRender);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }
        public get dataSource() {
            return this._dataSource;
        }

        private refreshData() {
            let info: PrRankVo = this.dataSource;
            if (info) {
                //排名
                if (info.index < 3) {
                    this.lb_rank.visible = false;
                    this.img_rank.visible = true;
                    this.img_rank.skin = SkinUtil.getRankingSkin(info.index);
                } else {
                    this.lb_rank.visible = true;
                    this.img_rank.visible = false;
                    this.lb_rank.text = info.rank;
                }
                if (info.hasPerson) {
                    //有人
                    this.ui_head.visible = true;
                    let data = new UserHeadVo(info.head,info.level,info.headFrame,false);
                    this.ui_head.dataSource = data;

                    this.lb_name.text = info.name;
                    this.lab_type.text = info.getTitle();
                    this.lb_power.text = info.getValueDesc();
                    if (info.id == PrRankVo.ID_SHENLING) {
                        this.lab_god.text = info.getShenLingName();
                        this.lb_guild.text = "";
                        this.starlist.visible = true;
                        let tempStararry = new Array;
                        let num: number = info.power > 5 ? info.power - 5 : info.power;
                        for (let i = 0; i < num; i++) {
                            tempStararry[i] = info.power >= 6 ? true : false;
                        }
                        this.starlist.dataSource = tempStararry;
                        // this.starlist.x = 50 + (this.starlist.width - this.starlist.width/num)/2;
                    } else {
                        this.lab_god.text = "";
                        this.lb_guild.text = !info.guild || info.guild == "" ? LanMgr.getLan("",12084) : info.guild;
                        this.starlist.visible = false;
                    }
                    this.ui_head.on(Laya.Event.CLICK, this, this.onShowInfo);
                } else {
                    //空
                    this.ui_head.visible = false;
                    this.lab_god.text = LanMgr.getLan("",12508)
                    this.lb_name.text = "";
                    this.lb_guild.text = "";
                    this.lb_power.text = info.getConditionDesc();
                    this.lab_type.text = info.getConditionTitle();
                    this.starlist.visible = false;
                    this.starlist.dataSource = null;
                    this.ui_head.off(Laya.Event.CLICK, this, this.onShowInfo);
                }
            } else {
                this.ui_head.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        }

        private onShowInfo(): void {
            let info: PrRankVo = this.dataSource;
            if (info) {
                UIUtil.showPlayerLineupInfo(info.playerID);
            }
        }

        private onStarRender(cell: Laya.Image, index: number) {
            let data = cell.dataSource;
            if (data) {
                cell.skin = SkinUtil.superXing;
            }
            else
                cell.skin = SkinUtil.xingxing;
        }

    }
}