
module game {
    export class IconRender extends ui.guild.init.IconRenderUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource(): IconVo {
            return this._dataSource;
        }

        private refreshData(): void {
            let info = this.dataSource;
            if(info && info instanceof IconVo) {
                this.img_icon.skin = SkinUtil.getGuildHeadIcon(info.tbHead.icon);
            }
        }
    }
}