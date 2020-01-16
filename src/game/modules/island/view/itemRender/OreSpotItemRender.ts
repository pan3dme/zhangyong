

module game {

    export class OreSpotIR extends ui.island.itemrender.OreSpotItemRenderUI {

        constructor() {
            super();
            // 绘制区域
            // let gps:Laya.Graphics = new Laya.Graphics();
            // gps.drawPoly(0,0,[40,0,110,0,146,58,110,106,40,106,0,58],"#ff9900");
            // this.graphics.clear();
            // this.graphics = gps;
            // 点击区域
            let hitarea:Laya.HitArea = new Laya.HitArea();
            let graphics:Laya.Graphics = new Laya.Graphics();
            graphics.drawPoly(0,88,[40,0,110,0,146,58,110,106,40,106,0,58],"#ff9900");
            hitarea.hit = graphics;
            this.hitArea = hitarea;
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshView();
        }

        public get dataSource(): OreSpotInfoVo {
            return this._dataSource;
        }

        public refreshView(): void {
            let info = this.dataSource;
            let uiFlag = this.ui_flag;
            if (info) {
                let exist = info.isExist();
                if(exist){
                    this.lbTbName.text = exist ? info.tbOre.name : "";
                    this.lbTbName.color = IslandModel.ORE_COLORS[info.tbOre.ID];
                    this.icon.skin = SkinUtil.getIslandOreUrl(info.tbOre.ID);
                    this.icon.visible = this.lbTbName.visible = true;
                    let hasUser = info.hasUser();
                    if(hasUser){
                        this.ImgForeBg.visible = this.lbName.visible = uiFlag.visible = true;
                        this.lbName.text = info.svo.playerName;
                        if (info.isSelf()){
                            this.lbName.color = "#008bff";
                            uiFlag.img_di_0.skin = uiFlag.img_di_1.skin = "shenmidaoyu/wofangzuobiaodian.png";
                            uiFlag.img_flag.skin = "shenmidaoyu/wofang.png";
                            uiFlag.ani1.play(0,true);
                            uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = true;
                            uiFlag.ani2.play(0,true);
                        }else{
                            this.lbName.color = "#ff0000";
                            uiFlag.img_di_0.skin = uiFlag.img_di_1.skin = "shenmidaoyu/difangzuobiaodian.png";
                            uiFlag.img_flag.skin = "shenmidaoyu/difang.png";
                            uiFlag.ani1.gotoAndStop(0);
                            uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                            uiFlag.ani2.gotoAndStop(0);
                        }
                    }else{
                        this.ImgForeBg.visible = this.lbName.visible = uiFlag.visible = false;
                        uiFlag.ani1.gotoAndStop(0);
                        uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                        uiFlag.ani2.gotoAndStop(0);
                    }
                }else{
                    this.lbName.visible = this.lbTbName.visible = uiFlag.visible = false;
                    uiFlag.ani1.gotoAndStop(0);
                    uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                    uiFlag.ani2.gotoAndStop(0);
                    this.ImgForeBg.visible = this.icon.visible = false;
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            } else {
                this.off(Laya.Event.CLICK, this, this.onClick);
                uiFlag.ani1.gotoAndStop(0);
                uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                uiFlag.ani2.gotoAndStop(0);
            }
        }

        private onClick(): void {
            if(!this.dataSource.tbOre) return;
            dispatchEvt(new IslandsEvent(IslandsEvent.OPEN_ORE_INFO, this.dataSource));
        }

    }
}