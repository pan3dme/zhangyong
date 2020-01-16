

module common {
    /** 音效脚本 */
    export class SoundEffectProp extends ui.component.SoundEffectUI{

        public soundtName : string;
        public soundType : number;
        public soundUrl : string;
        constructor(){
            super();
            this.frameOnce(2,this,this.onDelay);
        }

        private onDelay():void {
            if(!this.soundUrl){
                this.soundUrl = "sound/button.mp3";
            }
            if(this.parent){
                this.parent.on(Laya.Event.CLICK,this,this.onClick);
            }
        }

        public setSoundUrl(url:string):void {
            this.soundUrl = url;
        }

        private onClick():void {
            if(this.soundUrl){
                AudioMgr.playSound(this.soundUrl);
            }
        }

        onDispose(): void {
            this.soundUrl = "";
            this.soundtName = "";
            this.soundType = 0;
            this.off(Laya.Event.CLICK,this,this.onClick);
        }
    }
}