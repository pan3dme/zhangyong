module game {
    export class FightHeadRender extends ui.fight.fightHeadUI {
        constructor() {
            super();
            this.width = Laya.stage.width;
            this.box_head0.on(Laya.Event.CLICK, this, this.onShowKezhi, [true]);
            this.box_head1.on(Laya.Event.CLICK, this, this.onShowKezhi, [false]);
        }

        private _complete: boolean;

        private _enemyItemLoacl = [
            [215, 47], [216, 75], [241, 31], [268, 47], [268, 75], [241, 89]
        ];
        private _ownItemLoacl = [
            [87, 46], [87, 75], [59, 31], [33, 47], [34, 75], [59, 89]
        ];

        public showEff() {
            this.setVis(true);
            UIUtil.boxLeftRightTween(this.box_head0, -136, 163, false, 310, 0.05);
            UIUtil.boxLeftRightTween(this.box_head1, Laya.stage.width + 136, Laya.stage.width - 163, true, 310, 0.05);
            setTimeout(() => {
                this.setVsVis(true);
            }, 310);
        }

        public setVsVis(val) {
            this.lab_title.visible = this.lab_round.visible = this.img_vs.visible = val;
        }

        public setScale(val) {
            this.box_head0.scale(val, val);
            this.box_head1.scale(val, val);
        }

        public setVis(vis) {
            this.box_head0.visible = this.box_head1.visible = vis;
        }

        public hide() {
            if (this._complete) {
                this.hideItem(this._defItemAry);
                this.hideItem(this._atkItemAry);
                this.setVis(false);
                this._complete = false;
            }
        }

        public setData() {
            this._complete = true;

            this.lab_title.text = this.dataSource.title;

            this.lab_name0.text = this.dataSource.ownName;
            this.lab_name1.text = this.dataSource.enemyName;

            this.box_force0.visible = this.dataSource.ownForce != 0
            this.box_force1.visible = this.dataSource.enemyForce != 0
            this.clip_force0.value = String(this.dataSource.ownForce);
            this.clip_force1.value = String(this.dataSource.enemyForce);

            let teamVo = this.dataSource.enemyTeam || {};
            let teamLineUp = teamVo.lineup || {};
            for (var i = 0; i < 6; i++) {
                this.setItem(battle.BatteConsts.BATTLE_CAMPDEF, i, teamLineUp);
            }

            teamVo = this.dataSource.ownTeam || {};
            teamLineUp = teamVo.lineup || {};
            for (var j = 0; j < 6; j++) {
                this.setItem(battle.BatteConsts.BATTLE_CAMPATK, j, teamLineUp);
            }
        }

        private hideItem(itemAry) {
            for (var i = 0; itemAry && i < itemAry.length; i++) {
                itemAry[i].visible = false;
            }
        }

        private _defItemAry: Array<Laya.Image>
        private _atkItemAry: Array<Laya.Image>
        private setItem(battleTeam: number, local, source) {
            let tempary: Array<Laya.Image>
            let tempLoacl;
            if (battleTeam == battle.BatteConsts.BATTLE_CAMPDEF) {
                if (!this._defItemAry) {
                    this._defItemAry = [];
                }
                tempary = this._defItemAry;
            } else {
                if (!this._atkItemAry) {
                    this._atkItemAry = [];
                }
                tempary = this._atkItemAry;
            }

            if (!tempary[local]) {
                let img: Laya.Image = new Laya.Image();
                // img.width = img.height = 24;
                img.scaleX = img.scaleY = 0.94;
                img.anchorY = img.anchorX = 0.5
                if (battleTeam == battle.BatteConsts.BATTLE_CAMPDEF) {
                    this.box_head1.addChild(img);
                    tempLoacl = this._enemyItemLoacl[local];
                } else {
                    this.box_head0.addChild(img);
                    tempLoacl = this._ownItemLoacl[local];
                }
                img.x = tempLoacl[0]
                img.y = tempLoacl[1]
                tempary.push(img);
            }

            let tempItem = tempary[local];

            if (!source.hasOwnProperty(local)) {
                tempItem.visible = false;
                return;
            }
            tempItem.visible = true;
            tempItem.skin = SkinUtil.getGodRaceSkin(Number(source[local].race));
            tempItem.gray = !source[local].active;
        }

        public setRound(str: string) {
            this.lab_round.text = str;
        }

        private onShowKezhi(self: boolean): void {
            let teamVo = this.dataSource.enemyTeam || {};
            if (self) {
                teamVo = this.dataSource.ownTeam || {};
            }
            dispatchEvt(new GodEvent(GodEvent.SHOW_KEZHI_VIEW), teamVo.teamInfo);
        }
    }
}