module game {

    export class LineupGodIR extends ui.god.render.LineupGodIRUI {
        constructor() {
            super();
        }

        public set dataSource($value: LineupGodVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():LineupGodVo {
            return this._dataSource;
        }

        private refreshData() {
            let info : LineupGodVo = this.dataSource;
            if(info){
                let isExist = info.godVo ? true : false;
                let isUnlock : boolean = GodUtils.isUnlock(info.pos,info.userLv||App.hero.level);
                this.headBox.visible = isExist;
                this.headBox.dataSource = isExist ? info.godVo : null;
                this.box_null.visible = !isExist;
                this.btn_add.visible = !isExist && isUnlock;
                this.imgLock.visible = this.lbLock.visible = !isUnlock;
                this.lbLock.text = GodUtils.getUnlockLv(info.pos) + LanMgr.getLan("",10031);
                this.headBox.img_shangzhen.visible = false;
                this.anim_select.play();
            }else{
                this.headBox.dataSource = null;
                this.anim_select.gotoAndStop(0);
            }
        }

    }
}