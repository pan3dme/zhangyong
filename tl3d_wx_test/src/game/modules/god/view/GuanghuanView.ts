/**
* name 
*/
module game {
	export class GuanghuanView extends ui.god.GuanghuanUI {

        private _posAry : number[];
		constructor() {
			super();
		}

		public initView(type:number,posAry:number[]):void {
            this._posAry = posAry;
            this.imgBg.skin = type == 0 ? SkinUtil.wofang_guanghuan : SkinUtil.difang_guanghuan;
            for(let i = 0 ; i < 6 ; i++){
                let img = this[`img${i}`] as Laya.Image;
                if(!img) continue;
                let race = posAry[i] || 0;
                img.visible = race > 0;
                if(race > 0){
                    img.skin = SkinUtil.getGodRaceSkin(race);
                    let num = posAry.filter((posRace)=>{
                        return posRace == race;
                    }).length;
                    img.gray = !GodUtils.isActiveHalo(race,num);
                }
            }
            this.on(Laya.Event.CLICK,this,this.onShow);
        }

        private onShow():void {
            let obj = {};
            if(this._posAry){
                for(let race of this._posAry){
                    obj[race] = obj[race] || 0;
                    obj[race] += 1;
                }
            }
            dispatchEvt(new GodEvent(GodEvent.SHOW_KEZHI_VIEW),obj);
        }

        public onExit():void {
            this._posAry = null;
            this.off(Laya.Event.CLICK,this,this.onShow);
        }

	}
}