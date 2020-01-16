
module game {
    export class HeadIconVo {
        public headId: any = 0;
        public headIcon: string = "";
        public isLock:boolean = false;
        public name:string = "";
        public godTab:tb.TB_god;
        constructor(id: any,  godTab:tb.TB_god = null,  isLock:boolean = false) {
            if (!isNaN(Number(id))) id = Number(id);
            this.headId = id;
            this.isLock = isLock;
            this.godTab = godTab;

            this.headIcon = SkinUtil.getHeroIcon(this.headId);
            this.name = this.godTab ? this.godTab.getName() : "";
        }
    }
}