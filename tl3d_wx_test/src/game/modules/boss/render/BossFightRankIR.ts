

module game {

    export class BossFightRankIR extends ui.boss.FightRankIRUI {

        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshView();
        }

        public get dataSource(): IBossRankInfo {
            return this._dataSource;
        }

        private _iconmask: Laya.Sprite
        private getIconMask() {
            //创建遮罩对象
            if (!this._iconmask) {
                this._iconmask = new Laya.Sprite();
            }

            this._iconmask.graphics.clear();
            this._iconmask.graphics.drawCircle(55, 55, 46, "#f16712", null, 0.01);

            return this._iconmask;
        }

        refreshView(): void {
            let info = this.dataSource;
            // logyhj("获得数据", info);
            this.clearTimer(this,this.addMask);
            this.icon.mask = null;
            if (info) {
                // this.addChild(this.getIconMask());
                this.frameOnce(3, this, this.addMask);
                this.icon.skin = SkinUtil.getHeroIcon(info.head);
                this.imgRank.skin = SkinUtil.getRankSkin(info.rank + 1);
                let isExist = info.playerId ? true : false;
                this.lbName.text = isExist ? info.playerName : LanMgr.getLan("",12508);
                this.lbName.y = isExist ? 42 : 52;
                this.lbDamage.visible = isExist;
                this.lbDamage.value = info.value + "";
                this.icon.on(Laya.Event.CLICK, this, this.onShow);
            } else {
                // this.icon.mask = null;
                this.icon.skin = "";
                this.imgRank.skin = "";
                this.icon.off(Laya.Event.CLICK, this, this.onShow);
            }
        }

        private addMask() {
            this.icon.mask = this.getIconMask();
        }

        private onShow(): void {
            let info = this.dataSource;
            if (info && info.playerId) {
                UIUtil.showPlayerLineupInfo(info.playerId);
            }
        }
    }
}