module game {

    export class RaceForceIR extends ui.god.render.KeZhiForceBoxUI {

        constructor() {
            super();
        }

        public set dataSource($value: {halos:tb.TB_halo[],godNum:number}) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():{halos:tb.TB_halo[],godNum:number} {
            return this._dataSource;
        }
        private _sortNum : number = 0;
        private refreshData() {
            let info : {halos:tb.TB_halo[],godNum:number} = this.dataSource;
            if(info && info.halos && info.halos.length > 0){
                let halos = info.halos;
                let firstTemp:tb.TB_halo = halos[0];
                let raceType = firstTemp.raceType;
                this._sortNum = raceType + 1000;
                this.lab_title.text = LanMgr.RACE_FORCE_STR[raceType];
                
                let existIdx = -1;
                for(let i = halos.length - 1; i >= 0 ; i--) {
                    if(info.godNum >= halos[i].godNum){
                        existIdx = i;
                        break;
                    }
                }
                if(existIdx != -1) {
                    this._sortNum = firstTemp.type;
                }
                let ary = halos.map((vo,index:number)=>{
                    return { isActive:existIdx == index, tbData:vo };
                });
                this.list_kezhi.array = ary;
                this.list_kezhi.repeatY = ary.length;
                this.height = this.img_bg.height = this.list_kezhi.y + this.list_kezhi.height + 15;
                
                this.img_icon.skin = SkinUtil.getGodBigRaceSkin(raceType);
                this.img_icon.gray = existIdx == -1;

                this.visible = true;
            }else{
                this.list_kezhi.array = null;
                this.visible = false;
                this._sortNum = 0;
            }
        }

         public get sortnum():number{
            return this._sortNum;
        }

    }
}