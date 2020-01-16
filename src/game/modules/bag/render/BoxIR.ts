module game {
    export class BoxIR extends ui.bag.ItemBoxUI {
        constructor() {
            super();
            this.list_star.renderHandler = new Handler(this, this.onStarRender);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData() {
            if (this._dataSource) {
                let item = this._dataSource;
                this.ui_base.dataSource = item;
                let isChip = item.isChip();
				this.img_suipian.visible = isChip;
				if(isChip && GameUtil.isFunction(item.getChipSkin)) {
					this.img_suipian.skin = item.getChipSkin();
				}
                let star = Number(item.getStar());
                this.list_star.visible = star != 0;
                this.drawStar(star);

                let race = Number(item.showRace());
                this.img_race.visible = race != 0;
                if (this.img_race.visible) {
                    this.img_race.skin = SkinUtil.getGodRaceSkin(race);
                }
                this.img_zhizhen.visible = item.selectid == item.indexid;
                if (item instanceof ItemVo) {
                    if (item.type == iface.tb_prop.itemTypeKey.gift || item.type == iface.tb_prop.itemTypeKey.optionalCard) {
                        this.redpoint.setRedPointName(`bag_material_${item.id}`);
                    } else if (item.type == iface.tb_prop.itemTypeKey.chip) {
                        this.redpoint.setRedPointName(`bag_suipian_${item.id}`);
                    } else if (item.type == iface.tb_prop.itemTypeKey.timeItem) {
                        this.redpoint.setRedPointName(`bag_timeItem_${item['uuid']}`);
                    } else
                        this.redpoint.onDispose();
                } else {
                    this.redpoint.onDispose();
                }
            } else {
                this.ui_base.dataSource = null;
                this.img_suipian.visible = false;
                this.list_star.visible = false;
                this.img_race.skin = ""
                this.img_zhizhen.visible = false;
                this.redpoint.onDispose();
            }
        }

        private drawStar(star) {
            if (this.list_star.visible) {
                let ary = new Array;
                let flag: boolean = star > 5;
                let len = flag ? star - 5 : star;
                for (var i = 0; i < len; i++) {
                    ary.push(flag ? SkinUtil.superXing : SkinUtil.iconxing);
                }
                this.list_star.dataSource = ary;
            }
        }

        private onStarRender($cell: Laya.Image) {
            $cell.skin = $cell.dataSource;
        }
    }
}