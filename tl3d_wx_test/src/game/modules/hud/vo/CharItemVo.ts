module game {
    export class CharItemVo {
        public openLev: number;
        public godItem: GodItemVo;
        public idx: number;
        public pos: Array<number>;
        public char: MainChar;

        constructor(idx,openlev,goditem,pos) {
            this.idx = idx;
            this.openLev = openlev;
            this.godItem = goditem;
            this.pos = pos;
        }

        public setChar(char:MainChar){
            this.char = char;
            this.char.set2dPos(this.pos[0],this.pos[1]);
            this.char.y = 0.1;
        }

        public isOpen():boolean {
            return App.hero.level >= this.openLev;
        }

        public hasGod():boolean {
            return this.isOpen() && this.godItem != null;
        }

        public getStar():number {
            return this.hasGod() ? this.godItem.getStar() : 1;
        }

        public getLev():number {
            return this.hasGod() ? this.godItem.level : 1;
        }

        public getTempId():number {
            // return 100005;
            return this.isOpen() ? this.hasGod() ? this.godItem.getModel() : 100004 : 100003;
        }

        public getName():string {
            return this.hasGod() ? this.godItem.tab_god.name : "";
        }

        public getUuid():string {
            return this.hasGod() ? this.godItem.uuid : "";
        }

        public getTitle():string {
            if(this.isOpen()){
                return this.hasGod() ? `Lv.${this.getLev()} ${this.getName()}` : ""; 
            }else{
                return LanMgr.getLan(``,11002,this.openLev);
            }
        }

        public getPosX(){
            return this.char.x;
        }
        public getPosY(){
            return this.char.y;
        }
        public getPosZ(){
            return this.char.z;
        }

        public destory() {
            if(!this.char)return;
            this.char.destory();
            this.char = null;
        }
    }
}